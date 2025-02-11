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
  
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAwidhrmgEda-1RdjQGW7kXsVAnzqmqBWE",
    authDomain: "technoob-86ddf.firebaseapp.com",
    projectId: "technoob-86ddf",
    storageBucket: "technoob-86ddf.firebasestorage.app",
    messagingSenderId: "802394401005",
    appId: "1:802394401005:web:9e6b45f1df7b1f927484e4",
    measurementId: "G-E2Z92KC5MM"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
});

let userId = null;
let cart = [];

// Initialize Firebase Auth and event listeners
function initializeAuth() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userId = user.uid;
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem('userID', user.uid);
            localStorage.setItem('userEmail', user.email);
            updateCartFromUser(user.uid);  // Sync cart from Firestore
        } else {
            localStorage.setItem('userLoggedIn', false);
            localStorage.removeItem('userID');
        }
    });
}

// Show the login popup if user is not logged in
function showLoginPopup() {
    if (localStorage.getItem('userLoggedIn') === 'false') {
        document.getElementById('login-popup').style.display = 'block';
    // Add the login popup dynamically when the page is ready
    insertLoginPopup();
}

}

window.showLoginPopup = showLoginPopup;

// Setup event listeners for buttons in the popup
function setupEventListeners() {
   

// Close the login popup
function closeLoginPopup() {
    document.getElementById('login-popup').style.display = 'none';
}

// Google Login
document.getElementById('google-login-btn').addEventListener('click', () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            userId = result.user.uid;
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem('userID', result.user.uid);
            localStorage.setItem('userEmail', result.user.email);
            closeLoginPopup();
            updateCartFromUser(result.user.uid);
        })
        .catch((error) => {
            showError(error.message);
        });
});

// Facebook Login
document.getElementById('facebook-login-btn').addEventListener('click', () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
        .then((result) => {
            userId = result.user.uid;
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem('userID', result.user.uid);
            localStorage.setItem('userEmail', result.user.email);
            closeLoginPopup();
            updateCartFromUser(result.user.uid);
        })
        .catch((error) => {
            showError(error.message);
        });
});

// Email Login
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem('userID', user.uid);
            localStorage.setItem('userEmail', user.email);
            closeLoginPopup();
            updateCartFromUser(user.uid);
        })
        .catch((error) => {
            showError(error.message);
        });
});

// Email Sign-Up
document.getElementById('signup-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem('userID', user.uid);
            localStorage.setItem('userEmail', user.email);
            closeLoginPopup();
        })
        .catch((error) => {
            showError(error.message);
        });
});

// Phone Number Login
document.getElementById('send-verification-code-btn').addEventListener('click', () => {
    const phoneNumber = document.getElementById('phone-number').value;
    const appVerifier = new RecaptchaVerifier('send-verification-code-btn', {
        'size': 'invisible',
        'callback': function(response) {
            // reCAPTCHA resolved
        }
    }, auth);

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert('Verification code sent!');
            document.getElementById('phone-login').style.display = 'none';
            document.getElementById('verification-code').style.display = 'inline-block';
        })
        .catch((error) => {
            showError(error.message);
        });
});

// Handle verification code input
document.getElementById('verification-code').addEventListener('input', (event) => {
    if (event.target.value.length === 6) {
        window.confirmationResult.confirm(event.target.value)
            .then((result) => {
                const user = result.user;
                localStorage.setItem('userLoggedIn', true);
                localStorage.setItem('userID', user.uid);
                localStorage.setItem('userEmail', user.email);
                closeLoginPopup();
                updateCartFromUser(user.uid);
            })
            .catch((error) => {
                showError(error.message);
            });
    }
});

// Update Cart from Firestore (Sync)
function updateCartFromUser(userId) {
    const userRef = doc(db, 'users', userId);
    getDoc(userRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
            cart = docSnapshot.data().cart || [];
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Cart updated successfully!');
        } else {
            console.error("User not found!");
        }
    }).catch((error) => {
        console.error("Error fetching user data: ", error);
    });
}

// Show Error Message
function showError(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}
}

function insertLoginPopup() {
    // Popup HTML
    const popupHTML = `
    <div id="login-popup" class="login-popup" style="display:none;">
        <div class="popup-content">
            <h2 id="popup-title">Login or Sign Up</h2>
            
            <!-- Email & Password Login -->
            <input type="email" id="email" placeholder="Email" />
            <input type="password" id="password" placeholder="Password" />
            
            <!-- Phone Number Login -->
            <div id="phone-login" style="display:none;">
                <input type="text" id="phone-number" placeholder="Phone Number" />
                <button id="send-verification-code-btn">Send Verification Code</button>
                <input type="text" id="verification-code" placeholder="Verification Code" />
            </div>
            
            <!-- Social Login Buttons -->
            <button id="google-login-btn">Login with Google</button>
            <button id="facebook-login-btn">Login with Facebook</button>
            
            <!-- Sign Up Button -->
            <button id="signup-btn">Sign Up</button>
            
            <!-- Error Message -->
            <p id="error-message" style="color:red; display:none;"></p>
            
            <button id="close-popup">Close</button>
        </div>
    </div>
    `;

    // Insert popup HTML into body
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Add event listeners for the buttons
    setupEventListeners();
}

// Popup Styling
const popupStyles = `
    .login-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .popup-content {
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        width: 400px;
        max-width: 100%;
        text-align: center;
    }

    .popup-content input {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 5px;
    }

    button:hover {
        background-color: #0056b3;
    }
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = popupStyles;
document.head.appendChild(styleSheet);

