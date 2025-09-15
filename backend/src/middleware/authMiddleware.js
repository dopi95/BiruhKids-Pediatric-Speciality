import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select(
                "-password -refreshToken"
            );

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found or account deactivated",
                });
            }


            next();
        } catch (error) {
            console.error("Token verification error:", error.message);
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token expired, please login again",
                    code: "TOKEN_EXPIRED",
                });
            }
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. Authentication required.",
        });
    }
});

// Admin access middleware
export const adminOnly = asyncHandler(async (req, res, next) => {
    if (
        req.user &&
        (req.user.role === "admin" || req.user.role === "super_admin")
    ) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Access denied. Admin privileges required.",
        });
    }
});

// Super admin access middleware
export const superAdminOnly = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === "super_admin") {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Access denied. Super admin privileges required.",
        });
    }
});

// Permission-based access middleware
export const requirePermission = (permission) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        // Super admin has all permissions
        if (req.user.role === "super_admin") {
            return next();
        }

        // Check specific permission
        if (req.user.permissions && req.user.permissions[permission]) {
            return next();
        }

        res.status(403).json({
            success: false,
            message: `Access denied. ${permission} permission required.`,
        });
    });
};

// User ownership middleware - ensures users can only access their own data
export const requireOwnership = asyncHandler(async (req, res, next) => {
    const resourceUserId = req.params.userId || req.body.userId;

    // Super admin and admin can access any user's data
    if (req.user.role === "super_admin" || req.user.role === "admin") {
        return next();
    }

    // Regular users can only access their own data
    if (req.user._id.toString() !== resourceUserId) {
        return res.status(403).json({
            success: false,
            message: "Access denied. You can only access your own data.",
        });
    }

    next();
});

// Rate limiting helper (basic implementation)
export const createRateLimit = (windowMs = 15 * 60 * 1000, max = 5) => {
    const requests = new Map();

    return (req, res, next) => {
        const key = req.ip + (req.user ? req.user._id : "");
        const now = Date.now();
        const windowStart = now - windowMs;

        // Clean old requests
        if (requests.has(key)) {
            const userRequests = requests
                .get(key)
                .filter((time) => time > windowStart);
            requests.set(key, userRequests);
        }

        const currentRequests = requests.get(key) || [];

        if (currentRequests.length >= max) {
            return res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later.",
            });
        }

        currentRequests.push(now);
        requests.set(key, currentRequests);

        next();
    };
};

export const loginRateLimit = (windowMs = 15 * 60 * 1000, max = 5) => {
    const requests = new Map();

    return (req, res, next) => {
        const key = req.body.email ? req.body.email : req.ip; // use email if available
        const now = Date.now();
        const windowStart = now - windowMs;

        if (requests.has(key)) {
            const userRequests = requests
                .get(key)
                .filter((time) => time > windowStart);
            requests.set(key, userRequests);
        }

        const currentRequests = requests.get(key) || [];

        if (currentRequests.length >= max) {
            return res.status(429).json({
                success: false,
                message: "Too many login attempts. Please try again later.",
            });
        }

        currentRequests.push(now);
        requests.set(key, currentRequests);

        next();
    };
};
