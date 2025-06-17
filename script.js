// Product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones Pro",
        description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
        price: 199.99,
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch Ultra",
        description: "Advanced fitness tracking with heart rate monitor and GPS",
        price: 299.99,
        icon: "⌚"
    },
    {
        id: 3,
        name: "Portable Charger",
        description: "20,000mAh fast-charging power bank with wireless charging",
        price: 79.99,
        icon: "🔋"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        description: "360° surround sound with waterproof design",
        price: 129.99,
        icon: "🔊"
    },
    {
        id: 5,
        name: "Wireless Mouse",
        description: "Ergonomic design with precision tracking and RGB lighting",
        price: 49.99,
        icon: "🖱️"
    },
    {
        id: 6,
        name: "USB-C Hub",
        description: "7-in-1 connectivity hub with 4K HDMI and fast charging",
        price: 89.99,
        icon: "🔌"
    },
    {
        id: 7,
        name: "Gaming Keyboard",
        description: "Mechanical RGB keyboard with customizable keys and macros",
        price: 149.99,
        icon: "⌨️"
    },
    {
        id: 8,
        name: "Webcam 4K Pro",
        description: "Ultra HD webcam with auto-focus and noise-cancelling microphone",
        price: 159.99,
        icon: "📹"
    },
    {
        id: 9,
        name: "Wireless Earbuds",
        description: "True wireless earbuds with active noise cancellation and touch controls",
        price: 119.99,
        icon: "🎵"
    },
    {
        id: 10,
        name: "Phone Stand Pro",
        description: "Adjustable aluminum phone stand with wireless charging pad",
        price: 39.99,
        icon: "📱"
    },
    {
        id: 11,
        name: "Laptop Cooling Pad",
        description: "RGB cooling pad with 6 fans and temperature display",
        price: 69.99,
        icon: "💻"
    },
    {
        id: 12,
        name: "VR Headset",
        description: "Immersive virtual reality headset with 4K display and spatial audio",
        price: 399.99,
        icon: "🥽"
    },
    {
        id: 13,
        name: "Smart Light Bulb",
        description: "WiFi-enabled LED bulb with 16 million colors and voice control",
        price: 24.99,
        icon: "💡"
    },
    {
        id: 14,
        name: "Drone Camera",
        description: "4K camera drone with GPS auto-return and 25-minute flight time",
        price: 449.99,
        icon: "🚁"
    },
    {
        id: 15,
        name: "Tablet Stylus",
        description: "Precision stylus with pressure sensitivity and palm rejection",
        price: 79.99,
        icon: "✏️"
    },
    {
        id: 16,
        name: "Car Phone Mount",
        description: "Magnetic car mount with 360° rotation and wireless charging",
        price: 34.99,
        icon: "🚗"
    },
    {
        id: 17,
        name: "Security Camera",
        description: "Smart home security camera with night vision and motion alerts",
        price: 89.99,
        icon: "📷"
    },
    {
        id: 18,
        name: "Fitness Tracker",
        description: "Waterproof fitness band with heart rate and sleep monitoring",
        price: 59.99,
        icon: "🏃"
    }
];

// Cart state
let cart = [];

// Initialize the store
function init() {
    renderProducts();
    updateCartUI();
}

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">$${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification('Product added to cart!');
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Item removed from cart');
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    const totalAmount = document.getElementById('totalAmount');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartTotal.style.display = 'none';
        cartItems.innerHTML = '';
    } else {
        emptyCart.style.display = 'none';
        cartTotal.style.display = 'block';
        
        // Render cart items
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');

        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Clear cart
function clearCart() {
    cart = [];
    updateCartUI();
    showNotification('Cart cleared!');
}

// Checkout
function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`🎉 Thank you for your purchase!\n\nOrder Summary:\n${itemCount} items\nTotal: $${total.toFixed(2)}\n\nYour order will be processed shortly!`);
    
    cart = [];
    updateCartUI();
    toggleCart();
    showNotification('Order placed successfully!');
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize the store when page loads
document.addEventListener('DOMContentLoaded', init);