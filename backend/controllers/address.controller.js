import Address from "../models/address.model.js";

// Add Address
export const addAddress = async (req, res) => {
    
    try {
        
        const { address, userId}= req.body;

        await Address.create({...address, userId});

        res.json({success: true, message: "Address Added Succefully!"})

    } catch (error) {
        res.json({success: false, message: error.message})
        
    }

}

// Get address
export const getAddress = async (req, res) => {

    try {
        
        const userId = req.query.userId;

        const addresses = await Address.find({userId})
        res.json({success: true, addresses})

    } catch (error) {
        res.json({success: true, message: error.message})
    }

}