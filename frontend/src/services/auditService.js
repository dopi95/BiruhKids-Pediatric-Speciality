import api from './api';

const auditService = {
  // Get audit logs with comprehensive filtering
  getAuditLogs: async (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );
    const queryString = new URLSearchParams(cleanParams).toString();
    const endpoint = queryString ? `/audit-logs?${queryString}` : '/audit-logs';
    return await api.request(endpoint);
  },

  // Get audit statistics
  getAuditStats: async () => {
    return await api.request('/audit-logs/stats');
  },

  // Export audit logs
  exportAuditLogs: async (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );
    const queryString = new URLSearchParams(cleanParams).toString();
    const endpoint = queryString ? `/audit-logs/export?${queryString}` : '/audit-logs/export';
    
    const response = await fetch(`${api.baseURL}${endpoint}`, {
      headers: api.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to export audit logs');
    }
    
    return await response.blob();
  },

  // Get unique values for filters
  getFilterOptions: async () => {
    return await api.request('/audit-logs/filter-options');
  }
};

export default auditService;