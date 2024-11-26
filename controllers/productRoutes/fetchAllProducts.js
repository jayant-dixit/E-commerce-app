import Product from "../../models/product.model.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"



const fetchAllProducts = async(req, res, next)=>{
    try {
        const {filter}  = req.body

        let products;
        if(filter){
            products = await Product.find({category: filter})
        } else{
            products = await Product.find()
        }

        if(products.length<=0){
            return res.status(200).json(ApiResponse.error(200, "No Products"))
        }

        return res.status(200).json(ApiResponse.success(200, "Products fetched successfully", products))
    } catch (error) {
        next(new ApiError(500, "Internal Server Error"))
    }
}

export default fetchAllProducts