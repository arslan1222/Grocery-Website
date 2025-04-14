import express from "express"
import { isAuth, loginUser, logout, register } from "../controllers/user.controller.js";
import authUser from "../middlewares/auth.user.js";

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', loginUser);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.get('/logout',authUser, logout)

export default userRouter