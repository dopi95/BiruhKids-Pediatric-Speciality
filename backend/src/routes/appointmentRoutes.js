import express from "express";
import {
  getAppointments,
  createAppointment,
  confirmAppointment,
  cancelAppointment,
} from "../controllers/appointmentController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/", createAppointment);

// Protected routes (Admin only)
router.get(
  "/",
  protect,
  requirePermission("appointmentManagement"),
  getAppointments
);
router.put(
  "/:id/confirm",
  protect,
  requirePermission("appointmentManagement"),
  confirmAppointment
);
router.put(
  "/:id/cancel",
  protect,
  requirePermission("appointmentManagement"),
  cancelAppointment
);

export default router;
