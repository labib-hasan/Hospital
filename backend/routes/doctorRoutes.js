import express from 'express';
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorsBySpecialization
} from '../controllers/doctorController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDoctors);
router.get('/specialization/:specialization', getDoctorsBySpecialization);
router.get('/:id', getDoctorById);

// Routes without authentication for demo purposes
router.post('/', createDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;
