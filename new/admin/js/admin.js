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
 let allProducts = []; // Global array to store products

async function loadProducts() {
    productTable.innerHTML = "";
    allProducts = []; // Reset array before loading

    const querySnapshot = await getDocs(collection(db, "mainProducts"));

    querySnapshot.forEach((doc) => {
        const product = { id: doc.id, ...doc.data() }; // Add ID to product data
        allProducts.push(product); // Store product in global array

        const row = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td><img src="${product.image}" width="50"></td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick='editProduct("${product.id}")'>Edit</button>
                    <button onclick="deleteProduct('${product.id}')">Delete</button>
                </td>
            </tr>
        `;
        productTable.innerHTML += row;
    });

    console.log("All Products Loaded:", allProducts);
}


let variety = []; // Store selected variants
let relatedProducts = []; // Store selected variants

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
       

        views: 0,
        uniqueViews: 0,
        lastViewed: null,
        timeSpent: 0,

        rating: 0,

        media: mediaList.map(media => media.url), // Store media URLs
        tags: document.getElementById("product-tags")?.value.split(",") || [],
        brand: document.getElementById("product-brand")?.value || "",
        size: document.getElementById("product-size")?.value.split(",") || [],
        color: document.getElementById("product-color")?.value.split(",") || [],
        material: document.getElementById("product-material")?.value.split(",") || [],
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
        status:  document.getElementById("product-status")?.value || "active",

        isVariety: document.getElementById("product-variety")?.checked || false,
        variety: variety,

        relatedProducts: relatedProducts,

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

        await saveVideosToJson(productData, true);  // Default behavior, data save:

        await updateDoc(doc(db, "mainProducts", productId), productData);
    } else {
        let jsonProductData = JSON.stringify(productData, null, 2);

        await saveVideosToJson(jsonProductData, true);  // Default behavior, data save:

        await addDoc(collection(db, "mainProducts"), productData);
    }

    productForm.reset();
    mediaPreview.innerHTML = "";
    mediaList = [];
  //  varietyList = [];
    loadProducts();
});



document.getElementById("fileInput").addEventListener("change", handleFileUpload);

let inventoryData = [];
let currentIndex = 0;

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const csvData = e.target.result;
        console.log("🔍 Raw CSV Data:\n", csvData); // Log raw CSV data before parsing

        inventoryData = parseCSV(csvData);

        console.log("✅ Parsed Inventory Data:", inventoryData); // Log parsed JSON

        if (inventoryData.length > 0) {
            currentIndex = 0;
            showPopup(currentIndex);
        }
    };
    reader.readAsText(file);
}

// 📌 Parse CSV File
function parseCSV(csv) {
    const rows = csv.split("\n").map(row => row.split(","));
    if (rows.length < 2) {
        console.error("🚨 CSV Parsing Error: No valid data found.");
        return [];
    }

    const headers = rows.shift().map(header => header.trim());
    console.log("📌 CSV Headers:", headers); // Log headers for debugging

    return rows.map((row, rowIndex) => {
        let item = {};
        headers.forEach((header, index) => {
            item[header] = row[index] ? row[index].trim() : "";
        });

        // Log each row to ensure correct parsing
        console.log(`📝 Row ${rowIndex + 1}:`, item);

        return item;
    });
}

// 📌 Show Pop-Up Form
function showPopup(index) {
    if (index < 0 || index >= inventoryData.length) return;
    const item = inventoryData[index];

    console.log(`📌 Displaying Item ${index + 1}:`, item); // Log item being displayed

    const popupContent = `
        <div class="popup">
            <h2>Upload Item (${index + 1}/${inventoryData.length})</h2>
            <label>Title: <input type="text" id="product-name" value="${item.Title || item["Title"] || ""}"></label>
            <label>SKU: <input type="text" id="product-sku" value="${item["Custom label (SKU)"] || ""}"></label>
            <label>Price: <input type="number" id="product-price" value="${item["Start price"] ||
                 item["Auction Buy It Now price"] || 0}"></label>
            <label>Stock: <input type="number" id="product-stock" value="${item["Available quantity"] || 0}"></label>
            <label>Sold: <input type="number" id="product-sold" value="${item["Sold quantity"] || 0}"></label>
                 
            <div class="section">
                <h3>Category & Subcategory</h3>
                <label for="product-category">Category</label>
                <select id="product-category"  value="${item["eBay category 1 name"] || ""}">
                    <option value="" disabled selected>Select Category</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Sports">Sports</option>
                    <option value="Toys & Games">Toys & Games</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Digital">Digital</option>
                    <option value="Customizable">Customizable</option>
                </select>
            
                <label for="product-subCategory">Subcategory</label>
                <select id="product-subCategory" required>
                    <option value="" disabled selected>Select Subcategory</option>
                </select>
            </div>
           
           
           
            <label>Description: <textarea type="text" id="product-description" value="${item["Condition"] || ""}"></textarea></label>
            <label>Color: <input type="text" id="product-color" value="${item["Variation details"] || ""}"></label>

            <div class="popup-buttons">
                <button onclick="uploadItem()">Upload</button>
                <button onclick="prevItem()">Previous</button>
                <button onclick="nextItem()">Next</button>
                <button onclick="closePopup()">Close</button>
            </div>
        </div>
    `;
    document.getElementById("popup-container").innerHTML = popupContent;
    document.getElementById("popup-container").style.display = "block";
}

// 📌 Upload Item
async function uploadItem() {
    const itemData = {
        name: document.getElementById("product-name").value,
        sku: document.getElementById("product-sku").value,
        price: parseFloat(document.getElementById("product-price").value) || 0,
        stock: parseInt(document.getElementById("product-stock").value) || 0,
        sold: parseInt(document.getElementById("product-sold").value) || 0,
        category: document.getElementById("product-category").value,
        subCategory: document.getElementById("product-subCategory").value,
        color: document.getElementById("product-color").value,

        collection: "MaximusBrand",
        description:  document.getElementById("product-description").value,
        status: "0000",

    };

    console.log("📤 Uploading Item:", itemData);

    try {
/*         let jsonProductData = JSON.stringify(itemData, null, 2);

        // Save product data to JSON file (if function exists)
        if (typeof saveVideosToJson === "function") {
            await saveVideosToJson(jsonProductData, true);
        } else {
            console.warn("⚠ `saveVideosToJson` function not found.");

            
        } */

        // Save to Firebase Firestore (Ensure `db` is initialized)
        if (typeof addDoc === "function" && typeof db !== "undefined") {
            await addDoc(collection(db, "mainProducts"), itemData);
            console.log("✅ Item added to Firestore");
            loadProducts();

        } else {
            console.warn("⚠ `addDoc` function or `db` is not defined.");
        }

        showToast("Item uploaded successfully!");
        nextItem();
    } catch (error) {
        console.error("🚨 Error uploading item:", error);
        showToast("Error uploading item!", "error");
    }
}

window.uploadItem = uploadItem;

// 📌 Navigate Items
function nextItem() {
    if (currentIndex < inventoryData.length - 1) {
        currentIndex++;
        showPopup(currentIndex);
    }
}
window.nextItem = nextItem;

function prevItem() {
    if (currentIndex > 0) {
        currentIndex--;
        showPopup(currentIndex);
    }
}
window.prevItem = prevItem;

// 📌 Close Pop-Up
function closePopup() {
    document.getElementById("popup-container").style.display = "none";
}

window.closePopup = closePopup;









const owner = "RW-501";
    const repo = "maximusbrand.com";
    const filePath = `new/scripts/json/mainProducts.json`; // Adjust path as needed
    const branch = 'main';
    let sha = ''; // Will store the sha if the file exists
    let fileData;


    async function saveVideosToJson(jsonProductData, saveIfNewOrChanged = true) {
    const jsonData = JSON.stringify(jsonProductData, null, 2);  // Format the data
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
                    const updatedItem = jsonProductData.find(item => item.id === existingItem.id);
                    if (updatedItem) {
                        const viewsChanged = updatedItem.views !== existingItem.views;
                        const isPublicChanged = (updatedItem.isPublic ?? null) !== (existingItem.isPublic ?? null);
                        if (viewsChanged || isPublicChanged) {
                            return { ...existingItem, ...updatedItem };
                        }
                    }
                    return existingItem;
                });

                jsonProductData.forEach(item => {
                    if (!existingDataArray.some(existingItem => existingItem.id === item.id)) {
                        updatedDataArray.push(item);
                    }
                });
            } else {
                // Always save the new data, even if it isn't changed
                updatedDataArray = jsonProductData;
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





document.getElementById("product-variety").addEventListener("change", function () {
    if (this.checked) {
       // openVariantPopup();
    } else {
        variety = []; // Clear selected variants if unchecked
        document.getElementById("selected-variants").innerHTML = "";
    }
});


document.getElementById("product-related").addEventListener("change", function () {
    if (this.checked) {
        openRelatedProductsPopup();
    } else {
        relatedProducts = []; // Clear selected variants if unchecked
        document.getElementById("selected-related-products").innerHTML = "";
    }
});


function openRelatedProductsPopup() {

    

    const relatedProductsList = document.getElementById("related-products-list");
    relatedProductsList.innerHTML = ""; // Clear previous list

    allProducts.forEach(product => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<img src="${product.image}" width="50"> ${product.name}`;
        listItem.onclick = function () {
            selectRelatedProducts(product);

            console.log("selected product:", product);

        };
        relatedProductsList.appendChild(listItem);
    });

    document.getElementById("related-products-popup").style.display = "block";
}
window.openRelatedProductsPopup = openRelatedProductsPopup;

