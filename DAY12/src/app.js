import express from "express";
import authRouter from "./routes/auth.route.js";
import handleError from "./middlewares/error.middleware.js";


const app = express()
app.use(express.json());

app.use("/api/auth",authRouter);




app.use(handleError)//error handling middleware always used at end of the of app.js
export default app;