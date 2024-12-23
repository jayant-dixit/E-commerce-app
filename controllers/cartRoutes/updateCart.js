import Cart from "../../models/cart.model.js";
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js";


const updateCart = async (req, res, next) => {

    try {
        const { cartId, productId, quantity } = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId, 
            { 
                $set: 
                { 
                    "items.$[elem].quantity": quantity 
                } 
            }, 
            { 
                arrayFilters: 
                [
                    { 
                        "elem.product": productId 
                    }
                ] 
            }
        )

        updatedCart.totalQuantity = updatedCart.items.reduce((total, item) => total + item.quantity, 0)

        await updatedCart.save()

        return res.status(200).json(ApiResponse.success(200, "Cart updated successfully", updatedCart))
    } catch (error) {
        console.log(error)
        next(new ApiError(500, error.message))
    }

}

export default updateCart


