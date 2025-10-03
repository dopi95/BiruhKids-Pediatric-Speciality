import express from 'express';
import { createAdmin, getUsers, getPatients, getUserById, updateUser, deleteUser, getUserStats } from '../controllers/userController.js';
import { protect, requirePermission } from '../middleware/authMiddleware.js';
import auditMiddleware from '../middleware/auditMiddleware.js';

const router = express.Router();

// User statistics - requires user management permission
router.get('/stats', protect, requirePermission('userManagement'), getUserStats);

// Get patients only - requires result management permission
router.get('/patients', protect, requirePermission('resultManagement'), getPatients);

// Admin creation route - requires super admin or admin management permission
router.post('/admin', protect, requirePermission('adminManagement'), auditMiddleware('CREATE', 'Admin'), createAdmin);

// Get all users - requires user management permission
router.get('/', protect, requirePermission('userManagement'), getUsers);

// Get user by ID - users can access their own profile, admins can access any
router.get('/:id', protect, getUserById);

// Update user - users can update their own profile, admins can update any
router.put('/:id', protect, auditMiddleware('UPDATE', 'User'), updateUser);

// Delete user - requires user management permission
router.delete('/:id', protect, requirePermission('userManagement'), auditMiddleware('DELETE', 'User'), deleteUser);

export default router;