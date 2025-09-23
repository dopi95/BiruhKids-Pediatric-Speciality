import asyncHandler from "express-async-handler";
import Result from "../models/Result.js";
import User from "../models/User.js";
import { sendResultNotification } from "../utils/emailService.js";
import { cloudinary, ensureCloudinaryConfigured } from "../config/cloudinary.js";

// Ensure Cloudinary is configured
ensureCloudinaryConfigured();

// @desc    Create new result
// @route   POST /api/results
// @access  Private (Admin only)
export const createResult = asyncHandler(async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Files received:", req.files?.length || 0);

    // Validate Cloudinary configuration
    if (
        !process.env.CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
    ) {
        console.error("Cloudinary configuration missing");
        return res.status(500).json({
            success: false,
            message: "File upload service not configured properly",
        });
    }

    const {
        patientName,
        patientEmail,
        patientPhone,
        doctorName,
        testDate,
        additionalNotes,
    } = req.body;

    // Validate patient
    if (!patientEmail) {
        return res.status(400).json({
            success: false,
            message: "Patient email is required",
        });
    }

    const patient = await User.findOne({ email: patientEmail.toLowerCase() });
    if (!patient) {
        console.log(`Patient lookup failed for email: ${patientEmail}`);
        return res.status(404).json({
            success: false,
            message:
                "Patient not found with this email. Please ensure the email is registered.",
        });
    }

    // Process uploaded files
    const resultFiles = req.files
        ? req.files.map((file) => {
              console.log('Processing file:', {
                  originalname: file.originalname,
                  secure_url: file.secure_url,
                  filename: file.filename,
                  public_id: file.public_id,
                  format: file.format,
                  version: file.version,
                  mimetype: file.mimetype,
                  size: file.size
              });
              return {
                  originalName: file.originalname,
                  cloudinaryUrl: file.secure_url || file.url || file.path, // preview
                  cloudinaryPublicId: file.public_id || file.filename, // public_id
                  cloudinaryFormat: file.format, // e.g. 'pdf'
                  cloudinaryVersion: file.version, // required for download
                  mimetype: file.mimetype,
                  size: file.size,
              };
          })
        : [];

    // Create result
    const result = await Result.create({
        patientId: patient._id,
        patientName,
        patientEmail,
        patientPhone,
        doctorName,
        testDate: new Date(testDate),
        resultFiles,
        additionalNotes,
    });

    // Send email notification
    try {
        await sendResultNotification(patientEmail, patientName, resultFiles);
        result.emailSent = true;
        result.emailSentAt = new Date();
        await result.save();
    } catch (emailError) {
        console.error("Email notification failed:", emailError);
    }

    res.status(201).json({
        success: true,
        message: "Result sent successfully",
        result,
    });
});

// @desc    Get results for a patient
// @route   GET /api/results/patient
// @access  Private (Patient only)
export const getPatientResults = asyncHandler(async (req, res) => {
    const results = await Result.find({ patientId: req.user._id }).sort({
        createdAt: -1,
    });

    res.json({
        success: true,
        results,
    });
});

// @desc    Mark result as read
// @route   PUT /api/results/:id/read
// @access  Private (Patient only)
export const markResultAsRead = asyncHandler(async (req, res) => {
    const result = await Result.findOneAndUpdate(
        { _id: req.params.id, patientId: req.user._id },
        { isRead: true },
        { new: true }
    );

    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Result not found",
        });
    }

    res.json({
        success: true,
        message: "Result marked as read",
        result,
    });
});

// @desc    Get result statistics
// @route   GET /api/results/stats
// @access  Private (Admin only)
export const getResultStats = asyncHandler(async (req, res) => {
    const totalResults = await Result.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });

    res.json({
        success: true,
        stats: {
            totalResults,
            totalUsers,
        },
    });
});

// @desc    Debug endpoint to check file structure
// @route   GET /api/results/debug/:resultId
// @access  Private
export const debugResultFiles = asyncHandler(async (req, res) => {
    const { resultId } = req.params;

    const result = await Result.findOne({
        _id: resultId,
        patientId: req.user._id,
    });

    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Result not found",
        });
    }

    res.json({
        success: true,
        result: {
            _id: result._id,
            patientName: result.patientName,
            resultFiles: result.resultFiles.map((file) => ({
                filename: file.filename,
                originalName: file.originalName,
                cloudinaryUrl: file.cloudinaryUrl,
                cloudinaryPublicId: file.cloudinaryPublicId,
                mimetype: file.mimetype,
                size: file.size,
            })),
        },
    });
});

