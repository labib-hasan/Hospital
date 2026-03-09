import express from 'express';
import {
  getDiagnostics,
  getDiagnosticById,
  createDiagnostic,
  updateDiagnostic,
  deleteDiagnostic
} from '../controllers/diagnosticController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getDiagnostics);
router.get('/:id', getDiagnosticById);

// Protected routes (require authentication)
router.post('/', authenticateToken, createDiagnostic);
router.put('/:id', authenticateToken, updateDiagnostic);
router.delete('/:id', authenticateToken, deleteDiagnostic);

export default router;

