import User from "../../models/user.model.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"



const fetchUser = async(req, res, next)=>{
    try {
        const id = req.params.id

        let user = await User.findById({_id: id}).select("-password")

        if(!user){
            return res.status(400).json(ApiResponse.error(400, "User not found"))
        }

        return res.status(200).json(ApiResponse.success(200, "User found", user))
    } catch (error) {
        console.log(error)
        next(new ApiError(500, "Internal Server Error"))
    }
}

export default fetchUser