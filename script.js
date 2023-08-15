document.addEventListener("DOMContentLoaded", () => {
    // Sample JSON data for gallery images (replace with your actual image URLs)
    const galleryData = [
        "placeholder-image1.jpg",
        "placeholder-image2.jpg",
        "placeholder-image3.jpg",
        // Add more image URLs here
    ];

    const imageGallery = document.getElementById("imageGallery");

    galleryData.forEach(imageUrl => {
        const imageCard = document.createElement("div");
        imageCard.classList.add("image-card");

        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = "Gallery Image";

        imageCard.appendChild(image);
        imageGallery.appendChild(imageCard);
    });

    // Sample JSON data for products
    const productsData = [
        {
            name: "Product 1",
            image: "product1.jpg",
            description: "Product 1 description goes here.",
            price: "$49.99"
        },
        {
            name: "Product 2",
            image: "product2.jpg",
            description: "Product 2 description goes here.",
            price: "$39.99"
        },
        // Add more product data here
    ];

    const productGrid = document.getElementById("productGrid");

    productsData.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <button class="view-details">View Details</button>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners for product detail popups
    const viewDetailButtons = document.querySelectorAll(".view-details");
    viewDetailButtons.forEach((button, index) => {
        button.addEventListener("click", () => openProductPopup(productsData[index]));
    });

    // Function to open product detail popup
    function openProductPopup(product) {
        // Implement your popup logic here
        console.log("Open product popup:", product);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    // Sample JSON data for about section
    const aboutText = "Maximus Brand, a dynamic Clothing and Accessories subsidiary of TechNoob, is committed to offering high-quality and fashionable products that cater to the unique fashion sense of our customers. From casual wear to formal attire, we offer a wide range of clothing and accessories suitable for any occasion. Stay up-to-date with our latest collections and releases by visiting our website, MaximusBrand.com. Experience the epitome of style and comfort with Maximus Brand.";

    // Populate About Us text using JSON
    const aboutParagraph = document.getElementById("aboutText");
    aboutParagraph.textContent = aboutText;

    // Rest of your code...
});

