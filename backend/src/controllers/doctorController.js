import Doctor from "../models/Doctor.js";
import { sendNewDoctorNewsletter } from "../utils/emailService.js";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs";
import path from "path";

// Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    const { name, nameAmh, field, fieldAmh, experience, experienceAmh } = req.body;
    
    // Check if photo was uploaded and get URL
    let photo = null;
    if (req.file) {
      // If using Cloudinary, use secure_url, otherwise use local path
      photo = req.file.secure_url || req.file.path;
      console.log('Doctor photo uploaded:', {
        filename: req.file.filename,
        url: photo,
        publicId: req.file.public_id
      });
    }
    
    const doctor = new Doctor({
      name,
      nameAmh,
      field,
      fieldAmh,
      experience,
      experienceAmh,
      photo
    });
    
    const savedDoctor = await doctor.save();
    
    // Send newsletter to active subscribers
    try {
      const newsletterResult = await sendNewDoctorNewsletter(savedDoctor);
      console.log(`Newsletter sent to ${newsletterResult.sent}/${newsletterResult.total} subscribers`);
    } catch (error) {
      console.error("Newsletter sending failed:", error);
    }
    
    res.status(201).json({
      success: true,
      data: savedDoctor,
      message: "Doctor created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all doctors with search and pagination
export const getDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { nameAmh: { $regex: search, $options: "i" } },
          { field: { $regex: search, $options: "i" } },
          { fieldAmh: { $regex: search, $options: "i" } }
        ]
      };
    }
    
    const doctors = await Doctor.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Doctor.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: doctors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single doctor by ID
export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update a doctor
export const updateDoctor = async (req, res) => {
  try {
    const { name, nameAmh, field, fieldAmh, experience, experienceAmh } = req.body;
    
    const updateData = {
      name,
      nameAmh,
      field,
      fieldAmh,
      experience,
      experienceAmh
    };
    
    // If a new photo was uploaded
    if (req.file) {
      // Get the old doctor data to clean up old photo
      const oldDoctor = await Doctor.findById(req.params.id);
      
      // Set new photo URL
      updateData.photo = req.file.secure_url || req.file.path;
      
      // Clean up old photo if it exists and is from Cloudinary
      if (oldDoctor && oldDoctor.photo && req.file.public_id) {
        try {
          // Extract public_id from old Cloudinary URL if it's a Cloudinary URL
          if (oldDoctor.photo.includes('cloudinary.com')) {
            const urlParts = oldDoctor.photo.split('/');
            const publicIdWithExt = urlParts[urlParts.length - 1];
            const oldPublicId = publicIdWithExt.split('.')[0];
            await cloudinary.uploader.destroy(`biruh-kids/doctors/${oldPublicId}`);
            console.log('Old doctor photo deleted from Cloudinary');
          }
        } catch (error) {
          console.error('Error deleting old doctor photo:', error);
        }
      }
      
      console.log('Doctor photo updated:', {
        filename: req.file.filename,
        url: updateData.photo,
        publicId: req.file.public_id
      });
    }
    
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: doctor,
      message: "Doctor updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }
    
    // Clean up photo if it exists and is from Cloudinary
    if (doctor.photo && doctor.photo.includes('cloudinary.com')) {
      try {
        const urlParts = doctor.photo.split('/');
        const publicIdWithExt = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExt.split('.')[0];
        await cloudinary.uploader.destroy(`biruh-kids/doctors/${publicId}`);
        console.log('Doctor photo deleted from Cloudinary');
      } catch (error) {
        console.error('Error deleting doctor photo from Cloudinary:', error);
      }
    }
    
    await Doctor.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get doctor statistics
export const getDoctorStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    
    res.status(200).json({
      success: true,
      data: {
        total: totalDoctors
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};