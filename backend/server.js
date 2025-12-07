import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";
dotenv.config();
connectDB();


const app=express();


app.use(cors);
app.use(express.json);
app.use(errorHandler);


app.get("/", (req, res)=>{
    res.send("Lost & Found API Running 🚀");
})


const PORT=process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`⚡ Server running on port ${PORT}`);
})