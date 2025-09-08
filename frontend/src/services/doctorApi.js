import axios from 'axios';

// Vite uses import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Backend server is not running. Please start the server on port 3000.');
    }
    if (error.response?.status === 404) {
      throw new Error('API endpoint not found. Check your backend routes.');
    }
    throw error;
  }
);

export const doctorAPI = {
  // Get all doctors
  getDoctors: async (searchQuery = '', page = 1, limit = 10) => {
    try {
      const response = await api.get(`/doctors?search=${searchQuery}&page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  // Get a single doctor by ID
  getDoctor: async (id) => {
    try {
      const response = await api.get(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor:', error);
      throw error;
    }
  },

  // Create a new doctor
  createDoctor: async (doctorData) => {
    try {
      const formData = new FormData();
      
      // Append all fields to formData
      Object.keys(doctorData).forEach(key => {
        if (key === 'photo' && doctorData[key]) {
          formData.append('photo', doctorData[key]);
        } else if (doctorData[key] !== null && doctorData[key] !== undefined) {
          formData.append(key, doctorData[key]);
        }
      });

      const response = await api.post('/doctors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating doctor:', error);
      throw error;
    }
  },

  // Update a doctor
  updateDoctor: async (id, doctorData) => {
    try {
      const formData = new FormData();
      
      // Append all fields to formData
      Object.keys(doctorData).forEach(key => {
        if (key === 'photo' && doctorData[key]) {
          formData.append('photo', doctorData[key]);
        } else if (doctorData[key] !== null && doctorData[key] !== undefined) {
          formData.append(key, doctorData[key]);
        }
      });

      const response = await api.put(`/doctors/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating doctor:', error);
      throw error;
    }
  },

  // Delete a doctor
  deleteDoctor: async (id) => {
    try {
      const response = await api.delete(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw error;
    }
  },

  // Get doctor statistics
  getDoctorStats: async () => {
    try {
      const response = await api.get('/doctors/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

export default api;