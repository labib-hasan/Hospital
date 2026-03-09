import db from '../config/db.js';

class PageImage {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM page_images ORDER BY page_name ASC');
    return rows;
  }

  static async findByPageName(pageName) {
    const [rows] = await db.execute('SELECT * FROM page_images WHERE page_name = ?', [pageName]);
    return rows[0];
  }

  static async upsert(pageName, imageUrl) {
    const existing = await this.findByPageName(pageName);
    if (existing) {
      const [result] = await db.execute('UPDATE page_images SET image_url = ? WHERE page_name = ?', [imageUrl, pageName]);
      return result.affectedRows > 0;
    } else {
      const [result] = await db.execute('INSERT INTO page_images (page_name, image_url) VALUES (?, ?)', [pageName, imageUrl]);
      return result.insertId;
    }
  }

  static async createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS page_images (id INT AUTO_INCREMENT PRIMARY KEY, page_name VARCHAR(100) UNIQUE, image_url TEXT)`;
    try { await db.query(sql); } catch (e) { console.error(e); }
  }
}
export default PageImage;
