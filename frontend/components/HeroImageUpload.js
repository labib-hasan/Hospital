import { useEffect, useState, useRef } from "react";
import HeroButtons from "../components/HeroButtons";

const TOTAL_SLOTS = 4;

export default function HeroImageUpload({ isAdmin = false }) {
  const [images, setImages] = useState(Array(TOTAL_SLOTS).fill(null));
  const [publicIds, setPublicIds] = useState(Array(TOTAL_SLOTS).fill(null));
  const sliderRef = useRef(null);

 useEffect(() => {
  fetch("/api/get-hero")
    .then((res) => res.json())
    .then((data) => {
      if (data.images) setImages(data.images);
    });
}, []);

 useEffect(() => {
  const interval = setInterval(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScrollLeft) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += slider.clientWidth;
      }
    }
  }, 3000);

  return () => clearInterval(interval);
}, []);


 

 const handleUpload = async (e, index) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const uploadRes = await fetch("/api/upload-hero", {
    method: "POST",
    body: formData,
  });

  const uploadData = await uploadRes.json();

  const updated = [...images];
  updated[index] = uploadData.url;
  setImages(updated);

  // Update public IDs
  const updatedPublicIds = [...publicIds];
  updatedPublicIds[index] = uploadData.publicId || uploadData.publicId;
  setPublicIds(updatedPublicIds);

  // save to server with both image URLs and public IDs
  await fetch("/api/save-hero", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      images: updated,
      publicIds: updatedPublicIds
    }),
  });
};



  return (
    <section className="relative w-full bg-gray-200">

      {/* HERO SLIDER */}
      <div className="relative h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <div ref={sliderRef} className="flex overflow-x-auto scroll-smooth snap-x h-full scrollbar-hide">
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
