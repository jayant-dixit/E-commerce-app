import { Router } from "express"
import { confirmOrder, processOrderAndPayment } from "../controllers/orderRoutes/processPayment.js"




const router = Router()

router.post("/", processOrderAndPayment)

router.post("/confirm", confirmOrder)


export default router