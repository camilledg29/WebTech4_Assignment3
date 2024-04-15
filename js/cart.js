function displayCartItems() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartItemsContainer = document.querySelector('.cart-items-container');
    
    cartItemsContainer.innerHTML = ''; // Clear out any existing elements

    cartItems.forEach(function(item) {
        var itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>Name: ${item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

document.addEventListener('DOMContentLoaded', displayCartItems);

document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('active');
});
