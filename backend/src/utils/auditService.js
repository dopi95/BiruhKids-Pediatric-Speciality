import AuditLog from "../models/AuditLog.js";

class AuditService {
    static async log({
        adminId,
        adminName,
        adminEmail,
        action,
        resourceType,
        resourceId,
        resourceName,
        details = {},
        req = null
    }) {
        try {
            // Validate required fields
            if (!adminId || !adminName || !adminEmail) {
                if (process.env.NODE_ENV === 'development') {
                    console.error('Audit log missing required fields:', { adminId, adminName, adminEmail });
                }
                return;
            }

            const auditData = {
                adminId,
                adminName,
                adminEmail,
                action,
                resourceType,
                resourceId: resourceId || 'unknown',
                resourceName: resourceName || 'unknown',
                details,
            };

            // Add request info if available
            if (req) {
                auditData.ipAddress = req.ip || req.connection?.remoteAddress || 'unknown';
                auditData.userAgent = req.get('User-Agent') || 'unknown';
            }

            const auditLog = new AuditLog(auditData);
            await auditLog.save();
            

        } catch (error) {
            // Log audit failures but don't break the main operation
            if (process.env.NODE_ENV === 'development') {
                console.error("Failed to create audit log:", error.message);
            }
        }
    }

    static async logAction(userId, action, resourceType, resourceId = null, metadata = {}) {
        try {
            const auditLog = new AuditLog({
                adminId: userId,
                action,
                resourceType,
                resourceId,
                details: metadata,
            });
            
            await auditLog.save();
            return auditLog;
        } catch (error) {
            console.error('Failed to log audit action:', error);
            // Don't throw error to avoid breaking the main operation
        }
    }

    static async getLogs({
        page = 1,
        limit = 20,
        adminId = null,
        action = null,
        resourceType = null,
        startDate = null,
        endDate = null,
        search = null
    }) {
        try {
            const query = this._buildQuery({ adminId, action, resourceType, startDate, endDate, search });
            const skip = (page - 1) * limit;
            
            const [logs, total] = await Promise.all([
                AuditLog.find(query)
                    .populate('adminId', 'name email')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                AuditLog.countDocuments(query)
            ]);

            return {
                logs,
                pagination: {
                    currentPage: page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            console.error("Failed to fetch audit logs:", error);
            throw error;
        }
    }

    static _buildQuery({ adminId, action, resourceType, startDate, endDate, search }) {
        const query = {};

        if (adminId) query.adminId = adminId;
        if (action) query.action = action;
        if (resourceType) query.resourceType = resourceType;
        
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(new Date(endDate).setHours(23, 59, 59, 999));
        }

        if (search) {
            query.$or = [
                { adminName: { $regex: search, $options: 'i' } },
                { adminEmail: { $regex: search, $options: 'i' } },
                { resourceName: { $regex: search, $options: 'i' } },
                { action: { $regex: search, $options: 'i' } },
                { resourceType: { $regex: search, $options: 'i' } }
            ];
        }

        return query;
    }

    static async getStats() {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Import User model dynamically to avoid circular dependency
            const User = (await import('../models/User.js')).default;

            const [
                totalLogs,
                todayLogs,
                activeAdminsInLogs,
                totalAdmins
            ] = await Promise.all([
                AuditLog.countDocuments(),
                AuditLog.countDocuments({
                    createdAt: { $gte: today }
                }),
                AuditLog.distinct('adminId', {
                    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
                }),
                User.countDocuments({
                    role: { $in: ['admin', 'super_admin'] }
                })
            ]);

            return {
                totalLogs,
                todayLogs,
                activeAdmins: totalAdmins
            };
        } catch (error) {
            console.error("Failed to fetch audit stats:", error);
            throw error;
        }
    }

    static async exportLogs(filters) {
        try {
            const query = this._buildQuery(filters);
            const logs = await AuditLog.find(query)
                .populate('adminId', 'name email')
                .sort({ createdAt: -1 })
                .limit(10000); // Limit export to 10k records

            const csvHeader = 'Timestamp,Admin Name,Admin Email,Action,Resource Type,Resource ID,Resource Name,Details,IP Address\n';
            const csvRows = logs.map(log => {
                const timestamp = log.createdAt.toISOString();
                const adminName = log.adminId?.name || log.adminName || 'System';
                const adminEmail = log.adminId?.email || log.adminEmail || 'N/A';
                const details = typeof log.details === 'object' ? JSON.stringify(log.details) : log.details;
                
                return `"${timestamp}","${adminName}","${adminEmail}","${log.action}","${log.resourceType}","${log.resourceId || ''}","${log.resourceName || ''}","${details || ''}","${log.ipAddress || ''}"`;
            }).join('\n');

            return csvHeader + csvRows;
        } catch (error) {
            console.error("Failed to export audit logs:", error);
            throw error;
        }
    }

    static async getFilterOptions() {
        try {
            const [actions, resourceTypes] = await Promise.all([
                AuditLog.distinct('action'),
                AuditLog.distinct('resourceType')
            ]);

            return {
                actions: actions.sort(),
                resourceTypes: resourceTypes.sort()
            };
        } catch (error) {
            console.error("Failed to fetch filter options:", error);
            throw error;
        }
    }
}

export default AuditService;