import { Router } from "express";
import fetchAllProducts from "../controllers/productRoutes/fetchAllProducts.js";
import fetchProduct from "../controllers/productRoutes/fetchProduct.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
import addProduct from "../controllers/productRoutes/addProduct.js";
import deleteProduct from "../controllers/productRoutes/deleteProduct.js";
import updateProduct from "../controllers/productRoutes/updateProduct.js";


const router = Router()

router.get("/",fetchAllProducts)

router.post("/addproduct", isLoggedIn, isAdmin, addProduct)

router.delete("/:id", isLoggedIn, isAdmin, deleteProduct)

router.put("/:id", isLoggedIn, isAdmin, updateProduct)

router.get("/:id", fetchProduct)


export default router