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
            const auditData = {
                adminId,
                adminName,
                adminEmail,
                action,
                resourceType,
                resourceId,
                resourceName,
                details,
            };

            // Add request info if available
            if (req) {
                auditData.ipAddress = req.ip || req.connection.remoteAddress;
                auditData.userAgent = req.get('User-Agent');
            }

            const auditLog = new AuditLog(auditData);
            await auditLog.save();
            
            console.log(`Audit log created: ${adminName} ${action} ${resourceType} ${resourceName}`);
        } catch (error) {
            console.error("Failed to create audit log:", error);
            // Don't throw error to avoid breaking the main operation
        }
    }

    static async getLogs({
        page = 1,
        limit = 50,
        adminId = null,
        action = null,
        resourceType = null,
        startDate = null,
        endDate = null,
        search = null
    }) {
        try {
            const query = {};

            // Apply filters
            if (adminId) query.adminId = adminId;
            if (action) query.action = action;
            if (resourceType) query.resourceType = resourceType;
            
            if (startDate || endDate) {
                query.createdAt = {};
                if (startDate) query.createdAt.$gte = new Date(startDate);
                if (endDate) query.createdAt.$lte = new Date(endDate);
            }

            if (search) {
                query.$or = [
                    { adminName: { $regex: search, $options: 'i' } },
                    { adminEmail: { $regex: search, $options: 'i' } },
                    { resourceName: { $regex: search, $options: 'i' } }
                ];
            }

            const skip = (page - 1) * limit;
            
            const [logs, total] = await Promise.all([
                AuditLog.find(query)
                    .populate('adminId', 'name email role')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                AuditLog.countDocuments(query)
            ]);

            return {
                logs,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            console.error("Failed to fetch audit logs:", error);
            throw error;
        }
    }

    static async getStats() {
        try {
            const [
                totalLogs,
                todayLogs,
                actionStats,
                resourceStats
            ] = await Promise.all([
                AuditLog.countDocuments(),
                AuditLog.countDocuments({
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0))
                    }
                }),
                AuditLog.aggregate([
                    { $group: { _id: "$action", count: { $sum: 1 } } }
                ]),
                AuditLog.aggregate([
                    { $group: { _id: "$resourceType", count: { $sum: 1 } } }
                ])
            ]);

            return {
                totalLogs,
                todayLogs,
                actionStats,
                resourceStats
            };
        } catch (error) {
            console.error("Failed to fetch audit stats:", error);
            throw error;
        }
    }
}

export default AuditService;