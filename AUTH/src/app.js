const express = require('express')
const userModel = require('./models/user.model')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter);



module.exports = app;