import db from "../config/db.js";

export default {
  getAll: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM hero_images ORDER BY position ASC");
      return rows;
    } catch (error) {
      console.error("Error fetching hero images:", error);
      throw error;
    }
  },

  create: async (imageData) => {
    try {
      const { url, publicId, position } = imageData;
      const [result] = await db.query(
        "INSERT INTO hero_images (image_url, public_id, position) VALUES (?, ?, ?)",
        [url, publicId || null, position !== undefined ? position : 0]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error creating hero image:", error);
      throw error;
    }
  },

  update: async (id, imageData) => {
    try {
      const { url, publicId, position } = imageData;
      await db.query(
        "UPDATE hero_images SET image_url = ?, public_id = ?, position = ? WHERE id = ?",
        [url, publicId || null, position !== undefined ? position : 0, id]
      );
      return true;
    } catch (error) {
      console.error("Error updating hero image:", error);
      throw error;
    }
  },

  updateByPosition: async (position, imageData) => {
    try {
      const { url, publicId } = imageData;
      // Check if a record exists at this position
      const [existing] = await db.query(
        "SELECT id FROM hero_images WHERE position = ?",
        [position]
      );
      
      if (existing.length > 0) {
        // Update existing record
        await db.query(
          "UPDATE hero_images SET image_url = ?, public_id = ? WHERE position = ?",
          [url, publicId || null, position]
        );
      } else {
        // Insert new record
        await db.query(
          "INSERT INTO hero_images (image_url, public_id, position) VALUES (?, ?, ?)",
          [url, publicId || null, position]
        );
      }
      return true;
    } catch (error) {
      console.error("Error updating hero image by position:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await db.query("DELETE FROM hero_images WHERE id = ?", [id]);
      return true;
    } catch (error) {
      console.error("Error deleting hero image:", error);
      throw error;
    }
  },
};

