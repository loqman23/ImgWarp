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
      console.log('Image directory exists at:', imgDir);
    } catch {
      console.log('Creating image directory at:', imgDir);
      await fs.mkdir(imgDir);
    }
    
    // Read directory contents
    const files = await fs.readdir(imgDir);
    console.log('Found files in image directory:', files);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    console.log('Filtered image files:', imageFiles);
    
    if (imageFiles.length === 0) {
      console.log('No image files found in directory');
      res.status(404).json({ error: 'No images found in directory' });
      return;
    }
    
    res.json(imageFiles);
  } catch (error) {
    console.error('Error reading image directory:', error);
    res.status(500).json({ error: 'Failed to read image directory' });
  }
});

// Add a route to check if an image exists
app.get('/img/:filename', async (req, res, next) => {
  try {
    const imgPath = path.join(__dirname, 'img', req.params.filename);
    await fs.access(imgPath);
    next(); // File exists, continue to static middleware
  } catch {
    console.error('Image not found:', req.params.filename);
    res.status(404).send('Image not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Images should be placed in: ${path.join(__dirname, 'img')}`);
});
