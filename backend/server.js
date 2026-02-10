import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";
import taskrouter from "./routes/taskRoutes.js";
dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",router);
app.use("/api/tasks",taskrouter);
const port=process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});