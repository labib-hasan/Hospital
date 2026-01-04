import { useRouter } from "next/router";

export default function AdminLayout({ children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Hospital Admin</h1>
          <div className="space-x-4">
            <a href="/admin/dashboard" className="hover:underline">Dashboard</a>
            <a href="/admin/doctors" className="hover:underline">Doctors</a>
            <a href="/admin/services" className="hover:underline">Services</a>
            <a href="/admin/departments" className="hover:underline">Departments</a>
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
