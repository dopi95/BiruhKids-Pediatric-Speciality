import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Create new admin
// @route   POST /api/users/admin
// @access  Private (Super Admin only)
export const createAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, phone, role, permissions } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "User already exists with this email",
        });
    }

    // Create admin user
    const user = await User.create({
        name,
        email,
        password,
        phone: phone || "0911234567", // Default phone if not provided
        role: role || "admin",
        permissions: permissions || {},
        emailVerified: true, // Auto-verify admin accounts
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid user data",
        });
    }

    res.status(201).json({
        success: true,
        message: "Admin created successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            permissions: user.permissions,
        },
    });
});

// @desc    Get all users/admins
// @route   GET /api/users
// @access  Private (Admin only)
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password -refreshToken");
    
    res.json({
        success: true,
        users,
    });
});