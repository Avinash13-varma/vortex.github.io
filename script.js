document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.getElementById('cart-close');
    const cartContent = document.querySelector('.cart-content');
    const totalPrice = document.querySelector('.total-price');
    const buyBtn = document.querySelector('.btn-buy');
    let cartItems = [];

    cartIcon.addEventListener('click', () => {
        cart.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
        cart.style.display = 'none';
    });

    document.querySelectorAll('.add-cart').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const productBox = btn.closest('.product-box');
            const title = productBox.querySelector('.product-title').innerText;
            const price = parseFloat(productBox.querySelector('.price').innerText);
            const imgSrc = productBox.querySelector('img').src;

            const existingItem = cartItems.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ title, price, imgSrc, quantity: 1 });
            }

            renderCart();
        });
    });

    function renderCart() {
        cartContent.innerHTML = '';

        cartItems.forEach((item, i) => {
            const box = document.createElement('div');
            box.className = 'cart-box';
            box.innerHTML = `
                <img src="${item.imgSrc}" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${item.title}</h2>
                    <span class="cart-price">${item.price}</span>
                    <div class="cart-quantity">
                        <button class="decrement" data-index="${i}">-</button>
                        <span class="number">${item.quantity}</span>
                        <button class="increment" data-index="${i}">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove" data-index="${i}"></i>
            `;
            cartContent.appendChild(box);
        });

        updateTotal();

        document.querySelectorAll('.increment').forEach(btn => {
            btn.addEventListener('click', e => {
                const index = e.target.dataset.index;
                cartItems[index].quantity++;
                renderCart();
            });
        });

        document.querySelectorAll('.decrement').forEach(btn => {
            btn.addEventListener('click', e => {
                const index = e.target.dataset.index;
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                } else {
                    cartItems.splice(index, 1);
                }
                renderCart();
            });
        });

        document.querySelectorAll('.cart-remove').forEach(btn => {
            btn.addEventListener('click', e => {
                const index = e.target.dataset.index;
                cartItems.splice(index, 1);
                renderCart();
            });
        });
    }

    function updateTotal() {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        totalPrice.innerText = total.toFixed(2);
    }

    buyBtn.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const address = prompt("Enter your delivery address:");
        if (!address) return alert("Order cancelled. Address required.");

        const paymentMethod = prompt("Enter payment method (e.g. card, UPI):");
        if (!paymentMethod) return alert("Order cancelled. Payment required.");

        alert(`Order confirmed!\nAddress: ${address}\nPayment: ${paymentMethod}`);
        cartItems = [];
        renderCart();
        cart.style.display = 'none';
    });
});
