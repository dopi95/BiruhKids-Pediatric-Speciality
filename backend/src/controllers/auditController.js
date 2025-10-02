import asyncHandler from "express-async-handler";
import AuditService from "../utils/auditService.js";

// @desc    Get audit logs
// @route   GET /api/audit-logs
// @access  Super Admin only
export const getAuditLogs = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 50,
        adminId,
        action,
        resourceType,
        startDate,
        endDate,
        search
    } = req.query;

    const result = await AuditService.getLogs({
        page: parseInt(page),
        limit: parseInt(limit),
        adminId,
        action,
        resourceType,
        startDate,
        endDate,
        search
    });

    res.status(200).json({
        success: true,
        data: result.logs,
        pagination: result.pagination
    });
});

// @desc    Get audit log statistics
// @route   GET /api/audit-logs/stats
// @access  Super Admin only
export const getAuditStats = asyncHandler(async (req, res) => {
    const stats = await AuditService.getStats();

    res.status(200).json({
        success: true,
        data: stats
    });
});