import Product from "../../models/product.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";



const addProduct = async (req, res, next)=>{
    try {
        const {name, description, mrp, price, stock, brand, deliveryTime} = req.body;

        let product = await Product.findOne({name});
        if(product){
            return res.status(400).json(ApiResponse.error(400, "Product with this name already exist"))
        }

        product = await Product.create({name, description, mrp, price, stock, brand, deliveryTime})

        return res.status(200).json(ApiResponse.success(200, "Product added successfully"))
    } catch (error) {
        next(new ApiError(500, error))
    }
}


export default addProduct