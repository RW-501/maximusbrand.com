// Main JavaScript (main.js)

// Function to add new product to the Firestore database
function addNewProductToDatabase(name, description, price, category) {
  // Assuming you have already initialized Firebase and Firestore
  const productsCollection = firebase.firestore().collection('products');

  // Add the product to Firestore
  productsCollection.add({
    name: name,
    description: description,
    price: price,
    category: category
  })
  .then((docRef) => {
    console.log('Product added with ID:', docRef.id);
    // Clear the form fields after successful product addition
    document.getElementById('product-name').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-category').value = '';
  })
  .catch((error) => {
    console.error('Error adding product:', error);
  });
}

// Function to fetch and display existing products from Firestore
function displayExistingProducts() {
  const existingProductsContainer = document.getElementById('existing-products');

  // Clear the container before adding products (to avoid duplicates)
  existingProductsContainer.innerHTML = '';

  // Assuming you have already initialized Firebase and Firestore
  const productsCollection = firebase.firestore().collection('products');

  // Fetch products from Firestore and display them
  productsCollection.get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const productData = doc.data();

      // Create a div to display each product
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      // Add product details to the div
      const productNameHeading = document.createElement('h3');
      productNameHeading.textContent = productData.name;

      const productDescriptionParagraph = document.createElement('p');
      productDescriptionParagraph.textContent = productData.description;

      const productPriceParagraph = document.createElement('p');
      productPriceParagraph.textContent = `Price: $${productData.price.toFixed(2)}`;

      const productCategoryParagraph = document.createElement('p');
      productCategoryParagraph.textContent = `Category: ${productData.category}`;

      // Add Edit and Delete buttons to each product
      const editButton = document.createElement('button');
      editButton.classList.add('edit-product-btn');
      editButton.textContent = 'Edit';
      editButton.dataset.productId = doc.id;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-product-btn');
      deleteButton.textContent = 'Delete';
      deleteButton.dataset.productId = doc.id;

      // Append elements to the product div
      productDiv.appendChild(productNameHeading);
      productDiv.appendChild(productDescriptionParagraph);
      productDiv.appendChild(productPriceParagraph);
      productDiv.appendChild(productCategoryParagraph);
      productDiv.appendChild(editButton);
      productDiv.appendChild(deleteButton);

      // Append the product div to the container
      existingProductsContainer.appendChild(productDiv);
    });
  })
  .catch((error) => {
    console.error('Error fetching products:', error);
  });
}

// Main JavaScript (main.js)

// Function to update an existing product in the Firestore database
function updateProductInDatabase(productId, updatedProductData) {
  // Assuming you have already initialized Firebase and Firestore
  const productsCollection = firebase.firestore().collection('products');

  // Update the product in Firestore
  productsCollection.doc(productId).update(updatedProductData)
    .then(() => {
      console.log('Product updated successfully.');
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });
}

// Function to delete a product from the Firestore database
function deleteProductFromDatabase(productId) {
  // Assuming you have already initialized Firebase and Firestore
  const productsCollection = firebase.firestore().collection('products');

  // Delete the product from Firestore
  productsCollection.doc(productId).delete()
    .then(() => {
      console.log('Product deleted successfully.');
    })
    .catch((error) => {
      console.error('Error deleting product:', error);
    });
}

// Event listener for submitting the Add Product form
document.getElementById('add-product-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const productName = document.getElementById('product-name').value;
  const productDescription = document.getElementById('product-description').value;
  const productPrice = parseFloat(document.getElementById('product-price').value);
  const productCategory = document.getElementById('product-category').value;

  // Call the function to add the new product to the database
  addNewProductToDatabase(productName, productDescription, productPrice, productCategory);
});

// Event listener for dynamically added Edit and Delete buttons
document.getElementById('existing-products').addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-product-btn')) {
    // Get the product ID associated with the Edit button
    const productId = event.target.dataset.productId;

    // Fetch the existing product data from Firestore
    // (Optional: You may want to display the existing data in the Add Product form for editing)
    // You can use a separate function to fetch the data based on productId.

    // Example:
    // productsCollection.doc(productId).get()
    //   .then((doc) => {
    //     const productData = doc.data();
    //     // Populate the form with existing data for editing
    //     document.getElementById('product-name').value = productData.name;
    //     document.getElementById('product-description').value = productData.description;
    //     document.getElementById('product-price').value = productData.price;
    //     document.getElementById('product-category').value = productData.category;
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching product data for editing:', error);
    //   });

  } else if (event.target.classList.contains('delete-product-btn')) {
    // Get the product ID associated with the Delete button
    const productId = event.target.dataset.productId;

    // Call the function to delete the product from the database
    deleteProductFromDatabase(productId);
  }
});

// Call the function to display existing products on page load
displayExistingProducts();




// Main JavaScript (main.js)

// Function to authenticate admin users with email and password
function loginAdminUser(email, password) {
  // Assuming you have already initialized Firebase and Firebase Auth
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Admin user logged in successfully.');
      // Redirect to the admin dashboard page or update UI as needed
    })
    .catch((error) => {
      console.error('Error logging in:', error);
      // Display error message to the user, e.g., in the error bar
    });
}

// Event listener for submitting the Login form
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Call the function to login the admin user
  loginAdminUser(email, password);
});

