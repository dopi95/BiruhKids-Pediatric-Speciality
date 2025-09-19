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
}, createDoctor);

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
}, updateDoctor);

router.delete("/:id", deleteDoctor);

export default router;