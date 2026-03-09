import db from '../config/db.js';

export const getDiagnostics = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM diagnostics ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching diagnostics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getDiagnosticById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM diagnostics WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Diagnostic not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching diagnostic:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createDiagnostic = async (req, res) => {
  try {
    const { name, name_bn, description, description_bn, image } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const [result] = await db.execute(
      'INSERT INTO diagnostics (name, name_bn, description, description_bn, image) VALUES (?, ?, ?, ?, ?)',
      [name, name_bn, description, description_bn, image]
    );

    res.status(201).json({
      message: 'Diagnostic service created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error creating diagnostic:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateDiagnostic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, name_bn, description, description_bn, image } = req.body;

    const [result] = await db.execute(
      'UPDATE diagnostics SET name = ?, name_bn = ?, description = ?, description_bn = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, name_bn, description, description_bn, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Diagnostic not found' });
    }

    res.status(200).json({ message: 'Diagnostic updated successfully' });
  } catch (error) {
    console.error('Error updating diagnostic:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteDiagnostic = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM diagnostics WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Diagnostic not found' });
    }

    res.status(200).json({ message: 'Diagnostic deleted successfully' });
  } catch (error) {
    console.error('Error deleting diagnostic:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

