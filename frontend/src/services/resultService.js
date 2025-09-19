import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/results`;

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create result (Admin only)
const createResult = async (resultData) => {
  const token = getAuthToken();
  const formData = new FormData();
  
  // Append text fields
  formData.append('patientName', resultData.patientName);
  formData.append('patientEmail', resultData.email);
  formData.append('patientPhone', resultData.phoneNumber);
  formData.append('doctorName', resultData.doctorName);
  formData.append('testDate', resultData.testDate);
  formData.append('additionalNotes', resultData.additionalNotes || '');
  
  // Append files
  if (resultData.resultFiles && resultData.resultFiles.length > 0) {
    resultData.resultFiles.forEach(file => {
      formData.append('resultFiles', file);
    });
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get patient results
const getPatientResults = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/patient`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Mark result as read
const markResultAsRead = async (resultId) => {
  const token = getAuthToken();
  const response = await axios.put(`${API_URL}/${resultId}/read`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get result statistics
const getResultStats = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get patient results by email (Admin only)
const getPatientResultsByEmail = async (email) => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/patient/${encodeURIComponent(email)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete result (Admin only)
const deleteResult = async (resultId) => {
  const token = getAuthToken();
  const response = await axios.delete(`${API_URL}/${resultId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Download result file
const downloadResultFile = async (publicId, originalName) => {
  const token = getAuthToken();
  const downloadUrl = `${API_URL}/download/${encodeURIComponent(publicId)}?token=${token}`;
  window.open(downloadUrl, '_blank');
};

// View result file
const viewResultFile = async (publicId) => {
  const token = getAuthToken();
  const fileUrl = `${API_URL}/file/${encodeURIComponent(publicId)}?token=${token}`;
  window.open(fileUrl, '_blank');
};

const resultService = {
  createResult,
  getPatientResults,
  markResultAsRead,
  downloadResultFile,
  viewResultFile,
  getResultStats,
  getPatientResultsByEmail,
  deleteResult,
};

export default resultService;