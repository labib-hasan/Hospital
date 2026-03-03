import express from "express";
import { getMdMessage, saveMdMessage } from "../controllers/mdMessageController.js";

const router = express.Router();

// Public routes
router.get("/", getMdMessage);
router.post("/", saveMdMessage);

export default router;

