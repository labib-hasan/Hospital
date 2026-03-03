import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

export default function AdminMdMessage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [mdImage, setMdImage] = useState(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch MD image
    fetch("/api/get-md-image")
      .then((res) => res.json())
      .then((data) => {
        if (data.image) setMdImage(data.image);
      })
      .catch(() => {});

    // Fetch MD message
    fetch("/api/get-md-message")
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setPosition(data.position || "");
        setTitle(data.title || "");
        setMessage(data.message || "");
      })
      .catch(() => {});
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-md-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        setMdImage(data.url);
        alert(language === "en" ? "Image uploaded successfully!" : "ছবি সফলভাবে আপলোড হয়েছে!");
      }
    } catch (error) {
      alert(language === "en" ? "Upload failed!" : "আপলোড ব্যর্থ!");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSaveMessage = async () => {
    setSaving(true);

    try {
      const res = await fetch("/api/save-md-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, position, title, message }),
      });

      const data = await res.json();

      if (data.success) {
        alert(language === "en" ? "Message saved successfully!" : "মেসেজ সফলভাবে সংরক্ষিত হয়েছে!");
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
            {language === "en" ? "Manage MD Message" : "এমডি মেসেজ পরিচালনা"}
          </h1>

          {/* MD Photo Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {language === "en" ? "MD Photo" : "এমডি ছবি"}
            </h2>

            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                {mdImage ? (
                  <img
                    src={mdImage}
                    alt="MD"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-20 h-20 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>

              <label className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                {uploading
                  ? language === "en"
                    ? "Uploading..."
                    : "আপলোড হচ্ছে..."
                  : language === "en"
                  ? "Upload Photo"
                  : "ছবি আপলোড করুন"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <p className="text-sm text-gray-500">
                {language === "en"
                  ? "Recommended size: 500x500px, JPG or PNG"
                  : "প্রস্তাবিত আকার: ৫০০x৫০০পিক্সেল, JPG বা PNG"}
              </p>
            </div>
          </div>

          {/* MD Info & Message Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {language === "en" ? "MD Information & Message" : "এমডি তথ্য ও মেসেজ"}
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Name" : "নাম"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter name" : "নাম লিখুন"}
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Position" : "পদবী"}
                </label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter position" : "পদবী লিখুন"}
                />
              </div>

              {/* Page Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Page Title" : "পেজ শিরোনাম"}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter page title" : "পেজ শিরোনাম লিখুন"}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "en" ? "Message" : "মেসেজ"}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === "en" ? "Enter message" : "মেসেজ লিখুন"}
                />
              </div>

              <button
                onClick={handleSaveMessage}
                disabled={saving}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {saving
                  ? language === "en"
                    ? "Saving..."
                    : "সংরক্ষণ হচ্ছে..."
                  : language === "en"
                  ? "Save All"
                  : "সব সংরক্ষণ করুন"}
              </button>
            </div>
          </div>

          {/* Preview Link */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              {language === "en" ? "Preview" : "প্রিভিউ"}
            </h2>
            <a
              href="/our-clinic/md-message"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {language === "en"
                ? "View MD Message Page"
                : "এমডি মেসেজ পেজ দেখুন"}
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
