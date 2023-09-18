import express from "express";
import { login, logout, getTokenData } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.get("/logout", logout)
router.get("/tokenData", getTokenData);

export default router