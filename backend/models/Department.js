// backend/models/Department.js
import db from '../config/db.js';
import PageImage from './PageImage.js';

class Department {
  static async findAll(onlyActive = true) {
    let query = 'SELECT * FROM departments';
    if (onlyActive) {
      query += ' WHERE is_active = 1';
    }
    query += ' ORDER BY `order` ASC, created_at DESC';
    
    const [rows] = await db.execute(query);
    
    // Get cover images for each department
    const departmentsWithImages = await Promise.all(
      rows.map(async (dept) => {
        const coverImage = await PageImage.getActiveImage('department', dept.slug);
        return {
          ...dept,
          cover_image: coverImage?.image_url || dept.cover_image,
          cover_image_data: coverImage
        };
      })
    );
    
    return departmentsWithImages;
  }

  static async findBySlug(slug) {
    const [rows] = await db.execute(
      'SELECT * FROM departments WHERE slug = ? AND is_active = 1',
      [slug]
    );
    
    if (rows.length === 0) return null;
    
    const department = rows[0];
    const coverImage = await PageImage.getActiveImage('department', slug);
    const allImages = await PageImage.getPageImages('department', slug);
    
    return {
      ...department,
      cover_image: coverImage?.image_url || department.cover_image,
      cover_image_data: coverImage,
      all_images: allImages
    };
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM departments WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return rows[0];
  }

  static async updateCoverImage(slug, imageUrl, publicId = null, uploadedBy = null) {
    // Deactivate all existing cover images for this department
    await db.execute(
      'UPDATE page_images SET is_active = 0 WHERE page_type = ? AND page_id = ?',
      ['department', slug]
    );
    
    // Add new cover image
    const [result] = await db.execute(
      `INSERT INTO page_images 
       (page_type, page_id, image_url, public_id, uploaded_by, is_active) 
       VALUES (?, ?, ?, ?, ?, 1)`,
      ['department', slug, imageUrl, publicId, uploadedBy]
    );
    
    // Update department's cover_image field for backward compatibility
    await db.execute(
      'UPDATE departments SET cover_image = ? WHERE slug = ?',
      [imageUrl, slug]
    );
    
    return result.insertId;
  }

  static async create(departmentData) {
    const {
      slug, name, name_bn, description, description_bn,
      intro_en, intro_bn, services_en, services_bn,
      facilities_en, facilities_bn, order_num = 0
    } = departmentData;
    
    const [result] = await db.execute(
      `INSERT INTO departments 
      (slug, name, name_bn, description, description_bn, intro_en, intro_bn, 
       services_en, services_bn, facilities_en, facilities_bn, \`order\`) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug, name, name_bn, description, description_bn,
        intro_en, intro_bn,
        JSON.stringify(services_en || []),
        JSON.stringify(services_bn || []),
        JSON.stringify(facilities_en || []),
        JSON.stringify(facilities_bn || []),
        order_num
      ]
    );
    
    return result.insertId;
  }

  static async update(id, departmentData) {
    const {
      name, name_bn, description, description_bn,
      intro_en, intro_bn, services_en, services_bn,
      facilities_en, facilities_bn, is_active, order_num
    } = departmentData;
    
    const [result] = await db.execute(
      `UPDATE departments SET 
        name = ?, name_bn = ?, description = ?, description_bn = ?,
        intro_en = ?, intro_bn = ?, services_en = ?, services_bn = ?,
        facilities_en = ?, facilities_bn = ?, is_active = ?, \`order\` = ?
      WHERE id = ?`,
      [
        name, name_bn, description, description_bn,
        intro_en, intro_bn,
        JSON.stringify(services_en || []),
        JSON.stringify(services_bn || []),
        JSON.stringify(facilities_en || []),
        JSON.stringify(facilities_bn || []),
        is_active, order_num, id
      ]
    );
    
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM departments WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default Department;