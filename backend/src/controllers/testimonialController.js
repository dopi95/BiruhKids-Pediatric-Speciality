import Testimonial from "../models/Testimonial.js";
import cloudinary from "../config/cloudinary.js";

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
// In testimonialController.js, update the createTestimonial function:
export const createTestimonial = async (req, res) => {
  try {
    const { name, email, title, treatment, testimony, rating } = req.body;

    // Handle image upload to Cloudinary
    let imageUrl = null;
    if (req.file) {
      // req.file.path contains the Cloudinary URL
      imageUrl = req.file.path; // This should be the full Cloudinary URL
    }

    const testimonial = new Testimonial({
      name,
      email,
      title,
      treatment,
      testimony,
      rating: parseInt(rating),
      image: imageUrl, // Store the Cloudinary URL directly
    });

    await testimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial submitted successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
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
      // Delete old image from Cloudinary if exists
      if (testimonial.image) {
        try {
          // Extract public_id from Cloudinary URL
          const urlParts = testimonial.image.split('/');
          const publicId = urlParts[urlParts.length - 1].split('.')[0];
          const fullPublicId = `biruh-kids/testimonials/${publicId}`;
          
          await cloudinary.uploader.destroy(fullPublicId);
        } catch (deleteError) {
          console.warn("Error deleting old image:", deleteError.message);
        }
      }
      testimonial.image = req.file.path;
    }

    // Update other fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        testimonial[key] = key === 'rating' ? parseInt(req.body[key]) : req.body[key];
      }
    });

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

    // Delete associated image from Cloudinary
    if (testimonial.image) {
      try {
        // Extract public_id from Cloudinary URL
        const urlParts = testimonial.image.split('/');
        const publicId = urlParts[urlParts.length - 1].split('.')[0];
        const fullPublicId = `biruh-kids/testimonials/${publicId}`;
        
        await cloudinary.uploader.destroy(fullPublicId);
      } catch (deleteError) {
        console.warn("Error deleting image from Cloudinary:", deleteError.message);
      }
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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
    res.status(500).json({
      success: false,
      message: error.message,
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};