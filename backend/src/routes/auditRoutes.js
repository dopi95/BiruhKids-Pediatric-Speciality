import express from "express";
import { protect, superAdminOnly } from "../middleware/authMiddleware.js";
import { getAuditLogs, getAuditStats, exportAuditLogs, getFilterOptions } from "../controllers/auditController.js";

const router = express.Router();

// All routes require super admin access
router.use(protect, superAdminOnly);

router.get("/", getAuditLogs);
router.get("/stats", getAuditStats);
router.get("/export", exportAuditLogs);
router.get("/filter-options", getFilterOptions);

export default router;