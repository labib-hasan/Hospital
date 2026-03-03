const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
    maxFileSize: 10 * 1024 * 1024, // 10MB
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

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        uploadedFile.filepath,
        {
          folder: "md-photo",
          resource_type: "image",
          transformation: [
            { width: 500, height: 500, crop: "fill", gravity: "face" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        }
      );

      // Save to backend database
      const backendResponse = await fetch(`${API_URL}/api/md-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: result.secure_url,
          publicId: result.public_id,
        }),
      });

      const backendData = await backendResponse.json();

      if (backendData.success) {
        return res.status(200).json({
          success: true,
          url: result.secure_url,
        });
      } else {
        // Rollback - delete the uploaded image
        await cloudinary.uploader.destroy(result.public_id);
        return res.status(500).json({ error: "Failed to save image to database" });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      return res.status(500).json({ error: "Image upload failed" });
    }
  });
}

