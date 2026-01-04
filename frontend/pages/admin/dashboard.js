import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";

function DashboardContent() {
  const [stats, setStats] = useState({
    doctors: 0,
    services: 0,
    departments: 0,
  });

  useEffect(() => {
    // later: fetch admin stats here
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-lg font-semibold">Doctors</h2>
          <p className="text-3xl">{stats.doctors}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-lg font-semibold">Services</h2>
          <p className="text-3xl">{stats.services}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-lg font-semibold">Departments</h2>
          <p className="text-3xl">{stats.departments}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * ✅ THIS IS CRITICAL
 * Next.js page MUST default-export a React component
 */
export default function AdminDashboard() {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}
