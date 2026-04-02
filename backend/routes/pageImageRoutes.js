// backend/routes/pageImageRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import PageImage from "../models/PageImage.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "page-image-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpeg, jpg, png, gif, webp)"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

// ==============================
// PUBLIC ROUTES (No authentication)
// ==============================

// Get active image for a page
router.get("/:pageType/:pageId/active", async (req, res) => {
  try {
    const { pageType, pageId } = req.params;
    
    const image = await PageImage.getActiveImage(pageType, pageId);
    
    if (!image) {
      return res.status(404).json({ error: "No active image found" });
    }
    
    res.json({
      success: true,
      id: image.id,
      image_url: image.image_url,
      title: image.title,
      alt_text: image.alt_text,
      page_type: image.page_type,
      page_id: image.page_id
    });
  } catch (error) {
    console.error("Error fetching active image:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

// Get all images for a page
router.get("/:pageType/:pageId", async (req, res) => {
  try {
    const { pageType, pageId } = req.params;
    
    const images = await PageImage.getPageImages(pageType, pageId);
    
    res.json({
      success: true,
      images: images
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// ==============================
// PROTECTED ROUTES (Admin/Coordinator only)
// ==============================

// Upload new cover image
router.post(
  "/upload",
  protect,
  authorize("admin", "coordinator"),
  upload.single("image"),
  async (req, res) => {
    try {
      const { pageType, pageId, title, altText } = req.body;
      const file = req.file;

      if (!pageType || !pageId || !file) {
        return res.status(400).json({ error: "Page type, page ID, and image are required" });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `hospital/${pageType}s`,
        transformation: [
          { width: 1200, height: 600, crop: "fill" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ]
      });

      // Delete temp file
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      // Save to database
      const uploadedBy = req.user?.email || req.user?.username || "admin";
      const imageId = await PageImage.addImage(
        pageType, pageId, result.secure_url, result.public_id,
        title, altText, uploadedBy
      );

      res.json({
        success: true,
        message: "Image uploaded successfully",
        imageId: imageId,
        imageUrl: result.secure_url
      });
    } catch (error) {
      console.error("Upload error:", error);
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: "Failed to upload image: " + error.message });
    }
  }
);

// Update image details
router.put(
  "/:imageId",
  protect,
  authorize("admin", "coordinator"),
  async (req, res) => {
    try {
      const { imageId } = req.params;
      const { title, altText, displayOrder, isActive } = req.body;
      
      const updated = await PageImage.updateImage(imageId, {
        title,
        alt_text: altText,
        display_order: displayOrder,
        is_active: isActive
      });
      
      if (!updated) {
        return res.status(404).json({ error: "Image not found" });
      }
      
      res.json({
        success: true,
        message: "Image updated successfully"
      });
    } catch (error) {
      console.error("Error updating image:", error);
      res.status(500).json({ error: "Failed to update image" });
    }
  }
);

// Delete image
router.delete(
  "/:imageId",
  protect,
  authorize("admin", "coordinator"),
  async (req, res) => {
    try {
      const { imageId } = req.params;
      
      // Get image info before deleting
      const [images] = await db.execute("SELECT * FROM page_images WHERE id = ?", [imageId]);
      const image = images[0];
      
      if (image && image.public_id) {
        // Delete from Cloudinary
        await cloudinary.uploader.destroy(image.public_id);
      }
      
      const deleted = await PageImage.deleteImage(imageId);
      
      if (!deleted) {
        return res.status(404).json({ error: "Image not found" });
      }
      
      res.json({
        success: true,
        message: "Image deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  }
);

export default router;