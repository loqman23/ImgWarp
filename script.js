// Function to load and display images from the img folder
async function loadImages() {
  const gallery = document.getElementById('imageGallery');
  
  try {
    // Get list of files in the img directory
    const response = await fetch('/api/images');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const images = await response.json();
    
    if (images.error) {
      throw new Error(images.error);
    }
    
    if (images.length === 0) {
      gallery.innerHTML = '<p>No images found. Please add some images to the img folder.</p>';
      return;
    }
    
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
      
      // Add error handling for images
      img.onerror = () => {
        img.src = 'https://placehold.co/600x400?text=Image+Not+Found';
        img.alt = 'Image not found';
      };
      
      // Create info section with link
      const info = document.createElement('div');
      info.className = 'image-info';
      
      const link = document.createElement('a');
      link.href = imageUrl;
      link.className = 'image-link';
      link.textContent = image;
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
    gallery.innerHTML = `<p>Error loading images: ${error.message}. Please make sure images are placed in the img folder.</p>`;
  }
}

// Load images when the page loads
document.addEventListener('DOMContentLoaded', loadImages);
