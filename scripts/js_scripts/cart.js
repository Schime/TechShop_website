document.addEventListener('DOMContentLoaded', function () {
    fetchCartItems();
    updateCartCount();
    fetchCategories();
    fetchProducts();
});


function fetchCartItems() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('You must be logged in to add items to the cart.');
        return;
    }
    console.log(userId);
    fetch('scripts/php_scripts/fetch_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId})
        })
        .then(response => response.json())
        .then(data => {
            const cartItemsDiv = document.getElementById('cart-items');
            const totalAmountSpan = document.getElementById('total-amount');
            let totalAmount = 0;

            cartItemsDiv.innerHTML = '';

            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <img src="${item.image}">
                    <p>${item.name} - $${item.price} x ${item.quantity}</p>
                    <button onclick="removeFromCart(${item.item_id})">X</button>
                `;
                cartItemsDiv.appendChild(itemDiv);

                totalAmount += item.price * item.quantity;
            });

            totalAmountSpan.textContent = totalAmount.toFixed(2);
        })
        .catch(error => console.error('Error fetching cart items:', error));
}


function fetchProducts() {
    fetch('scripts/php_scripts/fetch_products.php')
        .then(response => response.json())
        .then(data => {
            const productsDropdown = document.getElementById('products-dropdown');
            data.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="products.html?product=${product.id}">${product.name}</a>`;
                productsDropdown.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}


function fetchCategories() {
    fetch('scripts/php_scripts/fetch_categories.php')
        .then(response => response.json())
        .then(data => {
            const categoriesDropdown = document.getElementById('categories-dropdown');
            data.forEach(category => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="products.html?category=${category.id}#${category.name.toLowerCase()}">${category.name}</a>`;
                categoriesDropdown.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}


function removeFromCart(item_id) {
    console.log(item_id);
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('You must be logged in to add items to the cart.');
        return;
    }
    fetch('scripts/php_scripts/remove_from_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, item_id: item_id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchCartItems();
            updateCartCount();
        } else {
            alert('Error removing item from cart');
        }
    })
    .catch(error => console.error('Error removing item from cart:', error));
}


function updateCartCount() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('You must be logged in to add items to the cart.');
        return;
    }
    fetch('scripts/php_scripts/fetch_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId})
        })
        .then(response => response.json())
        .then(data => {
            const cartCount = data.reduce((count, item) => count + item.quantity, 0);
            document.getElementById('cart-count').textContent = cartCount;
        })
        .catch(error => console.error('Error updating cart count:', error));
}

document.getElementById('buy-button').addEventListener('click', function() {
    alert('Items bought! Thank you!');
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('You must be logged in to add items to the cart.');
        return;
    }
    fetch('scripts/php_scripts/clear_cart.php',  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId})
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchCartItems();
                updateCartCount();
            } else {
                alert('Error clearing cart');
            }
        })
        .catch(error => console.error('Error clearing cart:', error));
});

function logout(){
    localStorage.setItem('user_id', null);
}


