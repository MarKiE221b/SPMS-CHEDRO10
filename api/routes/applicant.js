import express from "express";
import { application } from "../controllers/applicant.js";

const router = express.Router()

router.post("/applicant", application)

export default router