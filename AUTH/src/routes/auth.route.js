const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


authRouter.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    const isUserExists = await userModel.findOne({email});

    if(isUserExists) {
        return res.status(409).json({
            message:"User already exists"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password:crypto.createHash('sha256').update(password).digest('hex')
    })

    const token  = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,
    {expiresIn:"1h"});

    res.cookie('token',token);

    res.status(201).json({
        message:"user created successfully."
    })
    

})


module.exports = authRouter;