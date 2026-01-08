import cloudinary from "cloudinary";
import formidable from "formidable";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Form parse error" });
    }

    const file = files.file[0];

    try {
      const result = await cloudinary.v2.uploader.upload(file.filepath, {
        folder: "hero-slider",
      });

      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      return res.status(500).json({ error: "Cloudinary upload failed" });
    }
  });
}
