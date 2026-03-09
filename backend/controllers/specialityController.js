import db from '../config/db.js';

export const getSpecialities = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM specialities ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching specialities:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getSpecialityById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM specialities WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Speciality not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching speciality:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createSpeciality = async (req, res) => {
  try {
    const { name, name_bn, description, description_bn, image } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const [result] = await db.execute(
      'INSERT INTO specialities (name, name_bn, description, description_bn, image) VALUES (?, ?, ?, ?, ?)',
      [name, name_bn, description, description_bn, image]
    );

    res.status(201).json({
      message: 'Speciality created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error creating speciality:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateSpeciality = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, name_bn, description, description_bn, image } = req.body;

    const [result] = await db.execute(
      'UPDATE specialities SET name = ?, name_bn = ?, description = ?, description_bn = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, name_bn, description, description_bn, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Speciality not found' });
    }

    res.status(200).json({ message: 'Speciality updated successfully' });
  } catch (error) {
    console.error('Error updating speciality:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteSpeciality = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM specialities WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Speciality not found' });
    }

    res.status(200).json({ message: 'Speciality deleted successfully' });
  } catch (error) {
    console.error('Error deleting speciality:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

