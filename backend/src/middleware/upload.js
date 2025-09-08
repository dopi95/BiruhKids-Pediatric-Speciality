import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'biruh-kids/doctors',
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext === '.png') return 'png';
      if (ext === '.jpg' || ext === '.jpeg') return 'jpg';
      if (ext === '.gif') return 'gif';
      if (ext === '.webp') return 'webp';
      return 'jpg';
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      return `doctor-${uniqueSuffix}`;
    },
    transformation: [
      { width: 500, height: 500, crop: 'limit', quality: 'auto' }
    ]
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export { cloudinary };
export default upload;