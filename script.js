

document.addEventListener("DOMContentLoaded", () => {
    // Sample JSON data for gallery images (replace with your actual image URLs)
    // Function to achieve a random-like sort using the sort() method
function randomLikeSort(a, b) {
    return Math.random() - 0.5; // Returns a random number between -0.5 and 0.5
}

    const imageGalleryHomeData = [
        "/gallery/1.jpeg",
        "/gallery/2.jpg",
        "/gallery/3.jpg",
        "/gallery/4.jpg",
        "/gallery/5.jpg",
        "/gallery/6.jpg",
        "/gallery/7.jpg",
        "/gallery/8.jpg",
        "/gallery/9.jpg",
        "/gallery/10.jpg",
        "/gallery/11.jpg",
        "/gallery/12.jpg",
        "/gallery/13.jpg",
        "/gallery/14.jpg",
        "/gallery/15.jpg",
     
        // Add more image URLs here
    ];



       imageGalleryHomeData.sort(randomLikeSort);

    const imageGalleryHome = document.getElementById("imageGalleryHome");

    imageGalleryHomeData.forEach((imageHomeUrl ,index) => {
        const imageHomeCard = document.createElement("div");
        imageHomeCard.classList.add("image-card");
        imageHomeCard.addEventListener("click", () => openModal(imageHomeUrl, index));

        const imageHome = document.createElement("img");
        imageHome.src = imageHomeUrl;
        imageHome.alt = "Gallery Image";

        imageHomeCard.appendChild(imageHome);
        imageGalleryHome.appendChild(imageHomeCard);
    });



    // Sample JSON data for gallery images (replace with your actual image URLs)
    const imageGalleryData = [
        "/gallery/16.jpg",
        "/gallery/17.jpg",
        "/gallery/18.jpg",
        "/gallery/19.jpg",
        "/gallery/20.jpg",
        "/gallery/21.jpg",
        "/gallery/22.jpg",
        "/gallery/23.jpg",
        "/gallery/24.jpg",
        "/gallery/25.jpg",
        "/gallery/26.jpg",
        "/gallery/27.jpg",
        "/gallery/28.jpg",
        "/gallery/29.jpg",
        "/gallery/30.jpg",

    ];
       imageGalleryData.sort(randomLikeSort);

    const imageGallery = document.getElementById("imageGallery");

    imageGalleryData.forEach((imageUrl ,index) => {
        const imageCard = document.createElement("div");
        imageCard.classList.add("image-card");
        imageCard.addEventListener("click", () => openModal(imageUrl, index));

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
// Custom comparison function to sort by price then name
function compareProducts(a, b) {
    const priceA = parseFloat(a.price.replace("$", ""));
    const priceB = parseFloat(b.price.replace("$", ""));

    // Sort by price
    if (priceA < priceB) {
        return -1;
    }
    if (priceA > priceB) {
        return 1;
    }

    // If prices are equal, sort by name
    return a.name.localeCompare(b.name);
}

// Sort the productsData array using the custom comparison function
productsData.sort(compareProducts);
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

 

    // Sample JSON data for about section
    const aboutText = "Maximus Brand, a dynamic Clothing and Accessories subsidiary of TechNoob, is committed to offering high-quality and fashionable products that cater to the unique fashion sense of our customers. From casual wear to formal attire, we offer a wide range of clothing and accessories suitable for any occasion. Stay up-to-date with our latest collections and releases by visiting our website, MaximusBrand.com. Experience the epitome of style and comfort with Maximus Brand.";

    // Populate About Us text using JSON
    const aboutParagraph = document.getElementById("aboutText");
    aboutParagraph.textContent = aboutText;

    // Rest of your code...

    function openModal(imageUrl, index) {
        const modal = document.getElementById("imageModal");
        const modalImage = document.getElementById("modalImage");
        const closeButton = document.querySelector(".close-button");

        modalImage.src = imageUrl;
        modal.style.display = "block";

        closeButton.addEventListener("click", closeModal);
    }

        function closeModal() {
            modal.style.display = "none";
            closeButton.removeEventListener("click", closeModal);
        }


    
});
