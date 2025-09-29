import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import {
    generateTokenPair,
    hashToken,
    verifyRefreshToken,
} from "../utils/tokenUtils.js";
import {
    sendPasswordResetOTP,
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
        emailVerified: true,
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

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name);

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

    // Generate reset OTP using model method
    const resetOTP = user.getResetPasswordOTP();
    await user.save();

    // Send password reset OTP email
    const emailResult = await sendPasswordResetOTP(user.email, resetOTP);

    if (!emailResult.success) {
        // Reset the fields if email fails
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpire = undefined;
        await user.save();

        return res.status(500).json({
            success: false,
            message: "Email could not be sent. Please try again later.",
        });
    }

    res.json({
        success: true,
        message: "Password reset OTP sent successfully",
        ...(process.env.NODE_ENV === "development" && { resetOTP }),
    });
});

// @desc    Verify reset password OTP
export const verifyResetOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    console.log("OTP Verification attempt:", { email, otp });

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            message: "Email and OTP are required",
        });
    }

    // Hash the OTP to compare with database
    const hashedOTP = hashToken(otp);
    console.log("Hashed OTP:", hashedOTP);

    const user = await User.findOne({
        email,
        resetPasswordOTP: hashedOTP,
        resetPasswordOTPExpire: { $gt: Date.now() },
    });

    console.log("User found:", !!user);
    if (user) {
        console.log("User OTP data:", {
            storedOTP: user.resetPasswordOTP,
            expiry: user.resetPasswordOTPExpire,
            now: Date.now(),
        });
    }

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired OTP",
        });
    }

    // Mark OTP as verified
    user.otpVerified = true;
    await user.save();
    console.log("OTP verified and saved");

    res.json({
        success: true,
        message: "OTP verified successfully",
    });
});

// @desc    Reset password after OTP verification
export const resetPasswordAfterOTP = asyncHandler(async (req, res) => {
    const { email, password, token } = req.body;

    console.log("Password reset attempt:", {
        email,
        hasPassword: !!password,
        token,
    });

    // If no email provided, try to find user by token (for frontend compatibility)
    let user;
    if (email) {
        user = await User.findOne({
            email,
            otpVerified: true,
            resetPasswordOTPExpire: { $gt: Date.now() },
        });
    } else {
        // Find any user with verified OTP that hasn't expired
        user = await User.findOne({
            otpVerified: true,
            resetPasswordOTPExpire: { $gt: Date.now() },
        });
    }

    console.log("User found for password reset:", !!user);
    if (user) {
        console.log("User verification status:", {
            email: user.email,
            otpVerified: user.otpVerified,
            expiry: user.resetPasswordOTPExpire,
            now: Date.now(),
        });
    }

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "OTP not verified or expired",
        });
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required",
        });
    }

    // Set new password
    user.password = password;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpire = undefined;
    user.otpVerified = undefined;

    await user.save();
    console.log("Password reset completed for user:", user.email);

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
