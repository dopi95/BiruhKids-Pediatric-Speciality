import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/appointments`;

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get all appointments
const getAllAppointments = async () => {
  const response = await apiClient.get('/');
  return response.data;
};

// Create new appointment (public)
const createAppointment = async (appointmentData) => {
  const response = await axios.post(API_URL, appointmentData);
  return response.data;
};

// Confirm appointment
const confirmAppointment = async (appointmentId) => {
  const response = await apiClient.put(`/${appointmentId}/confirm`);
  return response.data;
};

// Cancel appointment
const cancelAppointment = async (appointmentId, reason = "Doctor not available") => {
  const response = await apiClient.put(`/${appointmentId}/cancel`, { reason });
  return response.data;
};

// Delete appointment
const deleteAppointment = async (appointmentId) => {
  const response = await apiClient.delete(`/${appointmentId}`);
  return response.data;
};

const appointmentService = {
  getAllAppointments,
  createAppointment,
  confirmAppointment,
  cancelAppointment,
  deleteAppointment,
};

export default appointmentService;