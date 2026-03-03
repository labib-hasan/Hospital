import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const contactData = req.body;
    
    const filePath = path.join(process.cwd(), "data", "contact.json");
    
    // Ensure the data directory exists
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Add timestamp
    contactData.updatedAt = new Date().toISOString();
    
    fs.writeFileSync(filePath, JSON.stringify(contactData, null, 2));
    
    return res.status(200).json({ 
      success: true, 
      message: "Contact saved successfully", 
      data: contactData 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error saving contact", error: error.message });
  }
}
