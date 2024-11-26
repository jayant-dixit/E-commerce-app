import mongoose from "mongoose";

export const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Ecommerce"
        })

        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error while connecting db: ",error)
    }
}