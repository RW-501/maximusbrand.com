// Authentication JavaScript (authentication.js)

// Function to authenticate admin users with email and password
function loginAdminUser(email, password) {
  // Assuming you have already initialized Firebase and Firebase Auth
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Admin user logged in successfully.');
      // Redirect to the admin dashboard page or update UI as needed
    })
    .catch((error) => {
      console.error('Error logging in:', error);
      // Display error message to the user, e.g., in the error bar
    });
}

// Event listener for submitting the Login form
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Call the function to login the admin user
  loginAdminUser(email, password);
});

