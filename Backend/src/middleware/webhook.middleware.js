import { verifyWebhookSignature } from '../utils/verifySignature.js';
import ApiResponse from '../utils/apiResponse.js';
import logger from '../utils/logger.js';

const webhookAuthMiddleware = (req, res, next) => {
    try {
        const signature = req.headers['x-razorpay-signature'];
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!signature) {
            logger.warn("Webhook signature missing in headers");
            return ApiResponse.error(res, "Webhook signature missing", 400);
        }

        if (!webhookSecret) {
            logger.error("RAZORPAY_WEBHOOK_SECRET is not configured in backend");
            return ApiResponse.error(res, "Webhook secret not configured", 500);
        }

        // Retrieve raw body captured by express body parser
        const rawBody = req.rawBody;
        if (!rawBody) {
            logger.error("Raw request body is not available for signature verification. Ensure body-parser verify hook is configured.");
            return ApiResponse.error(res, "Raw body missing", 500);
        }

        const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);

        if (!isValid) {
            logger.warn("Razorpay Webhook signature verification failed", { signature });
            return ApiResponse.error(res, "Invalid signature", 400);
        }

        next();
    } catch (error) {
        logger.error("Error in webhook verification middleware", error);
        return ApiResponse.error(res, "Webhook signature verification error", 500, error.message);
    }
};

export default webhookAuthMiddleware;
