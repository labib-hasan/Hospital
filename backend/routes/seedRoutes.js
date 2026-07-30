import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// SEED DEPARTMENTS - Call once: GET /api/seed/seed-departments
router.get('/seed-departments', async (req, res) => {
  try {
    // Create departments table if missing
    await db.execute(`
      CREATE TABLE IF NOT EXISTS departments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name_bn VARCHAR(255) DEFAULT NULL,
        description TEXT DEFAULT NULL,
        description_bn TEXT DEFAULT NULL,
        image VARCHAR(500) DEFAULT NULL,
        head_doctor VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Check if seeded
    const [count] = await db.execute('SELECT COUNT(*) as count FROM departments');
    if (count[0].count > 0) {
      return res.json({ 
        success: true, 
        message: '✅ Departments already seeded',
        count: count[0].count 
      });
    }

    // Insert hardcoded departments (matching frontend)
    const departments = [
      ['Medicine', 'medicine', 'মেডিসিন', 'Comprehensive Internal Medicine Healthcare Services', null],
      ['Cardiology', 'cardiology', 'কার্ডিওলজি', 'Comprehensive Heart Care Services', null],
      ['Neuro Medicine', 'neuro-medicine', 'নিউরো মেডিসিন', 'Advanced Neurological Care & Treatment', null],
      ['Gastroenterology', 'gastroenterology', 'গ্যাস্ট্রোএন্টারোলজি', 'Advanced Digestive & Liver Care', null],
      ['ENT', 'ent', 'ENT', 'Ear, Nose, Throat & Head-Neck Surgery', null],
      ['Gynecology & Obstetrics', 'gynee-obs', 'গাইনি ও প্রসূতি', "Complete Women's Healthcare", null],
      ['Nephrology', 'nephrology', 'নেফ্রোলজি', 'Comprehensive Kidney Care', null],
      ['Orthopedics', 'orthopedics', 'অর্থোপেডিক্স', 'Bone, Joint & Trauma Care', null],
      ['Oncology', 'oncology', 'অনকোলজি', 'Comprehensive Cancer Care', null],
      ['Psychiatry', 'psychiatry', 'সাইকিয়াট্রি', 'Mental Health & Behavioral Sciences', null]
    ];

    for (const dept of departments) {
      await db.execute(
        'INSERT IGNORE INTO departments (name, slug, name_bn, description, head_doctor) VALUES (?, ?, ?, ?, ?)',
        dept
      );
    }

    const [finalCount] = await db.execute('SELECT COUNT(*) as count FROM departments');
    res.json({ 
      success: true, 
      message: `✅ ${finalCount[0].count} departments seeded`,
      departments 
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

