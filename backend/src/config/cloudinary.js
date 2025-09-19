import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary with validation (lazy initialization)
const configureCloudinary = () => {
    if (
        !process.env.CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
    ) {
        console.error("Missing Cloudinary environment variables:");
        console.error(
            "CLOUDINARY_CLOUD_NAME:",
            process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Missing"
        );
        console.error(
            "CLOUDINARY_API_KEY:",
            process.env.CLOUDINARY_API_KEY ? "Set" : "Missing"
        );
        console.error(
            "CLOUDINARY_API_SECRET:",
            process.env.CLOUDINARY_API_SECRET ? "Set" : "Missing"
        );
        return false;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });

    console.log("Cloudinary configured successfully");
    return true;
};

// Initialize configuration when environment variables are available
let isConfigured = false;
const ensureCloudinaryConfigured = () => {
    if (!isConfigured) {
        isConfigured = configureCloudinary();
    }
    return isConfigured;
};

// Configure Cloudinary storage for result files (lazy initialization)
const getResultCloudinaryStorage = () => {
    if (!ensureCloudinaryConfigured()) {
        throw new Error("Cloudinary not configured properly");
    }
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
            const timestamp = Date.now();
            const random = Math.round(Math.random() * 1e9);

            // Detect PDFs and other non-images
            const isPdf = file.mimetype === "application/pdf";

            return {
                folder: "biruh-kids/results",
                resource_type: isPdf ? "raw" : "image", // force raw for PDFs
                public_id: `result-${timestamp}-${random}`,
            };
        },
    });
};

// Create storage instance lazily
let resultCloudinaryStorage = null;
const getResultStorage = () => {
    if (!resultCloudinaryStorage) {
        resultCloudinaryStorage = getResultCloudinaryStorage();
    }
    return resultCloudinaryStorage;
};

export {
    cloudinary,
    getResultStorage as resultCloudinaryStorage,
    ensureCloudinaryConfigured,
};
