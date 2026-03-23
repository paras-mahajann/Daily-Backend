const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const likeModel = require('../models/like.model')

const imageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    
    const {caption} = req.body;    

    const file = await imageKit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test"
    })

    // res.send(file);

    const post = await postModel.create({
        caption,
        imgUrl:file.url,
        user:req.user.id

    })


    res.status(201).json({
        message:"post created successfully",
        post
    })
}

async function getPostController(req,res){

    
    const userId = req.user.id;

    const posts = await postModel.find({
        user:userId
    });

    res.status(200).json({
        message:"post fetched successfully",
        posts
    })
}

async function getPostDetailsController(req,res) {
    const token = req.cookies.token;

   

    const userId = req.user.id;

    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message:"Post not found."
        })
    }

    const isValidUser = userId==post.user;

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden Content."
        })
    }

    res.status(200).json({
        message:"post fetched successfully",
        post
    })
}

async function likePostController(req,res){
    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message:"Post not found."
        })
    }

    const like = await likeModel.create({
        post:postId,
        user:username
    });

    res.status(200).json({
        message:"Post liked successfully.",
        like
    })

}

async function getFeedController(req,res) {
    const posts = await postModel.find().populate('user');

    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
}
module.exports = { 
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController
}