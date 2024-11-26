import { Router } from "express";
import registerUser from "../controllers/userRoutes/registerUser.js";
import loginUser from "../controllers/userRoutes/loginUser.js"
import logoutUser from "../controllers/userRoutes/logoutUser.js";
import profile from "../controllers/userRoutes/profile.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/profile",isLoggedIn, profile)

export default router