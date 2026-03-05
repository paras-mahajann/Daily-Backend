const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')


const imageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    
    const {caption} = req.body;

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided, Unauthorized access"
        })
    }
    let decoded;
    try {
        decoded =  jwt.verify(token,process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message:"user not authorized"
        })
    }

    console.log(decoded);
    

    const file = await imageKit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test"
    })

    // res.send(file);

    const post = await postModel.create({
        caption,
        imgUrl:file.url,
        user:decoded.id

    })


    res.status(201).json({
        message:"post created successfully",
        post
    })
}


module.exports = {
    createPostController
}