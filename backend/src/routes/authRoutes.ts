import { Router } from "express";
import { handleLogin, handleLogout, handleSignup } from "../controllers/authController";
const router = Router()

router.post("/signup", handleSignup)
router.post("/login", handleLogin)
router.post("/logout", handleLogout)

export default router