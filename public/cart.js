// cart.js

// Function to display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    // Clear previous items
    cartItemsContainer.innerHTML = "";

    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    // Iterate over cart items and display them in the table
    cartItems.forEach(item => {
        const row = document.createElement("tr");

        const productName = document.createElement("td");
        productName.textContent = item.name;

        const productPrice = document.createElement("td");
        productPrice.textContent = `$${item.price}`;

        const quantity = document.createElement("td");
        quantity.textContent = item.quantity;

        const totalPrice = document.createElement("td");
        const totalAmount = item.price * item.quantity;
        totalPrice.textContent = `$${totalAmount}`;
        total += totalAmount;

        const removeButtonCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeItemFromCart(item.id));
        removeButtonCell.appendChild(removeButton);

        row.appendChild(productName);
        row.appendChild(productPrice);
        row.appendChild(quantity);
        row.appendChild(totalPrice);
        row.appendChild(removeButtonCell);

        cartItemsContainer.appendChild(row);
    });

    // Update total cart price
    cartTotalElement.textContent = `Total: $${total}`;
}

// Function to remove an item from the cart
function removeItemFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter out the item with the specified productId
    cartItems = cartItems.filter(item => item.id !== productId);

    // Update the cart items in local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Update the displayed cart items
    displayCart();
}

// Call the function to display cart items when the page loads
window.onload = displayCart;
