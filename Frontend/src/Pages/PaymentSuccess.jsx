import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId') || '';

    return (
        <div className="max-w-md mx-auto px-6 py-16 text-center flex flex-col items-center justify-center min-h-[70vh] mt-10">
            {/* Checked Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-500 mb-6 text-sm">
                Thank you for your purchase. Your payment was safely received and processed.
            </p>

            {orderId && (
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 w-full mb-8 text-left text-sm">
                    <div className="flex justify-between mb-1.5">
                        <span className="text-gray-400 font-medium">Order Reference:</span>
                        <span className="text-gray-700 font-semibold font-mono text-xs">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400 font-medium">Status:</span>
                        <span className="text-green-600 font-semibold uppercase tracking-wider text-xs">Processing</span>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                    onClick={() => navigate('/my-orders')}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition cursor-pointer text-sm"
                >
                    View My Orders
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition cursor-pointer text-sm"
                >
                    Back to Store
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
