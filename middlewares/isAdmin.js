import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js"

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user;

        if(user.role !== "admin"){
            return res.status(400).json(ApiResponse.error(400, "You are not an admin"))
        }

        next()
    } catch (error) {
        next(new ApiError(500, "Internal server error"))
    }
}

export default isAdmin