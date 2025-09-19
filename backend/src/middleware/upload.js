import multer from "multer";
import path from "path";
import fs from "fs";
import { resultCloudinaryStorage } from "../config/cloudinary.js";

// Ensure upload directories exist
const doctorUploadDir = "uploads/doctors";
const resultUploadDir = "uploads/results";
const testimonialUploadDir = "uploads/testimonials";

if (!fs.existsSync(doctorUploadDir)) {
  fs.mkdirSync(doctorUploadDir, { recursive: true });
}
if (!fs.existsSync(resultUploadDir)) {
  fs.mkdirSync(resultUploadDir, { recursive: true });
}
if (!fs.existsSync(testimonialUploadDir)) {
  fs.mkdirSync(testimonialUploadDir, { recursive: true });
}

// Configure multer for doctor photos
const doctorStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, doctorUploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

// Configure multer for result files (using Cloudinary)
const getResultStorage = () => {
    try {
        return resultCloudinaryStorage();
    } catch (error) {
        console.error('Failed to get Cloudinary storage:', error);
        throw error;
    }
};

// Configure multer for testimonial images
const testimonialStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, testimonialUploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

// File filter for images only (doctors)
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// File filter for result files (pdf, images, docs)
const resultFileFilter = (req, file, cb) => {
  console.log('File being uploaded:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  });
  
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  // Also check file extension as backup
  const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.doc', '.docx', '.txt'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    console.error('File rejected:', {
      mimetype: file.mimetype,
      extension: fileExtension,
      allowedTypes,
      allowedExtensions
    });
    cb(new Error(`File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`), false);
  }
};

// Doctor photo upload
const doctorUpload = multer({
  storage: doctorStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Result file upload (lazy initialization)
const createResultUpload = () => {
  return multer({
    storage: getResultStorage(),
    fileFilter: resultFileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB limit
    }
  });
};

// Create upload instance
let resultUpload = null;
const getResultUpload = () => {
  if (!resultUpload) {
    resultUpload = createResultUpload();
  }
  return resultUpload;
};

// Testimonial image upload
const testimonialUpload = multer({
  storage: testimonialStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Default export for backward compatibility (doctor upload)
export default doctorUpload;

// Named exports
export { doctorUpload, getResultUpload as resultUpload, testimonialUpload };