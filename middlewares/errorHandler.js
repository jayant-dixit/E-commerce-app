import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    const success = err.success

    console.log(err, err.stack)

    res.status(statusCode).json({
        success,
        statusCode,
        message
    })
}

export default errorHandler