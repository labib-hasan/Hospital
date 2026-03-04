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

// DB (adjust import if your DB file path is different)
import db from "./config/db.js";

dotenv.config();
console.log("🔥 Hospital API v2 loaded");
const app = express();

// ==============================
// Middleware
// ==============================

// CORS configuration (Vercel + local support)
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL, // Vercel frontend
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

  const statements = [
    // Fix AUTO_INCREMENT on all CMS tables
    "ALTER TABLE contact MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE gallery_images MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE md_message MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE md_image MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE news MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",

    // contact — add missing columns
    "ALTER TABLE contact ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(50) DEFAULT NULL",
    "ALTER TABLE contact ADD COLUMN IF NOT EXISTS address_bn TEXT DEFAULT NULL",
    "ALTER TABLE contact ADD COLUMN IF NOT EXISTS lat DECIMAL(10, 7) DEFAULT NULL",
    "ALTER TABLE contact ADD COLUMN IF NOT EXISTS lng DECIMAL(10, 7) DEFAULT NULL",
    "ALTER TABLE contact ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",

    // gallery_images — add missing columns
    "ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS public_id VARCHAR(255) DEFAULT NULL",
    "ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS title VARCHAR(200) DEFAULT NULL",

    // md_message — add missing columns
    "ALTER TABLE md_message ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",

    // md_image — add missing columns
    "ALTER TABLE md_image ADD COLUMN IF NOT EXISTS public_id VARCHAR(255) DEFAULT NULL",
    "ALTER TABLE md_image ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",

    // news — add missing columns
    "ALTER TABLE news ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  ];

  for (const sql of statements) {
    try {
      await db.query(sql);
      results.push({ sql, status: "✅ OK" });
    } catch (err) {
      // Duplicate column errors are harmless — column already exists
      if (err.code === "ER_DUP_FIELDNAME" || err.errno === 1060) {
        results.push({ sql, status: "⚠️ Already exists (skipped)" });
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
