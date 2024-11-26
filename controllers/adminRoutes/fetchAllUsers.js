import User from "../../models/user.model.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"



const fetchAllUsers = async(req, res, next)=>{
    try {
        const users = await User.find({role: "customer"}).select("-password -role -cart")

        if(!users) return res.status(400).json(ApiResponse.error(400, "Users not found"))

        return res.status(200).json(ApiResponse.success(200, "Users fetched successfully", users))
    } catch (error) {
        next(new ApiError(500, "Error while fetching all users"))
    }
}

export default fetchAllUsers