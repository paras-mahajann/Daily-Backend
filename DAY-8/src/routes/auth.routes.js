const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const crypto = require('crypto')


const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;


    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist with this email address"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex');

    const user = await userModel.create({ name, email, password:hash })


    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token',token);

    res.status(201).json({
        message: "user register successfully.",
        user,
        token
    })



})

authRouter.post('/protected',(req,res)=>{
    const cookies = req.cookies;
    res.status(200).json({
        message:"you are on protected route..",
        cookies
    })
})

authRouter.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({
            message:"User not found with this email address"
        })
    }

    if(user.password!==crypto.createHash('md5').update(password).digest('hex')){
        return res.status(401).json({
            message:"You Entered wrong password!!"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET);

    res.cookie('jwt-token',token);

    res.status(200).json({
        message:"user logged in",
        user
    })
})


module.exports = authRouter;