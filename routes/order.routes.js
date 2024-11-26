import { Router } from "express";
import createOrder from "../controllers/orderRoutes/createOrder.js";



const router = Router()


router.post("/", createOrder)

export default router