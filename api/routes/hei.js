import express from "express";
import { getHei } from "../controllers/hei.js";

const router = express.Router()

router.get("/data", getHei)

export default router