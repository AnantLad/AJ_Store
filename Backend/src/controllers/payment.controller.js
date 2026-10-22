import PaymentService from '../services/payment.service.js';
import ApiResponse from '../utils/apiResponse.js';
import logger from '../utils/logger.js';

export const createOrder = async (req, res, next) => {
    try {
        const userId = req.userId;
        const orderData = req.validatedBody;

        const checkoutDetails = await PaymentService.createRazorpayOrder(userId, orderData);
        return ApiResponse.success(res, "Razorpay checkout session generated", checkoutDetails, 201);
    } catch (error) {
        next(error);
    }
};

export const verifyPayment = async (req, res, next) => {
    try {
        const verificationDetails = req.body;
        const verifiedOrder = await PaymentService.verifyPaymentSignature(verificationDetails);
        return ApiResponse.success(res, "Payment signature verified successfully", verifiedOrder);
    } catch (error) {
        next(error);
    }
};

export const processRefund = async (req, res, next) => {
    try {
        const { paymentId, amount, reason } = req.body;
        const refundResponse = await PaymentService.processRefund(paymentId, amount, reason);
        return ApiResponse.success(res, "Refund processed successfully", refundResponse);
    } catch (error) {
        next(error);
    }
};

export const webhookReceiver = async (req, res, next) => {
    try {
        const { event, payload } = req.body;
        logger.info("PaymentController: Razorpay webhook event received", { event });

        // Offload processing to background so we don't block Razorpay responses
        PaymentService.processWebhook(event, payload)
            .then(() => logger.info("PaymentController: Webhook process finished in background"))
            .catch(err => logger.error("PaymentController: Webhook process background error", err));

        // Always return 200 OK immediately to Razorpay to prevent webhook retries
        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        next(error);
    }
};
