function loadScreenFunc(){
// Create the <style> element
var styleElement = document.createElement("style");

// Set the CSS styles
var cssStyles = `
  /* CSS styles for the overlay and loader */

  html{
width: 100% !important;
  }
  body{
width: 100% !important;
  }
  
  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 0.5s ease;
    z-index: 9999;
  }

  #loader {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 6px solid #aaaaaa;
    border-top-color: #ff8c00;
    animation: loader-spin 1s infinite linear;
  }

  @keyframes loader-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }

.btnFX {
  /* Default styles */

  transition: background-color 0.3s ease;

  /* Hover effect */
  &:hover {
    background-color: #ff0000;
  }

  /* Click effect */
  &:active {
    transform: scale(0.95);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  /* Custom animation */
  animation: fade-in 0.5s ease-in-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}




    
  }
`;
/*
div.loading-icon {
    color: #646569;
    overflow: visible;
    width: 49px;
    height: 49px;
    max-width: 49px;
    max-height: 49px;
    margin: 0 auto;
    border-radius: 50%;
    border-top-color: #646569;
    border-left-color: #646569;
    border-right-color: #646569;
    box-shadow: 3px 3px 1px #646569;
    -moz-animation: cssload-spin 690ms infinite linear;
    -o-animation: cssload-spin 690ms infinite linear;
    -webkit-animation: cssload-spin 690ms infinite linear;
    animation: cssload-spin 690ms infinite linear;
}

*/
// Set the CSS code as the content of the <style> element
styleElement.textContent = cssStyles;

// Append the <style> element to the <head> section of the document
document.head.appendChild(styleElement);


// Create the overlay div
var overlay = document.createElement("div");
overlay.setAttribute("id", "overlay");

// Create the loader div
var loader = document.createElement("div");
loader.setAttribute("id", "loader");

// Append the loader to the overlay
overlay.appendChild(loader);

// Append the overlay to the body
document.body.appendChild(overlay);

   overlay.classList.add("loaded");


	  	  console.log('Load');




}




	
// Function to remove the overlay with a timer (3 seconds delay)
function removeOverlayWithTimer() {
  setTimeout(function() {
    console.log('removeOverlayWithTimer overlay ???');
    const overlay = document.getElementById('overlay'); // Assuming the overlay element has the ID "overlay"
    if (overlay) {
      overlay.remove();
      overlay.style.display = 'none'; // Hide the overlay if it exists
      console.log('overlay Removed');
    }
    document.documentElement.scrollTop = 0; // For modern browsers
    document.body.scrollTop = 0; // For older browsers
  }, 3000); // Delay in milliseconds before removing the overlay
}

// Function to remove the overlay immediately without a timer
function removeOverlayWithoutTimer() {
  console.log('removeOverlayWithoutTimer overlay ???');
  const overlay = document.getElementById('overlay'); // Assuming the overlay element has the ID "overlay"
  if (overlay) {
    overlay.remove();
    overlay.style.display = 'none'; // Hide the overlay if it exists
    console.log('overlay Removed');
  }
  document.documentElement.scrollTop = 0; // For modern browsers
  document.body.scrollTop = 0; // For older browsers
}

	
loadScreenFunc();
https://www.quizzatopia.com/quiz/?e=New&q=q_194_
function isQuizURL(url) {
  const pattern = /quizzatopia\.com\/quiz\/.*/;
  return pattern.test(url);
}
const currentURL = window.location.href;

if(isQuizURL(currentURL)){
removeOverlayWithoutTimer();	
}else{
removeOverlayWithTimer();
}


// Function to revert images back to normal resolution
function revertImagesToNormalResolution() {
  // Select all <img> elements on the page
  const images = document.querySelectorAll('img');

  // Iterate over each image
  images.forEach(function(image) {
    // Check if the image has a stored original source URL
    if (image.dataset.originalSrc) {
      // Set the original source URL back to the image
      image.src = image.dataset.originalSrc;

      // Clear the data attribute
      delete image.dataset.originalSrc;

      // Log the resolution value
      console.log('Image is high resolution:', image.width, image.height);
    }
  });
}

// Call the function to convert images to low resolution when the page has finished loading
//window.onload = function() {
  convertImagesToLowResolution();
  console.log('Start high resolution: ???');
//};

// Example usage to revert images back to normal resolution after some event
// Call revertImagesToNormalResolution() when needed
// For example, on a button click or after a certain time period
setTimeout(function() {
  revertImagesToNormalResolution();
  console.log('End high resolution: ???');
}, 10000);  // Revert after 5 seconds (adjust the duration as needed)


// Function to convert images to low resolution
function convertImagesToLowResolution() {
  // Select all <img> elements on the page
  const images = document.querySelectorAll('img');

  // Iterate over each image
  images.forEach(function(image) {
    // Store the original source URL in a data attribute
    image.dataset.originalSrc = image.src;

    // Create a new <canvas> element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the image dimensions
    canvas.width = image.width;
    canvas.height = image.height;

    // Create an ImageBitmap object from the original image
    createImageBitmap(image)
      .then(function(bitmap) {
        // Draw the ImageBitmap on the canvas with lower resolution
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        // Set the canvas image data as the new image source
        image.src = canvas.toDataURL();

        // Log the resolution value
        console.log('Image is low resolution:', image.width, image.height);
      })
      .catch(function(error) {
        console.error('Error converting image to low resolution:', error);
      });
  });
}

