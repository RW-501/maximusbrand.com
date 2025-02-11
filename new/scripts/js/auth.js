const style = document.createElement('style');
style.innerHTML = `
  html {
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }
`;
document.head.appendChild(style);

window.addEventListener('load', function() {
    // Wait for 2 seconds before starting the fade-in effect
    setTimeout(function() {
        document.documentElement.style.visibility = 'visible';
        document.documentElement.style.opacity = '1';  // Fade in effect
    }, 1000); // 2000ms = 2 seconds
});




const DEBUG = true;
        const loadedScripts = new Set();
        let totalFileSize = 0;
        let loadCount = 0;

        const currentPath = window.location.pathname;
        const currentUrl = window.location.href;

        if (DEBUG) {
            console.log(`CurrentPath: ${currentPath}`);
            console.log("currentUrl   ", currentUrl);
        }

        /**
         * Logs the execution time and file size of a script and tracks overall page load statistics.
         * @param {string} scriptName - Name or URL of the script.
         * @param {number} startTime - The script's load start time.
         * @param {string} fileSize - The file size of the script in KB.
         */
        function logExecutionTime(scriptName, startTime, fileSize) {
            if (DEBUG) {
                const endTime = performance.now();
                const executionTime = endTime - startTime;
                console.log(
                    `${scriptName} initialized. Execution Time: ${executionTime.toFixed(2)} ms. File Size: ${fileSize}. Load Count: ${loadCount++}`
                );
            }

            if (fileSize !== "unknown" && fileSize !== "not available") {
                totalFileSize += parseFloat(fileSize);
            }

            if (loadCount === "end") {
                const pageEndTime = performance.now();
                const pageLoadTime = (pageEndTime - pageStartTime) / 1000;
                console.log(`Total Page Load Time: ${pageLoadTime.toFixed(2)} seconds.`);
                console.log(`Total Page Size: ${totalFileSize.toFixed(2)} KB.`);
            }
        }

        /**
         * Dynamically loads a script with optional attributes and callback function.
         * @param {string} src - URL of the script.
         * @param {Object} options - Attributes for the script (async, defer, type).
         * @param {function} callback - Callback executed after the script loads.
         */
        async function loadScript(src, { async = false, defer = false, type = 'text/javascript' } = {}, callback) {
            if (loadedScripts.has(src)) {
                console.log(`Script already loaded: ${src}`);
                if (callback) callback();
                return;
            }

            const startTime = performance.now();
            let fileSize = "unknown";

            try {
                const response = await fetch(src, { method: 'HEAD' });
                if (response.ok) {
                    fileSize = response.headers.get('Content-Length');
                    if (fileSize) {
                        fileSize = `${(fileSize / 1024).toFixed(2)} KB`;
                    } else {
                        fileSize = "not available";
                    }
                } else {
                    console.warn(`Unable to fetch file size for: ${src}`);
                }
            } catch (error) {
                console.error(`Error fetching file size for ${src}:`, error);
            }

            const script = document.createElement('script');
            script.src = src;
            script.type = type;
            script.async = async;
            script.defer = defer;
            script.onload = () => {
                loadedScripts.add(src);
                logExecutionTime(src, startTime, fileSize);
                if (callback) callback();
            };
            script.onerror = () => {
                console.error(`Error loading script: ${src}`);
            };

            document.head.appendChild(script);
        }

        /**
         * Waits until a specific DOM element is available, then executes a callback function.
         * @param {string} selector - CSS selector for the target element.
         * @param {function} callback - Callback executed when the element becomes available.
         */
        function waitForElement(selector, callback) {
            // Check if the element already exists
            const element = document.querySelector(selector);
            if (element) {
                callback();
            } else {
                // If the element doesn't exist, set up a MutationObserver
                const observer = new MutationObserver((mutations, obs) => {
                    // Check if the element appears
                    const element = document.querySelector(selector);
                    if (element) {
                        obs.disconnect();  // Disconnect the observer once the element is found
                        callback();
                    }
                });

                // Observe changes to the document body, including all child nodes and subtree
                observer.observe(document.body, { childList: true, subtree: true });
            }
        }

        /**
         * Dynamically loads a stylesheet into the document.
         * @param {string} href - URL of the stylesheet.
         */
        function loadStylesheet(href) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        }

        // Function to load external HTML files into the page
        function loadHTML(url, targetId) {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    document.getElementById(targetId).innerHTML = data;
                })
                .catch(error => console.error('Error loading HTML:', error));
        }

        // Call the function to insert the navbar and footer into the page
        window.addEventListener('DOMContentLoaded', (event) => {
            loadHTML('https://maximusbrand.com/new/scripts/js/navBar.html', 'navbar');
            loadHTML('https://maximusbrand.com/new/scripts/js/footer.html', 'footer');
        });

        // Load jQuery
        loadScript('https://code.jquery.com/jquery-3.5.1.slim.min.js', { async: false }, () => { 
            logExecutionTime('jquery', performance.now());
        });

        // Load Popper.js
        loadScript('https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js', { async: false }, () => {
            logExecutionTime('schema', performance.now());
        });

        // Load Bootstrap CSS
        loadStylesheet("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
        logExecutionTime('Bootstrap CSS', performance.now());

        // Google Fonts for font styles
        loadStylesheet("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
        logExecutionTime('Google Fonts for font styles', performance.now());

        // FontAwesome for icons
        loadStylesheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
        logExecutionTime('FontAwesome for icons', performance.now());



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






// Function to load HTML content from a URL and insert it into a specific element
function loadHTML(url, targetId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Call the function to insert the navbar and footer into the page
window.addEventListener('DOMContentLoaded', (event) => {
    loadHTML('https://maximusbrand.com/new/scripts/js/navBar.html', 'navbar');
    loadHTML('https://maximusbrand.com/new/scripts/js/footer.html', 'footer');
});

