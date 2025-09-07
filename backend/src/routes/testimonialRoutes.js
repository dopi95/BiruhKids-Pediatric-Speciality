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
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Public routes
router.get("/public", getTestimonialsForDisplay);
router.post("/", upload.single("image"), createTestimonial);

// Admin routes
router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);
router.put("/:id", upload.single("image"), updateTestimonial);
router.delete("/:id", deleteTestimonial);
router.patch("/:id/approve", approveTestimonial);
router.patch("/:id/reject", rejectTestimonial);

export default router;