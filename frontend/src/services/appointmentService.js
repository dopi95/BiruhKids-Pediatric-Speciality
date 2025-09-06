// src/services/appointmentService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const appointmentService = {
  // Create new appointment
  createAppointment: async (appointmentData) => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });
    return response.json();
  },

  // Get all appointments
  getAllAppointments: async () => {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    return response.json();
  },

  // Update appointment status
  updateAppointmentStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },
};