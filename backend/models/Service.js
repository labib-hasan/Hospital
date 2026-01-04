import db from '../config/db.js';

export default {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM services ORDER BY created_at DESC');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const { title, description, image, icon } = data;

    const [result] = await db.query(
      'INSERT INTO services (title, description, image, icon) VALUES (?, ?, ?, ?)',
      [title, description, image, icon]
    );

    return result.insertId;
  },

  async update(id, data) {
    const { title, description, image, icon } = data;

    const [result] = await db.query(
      'UPDATE services SET title = ?, description = ?, image = ?, icon = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description, image, icon, id]
    );

    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM services WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};
