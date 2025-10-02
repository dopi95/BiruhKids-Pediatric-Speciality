import asyncHandler from "express-async-handler";
import AuditService from "../utils/auditService.js";

// @desc    Get audit logs
// @route   GET /api/audit-logs
// @access  Super Admin only
export const getAuditLogs = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 20,
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
        data: {
            logs: result.logs,
            total: result.pagination.total,
            totalPages: result.pagination.totalPages,
            currentPage: result.pagination.currentPage
        }
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

// @desc    Export audit logs
// @route   GET /api/audit-logs/export
// @access  Super Admin only
export const exportAuditLogs = asyncHandler(async (req, res) => {
    const {
        adminId,
        action,
        resourceType,
        startDate,
        endDate,
        search
    } = req.query;

    const csvData = await AuditService.exportLogs({
        adminId,
        action,
        resourceType,
        startDate,
        endDate,
        search
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="audit-logs-${new Date().toISOString().split('T')[0]}.csv"`);
    res.status(200).send(csvData);
});

// @desc    Get filter options
// @route   GET /api/audit-logs/filter-options
// @access  Super Admin only
export const getFilterOptions = asyncHandler(async (req, res) => {
    const options = await AuditService.getFilterOptions();

    res.status(200).json({
        success: true,
        data: options
    });
});