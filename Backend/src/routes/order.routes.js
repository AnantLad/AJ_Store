import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { getOrderById, getUserOrders } from '../controllers/order.controller.js';
import ApiResponse from '../utils/apiResponse.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:id', getOrderById);

router.get('/user/:userId', (req, res, next) => {
    // Validate IDOR: ensure parameter userId matches token userId
    if (req.userId !== req.params.userId) {
        return ApiResponse.error(res, "Access denied. Unauthorized query user ID.", 403);
    }
    next();
}, getUserOrders);

export default router;
