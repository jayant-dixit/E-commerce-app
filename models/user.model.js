import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
    },
    street: String,
    landmark: String,
    contact: String,
    city: String,
    state: String,
    pincode: String
})

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    contact:{
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: addressSchema
    },
    role:{
        type: String,
        enum: ['customer','admin'],
        default: 'customer'
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
})

const User = mongoose.model("User", userSchema)


export default User