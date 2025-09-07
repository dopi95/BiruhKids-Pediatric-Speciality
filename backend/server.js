import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./src/config/db.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import subscriberRoutes from "./src/routes/subscriberRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import testimonialRoutes from "./src/routes/testimonialRoutes.js";

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);


// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
    timestamp: new Date().toISOString()
  });
});
// 404 handler - Place this AFTER all other routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    success: false,
    message: error.message || "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));