import db from '../config/db.js';

class Diagnostic {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM diagnostics ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM diagnostics WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(diagnosticData) {
    const { name, name_bn, description, description_bn, image } = diagnosticData;
    const [result] = await db.execute(
      'INSERT INTO diagnostics (name, name_bn, description, description_bn, image) VALUES (?, ?, ?, ?, ?)',
      [name, name_bn, description, description_bn, image]
    );
    return result.insertId;
  }

  static async update(id, diagnosticData) {
    const { name, name_bn, description, description_bn, image } = diagnosticData;
    const [result] = await db.execute(
      'UPDATE diagnostics SET name = ?, name_bn = ?, description = ?, description_bn = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, name_bn, description, description_bn, image, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM diagnostics WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default Diagnostic;

