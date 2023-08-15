

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
            name: "Black Lives Matter Flag ",
            image: "https://i.etsystatic.com/23152276/r/il/0e1b48/2745749046/il_1140xN.2745749046_g4ps.jpg",
            description: "Show your support for the Black Lives Matter movement with this high-quality 3x5 flag made of durable 68D polyester material. ",
            price: "$12.99",
            url:"https://www.etsy.com/listing/914493552/black-lives-matter-flag-3x5-high-quality",
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
            url:"https://www.etsy.com/listing/1534995031/mens-zipper-knit-jacket-stylish-warm?click_key=1c3e1e121624d87975484e52e3e6ad1c08cb98e2%3A1534995031&click_sum=ccec6491&ref=listing-free-shipping-bundle-2",
            images: [
            "https://i.etsystatic.com/23152276/r/il/a31225/5142420290/il_1140xN.5142420290_ktl1.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Black & White American Flag ",
            image: "https://i.etsystatic.com/23152276/r/il/771475/2745722718/il_794xN.2745722718_mzxt.jpg",
            description: "Black & White American Flag 3x5 ft with Metal Grommets, High Quality Polyester Material for Indoor/Outdoor Use",
            price: "$13.99",
            url:"https://www.etsy.com/listing/928415387/black-white-american-flag-3x5-ft-with?click_key=b0fd1dca567c262294b4b3aaec3db47879b22d30%3A928415387&click_sum=73318958&ref=listing-free-shipping-bundle-2",
            images: [
            "https://i.etsystatic.com/23152276/r/il/a0f6ad/2745722894/il_794xN.2745722894_m2av.jpg",
            "https://i.etsystatic.com/23152276/r/il/771475/2745722718/il_794xN.2745722718_mzxt.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Stylish and Sexy Lace Boyshorts ",
            image: "https://i.etsystatic.com/23152276/r/il/26a533/3001879773/il_794xN.3001879773_p32n.jpg",
            description: "Discover the perfect blend of style and comfort with our Lace Boyshorts Bikini Panties. The elegant combination of sheer mesh and lace creates a beautiful pattern, offering a feminine look that you'll love. These panties are comfortable to wear and come with an uncovering back to give you a stylish edge.",
            price: "$12.99",
            url:"https://www.etsy.com/listing/970415618/womens-plus-size-underwear-stylish-and?click_key=2ce20f15f12c57b0a37b85ae0fd964d6400b7b5b%3A970415618&click_sum=c2548ed6&ref=listing-free-shipping-bundle-1",
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
            url:"https://www.etsy.com/listing/1520497972/new-sexy-geometric-lace-thong-panties?click_key=57a128d77b7203695a72da2ef26f97af2639e903%3A1520497972&click_sum=9fd5550e&ref=listing-free-shipping-bundle-1",
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
            url:"https://www.etsy.com/listing/1534856951/retro-elegance-pu-leather-french-beret?click_key=02cfe612252d66990a6fd1230b8f7d041f913540%3A1534856951&click_sum=fe5038a0&ref=shop_home_active_5",
            images: [
            "https://i.etsystatic.com/23152276/r/il/44d2d0/5141968322/il_794xN.5141968322_e7zr.jpg",
            "https://i.etsystatic.com/23152276/r/il/fc4dd4/5141968314/il_794xN.5141968314_qpwa.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Leggings, Capris, and Shorts  ",
            image: "https://i.etsystatic.com/23152276/r/il/07a325/2910262504/il_794xN.2910262504_3706.jpg",
            description: "Comfortable, Sexy, and Stretchy in Multiple Sizes and colors,  Leggings, Capris, and Shorts",
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
            description: "BLM Unisex Tee soft and comfortable 50% cotton blend, this black tee features a round neck and is machine washable for easy care.",
            price: "$9.99",
            url:"https://www.etsy.com/listing/928404059/black-lives-matter-t-shirt-blm-unisex?click_key=81582c36c160b42172d9d6377fb6c6bebd1425f7%3A928404059&click_sum=815e77e6&ref=shop_home_active_12",
            images: [
            "https://i.etsystatic.com/23152276/r/il/f9c61a/2793385861/il_794xN.2793385861_1vir.jpg",
            // Add more image URLs here
        ]
        },
             {
            name: "Product ",
            image: "https://i.etsystatic.com/23152276/r/il/ad821c/4857234583/il_794xN.4857234583_rtsi.jpg",
            description: "Slim Fit Sleeveless Women's Tank Top T-Shirt in Black with White Borders - Perfect for Gym, Yoga, Sports, and Daily Wear ",
            price: "$8.99",
            url:"https://www.etsy.com/listing/1445108382/womens-black-white-sleeveless-tank-top?click_key=c8e7bf2b6fb95d6a72ede35aab48fd84dfc2dfca%3A1445108382&click_sum=6c675640&ref=shop_home_active_1",
            images: [
            "https://i.etsystatic.com/23152276/r/il/cc42e7/4825967414/il_794xN.4825967414_hu29.jpg",
            "https://i.etsystatic.com/23152276/r/il/595a7b/4857234593/il_794xN.4857234593_rpn0.jpg",
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

    // Initial rendering of product grid
    renderProductGrid();

// Function to truncate a string and add "..." after a specified length
function truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + "...";
    }
    return str;
}

// Function to render the product grid
function renderProductGrid() {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    productsData.sort(randomLikeSort);

    productsData.forEach((product, index) => {
        const truncatedDescription = truncateString(product.description, 80);
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
   productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
            <p>${truncatedDescription}</p>
    <p>${product.price}</p>
    <button class="view-details" data-index="${index}">View Details</button>
`;

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




    

    // Add event listeners for product detail popups
    const viewDetailButtons = document.querySelectorAll(".view-details");
    viewDetailButtons.forEach((button, index) => {
        button.addEventListener("click", () => openProductPopup(productsData[index]));
    });

    // Function to open product detail popup
function openProductPopup(product) {
    const modal = document.getElementById("productDetailModal");
    const modalContent = document.getElementById("modalContent");

    const productDetail = `
        <div class="product-detail">
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p  class="details-price">${product.price}</p>
            <div class="mini-gallery" id="miniGallery">
                <!-- Additional images will be loaded here dynamically -->
            </div>
            <a href="${product.url}" class="cta-button">Get It</a>
        </div>
    `;

    modalContent.innerHTML = productDetail;
    modal.style.display = "block";


   const miniGallery = modalContent.querySelector("#miniGallery");

    if(product){
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
      //  console.log("Added to cart:", product);
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
    const aboutText = "Maximus Brand, a dynamic Clothing and Accessories subsidiary of TechNoob, is committed to offering high-quality and fashionable products that cater to the unique fashion sense of our customers. From casual wear to formal attire, we offer a wide range of clothing and accessories suitable for any occasion. Stay up-to-date with our latest collections and releases by visiting our website, MaximusBrand.com. Experience the epitome of style and comfort with Maximus Brand.";

    // Populate About Us text using JSON
    const aboutParagraph = document.getElementById("aboutText");
    aboutParagraph.textContent = aboutText;

    // Rest of your code...

    function openModal(imageUrl, index) {
        const modal = document.getElementById("imageModal");
        const modalImage = document.getElementById("modalImage");
        let closeButton = document.querySelector(".close-button");

        modalImage.src = imageUrl;
        modal.style.display = "block";


    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
                console.log("close");

        closeButton.removeEventListener("click", () => {});
    });

    }


    
});
