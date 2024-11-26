import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"


const logoutUser = async(req, res, next)=>{
    try {
        const token = req.cookies.token

        if(!token) return res.status(400).json(ApiResponse.error(400, "Logged in first"))

        return res.status(200).clearCookie("token").json(ApiResponse.success(200, "User logged out successfully"))
    } catch (error) {
        console.log("Error in logout",error)
        next(new ApiError(500, "Internal Server Error"))
    }
}

export default logoutUser