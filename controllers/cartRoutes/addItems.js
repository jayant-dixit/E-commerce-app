import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js";


const addItems = async(req, res, next)=>{
    try {
        const user = req.user;

        const {productId, quantity} = req.body

        const product = await Product.findById({_id: productId})

        if(!product){
            return res.json(404).json(ApiResponse.error(404, "Product is not available"))
        }

        const cart = await Cart.findOne({user: user._id})

        cart.items.push({product: productId, quantity})

        cart.totalQuantity += product.price * quantity;

        cart.totalPrice += quantity;

        await cart.save()

        res.json(200).json(ApiResponse.success(200, "Item added to cart", cart))
    } catch (error) {
        next(new ApiError(500, error))
    }
}

export default addItems