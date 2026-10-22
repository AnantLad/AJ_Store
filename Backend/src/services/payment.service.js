import razorpayInstance from '../config/razorpay.js';
import OrderService from './order.service.js';
import Payment from '../models/Payment.js';
import Order from '../models/Order.js';
import { verifyPaymentSignature } from '../utils/verifySignature.js';
import logger from '../utils/logger.js';

class PaymentService {
    /**
     * Create checkout order on Razorpay
     */
    async createRazorpayOrder(userId, orderInput) {
        logger.info("PaymentService: Creating checkout order", { userId, amount: orderInput.totalAmount });

        // Generate temporary Razorpay Order to obtain order ID
        const amountInPaisa = Math.round(orderInput.totalAmount * 100);
        const options = {
            amount: amountInPaisa,
            currency: orderInput.currency || 'INR',
            receipt: `receipt_order_${Date.now()}`
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);
        logger.info("PaymentService: Razorpay order created successfully", { razorpayOrderId: razorpayOrder.id });

        // Save order in MongoDB
        const order = await OrderService.createOrder({
            userId,
            items: orderInput.items,
            subtotal: orderInput.subtotal,
            tax: orderInput.tax,
            shipping: orderInput.shipping,
            totalAmount: orderInput.totalAmount,
            currency: orderInput.currency,
            razorpayOrderId: razorpayOrder.id
        });

        return {
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        };
    }

    /**
     * Verify payment signature and record payment details
     */
    async verifyPaymentSignature(verificationData) {
        const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = verificationData;
        logger.info("PaymentService: Verifying signature", { orderId, razorpayPaymentId });

        // Retrieve order
        const order = await OrderService.getOrderById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }

        // Duplicate payment verification / idempotency check
        if (order.paymentStatus === 'PAID') {
            logger.warn("PaymentService: Order already paid, ignoring verification request", { orderId });
            return order;
        }

        // Verify HMAC signature
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature, secret);

        if (!isValid) {
            logger.warn("PaymentService: Payment signature verification failed", { orderId });
            await OrderService.updatePaymentStatus(orderId, 'FAILED', razorpayPaymentId);
            throw new Error("Payment signature verification failed");
        }

        // Increment attempts
        await OrderService.incrementAttemptCount(orderId);

        // Fetch payment details from Razorpay to ensure it is actually paid
        const paymentDetails = await razorpayInstance.payments.fetch(razorpayPaymentId);
        if (paymentDetails.status !== 'captured') {
            logger.warn("PaymentService: Razorpay payment status is not captured", { paymentStatus: paymentDetails.status });
            throw new Error(`Razorpay payment status is: ${paymentDetails.status}`);
        }

        // Save Payment record
        const payment = new Payment({
            orderId: order._id,
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
            amount: order.totalAmount,
            currency: order.currency,
            paymentMethod: paymentDetails.method,
            paymentStatus: 'CAPTURED',
            gatewayResponse: paymentDetails
        });
        await payment.save();

        // Update Order record
        const updatedOrder = await OrderService.updatePaymentStatus(order._id, 'PAID', razorpayPaymentId);
        logger.info("PaymentService: Signature verified and records updated", { orderId });

        return updatedOrder;
    }

    /**
     * Process refunds (full or partial)
     */
    async processRefund(paymentId, amount = null, reason = "Customer Request") {
        logger.info("PaymentService: Initiating refund request", { paymentId, amount, reason });

        // Find payment record
        const payment = await Payment.findOne({ razorpayPaymentId: paymentId });
        if (!payment) {
            throw new Error("Payment record not found");
        }

        const refundOptions = {
            payment_id: paymentId,
            notes: { reason }
        };

        if (amount) {
            refundOptions.amount = Math.round(amount * 100); // in paisa
        }

        const refundResponse = await razorpayInstance.payments.refund(paymentId, refundOptions);
        logger.info("PaymentService: Razorpay refund processed", { refundId: refundResponse.id });

        // Update database
        payment.paymentStatus = 'REFUNDED';
        payment.gatewayResponse = {
            ...payment.gatewayResponse,
            refundDetails: refundResponse
        };
        await payment.save();

        // Update order status
        await OrderService.updateRefundStatus(payment.orderId);

        return refundResponse;
    }

    /**
     * Process Webhook Payload securely
     */
    async processWebhook(event, payload) {
        logger.info("PaymentService: Processing webhook event", { event });
        const paymentEntity = payload.payment.entity;
        const razorpayOrderId = paymentEntity.order_id;
        const razorpayPaymentId = paymentEntity.id;

        // Retrieve order record
        const order = await Order.findOne({ razorpayOrderId });
        if (!order) {
            logger.warn("PaymentService: Order corresponding to webhook order ID not found", { razorpayOrderId });
            return;
        }

        // Handle webhook cases
        if (event === 'payment.captured') {
            // Idempotency: skip if already paid
            if (order.paymentStatus === 'PAID') {
                logger.info("PaymentService: Webhook payment.captured: order already paid, skipping duplicate updates", { orderId: order._id });
                return;
            }

            // Save Payment record if it doesn't already exist
            let payment = await Payment.findOne({ razorpayPaymentId });
            if (!payment) {
                payment = new Payment({
                    orderId: order._id,
                    razorpayOrderId,
                    razorpayPaymentId,
                    amount: order.totalAmount,
                    currency: order.currency,
                    paymentMethod: paymentEntity.method,
                    paymentStatus: 'CAPTURED',
                    webhookPayload: payload
                });
                await payment.save();
            }

            // Update order status
            await OrderService.updatePaymentStatus(order._id, 'PAID', razorpayPaymentId);
            logger.info("PaymentService: Webhook processing completed successfully", { orderId: order._id });
        } else if (event === 'payment.failed') {
            if (order.paymentStatus === 'PENDING') {
                await OrderService.updatePaymentStatus(order._id, 'FAILED', razorpayPaymentId);
                logger.warn("PaymentService: Webhook payment.failed processed", { orderId: order._id });
            }
        } else if (event === 'refund.processed') {
            if (order.paymentStatus !== 'REFUNDED') {
                await OrderService.updateRefundStatus(order._id);
                logger.info("PaymentService: Webhook refund.processed completed", { orderId: order._id });
            }
        }
    }
}

export default new PaymentService();
