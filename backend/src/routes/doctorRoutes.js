import express from "express";
import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorStats
} from "../controllers/doctorController.js";
import { doctorUpload } from "../middleware/upload.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";
import auditMiddleware from "../middleware/auditMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getDoctors);
router.get("/:id", getDoctor);

// Protected admin routes
router.post("/", protect, requirePermission('doctorManagement'), (req, res, next) => {
  try {
    const upload = doctorUpload();
    upload.single("photo")(req, res, next);
  } catch (error) {
    console.error('Doctor upload middleware error:', error);
    res.status(500).json({
      success: false,
      message: "Photo upload service not available"
    });
  }
}, auditMiddleware('CREATE', 'Doctor'), createDoctor);

router.get("/stats", protect, requirePermission('doctorManagement'), getDoctorStats);

router.put("/:id", protect, requirePermission('doctorManagement'), (req, res, next) => {
  try {
    const upload = doctorUpload();
    upload.single("photo")(req, res, next);
  } catch (error) {
    console.error('Doctor upload middleware error:', error);
    res.status(500).json({
      success: false,
      message: "Photo upload service not available"
    });
  }
}, auditMiddleware('UPDATE', 'Doctor'), updateDoctor);

router.delete("/:id", protect, requirePermission('doctorManagement'), auditMiddleware('DELETE', 'Doctor'), deleteDoctor);

export default router;