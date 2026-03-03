import Contact from "../models/Contact.js";

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.get();
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveContact = async (req, res) => {
  try {
    const contactData = req.body;
    
    if (!contactData) {
      return res.status(400).json({ 
        success: false, 
        message: "Contact data is required" 
      });
    }

    const contactId = await Contact.save(contactData);
    res.status(201).json({ 
      success: true, 
      message: "Contact saved successfully", 
      contactId 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

