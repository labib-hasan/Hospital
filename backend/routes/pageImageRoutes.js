import express from 'express';
import PageImage from '../models/PageImage.js';

const router = express.Router();

// Initialize table on server start
PageImage.createTable().then(() => {
  console.log('Page images table initialized');
});

// Get all page images
router.get('/', async (req, res) => {
  try {
    const images = await PageImage.findAll();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single page image
router.get('/:pageName', async (req, res) => {
  try {
    const image = await PageImage.findByPageName(req.params.pageName);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save/update page image
router.post('/', async (req, res) => {
  try {
    const { pageName, imageUrl } = req.body;
    if (!pageName || !imageUrl) {
      return res.status(400).json({ message: 'pageName and imageUrl are required' });
    }
    await PageImage.upsert(pageName, imageUrl);
    res.json({ success: true, message: 'Image saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
