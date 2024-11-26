import Cart from "../../models/cart.model.js"
import Product from "../../models/product.model.js"
import Order from "../../models/order.model.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"


const createOrder = async(req, res, next)=>{
    try {
        const userId = req.user._id

        const cart = await Cart.findOne({user: userId}).populate("items.product")

        if(!cart || cart.items.length <=0){
            return res.json(400).json(ApiResponse.error(400, "Cart is Empty"))
        }

        let totalPrice = 0
        let orderItems = []
        let totalQuantity = 0

        for(const items in cart.items){
            const product = await Product.findById({_id: items.product})

            if(!product){
                return res.status(404).json(ApiResponse.error(404, "Product is not available"))
            }

            if(product.stock<items.quantity){
                return res.json(200).json(ApiResponse.error(200, `Insufficient Quantity of ${product.name}`))
            }

            product.stock -= items.quantity
            await product.save() 

            totalPrice += product.price * items.quantity
            totalQuantity += items.quantity

            orderItems.push({
                product: items.product._id,
                quantity: items.quantity
            })

        }

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalPrice,
            totalQuantity
        })
        
        await Cart.findByIdAndUpdate({user: userId}, {items: []})

        return res.status(200).json(ApiResponse.success(200, "Order Placed Successfully", order))
    } catch (error) {
        console.log(error)
        next(new ApiError(500, error))
    }
}

export default createOrder