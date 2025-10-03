import express from "express";
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial,
  rejectTestimonial,
  getTestimonialsForDisplay,
} from "../controllers/testimonialController.js";
import { testimonialUpload } from "../middleware/upload.js";
import { validateTestimonialData, rateLimitTestimonials } from "../middleware/testimonialValidation.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";
import auditMiddleware from "../middleware/auditMiddleware.js";

const router = express.Router();

// Error handling wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Multer error handling middleware
const handleMulterError = (error, req, res, next) => {
  if (error) {
    console.error("Multer error:", error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum size is 5MB.",
      });
    }
    if (error.message === 'Only image files are allowed') {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed.",
      });
    }
    return res.status(400).json({
      success: false,
      message: "File upload error: " + error.message,
    });
  }
  next();
};

// Public routes
router.get("/public", asyncHandler(getTestimonialsForDisplay));
router.get("/debug", asyncHandler(async (req, res) => {
  const Testimonial = (await import("../models/Testimonial.js")).default;
  const testimonials = await Testimonial.find().limit(5);
  res.json({ testimonials: testimonials.map(t => ({ name: t.name, image: t.image, status: t.status })) });
}));
router.post("/", (req, res, next) => {
  try {
    const upload = testimonialUpload();
    upload.single("image")(req, res, next);
  } catch (error) {
    console.error('Testimonial upload middleware error:', error);
    res.status(500).json({
      success: false,
      message: "Image upload service not available"
    });
  }
}, handleMulterError, asyncHandler(createTestimonial));

// Admin routes
router.get("/", protect, requirePermission('testimonialManagement'), asyncHandler(getTestimonials));
router.get("/:id", protect, requirePermission('testimonialManagement'), asyncHandler(getTestimonialById));
router.put("/:id", protect, requirePermission('testimonialManagement'), (req, res, next) => {
  try {
    const upload = testimonialUpload();
    upload.single("image")(req, res, next);
  } catch (error) {
    console.error('Testimonial upload middleware error:', error);
    res.status(500).json({
      success: false,
      message: "Image upload service not available"
    });
  }
}, handleMulterError, auditMiddleware('UPDATE', 'Testimonial'), asyncHandler(updateTestimonial));
router.delete("/:id", protect, requirePermission('testimonialManagement'), auditMiddleware('DELETE', 'Testimonial'), asyncHandler(deleteTestimonial));
router.patch("/:id/approve", protect, requirePermission('testimonialManagement'), auditMiddleware('APPROVE', 'Testimonial'), asyncHandler(approveTestimonial));
router.patch("/:id/reject", protect, requirePermission('testimonialManagement'), auditMiddleware('REJECT', 'Testimonial'), asyncHandler(rejectTestimonial));

export default router;