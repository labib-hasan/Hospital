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
    const { 
      name, 
      specialization, 
      degrees,
      designation,
      department,
      institute,
      room_no,
      serial_note,
      visiting_time,
      visiting_days,
      phone, 
      email,
      experience_years,
      description,
      image
    } = req.body;

    console.log('Creating doctor with data:', req.body);

    if (!name || !specialization) {
      return res.status(400).json({ message: 'Name and specialization are required' });
    }

    // Build dynamic query based on available fields
    const fields = [];
    const values = [];
    
    if (name) { fields.push('name'); values.push(name); }
    if (specialization) { fields.push('specialization'); values.push(specialization); }
    if (degrees !== undefined) { fields.push('degrees'); values.push(degrees || ''); }
    if (designation !== undefined) { fields.push('designation'); values.push(designation || ''); }
    if (department !== undefined) { fields.push('department'); values.push(department || ''); }
    if (institute !== undefined) { fields.push('institute'); values.push(institute || ''); }
    if (room_no !== undefined) { fields.push('room_no'); values.push(room_no || ''); }
    if (serial_note !== undefined) { fields.push('serial_note'); values.push(serial_note || ''); }
    if (visiting_time !== undefined) { fields.push('visiting_time'); values.push(visiting_time || ''); }
    if (visiting_days !== undefined) { fields.push('visiting_days'); values.push(JSON.stringify(visiting_days || [])); }
    if (phone !== undefined) { fields.push('phone'); values.push(phone || ''); }
    if (email !== undefined) { fields.push('email'); values.push(email || ''); }
    if (experience_years !== undefined) { fields.push('experience_years'); values.push(Number(experience_years) || 0); }
    if (description !== undefined) { fields.push('description'); values.push(description || ''); }
    if (image !== undefined) { fields.push('image'); values.push(image || ''); }

    const query = `INSERT INTO doctors (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`;
    console.log('Query:', query);
    console.log('Values:', values);

    const [result] = await db.execute(query, values);

    res.status(201).json({
      message: 'Doctor created successfully',
      doctorId: result.insertId
    });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Error creating doctor: ' + error.message });
  }
};

/**
 * UPDATE doctor
 * PUT /api/doctors/:id
 */
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      specialization, 
      degrees,
      designation,
      department,
      institute,
      room_no,
      serial_note,
      visiting_time,
      visiting_days,
      phone, 
      email,
      experience_years,
      description,
      image
    } = req.body;

    const [result] = await db.execute(
      `UPDATE doctors SET name = ?, specialization = ?, degrees = ?, designation = ?, department = ?, institute = ?, room_no = ?, serial_note = ?, visiting_time = ?, visiting_days = ?, phone = ?, email = ?, experience_years = ?, description = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [name, specialization, degrees || '', designation || '', department || '', institute || '', room_no || '', serial_note || '', visiting_time || '', JSON.stringify(visiting_days || []), phone || '', email || '', Number(experience_years) || 0, description || '', image || '', id]
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

/**
 * GET doctors by specialization
 * GET /api/doctors/specialization/:specialization
 */
export const getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.params;
    const [rows] = await db.execute(
      'SELECT * FROM doctors WHERE specialization LIKE ? OR department LIKE ?',
      [`%${specialization}%`, `%${specialization}%`]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching doctors by specialization:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
