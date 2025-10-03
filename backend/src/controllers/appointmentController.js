import asyncHandler from "express-async-handler";
import Appointment from "../models/Appointment.js";
import { sendAppointmentEmail } from "../utils/appointmentEmailService.js";
import { sendNewAppointmentNotification } from "../utils/telegramService.js";

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private (Admin only)
export const getAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({
        success: true,
        data: appointments
    });
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
export const createAppointment = asyncHandler(async (req, res) => {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    
    // Send Telegram notification (non-blocking)
    try {
        await sendNewAppointmentNotification(savedAppointment);
    } catch (telegramError) {
        console.error("Telegram notification failed:", telegramError);
        // Don't fail the request if Telegram notification fails
    }
    
    res.status(201).json({
        success: true,
        data: savedAppointment,
        message: "Appointment created successfully"
    });
});

// @desc    Confirm appointment
// @route   PUT /api/appointments/:id/confirm
// @access  Private (Admin only)
export const confirmAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: "Appointment not found"
        });
    }
    
    appointment.status = "confirmed";
    await appointment.save();
    
    // Send confirmation email
    try {
        await sendAppointmentEmail(appointment, "confirmed");
    } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails
    }
    
    res.json({
        success: true,
        data: appointment,
        message: "Appointment confirmed successfully"
    });
});

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private (Admin only)
export const cancelAppointment = asyncHandler(async (req, res) => {
    const { reason } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: "Appointment not found"
        });
    }
    
    appointment.status = "cancelled";
    appointment.cancellationReason = reason || "Doctor not available";
    await appointment.save();
    
    // Send cancellation email
    try {
        await sendAppointmentEmail(appointment, "cancelled", reason);
    } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails
    }
    
    res.json({
        success: true,
        data: appointment,
        message: "Appointment cancelled successfully"
    });
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private (Admin only)
export const deleteAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: "Appointment not found"
        });
    }
    
    const appointmentEmail = appointment.email;
    await Appointment.findByIdAndDelete(req.params.id);
    
    res.json({
        success: true,
        data: { email: appointmentEmail },
        message: "Appointment deleted successfully"
    });
});