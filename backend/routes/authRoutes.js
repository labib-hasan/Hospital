import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'health-journal-secret-key-2024';

// Initialize admin table on server start
Admin.createTable().then(() => {
  console.log('✅ Admin table initialized');
});

// Check if superadmin exists
router.get('/check-superadmin', async (req, res) => {
  try {
    const hasSuperadmin = await Admin.hasSuperadmin();
    res.json({ hasSuperadmin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', hasSuperadmin: false });
  }
});

// Superadmin signup (only works when no superadmin exists)
router.post('/signup-superadmin', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if superadmin already exists
    const hasSuperadmin = await Admin.hasSuperadmin();
    if (hasSuperadmin) {
      return res.status(403).json({ message: 'Superadmin already exists. Please login.' });
    }

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingAdmin = await Admin.findByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create superadmin
    const newAdmin = await Admin.create(name, email, hashedPassword, 'superadmin');

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin.id, email: newAdmin.email, role: newAdmin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Superadmin account created successfully',
      token,
      user: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });
  } catch (error) {
    console.error('Superadmin signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login endpoint (for both superadmin and admin)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin by email
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if account is active
    if (admin.status !== 'active') {
      return res.status(401).json({ message: 'Account is deactivated. Contact superadmin.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Verify token endpoint
router.post('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided', valid: false });
    }

    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token', valid: false });
      }
      // Get fresh user data from database
      const admin = await Admin.findById(user.id);
      if (!admin) {
        return res.status(403).json({ message: 'User not found', valid: false });
      }
      res.json({ valid: true, user: admin });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', valid: false });
  }
});

// Get all admins (only superadmin can access)
router.get('/admins', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      
      // Only superadmin can view all admins
      if (user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Only superadmin can view all admins' });
      }
      
      const admins = await Admin.getAll();
      res.json(admins);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new admin (only superadmin can create)
router.post('/admins', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      
      // Only superadmin can create admins
      if (user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Only superadmin can create admins' });
      }
      
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Check if email already exists
      const existingAdmin = await Admin.findByEmail(email);
      if (existingAdmin) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new admin
      const newAdmin = await Admin.create(name, email, hashedPassword, 'admin');
      
      res.status(201).json({
        success: true,
        message: 'Admin created successfully',
        admin: {
          id: newAdmin.id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: newAdmin.role,
          status: newAdmin.status
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update admin (only superadmin can update)
router.put('/admins/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      
      // Only superadmin can update admins
      if (user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Only superadmin can update admins' });
      }
      
      const { id } = req.params;
      const { name, email, role, status } = req.body;
      
      // Prevent changing superadmin role
      const targetAdmin = await Admin.findById(id);
      if (targetAdmin && targetAdmin.role === 'superadmin' && role !== 'superadmin') {
        return res.status(403).json({ message: 'Cannot modify superadmin role' });
      }
      
      await Admin.update(id, name, email, role, status);
      
      res.json({ success: true, message: 'Admin updated successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete admin (only superadmin can delete)
router.delete('/admins/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      
      // Only superadmin can delete admins
      if (user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Only superadmin can delete admins' });
      }
      
      const { id } = req.params;
      
      // Check if trying to delete self
      if (parseInt(id) === user.id) {
        return res.status(400).json({ message: 'Cannot delete your own account' });
      }
      
      await Admin.delete(id);
      
      res.json({ success: true, message: 'Admin deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
