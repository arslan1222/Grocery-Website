import jwt from "jsonwebtoken"

// Seller Login

export const sellerLogin = async (req, res) => {
    
    try {
        const {email, password} = req.body;

    if(email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('sellerToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({success: true, message: "Logged In!"})
    } else {
        return res.json({success: false, message: "Invalid Credentials!"})

    }
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message})
    }

}

// Seller Auth
export const isSellerAuth = async (req, res) => {
    try {
        
        return res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Logout Seller
export const SellerLogout = async (req, res) => {
    
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : "strict",
        });
        res.json({success: true, message: "Logged out!"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }

}