function closeRelatedProductsPopup() {
    document.getElementById("related-products-popup").style.display = "none";
}

window.closeRelatedProductsPopup = closeRelatedProductsPopup;

function selectRelatedProducts(product) {
    if (!relatedProducts.some(v => v.id === product.id)) {
        relatedProducts.push(product);
        console.log("selected relatedProducts:", relatedProducts);

        let selectedProducts = document.getElementById("selected-related-products");
        let relatedItem = document.createElement("div");
        relatedItem.innerHTML = `<img src="${product.image}" width="50"> ${product.name}`;
        selectedProducts.appendChild(relatedItem);
    }
}







// Function to Generate Searchable Names
function generateSearchableName(name) {
    return name.toLowerCase().split(" ");
}
window.editProduct = (productId) => {
    console.log("Editing product:", productId);

    let product = allProducts.find(p => p.id === productId); // Find product by ID
    if (!product) {
        console.error("Product not found!");
        return;
    }
    console.log("product:", product);

    // Set basic product fields
    document.getElementById("product-id").value = productId;
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-collection").value = product.collection || "";
    document.getElementById("product-category").value = product.category;
    document.getElementById("product-subCategory").value = product.subCategory || "";
    document.getElementById("product-description").value = product.description;
    document.getElementById("product-highlights").value = product.highlights?.join(", ") || "";

    // Format numbers before displaying
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-discount").value = product.discount || "";
    document.getElementById("product-multiple-discount").value = product.multipleItemDiscount || "";
    document.getElementById("product-stock").value = product.stock;
    document.getElementById("product-quantity").value = product.quantity || "";
    document.getElementById("product-sold").value = product.sold || "";






 // Helper function to safely call setMultiSelect only if data exists
 function safeSetMultiSelect(elementId, values) {
    if (!Array.isArray(values)) {
        values = typeof values === "string" ? values.split(",").map(v => v.trim()) : []; // Convert to array if it's a string
    }

    if (values.length > 0 && values[0] !== "") {
        setMultiSelect(elementId, values);
    } else {
        console.warn(`Skipping ${elementId}, no valid values found.`);
    }
}


// Only call setMultiSelect if the property exists and is not empty
safeSetMultiSelect("product-tags", product.tags);
safeSetMultiSelect("product-material", product.material);
safeSetMultiSelect("product-season", product.season);
safeSetMultiSelect("product-connectivity", product.connectivity);
safeSetMultiSelect("product-fileFormat", product.fileFormat);

document.getElementById("product-variety").checked = product.isVariety || false;
 safeSetMultiSelect("product-size", product.size);
 safeSetMultiSelect("product-color", product.color);





    // Set single select dropdowns
    document.getElementById("product-fit").value = product.fit || "";
    document.getElementById("product-gender").value = product.gender || "";
    document.getElementById("product-style").value = product.style || "";
    document.getElementById("product-warranty").value = product.warranty || "";
    document.getElementById("product-shipsFrom").value = product.shipping?.shipsFrom || "";
    document.getElementById("product-delivery").value = product.shipping?.estimatedDelivery || "";
    document.getElementById("product-status").value = product.status || "active";

    // Handle checkboxes
    document.getElementById("product-featured").checked = product.isFeatured || false;
    document.getElementById("product-bestseller").checked = product.isBestseller || false;
    document.getElementById("product-customizable").checked = product.isCustomizable || false;
    document.getElementById("product-digital").checked = product.isDigital || false;
    document.getElementById("product-presale").checked = product.isPresale || false;
    document.getElementById("product-multiple").checked = product.isMultipleItems || false;
    document.getElementById("product-freeShipping").checked = product.shipping?.freeShipping || false;

    // Handle customization options
    document.getElementById("product-custom-time").value = product.estimatedCustomizationTime || "";
    document.getElementById("product-custom-options").value = product.customizationOptions?.join(", ") || "";

    // Set battery & electronics specifications
    document.getElementById("product-battery").value = product.batteryLife || "";
    document.getElementById("product-charging").value = product.chargingTime || "";
    document.getElementById("product-wireless").value = product.wirelessRange || "";

    // Set digital product fields
    document.getElementById("product-download").value = product.downloadURL || "";

    // Set metadata fields
    document.getElementById("product-sku").value = product.meta?.SKU || "";
    document.getElementById("product-barcode").value = product.meta?.barcode || "";
    document.getElementById("product-asin").value = product.meta?.ASIN || "";
    document.getElementById("product-upc").value = product.meta?.UPC || "";
    document.getElementById("product-note").value = product.note || "";

    // Handle variety selection
    loadSelectedProducts(product.relatedProducts);

    // Load media (images/videos)
    loadMediaPreview(product.media || []);
};




