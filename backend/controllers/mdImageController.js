import MdImage from "../models/MdImage.js";

export const getMdImage = async (req, res) => {
  try {
    const image = await MdImage.get();
    res.json({ success: true, image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveMdImage = async (req, res) => {
  try {
    const imageData = req.body;
    
    if (!imageData || !imageData.url) {
      return res.status(400).json({ 
        success: false, 
        message: "Image URL is required" 
      });
    }

    const imageId = await MdImage.save(imageData);
    res.status(201).json({ 
      success: true, 
      message: "Image saved successfully", 
      imageId 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

