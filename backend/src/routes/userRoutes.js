import express from 'express';
import { createAdmin, getUsers } from '../controllers/userController.js';
import { protect, requirePermission } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin creation route - requires super admin or admin management permission
router.post('/admin', protect, requirePermission('adminManagement'), createAdmin);

// Get all users - requires user management permission
router.get('/', protect, requirePermission('userManagement'), getUsers);

export default router;