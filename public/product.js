

// Sample product data
const products = [
    { id: 1, name: "Audi R8", description: "Description for Product 1", price: 7000, image: "../images/product1.png" },
    { id: 2, name: "Audi R5", description: "Description for Product 2", price: 5000, image: "../images/product2.png" },
    { id: 3, name: "Audi R3", description: "Description for Product 3", price: 3000, image: "../images/product3.png" }
];

// Function to display product details on the product page.
function displayProductDetails() {
    const productDetailsContainer = document.getElementById("product-details");
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    const urlParams = new URLSearchParams(window.location.search);
    const viewAll = urlParams.get('view') === 'all';
    if (viewAll) {        
        displayAllProducts();
    } else {        
        displaySingleProduct(selectedProduct);
    }
}

// Function to display details of a specific product
function displaySingleProduct(product) {
    const productDetailsContainer = document.getElementById("product-details");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;

    const name = document.createElement("h2");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.textContent = `Price: $${product.price}`;

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Quantity:";
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.id = "quantity";

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener("click", () => addToCart(product, quantityInput.value));

    productDetailsContainer.appendChild(image);
    productDetailsContainer.appendChild(name);
    productDetailsContainer.appendChild(description);
    productDetailsContainer.appendChild(price);
    productDetailsContainer.appendChild(quantityLabel);
    productDetailsContainer.appendChild(quantityInput);
    productDetailsContainer.appendChild(addToCartButton);
}

// Function to display all products with Add to Cart button and quantity input
function displayAllProducts() {
    const productDetailsContainer = document.getElementById("product-details");

    products.forEach(product => {
        const productContainer = document.createElement("div");
        productContainer.classList.add("product");

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const name = document.createElement("h2");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.textContent = `Price: $${product.price}`;

        const quantityLabel = document.createElement("label");
        quantityLabel.textContent = "Quantity:";
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = 1;
        quantityInput.min = 1;
        quantityInput.id = "quantity";

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", () => addToCart(product, quantityInput.value));

        productContainer.appendChild(image);
        productContainer.appendChild(name);
        productContainer.appendChild(description);
        productContainer.appendChild(price);
        productContainer.appendChild(quantityLabel);
        productContainer.appendChild(quantityInput);
        productContainer.appendChild(addToCartButton);

        productDetailsContainer.appendChild(productContainer);
    });
}

// Function to add the selected product to the cart
function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
        cart[index].quantity += parseInt(quantity);
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: parseInt(quantity) });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}
window.onload = displayProductDetails;


