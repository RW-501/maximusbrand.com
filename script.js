

    // Sample JSON data for gallery images (replace with your actual image URLs)
    // Function to achieve a random-like sort using the sort() method
function randomLikeSort(a, b) {
    const randomValue = Math.random() - 0.5;
  //  console.log(`Comparing ${a} and ${b}. Random value: ${randomValue}`);
    return randomValue;
}

// Prefix for the image URLs
const imageUrlPrefix = "https://www.maximusbrand.com";

// Update imageGalleryHomeData with the prefix
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
    "/gallery/13.jpg",
    "/gallery/14.jpg",
    "/gallery/15.jpg",
].map(imageUrl => imageUrlPrefix + imageUrl);

// Update imageGalleryData with the prefix

var count = 0;

function displayHomeGallery() {
    console.log("Displaying Home Gallery");

    const imageGalleryHome = document.getElementById("imageGalleryHome");
    imageGalleryHomeData.sort(randomLikeSort);

    let loadedCount = 0; // Counter to track loaded images
    

    imageGalleryHomeData.forEach((imageHomeUrl, index) => {
        const imageHomeCard = document.createElement("div");
        imageHomeCard.classList.add("image-card");
        imageHomeCard.addEventListener("click", () => openModal(imageHomeUrl, index));

        const imageHome = document.createElement("img");
        imageHome.src = imageHomeUrl;
        imageHome.alt = "Gallery Image";

        // Add an onload event handler to check if the image has loaded
        imageHome.onload = () => {
            loadedCount++;

            // Check if all images have loaded
            if (loadedCount === imageGalleryHomeData.length) {
                // All images have loaded, do something here if needed
                if(count === 0){
                console.log("All images have loaded");
                    showText();
                count++;
                }
            }
        };

        // Add an onerror event handler to handle image loading errors
        imageHome.onerror = () => {
            console.error(`Error loading image at index ${index}: ${imageHomeUrl}`);
        };

        imageHomeCard.appendChild(imageHome);
        imageGalleryHome.appendChild(imageHomeCard);
    });

    // Add a timeout to check if all images have loaded after a specified time
    const timeoutDuration = 10000; // Set the timeout duration in milliseconds (e.g., 10 seconds)

    setTimeout(() => {
        if (loadedCount < imageGalleryHomeData.length) {
            // Not all images have loaded, you can choose to reload or take appropriate action
            console.log("Not all images have loaded. Reloading or taking action...");
            // You can add code here to reload or handle the situation
            displayHomeGallery();
        }
    }, timeoutDuration);
}

displayHomeGallery();

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
    "/gallery/31.jpg",
    "/gallery/32.jpg",
].map(imageUrl => imageUrlPrefix + imageUrl);


