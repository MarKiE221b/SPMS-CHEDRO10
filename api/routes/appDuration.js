import express from "express";
import { getDuration } from "../controllers/appDuration.js";

const router = express.Router()

router.get("/duration", getDuration)

export default router