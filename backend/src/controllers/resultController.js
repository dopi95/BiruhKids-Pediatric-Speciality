import asyncHandler from "express-async-handler";
import Result from "../models/Result.js";
import User from "../models/User.js";
import { sendResultNotification } from "../utils/emailService.js";
import fs from "fs";
import path from "path";

// @desc    Create new result
// @route   POST /api/results
// @access  Private (Admin only)
export const createResult = asyncHandler(async (req, res) => {
    console.log('Request body:', req.body);
    const { patientName, patientEmail, patientPhone, doctorName, testDate, additionalNotes } = req.body;

    // Find patient by email
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
            message: "Patient not found with this email. Please ensure the email is registered.",
        });
    }

    // Handle file uploads
    const resultFiles = req.files ? req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
    })) : [];

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
        await sendResultNotification(patientEmail, patientName);
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
    const results = await Result.find({ patientId: req.user._id })
        .sort({ createdAt: -1 });

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
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    res.json({
        success: true,
        stats: {
            totalResults,
            totalUsers,
        },
    });
});

// @desc    Get results for a specific patient by email (Admin only)
// @route   GET /api/results/patient/:email
// @access  Private (Admin only)
export const getPatientResultsByEmail = asyncHandler(async (req, res) => {
    const { email } = req.params;
    
    const results = await Result.find({ patientEmail: email })
        .sort({ createdAt: -1 });
    
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
    
    // Delete associated files
    if (result.resultFiles && result.resultFiles.length > 0) {
        result.resultFiles.forEach(file => {
            const filePath = `uploads/results/${file.filename}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }
    
    await Result.findByIdAndDelete(req.params.id);
    
    res.json({
        success: true,
        message: "Result deleted successfully",
    });
});

// @desc    Serve result file
// @route   GET /api/results/file/:filename
// @access  Private
export const serveResultFile = asyncHandler(async (req, res) => {
    const { filename } = req.params;
    const filePath = `uploads/results/${filename}`;
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            success: false,
            message: "File not found",
        });
    }
    
    // Set proper content type based on file extension
    const ext = filename.toLowerCase().split('.').pop();
    const contentTypes = {
        'pdf': 'application/pdf',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    
    const contentType = contentTypes[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    
    // For Word documents, set as attachment to force download
    if (ext === 'doc' || ext === 'docx') {
        res.setHeader('Content-Disposition', 'attachment');
    } else {
        res.setHeader('Content-Disposition', 'inline');
    }
    
    res.sendFile(path.resolve(filePath));
});