import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import errorHandler from "./middlewares/errorHandler.js"
import isLoggedIn from "./middlewares/isLoggedIn.js"
import isAdmin from "./middlewares/isAdmin.js"
import adminRouter from "./routes/admin.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"

export const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use("/api/users", userRouter)

app.use("/api/admin", isLoggedIn, isAdmin, adminRouter)

app.use("/api/products", productRouter)

app.use("/api/cart", isLoggedIn, cartRouter)

app.use("/api/orders", isLoggedIn, orderRouter)





app.use(errorHandler)


