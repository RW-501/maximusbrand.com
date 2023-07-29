// Assuming fetchFeaturedProducts() returns an array of featured products
function fetchFeaturedProducts() {
  // Fetch featured products from the server or data source
  return fetch('your-api-url/featured-products')
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching featured products:', error));
}

function displayFeaturedProducts() {
  const featuredProductsSection = document.getElementById('featured-products');

  // Call the fetchFeaturedProducts() function
  fetchFeaturedProducts().then((featuredProducts) => {
    // Create HTML elements for each featured product and append them to the section
    featuredProducts.forEach((product) => {
      const productElement = document.createElement('div');
      // Customize the product element with the product data (image, description, etc.)
      productElement.innerHTML = `<img src="${product.image}" alt="${product.name}">
                                    <p>${product.description}</p>`;
      featuredProductsSection.appendChild(productElement);
    });
  });
}

// Call the displayFeaturedProducts() function to populate the section
displayFeaturedProducts();


// Assuming fetchInstagramFeed() returns an array of Instagram images
function fetchInstagramFeed() {
  // Fetch Instagram images from the server or API
  return fetch('your-api-url/instagram-feed')
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching Instagram feed:', error));
}

function displayInstagramFeed() {
  const instagramFeedSection = document.getElementById('instagram-feed');

  // Call the fetchInstagramFeed() function
  fetchInstagramFeed().then((instagramImages) => {
    // Create HTML elements for each Instagram image and append them to the section
    instagramImages.forEach((image) => {
      const imageElement = document.createElement('img');
      imageElement.src = image.url;
      imageElement.alt = 'Instagram Image';
      instagramFeedSection.appendChild(imageElement);
    });
  });
}

// Call the displayInstagramFeed() function to populate the section
displayInstagramFeed();
