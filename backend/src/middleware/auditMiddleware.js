import auditService from '../utils/auditService.js';
import User from '../models/User.js';

const auditMiddleware = (action, resourceType) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    
    res.send = async function(data) {
      // Log successful operations (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        try {
          // Ensure we have complete user data
          let adminUser = req.user;
          if (!adminUser || !adminUser.name || !adminUser.email) {
            adminUser = await User.findById(req.user._id).select('name email role');
          }
          
          if (!adminUser || !adminUser.name || !adminUser.email) {
            console.error('Audit middleware: User data incomplete:', { userId: req.user._id, adminUser });
            return originalSend.call(this, data);
          }
          
          const resourceId = req.params.id || req.body?._id || req.body?.id || 'unknown';
          let resourceName = req.body?.name || req.body?.title || req.body?.email || 
                            req.body?.title_en || req.body?.name_en || req.body?.patientName;
          
          // Try to get name from response data for all operations
          if (!resourceName) {
            try {
              const responseData = typeof data === 'string' ? JSON.parse(data) : data;
              resourceName = responseData?.data?.name || responseData?.data?.title || 
                           responseData?.data?.email || responseData?.data?.title_en || 
                           responseData?.data?.name_en || responseData?.data?.patientName ||
                           responseData?.name || responseData?.title || 
                           responseData?.email || responseData?.title_en || 
                           responseData?.name_en || responseData?.patientName;
            } catch {
              // Ignore parsing errors
            }
          }
          
          if (!resourceName) {
            resourceName = action === 'DELETE' ? 'Deleted Item' : 'Unknown Item';
          }
          
          // Determine actual resource type based on context
          let actualResourceType = resourceType;
          if (req.originalUrl.includes('/admin') || req.originalUrl.includes('/users/admin') || 
              (req.body?.role && ['admin', 'super_admin'].includes(req.body.role))) {
            actualResourceType = 'Admin';
          }
          
          // Create user-friendly details
          let details = '';
          if (action === 'CREATE') {
            details = `Created new ${actualResourceType.toLowerCase()}: ${resourceName}`;
          } else if (action === 'UPDATE') {
            details = `Updated ${actualResourceType.toLowerCase()}: ${resourceName}`;
          } else if (action === 'DELETE') {
            details = `Deleted ${actualResourceType.toLowerCase()}: ${resourceName}`;
          } else {
            details = `${action} ${actualResourceType.toLowerCase()}: ${resourceName}`;
          }
          
          console.log('Creating audit log for:', adminUser?.name || 'Unknown', action, actualResourceType, resourceName);
          
          await auditService.log({
            adminId: adminUser._id,
            adminName: adminUser?.name || 'Unknown',
            adminEmail: adminUser?.email || 'unknown@email.com',
            action,
            resourceType: actualResourceType,
            resourceId,
            resourceName,
            details,
            req
          });
        } catch (err) {
          console.error('Audit logging failed:', err);
        }
      }
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

export default auditMiddleware;