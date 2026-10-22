import React, { useState } from 'react';
import { createRazorpayOrder, verifyPayment } from '../services/paymentService';

const PaymentButton = ({ 
    orderData, 
    customerDetails, 
    onSuccess, 
    onFailure 
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Inject Razorpay checkout.js script dynamically
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error("Failed to load Razorpay SDK. Please check your internet connection.");
            }

            // Step 1: Create Razorpay Order on Backend
            const orderResponse = await createRazorpayOrder(orderData);
            if (!orderResponse.success) {
                throw new Error(orderResponse.message || "Failed to create order on server");
            }

            const { orderId, razorpayOrderId, amount, currency } = orderResponse.data;

            // Step 2: Configure Razorpay Checkout Options
            const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummy';

            const options = {
                key: razorpayKey,
                amount: amount, // already in paisa from backend
                currency: currency,
                name: "AJ Store",
                description: "Purchase Checkout Transaction",
                order_id: razorpayOrderId,
                handler: async function (response) {
                    setLoading(true);
                    try {
                        // Step 3: Verify Payment Signature on Backend
                        const verificationDetails = {
                            orderId,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        };

                        const verifyResponse = await verifyPayment(verificationDetails);
                        if (verifyResponse.success) {
                            onSuccess(verifyResponse.data);
                        } else {
                            throw new Error(verifyResponse.message || "Payment verification failed");
                        }
                    } catch (err) {
                        onFailure(err.message);
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: customerDetails?.name || '',
                    email: customerDetails?.email || '',
                    contact: customerDetails?.phone || ''
                },
                theme: {
                    color: "#16a34a" // Matches AJ Store green brand color
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        onFailure("Payment cancelled by customer.");
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (err) {
            setError(err.message);
            onFailure(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <button
                type="button"
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition duration-200 select-none flex items-center justify-center cursor-pointer text-lg"
            >
                {loading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Connecting to Secure Gateway...
                    </div>
                ) : (
                    "Proceed to Payment"
                )}
            </button>
            {error && (
                <p className="text-red-500 text-sm mt-2 text-center font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};

export default PaymentButton;
