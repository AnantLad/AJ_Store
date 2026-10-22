import axios from 'axios';

// Ensure base URL is set from environment or fallback
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true // send cookies
});

export const createRazorpayOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post('/api/payments/create-order', orderData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error generating payment checkout session');
    }
};

export const verifyPayment = async (verificationDetails) => {
    try {
        const response = await axiosInstance.post('/api/payments/verify', verificationDetails);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Payment signature verification failed');
    }
};

export const refundPayment = async (refundDetails) => {
    try {
        const response = await axiosInstance.post('/api/payments/refund', refundDetails);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error processing refund');
    }
};

export const fetchOrderDetails = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/api/orders/${orderId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching order details');
    }
};

export const fetchUserOrders = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/orders/user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching user orders');
    }
};
