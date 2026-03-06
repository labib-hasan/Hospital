const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hospital-production-c3b0.up.railway.app';

export default async function handler(req, res) {
  try {
    const response = await fetch(`${API_URL}/api/hero-images`);
    const data = await response.json();
    
    if (data.success && data.images) {
      const images = [null, null, null, null];
      data.images.forEach((img, index) => {
        if (index < 4 && img) {
          images[index] = img.image_url;
        }
      });
      res.status(200).json({ images });
    } else {
      res.status(200).json({ images: [null, null, null, null] });
    }
  } catch (error) {
    console.error("Error fetching hero images:", error);
    res.status(200).json({ images: [null, null, null, null] });
  }
}
