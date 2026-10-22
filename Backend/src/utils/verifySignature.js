import crypto from 'crypto';

/**
 * Verifies Razorpay payment signature
 * @param {string} orderId 
 * @param {string} paymentId 
 * @param {string} signature 
 * @param {string} secret 
 * @returns {boolean}
 */
export const verifyPaymentSignature = (orderId, paymentId, signature, secret) => {
    const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');
    return generatedSignature === signature;
};

/**
 * Verifies Razorpay webhook signature
 * @param {string} rawBody 
 * @param {string} signatureHeader 
 * @param {string} webhookSecret 
 * @returns {boolean}
 */
export const verifyWebhookSignature = (rawBody, signatureHeader, webhookSecret) => {
    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');
    return expectedSignature === signatureHeader;
};
