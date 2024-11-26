import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"



const profile = async(req, res, next)=>{
    try {
        return res.status(200).json(ApiResponse.success(200, "User data fetched successfully", req.user))
    } catch (error) {
        next(new ApiError(500, "Internal Server Error"))
    }
}

export default profile