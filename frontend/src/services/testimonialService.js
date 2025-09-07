import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const testimonialApi = axios.create({
  baseURL: `${API_BASE_URL}/testimonials`,
});

// Get testimonials for display (approved only)
export const getPublicTestimonials = async () => {
  try {
    const response = await testimonialApi.get("/public");
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

// Submit new testimonial
export const submitTestimonial = async (formData) => {
  try {
    const response = await testimonialApi.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    throw error;
  }
};

// Admin: Get all testimonials
export const getTestimonials = async (status = "all") => {
  try {
    const response = await testimonialApi.get(`/?status=${status}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

// Admin: Approve testimonial
export const approveTestimonial = async (id) => {
  try {
    const response = await testimonialApi.patch(`/${id}/approve`);
    return response.data;
  } catch (error) {
    console.error("Error approving testimonial:", error);
    throw error;
  }
};

// Admin: Reject testimonial
export const rejectTestimonial = async (id) => {
  try {
    const response = await testimonialApi.patch(`/${id}/reject`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting testimonial:", error);
    throw error;
  }
};

// Admin: Delete testimonial
export const deleteTestimonial = async (id) => {
  try {
    const response = await testimonialApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
};

export default testimonialApi;