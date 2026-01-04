import express from 'express';
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getDepartments);
router.get('/:id', getDepartmentById);

// Protected routes (require authentication)
router.post('/', authenticateToken, createDepartment);
router.put('/:id', authenticateToken, updateDepartment);
router.delete('/:id', authenticateToken, deleteDepartment);

export default router;
