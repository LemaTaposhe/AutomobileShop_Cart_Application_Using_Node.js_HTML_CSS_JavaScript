// admin.js

// Sample product data
let products = [
    { id: 1, name: "Product 1", description: "Description for Product 1", price: 10, image: "../images/product1.png" },
    { id: 2, name: "Product 2", description: "Description for Product 2", price: 20, image: "../images/product2.png" },
    { id: 3, name: "Product 3", description: "Description for Product 3", price: 30, image: "../images/product3.png" }
];

// Sample order data
let orders = [
    { id: 1, products: [{ id: 1, name: "Product 1", price: 10, quantity: 2 }, { id: 2, name: "Product 2", price: 20, quantity: 1 }], total: 40 },
    { id: 2, products: [{ id: 2, name: "Product 2", price: 20, quantity: 3 }], total: 60 }
];

// Function to display products in the admin panel
function displayProducts() {
    const productListContainer = document.getElementById("product-list");

    // Clear previous products
    productListContainer.innerHTML = "";

    // Display each product
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="Image123">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        productListContainer.appendChild(productItem);
    });
}

// Function to display orders in the admin panel
function displayOrders() {
    const orderListContainer = document.getElementById("order-list");

    // Clear previous orders
    orderListContainer.innerHTML = "";

    // Display each order
    orders.forEach(order => {
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.innerHTML = `
            <h3>Order #${order.id}</h3>
            <p>Total: $${order.total}</p>
            <ul>
                ${order.products.map(product => `<li>${product.name} - $${product.price} x ${product.quantity}</li>`).join("")}
            </ul>
            <button onclick="approveOrder(${order.id})">Approve</button>
            <button onclick="rejectOrder(${order.id})">Reject</button>
        `;
        orderListContainer.appendChild(orderItem);
    });
}

// Function to add a new product
function addProduct() {
    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").value;

    // Generate a unique ID for the new product
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    // Add the new product to the products array
    const newProduct = { id, name, description, price, image };
    products.push(newProduct);

    // Update local storage with the updated products array
    localStorage.setItem("products", JSON.stringify(products));

    // Update the product list displayed on the admin page
    displayProducts();

    // Update the product list displayed on the product.html page
    updateProductPageProductList();

    // Update the product list displayed on the index.html page
    updateHomePageProductList();

    // Clear the form fields
    document.getElementById("product-name").value = "";
    document.getElementById("product-description").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-image").value = "";
}



// Function to edit a product
// Function to edit a product
function editProduct(productId) {
    // Find the index of the product with the specified productId
    const index = products.findIndex(product => product.id === productId);

    if (index !== -1) {
        // Get the product object to edit
        const product = products[index];

        // Populate the form fields with the existing product details
        document.getElementById("edit-product-name").value = product.name;
        document.getElementById("edit-product-description").value = product.description;
        document.getElementById("edit-product-price").value = product.price;
        document.getElementById("edit-product-image").value = product.image;

        // Show the edit product modal
        const modal = document.getElementById("edit-product-modal");
        modal.style.display = "block";

        // Get the <span> element that closes the modal
        const closeBtn = modal.querySelector(".close");

        // When the user clicks on <span> (x), close the modal
        closeBtn.onclick = function () {
            modal.style.display = "none";
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };

        // Update the product when the form is submitted
        document.getElementById("edit-product-form").onsubmit = function (event) {
            event.preventDefault();

            // Get the updated product details from the form
            const name = document.getElementById("edit-product-name").value;
            const description = document.getElementById("edit-product-description").value;
            const price = document.getElementById("edit-product-price").value;
            const image = document.getElementById("edit-product-image").value;

            // Update the product in the products array
            products[index] = { ...product, name, description, price, image };

            // Hide the edit product modal
            modal.style.display = "none";

            // Refresh the displayed list of products
            displayProducts();
        };
    } else {
        console.log("Product not found.");
    }
}



// Function to delete a product
function deleteProduct(productId) {
    // Implement logic to delete a product
    products = products.filter(product => product.id !== productId);
    displayProducts();
}

// Function to approve an order
function approveOrder(orderId) {
    // Implement logic to approve an order
    console.log("Approving order with ID:", orderId);
}

// Function to reject an order
function rejectOrder(orderId) {
    // Implement logic to reject an order
    console.log("Rejecting order with ID:", orderId);
}

// Call the functions to display products and orders when the page loads
window.onload = function () {
    displayProducts();
    displayOrders();
};
