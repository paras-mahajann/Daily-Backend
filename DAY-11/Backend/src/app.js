const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)
app.use(express.json());
app.use(cookieParser())

const authRoutes = require('./routes/auth.route')
const songRoutes = require('./routes/song.route')

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            message: "File is too large. Maximum upload size is 50MB"
        })
    }

    next(err)
})




module.exports = app;
