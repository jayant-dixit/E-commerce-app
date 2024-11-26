import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import bcrypt from "bcrypt"
import ApiResponse from "../../utils/ApiResponse.js";
import jwt from "jsonwebtoken"


const loginUser = async(req, res, next)=>{
    try {
        const {email, password} = req.body;

        if(req.cookies.token) {
            return res.status(400).json(ApiResponse.error(400, "User already logged in"))
        }
    
        let user = await User.findOne({email})
    
        if(!user){
            next(new ApiError(404, "User not found"))
        }

    
        let isPasswordCorrect = await bcrypt.compare(password, user.password)
    
        if(!isPasswordCorrect){
            return res.status(404).json(ApiResponse.error(404, "Invalid Credentials"))
        }
    
        let token = jwt.sign({email, role: user.role}, process.env.JWT_SECRET_KEY)
    
        return res.status(200).cookie("token", token, {expires: new Date(Date.now() + 86400000)}).json(ApiResponse.success(200, "User logged in Successfully", user))
    } catch (error) {
        next(new ApiError(500, "Internal Server Error"))
    }

}

export default loginUser