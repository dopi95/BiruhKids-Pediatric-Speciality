import api from './api';

const auditService = {
  // Get audit logs with filters
  getAuditLogs: async (params = {}) => {
    const response = await api.get('/audit-logs', { params });
    return response.data;
  },

  // Get audit statistics
  getAuditStats: async () => {
    const response = await api.get('/audit-logs/stats');
    return response.data;
  }
};

export default auditService;