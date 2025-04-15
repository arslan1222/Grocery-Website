import express from "express"
import authUser from "../middlewares/auth.user.js";
import { getAllOrders, getUserOrder, placeOderCOD } from "../controllers/order.controller.js";
import authSeller from "../middlewares/auth.seller.js";

const orderRouer = express.Router();

orderRouer.post('/cod', authUser, placeOderCOD);
orderRouer.get('/user', authUser, getUserOrder);
orderRouer.get('/seller', authSeller, getAllOrders);

export default orderRouer;