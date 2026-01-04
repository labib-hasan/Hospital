import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/services - Get all services (public)
router.get('/', getAllServices);

// GET /api/services/:id - Get service by ID (public)
router.get('/:id', getServiceById);

// POST /api/services - Create new service (requires authentication)
router.post('/', authenticateToken, createService);

// PUT /api/services/:id - Update service (requires authentication)
router.put('/:id', authenticateToken, updateService);

// DELETE /api/services/:id - Delete service (requires authentication)
router.delete('/:id', authenticateToken, deleteService);

export default router;
