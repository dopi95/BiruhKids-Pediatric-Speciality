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

const userService = {
  createAdmin,
  getUsers,
  updateUser,
  deleteUser,
  getUserStats,
};

export default userService;