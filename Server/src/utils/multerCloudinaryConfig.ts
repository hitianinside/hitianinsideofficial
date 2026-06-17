import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

//Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("Missing Cloudinary credentials in environment variables.");
  process.exit(1);
}

// Multer Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Generate a unique, descriptive filename
    const originalName = file.originalname.split(".")[0];
    const uniqueId = Date.now();
    const extension = file.mimetype.split("/")[1];

    return {
      folder: "HITianInside-Album",
      public_id: `${uniqueId}-${originalName}`,
      resource_type: "auto",
      format: extension,
    };
  },
});

//Multer Upload Config
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/", "video/"];
    if (allowedTypes.some((type) => file.mimetype.startsWith(type))) {
      cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed!"));
    }
  },
});

export default upload;