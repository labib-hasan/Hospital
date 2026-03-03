import express from "express";
import { getContact, saveContact } from "../controllers/contactController.js";

const router = express.Router();

// Public routes
router.get("/", getContact);
router.post("/", saveContact);

export default router;

