import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/Jayant Dixit/OneDrive/E-Commerce App/frontend/public/assets/product_images')
    },
    filename: function (req, file, cb) {
        const uniqueName = file.originalname
        cb(null, uniqueName)
    }
})

export const upload = multer({ storage: storage })