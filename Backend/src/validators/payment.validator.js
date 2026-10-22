import ApiResponse from '../utils/apiResponse.js';

export const validateCreateOrder = (req, res, next) => {
    const { items, subtotal, tax, shipping, totalAmount, currency } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return ApiResponse.error(res, "Items must be a non-empty array", 400);
    }

    for (const item of items) {
        if (!item.product || !item.quantity || typeof item.quantity !== 'number' || item.quantity < 1) {
            return ApiResponse.error(res, "Each item must have a product ID and a quantity >= 1", 400);
        }
    }

    if (typeof subtotal !== 'number' || subtotal < 0) {
        return ApiResponse.error(res, "Subtotal must be a positive number", 400);
    }

    if (typeof tax !== 'number' || tax < 0) {
        return ApiResponse.error(res, "Tax must be a positive number", 400);
    }

    if (typeof shipping !== 'number' || shipping < 0) {
        return ApiResponse.error(res, "Shipping must be a positive number", 400);
    }

    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
        return ApiResponse.error(res, "Total amount must be greater than 0", 400);
    }

    // Verify subtotal + tax + shipping matches totalAmount to prevent tampering
    const expectedTotal = Number((subtotal + tax + shipping).toFixed(2));
    const providedTotal = Number(totalAmount.toFixed(2));

    if (expectedTotal !== providedTotal) {
        return ApiResponse.error(res, `Total amount validation failed. Expected: ${expectedTotal}, Provided: ${providedTotal}`, 400);
    }

    req.validatedBody = {
        items,
        subtotal,
        tax,
        shipping,
        totalAmount,
        currency: currency || 'INR'
    };

    next();
};

export const validateVerifyPayment = (req, res, next) => {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!orderId || typeof orderId !== 'string') {
        return ApiResponse.error(res, "orderId is required", 400);
    }

    if (!razorpayOrderId || typeof razorpayOrderId !== 'string') {
        return ApiResponse.error(res, "razorpayOrderId is required", 400);
    }

    if (!razorpayPaymentId || typeof razorpayPaymentId !== 'string') {
        return ApiResponse.error(res, "razorpayPaymentId is required", 400);
    }

    if (!razorpaySignature || typeof razorpaySignature !== 'string') {
        return ApiResponse.error(res, "razorpaySignature is required", 400);
    }

    next();
};

export const validateRefund = (req, res, next) => {
    const { paymentId, amount, reason } = req.body;

    if (!paymentId || typeof paymentId !== 'string') {
        return ApiResponse.error(res, "paymentId is required", 400);
    }

    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
        return ApiResponse.error(res, "Amount must be a positive number", 400);
    }

    next();
};
