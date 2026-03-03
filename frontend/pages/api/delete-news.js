import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: "News ID is required" });
    }

    const newsPath = path.join(process.cwd(), "data", "news.json");
    
    if (!fs.existsSync(newsPath)) {
      return res.status(404).json({ error: "News not found" });
    }

    // Read existing news
    const fileData = fs.readFileSync(newsPath, "utf8");
    let existingNews = JSON.parse(fileData).news || [];

    // Filter out the news to delete
    const newNewsList = existingNews.filter(n => n.id !== id);

    if (newNewsList.length === existingNews.length) {
      return res.status(404).json({ error: "News not found" });
    }

    // Save to file
    fs.writeFileSync(newsPath, JSON.stringify({ news: newNewsList }, null, 2));

    return res.status(200).json({ 
      success: true, 
      message: "News deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return res.status(500).json({ error: "Failed to delete news: " + error.message });
  }
}
