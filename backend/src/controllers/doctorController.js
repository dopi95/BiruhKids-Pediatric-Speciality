import Doctor from "../models/Doctor.js";

// Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    const { name, nameAmh, field, fieldAmh, experience, experienceAmh } = req.body;
    
    // Check if photo was uploaded
    const photo = req.file ? req.file.path : null;
    
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
      updateData.photo = req.file.path;
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
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }
    
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