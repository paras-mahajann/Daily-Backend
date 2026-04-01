const express = require('express')
const cookieParser = require('cookie-parser')



const app = express();
app.use(express.json());
app.use(cookieParser())


const authRoutes = require('./routes/auth.route')

app.use('/api/auth',authRoutes);




module.exports = app;