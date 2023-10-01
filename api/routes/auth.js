import express from "express";
import { login, logout, getTokenData, getDuration } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.get("/logout", logout)
router.get("/tokenData", getTokenData);
router.get("/duration", getDuration)

export default router