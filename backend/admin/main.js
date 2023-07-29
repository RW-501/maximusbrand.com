// Main JavaScript (main.js)

// Function to upload an image to Firebase Storage
function uploadImageToStorage(file) {
  // Assuming you have already initialized Firebase and Firebase Storage
  const storageRef = firebase.storage().ref();

  // Generate a unique ID for the image (you can use the filename or any other method)
  const imageId = new Date().getTime().toString();

  // Upload the image to Firebase Storage with the unique ID
  const imageRef = storageRef.child(`gallery_images/${imageId}`);
  imageRef.put(file)
    .then((snapshot) => {
      console.log('Image uploaded successfully.');
      // Call the function to update the image gallery in the UI
      displayImageGallery();
    })
    .catch((error) => {
      console.error('Error uploading image:', error);
      // Display error message to the user, e.g., in the error bar
    });
}

// Function to delete an image from Firebase Storage
function deleteImageFromStorage(imageId) {
  // Assuming you have already initialized Firebase and Firebase Storage
  const storageRef = firebase.storage().ref();

  // Delete the image from Firebase Storage
  const imageRef = storageRef.child(`gallery_images/${imageId}`);
  imageRef.delete()
    .then(() => {
      console.log('Image deleted successfully.');
      // Call the function to update the image gallery in the UI
      displayImageGallery();
    })
    .catch((error) => {
      console.error('Error deleting image:', error);
      // Display error message to the user, e.g., in the error bar
    });
}

// Function to fetch and display images in the gallery
function displayImageGallery() {
  const imageGalleryContainer = document.getElementById('image-gallery');

  // Clear the container before adding images (to avoid duplicates)
  imageGalleryContainer.innerHTML = '';

  // Assuming you have already initialized Firebase and Firebase Storage
  const storageRef = firebase.storage().ref();

  // Fetch images from Firebase Storage and display them
  storageRef.child('gallery_images').listAll()
    .then((res) => {
      res.items.forEach((item) => {
        // Create a div to display each image in the gallery
        const galleryImageDiv = document.createElement('div');
        galleryImageDiv.classList.add('gallery-image');

        // Create an img element for the image
        const image = document.createElement('img');
        image.src = item.getDownloadURL();
        // Set the alt attribute if needed
        image.alt = 'Gallery Image';

        // Add Delete button to each image
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-image-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.imageId = item.name;

        // Append the image and Delete button to the gallery image div
        galleryImageDiv.appendChild(image);
        galleryImageDiv.appendChild(deleteButton);

        // Append the gallery image div to the container
        imageGalleryContainer.appendChild(galleryImageDiv);
      });
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
    });
}

// Event listener for submitting the Upload Image form
document.getElementById('upload-image-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the selected file from the input
  const imageFile = document.getElementById('image-upload').files[0];

  // Call the function to upload the image to Firebase Storage
  uploadImageToStorage(imageFile);
});

// Event listener for dynamically added Delete buttons in the gallery
document.getElementById('image-gallery').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-image-btn')) {
    // Get the image ID associated with the Delete button
    const imageId = event.target.dataset.imageId;

    // Call the function to delete the image from Firebase Storage
    deleteImageFromStorage(imageId);
  }
});

// Call the function to display images in the gallery on page load
displayImageGallery();
