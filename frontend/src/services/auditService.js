import api from './api';

const auditService = {
  // Get audit logs with comprehensive filtering
  getAuditLogs: async (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );
    const response = await api.get('/audit-logs', { params: cleanParams });
    return response.data;
  },

  // Get audit statistics
  getAuditStats: async () => {
    const response = await api.get('/audit-logs/stats');
    return response.data;
  },

  // Export audit logs
  exportAuditLogs: async (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );
    const response = await api.get('/audit-logs/export', { 
      params: cleanParams,
      responseType: 'blob'
    });
    return response.data;
  },

  // Get unique values for filters
  getFilterOptions: async () => {
    const response = await api.get('/audit-logs/filter-options');
    return response.data;
  }
};

export default auditService;