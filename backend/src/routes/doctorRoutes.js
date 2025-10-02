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
import auditMiddleware from "../middleware/auditMiddleware.js";

const router = express.Router();

// Doctor routes
router.post("/", (req, res, next) => {
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

router.get("/", getDoctors);
router.get("/stats", getDoctorStats);
router.get("/:id", getDoctor);

router.put("/:id", (req, res, next) => {
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

router.delete("/:id", auditMiddleware('DELETE', 'Doctor'), deleteDoctor);

export default router;