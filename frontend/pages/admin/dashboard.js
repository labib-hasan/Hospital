import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import {
  UserGroupIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  BeakerIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  TruckIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import MdImageUpload from "@/components/MdImageUpload";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard load error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-gray-500 font-semibold">
          Loading dashboard data...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-blue-200 mt-2">
              Hospital management overview
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/doctors"
              className="bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl flex items-center gap-2"
            >
              <BeakerIcon className="w-5 h-5" />
              Doctors
            </Link>
            <Link
              href="/admin/departments"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl flex items-center gap-2"
            >
              <BuildingOfficeIcon className="w-5 h-5" />
              Departments
            </Link>
          </div>
        </div>
      </div>

      {/* MD IMAGE UPLOAD SECTION */}
      <div className="mb-8">
        <MdImageUpload isAdmin={true} />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Doctors" value={data?.doctors || 0} icon={<UserGroupIcon />} color="blue" />
        <StatCard title="Appointments Today" value={data?.appointmentsToday || 0} icon={<CalendarDaysIcon />} color="purple" />
        <StatCard title="Active Patients" value={data?.activePatients || 0} icon={<UserGroupIcon />} color="cyan" />
        <StatCard title="Total Staffs" value={data?.totalStaffs || 0} icon={<ShieldCheckIcon />} color="green" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT DOCTORS */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl">
          <div className="p-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl">
            Recent Doctors
          </div>
          <Table
            headers={["Name", "Specialization", "Department", "Experience"]}
            rows={(data?.recentDoctors || []).map((d) => [
              d.name,
              d.specialization,
              d.department || "General",
              d.experience_years ? `${d.experience_years} years` : "N/A",
            ])}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* QUICK ACTIONS */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
              <ChartBarIcon className="w-5 h-5 text-cyan-400" />
              Quick Actions
            </h3>
            <QuickLink href="/admin/doctors" label="Add Doctor" icon={<BeakerIcon />} />
            <QuickLink href="/admin/departments" label="Departments" icon={<BuildingOfficeIcon />} />
            <QuickLink href="/admin/services" label="Services" icon={<ClipboardDocumentListIcon />} />
          </div>

          {/* TOP DOCTORS */}
          <div className="bg-white rounded-2xl shadow-xl">
            <div className="p-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold">
              Top Doctors
            </div>
            <div className="p-4">
              {(data?.topDoctors || []).map((doc) => (
                <Doctor key={doc.id} name={doc.name} specialty={doc.specialization} />
              ))}
            </div>
          </div>

          {/* EMERGENCY */}
          <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-3">
              <TruckIcon className="w-5 h-5" />
              Emergency
            </h3>
            <p className="text-2xl font-bold">+8809610-818888</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    cyan: "bg-cyan-100 text-cyan-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 font-semibold">{title}</p>
          <h2 className="text-4xl font-bold mt-2">{value}</h2>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function Table({ headers, rows }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No data available
      </div>
    );
  }
  
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((h) => (
            <th key={h} className="text-left px-4 py-3 font-bold text-gray-700">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 text-gray-600">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Doctor({ name, specialty }) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-none">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-gray-500">{specialty}</p>
      </div>
      <ArrowTrendingUpIcon className="w-5 h-5 text-blue-600" />
    </div>
  );
}

function QuickLink({ href, label, icon }) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 mb-2">
      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
}
