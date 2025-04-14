import jwt from "jsonwebtoken"

const authSeller = async (req, res, next) => {

    const {sellerToken} = req.cookies;

    if(!sellerToken) {
        return res.json({success: false, message: "Not Authrized!"})
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.json({ success: false, message: "Invalid Token!" });
        }

    } catch (error) {
        return res.json({ success: false, message: "Not Authorized!" });
    }    

}

export default authSeller;