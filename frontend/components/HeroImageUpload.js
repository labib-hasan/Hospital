import { useEffect, useState } from "react";
import HeroButtons from "../components/HeroButtons";
const TOTAL_SLOTS = 4;

export default function HeroImageUpload({ isAdmin = false }) {
  const [images, setImages] = useState(Array(TOTAL_SLOTS).fill(null));

  // Load saved images
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("heroImages"));
    if (saved) setImages(saved);
  }, []);

  // Save images
  useEffect(() => {
    localStorage.setItem("heroImages", JSON.stringify(images));
  }, [images]);

  const handleUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updated = [...images];
      updated[index] = reader.result;
      setImages(updated);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-gray-200">
      <section className="relative h-[80vh] overflow-hidden">
      {/* Slider */}
      <div className="flex h-full w-full overflow-x-auto scroll-smooth snap-x">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative min-w-full h-full snap-center flex items-center justify-center bg-gray-300"
          >
            {img ? (
              <img
                src={img}
                alt={`Hero ${index}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-600">
                <div className="w-24 h-24 border-4 border-dashed border-gray-400 rounded-lg mb-4" />
                <p className="font-semibold">Image Slot {index + 1}</p>
                <p className="text-sm">No image uploaded</p>
              </div>
            )}

            {/* Admin Upload */}
            {isAdmin && (
              <label className="absolute top-4 right-4 bg-white text-blue-600 px-4 py-2 rounded shadow cursor-pointer hover:bg-blue-600 hover:text-white transition">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleUpload(e, index)}
                />
              </label>
            )}
          </div>
          
        ))}
      </div>
       <HeroButtons />
</section>
    </div>
    
    
  );
}
