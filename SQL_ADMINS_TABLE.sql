-- =====================================================
-- ADMINS TABLE FOR HOSPITAL MANAGEMENT SYSTEM
-- Role-based access: superadmin (1 person), admin (multiple)
-- =====================================================

-- Create admins table if not exists
CREATE TABLE IF NOT EXISTS admins (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('superadmin', 'admin') DEFAULT 'admin',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY unique_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default superadmin (change password after first login)
-- Default: email: superadmin@healthjournal.com, password: superadmin123
INSERT INTO admins (name, email, password, role, status) 
VALUES ('Super Admin', 'superadmin@healthjournal.com', '$2a$10$YourHashedPasswordHere1234567890ABCDEFGHIJKLMNOP', 'superadmin', 'active')
ON DUPLICATE KEY UPDATE name = 'Super Admin';

-- To generate bcrypt password hash, use this command in Node.js:
-- const bcrypt = require('bcryptjs'); bcrypt.hash('yourpassword', 10);
-- Example hash for 'superadmin123': $2a$10$rBV2JzS3kQrqLQqr5hHqUOXqK8hJdPZXL5xGqXqK8hJdPZXL5xGqXq

-- After running this SQL, manually update the password with proper bcrypt hash
-- Example: UPDATE admins SET password = '$2a$10$8K1p/a0dL1.LZQqY3G5zXO5Jk6qK5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5' WHERE email = 'superadmin@healthjournal.com';
