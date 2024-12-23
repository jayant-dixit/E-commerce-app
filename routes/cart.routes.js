import { Router } from "express";
import retrieveCart from "../controllers/cartRoutes/retrieveCart.js";
import addItems from "../controllers/cartRoutes/addItems.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import updateCart from "../controllers/cartRoutes/updateCart.js";


const router = Router()

router.get("/", isLoggedIn, retrieveCart)

router.put("/", isLoggedIn, updateCart)

router.post("/", isLoggedIn, addItems)


export default router