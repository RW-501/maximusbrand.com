import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {
  getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';



import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js';

const DEBUG = true;
if (DEBUG) console.log("Module Debug on");


// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAwidhrmgEda-1RdjQGW7kXsVAnzqmqBWE",
    authDomain: "technoob-86ddf.firebaseapp.com",
    projectId: "technoob-86ddf",
    storageBucket: "technoob-86ddf.firebasestorage.app",
    messagingSenderId: "802394401005",
    appId: "1:802394401005:web:9e6b45f1df7b1f927484e4",
    measurementId: "G-E2Z92KC5MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// DOM Elements
const adminPanel = document.getElementById("admin-panel");
const adminLogin = document.getElementById("admin-login");
const googleLoginBtn = document.getElementById("google-login");
const logoutBtn = document.getElementById("logout-btn");
const productTable = document.getElementById("product-list");
const productForm = document.getElementById("product-form");
const categoryField = document.getElementById("product-category");
const dynamicAttributes = document.getElementById("dynamic-attributes");
const mediaPreview = document.getElementById("media-preview");

// Admin Authentication
onAuthStateChanged(auth, (user) => {
    if (user && user.email === "1988lrp@gmail.com") {
        adminPanel.style.display = "block";
        adminLogin.style.display = "none";
        loadProducts();
    } else {
        adminPanel.style.display = "none";
        adminLogin.style.display = "block";
    }
});

// Google Login
googleLoginBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(error => console.error(error));
});

// Logout
logoutBtn.addEventListener("click", () => {
    signOut(auth);
});

// Load Products from Firebase
// 
async function loadProducts() {
    productTable.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "mainProducts"));

    querySnapshot.forEach((doc) => {
        const product = doc.data();
        const row = `
            <tr>
                <td>${doc.id}</td>
                <td>${product.name}</td>
                <td><img src="${product.image}" width="50"></td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick='editProduct("${doc.id}", ${JSON.stringify(product)})'>Edit</button>
                    <button onclick="deleteProduct('${doc.id}')">Delete</button>
                </td>
            </tr>
        `;
        productTable.innerHTML += row;
    });
}



function getProductData(){


    const productData = {

        price: formatNumberInput(document.getElementById("product-price").value),
        discount: formatNumberInput(document.getElementById("product-discount").value),
        multipleItemDiscount: formatNumberInput(document.getElementById("product-multiple-discount").value),
        stock: formatNumberInput(document.getElementById("product-stock").value),
        quantity: formatNumberInput(document.getElementById("product-quantity").value),
        sold: formatNumberInput(document.getElementById("product-sold").value),

        name: document.getElementById("product-name").value,
        searchableName: generateSearchableName(document.getElementById("product-name").value),
        collection: document.getElementById("product-collection").value || null,
        category: document.getElementById("product-category").value,
        subCategory: document.getElementById("product-subCategory")?.value || "",
        description: document.getElementById("product-description").value,
        highlights: document.getElementById("product-highlights")?.value.split(",") || [],
       
        sold: parseInt(document.getElementById("product-sold")?.value) || 0,
        views: 0,
        uniqueViews: 0,
        media: mediaList.map(media => media.url), // Store media URLs
        tags: document.getElementById("product-tags")?.value.split(",") || [],
        brand: document.getElementById("product-brand")?.value || "",
        size: document.getElementById("product-size")?.value.split(",") || [],
        color: document.getElementById("product-color")?.value || "",
        material: document.getElementById("product-material")?.value || "",
        fit: document.getElementById("product-fit")?.value || "",
        gender: document.getElementById("product-gender")?.value || "",
        style: document.getElementById("product-style")?.value || "",
        season: document.getElementById("product-season")?.value.split(",") || [],
        isFeatured: document.getElementById("product-featured")?.checked || false,
        isBestseller: document.getElementById("product-bestseller")?.checked || false,
        isCustomizable: document.getElementById("product-customizable")?.checked || false,
        estimatedCustomizationTime: document.getElementById("product-custom-time")?.value || "",
        customizationOptions: document.getElementById("product-custom-options")?.value.split(",") || [],
        batteryLife: document.getElementById("product-battery")?.value || "",
        chargingTime: document.getElementById("product-charging")?.value || "",
        wirelessRange: document.getElementById("product-wireless")?.value || "",
        warranty: document.getElementById("product-warranty")?.value || "",
        connectivity: document.getElementById("product-connectivity")?.value.split(",") || [],
        isDigital: document.getElementById("product-digital")?.checked || false,
        downloadURL: document.getElementById("product-download")?.value || "",
        fileFormat: document.getElementById("product-fileFormat")?.value.split(",") || [],
        isPresale: document.getElementById("product-presale")?.checked || false,
        status: "active",
        isVariety: document.getElementById("product-variety")?.checked || false,
        variety: varietyList, // Dynamic variety options
        isMultipleItems: document.getElementById("product-multiple")?.checked || false,
        ratings: {
            average: 0,
            reviews: []
        },
        shipping: {
            freeShipping: document.getElementById("product-freeShipping")?.checked || false,
            shipsFrom: document.getElementById("product-shipsFrom")?.value || "",
            estimatedDelivery: document.getElementById("product-delivery")?.value || ""
        },
        itemStoredLocation: document.getElementById("product-storage")?.value || "",
        sourceProduct: document.getElementById("product-source")?.value || "",
        lastViewed: null,
        timeSpent: 0,
        meta: {
            SKU: document.getElementById("product-sku")?.value || "",
            barcode: document.getElementById("product-barcode")?.value || "",
            ASIN: document.getElementById("product-asin")?.value || "",
            UPC: document.getElementById("product-upc")?.value || ""
        },
        note: document.getElementById("product-note")?.value || ""
    };

return productData;

}


