import express from "express";
import {
    register,
    login,
    getProfile,
    refreshToken,
    forgotPassword,
    verifyResetOTP,
    resetPasswordAfterOTP,
    changePassword,
    logout,
} from "../controllers/authController.js";
import {
    protect,
    createRateLimit,
    loginRateLimit,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Rate limiting for auth endpoints
const authRateLimit = createRateLimit(15 * 60 * 1000, 5); // 5 attempts per 15 minutes
const loginRateLimiter = loginRateLimit(15 * 60 * 1000, 5); // 3 attempts per 15 minutes

// Public routes
router.post("/register", authRateLimit, register);
router.post("/login", loginRateLimiter, login);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", authRateLimit, forgotPassword);
router.post("/verify-reset-otp", authRateLimit, verifyResetOTP);
router.post("/reset-password", authRateLimit, resetPasswordAfterOTP);


// Protected routes
router.get("/profile", protect, getProfile);
router.post("/change-password", protect, changePassword);
router.post("/logout", protect, logout);

export default router;
