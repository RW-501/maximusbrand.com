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
});
