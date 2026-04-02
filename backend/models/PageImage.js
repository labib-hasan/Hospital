// backend/models/PageImage.js
import db from '../config/db.js';

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

  // Get all images for a specific page
  static async getPageImages(pageType, pageId, onlyActive = false) {
    let query = `SELECT * FROM page_images WHERE page_type = ? AND page_id = ?`;
    const params = [pageType, pageId];
    
    if (onlyActive) {
      query += ` AND is_active = 1`;
    }
    
    query += ` ORDER BY display_order ASC, created_at DESC`;
    
    const [rows] = await db.execute(query, params);
    return rows;
  }

  // Add new image for a page
  static async addImage(pageType, pageId, imageUrl, publicId = null, title = null, altText = null, uploadedBy = null) {
    const [result] = await db.execute(
      `INSERT INTO page_images 
       (page_type, page_id, image_url, public_id, title, alt_text, uploaded_by, is_active, display_order) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pageType, pageId, imageUrl, publicId, title, altText, 
        uploadedBy, true, 0
      ]
    );
    return result.insertId;
  }

  // Set image as active (deactivate others for the same page)
  static async setActiveImage(imageId, pageType, pageId) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Deactivate all images for this page
      await connection.execute(
        'UPDATE page_images SET is_active = 0 WHERE page_type = ? AND page_id = ?',
        [pageType, pageId]
      );
      
      // Activate the selected image
      await connection.execute(
        'UPDATE page_images SET is_active = 1 WHERE id = ?',
        [imageId]
      );
      
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
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

  // Get images by type (all departments, all specialities, etc.)
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

  // Bulk upload images for multiple pages
  static async bulkAddImages(images) {
    if (!images || images.length === 0) return [];
    
    const connection = await db.getConnection();
    const insertedIds = [];
    
    try {
      await connection.beginTransaction();
      
      for (const image of images) {
        const [result] = await connection.execute(
          `INSERT INTO page_images 
           (page_type, page_id, image_url, public_id, title, alt_text, uploaded_by, is_active, display_order) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            image.page_type, image.page_id, image.image_url, image.public_id,
            image.title, image.alt_text, image.uploaded_by, 
            image.is_active || false, image.display_order || 0
          ]
        );
        insertedIds.push(result.insertId);
      }
      
      await connection.commit();
      return insertedIds;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default PageImage;