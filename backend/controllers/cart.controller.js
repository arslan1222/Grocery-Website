import User from "../models/user.model.js";

// Update user cart data
export const updateCart = async (req, res) => {

    try {
        
        const { userId, cartItems} = req.body;

        await User.findByIdAndUpdate(userId, {cartItems});

        res.json({successs: true, message: "Cart Updated!"});

    } catch (error) {
        res.json({successs: true, message: error.message});
    }

}