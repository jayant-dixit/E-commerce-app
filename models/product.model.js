import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    mrp:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    brand:{
        type: String,
    },
    category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
},{timestamps: true})

const Product = mongoose.model("Product", productSchema)

export default Product