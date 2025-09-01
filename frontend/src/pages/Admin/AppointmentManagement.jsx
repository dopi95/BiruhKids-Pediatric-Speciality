import React, { useState } from "react";
import { CheckSquare, CalendarDays } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";


const AppointmentManagement = () => {
  // Sample appointments (replace with API data later)
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "0911223344",
      age: 28,
      gender: "Male",
      doctor: "Dr. Smith",
      date: "2025-09-01",
      time: "10:00 AM",
    },
    {
      id: 2,
      firstName: "Sara",
      lastName: "Ali",
      email: "sara@example.com",
      phone: "0911334455",
      age: 34,
      gender: "Female",
      doctor: "Dr. Adams",
      date: "2025-09-02",
      time: "02:00 PM",
    },
  ]);

  const [selectedAppointments, setSelectedAppointments] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedAppointments((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
            <AdminSidebar />

      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
        <p className="text-gray-600">Manage and review patient appointments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <CalendarDays className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Appointments</p>
            <p className="text-xl font-bold text-gray-900">{appointments.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <CheckSquare className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Selected</p>
            <p className="text-xl font-bold text-gray-900">{selectedAppointments.length}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Age</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Gender</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Doctor</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedAppointments.includes(appt.id)}
                    onChange={() => handleCheckboxChange(appt.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-2">{appt.firstName} {appt.lastName}</td>
                <td className="px-4 py-2">{appt.email}</td>
                <td className="px-4 py-2">{appt.phone}</td>
                <td className="px-4 py-2">{appt.age}</td>
                <td className="px-4 py-2">{appt.gender}</td>
                <td className="px-4 py-2">{appt.doctor}</td>
                <td className="px-4 py-2">{appt.date}</td>
                <td className="px-4 py-2">{appt.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManagement;
