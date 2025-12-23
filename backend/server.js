import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import notify from "./routes/notification.js";
import userRoutes from "./routes/userRoutes.js";
import verificationRoutes from "./routes/otpVerification.js";
import ClaimRoutes from "./routes/claimRoutes.js"
import http from "http"
import { Server } from "socket.io";
import { initIO } from "./utils/socket.js";




dotenv.config();
connectDB(); // connect DB first

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/user/notification", notify);
app.use("/api/user", userRoutes);
app.use("/api/verify", verificationRoutes);
app.use("/api/claim", ClaimRoutes);



// socket code 

const io=new Server(server, {
  cors:{
    origin:"*",
    methods:['GET', 'POST']
  }
});
initIO(io);

io.on("connection", (socket)=>{
  console.log("New client connected:", socket.id);

  socket.on("join", (userId)=>{
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("testEvent", (data) => {
        console.log("Client Sent:", data);
        socket.emit("serverResponse", "Server says Hello 👋");
  });

  socket.on("disconnect", ()=>{
    console.log("Client disconnected:", socket.id);
  });

});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`⚡ Server running on port http://localhost:${PORT}`);
});
