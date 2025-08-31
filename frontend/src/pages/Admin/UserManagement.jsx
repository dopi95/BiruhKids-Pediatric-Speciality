import React, { useState } from "react";
import { Search, Trash2, Users } from "lucide-react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { label: "Total Users", value: "2,547", change: "+12%", color: "blue" },
  ];

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+251 11 123 4567",
      joinDate: "2024-12-15",
      appointments: 5,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+251 11 234 5678",
      joinDate: "2024-11-20",
      appointments: 8,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+251 11 345 6789",
      joinDate: "2024-10-05",
      appointments: 2,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+251 11 456 7890",
      joinDate: "2025-01-02",
      appointments: 1,
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+251 11 567 8901",
      joinDate: "2024-09-18",
      appointments: 12,
    },
  ];

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 py-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage registered users and their information
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`text-xs sm:text-sm mt-1 ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                  >
                    <Users
                      className={`h-5 w-5 sm:h-6 sm:w-6 text-${stat.color}-600`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 sm:p-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Users ({filteredUsers.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Appointments
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm sm:text-base">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              Joined {user.joinDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.appointments}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
