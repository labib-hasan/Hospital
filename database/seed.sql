-- Seed data for Hospital Management System

USE hospital_management;

-- Insert admin user (password: admin123 - hashed)
INSERT INTO admin_users (username, password, email) VALUES
('admin', '$2b$10$rOz8vZK8Q8vZK8Q8vZK8Qe8vZK8Q8vZK8Q8vZK8Q8vZK8Q8vZK8Q', 'admin@hospital.com');

-- Insert sample doctors
INSERT INTO doctors (name, specialization, image, description, experience_years, phone, email) VALUES
('Dr. Sarah Johnson', 'Cardiology', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400', 'Expert cardiologist with 15 years of experience in heart disease treatment.', 15, '+1-555-0101', 'sarah.johnson@hospital.com'),
('Dr. Michael Chen', 'Neurology', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400', 'Specialist in neurological disorders and brain health.', 12, '+1-555-0102', 'michael.chen@hospital.com'),
('Dr. Emily Davis', 'Pediatrics', 'https://images.unsplash.com/photo-1594824804732-ca8db723f8fa?w=400', 'Dedicated pediatrician focused on child healthcare.', 10, '+1-555-0103', 'emily.davis@hospital.com');

-- Insert sample services
INSERT INTO services (title, description, image, icon) VALUES
('Qualified Doctors', 'Expert healthcare professionals for your care.', 'https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg', 'https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_doctor1.png?fit=94%2C100&amp;#038;ssl=1'),
('Advanced Facilities', 'Modern equipment and treatment for all patients.', 'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/675c2e9acec1c9001d59693a.jpg', 'https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_med_book_white.png?fit=103%2C100&amp;#038;ssl=1'),
('24/7 Emergency', 'Emergency services available around the clock.', 'https://sttheresashospital.com/assets/img/sth-imgs/24_7_emergency_services.png', 'https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_help_desk1.png?fit=130%2C100&amp;#038;ssl=1');

-- Insert sample departments
INSERT INTO departments (name, description, image, head_doctor) VALUES
('Cardiology', 'Heart health treatments and checkups.', 'https://southdenver.com/wp-content/uploads/2021/09/invasive-cardiology.jpg', 'Dr. Sarah Johnson'),
('Neurology', 'Brain and nervous system care.', 'https://idreamcareer.com/wp-content/uploads/2023/04/how-to-become-a-neurologist.webp', 'Dr. Michael Chen'),
('Pediatrics', 'Health care for children and infants.', 'https://medical.rossu.edu/sites/g/files/krcnkv261/files/styles/atge_3_2_crop_md/public/2022-04/Pediatrician.jpg?h=f9d06ff2&itok=RIN6zAjk', 'Dr. Emily Davis');

-- Insert sample hero image
INSERT INTO hero_images (title, subtitle, image_url, is_active) VALUES
('Welcome to Our Hospital', 'Providing quality healthcare services', '/ss.png', TRUE);
