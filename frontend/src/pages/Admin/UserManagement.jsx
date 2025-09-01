import React, { useState } from "react";
import { Search, Trash2, Users, AlertTriangle, Edit } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+251 11 123 4567",
      joinDate: "2024-12-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+251 11 234 5678",
      joinDate: "2024-11-20",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+251 11 345 6789",
      joinDate: "2024-10-05",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+251 11 456 7890",
      joinDate: "2025-01-02",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+251 11 567 8901",
      joinDate: "2024-09-18",
    },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  // Stats
  const stats = [
    {
      label: "Total Users",
      value: userList.length.toString(),
      color: "blue",
    },
  ];

  // Filtered users based on search
  const filteredUsers = userList.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
  });

  // Open delete modal
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Handle actual delete
  const handleDelete = () => {
    if (userToDelete) {
      setUserList((prev) => prev.filter((u) => u.id !== userToDelete.id));
    }
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Open edit modal
  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  // Handle actual edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setUserList((prev) =>
      prev.map((u) => (u.id === userToEdit.id ? userToEdit : u))
    );
    setIsEditModalOpen(false);
    setUserToEdit(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
         <div className="bg-white shadow-sm border-b mt-12 md:mt-0">
          <div className="px-4 sm:px-6 py-4 text-center sm:text-left">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage registered users and their information
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      {stat.value}
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
            <div className="p-3 sm:p-4 lg:p-6">
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
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Users ({filteredUsers.length})
              </h2>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="min-w-[500px] w-full text-sm sm:text-base">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Contact
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
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-green-600 hover:text-green-900 p-1 sm:p-2"
                        >
                          <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(user)}
                          className="text-red-600 hover:text-red-900 p-1 sm:p-2"
                        >
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full text-center shadow-lg">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              Do you really want to delete{" "}
              <span className="font-semibold">{userToDelete.name}</span>?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && userToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full text-left shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <form onSubmit={handleSaveEdit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={userToEdit.name}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={userToEdit.email}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, email: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={userToEdit.phone}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, phone: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
