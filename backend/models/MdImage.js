import db from "../config/db.js";

export default {
  get: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM md_image ORDER BY id DESC LIMIT 1");
      return rows[0] || null;
    } catch (error) {
      console.error("Error fetching MD image:", error);
      throw error;
    }
  },

  save: async (imageData) => {
    try {
      const { url, publicId } = imageData;
      
      // Check if image exists
      const [existing] = await db.query("SELECT id FROM md_image ORDER BY id DESC LIMIT 1");
      
      if (existing.length > 0) {
        // Update existing
        await db.query(
          "UPDATE md_image SET url = ?, public_id = ? WHERE id = ?",
          [url, publicId || null, existing[0].id]
        );
        return existing[0].id;
      } else {
        // Insert new
        const [result] = await db.query(
          "INSERT INTO md_image (url, public_id) VALUES (?, ?)",
          [url, publicId || null]
        );
        return result.insertId;
      }
    } catch (error) {
      console.error("Error saving MD image:", error);
      throw error;
    }
  },
};

