const cartBadge = document.querySelector('.cart-count');
const logout_button = document.querySelector('.logout_button');



document.addEventListener('DOMContentLoaded', function () {
    fetchCategories();
    fetchProducts();
    updateCartCount();

    const currentUrl = window.location.href;
    const parsedUrl = new URL(currentUrl);
    const params = new URLSearchParams(parsedUrl.search);
    const category = params.get('category');
    const products = params.get('product');
    fetchProductItems({products : products});
    fetchItems({ category: category });
});


function fillItemsGrid(items) {
    document.getElementById('products-grid').innerHTML = ``;
    for (const item of items) {
        
        const itemCard = document.createElement('div');
        itemCard.className = "product";

        itemCard.innerHTML = `
        <img src="${item.image}">
        <p>${item.name} - $${item.price}</p>
        <button onclick="addToCart(${item.id})">Add</button>
        `;

        document.getElementById('products-grid').appendChild(itemCard);
    }
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


function fetchItems(params = {}) {
    fetch('scripts/php_scripts/fetch_items.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category: params })
        })    
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            fillItemsGrid(data);
        })
        .catch(error => console.error('Error fetching items:', error));
}


function fetchProductItems(params = {}) {
    fetch('scripts/php_scripts/fetch_products_category.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product: params })
        })    
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            fillItemsGrid(data);
        })
        .catch(error => console.error('Error fetching items:', error));
}


// Funkcija za dinamicko generiranje i appendanje kategoriranih sekcija itema unutar spreminka (containera)
function appendCategorySections(itemsSection, categorySections, itemType, itemTitle) {
    const sectionDiv = document.createElement('div');
    sectionDiv.innerHTML = `<h2>${itemTitle}</h2>`;
    Object.keys(categorySections).forEach(id => {
        if (categorySections[id][itemType].length) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-section';
            categoryDiv.innerHTML = `<h3 id="${categories[id].toLowerCase()}">${categories[id]}</h3>`;

            const itemsDiv = document.createElement('div');
            itemsDiv.className = itemType === 'phones' ? 'phones-section' : 'headphones-section';
            categorySections[id][itemType].forEach(item => {
                itemsDiv.innerHTML += createItemCard(item);
            });
            categoryDiv.appendChild(itemsDiv);
            sectionDiv.appendChild(categoryDiv);
        }
    });
    itemsSection.appendChild(sectionDiv);
}


function createItemCard(item) {
    return `
        <div class="item-card">
            <img src="images/${item.name.replace(/\s+/g, '_').toLowerCase()}.jpg" alt="${item.name}">
            <p>${item.name} - $${item.price}</p>
            <button onclick="addToCart(${item.id})">Add</button>
        </div>
    `;
}


function addToCart(itemId) {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('You must be logged in to add items to the cart.');
        return;
    }
    console.log(userId);
    fetch('scripts/php_scripts/add_to_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, item_id: itemId })
    })
    .then(response => {
        if (response.ok) {
            updateCartCount();
            alert('Item added to cart');
        } else {
            alert('Error adding item to cart: ' + data.message);
        }
    })
    .catch(error => console.error('Error adding item to cart:', error));
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




function logout(){
    localStorage.setItem('user_id', null);
}
logout_button.addEventListener('click', logout);