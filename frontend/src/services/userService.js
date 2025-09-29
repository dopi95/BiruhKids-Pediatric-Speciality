import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create admin user
const createAdmin = async (adminData) => {
  const token = getAuthToken();
  const response = await axios.post(`${API_URL}/admin`, adminData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all users
const getUsers = async () => {
  const token = getAuthToken();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update user
const updateUser = async (userId, userData) => {
  const token = getAuthToken();
  const response = await axios.put(`${API_URL}/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete user
const deleteUser = async (userId) => {
  const token = getAuthToken();
  const response = await axios.delete(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get patients only (for result management)
const getPatients = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/patients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get user statistics
const getUserStats = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get user by ID
const getUserById = async (userId) => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get admin users only
const getAdmins = async () => {
  const token = getAuthToken();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Filter only admin and super_admin users
  const adminUsers = response.data.users.filter(user => 
    user.role === 'admin' || user.role === 'super_admin'
  );
  return { ...response.data, admins: adminUsers };
};

// Update admin user
const updateAdmin = async (adminId, adminData) => {
  const token = getAuthToken();
  const response = await axios.put(`${API_URL}/${adminId}`, adminData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete admin user
const deleteAdmin = async (adminId) => {
  const token = getAuthToken();
  const response = await axios.delete(`${API_URL}/${adminId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const userService = {
  createAdmin,
  getUsers,
  getPatients,
  getAdmins,
  updateUser,
  updateAdmin,
  deleteUser,
  deleteAdmin,
  getUserStats,
  getUserById,
};

export default userService;