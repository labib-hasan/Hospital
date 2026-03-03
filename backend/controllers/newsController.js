import News from "../models/News.js";

export const getAllNews = async (req, res) => {
  try {
    const news = await News.getAll();
    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const news = await News.getById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, message: "News not found" });
    }
    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        message: "Title and content are required" 
      });
    }

    const newsId = await News.create({ title, content, image });
    res.status(201).json({ 
      success: true, 
      message: "News created successfully", 
      newsId 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const { id } = req.params;

    const existingNews = await News.getById(id);
    if (!existingNews) {
      return res.status(404).json({ success: false, message: "News not found" });
    }

    await News.update(id, { title, content, image });
    res.json({ success: true, message: "News updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const existingNews = await News.getById(id);
    if (!existingNews) {
      return res.status(404).json({ success: false, message: "News not found" });
    }

    await News.delete(id);
    res.json({ success: true, message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
