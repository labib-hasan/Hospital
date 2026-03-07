// ==============================
// Express Server - Production Ready
// ==============================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import doctorRoutes from "./routes/doctorRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import mdMessageRoutes from "./routes/mdMessageRoutes.js";
import mdImageRoutes from "./routes/mdImageRoutes.js";
import heroImageRoutes from "./routes/heroImageRoutes.js";

// DB (adjust import if your DB file path is different)
import db from "./config/db.js";

dotenv.config();
console.log("🔥 Hospital API v2 loaded");
const app = express();

// ==============================
// Middleware
// ==============================

// CORS configuration (Hostinger + local support)
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL, // Hostinger frontend
    "https://darkgray-flamingo-203110.hostingersite.com", // Frontend URL
   // Backend URL
    "http://localhost:3000",  // local frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// Root & Health Routes
// ==============================

// Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🏥 Hospital API is running successfully",
    environment: process.env.NODE_ENV || "development",
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// DB test route (important for Railway)
app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.status(200).json({
      success: true,
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      database: "not connected",
      error: error.message,
    });
  }
});

// ==============================
// DB Migration Route
// Fixes tables created without AUTO_INCREMENT / missing columns
// Call once: GET /api/migrate
// ==============================
app.get("/api/migrate", async (req, res) => {
  const results = [];
  const errors = [];

  try {
    // First, check if gallery_images table exists
    const [tableCheck] = await db.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'gallery_images'
    `);

    // Create gallery_images table if it doesn't exist
    if (!tableCheck || tableCheck.length === 0) {
      try {
        await db.query(`
          CREATE TABLE gallery_images (
            id INT NOT NULL AUTO_INCREMENT,
            image_url VARCHAR(500) NOT NULL,
            public_id VARCHAR(255) DEFAULT NULL,
            title VARCHAR(200) DEFAULT NULL,
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        results.push({ sql: "CREATE TABLE gallery_images", status: "✅ Table created" });
      } catch (err) {
        errors.push({ sql: "CREATE TABLE gallery_images", error: err.message });
      }
    } else {
      results.push({ sql: "gallery_images table exists", status: "✅ OK" });
    }
  } catch (err) {
    results.push({ sql: "Check gallery_images", error: err.message });
  }

  // Check and create hero_images table
  try {
    const [heroTableCheck] = await db.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'hero_images'
    `);

    if (!heroTableCheck || heroTableCheck.length === 0) {
      await db.query(`
        CREATE TABLE hero_images (
          id INT NOT NULL AUTO_INCREMENT,
          image_url VARCHAR(500) NOT NULL,
          public_id VARCHAR(255) DEFAULT NULL,
          position INT DEFAULT 0,
          uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `);
      results.push({ sql: "CREATE TABLE hero_images", status: "✅ Table created" });
    } else {
      results.push({ sql: "hero_images table exists", status: "✅ OK" });
    }
  } catch (err) {
    errors.push({ sql: "hero_images table", error: err.message });
  }

  const statements = [
    // Fix AUTO_INCREMENT on all CMS tables
    "ALTER TABLE contact MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE gallery_images MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE md_message MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE md_image MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE news MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE hero_images MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",

    // contact — add missing columns
    "ALTER TABLE contact ADD COLUMN emergency_phone VARCHAR(50) DEFAULT NULL",
    "ALTER TABLE contact ADD COLUMN address_bn TEXT DEFAULT NULL",
    "ALTER TABLE contact ADD COLUMN lat DECIMAL(10, 7) DEFAULT NULL",
    "ALTER TABLE contact ADD COLUMN lng DECIMAL(10, 7) DEFAULT NULL",
    "ALTER TABLE contact ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",

    // gallery_images - Add columns if they don't exist
    "ALTER TABLE gallery_images ADD COLUMN image_url VARCHAR(500) DEFAULT NULL",
    "ALTER TABLE gallery_images ADD COLUMN public_id VARCHAR(255) DEFAULT NULL",
    "ALTER TABLE gallery_images ADD COLUMN title VARCHAR(200) DEFAULT NULL",
    "ALTER TABLE gallery_images ADD COLUMN uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",

    // md_message — add missing columns
    "ALTER TABLE md_message ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",

    // md_image — add missing columns
    "ALTER TABLE md_image ADD COLUMN public_id VARCHAR(255) DEFAULT NULL",
    "ALTER TABLE md_image ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",

    // news — add missing columns
    "ALTER TABLE news ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",

    // hero_images - Add columns if they don't exist
    "ALTER TABLE hero_images ADD COLUMN image_url VARCHAR(500) DEFAULT NULL",
    "ALTER TABLE hero_images ADD COLUMN public_id VARCHAR(255) DEFAULT NULL",
    "ALTER TABLE hero_images ADD COLUMN position INT DEFAULT 0",
    "ALTER TABLE hero_images ADD COLUMN uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",

    // doctors - Make email nullable
    "ALTER TABLE doctors MODIFY COLUMN email VARCHAR(255) DEFAULT NULL",
  ];

  for (const sql of statements) {
    try {
      await db.query(sql);
      results.push({ sql, status: "✅ OK" });
    } catch (err) {
      // Duplicate column errors are harmless — column already exists
      if (err.code === "ER_DUP_FIELDNAME" || err.errno === 1060) {
        results.push({ sql, status: "⚠️ Already exists (skipped)" });
      } else if (err.code === "ER_NO_SUCH_TABLE") {
        results.push({ sql, status: "⚠️ Table doesn't exist (skipped)" });
      } else {
        errors.push({ sql, error: err.message });
      }
    }
  }

  res.status(errors.length > 0 ? 207 : 200).json({
    success: errors.length === 0,
    message: errors.length === 0
      ? "✅ All migrations applied successfully"
      : `⚠️ ${errors.length} migration(s) failed`,
    results,
    errors,
  });
});

// ==============================
// API Routes
// ==============================

app.use("/api/doctors", doctorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/md-message", mdMessageRoutes);
app.use("/api/md-image", mdImageRoutes);
app.use("/api/hero-images", heroImageRoutes);

// ==============================
// 404 Handler
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
