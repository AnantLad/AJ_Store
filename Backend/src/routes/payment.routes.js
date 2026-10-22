import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import webhookAuthMiddleware from '../middleware/webhook.middleware.js';
import { 
    validateCreateOrder, 
    validateVerifyPayment, 
    validateRefund 
} from '../validators/payment.validator.js';
import { 
    createOrder, 
    verifyPayment, 
    processRefund, 
    webhookReceiver 
} from '../controllers/payment.controller.js';

const router = express.Router();

// Public webhook receiver - verified via cryptographic signature
router.post('/webhook', webhookAuthMiddleware, webhookReceiver);

// Protected routes (Requires User JWT token)
router.use(authMiddleware);

router.post('/create-order', validateCreateOrder, createOrder);
router.post('/verify', validateVerifyPayment, verifyPayment);
router.post('/refund', validateRefund, processRefund);

export default router;
