
// Place Order COD : api/order/cod

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";

const currency = "usd"; // or any default
const deliveryCharge = 10; // or 0 if free

export const placeOrderCOD = async(req , res )=>{
    try {
        const { userId , items , address } = req.body;
        if(!address || items.length === 0){
            return res.json({success : false , message : "Invalid data"})

        }
        // Calculate Amount Using Items 
        let amount  = await items.reduce(async(acc , item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        },0)

        // Add tax Charge (2%)
        amount += Math.floor(amount * 0.02);
        
        await Order.create({
            userId,
            items,
            amount,
            address,
            PaymentType : "COD",

        });

        return res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message});
    }
}

// Get Orders by User ID : /api/order/user
export const getUserOrder = async (req , res)=>{
    try {
        const userId = req.userId || (req.body && req.body.userId); 
        const orders = await Order.find({
            userId,
            $or: [{PaymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success : true , orders});
    } catch (error) {
        res.json({success : false, message : error.message});
    }
}

// Get All Orders (for seller / admin) : api/order/seller 
export const getAllOrder = async (req , res)=>{
    try {
        const orders = await Order.find({
            $or: [{PaymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success : true , orders});
    } catch (error) {
        res.json({success : false, message : error.message});
    }
}

// Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        let amount = 0;
        const line_items = await Promise.all(items.map(async (item) => {
            const product = await Product.findById(item.product);
            amount += product.offerPrice * item.quantity;
            return {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.offerPrice * 100,
                },
                quantity: item.quantity,
            };
        }));

        // Add tax Charge (2%)
        const tax = Math.floor(amount * 0.02);
        amount += tax;
        
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Tax (2%)",
                },
                unit_amount: tax * 100,
            },
            quantity: 1,
        });

        const newOrder = await Order.create({
            userId,
            items,
            amount: amount,
            address,
            PaymentType: "Stripe",
            isPaid: false,
        });

        // Ensure origin is set, fallback to env or localhost
        const frontend_url = origin || process.env.FRONTEND_URL || "http://localhost:5173";

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Verify Stripe Payment
export const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body;

        if (success === "true" || success === true) {
            await Order.findByIdAndUpdate(orderId, { isPaid: true });
            await User.findByIdAndUpdate(userId, { cartItems: {} });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            await Order.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};