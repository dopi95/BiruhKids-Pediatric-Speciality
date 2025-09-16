import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload directories exist
const doctorUploadDir = "uploads/doctors";
const resultUploadDir = "uploads/results";

if (!fs.existsSync(doctorUploadDir)) {
  fs.mkdirSync(doctorUploadDir, { recursive: true });
}
if (!fs.existsSync(resultUploadDir)) {
  fs.mkdirSync(resultUploadDir, { recursive: true });
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

// Configure multer for result files
const resultStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resultUploadDir);
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
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, image, and document files are allowed"), false);
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

// Result file upload
const resultUpload = multer({
  storage: resultStorage,
  fileFilter: resultFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Default export for backward compatibility (doctor upload)
export default doctorUpload;

// Named exports
export { doctorUpload, resultUpload };