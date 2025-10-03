import Testimonial from "../models/Testimonial.js";
import fs from "fs";
import path from "path";
import { cloudinary } from "../config/cloudinary.js";

// Get all testimonials (for admin)
export const getTestimonials = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get testimonials for display (only approved)
export const getTestimonialsForDisplay = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: "approved" }).sort({
      createdAt: -1,
    });
    console.log('Testimonials with images:', testimonials.map(t => ({ name: t.name, image: t.image })));
    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single testimonial
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }
    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create testimonial
export const createTestimonial = async (req, res) => {
  try {
    console.log('Received testimonial data:', req.body);
    console.log('Received file:', req.file ? 'Yes' : 'No');
    if (req.file) {
      console.log('File details:', {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
      });
    }
    
    const { name, email, title, treatment, testimony, rating } = req.body;

    let imageUrl = null;
    if (req.file) {
      // Use Cloudinary URL if available, otherwise use local filename
      imageUrl = req.file.secure_url || req.file.filename;
      console.log('Testimonial image upload details:', {
        hasSecureUrl: !!req.file.secure_url,
        hasPublicId: !!req.file.public_id,
        filename: req.file.filename,
        finalUrl: imageUrl,
        isCloudinary: imageUrl.includes('cloudinary.com')
      });
    }

    const testimonial = new Testimonial({
      name,
      email,
      title,
      treatment,
      testimony,
      rating: parseInt(rating),
      image: imageUrl,
    });

    await testimonial.save();
    console.log('Testimonial saved successfully with image:', testimonial.image);

    res.status(201).json({
      success: true,
      message: "Testimonial submitted successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Handle image update
    if (req.file) {
      // Delete old image if it's from Cloudinary
      if (testimonial.image && testimonial.image.includes('cloudinary.com')) {
        try {
          const urlParts = testimonial.image.split('/');
          const publicIdWithExt = urlParts[urlParts.length - 1];
          const publicId = publicIdWithExt.split('.')[0];
          await cloudinary.uploader.destroy(`biruh-kids/testimonials/${publicId}`);
          console.log('Old testimonial image deleted from Cloudinary');
        } catch (deleteError) {
          console.warn("Error deleting old Cloudinary image:", deleteError.message);
        }
      } else if (testimonial.image) {
        // Delete local file if exists
        try {
          const oldImagePath = path.join(process.cwd(), 'uploads', 'testimonials', testimonial.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (deleteError) {
          console.warn("Error deleting old local image:", deleteError.message);
        }
      }
      
      // Set new image URL
      testimonial.image = req.file.secure_url || req.file.filename;
      console.log('Testimonial image updated:', {
        filename: req.file.filename,
        url: testimonial.image,
        publicId: req.file.public_id
      });
    }

    // Update other fields with validation
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && req.body[key] !== '') {
        if (key === 'rating') {
          const ratingNum = parseInt(req.body[key]);
          if (!isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5) {
            testimonial[key] = ratingNum;
          }
        } else if (key === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(req.body[key])) {
            testimonial[key] = req.body[key].trim().toLowerCase();
          }
        } else {
          testimonial[key] = typeof req.body[key] === 'string' ? req.body[key].trim() : req.body[key];
        }
      }
    });

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error: " + validationErrors.join(', '),
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Delete testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const testimonialName = testimonial.name;

    // Delete associated image file
    if (testimonial.image) {
      if (testimonial.image.includes('cloudinary.com')) {
        // Delete from Cloudinary
        try {
          const urlParts = testimonial.image.split('/');
          const publicIdWithExt = urlParts[urlParts.length - 1];
          const publicId = publicIdWithExt.split('.')[0];
          await cloudinary.uploader.destroy(`biruh-kids/testimonials/${publicId}`);
          console.log('Testimonial image deleted from Cloudinary');
        } catch (deleteError) {
          console.warn("Error deleting Cloudinary image:", deleteError.message);
        }
      } else {
        // Delete local file
        try {
          const imagePath = path.join(process.cwd(), 'uploads', 'testimonials', testimonial.image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        } catch (deleteError) {
          console.warn("Error deleting local image file:", deleteError.message);
        }
      }
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: { name: testimonialName },
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Approve testimonial
export const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    testimonial.status = "approved";
    testimonial.reviewedAt = new Date();
    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial approved successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Error approving testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Reject testimonial
export const rejectTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    testimonial.status = "rejected";
    testimonial.reviewedAt = new Date();
    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial rejected successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Error rejecting testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};