import express from "express"
import { isSellerAuth, sellerLogin, SellerLogout } from "../controllers/seller.controller.js";
import authSeller from "../middlewares/auth.seller.js";

const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/is-auth", authSeller, isSellerAuth);
sellerRouter.get("/logout", authSeller, SellerLogout);

export default sellerRouter;
