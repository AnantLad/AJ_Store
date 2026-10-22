import OrderService from '../services/order.service.js';
import ApiResponse from '../utils/apiResponse.js';
import logger from '../utils/logger.js';

export const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const order = await OrderService.getOrderById(id);
        if (!order) {
            return ApiResponse.error(res, "Order not found", 404);
        }

        // Authorization validation (ensure requesting user owns this order)
        if (order.userId.toString() !== userId) {
            logger.warn("OrderController: Unauthorized order access attempt", { orderId: id, requestUserId: userId });
            return ApiResponse.error(res, "Access denied. Unauthorized order request.", 403);
        }

        return ApiResponse.success(res, "Order fetched successfully", order);
    } catch (error) {
        next(error);
    }
};

export const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.userId;
        const orders = await OrderService.getOrdersByUserId(userId);
        return ApiResponse.success(res, "User orders fetched successfully", orders);
    } catch (error) {
        next(error);
    }
};
