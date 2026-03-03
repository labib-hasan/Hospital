import MdMessage from "../models/MdMessage.js";

export const getMdMessage = async (req, res) => {
  try {
    const message = await MdMessage.get();
    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveMdMessage = async (req, res) => {
  try {
    const messageData = req.body;
    
    if (!messageData) {
      return res.status(400).json({ 
        success: false, 
        message: "Message data is required" 
      });
    }

    const messageId = await MdMessage.save(messageData);
    res.status(201).json({ 
      success: true, 
      message: "Message saved successfully", 
      messageId 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

