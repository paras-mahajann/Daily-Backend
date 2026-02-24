const express = require('express')
const userRouter = require('../src/routes/auth.routes');
const authRouter = require('../../DAY-8/src/routes/auth.routes');
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth/',authRouter);



module.exports = app;