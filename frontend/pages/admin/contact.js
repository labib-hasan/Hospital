import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AdminLayout from "../../components/AdminLayout";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

// Dynamically import the map picker to avoid SSR issues
const AdminMapPicker = dynamic(() => import("../../components/AdminMapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function AdminContact() {
  const { language } = useLanguage();
  const t = translations[language];
  const [contact, setContact] = useState({
    phone: "",
    emergencyPhone: "",
    hotline: "",
    email: "",
    address: "",
    addressBn: "",
    lat: "22.333341",
    lng: "91.831056",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/get-contact")
      .then((res) => res.json())
      .then((data) => {
        setContact({
          phone: data.phone || "",
          emergencyPhone: data.emergencyPhone || "",
          hotline: data.hotline || "",
          email: data.email || "",
          address: data.address || "",
          addressBn: data.addressBn || "",
          lat: data.lat || "22.333341",
          lng: data.lng || "91.831056",
        });
      })
      .catch(() => {});
  }, []);

  const handleMapChange = (coords) => {
    setContact({ ...contact, lat: String(coords.lat), lng: String(coords.lng) });
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await fetch("/api/save-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      const data = await res.json();

      if (data.success) {
        alert(language === "en" ? "Contact saved successfully!" : "যোগাযোগ তথ্য সফলভাবে সংরক্ষিত হয়েছে!");
      } else {
        alert(language === "en" ? "Save failed: " + data.message : "সংরক্ষণ ব্যর্থ: " + data.message);
      }
    } catch (error) {
      alert(language === "en" ? "Save failed!" : "সংরক্ষণ ব্যর্থ!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            {language === "en" ? "Manage Contact Information" : "যোগাযোগ তথ্য পরিচালনা"}
          </h1>

          {/* Contact Info Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {language === "en" ? "Contact Information" : "যোগাযোগ তথ্য"}
            </h2>

            <div className="space-y-4">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Phone" : "ফোন"}
                </label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter phone number" : "ফোন নম্বর লিখুন"}
                />
              </div>

              {/* Emergency Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Emergency Phone" : "জরুরি ফোন"}
                </label>
                <input
                  type="text"
                  value={contact.emergencyPhone}
                  onChange={(e) => setContact({ ...contact, emergencyPhone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter emergency phone" : "জরুরি ফোন লিখুন"}
                />
              </div>

              {/* Hotline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Hotline" : "হটলাইন"}
                </label>
                <input
                  type="text"
                  value={contact.hotline}
                  onChange={(e) => setContact({ ...contact, hotline: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter hotline number" : "হটলাইন নম্বর লিখুন"}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Email" : "ইমেইল"}
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter email address" : "ইমেইল লিখুন"}
                />
              </div>

              {/* Address (English) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Address (English)" : "ঠিকানা (ইংরেজি)"}
                </label>
                <textarea
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter address in English" : "ইংরেজিতে ঠিকানা লিখুন"}
                />
              </div>

              {/* Address (Bengali) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Address (Bengali)" : "ঠিকানা (বাংলা)"}
                </label>
                <textarea
                  value={contact.addressBn}
                  onChange={(e) => setContact({ ...contact, addressBn: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter address in Bengali" : "বাংলায় ঠিকানা লিখুন"}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {saving
                  ? language === "en"
                    ? "Saving..."
                    : "সংরক্ষণ হচ্ছে..."
                  : language === "en"
                  ? "Save Contact Info"
                  : "যোগাযোগ তথ্য সংরক্ষণ করুন"}
              </button>
            </div>
          </div>

          {/* Map Location Section with Interactive Picker */}
       {/*  */}

          {/* Preview Link */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              {language === "en" ? "Preview" : "প্রিভিউ"}
            </h2>
            <a
              href="/contact"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {language === "en"
                ? "View Contact Page"
                : "যোগাযোগ পেজ দেখুন"}
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
