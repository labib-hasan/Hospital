import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "md-message.json");

  if (!fs.existsSync(filePath)) {
    return res.status(200).json({ 
      title: "Message from Managing Director",
      message: "Welcome to Medical Centre Chattagram. We are committed to providing quality healthcare services to our patients."
    });
  }

  const data = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(data);

  return res.status(200).json(json);
}
