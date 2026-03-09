import db from '../config/db.js';

class Speciality {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM specialities ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM specialities WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(specialityData) {
    const { name, name_bn, description, description_bn, image } = specialityData;
    const [result] = await db.execute(
      'INSERT INTO specialities (name, name_bn, description, description_bn, image) VALUES (?, ?, ?, ?, ?)',
      [name, name_bn, description, description_bn, image]
    );
    return result.insertId;
  }

  static async update(id, specialityData) {
    const { name, name_bn, description, description_bn, image } = specialityData;
    const [result] = await db.execute(
      'UPDATE specialities SET name = ?, name_bn = ?, description = ?, description_bn = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, name_bn, description, description_bn, image, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM specialities WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default Speciality;

