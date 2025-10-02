import auditService from '../utils/auditService.js';

const auditMiddleware = (action, resourceType) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Log successful operations (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const userId = req.user?.id || req.user?._id || 'anonymous';
        const resourceId = req.params.id || req.body._id || req.body.id;
        
        auditService.logAction(
          userId,
          action,
          resourceType,
          resourceId,
          {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userAgent: req.get('User-Agent')
          }
        ).catch(err => console.error('Audit logging failed:', err));
      }
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

export default auditMiddleware;