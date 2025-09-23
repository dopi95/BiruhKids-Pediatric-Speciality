import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/departments`;

// Set up axios defaults
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Get all departments with services
const getDepartments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single department
const getDepartment = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create department
const createDepartment = async (departmentData) => {
  const response = await axios.post(API_URL, departmentData);
  return response.data;
};

// Update department
const updateDepartment = async (id, departmentData) => {
  const response = await axios.put(`${API_URL}/${id}`, departmentData);
  return response.data;
};

// Delete department
const deleteDepartment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Add service to department
const addService = async (departmentId, serviceData) => {
  const response = await axios.post(`${API_URL}/${departmentId}/services`, serviceData);
  return response.data;
};

// Update service in department
const updateService = async (departmentId, serviceId, serviceData) => {
  const response = await axios.put(`${API_URL}/${departmentId}/services/${serviceId}`, serviceData);
  return response.data;
};

// Delete service from department
const deleteService = async (departmentId, serviceId) => {
  const response = await axios.delete(`${API_URL}/${departmentId}/services/${serviceId}`);
  return response.data;
};

const departmentService = {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  addService,
  updateService,
  deleteService,
};

export default departmentService;