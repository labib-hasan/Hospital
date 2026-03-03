import db from "../config/db.js";

export default {
  getAll: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM news ORDER BY created_at DESC");
      return rows;
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query("SELECT * FROM news WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching news by id:", error);
      throw error;
    }
  },

  create: async (newsData) => {
    try {
      const { title, content, image } = newsData;
      const [result] = await db.query(
        "INSERT INTO news (title, content, image, created_at) VALUES (?, ?, ?, NOW())",
        [title, content, image || null]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error creating news:", error);
      throw error;
    }
  },

  update: async (id, newsData) => {
    try {
      const { title, content, image } = newsData;
      await db.query(
        "UPDATE news SET title = ?, content = ?, image = ? WHERE id = ?",
        [title, content, image || null, id]
      );
      return true;
    } catch (error) {
      console.error("Error updating news:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await db.query("DELETE FROM news WHERE id = ?", [id]);
      return true;
    } catch (error) {
      console.error("Error deleting news:", error);
      throw error;
    }
  },
};
