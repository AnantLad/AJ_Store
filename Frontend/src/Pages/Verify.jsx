import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { navigate, axios, user, setCartItems } = useAppContext();
    const [loading, setLoading] = useState(true);

    const verifyPayment = async () => {
        try {
            if (!user) return; 
            
            const response = await axios.post('/api/order/verifyStripe', {
                success,
                orderId,
                userId: user._id
            });

            if (response.data.success) {
                setCartItems({});
                toast.success('Payment Verified Successfully!');
                navigate('/my-orders');
            } else {
                toast.error('Payment Failed or Cancelled');
                navigate('/cart');
            }
        } catch (error) {
            toast.error(error.message);
            navigate('/cart');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user) {
            verifyPayment();
        }
    }, [user, success, orderId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600 font-medium">Verifying your payment...</p>
        </div>
    );
};

export default Verify;
