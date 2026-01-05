import { useEffect, useState } from "react";
import HeroButtons from "../components/HeroButtons";

const TOTAL_SLOTS = 4;

export default function HeroImageUpload({ isAdmin = false }) {
  const [images, setImages] = useState(Array(TOTAL_SLOTS).fill(null));

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("heroImages"));
    if (saved) setImages(saved);
  }, []);

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
    <section className="relative w-full bg-gray-200">

      {/* HERO SLIDER */}
      <div className="relative h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <div className="flex overflow-x-auto scroll-smooth snap-x h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative min-w-full snap-center flex items-center justify-center bg-gray-300"
            >
              {img ? (
                <img
                  src={img}
                  alt={`Hero ${index}`}
                  className="
    h-full           /* ✅ height always full */
    w-auto           /* ✅ width flexible */
    object-cover     /* ✅ width can crop */
    max-w-none       /* ✅ prevent forced shrink */
  "
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-600">
                  <div className="w-24 h-24 border-4 border-dashed border-gray-400 rounded-lg mb-4" />
                  <p className="font-semibold">Image Slot {index + 1}</p>
                  <p className="text-sm">No image uploaded</p>
                </div>
              )}

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

        {/* ✅ HERO BUTTONS – ALWAYS VISIBLE */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center">
          <HeroButtons />
        </div>
      </div>

    </section>
  );
}
