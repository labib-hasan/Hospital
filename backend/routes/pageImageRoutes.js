// backend/routes/pageImageRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  uploadPageImage,
  getPageImages,
  setActiveImage,
  updateImageDetails,
  deletePageImage
} from '../controllers/pageImageController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'page-image-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

// Protected routes (admin/coordinator only)
router.post(
  '/upload',
  protect,
  authorize('admin', 'coordinator'),
  upload.single('image'),
  uploadPageImage
);

router.get('/:pageType/:pageId', protect, authorize('admin', 'coordinator'), getPageImages);
router.put('/set-active', protect, authorize('admin', 'coordinator'), setActiveImage);
router.put('/:imageId', protect, authorize('admin', 'coordinator'), updateImageDetails);
router.delete('/:imageId', protect, authorize('admin', 'coordinator'), deletePageImage);

export default router;