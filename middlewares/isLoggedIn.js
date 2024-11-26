import User from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (token == undefined || token == "") {
            return res.status(400).json(ApiResponse.error(400, "Logged in first"))
        }

        const {email} = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await User.findOne({email}).select("-password")
        if(!user){
            return res.status(404).json(ApiResponse.error(404, "User not found"))
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        next(new ApiError(500, "Internal Server Error"))
    }
}

export default isLoggedIn