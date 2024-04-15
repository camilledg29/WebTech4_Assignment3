var client = contentful.createClient({
    space: 'n4xlp6ev10ih',
    accessToken: 'uYR1oGphvCLeGanMqBdjsoGFd58qXfyxJMqNGh5LKzo',
});

client.getEntries({content_type: 'assignment3'}).then(function (entries) {
    // Get the container with the ID 'products-container' where you want to append your product cards
    var container = document.getElementById('products-container');

    entries.items.forEach(function (entry) {
        console.log(entry);

        // Create the main div for the product card with the 'product-cards' class
        var productDiv = document.createElement('div');
        productDiv.classList.add('product-cards');

        // Create img element for the main image
        var mainImage = document.createElement('img');
        mainImage.src = entry.fields.mainImage.fields.file.url;
        mainImage.alt = entry.fields.mainImage.fields.title;
        mainImage.classList.add('main-image');

        // Create a paragraph for the item name
        var nameP = document.createElement('p');
        nameP.classList.add('itemName');
        nameP.innerHTML = entry.fields.itemName;
        
        var priceH5 = document.createElement('h5');
        priceH5.classList.add('price');
        priceH5.innerHTML = entry.fields.price;

        // Assume each entry has a unique ID, using the sys.id from the entry for simplicity
        var itemId = entry.sys.id;


        productDiv.appendChild(mainImage);
        productDiv.appendChild(nameP);
        productDiv.appendChild(priceH5);

        container.appendChild(productDiv);
        var itemId = entry.sys.id;

        mainImage.addEventListener('click', function() {
            addToCart(itemId, entry.fields.itemName, entry.fields.price, entry.fields.mainImage.fields.file.url);
        });
    });
});

function addToCart(itemId, itemName, itemPrice, itemImageUrl) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(itemImageUrl);

    var existingItem = cartItems.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: itemId,
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }
    console.log(JSON.stringify(cartItems));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    updateCartCount();
}

function updateCartCount() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.getElementById('cart-count').textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

document.addEventListener('DOMContentLoaded', updateCartCount);

document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('active');
});
