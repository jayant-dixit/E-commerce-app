import mongoose from "mongoose";
import { addressSchema } from "./user.model.js";



const orderSchema = new mongoose.Schema({
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
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "shipped"],
        default: "pending"
    },
    paymentDetails: {
        status:{
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending"
        },
        transactionId: String,
        paymentMethod: String
    },
    shippingAddress: addressSchema
}, { timestamps: true })


const Order = mongoose.model("Order", orderSchema)


export default Order