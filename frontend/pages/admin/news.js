import { useState, useEffect, useRef } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

export default function AdminNews() {
  const { language } = useLanguage();
  const t = translations[language];
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/get-news");
      const data = await res.json();
      setNews(data.news || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/upload-news-image", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();

      if (data.success) {
        setFormData({ ...formData, image: data.imageUrl });
        alert(language === "en" ? "Image uploaded successfully!" : "ছবি সফলভাবে আপলোড হয়েছে!");
      }
    } catch (error) {
      alert(language === "en" ? "Image upload failed!" : "ছবি আপলোড ব্যর্থ!");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      alert(language === "en" ? "Please fill in all required fields" : "অনুগ্রহ করে সব প্রয়োজনীয় ফিল্ড পূরণ করুন");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/save-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingId,
          title: formData.title,
          content: formData.content,
          image: formData.image,
        }),
      });

      const data = await res.json();
      console.log("Save response:", data);

      if (data.success) {
        alert(language === "en" ? "News saved successfully!" : "খবর সফলভাবে সংরক্ষিত হয়েছে!");
        setFormData({ title: "", content: "", image: "" });
        setShowForm(false);
        setEditingId(null);
        fetchNews();
      } else {
        alert(data.error || (language === "en" ? "Failed to save news!" : "খবর সংরক্ষণ ব্যর্থ!"));
      }
    } catch (error) {
      console.error("Error saving news:", error);
      alert(language === "en" ? "Failed to save news!" : "খবর সংরক্ষণ ব্যর্থ!");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      content: item.content,
      image: item.image || "",
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm(language === "en" ? "Delete this news?" : "এই খবর মুছবেন?")) {
      return;
    }

    try {
      const res = await fetch("/api/delete-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        alert(language === "en" ? "News deleted!" : "খবর মুছে ফেলা হয়েছে!");
        fetchNews();
      }
    } catch (error) {
      alert(language === "en" ? "Delete failed!" : "মুছতে ব্যর্থ!");
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", content: "", image: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {language === "en" ? "News Management" : "খবর পরিচালনা"}
            </h1>
            
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {language === "en" ? "Add News" : "খবর যোগ করুন"}
            </button>
          </div>

          {/* News Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                  {editingId 
                    ? (language === "en" ? "Edit News" : "খবর সম্পাদনা") 
                    : (language === "en" ? "Add News" : "খবর যোগ করুন")}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      {language === "en" ? "Headline *" : "শিরোনাম *"}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      {language === "en" ? "Content *" : "বিষয়বস্তু *"}
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="6"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      {language === "en" ? "Image" : "ছবি"}
                    </label>
                    
                    {/* Image Preview */}
                    {formData.image && (
                      <div className="mb-3 relative inline-block">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="h-32 w-auto rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    
                    {/* Upload Button */}
                    <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                      <div className="text-center">
                        {uploading ? (
                          <span className="text-blue-600">
                            {language === "en" ? "Uploading..." : "আপলোড হচ্ছে..."}
                          </span>
                        ) : (
                          <>
                            <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="mt-1 block text-sm text-gray-600">
                              {language === "en" ? "Click to upload image" : "ছবি আপলোড করতে ক্লিক করুন"}
                            </span>
                          </>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      {language === "en" ? "Cancel" : "বাতিল"}
                    </button>
                    <button
                      type="submit"
                      disabled={saving || uploading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {saving 
                        ? (language === "en" ? "Saving..." : "সংরক্ষণ হচ্ছে...") 
                        : (language === "en" ? "Save" : "সংরক্ষণ")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* News List */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">
              {language === "en" ? "Loading..." : "লোড হচ্ছে..."}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-lg">
              <p>{language === "en" ? "No news yet" : "কোনো খবর নেই"}</p>
              <p className="text-sm mt-2">
                {language === "en" ? "Add your first news" : "আপনার প্রথম খবর যোগ করুন"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {news.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 shadow flex gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {item.content}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {language === "en" ? "Edit" : "সম্পাদনা"}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
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
              href="/news"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {language === "en" ? "View News Page" : "খবর পেজ দেখুন"}
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
