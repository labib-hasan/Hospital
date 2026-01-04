import db from '../config/db.js';

class Department {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM departments ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM departments WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(departmentData) {
    const { name, description, image, head_doctor } = departmentData;
    const [result] = await db.execute(
      'INSERT INTO departments (name, description, image, head_doctor) VALUES (?, ?, ?, ?)',
      [name, description, image, head_doctor]
    );
    return result.insertId;
  }

  static async update(id, departmentData) {
    const { name, description, image, head_doctor } = departmentData;
    const [result] = await db.execute(
      'UPDATE departments SET name = ?, description = ?, image = ?, head_doctor = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, description, image, head_doctor, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM departments WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default Department;
