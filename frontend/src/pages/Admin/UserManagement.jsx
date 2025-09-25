import { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Users,
  Edit,
  Loader,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import ConfirmationModal from "../../components/ConfirmationModal";
import userService from "../../services/userService";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await userService.getUsers();
      if (response.success) {
        setUserList(response.users);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Stats
  const stats = [
    {
      label: "Total Users",
      value: userList.filter(user => user.role === 'user').length.toString(),
      color: "blue",
      icon: Users,
    },
  ];

  // Filtered users based on search (only regular users) sorted by newest first
  const filteredUsers = userList
    .filter((user) => {
      return (
        user.role === 'user' &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm))
      );
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Open delete modal
  const confirmDelete = (user) => {
    setDeleteModal({ isOpen: true, user });
  };

  // Handle actual delete
  const handleDelete = async () => {
    if (!deleteModal.user) return;

    try {
      setDeleting(true);
      const response = await userService.deleteUser(deleteModal.user._id);
      if (response.success) {
        await fetchUsers(); // Refresh the list
        setError("");
        setDeleteModal({ isOpen: false, user: null });
        toast.success("User deleted successfully!");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete user";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
    }
  };

  // Open edit modal
  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  // Handle actual edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!userToEdit) return;

    try {
      setUpdating(true);
      const response = await userService.updateUser(userToEdit._id, {
        name: userToEdit.name,
        email: userToEdit.email,
        phone: userToEdit.phone,
      });
      if (response.success) {
        await fetchUsers(); // Refresh the list
        setError("");
        setIsEditModalOpen(false);
        setUserToEdit(null);
        toast.success("User updated successfully!");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update user";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <div>
        {/* Header */}
        <div className="bg-white shadow-sm border-b mt-14 md:mt-0">
          <div className="px-4 sm:px-6 py-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage registered users and their information
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
            {stats.map((stat, i) => (
              <StatsCard key={i} {...stat} icon={stat.icon} />
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

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading users...</span>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
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
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm sm:text-base">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-3 sm:ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500">
                                Joined{" "}
                                {new Date(user.createdAt).toLocaleDateString()}
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
                            disabled={updating}
                            className="text-green-600 hover:text-green-900 p-1 sm:p-2 disabled:opacity-50"
                          >
                            <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => confirmDelete(user)}
                            disabled={deleting}
                            className="text-red-600 hover:text-red-900 p-1 sm:p-2 disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user:"
        confirmText="Delete"
        requireTextConfirmation={true}
        confirmationText={deleteModal.user?.email || ""}
        isLoading={deleting}
      />

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
                    setUserToEdit({
                      ...userToEdit,
                      name: e.target.value,
                    })
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
                    setUserToEdit({
                      ...userToEdit,
                      email: e.target.value,
                    })
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
                    setUserToEdit({
                      ...userToEdit,
                      phone: e.target.value,
                    })
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
                  disabled={updating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {updating && <Loader className="h-4 w-4 animate-spin mr-2" />}
                  {updating ? "Saving..." : "Save Changes"}
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
