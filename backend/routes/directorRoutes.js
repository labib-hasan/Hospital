import express from "express";
import { getDirector, saveDirector, saveDirectorImage } from "../controllers/directorController.js";

const router = express.Router();

router.get("/:slug", getDirector);
router.post("/:slug", saveDirector);
router.post("/:slug/image", saveDirectorImage);

export default router;
