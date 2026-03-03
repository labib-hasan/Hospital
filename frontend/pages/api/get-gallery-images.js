const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  try {
    const response = await fetch(`${API_URL}/api/gallery`);
    const data = await response.json();
    
    if (data.success) {
      // Transform backend data to match frontend expected format
      const images = data.images.map(item => ({
        id: item.id,
        url: item.url,
        publicId: item.public_id,
        title: item.title || '',
        createdAt: item.created_at,
        uploadedAt: item.created_at
      }));
      return res.status(200).json({ images });
    } else {
      return res.status(200).json({ images: [] });
    }
  } catch (error) {
    console.error('Error fetching gallery images from backend:', error);
    return res.status(200).json({ images: [] });
  }
}

