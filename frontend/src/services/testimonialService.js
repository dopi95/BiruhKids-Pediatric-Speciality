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
      timeout: 30000, // 30 second timeout
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your internet connection and try again.');
    }
    
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 'Failed to submit testimonial';
      const errorDetails = error.response.data?.errors;
      
      if (errorDetails && Array.isArray(errorDetails)) {
        throw new Error(errorDetails.join(', '));
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your internet connection and try again.');
    } else {
      // Other error
      throw new Error(error.message || 'An unexpected error occurred. Please try again.');
    }
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