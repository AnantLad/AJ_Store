import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import axios from "axios";




export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [searchQuery, setsearchQuery] = useState({})
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})


    // Backend URL configuration
    // For production, use the root path / so the nginx proxy handles it
    const backendUrl = import.meta.env.DEV
        ? '/api/'
        : 'http://localhost:4000/api/';

    axios.defaults.baseURL = backendUrl;
    axios.defaults.withCredentials = true;

    //fetch seller Status

    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/seller/is-auth')
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            console.error(error);
            setIsSeller(false)
        }
    }

    //fetch user Auth Status , User Data  and Cart Items

    const fetchUser = async () => {
        try {

            const { data } = await axios.get('/user/is-auth')
            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            toast.error(error.message);
            setUser(null);
        }
    }


    //fetch all products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //update cart Quetity
    const getCartCout = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // total cart amount 
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            let itemInfo = products.find((pr) => pr._id == item);
            if (itemInfo && cartItems[item] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[item];
            }

        }
        return Math.floor(totalAmount * 100) / 100
    }


    //add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Add To Cart")
    }

    //update card item quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("card item Updated")
    }

    //remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from cart")
        setCartItems(cartData)
    }


    // add address
    const addAddress = async (address) => {
        try {
            const { data } = await axios.post("/address/add", {
                address,
                userId: user._id,
            });
            if (data.success) {
                toast.success(data.message);
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    // get address
    const getAddress = async () => {
        try {
            const { data } = await axios.get("/address/get");
            if (data.success) {
                return data.address;
            } else {
                toast.error(data.message);
                return [];
            }
        } catch (error) {
            toast.error(error.message);
            return [];
        }
    };

    // place order api
    const placeOrderAPI = async (orderData, paymentMethod) => {
        try {
            if (paymentMethod === "COD") {
                const { data } = await axios.post("/order/cod", orderData);
                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate('/my-orders');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // submit contact form
    const submitContact = async (contactData) => {
        try {
            const { data } = await axios.post("/contact/submit", contactData);
            if (data.success) {
                toast.success(data.message);
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts()

    }, [])

    // Update Database cart Items 
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/cart/update', { userId: user._id, cartItems })
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if (user) {
            updateCart()
        }
    }, [cartItems, user])

    const value = useMemo(() => ({
        navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin,
        products, currency, addToCart, updateCartItem, removeFromCart, cartItems,
        setCartItems, searchQuery, setsearchQuery, getCartAmount, fetchProducts,
        getCartCout, setProducts, axios, addAddress, getAddress, placeOrderAPI, submitContact
    }), [
        user, isSeller, showUserLogin, products, cartItems, searchQuery
    ]);
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}