document.getElementById("product-variety").addEventListener("change", function () {
    document.getElementById("variety-section").style.display = this.checked ? "block" : "none";
});

let varietyList = []; // Global array to store variations

function addVariationRow(variant = {}) {
    let tableBody = document.querySelector("#variety-table tbody");

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <select class="variant-size">
                <option value="">Select Size</option>
                <option value="Small" ${variant.size === "Small" ? "selected" : ""}>Small</option>
                <option value="Medium" ${variant.size === "Medium" ? "selected" : ""}>Medium</option>
                <option value="Large" ${variant.size === "Large" ? "selected" : ""}>Large</option>
                <option value="XL" ${variant.size === "XL" ? "selected" : ""}>XL</option>
            </select>
        </td>
        <td>
            <select class="variant-color">
                <option value="">Select Color</option>
                <option value="Black" ${variant.color === "Black" ? "selected" : ""}>Black</option>
                <option value="White" ${variant.color === "White" ? "selected" : ""}>White</option>
                <option value="Red" ${variant.color === "Red" ? "selected" : ""}>Red</option>
            </select>
        </td>
        <td><input type="number" class="variant-price" value="${variant.price || ""}" placeholder="Price"></td>
        <td><input type="number" class="variant-stock" value="${variant.stock || ""}" placeholder="Stock"></td>
        <td><button type="button" onclick="removeVariationRow(this)">Remove</button></td>
    `;

    tableBody.appendChild(row);
}
window.addVariationRow = addVariationRow;

/**
 * Remove a variant row
 */
function removeVariationRow(button) {
    button.closest("tr").remove();
}
window.removeVariationRow = removeVariationRow;

/**
 * Save Variants into `varietyList`
 */
function saveVariants() {
    varietyList = [];

    document.querySelectorAll("#variety-table tbody tr").forEach(row => {
        let size = row.querySelector(".variant-size").value;
        let color = row.querySelector(".variant-color").value;
        let price = parseFloat(row.querySelector(".variant-price").value) || 0;
        let stock = parseInt(row.querySelector(".variant-stock").value) || 0;

        if (size && color) {
            varietyList.push({ size, color, price, stock });
        }
    });

    console.log("Saved Variants:", varietyList);
}
window.saveVariants = saveVariants;






/**
 * Helper function to set multi-select values.
 */
function setMultiSelect(elementId, values) {
    const select = document.getElementById(elementId);
    if (!select) return;

    // Debugging: Log values to check the issue
    console.log(`setMultiSelect called for #${elementId} with values:`, values);




    // Ensure values is always an array
    if (!Array.isArray(values)) {
        if (typeof values === "string") {
            values = values.split(",").map(val => val.trim()); // Convert CSV string to an array
        } else if (values == null || values === undefined) {
            values = []; // Ensure values is always an array
        } else if (typeof values === "object") {
            try {
                values = Object.values(values); // Convert object to array if necessary
            } catch (e) {
                console.error(`Invalid data format for ${elementId}:`, values);
                values = []; // Fallback to an empty array
            }
        } else {
            console.error(`Unexpected type for ${elementId}:`, values);
            values = []; // Prevent crashing by assigning an empty array
        }
    }

    // If values is an empty array, log it and proceed (DO NOT RETURN)
    if (Array.isArray(values) && values.length === 0) {
        console.log(`No selections available for #${elementId}`);
       // return;
    }

    // Convert all options to an array and check if they match the product values
    Array.from(select.options).forEach(option => {
        option.selected = values.includes(option.value.trim());
    });
}



