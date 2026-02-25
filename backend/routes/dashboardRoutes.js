import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    // Get doctor count
    const [doctorCountResult] = await db.execute(
      "SELECT COUNT(*) AS total FROM doctors"
    );
    const doctorCount = doctorCountResult[0].total;

    // Get recent doctors (limit 10)
    const [recentDoctors] = await db.execute(
      "SELECT id, name, specialization, department, experience_years FROM doctors ORDER BY created_at DESC LIMIT 10"
    );

    // Get top doctors (limit 5)
    const [topDoctors] = await db.execute(
      "SELECT id, name, specialization FROM doctors ORDER BY created_at DESC LIMIT 5"
    );

    // Get departments count
    const [deptCountResult] = await db.execute(
      "SELECT COUNT(*) AS total FROM departments"
    );
    const deptCount = deptCountResult[0].total;

    // Get services count
    const [serviceCountResult] = await db.execute(
      "SELECT COUNT(*) AS total FROM services"
    );
    const serviceCount = serviceCountResult[0].total;

    res.json({
      doctors: doctorCount,
      recentDoctors: recentDoctors,
      topDoctors: topDoctors,
      departments: deptCount,
      services: serviceCount,
      appointmentsToday: 0,
      activePatients: 0,
      totalStaffs: 0,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Dashboard stats failed" });
  }
});

export default router;
