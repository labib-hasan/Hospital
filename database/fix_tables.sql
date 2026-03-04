-- ============================================================
-- FIX SCRIPT: Run this in Railway MySQL to fix all CMS tables
-- ============================================================
-- Problem: Tables were created without AUTO_INCREMENT on id column
-- Solution: ALTER each table to add AUTO_INCREMENT + missing columns

-- 1. Fix contact table
ALTER TABLE contact MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

-- Add lat/lng if they don't exist (run only if missing)
ALTER TABLE contact ADD COLUMN IF NOT EXISTS lat DECIMAL(10, 7) DEFAULT NULL;
ALTER TABLE contact ADD COLUMN IF NOT EXISTS lng DECIMAL(10, 7) DEFAULT NULL;

-- Add emergency_phone if it doesn't exist
ALTER TABLE contact ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(50) DEFAULT NULL;

-- Add address_bn if it doesn't exist
ALTER TABLE contact ADD COLUMN IF NOT EXISTS address_bn TEXT DEFAULT NULL;

-- Add updated_at if it doesn't exist
ALTER TABLE contact ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 2. Fix gallery_images table
ALTER TABLE gallery_images MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

-- Add public_id if it doesn't exist
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS public_id VARCHAR(255) DEFAULT NULL;

-- Add title if it doesn't exist
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS title VARCHAR(200) DEFAULT NULL;

-- 3. Fix md_message table
ALTER TABLE md_message MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

-- Add updated_at if it doesn't exist
ALTER TABLE md_message ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 4. Fix md_image table
ALTER TABLE md_image MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

-- Add public_id if it doesn't exist
ALTER TABLE md_image ADD COLUMN IF NOT EXISTS public_id VARCHAR(255) DEFAULT NULL;

-- Add updated_at if it doesn't exist
ALTER TABLE md_image ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 5. Fix news table
ALTER TABLE news MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

-- Add updated_at if it doesn't exist
ALTER TABLE news ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- ============================================================
-- Verify: Check all tables are correct
-- ============================================================
DESCRIBE contact;
DESCRIBE gallery_images;
DESCRIBE md_message;
DESCRIBE md_image;
DESCRIBE news;
