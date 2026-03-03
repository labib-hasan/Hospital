import express from "express";
import { getAllGalleryImages, createGalleryImage, deleteGalleryImage } from "../controllers/galleryController.js";

const router = express.Router();

// Public routes
router.get("/", getAllGalleryImages);

// Protected routes
router.post("/", createGalleryImage);
router.delete("/:id", deleteGalleryImage);

export default router;

