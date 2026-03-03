import express from "express";
import { getMdImage, saveMdImage } from "../controllers/mdImageController.js";

const router = express.Router();

// Public routes
router.get("/", getMdImage);
router.post("/", saveMdImage);

export default router;

