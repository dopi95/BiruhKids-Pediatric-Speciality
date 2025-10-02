import express from "express";
import { protect, superAdminOnly } from "../middleware/authMiddleware.js";
import { getAuditLogs, getAuditStats } from "../controllers/auditController.js";

const router = express.Router();

// All routes require super admin access
router.use(protect, superAdminOnly);

router.get("/", getAuditLogs);
router.get("/stats", getAuditStats);

export default router;