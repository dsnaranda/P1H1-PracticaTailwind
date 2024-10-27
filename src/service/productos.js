let cart = {};

// Function to check user data in localStorage
function checkUserData() {
    const userData = localStorage.getItem('userData'); // Cambia 'userData' al nombre que estés utilizando
    return userData !== null; // Retorna verdadero si hay datos de usuario
}

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/productos');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    // Check if user data exists
    const userLoggedIn = checkUserData();
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('bg-gray-800', 'rounded-lg', 'm-4', 'p-4', 'w-60', 'text-center');
        productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.nombre}" class="object-cover rounded-lg mb-2 h-48" style="width: 100%; height: 200px; object-fit: contain;">
        <p class="text-md text-white font-bold">${product.nombre}</p>
        <p class="text-sm text-white">$${product.precio}</p>
        <button onclick="addToCart('${product._id}', '${product.nombre}', ${product.precio})" 
                class="bg-red-500 text-white px-3 py-1 rounded-md mt-2 ${userLoggedIn ? '' : 'opacity-50 cursor-not-allowed'}"
                ${userLoggedIn ? '' : 'disabled'}>
            Añadir al carrito
        </button>
    `;
        container.appendChild(productDiv);
    });
}

function addToCart(id, name, price) {
    if (cart[id]) {
        cart[id].quantity += 1;
    } else {
        cart[id] = { name, price, quantity: 1 };
    }
    updateCartSummary();
}

// Update Cart Summary
function updateCartSummary() {
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    for (const [id, item] of Object.entries(cart)) {
        total += item.price * item.quantity;
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.quantity} x $${item.price}`;
        cartItems.appendChild(listItem);
    }

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartSummary.classList.remove('hidden');
}

function showUserName() {
    const userData = localStorage.getItem("userData"); // Obtener los datos del usuario
    const userNameElement = document.getElementById("user-name");

    if (userData) {
        const userObject = JSON.parse(userData); // Parsear el JSON a un objeto
        const userName = userObject.user.nombre; // Acceder al nombre del usuario
        
        if (userName) {
            userNameElement.textContent = `La factura fue realizada a nombre de: ${userName}`;
        } else {
            userNameElement.textContent = "Nombre de usuario no encontrado.";
        }
    } else {
        userNameElement.textContent = "Datos de usuario no encontrados.";
    }
}

// Initial Fetch
fetchProducts();
