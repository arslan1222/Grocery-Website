

import express from "express"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {

    try {
        
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            res.json({success: false, message: "Missing Credentials"})
        }  

        const existingUser = await User.findOne({email});

        if(existingUser) {
            res.json({success: false, message: "User already exits"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true, // Prevent javaScript to access the cookie
            secure: process.env.NODE_ENV === "production", // user secure cookie in production
            sameSite: process.env.NODE_ENV === "production" ? 'none' : "strict", // CRF Production
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie Expiration time
        })

        return res.json({success: true, user: {email: user.email, name: user.name}})

    } catch (error) {
        res.json({success: false, message: error.message})
    }

}


export const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.json({success: false, message: "Email and Password are required!"})
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.json({success: false, message: "Invalid email or password!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({success: false, message: "Email and Password are required!"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true, // Prevent javaScript to access the cookie
            secure: process.env.NODE_ENV === "production", // user secure cookie in production
            sameSite: process.env.NODE_ENV === "production" ? 'none' : "strict", // CRF Production
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie Expiration time
        })

        return res.json({success: true, user: {email: user.email, name: user.name}})

    } catch (error) {
        res.json({success: false, message: error.message})
        
    }

}

export const isAuth = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.json({ success: false, message: "Unauthorized access" });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, user });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : "strict",
        });
        res.json({success: true, message: "Logged out!"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }

}