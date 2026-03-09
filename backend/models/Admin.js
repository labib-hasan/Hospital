import db from "../config/db.js";

const Admin = {
  // Create admins table if not exists
  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS admins (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('superadmin', 'admin') DEFAULT 'admin',
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY unique_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `;
    try {
      await db.query(sql);
      console.log('✅ Admins table ready');
    } catch (error) {
      console.error('Error creating admins table:', error);
    }
  },

  // Find admin by email
  async findByEmail(email) {
    const sql = 'SELECT * FROM admins WHERE email = ?';
    try {
      const [rows] = await db.query(sql, [email]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding admin by email:', error);
      return null;
    }
  },

  // Find admin by ID
  async findById(id) {
    const sql = 'SELECT id, name, email, role, status, created_at FROM admins WHERE id = ?';
    try {
      const [rows] = await db.query(sql, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding admin by id:', error);
      return null;
    }
  },

  // Create new admin (only superadmin can create admins)
  async create(name, email, password, role = 'admin') {
    const sql = 'INSERT INTO admins (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)';
    try {
      const [result] = await db.query(sql, [name, email, password, role, 'active']);
      return { id: result.insertId, name, email, role, status: 'active' };
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  },

  // Get all admins
  async getAll() {
    const sql = 'SELECT id, name, email, role, status, created_at FROM admins ORDER BY created_at DESC';
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      console.error('Error getting all admins:', error);
      return [];
    }
  },

  // Check if superadmin exists
  async hasSuperadmin() {
    const sql = 'SELECT COUNT(*) as count FROM admins WHERE role = ?';
    try {
      const [rows] = await db.query(sql, ['superadmin']);
      return rows[0].count > 0;
    } catch (error) {
      console.error('Error checking superadmin:', error);
      return false;
    }
  },

  // Get admin count
  async getCount() {
    const sql = 'SELECT role, COUNT(*) as count FROM admins GROUP BY role';
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      console.error('Error getting admin count:', error);
      return [];
    }
  },

  // Update admin
  async update(id, name, email, role, status) {
    const sql = 'UPDATE admins SET name = ?, email = ?, role = ?, status = ? WHERE id = ?';
    try {
      await db.query(sql, [name, email, role, status, id]);
      return true;
    } catch (error) {
      console.error('Error updating admin:', error);
      return false;
    }
  },

  // Update password
  async updatePassword(id, newPassword) {
    const sql = 'UPDATE admins SET password = ? WHERE id = ?';
    try {
      await db.query(sql, [newPassword, id]);
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  },

  // Delete admin
  async delete(id) {
    const sql = 'DELETE FROM admins WHERE id = ?';
    try {
      await db.query(sql, [id]);
      return true;
    } catch (error) {
      console.error('Error deleting admin:', error);
      return false;
    }
  }
};

export default Admin;

