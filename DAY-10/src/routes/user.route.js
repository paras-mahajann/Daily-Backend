const express = require('express');
const {followUserController} = require('../controllers/user.controller');
const identifyUser = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter.post('/follow/:username',identifyUser,followUserController);







module.exports = userRouter;