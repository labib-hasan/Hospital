import { useRouter } from "next/router";
import Link from "next/link";
export default function AdminLayout({ children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Hospital Admin</h1>
          <div className="space-x-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/admin/doctors" className="hover:underline">Doctors</Link>
            <Link href="/admin/services" className="hover:underline">Services</Link>
            <Link href="/admin/departments" className="hover:underline">Departments</Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
