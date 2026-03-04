const express  = require('express');
const postController = require('../controllers/post.controller');
const postRouter = express.Router();

postRouter.post('/api/post',postController.createPostController );



module.exports = postRouter;