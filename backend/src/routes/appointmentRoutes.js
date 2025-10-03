import express from "express";
import {
  getAppointments,
  createAppointment,
  confirmAppointment,
  cancelAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";
import auditMiddleware from "../middleware/auditMiddleware.js";

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
  auditMiddleware('CONFIRM', 'Appointment'),
  confirmAppointment
);
router.put(
  "/:id/cancel",
  protect,
  requirePermission("appointmentManagement"),
  auditMiddleware('CANCEL', 'Appointment'),
  cancelAppointment
);
router.delete(
  "/:id",
  protect,
  requirePermission("appointmentManagement"),
  auditMiddleware('DELETE', 'Appointment'),
  deleteAppointment
);

export default router;
