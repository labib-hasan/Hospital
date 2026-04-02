// backend/controllers/pageImageController.js
import PageImage from '../models/PageImage.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image for a page
export const uploadPageImage = async (req, res) => {
  try {
    const { pageType, pageId, title, altText } = req.body;
    const file = req.file;

    if (!pageType || !pageId || !file) {
      return res.status(400).json({ error: 'Page type, page ID, and image are required' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `hospital/${pageType}s`,
      transformation: [
        { width: 1200, height: 600, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    // Delete temp file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Save to database
    const uploadedBy = req.user?.email || req.user?.username || 'admin';
    const imageId = await PageImage.addImage(
      pageType, pageId, result.secure_url, result.public_id,
      title, altText, uploadedBy
    );

    // If this is the first image, make it active
    const existingImages = await PageImage.getPageImages(pageType, pageId);
    if (existingImages.length === 1) {
      await PageImage.setActiveImage(imageId, pageType, pageId);
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageId: imageId,
      imageUrl: result.secure_url
    });
  } catch (error) {
    console.error('Upload error:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to upload image: ' + error.message });
  }
};

// Get images for a page
export const getPageImages = async (req, res) => {
  try {
    const { pageType, pageId } = req.params;
    const { onlyActive } = req.query;
    
    const images = await PageImage.getPageImages(
      pageType, pageId, onlyActive === 'true'
    );
    
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

// Set active image
export const setActiveImage = async (req, res) => {
  try {
    const { imageId, pageType, pageId } = req.body;
    
    await PageImage.setActiveImage(imageId, pageType, pageId);
    
    res.json({
      success: true,
      message: 'Active image updated successfully'
    });
  } catch (error) {
    console.error('Error setting active image:', error);
    res.status(500).json({ error: 'Failed to set active image' });
  }
};

// Update image details
export const updateImageDetails = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { title, altText, displayOrder } = req.body;
    
    const updated = await PageImage.updateImage(imageId, {
      title, alt_text: altText, display_order: displayOrder
    });
    
    if (!updated) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    res.json({
      success: true,
      message: 'Image updated successfully'
    });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ error: 'Failed to update image' });
  }
};

// Delete image
export const deletePageImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    
    // Get image info before deleting
    const images = await db.execute('SELECT * FROM page_images WHERE id = ?', [imageId]);
    const image = images[0]?.[0];
    
    if (image && image.public_id) {
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(image.public_id);
    }
    
    const deleted = await PageImage.deleteImage(imageId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};