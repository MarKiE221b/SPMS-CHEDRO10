import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import heiRoutes from "./routes/hei.js"
import rankPointsRoutes from "./routes/rankPoints.js"
import appDurationRoutes from "./routes/appDuration.js"
import applicantRoutes from "./routes/applicant.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "POST,GET",
    credentials: true
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/hei", heiRoutes);
app.use("/api/points", rankPointsRoutes);
app.use("/api/duration", appDurationRoutes);
app.use("/api/application" ,applicantRoutes);

app.listen(8800, () => {
    console.log("API working!");
  });