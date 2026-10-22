import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
    console.warn("WARNING: Razorpay credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are not set in the environment variables!");
}

const razorpayInstance = new Razorpay({
    key_id: keyId || 'dummy_key_id',
    key_secret: keySecret || 'dummy_key_secret',
});

export default razorpayInstance;
