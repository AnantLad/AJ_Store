
// Place Order COD : api/order/cod

import Order from "../models/Order.js";
import Product from "../models/Product.js";


const currency = "usd"; // or any default
const deliveryCharge = 10; // or 0 if free

export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" })

        }
        // Calculate Amount Using Items 
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            PaymentType: "COD",

        });

        return res.json({ success: true, message: "Order Placed Successfully" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get Orders by User ID : /api/order/user
export const getUserOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or: [{ PaymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get All Orders (for seller / admin) : api/order/seller 
export const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ PaymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
