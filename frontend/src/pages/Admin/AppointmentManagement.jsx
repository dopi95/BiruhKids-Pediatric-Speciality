import { useState, useEffect } from "react";
import {
  CheckSquare,
  CalendarDays,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Search,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import appointmentService from "../../services/appointmentService";
import { debugToken } from "../../utils/tokenDebug";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      setRefreshing(true);
      setError("");

      // Debug token before API call
      debugToken();

      const result = await appointmentService.getAllAppointments();

      if (result.success) {
        // Sort appointments by newest first (createdAt descending) with millisecond precision
        const sortedAppointments = (result.data || []).sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          // If same timestamp, sort by _id (MongoDB ObjectId contains timestamp)
          if (dateB === dateA) {
            return b._id.localeCompare(a._id);
          }
          return dateB - dateA;
        });
        setAppointments(sortedAppointments);
      } else {
        setError(result.message || "Failed to fetch appointments");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch appointments");
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);



  const handleConfirmAppointment = async (id) => {
    setUpdating(true);
    setError("");
    try {
      const result = await appointmentService.confirmAppointment(id);

      if (result.success) {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === id ? { ...appt, status: "confirmed" } : appt
          )
        );
      } else {
        setError(result.message || "Failed to confirm appointment");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to confirm appointment"
      );
      console.error("Error confirming appointment:", error);
    } finally {
      setUpdating(false);
    }
  };

  const openCancelModal = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelModal(true);
    setCancellationReason("");
    setCustomReason("");
  };

  const handleCancelAppointment = async () => {
    if (!appointmentToCancel) return;

    setUpdating(true);
    setError("");
    try {
      const finalReason =
        cancellationReason === "Other" ? customReason : cancellationReason;
      const result = await appointmentService.cancelAppointment(
        appointmentToCancel._id,
        finalReason || "Doctor not available"
      );

      if (result.success) {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === appointmentToCancel._id
              ? { ...appt, status: "cancelled" }
              : appt
          )
        );
        setShowCancelModal(false);
        setAppointmentToCancel(null);
        setCancellationReason("");
        setCustomReason("");
      } else {
        setError(result.message || "Failed to cancel appointment");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to cancel appointment");
      console.error("Error canceling appointment:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRefresh = () => {
    fetchAppointments();
  };

  // Filtered appointments with additional sorting to ensure latest is always on top
  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesSearch =
        appointment.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.phone.includes(searchTerm) ||
        appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Ensure latest appointments are always on top with precise sorting
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      if (dateB === dateA) {
        return b._id.localeCompare(a._id);
      }
      return dateB - dateA;
    });

  const stats = [
    {
      label: "Total Appointments",
      value: appointments.length,
      color: "blue",
      icon: CalendarDays,
    },
    {
      label: "Pending",
      value: appointments.filter((a) => a.status === "pending").length,
      color: "yellow",
      icon: Clock,
    },
    {
      label: "Confirmed",
      value: appointments.filter((a) => a.status === "confirmed").length,
      color: "green",
      icon: CheckCircle,
    },
    {
      label: "Cancelled",
      value: appointments.filter((a) => a.status === "cancelled").length,
      color: "red",
      icon: XCircle,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="flex-1 bg-gray-50 ml-0 md:ml-0 mt-16 md:mt-0 p-4 md:p-6 mr-4">
        {/* Header */}
        <div className="bg-white shadow-sm border-b rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Appointment Management
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage and review patient appointments
              </p>
            </div>
            
            {/* Search and Refresh */}
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full sm:w-64 flex-shrink-0">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 outline-none flex-1 min-w-0 focus:ring-2 focus:ring-blue-500"
                />
                <Search className="h-5 w-5 text-gray-400 mx-2 flex-shrink-0" />
              </div>
              
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center whitespace-nowrap flex-shrink-0"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button
              onClick={() => setError("")}
              className="absolute top-0 right-0 p-2"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatsCard key={i} {...stat} icon={stat.icon} />
            ))}
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 lg:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              <span className="text-2xl">📅 </span>
              All Appointments ({filteredAppointments.length})
            </h2>
            
            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto flex-shrink-0"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 w-24">Submitted</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 min-w-[120px]">
                    Name
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 min-w-[150px]">
                    Email
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 w-24">
                    Phone
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 w-16">
                    Age
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 w-20">
                    Gender
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 min-w-[100px]">
                    Doctor
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 w-28">
                    Preferred Date
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 w-24">
                    Preferred Time
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 w-24">
                    Status
                  </th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-700 min-w-[140px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="11"
                      className="px-3 py-8 text-center text-gray-500"
                    >
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 text-xs text-gray-600">
                        {appt.createdAt
                          ? new Date(appt.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : "N/A"}
                      </td>
                      <td className="px-3 py-3 font-medium text-gray-900">
                        {appt.firstName} {appt.lastName}
                      </td>
                      <td className="px-3 py-3 text-gray-600 truncate max-w-[150px]" title={appt.email}>{appt.email}</td>
                      <td className="px-3 py-3 text-gray-600">{appt.phone}</td>
                      <td className="px-3 py-3 text-gray-600">{appt.age}</td>
                      <td className="px-3 py-3 text-gray-600 capitalize">{appt.gender}</td>
                      <td className="px-3 py-3 text-gray-600">{appt.doctor}</td>
                      <td className="px-3 py-3 text-gray-600 text-xs">
                        {appt.date
                          ? new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : "N/A"}
                      </td>
                      <td className="px-3 py-3 text-gray-600 text-xs">{appt.time || "N/A"}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            appt.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : appt.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {appt.status || "pending"}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-col gap-1">
                          {appt.status !== "confirmed" && (
                            <button
                              onClick={() => handleConfirmAppointment(appt._id)}
                              disabled={updating}
                              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50 flex items-center justify-center whitespace-nowrap"
                              title="Confirm Appointment"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Confirm
                            </button>
                          )}
                          {appt.status !== "cancelled" && (
                            <button
                              onClick={() => openCancelModal(appt)}
                              disabled={updating}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50 flex items-center justify-center whitespace-nowrap"
                              title="Cancel Appointment"
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cancel Appointment Modal */}
      {showCancelModal && appointmentToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Cancel Appointment</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel the appointment for{" "}
              <strong>
                {appointmentToCancel.firstName} {appointmentToCancel.lastName}
              </strong>
              ?
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Reason:
              </label>
              <select
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a reason</option>
                <option value="Doctor not available">
                  Doctor not available
                </option>
                <option value="Time slot already taken">
                  Time slot already taken
                </option>
                <option value="Emergency scheduling conflict">
                  Emergency scheduling conflict
                </option>
                <option value="Equipment maintenance">
                  Equipment maintenance
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            {cancellationReason === "Other" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Reason:
                </label>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Please specify the reason for cancellation..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  required
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setAppointmentToCancel(null);
                  setCancellationReason("");
                  setCustomReason("");
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={updating}
              >
                Cancel
              </button>
              <button
                onClick={handleCancelAppointment}
                disabled={
                  updating ||
                  !cancellationReason ||
                  (cancellationReason === "Other" && !customReason.trim())
                }
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
              >
                {updating && (
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                )}
                {updating ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;
