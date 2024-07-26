// Sample product data
const products = [
    { id: 1, name: "Audi R8", description: "Description for Product 1", price: 7000, image: "../images/product1.png" },
    { id: 2, name: "Audi R5", description: "Description for Product 2", price: 5000, image: "../images/product2.png" },
    { id: 3, name: "Audi R3", description: "Description for Product 3", price: 3000, image: "../images/product3.png" }
];

// Function to generate product cards on the index page
function generateProductCards() {
    const container = document.getElementById("products-container");

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
        `;

        // Add event listener for clicking on product card
        card.addEventListener("click", () => {
            // Redirect to product page with specific product object
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "product.html";
        });

        container.appendChild(card);
    });
}

// Call the function to generate product cards when the page loads
window.onload = generateProductCards;


// Function to retrieve products from local storage
function getProductsFromStorage() {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
        return JSON.parse(storedProducts);
    } else {
        return [];
    }
}

//// Function to update the product list displayed on the index.html page
//function updateHomePageProductList() {
//    const productListContainer = document.getElementById("product-list-home");
//    productListContainer.innerHTML = "";

//    const products = getProductsFromStorage();

//    products.forEach(product => {
//        const productCard = document.createElement("div");
//        productCard.classList.add("product-card");
//        productCard.innerHTML = `
//            <img src="${product.image}" alt="${product.name}">
//            <h3>${product.name}</h3>
//            <p>$${product.price}</p>
//            <button onclick="addToCart(${product.id})">Add to Cart</button>
//        `;
//        productListContainer.appendChild(productCard);
//    });
//}

//// Call the function to update the product list on page load
//updateHomePageProductList();
