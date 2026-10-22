import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import paymentRoutes from './routes/payment.routes.js';
import orderRoutes from './routes/order.routes.js';
import errorHandler from './middleware/error.middleware.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

// Cookie parser middleware
app.use(cookieParser());

// Express JSON body parser - capturing rawBody for webhook verify signature
app.use(express.json({
    verify: (req, res, buf) => {
        // Only compute rawBody for the webhook endpoint to optimize memory usage
        if (req.originalUrl.includes('/webhook')) {
            req.rawBody = buf.toString();
        }
    }
}));

// URL encoded body parser
app.use(express.urlencoded({ extended: true }));

// Payment and Order API Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/payment-health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Razorpay Payment module is operational' });
});

// Centralized error handler middleware
app.use(errorHandler);

// Setup database connection and start server if run directly
const startServer = async () => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        logger.error("Database connection failure: MONGODB_URI environment variable is missing!");
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        logger.info("MongoDB database connected successfully for Razorpay module");
    } catch (err) {
        logger.error("MongoDB database connection failed", err);
    }
};

startServer();

export default app;
