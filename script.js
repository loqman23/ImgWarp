// Function to load and display images from the img folder
async function loadImages() {
  const gallery = document.getElementById('imageGallery');
  
  try {
    // Get list of files in the img directory
    const response = await fetch('/api/images');
    const images = await response.json();
    
    images.forEach(image => {
      const imageUrl = `/img/${image}`;
      
      // Create image card
      const card = document.createElement('div');
      card.className = 'image-card';
      
      // Create image element
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = image;
      img.loading = 'lazy';
      
      // Create info section with link
      const info = document.createElement('div');
      info.className = 'image-info';
      
      const link = document.createElement('a');
      link.href = imageUrl;
      link.className = 'image-link';
      link.textContent = imageUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      
      // Assemble the card
      info.appendChild(link);
      card.appendChild(img);
      card.appendChild(info);
      gallery.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading images:', error);
    gallery.innerHTML = '<p>Error loading images. Please make sure images are placed in the img folder.</p>';
  }
}

// Load images when the page loads
document.addEventListener('DOMContentLoaded', loadImages);