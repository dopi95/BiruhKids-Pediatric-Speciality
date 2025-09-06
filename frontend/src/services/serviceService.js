import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/services`;

// Get all services
const getServices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single service
const getService = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create service
const createService = async (serviceData) => {
  const response = await axios.post(API_URL, serviceData);
  return response.data;
};

// Update service
const updateService = async (id, serviceData) => {
  const response = await axios.put(`${API_URL}/${id}`, serviceData);
  return response.data;
};

// Delete service
const deleteService = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const serviceService = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};

export default serviceService;