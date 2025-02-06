import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {
  getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

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
    
    const id = document.getElementById("product-id").value;
    const name = document.getElementById("product-name").value;
    const image = document.getElementById("product-image").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const stock = parseInt(document.getElementById("product-stock").value);
    
    if (id) {
        // Update Product
        await updateDoc(doc(db, "mainProducts", id), { name, image, price, stock });
    } else {
        // Add New Product
        await addDoc(collection(db, "mainProducts"), { name, image, price, stock });
    }
    
    productForm.reset();
    loadProducts();
});

// Edit Product
window.editProduct = (id, name, image, price, stock) => {
    document.getElementById("product-id").value = id;
    document.getElementById("product-name").value = name;
    document.getElementById("product-image").value = image;
    document.getElementById("product-price").value = price;
    document.getElementById("product-stock").value = stock;
};

// Delete Product
window.deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
        await deleteDoc(doc(db, "mainProducts", id));
        loadProducts();
    }
};
