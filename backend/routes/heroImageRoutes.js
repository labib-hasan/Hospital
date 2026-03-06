import express from "express";
import { getAllHeroImages, createHeroImage, updateHeroImage, updateHeroImageByPosition, deleteHeroImage } from "../controllers/heroImageController.js";

const router = express.Router();

// Public routes
router.get("/", getAllHeroImages);

// Protected routes
router.post("/", createHeroImage);
router.put("/by-position", updateHeroImageByPosition);
router.put("/:id", updateHeroImage);
router.delete("/:id", deleteHeroImage);

export default router;

