const userModel = require('../models/user.model');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


async function registerController(req,res){
    const {username,email,password,bio,profileImage} = req.body;

    // const isUserExistByEmail = await userModel.findOne({email});
    // if(isUserExistByEmail){
    //     return res.status(409).json({
    //         message:"User already exist with same email"
    //     })
    // }

    // const isUserExistByUsername = await userModel.findOne({username});
    // if(isUserExistByUsername){
    //     return res.status(409).json({
    //         message:"User is already exist with same username"
    //     })
    // }

    const isUserExist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(isUserExist){
        return res.status(409).json({
            message:"User already exist , " + (isUserExist.email == email ? "Email already exists":"User already exist")
        })
    }


    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const user = await userModel.create({username,email,password:hash,bio,profileImage});

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,{expiresIn:'1hr'});


    res.cookie('token',token);

    res.status(201).json({
        message:"User Registered successfully.",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })


}

async function loginController(req,res){
    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    if(user.password !== hash){
        return res.status(401).json({
            message:"password invalid"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:'1d'});

    res.cookie('token',token);

    res.status(200).json({
        message:"User loggedIn successfully ",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}