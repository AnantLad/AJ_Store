import Order from '../models/Order.js';
import logger from '../utils/logger.js';

class OrderService {
    /**
     * Create an order record
     */
    async createOrder(orderData) {
        logger.info("OrderService: Creating order record in DB", { orderData });
        const order = new Order({
            userId: orderData.userId,
            items: orderData.items,
            subtotal: orderData.subtotal,
            tax: orderData.tax,
            shipping: orderData.shipping,
            totalAmount: orderData.totalAmount,
            currency: orderData.currency || 'INR',
            razorpayOrderId: orderData.razorpayOrderId,
            orderStatus: 'PENDING',
            paymentStatus: 'PENDING'
        });
        await order.save();
        logger.info("OrderService: Order record saved successfully", { orderId: order._id });
        return order;
    }

    /**
     * Fetch order by ID
     */
    async getOrderById(orderId) {
        logger.info("OrderService: Fetching order by ID", { orderId });
        return await Order.findById(orderId).populate('items.product');
    }

    /**
     * Fetch order by Razorpay Order ID
     */
    async getOrderByRazorpayOrderId(razorpayOrderId) {
        return await Order.findOne({ razorpayOrderId }).populate('items.product');
    }

    /**
     * Fetch orders for a user
     */
    async getOrdersByUserId(userId) {
        logger.info("OrderService: Fetching orders for user", { userId });
        return await Order.find({ userId }).populate('items.product').sort({ createdAt: -1 });
    }

    /**
     * Update order payment status
     */
    async updatePaymentStatus(orderId, paymentStatus, paymentId = null) {
        logger.info("OrderService: Updating order payment status", { orderId, paymentStatus, paymentId });
        
        const updateData = { paymentStatus };
        if (paymentId) {
            updateData.razorpayPaymentId = paymentId;
        }

        if (paymentStatus === 'PAID') {
            updateData.orderStatus = 'PROCESSING';
        } else if (paymentStatus === 'FAILED') {
            updateData.orderStatus = 'FAILED';
        }

        const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found`);
        }
        return order;
    }

    /**
     * Update order refund status
     */
    async updateRefundStatus(orderId) {
        logger.info("OrderService: Updating order status to REFUNDED", { orderId });
        return await Order.findByIdAndUpdate(orderId, {
            paymentStatus: 'REFUNDED',
            orderStatus: 'REFUNDED'
        }, { new: true });
    }

    /**
     * Increment payment attempt count
     */
    async incrementAttemptCount(orderId) {
        return await Order.findByIdAndUpdate(orderId, { $inc: { paymentAttemptCount: 1 } }, { new: true });
    }
}

export default new OrderService();
