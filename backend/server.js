import "dotenv/config"
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import connection from "./configs/mongodb.js";
import userRouter from "./routes/user.route.js";
import sellerRouter from "./routes/seller.route.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/product.route.js";


const app = express();

const PORT = process.env.PORT || 3000;

// Databse Connection
await connection();
await connectCloudinary();

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({origin: allowedOrigins, credentials: true})); // Allow to acces the backend
app.use(cookieParser());
app.use(express.json());

// Api Endpoints
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res)=>{
    res.send("I am root");
})

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
    
})