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
// API Routes
// ==============================

app.use("/api/doctors", doctorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/dashboard", dashboardRoutes);

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