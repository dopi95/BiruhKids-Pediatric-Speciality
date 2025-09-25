// Load environment variables FIRST
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables with explicit path
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import subscriberRoutes from "./src/routes/subscriberRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import testimonialRoutes from "./src/routes/testimonialRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import resultRoutes from "./src/routes/resultRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URLS
			? process.env.FRONTEND_URLS.split(',')
			: ["http://localhost:5173"],
		credentials: true
	})
);
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/users", userRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/departments", departmentRoutes);

// Root endpoint
app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "BiruhKids Pediatric Specialty Clinic API Running!",
		version: "1.0.0",
	});
});

// Health check endpoint
app.get("/api/health", (req, res) => {
	res.status(200).json({
		success: true,
		message: "Server is running successfully",
		timestamp: new Date().toISOString(),
	});
});

// 404 handler - Place this AFTER all other routes
app.use((req, res) => {
	console.log(`404 - Route not found: ${req.method} ${req.path}`);
	res.status(404).json({
		success: false,
		message: "API endpoint not found",
		path: req.path,
		method: req.method,
	});
});

// Error handling middleware
app.use((error, req, res, next) => {
	console.error("Error:", error);

	// Handle Multer errors
	if (error.code === "LIMIT_FILE_SIZE") {
		return res.status(400).json({
			success: false,
			message: "File size too large. Maximum size is 5MB.",
		});
	}

	if (error.code === "LIMIT_UNEXPECTED_FILE") {
		return res.status(400).json({
			success: false,
			message: "Unexpected file field. Only 'image' field is allowed.",
		});
	}

	// Handle MongoDB connection errors
	if (
		error.name === "MongoNetworkError" ||
		error.name === "MongooseServerSelectionError"
	) {
		return res.status(503).json({
			success: false,
			message: "Database connection error. Please try again later.",
		});
	}

	// Handle validation errors
	if (error.name === "ValidationError") {
		const validationErrors = Object.values(error.errors).map(
			(err) => err.message
		);
		return res.status(400).json({
			success: false,
			message: "Validation error: " + validationErrors.join(", "),
		});
	}

	// Handle duplicate key errors
	if (error.code === 11000) {
		return res.status(400).json({
			success: false,
			message: "Duplicate entry. This record already exists.",
		});
	}

	// Handle Cloudinary errors
	if (error.message && error.message.includes("cloudinary")) {
		return res.status(500).json({
			success: false,
			message: "Image upload service error. Please try again later.",
		});
	}

	// Default error response
	res.status(error.status || 500).json({
		success: false,
		message:
			process.env.NODE_ENV === "development"
				? error.message
				: "Internal server error",
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
