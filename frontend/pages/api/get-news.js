import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "news.json");

  if (!fs.existsSync(filePath)) {
    return res.status(200).json({ news: [] });
  }

  const data = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(data);

  return res.status(200).json(json);
}
