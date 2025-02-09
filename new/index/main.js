
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
// Firestore imports
import {
  getFirestore,
  doc, arrayRemove,
  getDoc, serverTimestamp,
  query, startAfter,
  updateDoc, orderBy,
  setDoc, limit, 
  addDoc, deleteDoc,writeBatch ,
  getDocs, increment,
  where, arrayUnion,onSnapshot ,
  collection
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

// Authentication imports
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider, signInAnonymously, EmailAuthProvider,
  signOut, RecaptchaVerifier,  linkWithCredential,
  onAuthStateChanged, signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

// Storage import
import { getDownloadURL, uploadBytes, uploadBytesResumable, ref, getStorage, deleteObject } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js';

// Analytics import
import { initializeAnalytics } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js';


const DEBUG = false;
if (DEBUG) console.log("Module Debug on");
 
// Initialize Firebase
let auth;
let db;
let storage;
let analytics;
let userId;
let batch;
document.addEventListener('DOMContentLoaded', () => {
  initializeFirebase(); // Initialize Firebase only after the DOM is ready
});



  function initializeFirebase() {
// Initialize Firebase (Make sure Firebase is properly initialized in your project)
const firebaseConfig = {
    apiKey: "AIzaSyAwidhrmgEda-1RdjQGW7kXsVAnzqmqBWE",
    authDomain: "technoob-86ddf.firebaseapp.com",
    projectId: "technoob-86ddf",
    storageBucket: "technoob-86ddf.firebasestorage.app",
    messagingSenderId: "802394401005",
    appId: "1:802394401005:web:9e6b45f1df7b1f927484e4",
    measurementId: "G-E2Z92KC5MM"
  };
  
    try {
      const app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
      analytics = initializeAnalytics(app);
       batch = writeBatch(db); // db is the Firestore database reference
  
  
  
       onAuthStateChanged(auth, (user) => {
        if (DEBUG)  console.log("currentUrl   ",currentUrl);
  
        if (user){
          if (DEBUG)  console.log("User")
        }  else{
          if (DEBUG)  console.log("No User");
        }
            
  
        if (user) {
          const allUserBtns = document.querySelectorAll('.side-user-btn');
          allUserBtns.forEach((btns) => {
            if (btns) btns.style.display = 'block';
          });
      
          const joinArea = document.getElementById('btn-join-area');
          if (joinArea) joinArea.style.display = 'none';
        
                
          if (DEBUG) console.log("Module User ID: ", user.uid);
      
          // Store user ID and email in local storage
          localStorage.setItem('userLoggedIn', true);
          localStorage.setItem('userID', user.uid);
          localStorage.setItem('userEmail', user.email);
      
          userId = user.uid;
      
          // Fetch user data, ensure darkMode is checked safely
          try {
   
          } catch (error) {
            if (DEBUG)  console.error("Error fetching user data:", error.message);
          }
          
     
        } else {
            if (DEBUG)  console.log("No user signed in");
        
            // Clear local storage
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userID');
            localStorage.removeItem('userEmail');
        
            userId = null;
        
            // Set userLoggedIn to false in local storage
            localStorage.setItem('userLoggedIn', false);
    
    
            
            const joinArea = document.getElementById('btn-join-area');
            if (joinArea) joinArea.style.display = 'block';
          }
       
        });
        
        
     //   console.log("Firebase initialized successfully");
      } catch (error) {
        if (DEBUG)   console.error("Authentication error:", error.message, error.stack);
      }
    
    }
    
// Initialize Google and Facebook Auth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
     
        
  
document.addEventListener("DOMContentLoaded", function () {
    fetch("scripts/json/mainProducts.json")
        .then(response => response.json())
        .then(products => displayProducts(products));
        console.log('response  ', response);

    function displayProducts(products) {
        let productGrid = document.getElementById("tn_ID_ProductGrid");
        productGrid.innerHTML = "";

        products.sort((a, b) => b.views - a.views); // Sort by most viewed

        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.className = "tn_Class_ProductCard";
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${(product.price - (product.price * product.discount / 100)).toFixed(2)} 
                   <span class="old-price">$${product.price.toFixed(2)}</span></p>
                <button onclick="viewProduct(${product.id})">View</button>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
    }
});


function viewProduct(productId) {
    let modal = document.getElementById("tn_ID_ProductModal");
    let modalContent = document.getElementById("tn_ID_ModalContent");

    // Fetch product from Firebase Firestore
    db.collection("mainProducts").doc(productId.toString()).get()
        .then((doc) => {
            if (doc.exists) {
                let product = doc.data();

                // Check stock availability
                let stockStatus = product.stock > 0
                    ? `<button onclick="addToCart(${productId})">Add to Cart</button>`
                    : `<p style="color:red;">Out of Stock</p>`;

                modalContent.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${(product.price - (product.price * product.discount / 100)).toFixed(2)}</p>
                    ${stockStatus}
                `;

                modal.style.display = "block";
            } else {
                alert("Product not found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching product:", error);
            alert("Error fetching product details.");
        });
}

window.viewProduct = viewProduct;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
    fetch("scripts/json/mainProducts.json")
        .then(response => response.json())
        .then(products => {
            let product = products.find(p => p.id === productId);
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        });
}

function updateCartUI() {
    let cartList = document.getElementById("tn_Class_CartItems");
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

window.removeFromCart = removeFromCart;


function trackEvent(type, productId) {
    fetch("analytics.json")
        .then(response => response.json())
        .then(data => {
            data[type].push({ productId, timestamp: new Date().toISOString() });
            localStorage.setItem("analytics", JSON.stringify(data));
        });
}

window.trackEvent = trackEvent;

paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: { value: calculateCartTotal() }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert("Transaction completed by " + details.payer.name.given_name);
            localStorage.removeItem("cart");
            updateCartUI();
        });
    }
}).render("#paypal-button-container");






    // Update year dynamically
    document.getElementById("tn_ID_Year").textContent = new Date().getFullYear();
