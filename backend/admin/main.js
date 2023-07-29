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

// Event listener