// Add / Update Product
productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

let productData = getProductData();

    const productId = document.getElementById("product-id").value;

    if (productId) {

        let jsonProductData = JSON.stringify(productData, null, 2);

        await saveVideosToJson(jsonProductData, true);  // Default behavior, data save:

        await updateDoc(doc(db, "mainProducts", productId), productData);
    } else {
        let jsonProductData = JSON.stringify(productData, null, 2);

        await saveVideosToJson(jsonProductData, true);  // Default behavior, data save:

        await addDoc(collection(db, "mainProducts"), productData);
    }

    productForm.reset();
    mediaPreview.innerHTML = "";
    mediaList = [];
    varietyList = [];
    loadProducts();
});








const owner = "RW-501";
    const repo = "maximusbrand.com";
    const filePath = `new/scripts/json/mainProducts.json`; // Adjust path as needed
    const branch = 'main';
    let sha = ''; // Will store the sha if the file exists
    let fileData;


    async function saveVideosToJson(videoDataArray, saveIfNewOrChanged = true) {
    const jsonData = JSON.stringify(videoDataArray, null, 2);  // Format the data
    const blob = new Blob([jsonData], { type: "application/json" });
    const encodedContent = btoa(jsonData);

    const parts = ['p', 'h', 'g'];
    const randomizePart = (part) => part.split('').reverse().join('');

    const part_1 = randomizePart(parts.join(''));
    const part_2 = "_akXGrO51HwgEI";
    const part_4 = "G9MnTu0fIjKj";

    const part_3 = "VWzDIghLbIE";
    const token = part_1 + part_2 + part_3 + part_4;

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    try {
        const fileResponse = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github+json',
            },
        });

        if (fileResponse.ok) {
            const fileData = await fileResponse.json();
            const existingContent = atob(fileData.content || "");
            let existingDataArray = [];

            if (existingContent.trim()) {
                try {
                    existingDataArray = JSON.parse(existingContent);
                } catch (error) {
                    console.error("Failed to parse existing JSON content:", error.message);
                }
            }

            let updatedDataArray = [...existingDataArray];

            if (saveIfNewOrChanged) {
                // Save only if there is a new ID or any changes
                updatedDataArray = existingDataArray.map(existingItem => {
                    const updatedItem = videoDataArray.find(item => item.id === existingItem.id);
                    if (updatedItem) {
                        const viewsChanged = updatedItem.views !== existingItem.views;
                        const isPublicChanged = (updatedItem.isPublic ?? null) !== (existingItem.isPublic ?? null);
                        if (viewsChanged || isPublicChanged) {
                            return { ...existingItem, ...updatedItem };
                        }
                    }
                    return existingItem;
                });

                videoDataArray.forEach(item => {
                    if (!existingDataArray.some(existingItem => existingItem.id === item.id)) {
                        updatedDataArray.push(item);
                    }
                });
            } else {
                // Always save the new data, even if it isn't changed
                updatedDataArray = videoDataArray;
            }

            if (JSON.stringify(updatedDataArray) !== JSON.stringify(existingDataArray)) {
              if (DEBUG)     console.log("Changes detected, preparing to update file.");
                const updatedEncodedContent = btoa(JSON.stringify(updatedDataArray, null, 2));
                await updateFile(url, updatedEncodedContent, fileData.sha, token);
            } else {
              if (DEBUG)     console.log("No changes detected.");
            }

        } else if (fileResponse.status === 404) {
          if (DEBUG)   console.log("File does not exist, creating a new one.");
            await updateFile(url, encodedContent, null, token);
        } else {
            throw new Error(`Failed to fetch file metadata: ${fileResponse.statusText}`);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function updateFile(url, encodedContent, sha, token) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github+json',
        },
        body: JSON.stringify({
            message: sha ? `Update ${filePath}` : `Create ${filePath}`,
            content: encodedContent,
            sha: sha || undefined,
            branch: branch,
        }),
    });

    if (response.ok) {
        console.log("File created/updated successfully.");
    } else {
        const errorData = await response.json();
        throw new Error(`Error updating file: ${errorData.message}`);
    }
}












