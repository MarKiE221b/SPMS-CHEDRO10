import express from "express";
import { getGrade, getIncome } from "../controllers/rankPoints.js";

const router = express.Router()

router.get("/grade", getGrade)
router.get("/income", getIncome)

export default router