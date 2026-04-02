// backend/models/PageImage.js
import db from "../config/db.js";

class PageImage {
  // Get active image for a specific page
  static async getActiveImage(pageType, pageId) {
    const [rows] = await db.execute(
      `SELECT * FROM page_images 
       WHERE page_type = ? AND page_id = ? AND is_active = 1 
       ORDER BY display_order ASC, created_at DESC LIMIT 1`,
      [pageType, pageId]
    );
    return rows[0] || null;
  }

  // Get all images for a page
  static async getPageImages(pageType, pageId) {
    const [rows] = await db.execute(
      'SELECT * FROM page_images WHERE page_type = ? AND page_id = ? ORDER BY created_at DESC',
      [pageType, pageId]
    );
    return rows;
  }

  // Add new image (deactivates previous ones)
  static async addImage(pageType, pageId, imageUrl, publicId = null, title = null, altText = null, uploadedBy = null) {
    // First, deactivate all existing images for this page
    await db.execute(
      'UPDATE page_images SET is_active = 0 WHERE page_type = ? AND page_id = ?',
      [pageType, pageId]
    );
    
    // Insert new image as active
    const [result] = await db.execute(
      `INSERT INTO page_images 
       (page_type, page_id, image_url, public_id, title, alt_text, uploaded_by, is_active, display_order) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0)`,
      [pageType, pageId, imageUrl, publicId, title, altText, uploadedBy]
    );
    
    return result.insertId;
  }

  // Update image details
  static async updateImage(imageId, updates) {
    const fields = [];
    const values = [];
    
    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.alt_text !== undefined) {
      fields.push('alt_text = ?');
      values.push(updates.alt_text);
    }
    if (updates.display_order !== undefined) {
      fields.push('display_order = ?');
      values.push(updates.display_order);
    }
    if (updates.is_active !== undefined) {
      fields.push('is_active = ?');
      values.push(updates.is_active);
    }
    
    if (fields.length === 0) return false;
    
    values.push(imageId);
    const [result] = await db.execute(
      `UPDATE page_images SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return result.affectedRows > 0;
  }

  // Delete image
  static async deleteImage(imageId) {
    const [result] = await db.execute('DELETE FROM page_images WHERE id = ?', [imageId]);
    return result.affectedRows > 0;
  }

  // Get images by type
  static async getImagesByType(pageType, onlyActive = false) {
    let query = `SELECT * FROM page_images WHERE page_type = ?`;
    const params = [pageType];
    
    if (onlyActive) {
      query += ` AND is_active = 1`;
    }
    
    query += ` ORDER BY page_id, display_order ASC, created_at DESC`;
    
    const [rows] = await db.execute(query, params);
    
    // Group by page_id
    const grouped = {};
    rows.forEach(row => {
      if (!grouped[row.page_id]) {
        grouped[row.page_id] = [];
      }
      grouped[row.page_id].push(row);
    });
    
    return grouped;
  }
}

export default PageImage;