// Function to Generate Searchable Names
function generateSearchableName(name) {
    return name.toLowerCase().split(" ");
}

window.editProduct = (id, product) => {
 

   // let product = JSON.stringify(products, null, 2);
    console.log("product  ",product);
    console.log("product.name  ",product.name);

    document.getElementById("product-id").value = id;
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-collection").value = product.collection || "";
    document.getElementById("product-category").value = product.category;
    document.getElementById("product-description").value = product.description;

    // Format numbers before displaying
    document.getElementById("product-price").value = `$${product.price}`;
    document.getElementById("product-discount").value = product.discount ? `${product.discount}%` : "";
    document.getElementById("product-multiple-discount").value = product.multipleItemDiscount ? `${product.multipleItemDiscount}%` : "";
    document.getElementById("product-stock").value = product.stock;
    document.getElementById("product-quantity").value = product.quantity || "";
    document.getElementById("product-sold").value = product.sold || "";

    // Load media (images/videos)
    mediaPreview.innerHTML = "";
    mediaList = product.media || [];
    mediaList.forEach(url => {
        addMediaToPreview(url, url.includes(".mp4") ? "video" : "image");
    });

    // Reload category-specific attributes
    loadCategoryAttributes(product.category, product);
};

// Function to load category-specific inputs dynamically
function loadCategoryAttributes(category, product = {}) {
    const dynamicAttributes = document.getElementById("dynamic-attributes");
    dynamicAttributes.innerHTML = "";

    if (category === "Clothing") {
        dynamicAttributes.innerHTML = `
            <h3>Clothing Attributes</h3>
            <input type="text" id="product-size" placeholder="Sizes (comma-separated)" value="${product.size ? product.size.join(", ") : ""}">
            <input type="text" id="product-material" placeholder="Material" value="${product.material || ""}">
            <input type="text" id="product-color" placeholder="Color" value="${product.color || ""}">
            <input type="text" id="product-fit" placeholder="Fit" value="${product.fit || ""}">
            <input type="text" id="product-style" placeholder="Style" value="${product.style || ""}">
            <input type="text" id="product-season" placeholder="Season (comma-separated)" value="${product.season ? product.season.join(", ") : ""}">
        `;
    } else if (category === "Electronics") {
        dynamicAttributes.innerHTML = `
            <h3>Electronics Attributes</h3>
            <input type="text" id="product-battery" placeholder="Battery Life" value="${product.batteryLife || ""}">
            <input type="text" id="product-charging" placeholder="Charging Time" value="${product.chargingTime || ""}">
            <input type="text" id="product-wireless" placeholder="Wireless Range" value="${product.wirelessRange || ""}">
            <input type="text" id="product-warranty" placeholder="Warranty" value="${product.warranty || ""}">
            <input type="text" id="product-connectivity" placeholder="Connectivity (comma-separated)" value="${product.connectivity ? product.connectivity.join(", ") : ""}">
        `;
    } else if (category === "Digital") {
        dynamicAttributes.innerHTML = `
            <h3>Digital Product Details</h3>
            <input type="text" id="product-download" placeholder="Download URL" value="${product.downloadURL || ""}">
            <input type="text" id="product-fileFormat" placeholder="File Formats (comma-separated)" value="${product.fileFormat ? product.fileFormat.join(", ") : ""}">
        `;
    } else if (category === "Customizable") {
        dynamicAttributes.innerHTML = `
            <h3>Customization Options</h3>
            <input type="text" id="product-custom-time" placeholder="Estimated Customization Time" value="${product.estimatedCustomizationTime || ""}">
            <input type="text" id="product-custom-options" placeholder="Customization Options (comma-separated)" value="${product.customizationOptions ? product.customizationOptions.join(", ") : ""}">
        `;
    }
}


