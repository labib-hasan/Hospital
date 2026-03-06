import HeroImage from "../models/HeroImage.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dd20ni4kl",
  api_key: process.env.CLOUDINARY_API_KEY || "614819924383186",
  api_secret: process.env.CLOUDINARY_API_SECRET || "13F7yur_2VWTVWGifuHWejsZQdk",
});

export const getAllHeroImages = async (req, res) => {
  try {
    const images = await HeroImage.getAll();
    res.json({ success: true, images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createHeroImage = async (req, res) => {
  try {
    const { url, publicId, position } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        message: "Image URL is required" 
      });
    }

    const imageId = await HeroImage.create({ url, publicId, position });
    res.status(201).json({ 
      success: true, 
      message: "Image added successfully", 
      imageId 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHeroImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, publicId, position } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        message: "Image URL is required" 
      });
    }

    await HeroImage.update(id, { url, publicId, position });
    res.json({ success: true, message: "Image updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHeroImageByPosition = async (req, res) => {
  try {
    const { position } = req.body;
    const { url, publicId } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        message: "Image URL is required" 
      });
    }

    if (position === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Position is required" 
      });
    }

    await HeroImage.updateByPosition(position, { url, publicId });
    res.json({ success: true, message: "Image updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHeroImage = async (req, res) => {
  try {
    const { id } = req.params;

    // First get the image to find the public_id for cloudinary deletion
    const images = await HeroImage.getAll();
    const imageToDelete = images.find(img => img.id === parseInt(id));

    if (imageToDelete && imageToDelete.public_id) {
      // Delete from Cloudinary
      try {
        await cloudinary.uploader.destroy(imageToDelete.public_id);
        console.log("Image deleted from Cloudinary:", imageToDelete.public_id);
      } catch (cloudinaryError) {
        console.error("Error deleting from Cloudinary:", cloudinaryError);
        // Continue with database deletion even if cloudinary fails
      }
    }

    // Delete from database
    await HeroImage.delete(id);
    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

