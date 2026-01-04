import db from '../config/db.js';

/**
 * GET all doctors
 * GET /api/doctors
 */
export const getDoctors = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM doctors');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * GET doctor by ID
 * GET /api/doctors/:id
 */
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute(
      'SELECT * FROM doctors WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * CREATE doctor
 * POST /api/doctors
 */
export const createDoctor = async (req, res) => {
  try {
    const { name, specialization, phone } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const [result] = await db.execute(
      'INSERT INTO doctors (name, specialization, phone) VALUES (?, ?, ?)',
      [name, specialization, phone]
    );

    res.status(201).json({
      message: 'Doctor created successfully',
      doctorId: result.insertId
    });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * UPDATE doctor
 * PUT /api/doctors/:id
 */
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, phone } = req.body;

    const [result] = await db.execute(
      'UPDATE doctors SET name = ?, specialization = ?, phone = ? WHERE id = ?',
      [name, specialization, phone, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor updated successfully' });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * DELETE doctor
 * DELETE /api/doctors/:id
 */
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      'DELETE FROM doctors WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