// Function to revert images back to normal resolution
function revertImagesToNormalResolution() {
  // Select all <img> elements on the page
  const images = document.querySelectorAll('img');

  // Iterate over each image
  images.forEach(function(image) {
    // Check if the image has a stored original source URL
    if (image.dataset.originalSrc) {
      // Set the original source URL back to the image
      image.src = image.dataset.originalSrc;

      // Clear the data attribute
      delete image.dataset.originalSrc;

      // Log the resolution value
      console.log('Image is high resolution:', image.width, image.height);
    }
  });
}




  const firebaseConfig = {
    apiKey: "AIzaSyCqKen8eA5a-kOsNQQ9hXP0kulGOoyR2Bw",
    authDomain: "maximusbrand-4b8a6.firebaseapp.com",
    projectId: "maximusbrand-4b8a6",
    storageBucket: "maximusbrand-4b8a6.appspot.com",
    messagingSenderId: "460951208322",
    appId: "1:460951208322:web:8854076c5c0b0ecd150f9b",
    measurementId: "G-311ZTP24MN"
  };
// Check if the Firebase scripts are loaded
if (typeof firebase !== 'undefined' && typeof firebase.firestore === 'function') {
  // The Firebase scripts are loaded
  // Initialize Firebase and get a reference to the Firestore database
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  
  // Your Firestore code here
    console.log('Firebase found.');

	  // Access the necessary functions
  const auth = firebase.auth();
  const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
  const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
  const createUserWithEmailAndPassword = firebase.auth().createUserWithEmailAndPassword;
  const signInWithPopup = firebase.auth().signInWithPopup;
	
// Enable Firestore offline persistence
firebase.firestore().enablePersistence({ synchronizeTabs: true })
  .catch((err) => {
    console.error("Error enabling Firestore offline persistence:", err);
  });

} else {
  // The Firebase scripts are not loaded
  // Handle the situation accordingly
  console.log('Firebase scripts not found.');

	  const firebaseAppScript = document.createElement('script');
  firebaseAppScript.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js';

  const firestoreScript = document.createElement('script');
  firestoreScript.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js';

  const firebaseAuthScript = document.createElement('script');
  firebaseAuthScript.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js';

  // Append the scripts to the <head> or <body> section of your HTML
  document.head.appendChild(firebaseAppScript);
  document.head.appendChild(firestoreScript);
  document.head.appendChild(firebaseAuthScript);
}

