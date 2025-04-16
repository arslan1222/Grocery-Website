import express from "express"
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/auth.seller.js";
import { addProduct, changeStock, getProduct, productList } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.get('/id', getProduct);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;