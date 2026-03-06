// ==============================
// Express Server - Hostinger Ready
// ==============================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

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

// DB 
import db from "./config/db.js";

// ES Modules __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
console.log("🔥 Hospital API v2 loaded");
const app = express();

// ==============================
// Middleware
// ==============================

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL, 
    "http://localhost:3000",
    "https://lavender-monkey-429786.hostingersite.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, status: "healthy" });
});

// ==============================
// Serve Frontend (public_html)
// ==============================

// This assumes server.js is inside the /nodejs/ folder
const frontendPath = path.join(__dirname, "..", "public_html");

// 1. Serve static files from public_html
app.use(express.static(frontendPath));

// 2. Special handler for Next.js '_next' folder
app.use('/_next', express.static(path.join(frontendPath, '_next')));

// 3. Catch-all: Send index.html for any frontend route (SPA support)
app.get("*", (req, res) => {
  // Prevent catching API routes that don't exist
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: "API route not found" });
  }
  
  // Send the main index.html for all other requests
  res.sendFile(path.join(frontendPath, "index.html"));
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
  console.log(`📁 Frontend path: ${frontendPath}`);
});