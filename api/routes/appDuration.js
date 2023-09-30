import express from "express";
import { getDuration } from "../controllers/appDuration.js";

const router = express.Router()

router.get("/appDur", getDuration)

export default router