import Product from "../../models/product.model.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"



const deleteProduct = async(req, res, next)=>{
    try {
        const {id} = req.params

        const product = await Product.findByIdAndDelete({_id: id})

        if(!product){
            return res.status(404).json(ApiResponse.error(404, "Product not found"))
        }

        return res.status(200).json(ApiResponse.success(200,"Product deleted successfully", product))
    } catch (error) {
        next(new ApiError(500, error))
    }
}


export default deleteProduct