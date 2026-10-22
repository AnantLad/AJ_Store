import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/apiResponse.js';

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies?.token;

        if (!token && req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return ApiResponse.error(res, "Access denied. Authentication token missing.", 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        
        next();
    } catch (error) {
        return ApiResponse.error(res, "Invalid or expired token.", 401, error.message);
    }
};

export default authMiddleware;
