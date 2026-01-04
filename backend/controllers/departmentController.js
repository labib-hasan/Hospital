import db from '../config/db.js';

export const getDepartments = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM departments ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM departments WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, description, image, head_doctor } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const [result] = await db.execute(
      'INSERT INTO departments (name, description, image, head_doctor) VALUES (?, ?, ?, ?)',
      [name, description, image, head_doctor]
    );

    res.status(201).json({
      message: 'Department created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, head_doctor } = req.body;

    const [result] = await db.execute(
      'UPDATE departments SET name = ?, description = ?, image = ?, head_doctor = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, description, image, head_doctor, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department updated successfully' });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM departments WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
