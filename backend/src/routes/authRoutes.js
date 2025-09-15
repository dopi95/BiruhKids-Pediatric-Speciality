import express from 'express';
import {
  register,
  login,
  getProfile,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword,
  logout
} from '../controllers/authController.js';
import { protect, createRateLimit } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rate limiting for auth endpoints
const authRateLimit = createRateLimit(15 * 60 * 1000, 5); // 5 attempts per 15 minutes
const loginRateLimit = createRateLimit(15 * 60 * 1000, 3); // 3 attempts per 15 minutes

// Public routes
router.post('/register', authRateLimit, register);
router.post('/login', loginRateLimit, login);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', authRateLimit, forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

// Protected routes
router.get('/profile', protect, getProfile);
router.post('/change-password', protect, changePassword);
router.post('/logout', protect, logout);

export default router;