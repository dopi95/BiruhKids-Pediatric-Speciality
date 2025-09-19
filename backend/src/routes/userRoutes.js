import express from 'express';
import { createAdmin, getUsers, getUserById, updateUser, deleteUser, getUserStats } from '../controllers/userController.js';
import { protect, requirePermission } from '../middleware/authMiddleware.js';

const router = express.Router();

// User statistics - requires user management permission
router.get('/stats', protect, requirePermission('userManagement'), getUserStats);

// Admin creation route - requires super admin or admin management permission
router.post('/admin', protect, requirePermission('adminManagement'), createAdmin);

// Get all users - requires user management permission
router.get('/', protect, requirePermission('userManagement'), getUsers);

// Get user by ID - users can access their own profile, admins can access any
router.get('/:id', protect, getUserById);

// Update user - users can update their own profile, admins can update any
router.put('/:id', protect, updateUser);

// Delete user - requires user management permission
router.delete('/:id', protect, requirePermission('userManagement'), deleteUser);

export default router;