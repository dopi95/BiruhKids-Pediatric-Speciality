import { useState, useEffect } from "react";
import { Search, Filter, Calendar, User, Activity, Loader } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import auditService from "../../services/auditService";
import { toast } from "react-toastify";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    action: "",
    resourceType: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 50
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await auditService.getAuditLogs(filters);
      if (response.success) {
        setLogs(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch audit logs");
      toast.error("Failed to fetch audit logs");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await auditService.getAuditStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchLogs();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [filters.search, filters.action, filters.resourceType, filters.startDate, filters.endDate]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const statsCards = [
    {
      label: "Total Logs",
      value: stats.totalLogs?.toString() || "0",
      color: "blue",
      icon: Activity,
    },
    {
      label: "Today's Activity",
      value: stats.todayLogs?.toString() || "0",
      color: "green",
      icon: Calendar,
    },
    {
      label: "Active Admins",
      value: stats.activeAdmins?.toString() || "0",
      color: "purple",
      icon: User,
    }
  ];

  const actionTypes = ["CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT"];
  const resourceTypes = ["User", "Doctor", "Admin", "Appointment", "Result", "Video", "Testimonial", "Service", "Department"];

  return (
    <div className="bg-gray-50">
      <div>
        {/* Header */}
        <div className="bg-white shadow-sm border-b mt-14 xl:mt-0">
          <div className="px-4 sm:px-6 py-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Audit Logs
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Track all administrative actions and system activities
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <div className="flex justify-between items-center">
                <span>{error}</span>
                <button
                  onClick={() => setError("")}
                  className="text-red-700 hover:text-red-900"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
            {statsCards.map((stat, i) => (
              <StatsCard key={i} {...stat} icon={stat.icon} />
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Action Filter */}
                <select
                  value={filters.action}
                  onChange={(e) => handleFilterChange("action", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Actions</option>
                  {actionTypes.map(action => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>

                {/* Resource Type Filter */}
                <select
                  value={filters.resourceType}
                  onChange={(e) => handleFilterChange("resourceType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Resources</option>
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                {/* Date Range */}
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange("startDate", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange("endDate", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Audit Logs ({logs.length})
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading audit logs...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admin
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resource
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {logs.map((log) => (
                      <tr key={log._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {log.adminId?.name || 'System'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {log.adminId?.email || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            log.action === 'CREATE' ? 'bg-green-100 text-green-800' :
                            log.action === 'UPDATE' ? 'bg-blue-100 text-blue-800' :
                            log.action === 'DELETE' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.resourceType}
                          {log.resourceId && (
                            <div className="text-xs text-gray-500">
                              ID: {log.resourceId.slice(-8)}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {log.details || 'No details available'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {logs.length === 0 && (
                  <div className="text-center py-12">
                    <Activity className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No audit logs</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No audit logs match your current filters.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;