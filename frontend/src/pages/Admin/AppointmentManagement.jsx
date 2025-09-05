// src/pages/AppointmentManagement.jsx
import { useState, useEffect } from "react";
import { CheckSquare, CalendarDays, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import StatsCard from "../../components/StatsCard";

// Mock data for development
const mockAppointments = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "0911223344",
    age: 28,
    gender: "Male",
    doctor: "Dr. Smith",
    date: "2025-09-01",
    time: "10:00 AM",
    status: "pending"
  },
  {
    _id: "2",
    firstName: "Sara",
    lastName: "Ali",
    email: "sara@example.com",
    phone: "0911334455",
    age: 34,
    gender: "Female",
    doctor: "Dr. Adams",
    date: "2025-09-02",
    time: "02:00 PM",
    status: "pending"
  }
];

// Mock service for development
const appointmentService = {
  getAllAppointments: async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      // Try real API first
      const response = await fetch(`${API_BASE_URL}/appointments`);
      
      if (response.ok) {
        return await response.json();
      } else {
        // Fall back to mock data if API fails
        console.warn("API not available, using mock data");
        return { success: true, data: mockAppointments };
      }
    } catch (error) {
      console.warn("API error, using mock data", error);
      return { success: true, data: mockAppointments };
    }
  },

  updateAppointmentStatus: async (id, status) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        // Mock success response for development
        console.warn("API not available, simulating update");
        return { success: true, message: "Appointment updated (simulated)" };
      }
    } catch (error) {
      console.warn("API error, simulating update", error);
      return { success: true, message: "Appointment updated (simulated)" };
    }
  },

  deleteAppointment: async (id) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        // Mock success response for development
        console.warn("API not available, simulating delete");
        return { success: true, message: "Appointment deleted (simulated)" };
      }
    } catch (error) {
      console.warn("API error, simulating delete", error);
      return { success: true, message: "Appointment deleted (simulated)" };
    }
  },
};

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      setRefreshing(true);
      setError("");
      const result = await appointmentService.getAllAppointments();
      
      if (result.success) {
        setAppointments(result.data || []);
      } else {
        setError(result.message || "Failed to fetch appointments");
        console.error("Failed to fetch appointments:", result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred while fetching appointments");
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedAppointments((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleConfirmAppointment = async (id) => {
    setUpdating(true);
    setError("");
    try {
      const result = await appointmentService.updateAppointmentStatus(id, "confirmed");
      
      if (result.success) {
        // Update the appointment in the local state
        setAppointments(prev => prev.map(appt => 
          appt._id === id ? { ...appt, status: "confirmed" } : appt
        ));
      } else {
        setError(result.message || "Failed to confirm appointment");
        console.error("Failed to confirm appointment:", result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred while confirming appointment");
      console.error("Error confirming appointment:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    setUpdating(true);
    setError("");
    try {
      const result = await appointmentService.deleteAppointment(id);
      
      if (result.success) {
        // Remove the appointment from the local state
        setAppointments(prev => prev.filter(appt => appt._id !== id));
        // Also remove from selected appointments if it was selected
        setSelectedAppointments(prev => prev.filter(apptId => apptId !== id));
      } else {
        setError(result.message || "Failed to cancel appointment");
        console.error("Failed to cancel appointment:", result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred while canceling appointment");
      console.error("Error canceling appointment:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRefresh = () => {
    fetchAppointments();
  };

  const stats = [
    {
      label: "Total Appointments",
      value: appointments.length,
      color: "blue",
      icon: CalendarDays,
    },
    {
      label: "Selected",
      value: selectedAppointments.length,
      color: "green",
      icon: CheckSquare,
    },
    {
      label: "Pending",
      value: appointments.filter(a => a.status === "pending").length,
      color: "yellow",
      icon: RefreshCw,
    },
    {
      label: "Confirmed",
      value: appointments.filter(a => a.status === "confirmed").length,
      color: "green",
      icon: CheckCircle,
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
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      {/* Header with refresh button */}
      <div className="bg-white shadow-sm rounded-lg py-6 px-4 md:px-6 mb-6 flex justify-between items-center">
        <div className="mt-14 sm:mt-0">
          <h1 className="text-base md:text-2xl font-bold text-gray-900">
            Appointment Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage and review patient appointments
          </p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
        >
          {refreshing ? (
            <RefreshCw className="w-4 h-4 animate-spin mr-1" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-1" />
          )}
          Refresh
        </button>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} icon={stat.icon} />
        ))}
      </div>

      {/* Development notice */}
      {appointments.length > 0 && appointments[0]._id === "1" && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Development Mode: </strong>
          <span className="block sm:inline">Using mock data. Backend API not available.</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Phone
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Age
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Gender
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Doctor
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Time
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="11" className="px-4 py-8 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedAppointments.includes(appt._id)}
                      onChange={() => handleCheckboxChange(appt._id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {appt.firstName} {appt.lastName}
                  </td>
                  <td className="px-4 py-2">{appt.email}</td>
                  <td className="px-4 py-2">{appt.phone}</td>
                  <td className="px-4 py-2">{appt.age}</td>
                  <td className="px-4 py-2">{appt.gender}</td>
                  <td className="px-4 py-2">{appt.doctor}</td>
                  <td className="px-4 py-2">
                    {new Date(appt.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{appt.time}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appt.status === "confirmed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {appt.status || "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {appt.status !== "confirmed" && (
                      <button
                        onClick={() => handleConfirmAppointment(appt._id)}
                        disabled={updating}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs disabled:opacity-50 flex items-center"
                        title="Confirm Appointment"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Confirm
                      </button>
                    )}
                    <button
                      onClick={() => handleCancelAppointment(appt._id)}
                      disabled={updating}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs disabled:opacity-50 flex items-center"
                      title="Cancel Appointment"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManagement;