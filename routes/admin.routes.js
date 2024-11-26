import { Router } from "express"
import fetchAllUsers from "../controllers/adminRoutes/fetchAllUsers.js"
import fetchUser from "../controllers/adminRoutes/fetchUser.js"
import deleteUser from "../controllers/adminRoutes/deleteUser.js"


const router = Router()

router.get("/users", fetchAllUsers)
router.get("/users/:id", fetchUser)
router.delete("/users/:id", deleteUser)


export default router