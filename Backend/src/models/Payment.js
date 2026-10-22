import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentId: {
        type: String,
        required: true,
        unique: true
    },
    razorpaySignature: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'INR'
    },
    paymentMethod: {
        type: String
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['CAPTURED', 'FAILED', 'REFUNDED'],
        default: 'CAPTURED'
    },
    gatewayResponse: {
        type: mongoose.Schema.Types.Mixed
    },
    webhookPayload: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

export default Payment;
