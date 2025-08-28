
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
  <button onclick="quickProductView('${product.id}')">Quick View</button>
<button onclick="viewProduct('${product.id}')">View</button>
<button onclick="addToCart('${product.id}')">Add to Cart</button>
          `;
            productGrid.appendChild(productCard);
        });
    }
});


function quickProductView(productId) {
    let modal = document.getElementById("tn_ID_ProductModal");
    let modalContent = document.getElementById("tn_ID_ModalContent");

    fetch("scripts/json/mainProducts.json")
        .then(response => response.json())
        .then(products => {
            let product = products.find(p => p.id === productId);

                // Check stock availability
                let stockStatus = product.stock > 0
                    ? `<button onclick="addToCart('${productId}')">Add to Cart</button>`
                    : `<p style="color:red;">Out of Stock</p>`;

                modalContent.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${(product.price - (product.price * product.discount / 100)).toFixed(2)}</p>
                    ${stockStatus}
                `;

                modal.style.display = "block";
  
    
      });
    }

    window.quickProductView = quickProductView;




    function viewProduct(productId) {
      window.location = `https://maximusbrand.com/new/item${productId}`;
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
window.addToCart = addToCart;

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








    // Update year dynamically
    document.getElementById("tn_ID_Year").textContent = new Date().getFullYear();
