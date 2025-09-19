import multer from "multer";
import path from "path";
import fs from "fs";
import { resultCloudinaryStorage, cloudinary, ensureCloudinaryConfigured } from "../config/cloudinary.js";


import { CloudinaryStorage } from "multer-storage-cloudinary";

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

// Configure Cloudinary storage for doctor photos
const getDoctorCloudinaryStorage = () => {
    // Ensure Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        throw new Error('Cloudinary configuration missing');
    }
    
    console.log('Creating Cloudinary storage for doctors with config:', {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing'
    });
    
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
            const timestamp = Date.now();
            const random = Math.round(Math.random() * 1e9);
            
            return {
                folder: "biruh-kids/doctors",
                resource_type: "image",
                public_id: `doctor-${timestamp}-${random}`,
                transformation: [
                    { width: 400, height: 400, crop: "fill", quality: "auto" }
                ]
            };
        },
    });
};

// Fallback local storage for doctor photos
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

// Doctor photo upload with Cloudinary
const createDoctorUpload = () => {
  try {
    // Ensure Cloudinary is configured first
    ensureCloudinaryConfigured();
    
    const storage = getDoctorCloudinaryStorage();
    console.log('Using Cloudinary storage for doctors');
    
    return multer({
      storage: storage,
      fileFilter: imageFilter,
      limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
      }
    });
  } catch (error) {
    console.warn('Cloudinary not available for doctors, using local storage:', error.message);
    return multer({
      storage: doctorStorage,
      fileFilter: imageFilter,
      limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
      }
    });
  }
};

const getDoctorUpload = () => {
  console.log('Creating doctor upload instance...');
  return createDoctorUpload();
};

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

// Named exports
export { getDoctorUpload as doctorUpload, getResultUpload as resultUpload, testimonialUpload };