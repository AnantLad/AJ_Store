import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';
import PaymentButton from '../Components/PaymentButton';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { 
        cartItems, 
        products, 
        user, 
        getCartAmount, 
        getAddress, 
        setCartItems 
    } = useAppContext();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(true);
    const [cartDetails, setCartDetails] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    const taxRate = 0.02; // 2% tax
    const shippingFee = 0; // Free shipping

    useEffect(() => {
        if (!user) {
            toast.error("Please login to proceed to checkout");
            navigate('/');
            return;
        }

        // Load cart detail list
        const items = [];
        let calculatedSubtotal = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (product && cartItems[itemId] > 0) {
                const qty = cartItems[itemId];
                calculatedSubtotal += product.offerPrice * qty;
                items.push({
                    product: product._id,
                    name: product.name,
                    image: product.image[0],
                    offerPrice: product.offerPrice,
                    quantity: qty
                });
            }
        }
        setCartDetails(items);
        setSubtotal(calculatedSubtotal);

        // Fetch saved addresses
        const fetchAddresses = async () => {
            try {
                const list = await getAddress();
                if (list && list.length > 0) {
                    setAddresses(list);
                    setSelectedAddress(list[0]);
                }
            } catch (error) {
                console.error("Error loading addresses", error);
            } finally {
                setLoadingAddress(false);
            }
        };
        fetchAddresses();
    }, [user, cartItems, products, navigate]);

    if (cartDetails.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
                <button 
                    onClick={() => navigate('/products')}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer"
                >
                    Shop Products
                </button>
            </div>
        );
    }

    const calculatedTax = Number((subtotal * taxRate).toFixed(2));
    const totalAmount = Number((subtotal + calculatedTax + shippingFee).toFixed(2));

    const orderData = {
        items: cartDetails.map(item => ({
            product: item.product,
            quantity: item.quantity
        })),
        subtotal,
        tax: calculatedTax,
        shipping: shippingFee,
        totalAmount
    };

    const customerDetails = {
        name: user?.name,
        email: user?.email,
        phone: selectedAddress?.phone || ''
    };

    const handlePaymentSuccess = (verifiedOrder) => {
        setCartItems({}); // Reset local cart
        toast.success("Order Placed Successfully!");
        navigate(`/payment-success?orderId=${verifiedOrder._id}`);
    };

    const handlePaymentFailure = (errorMessage) => {
        toast.error(`Transaction Failed: ${errorMessage}`);
        navigate(`/payment-failed?error=${encodeURIComponent(errorMessage)}`);
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 mt-10">
            {/* Left Column: Address Selection */}
            <div className="flex-1">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Checkout Review</h1>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-700 mb-4 uppercase tracking-wider border-b pb-2">
                        Delivery Address
                    </h2>
                    
                    {loadingAddress ? (
                        <p className="text-gray-500 animate-pulse">Loading addresses...</p>
                    ) : addresses.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-gray-500 mb-4">No addresses found.</p>
                            <button 
                                onClick={() => navigate('/add-address')}
                                className="px-5 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium border border-green-300 rounded cursor-pointer text-sm"
                            >
                                Add Address
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {addresses.map((addr) => (
                                <label 
                                    key={addr._id} 
                                    className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition ${
                                        selectedAddress?._id === addr._id 
                                            ? 'border-green-600 bg-green-50/20' 
                                            : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <input 
                                        type="radio" 
                                        name="selectedAddress" 
                                        checked={selectedAddress?._id === addr._id}
                                        onChange={() => setSelectedAddress(addr)}
                                        className="mt-1 accent-green-600"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {addr.firstName} {addr.lastName}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {addr.street}, {addr.city}, {addr.state}, {addr.zipcode}, {addr.country}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1 font-medium">
                                            Phone: {addr.phone}
                                        </p>
                                    </div>
                                </label>
                            ))}
                            <button 
                                onClick={() => navigate('/add-address')}
                                className="text-green-600 font-medium hover:underline text-sm inline-block mt-2 cursor-pointer"
                            >
                                + Add another shipping address
                            </button>
                        </div>
                    )}
                </div>

                {/* Cart Items Details List */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mt-8">
                    <h2 className="text-lg font-medium text-gray-700 mb-4 uppercase tracking-wider border-b pb-2">
                        Product Details
                    </h2>
                    <div className="divide-y divide-gray-100">
                        {cartDetails.map((item) => (
                            <div key={item.product} className="flex items-center gap-4 py-4">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-16 h-16 object-contain border border-gray-100 rounded p-1"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Qty: {item.quantity} × ${item.offerPrice}
                                    </p>
                                </div>
                                <p className="font-semibold text-gray-800 text-sm">
                                    ${(item.offerPrice * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Order Summary & Checkout Trigger */}
            <div className="w-full md:w-[380px] shrink-0">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
                        Order Summary
                    </h2>
                    
                    <div className="space-y-4 text-sm text-gray-600 mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (2%)</span>
                            <span className="font-medium text-gray-800">${calculatedTax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex justify-between text-base text-gray-800 font-semibold pt-1">
                            <span>Total Amount</span>
                            <span className="text-green-600 text-lg">${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {!selectedAddress ? (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs text-center font-medium">
                            Please select or configure a shipping address to unlock checkout.
                        </div>
                    ) : (
                        <PaymentButton 
                            orderData={orderData}
                            customerDetails={customerDetails}
                            onSuccess={handlePaymentSuccess}
                            onFailure={handlePaymentFailure}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
