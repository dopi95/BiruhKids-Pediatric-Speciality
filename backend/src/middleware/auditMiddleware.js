import auditService from '../utils/auditService.js';

const auditMiddleware = (action, resourceType) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Log successful operations (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        const resourceId = req.params.id || req.body._id || req.body.id || 'unknown';
        const resourceName = req.body.name || req.body.title || req.body.email || resourceId;
        
        auditService.log({
          adminId: req.user._id,
          adminName: req.user.name,
          adminEmail: req.user.email,
          action,
          resourceType,
          resourceId,
          resourceName,
          details: {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userAgent: req.get('User-Agent')
          },
          req
        }).catch(err => console.error('Audit logging failed:', err));
      }
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

export default auditMiddleware;