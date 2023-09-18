import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


//middlewares
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
  })
);

app.use("/api/auth", authRoutes);

app.listen(8800, () => {
    console.log("API working!");
  });