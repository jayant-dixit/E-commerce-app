import User from "../../models/user.model.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"


const deleteUser = async(req, res, next)=>{
    try {
        const id = req.params.id

        const data = await User.deleteOne({_id: id})

        if(!data.acknowledged || data.deletedCount<=0){
            return res.status(404).json(ApiResponse.error(404, "User not found"))
        }

        return res.status(200).json(ApiResponse.success(200, "User deleted successfully"))
    } catch (error) {
        next(new ApiError(500, "Internal server error"))
    }
}


export default deleteUser