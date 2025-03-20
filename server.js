const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

// API endpoint to get list of images
app.get('/api/images', async (req, res) => {
  try {
    const imgDir = path.join(__dirname, 'img');
    
    // Create img directory if it doesn't exist
    try {
      await fs.access(imgDir);
    } catch {
      await fs.mkdir(imgDir);
    }
    
    // Read directory contents
    const files = await fs.readdir(imgDir);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    res.json(imageFiles);
  } catch (error) {
    console.error('Error reading image directory:', error);
    res.status(500).json({ error: 'Failed to read image directory' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});