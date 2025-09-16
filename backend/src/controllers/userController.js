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

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin only)
export const updateUser = asyncHandler(async (req, res) => {
    const { name, email, phone, role, permissions, password } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    
    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    
    // Update admin-specific fields if provided
    if (role) {
        user.role = role;
    }
    if (permissions) {
        user.permissions = permissions;
    }
    if (password && password.trim() !== '') {
        user.password = password;
    }
    
    await user.save();
    
    res.json({
        success: true,
        message: "User updated successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            permissions: user.permissions,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
        success: true,
        message: "User deleted successfully"
    });
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private (Admin only)
export const getUserStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: { $in: ['admin', 'super_admin'] } });
    const regularUsers = await User.countDocuments({ role: 'user' });
    const verifiedUsers = await User.countDocuments({ emailVerified: true });
    
    res.json({
        success: true,
        stats: {
            totalUsers,
            adminUsers,
            regularUsers,
            verifiedUsers
        }
    });
});