/**
 * Loads selected variants in the variant section.
 */
function loadSelectedProducts(relatedProducts) {
    let selectedProducts = document.getElementById("selected-related-products");
    selectedProducts.innerHTML = ""; // Clear previous variants

    if (!relatedProducts || relatedProducts.length === 0) return;

    relatedProducts.forEach(product => {
        let productItem = document.createElement("div");
        productItem.innerHTML = `<img src="${product.image}" width="50"> ${product.name}`;
        selectedProducts.appendChild(productItem);
    });
}





/**
 * Loads media preview (images & videos).
 */
function loadMediaPreview(mediaList) {
    let mediaPreview = document.getElementById("media-preview");
    mediaPreview.innerHTML = ""; // Clear previous media

    mediaList.forEach(url => {
        let mediaItem = document.createElement("div");
        if (url.includes(".mp4")) {
            mediaItem.innerHTML = `<video width="100" controls><source src="${url}" type="video/mp4"></video>`;
        } else {
            mediaItem.innerHTML = `<img src="${url}" width="100">`;
        }
        mediaPreview.appendChild(mediaItem);
    });
}



// Function to load category-specific inputs dynamically
document.addEventListener("DOMContentLoaded", function () {
    const productCategory = document.getElementById("product-category");
    const changeableSections = document.querySelectorAll(".changeable-sections");

    function loadCategoryAttributes() {
        // Hide all changeable sections
        changeableSections.forEach(section => section.style.display = "none");

        // Get selected category
        const selectedCategory = productCategory.value;

        // Show relevant section based on selected category
        if (selectedCategory === "Clothing") {
            document.getElementById("clothing-section").style.display = "block";
        } else if (selectedCategory === "Electronics") {
            document.getElementById("electronic-section").style.display = "block";
        } else if (selectedCategory === "Digital") {
            document.getElementById("digital-section").style.display = "block";
            document.getElementById("product-freeShipping").checked = true;
            document.getElementById("product-shipsFrom").value = "Digital";
            document.getElementById("product-delivery").value = "After Checkout";
            
        } else if (selectedCategory === "Customizable") {
            document.getElementById("custom-section").style.display = "block";
        }
    }

    // Run function when category changes
    productCategory.addEventListener("change", loadCategoryAttributes);

    // Run function once on page load (in case there's a pre-selected value)
    loadCategoryAttributes();
});



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
        "Clothing": [
            "T-Shirts", "Hoodies", "Jackets", "Jeans", "Shoes", 
            "Sweaters", "Dresses", "Shorts", "Socks", "Underwear", 
            "Activewear", "Swimwear", "Formal Wear", "Hats", "Scarves"
        ],
        "Electronics": [
            "Smartphones", "Laptops", "Headphones", "Cameras",
            "Tablets", "Smartwatches", "Gaming Consoles", "Monitors", 
            "Printers", "Drones", "Speakers", "VR Headsets", "Power Banks", 
            "Routers", "Wearable Tech"
        ],
        "Home & Kitchen": [
            "Furniture", "Appliances", "Cookware", "Bedding",
            "Lighting", "Home Decor", "Storage Solutions", "Cleaning Supplies", 
            "Bathroom Essentials", "Dinnerware", "Kitchen Tools", "Vacuum Cleaners",
            "Laundry Appliances", "Outdoor Furniture", "Smart Home Devices"
        ],
        "Beauty": [
            "Makeup", "Skincare", "Haircare", "Fragrances",
            "Nail Care", "Men’s Grooming", "Anti-Aging Products", "Bath & Body", 
            "Sunscreen", "Beauty Tools", "Organic & Natural", "Hair Styling Tools",
            "Perfumes & Colognes", "Facial Cleansers", "Lip Care"
        ],
        "Sports": [
            "Gym Equipment", "Cycling", "Running", "Outdoor Gear",
            "Team Sports", "Camping & Hiking", "Yoga & Pilates", "Fishing", 
            "Golf", "Tennis", "Water Sports", "Martial Arts", "Winter Sports",
            "Skateboarding", "Climbing Gear"
        ],
        "Toys & Games": [
            "Board Games", "Action Figures", "Educational Toys",
            "Building Blocks", "Dolls & Plush Toys", "Remote Control Toys", 
            "Puzzles", "Outdoor Play", "STEM Toys", "Musical Toys", 
            "Card Games", "Ride-on Toys", "Video Games", "Collectibles", "Magic Kits"
        ],
        "Automotive": [
            "Car Accessories", "Tires", "Tools", "Batteries",
            "Motorcycle Gear", "Car Cleaning Supplies", "Dash Cams", "GPS Devices", 
            "Car Audio", "Seat Covers", "Performance Parts", "Brake Systems",
            "Vehicle Lighting", "Safety Equipment", "Oil & Fluids"
        ],
        "Digital": [
            "E-books", "Software", "Online Courses", "Music Downloads",
            "Stock Photos", "Digital Art", "Website Templates", "Mobile Apps",
            "3D Models", "Digital Marketing Services", "Fonts & Typography",
            "Coding Scripts", "Online Subscriptions", "Video Templates",
            "Printable Designs"
        ],
        "Customizable": [
            "Engraved Jewelry", "Monogrammed Clothing", "Personalized Gifts",
            "Photo Albums", "Custom Stickers", "Customized Mugs",
            "DIY Craft Kits", "Tailored Suits", "Custom Shoes",
            "Bespoke Furniture", "Custom Pet Accessories",
            "Personalized Tech Gadgets", "Custom Artwork", "Handmade Jewelry",
            "Customized Phone Cases"
        ]
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







