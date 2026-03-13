const express = require('express');
const {followUserController,unfollowUserController, updateFollowStatusController} = require('../controllers/user.controller');
const identifyUser = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter.post('/follow/:username',identifyUser,followUserController);

userRouter.post('/unfollow/:username',identifyUser,unfollowUserController);

userRouter.post('/follow/:username/status',identifyUser,updateFollowStatusController)



module.exports = userRouter;