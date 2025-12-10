// import {CloudinaryStorage } from "multer-storage-cloudinary";
import multerStorageCloudinary from "multer-storage-cloudinary";

import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";


const storage=multerStorageCloudinary({
    cloudinary:cloudinary,
    params:{
        folder: "lost_found_items",
        allowed_formats: ["jpg", "jpeg", "png"],
    }
});

const parser=multer({storage});

export default parser;