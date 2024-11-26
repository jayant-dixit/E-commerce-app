import Product from "../../models/product.model.js";
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js";


const updateProduct = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const {name, description, mrp, price, stock, brand} = req.body;

        const product = await Product.findById({_id: id})
        if(!product){
            return res.status(404).json(ApiResponse.error(404, "Product not found"))
        }

        if(name) product.name = name;
        if(description) product.description = description
        if(mrp) product.mrp = mrp
        if(price) product.price = price
        if(stock) product.stock = stock
        if(brand) product.brand = brand

        const updatedProduct = await product.save()

        return res.status(200).json(ApiResponse.success(200, "Product Updated Successfully", updatedProduct))
    } catch (error) {
        next(new ApiError(500, error))
    }
}

export default updateProduct