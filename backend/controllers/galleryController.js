import GalleryImage from "../models/GalleryImage.js";

export const getAllGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.getAll();
    res.json({ success: true, images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryImage = async (req, res) => {
  try {
    const { url, publicId, title } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        message: "Image URL is required" 
      });
    }

    const imageId = await GalleryImage.create({ url, publicId, title });
    res.status(201).json({ 
      success: true, 
      message: "Image added successfully", 
      imageId 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    await GalleryImage.delete(id);
    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

