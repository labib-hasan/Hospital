import db from "../config/db.js";

export default {
  getAll: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM gallery_images ORDER BY id DESC");
      return rows;
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      throw error;
    }
  },

  create: async (imageData) => {
    try {
      const { url, publicId, title } = imageData;
      const [result] = await db.query(
        "INSERT INTO gallery_images (url, public_id, title) VALUES (?, ?, ?)",
        [url, publicId || null, title || null]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error creating gallery image:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await db.query("DELETE FROM gallery_images WHERE id = ?", [id]);
      return true;
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      throw error;
    }
  },
};

