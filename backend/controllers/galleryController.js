import GalleryImage from "../models/GalleryImage.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dd20ni4kl",
  api_key: process.env.CLOUDINARY_API_KEY || "614819924383186",
  api_secret: process.env.CLOUDINARY_API_SECRET || "13F7yur_2VWTVWGifuHWejsZQdk",
});

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

    // First get the image to find the public_id for cloudinary deletion
    const images = await GalleryImage.getAll();
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
    await GalleryImage.delete(id);
    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

