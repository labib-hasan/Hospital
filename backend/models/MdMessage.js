import db from "../config/db.js";

export default {
  get: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM md_message ORDER BY created_at DESC LIMIT 1");
      return rows[0] || null;
    } catch (error) {
      console.error("Error fetching MD message:", error);
      throw error;
    }
  },

  save: async (messageData) => {
    try {
      const { name, position, title, message } = messageData;
      
      // Check if message exists
      const [existing] = await db.query("SELECT id FROM md_message ORDER BY created_at DESC LIMIT 1");
      
      if (existing.length > 0) {
        // Update existing
        await db.query(
          "UPDATE md_message SET name = ?, position = ?, title = ?, message = ?, updated_at = NOW() WHERE id = ?",
          [name, position, title, message, existing[0].id]
        );
        return existing[0].id;
      } else {
        // Insert new
        const [result] = await db.query(
          "INSERT INTO md_message (name, position, title, message, created_at) VALUES (?, ?, ?, ?, NOW())",
          [name, position, title, message]
        );
        return result.insertId;
      }
    } catch (error) {
      console.error("Error saving MD message:", error);
      throw error;
    }
  },
};

