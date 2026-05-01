const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pos-products",
        allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
    },
})

const upload = multer({ storage: storage,limits:{fileSize:1024*1024*5} });
module.exports = upload