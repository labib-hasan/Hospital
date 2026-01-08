import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data/heroImages.json");

  if (req.method === "POST") {
    const { images } = req.body;

    fs.writeFileSync(filePath, JSON.stringify({ images }, null, 2));
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}
