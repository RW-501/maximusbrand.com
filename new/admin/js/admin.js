import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {
  getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';



import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js';

const storage = getStorage();

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
                    <button onclick="editProduct('${doc.id}', '${product.name}', '${product.image}', ${product.price}, ${product.stock})">Edit</button>
                    <button onclick="deleteProduct('${doc.id}')">Delete</button>
                </td>
            </tr>
        `;
        productTable.innerHTML += row;
    });
}

// Add / Update Product
productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const productData = {
        name: document.getElementById("product-name").value,
        collection: document.getElementById("product-collection").value,
        category: document.getElementById("product-category").value,
        description: document.getElementById("product-description").value,
        price: parseFloat(document.getElementById("product-price").value),
        discount: parseInt(document.getElementById("product-discount").value),
        stock: parseInt(document.getElementById("product-stock").value),
        media: mediaList.map(media => media.url), // Save media URLs
    };

    const productId = document.getElementById("product-id").value;

    if (productId) {
        await updateDoc(doc(db, "mainProducts", productId), productData);
    } else {
        await addDoc(collection(db, "mainProducts"), productData);
    }

    productForm.reset();
    mediaPreview.innerHTML = "";
    mediaList = [];
    loadProducts();
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