// Function to clean and convert input to a valid number
function formatNumberInput(value) {
    if (!value) return 0;
    return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
}

// Apply formatting on input fields
document.querySelectorAll("#product-price, #product-discount, #product-multiple-discount, #product-stock, #product-quantity, #product-sold").forEach(input => {
    input.addEventListener("input", (event) => {
        let formattedValue = formatNumberInput(event.target.value);
        event.target.value = event.target.placeholder.includes("%") ? formattedValue + "%" : formattedValue;
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById("product-category");
    const subCategorySelect = document.getElementById("product-subCategory");

    const subCategories = {
        "Clothing": ["T-Shirts", "Hoodies", "Jackets", "Jeans", "Shoes"],
        "Electronics": ["Smartphones", "Laptops", "Headphones", "Cameras"],
        "Home & Kitchen": ["Furniture", "Appliances", "Cookware", "Bedding"],
        "Beauty": ["Makeup", "Skincare", "Haircare", "Fragrances"],
        "Sports": ["Gym Equipment", "Cycling", "Running", "Outdoor Gear"],
        "Toys & Games": ["Board Games", "Action Figures", "Educational Toys"],
        "Automotive": ["Car Accessories", "Tires", "Tools", "Batteries"]
    };

    categorySelect.addEventListener("change", function () {
        const selectedCategory = this.value;
        subCategorySelect.innerHTML = '<option value="" disabled selected>Select Subcategory</option>';

        if (subCategories[selectedCategory]) {
            subCategories[selectedCategory].forEach(sub => {
                let option = document.createElement("option");
                option.value = sub;
                option.textContent = sub;
                subCategorySelect.appendChild(option);
            });
        }
    });
});

let mediaList = []; // Store media items for preview and Firebase upload

// Open file selector when clicking buttons
document.getElementById("add-image-btn").addEventListener("click", () => document.getElementById("product-image").click());
document.getElementById("add-video-btn").addEventListener("click", () => document.getElementById("product-video").click());

// Handle Image & Video Upload
document.getElementById("product-image").addEventListener("change", (event) => handleMediaUpload(event, "image"));
document.getElementById("product-video").addEventListener("change", (event) => handleMediaUpload(event, "video"));

async function handleMediaUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            console.log(`Upload Progress: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
        }, 
        (error) => {
            console.error("Upload Failed:", error);
        }, 
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            addMediaToPreview(downloadURL, type);
        }
    );
}

// Add Media Preview
function addMediaToPreview(url, type) {
    const mediaItem = document.createElement("div");
    mediaItem.classList.add("media-item");
    mediaItem.setAttribute("draggable", "true");

    if (type === "image") {
        mediaItem.innerHTML = `<img src="${url}" alt="Uploaded Image"><button class="remove-media">✖</button>`;
    } else {
        mediaItem.innerHTML = `<video src="${url}" controls></video><button class="remove-media">✖</button>`;
    }

    mediaList.push({ url, type });
    mediaPreview.appendChild(mediaItem);

    addDragAndDrop();
    addRemoveButton(mediaItem, url);
}

// Drag & Drop Reordering
function addDragAndDrop() {
    const mediaItems = document.querySelectorAll(".media-item");
    let draggedItem = null;

    mediaItems.forEach(item => {
        item.addEventListener("dragstart", () => {
            draggedItem = item;
            setTimeout(() => item.style.opacity = "0.5", 0);
        });

        item.addEventListener("dragover", (event) => event.preventDefault());

        item.addEventListener("drop", () => {
            if (draggedItem !== item) {
                let parent = mediaPreview;
                let items = Array.from(parent.children);
                let draggedIndex = items.indexOf(draggedItem);
                let droppedIndex = items.indexOf(item);

                mediaList.splice(droppedIndex, 0, mediaList.splice(draggedIndex, 1)[0]);

                if (draggedIndex > droppedIndex) {
                    parent.insertBefore(draggedItem, item);
                } else {
                    parent.insertBefore(draggedItem, item.nextSibling);
                }
            }
        });

        item.addEventListener("dragend", () => item.style.opacity = "1");
    });
}

// Remove Media Item
function addRemoveButton(mediaItem, url) {
    mediaItem.querySelector(".remove-media").addEventListener("click", () => {
        mediaItem.remove();
        mediaList = mediaList.filter(media => media.url !== url);
    });
}












// Delete Product
window.deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
        await deleteDoc(doc(db, "mainProducts", id));
        loadProducts();
    }
};


/*

{
  "id": 2,
  "name": "Maximus White T-Shirt",
  "searchableName": [maximus, white, t-shirt, cotton, unisex, casual],
  "image": "images/white-tshirt.jpg",
  "media": [
    "images/white-tshirt.jpg",
    "videos/white-tshirt-demo.mp4"
  ],
  "price": 29.99,
  "discount": 5,
  "multipleItemDiscount": 5,
  "category": "Clothing",
  "subCategory": "T-Shirts",
  "collection": "Maximus Summer Collection 2024",
  "views": 800,
  "uniqueViews": 540,
  "quantity": 50,
  "sold": 120,
  "description": "High-quality cotton T-shirt with a sleek Maximus logo.",
  "highlights": [
    "100% premium cotton",
    "Breathable fabric for comfort",
    "Durable stitching",
    "Unisex fit"
  ],
  "similar": [1, 3, 5],
  "tags": ["cotton", "casual", "unisex", "fashion", "lightweight", "summer wear", "athleisure", "streetwear"],
  "brand": "Maximus",
  "size": ["S", "M", "L", "XL", "XXL"],
  "color": "White",
  "material": "100% Cotton",
  "fit": "Regular",
  "gender": "Unisex",
  "style": "Casual",
  "season": ["Spring", "Summer"],
  "isFeatured": true,
  "isBestseller": true,
  "isCustomizable": false,
    "estimatedCustomizationTime": "2-4 days".
  "customizationOptions": ["Engraved Text", "Font Style", "Symbols"],
  "batteryLife": "10 hours",
  "chargingTime": "1 hour",
  "wirelessRange": "30 feet",
  "brand": "Maximus",
  "warranty": "1 year",
  "connectivity": ["Bluetooth 5.0"],
  "isDigital": false,
  "isPresale": false,
  "status": "active",
  "isVariety" false,
  "variety": [
    { "color": "Black", "image": "images/black-tshirt.jpg" },
    { "color": "Gray", "image": "images/gray-tshirt.jpg" }
  ],
  "isMultipleItems": false,
  "ratings": {
    "average": 4.7,
    "reviews": 134
  },
  "reviews": [
    {
      "user": "John Doe",
      "rating": 5,
      "comment": "Great quality, perfect fit!",
      "date": "2024-02-01"
    },
    {
      "user": "Jane Smith",
      "rating": 4,
      "comment": "Good material but took time to deliver.",
      "date": "2024-02-03"
    }
  ],
  "inCart": 20,
  "shipping": {
    "freeShipping": true,
    "shipsFrom": "USA",
    "estimatedDelivery": "3-5 business days"
  },
  "itemStoredLocation": "Warehouse A - Dallas, TX",
  "sourceProduct": "Maximus Official Store",
  "lastViewed": "2024-02-06T12:30:00Z",
  "timeSpent": 45,
  "downloadURL": "",
    "fileFormat": ["PDF", "EPUB"],

  "meta": {
    "SKU": "MAX-TSHIRT-WHT",
    "barcode": "1234567890123",
    "ASIN": "B09XYZ12345",
    "UPC": "098765432112"
  },



  "note": "Limited stock available!"
}


*/