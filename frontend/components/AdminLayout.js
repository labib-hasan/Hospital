import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Check authentication
    const token = localStorage.getItem('adminToken');
    const userStr = localStorage.getItem('adminUser');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    if (userStr) {
      try {
        setAdminUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "MD Message", path: "/admin/md-message" },
    { name: "Photo Gallery", path: "/admin/gallery" },
    { name: "Contact Info", path: "/admin/contact" },
    { name: "Doctors", path: "/admin/doctors" },
    { name: "Departments", path: "/admin/departments" },
    { name: "Services", path: "/admin/services" },
    { name: "News", path: "/admin/news" },
  ];

  // Add Admins menu only for superadmin
  if (adminUser?.role === 'superadmin') {
    menu.push({ name: "Admins", path: "/admin/admins" });
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FB]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-xl font-bold text-blue-600">
          🏥 Health Journal
        </div>

        <nav className="space-y-2 px-4">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-2 rounded-lg text-sm font-medium
              ${
                router.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        
        {/* Topbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search doctor, patient..."
            className="text-black w-1/3 px-4 py-2 border rounded-lg text-sm focus:outline-none"
          />

          <div className="flex items-center gap-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
              {adminUser?.name || 'Admin'}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
