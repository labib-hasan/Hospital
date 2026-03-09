import express from 'express';
import {
  getSpecialities,
  getSpecialityById,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality
} from '../controllers/specialityController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getSpecialities);
router.get('/:id', getSpecialityById);

// Protected routes (require authentication)
router.post('/', authenticateToken, createSpeciality);
router.put('/:id', authenticateToken, updateSpeciality);
router.delete('/:id', authenticateToken, deleteSpeciality);

export default router;

