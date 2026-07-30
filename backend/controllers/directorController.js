import Director, { DIRECTOR_SLUGS } from "../models/Director.js";

const isValidDirector = (slug) => DIRECTOR_SLUGS.has(slug);

export const getDirector = async (req, res) => {
  const { slug } = req.params;

  if (!isValidDirector(slug)) {
    return res.status(404).json({ success: false, message: "Director profile not found" });
  }

  try {
    const director = await Director.get(slug);
    return res.json({ success: true, director });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const saveDirector = async (req, res) => {
  const { slug } = req.params;

  if (!isValidDirector(slug)) {
    return res.status(404).json({ success: false, message: "Director profile not found" });
  }

  try {
    const director = await Director.save(slug, req.body || {});
    return res.status(201).json({ success: true, director });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const saveDirectorImage = async (req, res) => {
  const { slug } = req.params;

  if (!isValidDirector(slug)) {
    return res.status(404).json({ success: false, message: "Director profile not found" });
  }

  if (!req.body?.url) {
    return res.status(400).json({ success: false, message: "Image URL is required" });
  }

  try {
    const director = await Director.saveImage(slug, req.body);
    return res.status(201).json({ success: true, director });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