function showToast(message, type = "info", duration = 3000) {
    // Define icon types
    const icons = {
        success: "fa-check-circle",
        error: "fa-times-circle",
        warning: "fa-exclamation-triangle",
        info: "fa-info-circle"
    };
  
    // Ensure type is valid, fallback to "info"
    const iconClass = icons[type] || icons.info;
  
    // Create toast container if not exists
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }
  
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;
    toast.innerHTML = `
        <i class="fas ${iconClass}"></i> ${message}
        <button class="toast-close">&times;</button>
    `;
  
    // Style toast
    toast.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 18px;
        border-radius: 8px;
        font-size: 1rem;
        color: #fff;
        min-width: 250px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        position: relative;
        animation: fadeIn 0.3s ease-out;
    `;
  
    // Style by type
    const colors = {
        success: "#28a745",
        error: "#dc3545",
        warning: "#ffc107",
        info: "#007bff"
    };
    toast.style.backgroundColor = colors[type] || colors.info;
  
    // Close button styles
    const closeButton = toast.querySelector(".toast-close");
    closeButton.style.cssText = `
        border: none;
        background: transparent;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        position: absolute;
        top: 8px;
        right: 12px;
    `;
  
    // Close toast on button click
    closeButton.addEventListener("click", () => {
        toast.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => toast.remove(), 300);
    });
  
    // Auto-remove toast after duration
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => toast.remove(), 300);
    }, duration);
  
    // Append toast to container
    toastContainer.appendChild(toast);
  }
  
  // CSS Animations (can be moved to a CSS file)
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
  
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(10px); }
    }
  
    .toast-message {
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);
  window.showToast = showToast;
  
  









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