const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hospital-production-c3b0.up.railway.app';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { images } = req.body;
  
  if (!images || !Array.isArray(images)) {
    return res.status(400).json({ error: "Invalid images array" });
  }

  try {
    // Update each image in the database by position
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        await fetch(`${API_URL}/api/hero-images/position/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            position: i,
            url: images[i],
            publicId: null
          }),
        });
      }
    }
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving hero images:", error);
    return res.status(500).json({ error: "Failed to save images" });
  }
}
