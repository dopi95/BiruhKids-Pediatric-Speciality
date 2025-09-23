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

const router = express.Router();

// Department routes
router.get('/', getDepartments);
router.post('/', createDepartment);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

// Service routes
router.post('/:id/services', addService);
router.put('/:id/services/:serviceId', updateService);
router.delete('/:id/services/:serviceId', deleteService);

export default router;