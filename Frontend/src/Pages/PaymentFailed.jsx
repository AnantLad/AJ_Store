import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentFailed = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const errorMessage = searchParams.get('error') || 'An unexpected validation error occurred during payment processing.';

    return (
        <div className="max-w-md mx-auto px-6 py-16 text-center flex flex-col items-center justify-center min-h-[70vh] mt-10">
            {/* Failure/Cross Icon */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Failed</h1>
            <p className="text-gray-500 mb-6 text-sm">
                We could not complete your transaction. No funds were debited from your account.
            </p>

            <div className="bg-red-50 border border-red-100 text-red-800 rounded-lg p-4 w-full mb-8 text-left text-sm font-medium">
                <span className="text-red-400 text-xs block mb-1">Reason:</span>
                {errorMessage}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                    onClick={() => navigate('/cart')}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition cursor-pointer text-sm"
                >
                    Return to Cart
                </button>
                <button
                    onClick={() => navigate('/products')}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition cursor-pointer text-sm"
                >
                    Browse Catalog
                </button>
            </div>
        </div>
    );
};

export default PaymentFailed;
