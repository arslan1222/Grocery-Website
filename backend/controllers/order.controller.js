

// Place Oder

import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const placeOderCOD = async (req, res) => {

    try {
        
        const {userId, items, address} = req.body;
        if(!address || items.length === 0) {
            return res.json({success: false, message: "Invalid Data"});
        }

        // Calculate amount using the items
        let amount = await items.reduce(async(acc, item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;

        }, 0); // Initial acc value zero

        // Add tax charge 2 %
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({success: true, message: "Order Place Successfully!"})


    } catch (error) {
        return res.json({success: false, message: error.message})
        
    }

}


// Get Orders by User ID

export const getUserOrder = async (req, res) =>{

    try {
        const {userId} = req.bosy;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true, orders});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// All orders for seller and admin

export const getAllOrders = async (req, res) =>{

    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true, orders});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

