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
import auditMiddleware from '../middleware/auditMiddleware.js';

const router = express.Router();

// Department routes
router.get('/', getDepartments);
router.post('/', auditMiddleware('CREATE', 'Department'), createDepartment);
router.put('/:id', auditMiddleware('UPDATE', 'Department'), updateDepartment);
router.delete('/:id', auditMiddleware('DELETE', 'Department'), deleteDepartment);

// Service routes
router.post('/:id/services', auditMiddleware('CREATE', 'Service'), addService);
router.put('/:id/services/:serviceId', auditMiddleware('UPDATE', 'Service'), updateService);
router.delete('/:id/services/:serviceId', auditMiddleware('DELETE', 'Service'), deleteService);

export default router;