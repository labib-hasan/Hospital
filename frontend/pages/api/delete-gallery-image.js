import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dd20ni4kl",
  api_key: process.env.CLOUDINARY_API_KEY || "614819924383186",
  api_secret: process.env.CLOUDINARY_API_SECRET || "13F7yur_2VWTVWGifuHWejsZQdk",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id, publicId } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Image ID required" });
    }

    // Delete from Cloudinary if publicId exists
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Remove from JSON file
    const dataDir = path.join(process.cwd(), "data");
    const galleryPath = path.join(dataDir, "gallery-images.json");

    if (fs.existsSync(galleryPath)) {
      const data = JSON.parse(fs.readFileSync(galleryPath, "utf8"));
      const images = (data.images || []).filter(img => img.id !== id);
      fs.writeFileSync(galleryPath, JSON.stringify({ images }, null, 2));
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Delete failed:", error);
    return res.status(500).json({ error: "Delete failed" });
  }
}
