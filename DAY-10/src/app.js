const express = require('express')
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());

//require routes

const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');
const userRouter = require('./routes/user.route');


app.use('/api/auth',authRouter);
app.use('/api/posts',postRouter);
app.use('/api/user',userRouter);



module.exports = app;