// Function to fetch products from the Firestore database
async function fetchProducts() {
  try {
    const productsCollection = firestore.collection('products');
    const productsSnapshot = await productsCollection.get();
    const products = productsSnapshot.docs.map((doc) => doc.data());
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Function to fetch featured products from the Firestore database
async function fetchFeaturedProducts() {
  try {
    const featuredProductsCollection = firestore.collection('featuredProducts');
    const featuredProductsSnapshot = await featuredProductsCollection.get();
    const featuredProducts = featuredProductsSnapshot.docs.map((doc) => doc.data());
    return featuredProducts;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// Function to fetch blog posts from the Firestore database
async function fetchBlogPosts() {
  try {
    const blogPostsCollection = firestore.collection('blogPosts');
    const blogPostsSnapshot = await blogPostsCollection.get();
    const blogPosts = blogPostsSnapshot.docs.map((doc) => doc.data());
    return blogPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Function to fetch Instagram feed from the Firestore database
async function fetchInstagramFeed() {
  try {
    const instagramFeedCollection = firestore.collection('instagramFeed');
    const instagramFeedSnapshot = await instagramFeedCollection.get();
    const instagramFeed = instagramFeedSnapshot.docs.map((doc) => doc.data());
    return instagramFeed;
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return [];
  }
}

// Function to add a new order to the Firestore database
async function addOrder(orderData) {
  try {
    const ordersCollection = firestore.collection('orders');
    await ordersCollection.add(orderData);
    console.log('Order added successfully.');
  } catch (error) {
    console.error('Error adding order:', error);
  }
}

// Function to handle the checkout process and payment (using Stripe)
function handleCheckout() {
  // Implement your checkout process here, integrating with Stripe for payment
  // You can use the Stripe API or a library like Stripe.js to handle the payment
  // Upon successful payment, call the addOrder function to add the order to the database
  const orderData = {
    // Include order details (e.g., products, total amount, customer information)
  };
  addOrder(orderData);
}

// Function to fetch products and update the featured products section on the Home Page
async function updateFeaturedProducts() {
  const featuredProducts = await fetchFeaturedProducts();

  // Implement code to update the featured products section on the Home Page
  // (e.g., create HTML elements dynamically and display the featured products)
}

// Function to fetch Instagram feed and update the Instagram section on the Home Page
async function updateInstagramFeed() {
  const instagramFeed = await fetchInstagramFeed();

  // Implement code to update the Instagram section on the Home Page
  // (e.g., create HTML elements dynamically and display the Instagram feed)
}

// Function to fetch blog posts and update the Blog Page
async function updateBlogPage() {
  const blogPosts = await fetchBlogPosts();

  // Implement code to update the Blog Page
  // (e.g., create HTML elements dynamically and display the blog posts)
}

// Function to fetch products and update the Product Catalog Page
async function updateProductCatalogPage() {
  const products = await fetchProducts();

  // Implement code to update the Product Catalog Page
  // (e.g., create HTML elements dynamically and display the products)
}

// Function to fetch product details and update the Product Detail Page
async function updateProductDetailPage(productId) {
  // Implement code to fetch product details based on the productId
  // (e.g., query the Firestore database for the specific product)
  const product = { /* Product details fetched from the database */ };

  // Implement code to update the Product Detail Page with the product details
}

// Function to fetch cart items and update the Cart Page
async function updateCartPage() {
  // Implement code to fetch cart items from the user's cart in the database
  // (e.g., query the Firestore database based on the user's ID)

  // Implement code to update the Cart Page with the cart items
}

// Function to handle adding a product to the cart
function addToCart(productId) {
  // Implement code to add the product to the user's cart in the database
  // (e.g., update the Firestore database with the selected product and the user's ID)
}

// Function to handle removing a product from the cart
function removeFromCart(productId) {
  // Implement code to remove the product from the user's cart in the database
  // (e.g., delete the Firestore document representing the cart item)
}

// Function to handle the checkout process and payment (using Stripe)
function handleCheckout() {
  // Implement your checkout process here, integrating with Stripe for payment
  // You can use the Stripe API or a library like Stripe.js to handle the payment
  // Upon successful payment, call the addOrder function to add the order to the database
  const orderData = {
    // Include order details (e.g., products, total amount, customer information)
  };
  addOrder(order



function slideIn(xxx,zzz) {
  var myDiv = document.getElementById(xxx);
	if(zzz === "right"){
  var keyframes = [
    { transform: "translateX(100%)" },
    { transform: "translateX(0)" }
  ];

	}else{
  var keyframes = [
    { transform: "translateX(-100%)" },
    { transform: "translateX(0)" }
  ];

	}
  var options = {
    duration: 500,
    easing: "ease"
  };
  myDiv.animate(keyframes, options);
}

function slideOut(xxx,zzz) {
  var myDiv = document.getElementById(xxx);
		if(zzz === "right"){
  var keyframes = [
    { transform: "translateX(0)" },
    { transform: "translateX(100%)" }
  ];
		}else{
  var keyframes = [
    { transform: "translateX(0)" },
    { transform: "translateX(-100%)" }
  ];
		}
  var options = {
    duration: 500,
    easing: "ease"
  };
  myDiv.animate(keyframes, options);
}


// Reusable popup function
function showPopup(content) {
  // Create the overlay div
  var overlay = document.createElement('div');
  overlay.setAttribute('id', 'popup-overlay');

  // Create the popup container
  var popupContainer = document.createElement('div');
  popupContainer.setAttribute('id', 'popup-container');

  // Create the popup content
  var popupContent = document.createElement('div');
  popupContent.setAttribute('id', 'popup-content');
  popupContent.innerHTML = content;

  // Append the content to the popup container
  popupContainer.appendChild(popupContent);

  // Append the popup container to the overlay
  overlay.appendChild(popupContainer);

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Close the popup when clicking outside the content
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closePopup();
    }
  });

  // Function to close the popup
  function closePopup() {
    document.body.removeChild(overlay);
  }
}








// Function to show global error message
function showErrorBar(message, errorCode) {
  const errorBar = document.getElementById('error-bar');
  if (!errorBar) {
    // Create the error bar if it doesn't exist
    const errorBarDiv = document.createElement('div');
    errorBarDiv.setAttribute('id', 'error-bar');
    document.body.appendChild(errorBarDiv);
  }

  const errorBarContent = document.createElement('div');
  errorBarContent.setAttribute('id', 'error-bar-content');

  const errorMessage = document.createElement('span');
  errorMessage.textContent = message;

  const errorCodeSpan = document.createElement('span');
  errorCodeSpan.textContent = `Error Code: ${errorCode}`;

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.onclick = function () {
    hideErrorBar();
  };

  errorBarContent.appendChild(errorMessage);
  errorBarContent.appendChild(errorCodeSpan);
  errorBarContent.appendChild(closeButton);

  errorBar.innerHTML = ''; // Clear previous content
  errorBar.appendChild(errorBarContent);
}

// Function to hide global error message bar
function hideErrorBar() {
  const errorBar = document.getElementById('error-bar');
  if (errorBar) {
    errorBar.style.display = 'none';
  }
}