function displayGallery(){
       imageGalleryData.sort(randomLikeSort);
    console.log("Displaying Gallery");

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
}

    // Sample JSON data for products
    const productsData = [
        {
            name: "Black Lives Matter Flag ",
            image: "https://i.etsystatic.com/23152276/r/il/0e1b48/2745749046/il_1140xN.2745749046_g4ps.jpg",
            description: "Show your support for the Black Lives Matter movement with this high-quality 3x5 flag made of durable 68D polyester material. ",
            price: "$12.99",
            url:"https://buy.stripe.com/test_aEU5nNflR2vj83SeUU",
            images: [
            "https://i.etsystatic.com/23152276/r/il/a0f6ad/2745722894/il_794xN.2745722894_m2av.jpg",
            // Add more image URLs here
        ]
        },
        {
            name: "Fleece Sweater size XL ",
            image: "https://i.etsystatic.com/23152276/r/il/000df6/5190639007/il_794xN.5190639007_dpra.jpg",
            description: "Men's Zipper Knit Jacket | Stylish & Warm Fleece Sweater size XL",
            price: "$29.99",
            url:"https://buy.stripe.com/8wMaHXgZNbmt7Li9AL",
            images: [
            "https://i.etsystatic.com/23152276/r/il/a31225/5142420290/il_1140xN.5142420290_ktl1.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Black & White American Flag ",
            image: "https://i.etsystatic.com/23152276/r/il/771475/2745722718/il_794xN.2745722718_mzxt.jpg",
            description: "Black & White American Flag 3x5 ft with Metal Grommets, High-Quality Polyester Material for Indoor/Outdoor Use",
            price: "$13.99",
            url:"https://buy.stripe.com/4gwcQ538X0HP9TqfZ8",
            images: [
            "https://i.etsystatic.com/23152276/r/il/a0f6ad/2745722894/il_794xN.2745722894_m2av.jpg",
            "https://i.etsystatic.com/23152276/r/il/771475/2745722718/il_794xN.2745722718_mzxt.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Stylish and Sexy Lace Boyshorts ",
            image: "https://i.etsystatic.com/23152276/r/il/26a533/3001879773/il_794xN.3001879773_p32n.jpg",
            description: "Discover the perfect blend of style and comfort with our Lace Boyshorts Bikini Panties. The elegant combination of sheer mesh and lace creates a beautiful pattern, offering a feminine look you'll love. These panties are comfortable to wear and come with an uncovering back to give you a stylish edge.",
            price: "$12.99",
            url:"https://buy.stripe.com/00gcQ59xl3U1ghObIR",
            images: [
            "https://i.etsystatic.com/23152276/r/il/8fd6bd/3001870045/il_794xN.3001870045_h9ef.jpg",
            "https://i.etsystatic.com/23152276/r/il/4470bc/2954162204/il_794xN.2954162204_4a9b.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Sexy Geometric Lace Thong Panties ",
            image: "https://i.etsystatic.com/23152276/r/il/527e6c/5189414687/il_794xN.5189414687_8b0n.jpg",
            description: "Sustainable, Sexy, and Shamelessly Stylish! One size",
            price: "$9.99",
            url:"https://buy.stripe.com/fZedU99xl0HPc1yeV2",
            images: [
            "https://i.etsystatic.com/23152276/r/il/c3cab2/5141197230/il_794xN.5141197230_c09z.jpg",
            "https://i.etsystatic.com/23152276/r/il/fb4ade/5189414921/il_794xN.5189414921_i65w.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Leather French Beret  ",
            image: "https://i.etsystatic.com/23152276/r/il/dfd3a1/5141968318/il_794xN.5141968318_csx9.jpg",
            description: "The adjustable drawstring tie closure allows you to customize the circumference of the beret, accommodating head sizes from 21.6 to 22.4 (55-57cm).",
            price: "$15.99",
            url:"https://buy.stripe.com/7sI03j5h5aip0iQ007",
            images: [
            "https://i.etsystatic.com/23152276/r/il/44d2d0/5141968322/il_794xN.5141968322_e7zr.jpg",
            "https://i.etsystatic.com/23152276/r/il/fc4dd4/5141968314/il_794xN.5141968314_qpwa.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Leggings, Capris, and Shorts  ",
            image: "https://i.etsystatic.com/23152276/r/il/07a325/2910262504/il_794xN.2910262504_3706.jpg",
            description: "Comfortable, Sexy, and Stretchy in Multiple Sizes and Colors,  Leggings, Capris, and Shorts",
            price: "$14.99",
            url:"https://www.etsy.com/listing/972559479/womens-plus-size-leggings-capris-and?click_key=b2815ec2fa57d6a533f6437050777581f13f471d%3A972559479&click_sum=b21d3236&ref=shop_home_active_11",
            images: [
            "https://i.etsystatic.com/23152276/r/il/3453af/2910261684/il_794xN.2910261684_t6y7.jpg",
            "https://i.etsystatic.com/23152276/r/il/8da924/2957950085/il_794xN.2957950085_cz22.jpg",
            "https://i.etsystatic.com/23152276/r/il/1e238d/2910261706/il_794xN.2910261706_m4wa.jpg",
            "https://i.etsystatic.com/23152276/r/il/0bd3d6/2910261702/il_794xN.2910261702_nowh.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Black Lives Matter T-Shirt ",
            image: "https://i.etsystatic.com/23152276/r/il/299b76/2793385799/il_794xN.2793385799_7sq4.jpg",
            description: "BLM Unisex Tee is soft and comfortable 50% cotton blend, this black tee features a round neck and is machine washable for easy care.",
            price: "$9.99",
            url:"https://buy.stripe.com/7sI5nDeRF6297LieV0",
            images: [
            "https://i.etsystatic.com/23152276/r/il/f9c61a/2793385861/il_794xN.2793385861_1vir.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Women's Tank Top ",
            image: "https://i.etsystatic.com/23152276/r/il/ad821c/4857234583/il_794xN.4857234583_rtsi.jpg",
            description: "Slim Fit Sleeveless Tank Top T-Shirt in Black with White Borders - Perfect for Gym, Yoga, Sports, and Daily Wear ",
            price: "$8.99",
            url:"https://buy.stripe.com/bIYaHXdNBfCJ1mU9AF",
            images: [
            "https://i.etsystatic.com/23152276/r/il/cc42e7/4825967414/il_794xN.4825967414_hu29.jpg",
            "https://i.etsystatic.com/23152276/r/il/595a7b/4857234593/il_794xN.4857234593_rpn0.jpg",
            // Add more image URLs here
        ]

                },
             {
            name: "Lace Panty and Bra Set ",
            image: "https://i.etsystatic.com/23152276/r/il/366432/5286113621/il_fullxfull.5286113621_cu4d.jpg",
            description: "Indulge in luxurious comfort and timeless allure with our elegant embroidered Lace Panty and Bra Set. Crafted with exquisite attention to detail, this set is designed to make you feel confident and beautiful every day.",
            price: "$9.99",
            url:"https://buy.stripe.com/fZeg2h38X4Y54z6004",
            images: [
            "https://i.etsystatic.com/23152276/r/il/14b119/5286113619/il_fullxfull.5286113619_mdyg.jpg",
            "https://i.etsystatic.com/23152276/r/il/2fd03e/5237932146/il_fullxfull.5237932146_a8bk.jpg",
            // Add more image URLs here
        ]
        },  {
            name: "Lace Hustler High Rise Panties ",
            image: "https://i.etsystatic.com/23152276/r/il/51df5f/5284888671/il_fullxfull.5284888671_a90i.jpg",
            description: "Fashion-Forward Design: These panties boast a fashionable combination of sheer mesh and delicate lace, creating a stunning pattern that's elegant. Unbeatable Comfort: Crafted with your comfort in mind, these panties are soft, breathable, and sweat-absorbing, ensuring you feel great all day long.",
            price: "$10.99",
            url:"https://buy.stripe.com/14k9DTfVJfCJ6HebIL",
            images: [
            "https://i.etsystatic.com/23152276/r/il/5fb789/5284888683/il_fullxfull.5284888683_oek2.jpg",
            "https://i.etsystatic.com/23152276/r/il/5a12a5/5236700218/il_fullxfull.5236700218_swju.jpg",
            // Add more image URLs here
        ]
        },
       {
            name: "Bowknot Women's Crotchless Thong Set of 3",
            image: "https://i.etsystatic.com/23152276/r/il/7ab5a0/3323093959/il_fullxfull.3323093959_n0ux.jpg",
            description: "Indulge in your inner allure with our Sexy Bowknot Crotchless Thong. Crafted from a blend of 80% nylon and 20% cotton, this thong is the perfect combination of softness and stretch, ensuring a comfortable fit for waist sizes ranging from 23 to 33 inches.",
            price: "$8.99",
            url:"https://buy.stripe.com/28oaHXeRFgGNaXu3ce",
            images: [
            "https://i.etsystatic.com/23152276/r/il/d5bf45/3323093903/il_fullxfull.3323093903_2atr.jpg",
            "https://i.etsystatic.com/23152276/r/il/224772/3612624970/il_fullxfull.3612624970_f986.jpg",
            // Add more image URLs here
        ]
        },




             {
            name: "Black Gauze Panties -2 Rings",
            image: "https://i.etsystatic.com/23152276/r/il/465c93/5244025012/il_fullxfull.5244025012_ejsg.jpg",
            description: "Upgrade your lingerie collection with these stylish Black Gauze Panties featuring a unique 2 Rings design. These panties are designed to fit most sizes comfortably and are crafted from high-quality nylon material. Whether you're looking for everyday comfort or a special occasion piece, these panties have got you covered.",
            price: "$6.99",
            url:"https://buy.stripe.com/7sIeYd4d176d7Li5kl",
            images: [
            "https://i.etsystatic.com/23152276/r/il/adaaa3/5244025000/il_fullxfull.5244025000_cisc.jpg",
            "https://i.etsystatic.com/23152276/r/il/cf3703/5292215113/il_fullxfull.5292215113_7a98.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Black Gauze Panties -6 Rings",
            image: "https://i.etsystatic.com/23152276/r/il/283341/5243951142/il_fullxfull.5243951142_2vx4.jpg",
            description: "Stylish 6 Rings Design: These panties feature a fashionable 6 Rings design that adds a touch of elegance to your intimate wear.",
            price: "$7.99",
            url:"https://buy.stripe.com/4gwg2hdNB1LT3v26oo",
            images: [
            "https://i.etsystatic.com/23152276/r/il/8fc79f/5243938686/il_fullxfull.5243938686_mtto.jpg",
            "https://i.etsystatic.com/23152276/r/il/c73fb5/5292128897/il_fullxfull.5292128897_bxrb.jpg",
            // Add more image URLs here
        ]
        },
        
        
        // Add more product data here
    ];

    


    
    // Sort A-Z button event listener
    const sortAZButton = document.getElementById("sortAZ");
    sortAZButton.addEventListener("click", () => {
        productsData.sort(compareProductsByName);
        renderProductGrid();
    });

    // Sort Price High to Low button event listener
    const sortPriceHLButton = document.getElementById("sortPriceHL");
    sortPriceHLButton.addEventListener("click", () => {
        productsData.sort(compareProductsByPriceHL);
        renderProductGrid();
    });


// Function to truncate a string and add "..." after a specified length
function truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + "...";
    }
    return str;
}
    productsData.sort(randomLikeSort);

// Function to render the product grid
function renderProductGrid() {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    console.log("Rendering Product Grid");

  productsData.forEach((product, index) => {
    const truncatedDescription = truncateString(product.description, 80);
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    // Add onclick attribute to openProductPopup function with the index
    productCard.setAttribute("onclick", `openProductPopup(${index})`);

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${truncatedDescription}</p>
        <p>${product.price}</p>
        <button class="view-details" data-index="${index}">View Details</button>
    `;
    // Append the productCard to your container or wherever you want to display it
        productGrid.appendChild(productCard);
    });




        // Add event listeners for product detail popups
    const viewDetailButtons = document.querySelectorAll(".view-details");
    viewDetailButtons.forEach(button => {
        button.addEventListener("click", () => openProductPopup(button.getAttribute("data-index")));
    });
}


// Custom comparison function to sort products by name (A-Z)
function compareProductsByName(a, b) {
    return a.name.localeCompare(b.name);
}

// Custom comparison function to sort products by price (high to low)
function compareProductsByPriceHL(a, b) {
    const priceA = parseFloat(a.price.replace("$", ""));
    const priceB = parseFloat(b.price.replace("$", ""));

    return priceB - priceA;
}



/*   

// Add event listeners for product detail popups
const viewDetailButtons = document.querySelectorAll(".view-details");
viewDetailButtons.forEach(button => {
    button.addEventListener("click", () => openProductPopup(button.getAttribute("data-index")));
});
*/
// Function to open product detail popup
function openProductPopup(index) {

    console.log(`Opening Product Popup for product at index ${index}`);

    const modal = document.getElementById("productDetailModal");
    const modalContent = document.getElementById("modalContent");
    const product = productsData[index]; // Get the product data based on the index

    const productDetail = `
        <div class="product-detail">
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p class="details-price"><a href="${product.url}"> ${product.price}</a></p>
            <div class="mini-gallery" id="miniGallery">
                <!-- Additional images will be loaded here dynamically -->
            </div>
            <a href="${product.url}" class="cta-button">Get It</a>
        </div>
    `;

    modalContent.innerHTML = productDetail;
    modal.style.display = "block";

    const miniGallery = modalContent.querySelector("#miniGallery");

    if (product.images) {
        // Add additional images to the mini-gallery
        product.images.forEach(imageUrl => {
            const miniImage = document.createElement("img");
            miniImage.src = imageUrl;
            miniImage.alt = "Product Image";
            miniGallery.appendChild(miniImage);
        });
    }

    // Add event listener for the CTA button
    const ctaButton = modalContent.querySelector(".cta-button");
    ctaButton.addEventListener("click", () => {
        // Implement your add to cart logic here
        // console.log("Added to cart:", product);
    });

    // Close the modal when the close button is clicked
    let closeButton = modal.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        console.log("close");
        ctaButton.removeEventListener("click", () => {});
    });
}

    // Sample JSON data for about section
// Function to simulate typewriter effect
function typeWriterEffect(element, text, speed) {
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, speed);
}

    function showText(){
    console.log("Showing About Text");
const aboutText = "Maximus Brand, a dynamic Clothing and Accessories subsidiary of TechNoob, is committed to offering high-quality and fashionable products that cater to the unique fashion sense of our customers. From casual wear to formal attire, we offer a wide range of clothing and accessories suitable for any occasion. Stay up-to-date with our latest collections and releases by visiting our website, MaximusBrand.com. Experience the epitome of style and comfort with Maximus Brand.";

// Populate About Us text using typewriter effect
const aboutParagraph = document.getElementById("aboutText");
typeWriterEffect(aboutParagraph, aboutText, 50);

    }
    // Rest of your code...

    function openModal(imageUrl, index) {
        const modal = document.getElementById("imageModal");
        const modalImage = document.getElementById("modalImage");
        let closeButton = modal.querySelector(".close-button");
  //  console.log(`Opening Modal for image at index ${index} with URL: ${imageUrl}`);

        modalImage.src = imageUrl;
        modal.style.display = "block";


    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
                console.log("close");

        closeButton.removeEventListener("click", () => {});
    });

    }
    
    
    
    
    document.addEventListener("DOMContentLoaded", () => {
            console.log(`DOMContentLoaded`);

    displayHomeGallery();
    displayGallery();
    // Initial rendering of product grid
    renderProductGrid();
});
