import Cart from "../../models/cart.model.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"


const retrieveCart = async(req, res, next)=>{
    try {
        const cartId = req.user.cart

        const cart = await Cart.findById({_id: cartId}).populate({
            path: "items",
            populate: {
                path: "product"
            }

        })

        return res.status(200).json(ApiResponse.success(200, "Cart retrieved Successfully", cart))
    } catch (error) {
        next(new ApiError(500, error))
    }
}


export default retrieveCart