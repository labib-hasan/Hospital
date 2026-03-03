import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "contact.json");

  if (!fs.existsSync(filePath)) {
    return res.status(200).json({
      phone: "+880222222222",
      emergencyPhone: "+8809610-818888",
      hotline: "+8809610-818888",
      email: "info@mccht.org",
      address: "Agrabad Access Road, Beside BP Chattogram, Chattogram",
      addressBn: "আগ্রাবাদ অ্যাক্সেস রোড, বিপি চট্টগ্রামের পাশে, চট্টগ্রাম",
      lat: 22.333341,
      lng: 91.831056,
    });
  }

  const data = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(data);

  return res.status(200).json(json);
}
