import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dd20ni4kl",
  api_key: process.env.CLOUDINARY_API_KEY || "614819924383186",
  api_secret: process.env.CLOUDINARY_API_SECRET || "13F7yur_2VWTVWGifuHWejsZQdk",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({
    maxFileSize: 10 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        console.error("Formidable error:", err);
        return res.status(400).json({ error: "Invalid form data" });
      }

      const file = files?.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const uploadedFile = Array.isArray(file) ? file[0] : file;

      if (!uploadedFile.mimetype?.startsWith("image/")) {
        return res.status(400).json({ error: "Only image files allowed" });
      }

      const result = await cloudinary.uploader.upload(uploadedFile.filepath, {
        folder: "gallery",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "fill", gravity: "auto" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });

      // Save to JSON file
      const fs = require("fs");
      const path = require("path");
      const dataDir = path.join(process.cwd(), "data");
      
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const galleryPath = path.join(dataDir, "gallery-images.json");
      let existingImages = [];
      
      if (fs.existsSync(galleryPath)) {
        existingImages = JSON.parse(fs.readFileSync(galleryPath, "utf8")).images || [];
      }

      const newImage = {
        id: Date.now().toString(),
        url: result.secure_url,
        publicId: result.public_id,
        uploadedAt: new Date().toISOString(),
      };

      existingImages.unshift(newImage);
      fs.writeFileSync(galleryPath, JSON.stringify({ images: existingImages }, null, 2));

      return res.status(200).json({
        success: true,
        image: newImage,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      return res.status(500).json({ error: "Image upload failed" });
    }
  });
}
