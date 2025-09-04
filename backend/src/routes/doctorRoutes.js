import express from "express";
import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorStats
} from "../controllers/doctorController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Doctor routes
router.post("/", upload.single("photo"), createDoctor);
router.get("/", getDoctors);
router.get("/stats", getDoctorStats);
router.get("/:id", getDoctor);
router.put("/:id", upload.single("photo"), updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;