document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchQuery = document.getElementById('search-input').value.trim();
  searchNASAImages(searchQuery);
});

function searchNASAImages(keyword, limit = 24) {
  const API_KEY = 'BdSXptyeUVgoqae6BK8sqZagbK6fQqNmFKUX5Q6V';
  const API_URL = `https://images-api.nasa.gov/search?title=${keyword}&media_type=image&page=1&page_size=${limit}`;
  
  fetch(API_URL)
      .then(response => response.json())
      .then(data => {
          displayImages(data.collection.items);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

function displayImages(items) {
  const imagesContainer = document.getElementById('images-container');
  imagesContainer.innerHTML = '';

  items.forEach(item => {
      const imageUrl = item.links[0].href;
      const title = item.data[0].title;

      const imageItem = document.createElement('div');
      imageItem.classList.add('image-item');

      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = title;

      const imageTitle = document.createElement('h3');
      imageTitle.textContent = title;

      imageItem.appendChild(image);
      imageItem.appendChild(imageTitle);

      imagesContainer.appendChild(imageItem);
  });
}