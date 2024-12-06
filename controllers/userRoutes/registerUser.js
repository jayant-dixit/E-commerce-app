import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../models/user.model.js"
import Cart from "../../models/cart.model.js"

const hashedPassword = async(password)=>{
    const hash = await bcrypt.hash(password, 10);

    return hash
}


const registerUser = async(req, res, next)=>{
    try {
        const {name, email, password, contact} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json(ApiResponse.error(400, "User already exist with this email id or Contact Number"))
        }

        const hashPassword = await hashedPassword(password)

        user = await User.create({
            name,
            email,
            password: hashPassword,
            contact
        })

        const cart = await Cart.create({user: user._id})

        user.cart = cart._id
        await user.save()

        const token = jwt.sign({email, role: user.role}, process.env.JWT_SECRET_KEY)

        return res.status(200).cookie("token", token, {expires: new Date(Date.now() + 86400000)}).json(ApiResponse.success(200, "User created successfully", user))

    } catch (error) {
        console.log(error)
        next(new ApiError(500, "Error while registering user")) 
    }
}

export default registerUser