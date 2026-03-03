import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, content, image, id } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const dataDir = path.join(process.cwd(), "data");
    const newsPath = path.join(dataDir, "news.json");
    
    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing news
    let existingNews = [];
    if (fs.existsSync(newsPath)) {
      const fileData = fs.readFileSync(newsPath, "utf8");
      existingNews = JSON.parse(fileData).news || [];
    }

    if (id) {
      // Update existing news
      const index = existingNews.findIndex(n => n.id === id);
      if (index !== -1) {
        existingNews[index] = {
          ...existingNews[index],
          title,
          content,
          image: image || existingNews[index].image,
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      // Create new news
      const newNews = {
        id: Date.now().toString(),
        title,
        content,
        image: image || "",
        createdAt: new Date().toISOString()
      };
      existingNews.unshift(newNews);
    }

    // Save to file
    fs.writeFileSync(newsPath, JSON.stringify({ news: existingNews }, null, 2));

    return res.status(200).json({ 
      success: true, 
      message: id ? "News updated successfully" : "News created successfully" 
    });
  } catch (error) {
    console.error("Error saving news:", error);
    return res.status(500).json({ error: "Failed to save news: " + error.message });
  }
}
