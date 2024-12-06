import mongoose, { mongo } from "mongoose";


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        }
    }],
    totalQuantity: {
        type: Number,
        required: true,
        default:0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})


const Cart = mongoose.model("Cart", cartSchema)

export default Cart