import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

export default function AdminGallery() {
  const { language } = useLanguage();
  const t = translations[language];
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/get-gallery-images");
      const data = await res.json();
      setImages(data.images || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-gallery-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setImages([data.image, ...images]);
        alert(language === "en" ? "Image uploaded successfully!" : "ছবি সফলভাবে আপলোড হয়েছে!");
      }
    } catch (error) {
      alert(language === "en" ? "Upload failed!" : "আপলোড ব্যর্থ!");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id, publicId) => {
    if (!confirm(language === "en" ? "Delete this image?" : "এই ছবি মুছবেন?")) {
      return;
    }

    try {
      const res = await fetch("/api/delete-gallery-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, publicId }),
      });

      const data = await res.json();

      if (data.success) {
        setImages(images.filter(img => img.id !== id));
        alert(language === "en" ? "Image deleted!" : "ছবি মুছে ফেলা হয়েছে!");
      }
    } catch (error) {
      alert(language === "en" ? "Delete failed!" : "মুছতে ব্যর্থ!");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {language === "en" ? "Photo Gallery Management" : "ফটো গ্যালারি পরিচালনা"}
            </h1>
            
            <label className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
              {uploading 
                ? (language === "en" ? "Uploading..." : "আপলোড হচ্ছে...") 
                : (language === "en" ? "Upload Photo" : "ছবি আপলোড করুন")}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500">
              {language === "en" ? "Loading..." : "লোড হচ্ছে..."}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-lg">
              <p>{language === "en" ? "No images yet" : "কোনো ছবি নেই"}</p>
              <p className="text-sm mt-2">
                {language === "en" ? "Upload your first photo" : "আপনার প্রথম ছবি আপলোড করুন"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative group bg-white rounded-lg overflow-hidden shadow">
                  <img
                    src={img.url}
                    alt="Gallery"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(img.id, img.publicId)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      {language === "en" ? "Delete" : "মুছুন"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <a
              href="/our-clinic/photo-gallery"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {language === "en" ? "View Photo Gallery Page" : "ফটো গ্যালারি পেজ দেখুন"}
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
