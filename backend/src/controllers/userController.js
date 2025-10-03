import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Result from "../models/Result.js";

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

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (Own profile or Admin)
export const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const currentUser = req.user;
    
    // Users can only access their own profile unless they're admin
    if (currentUser._id.toString() !== userId && !['admin', 'super_admin'].includes(currentUser.role)) {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        });
    }
    
    const user = await User.findById(userId).select("-password -refreshToken");
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    
    res.json({
        success: true,
        user
    });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Own profile or Admin)
export const updateUser = asyncHandler(async (req, res) => {
    const { name, email, phone, role, permissions, password, emailNotifications } = req.body;
    const currentUser = req.user;
    const targetUserId = req.params.id;
    
    // Check if user is updating their own profile or is admin
    const isOwnProfile = currentUser._id.toString() === targetUserId;
    const isAdmin = ['admin', 'super_admin'].includes(currentUser.role) || 
                   (currentUser.permissions && currentUser.permissions.userManagement);
    
    if (!isOwnProfile && !isAdmin) {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    
    // Update basic fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    
    // Update email notification preference
    if (typeof emailNotifications === 'boolean') {
        user.emailNotifications = emailNotifications;
    }
    
    // Only admins can update role and permissions
    if (isAdmin) {
        if (role) {
            user.role = role;
        }
        if (permissions) {
            user.permissions = permissions;
        }
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
            emailNotifications: user.emailNotifications,
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
    
    const userName = user.name;
    
    // Delete all results associated with this user
    await Result.deleteMany({ patientId: req.params.id });
    
    // Delete the user
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
        success: true,
        data: { name: userName },
        message: "User and associated results deleted successfully"
    });
});

// @desc    Get patients only (for result management)
// @route   GET /api/users/patients
// @access  Private (Result management permission)
export const getPatients = asyncHandler(async (req, res) => {
    const patients = await User.find({ 
        $or: [
            { role: 'user' },
            { role: { $exists: false } }
        ]
    }).select("-password -refreshToken");
    
    res.json({
        success: true,
        users: patients,
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