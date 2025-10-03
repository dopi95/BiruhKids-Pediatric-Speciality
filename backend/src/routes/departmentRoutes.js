import express from 'express';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  addService,
  updateService,
  deleteService
} from '../controllers/departmentController.js';
import { protect, requirePermission } from '../middleware/authMiddleware.js';
import auditMiddleware from '../middleware/auditMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getDepartments);

// Protected admin routes
router.post('/', protect, requirePermission('serviceManagement'), auditMiddleware('CREATE', 'Department'), createDepartment);
router.put('/:id', protect, requirePermission('serviceManagement'), auditMiddleware('UPDATE', 'Department'), updateDepartment);
router.delete('/:id', protect, requirePermission('serviceManagement'), auditMiddleware('DELETE', 'Department'), deleteDepartment);

// Service routes
router.post('/:id/services', protect, requirePermission('serviceManagement'), auditMiddleware('CREATE', 'Service'), addService);
router.put('/:id/services/:serviceId', protect, requirePermission('serviceManagement'), auditMiddleware('UPDATE', 'Service'), updateService);
router.delete('/:id/services/:serviceId', protect, requirePermission('serviceManagement'), auditMiddleware('DELETE', 'Service'), deleteService);

export default router;