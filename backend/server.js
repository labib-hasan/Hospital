// ==============================
// Express + Next.js Server
// Production Ready (Hostinger)
// ==============================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import next from "next";
import path from "path";
import { fileURLToPath } from "url";

// ==============================
// Routes
// ==============================

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

// ==============================
// Database
// ==============================

import db from "./config/db.js";

dotenv.config();

console.log("🔥 Hospital API v2 loaded");

// ==============================
// Next.js Setup
// ==============================

const dev = false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextApp = next({
  dev,
  dir: path.join(__dirname, "../frontend"),
});

const handle = nextApp.getRequestHandler();

// ==============================
// Express Setup
// ==============================

const app = express();

// ==============================
// Middleware
// ==============================

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
    "https://white-grasshopper-787839.hostingersite.com",
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

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// ==============================
// Database Test
// ==============================

app.get("/db-test", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({
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
// Migration Route
// ==============================

app.get("/api/migrate", async (req, res) => {

  const results = [];
  const errors = [];

  const statements = [
    "ALTER TABLE contact MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE gallery_images MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE md_message MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE md_image MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE news MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT",
    "ALTER TABLE hero_images MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT"
  ];

  for (const sql of statements) {
    try {
      await db.query(sql);
      results.push({ sql, status: "OK" });
    } catch (err) {
      results.push({ sql, error: err.message });
    }
  }

  res.json({
    success: true,
    results,
    errors
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
// 404 API Handler
// ==============================

app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ==============================
// Start Server with Next.js
// ==============================

const PORT = process.env.PORT || 8080;

nextApp.prepare().then(() => {

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

});