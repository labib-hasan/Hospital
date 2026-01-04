import db from '../config/db.js';

class Doctor {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM doctors ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM doctors WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(doctorData) {
    const { name, specialization, image, description, experience_years, phone, email } = doctorData;
    const [result] = await db.execute(
      'INSERT INTO doctors (name, specialization, image, description, experience_years, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, specialization, image, description, experience_years, phone, email]
    );
    return result.insertId;
  }

  static async update(id, doctorData) {
    const { name, specialization, image, description, experience_years, phone, email } = doctorData;
    const [result] = await db.execute(
      'UPDATE doctors SET name = ?, specialization = ?, image = ?, description = ?, experience_years = ?, phone = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, specialization, image, description, experience_years, phone, email, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM doctors WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default Doctor;
