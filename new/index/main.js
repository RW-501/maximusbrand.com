


document.addEventListener("DOMContentLoaded", function () {
    fetch("scripts/json/mainProducts.json")
        .then(response => response.json())
        .then(products => displayProducts(products));

    function displayProducts(products) {
        let productGrid = document.getElementById("product-grid");
        productGrid.innerHTML = "";

        products.sort((a, b) => b.views - a.views); // Sort by most viewed

        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.className = "product-card";
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
    fetch("scripts/json/mainProducts.json")
        .then(response => response.json())
        .then(products => {
            let product = products.find(p => p.id === productId);
            let modal = document.getElementById("product-modal");
            document.getElementById("modal-content").innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: $${(product.price - (product.price * product.discount / 100)).toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            modal.style.display = "block";
        });
}



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
    let cartList = document.getElementById("cart-items");
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


function trackEvent(type, productId) {
    fetch("analytics.json")
        .then(response => response.json())
        .then(data => {
            data[type].push({ productId, timestamp: new Date().toISOString() });
            localStorage.setItem("analytics", JSON.stringify(data));
        });
}



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