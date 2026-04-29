class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        // Create cart UI
        this.createCartUI();
        // Load cart from localStorage if exists
        this.loadCart();
        // Add event listeners
        this.addEventListeners();
    }

    createCartUI() {
        const cartHTML = `
            <div id="cart-container" class="cart-container">
                <div class="cart-header">
                    <h3>Your Cart</h3>
                    <button class="close-cart">×</button>
                </div>
                <div class="cart-items"></div>
                <div class="cart-summary">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span class="total-amount">$0</span>
                    </div>
                    <button class="checkout-btn">Proceed to Checkout</button>
                </div>
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            </div>
        `;

        // Add cart styles
        const cartStyles = `
            <style>
                .cart-container {
                    position: fixed;
                    top: 0;
                    right: -400px;
                    width: 400px;
                    height: 100vh;
                    background: white;
                    box-shadow: -2px 0 10px rgba(0,0,0,0.1);
                    transition: right 0.3s ease;
                    z-index: 1001;
                    display: flex;
                    flex-direction: column;
                }

                .cart-container.active {
                    right: 0;
                }

                .cart-header {
                    padding: 20px;
                    background: linear-gradient(90deg, rgba(255,255,0,0.9) 0%, rgba(255,165,0,0.9) 100%);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .cart-header h3 {
                    margin: 0;
                    color: #000;
                    font-size: 1.5rem;
                }

                .close-cart {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #000;
                    transition: transform 0.3s ease;
                }

                .close-cart:hover {
                    transform: rotate(90deg);
                }

                .cart-items {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                }

                .cart-item {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                    animation: slideIn 0.3s ease;
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .cart-item img {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 8px;
                    margin-right: 15px;
                }

                .item-details {
                    flex: 1;
                }

                .item-details h4 {
                    margin: 0 0 5px 0;
                    color: #333;
                }

                .item-price {
                    color: #666;
                    font-weight: bold;
                }

                .remove-item {
                    background: none;
                    border: none;
                    color: #ff4444;
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: 5px;
                    transition: transform 0.3s ease;
                }

                .remove-item:hover {
                    transform: scale(1.2);
                }

                .cart-summary {
                    padding: 20px;
                    background: #f9f9f9;
                    border-top: 1px solid #eee;
                }

                .cart-total {
                    display: flex;
                    justify-content: space-between;
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 15px;
                }

                .checkout-btn {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(90deg, rgba(255,255,0,0.9) 0%, rgba(255,165,0,0.9) 100%);
                    border: none;
                    border-radius: 25px;
                    color: #000;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .checkout-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }

                .empty-cart-message {
                    display: none;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: #666;
                }

                .empty-cart-message i {
                    font-size: 3rem;
                    margin-bottom: 15px;
                    color: #ddd;
                }

                @media (max-width: 480px) {
                    .cart-container {
                        width: 100%;
                        right: -100%;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', cartStyles);
        document.body.insertAdjacentHTML('beforeend', cartHTML);
    }

    addEventListeners() {
        // Navbar cart button only
        document.querySelector('.nav-cart-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleCart();
        });

        // Close cart button
        document.querySelector('.close-cart').addEventListener('click', () => this.toggleCart());

        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', () => this.checkout());

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            const cart = document.getElementById('cart-container');
            const navCartBtn = document.querySelector('.nav-cart-btn');
            if (!cart.contains(e.target) && !navCartBtn.contains(e.target) && cart.classList.contains('active')) {
                this.toggleCart();
            }
        });
    }

    toggleCart() {
        const cart = document.getElementById('cart-container');
        cart.classList.toggle('active');
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.updateCart();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.updateCart();
    }

    updateCart() {
        const cartItems = document.querySelector('.cart-items');
        const emptyMessage = document.querySelector('.empty-cart-message');
        const cartSummary = document.querySelector('.cart-summary');
        
        // Update navbar cart badge only
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const navCartBadge = document.getElementById('nav-cart-badge');
        navCartBadge.textContent = totalItems;
        if (totalItems > 0) {
            navCartBadge.classList.add('active');
        } else {
            navCartBadge.classList.remove('active');
        }

        // Show/hide empty message
        if (this.items.length === 0) {
            emptyMessage.style.display = 'flex';
            cartSummary.style.display = 'none';
        } else {
            emptyMessage.style.display = 'none';
            cartSummary.style.display = 'block';
        }

        // Update cart items
        cartItems.innerHTML = this.items.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">$${item.price} × ${item.quantity}</p>
                </div>
                <button class="remove-item" onclick="cart.removeItem(${index})">×</button>
            </div>
        `).join('');

        // Update total
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.querySelector('.total-amount').textContent = `$${this.total}`;

        // Save to localStorage
        this.saveCart();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(90deg, rgba(255,255,0,0.9) 0%, rgba(255,165,0,0.9) 100%);
            color: #000;
            padding: 15px 25px;
            border-radius: 25px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            z-index: 1002;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty!');
            return;
        }

        // Here you would typically redirect to a checkout page
        // For now, we'll just show a success message
        this.showNotification('Proceeding to checkout...');
        this.toggleCart();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateCart();
        }
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Override the existing addToCart function
window.addToCart = function(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        image: document.querySelector(`img[alt="${productName}"]`)?.src || '/img/placeholder.jpg'
    };
    cart.addItem(product);
}; 