// @desc    Get results for a specific patient by email (Admin only)
// @route   GET /api/results/patient/:email
// @access  Private (Admin only)
export const getPatientResultsByEmail = asyncHandler(async (req, res) => {
    const { email } = req.params;

    const results = await Result.find({ patientEmail: email }).sort({
        createdAt: -1,
    });

    res.json({
        success: true,
        results,
    });
});

// @desc    Delete a result
// @route   DELETE /api/results/:id
// @access  Private (Admin only)
export const deleteResult = asyncHandler(async (req, res) => {
    const result = await Result.findById(req.params.id);

    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Result not found",
        });
    }

    // Delete associated files from Cloudinary
    if (result.resultFiles && result.resultFiles.length > 0) {
        for (const file of result.resultFiles) {
            try {
                if (file.cloudinaryPublicId) {
                    await cloudinary.uploader.destroy(file.cloudinaryPublicId);
                }
            } catch (error) {
                console.error("Error deleting file from Cloudinary:", error);
            }
        }
    }

    await Result.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "Result deleted successfully",
    });
});

// @desc    Serve result file (redirect to Cloudinary URL)
// @route   GET /api/results/file/:publicId
// @access  Private
export const serveResultFile = asyncHandler(async (req, res) => {
    const { publicId } = req.params;

    // Allow admin to view any file, patients can only view their own files
    const query = {
        "resultFiles.cloudinaryPublicId": publicId,
    };
    
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
        query.patientId = req.user._id;
    }

    const result = await Result.findOne(query);

    if (!result) {
        return res.status(404).json({
            success: false,
            message: "File not found or access denied",
        });
    }

    const file = result.resultFiles.find(
        (f) => f.cloudinaryPublicId === publicId
    );

    if (!file) {
        return res.status(404).json({
            success: false,
            message: "File not found",
        });
    }

    console.log('File data for preview:', {
        publicId: file.cloudinaryPublicId,
        url: file.cloudinaryUrl,
        mimetype: file.mimetype,
        originalName: file.originalName
    });

    // For preview, fetch and serve file directly with inline headers
    const resourceType = file.mimetype === "application/pdf" ? "raw" : "image";
    const fileUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${file.cloudinaryPublicId}`;
    
    console.log('Fetching file for preview:', fileUrl);
    
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('File not found');
        
        const buffer = await response.arrayBuffer();
        
        res.setHeader('Content-Type', file.mimetype);
        res.setHeader('Content-Disposition', 'inline');
        res.send(Buffer.from(buffer));
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(404).json({ success: false, message: 'File not accessible' });
    }
});

// @desc    Download result file
// @route   GET /api/results/download/:publicId
// @access  Private
export const downloadResultFile = asyncHandler(async (req, res) => {
    const { publicId } = req.params;

    // Allow admin to download any file, patients can only download their own files
    const query = {
        "resultFiles.cloudinaryPublicId": publicId,
    };
    
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
        query.patientId = req.user._id;
    }

    const result = await Result.findOne(query);

    if (!result)
        return res
            .status(404)
            .json({ success: false, message: "File not found" });

    const file = result.resultFiles.find(
        (f) => f.cloudinaryPublicId === publicId
    );
    if (!file)
        return res
            .status(404)
            .json({ success: false, message: "File not found" });

    console.log('File data for download:', {
        publicId: file.cloudinaryPublicId,
        url: file.cloudinaryUrl,
        mimetype: file.mimetype,
        originalName: file.originalName
    });

    // For download, fetch and serve file directly with attachment headers
    const resourceType = file.mimetype === "application/pdf" ? "raw" : "image";
    const downloadUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${file.cloudinaryPublicId}`;
    
    console.log('Fetching file for download:', downloadUrl);
    
    try {
        const response = await fetch(downloadUrl);
        if (!response.ok) throw new Error('File not found');
        
        const buffer = await response.arrayBuffer();
        
        res.setHeader('Content-Type', file.mimetype);
        res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
        res.send(Buffer.from(buffer));
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(404).json({ success: false, message: 'File not accessible' });
    }
});
