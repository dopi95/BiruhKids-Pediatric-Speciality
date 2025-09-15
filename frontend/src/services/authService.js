import apiService from './api';

export const authService = {
  async forgotPassword(email) {
    try {
      const response = await apiService.forgotPassword(email);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async resetPassword(token, password) {
    try {
      const response = await apiService.resetPassword(token, password);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async verifyOtp(email, otp) {
    try {
      const response = await apiService.verifyOtp(email, otp);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiService.changePassword(currentPassword, newPassword);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default authService;