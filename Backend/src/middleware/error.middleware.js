import logger from '../utils/logger.js';
import ApiResponse from '../utils/apiResponse.js';

const errorHandler = (err, req, res, next) => {
    logger.error("Unhandled Application Error", err, {
        path: req.originalUrl,
        method: req.method,
        ip: req.ip
    });

    // Custom operational error handler (e.g. ValidationError, CustomError)
    if (err.isOperational) {
        return ApiResponse.error(res, err.message, err.statusCode || 400);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        return ApiResponse.error(res, "Duplicate record key detected.", 409);
    }

    // Default error response
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : err.message;

    return ApiResponse.error(res, message, statusCode);
};

export default errorHandler;
