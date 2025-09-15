import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import {
    generateTokenPair,
    hashToken,
    verifyRefreshToken,
} from "../utils/tokenUtils.js";
import {
    sendPasswordResetEmail,
    sendVerificationEmail,
    sendWelcomeEmail,
} from "../utils/emailService.js";

// @desc    Register new user
export const register = asyncHandler(async (req, res) => {
    const { name, email, password, phone, emailNotifications } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "User already exists with this email",
        });
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        phone,
        emailNotifications: emailNotifications || false,
        emailVerified: process.env.NODE_ENV === "development", // Auto-verify in dev
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid user data",
        });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokenPair(user._id);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    // Send verification email in production
    if (process.env.NODE_ENV === "production") {
        const verificationToken = user.getEmailVerificationToken();
        await user.save();

        const emailResult = await sendVerificationEmail(
            user.email,
            verificationToken
        );
        if (!emailResult.success) {
            console.error(
                "Failed to send verification email:",
                emailResult.error
            );
        }
    } else {
        // Send welcome email in development
        await sendWelcomeEmail(user.email, user.name);
    }

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            permissions: user.permissions,
            emailVerified: user.emailVerified,
        },
        token: accessToken,
        refreshToken,
    });
});

// @desc    Login user
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user and include password
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.comparePassword(password))) {
        // Generate tokens
        const { accessToken, refreshToken } = generateTokenPair(user._id);

        // Save refresh token to user
        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                permissions: user.permissions,
                emailVerified: user.emailVerified,
            },
            token: accessToken,
            refreshToken,
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }
});

// @desc    Get current user profile
export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                permissions: user.permissions,
                emailVerified: user.emailVerified,
                emailNotifications: user.emailNotifications,
                createdAt: user.createdAt,
            },
        });
    } else {
        res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
});

// @desc    Refresh access token
export const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken: token } = req.body;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Refresh token required",
        });
    }

    try {
        // Verify refresh token
        const decoded = verifyRefreshToken(token);

        // Find user with this refresh token
        const user = await User.findOne({
            _id: decoded.id,
            refreshToken: token,
        });

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } =
            generateTokenPair(user._id);

        // Update refresh token
        user.refreshToken = newRefreshToken;
        await user.save();

        res.json({
            success: true,
            token: accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            message: "Invalid refresh token",
        });
    }
});

// @desc    Forgot password
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "No user found with this email",
        });
    }

    // Generate reset token using model method
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Send password reset email
    const emailResult = await sendPasswordResetEmail(user.email, resetToken);

    if (!emailResult.success) {
        // Reset the fields if email fails
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        return res.status(500).json({
            success: false,
            message: "Email could not be sent. Please try again later.",
        });
    }

    res.json({
        success: true,
        message: "Password reset email sent successfully",
        ...(process.env.NODE_ENV === "development" && { resetToken }),
    });
});

// @desc    Reset password
export const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;

    // Hash the token to compare with database
    const hashedToken = hashToken(token);

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired reset token",
        });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
        success: true,
        message: "Password reset successful",
    });
});

// @desc    Change password
export const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select("+password");

    // Check current password
    if (!(await user.comparePassword(currentPassword))) {
        return res.status(400).json({
            success: false,
            message: "Current password is incorrect",
        });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
        success: true,
        message: "Password changed successfully",
    });
});

// @desc    Verify email
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.body;

    // Hash the token to compare with database
    const hashedToken = hashToken(token);

    const user = await User.findOne({
        verificationToken: hashedToken,
        verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired verification token",
        });
    }

    // Verify email
    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    res.json({
        success: true,
        message: "Email verified successfully",
    });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
    // Clear refresh token from database
    await User.findByIdAndUpdate(req.user._id, {
        refreshToken: undefined,
    });

    res.json({
        success: true,
        message: "Logged out successfully",
    });
});
