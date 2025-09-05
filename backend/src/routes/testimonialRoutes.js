import express from "express";
import Testimonial from "../models/Testimonial.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const router = express.Router();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/testimonials/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check if the file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Get all testimonials (with optional filtering)
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    
    if (status && status !== "all") {
      filter.status = status;
    }
    
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get approved testimonials for public display
router.get("/approved", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: "approved" }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create a new testimonial
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, email, phone, treatment, rating, title, testimony, allowPublic } = req.body;
    
    const testimonialData = {
      name,
      email,
      phone,
      treatment,
      rating: parseInt(rating),
      title,
      testimony,
      allowPublic: allowPublic === "true"
    };
    
    if (req.file) {
      // Store just the filename, not the full path
      testimonialData.image = req.file.filename;
    }
    
    const testimonial = new Testimonial(testimonialData);
    await testimonial.save();
    
    res.status(201).json({
      success: true,
      message: "Testimonial submitted successfully",
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update testimonial status
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      id, 
      { 
        status,
        reviewedAt: status !== "pending" ? new Date() : null
      }, 
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found"
      });
    }
    
    res.json({
      success: true,
      message: `Testimonial ${status} successfully`,
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete a testimonial
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findByIdAndDelete(id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found"
      });
    }
    
    res.json({
      success: true,
      message: "Testimonial deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get testimonial statistics
router.get("/stats", async (req, res) => {
  try {
    const total = await Testimonial.countDocuments();
    const approved = await Testimonial.countDocuments({ status: "approved" });
    const pending = await Testimonial.countDocuments({ status: "pending" });
    const rejected = await Testimonial.countDocuments({ status: "rejected" });
    
    res.json({
      success: true,
      data: {
        total,
        approved,
        pending,
        rejected
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;