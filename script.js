// Ay-mart - Cart with Price + Image + View Page
document.addEventListener("DOMContentLoaded", function() {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-xl transform translate-y-20 opacity-0 transition-all duration-300 z-50 font-sans';
    document.body.appendChild(notification);

    function showNotification(msg, color = 'bg-green-600') {
        notification.className = notification.className.replace(/bg-\w+-\d+/, color);
        notification.innerText = msg;
        notification.classList.remove('translate-y-20', 'opacity-0');
        setTimeout(() => notification.classList.add('translate-y-20', 'opacity-0'), 2200);
    }

    let cartItems = JSON.parse(localStorage.getItem('aymart-cart-items') || '[]');
    let wishList = JSON.parse(localStorage.getItem('aymart-wish') || '[]');

    const cartEl = document.getElementById('cart-count');
    const wishEl = document.getElementById('wishlist-count');

    function saveAll() {
        localStorage.setItem('aymart-cart-items', JSON.stringify(cartItems));
        localStorage.setItem('aymart-wish', JSON.stringify(wishList));
        updateCounts();
        renderCartPage();
    }

    function updateCounts() {
        const totalQty = cartItems.reduce((s,i)=>s+i.qty,0);
        if (cartEl) cartEl.textContent = totalQty;
        if (wishEl) wishEl.textContent = wishList.length;
    }

    function getProductData(btn) {
        const card = btn.closest('.product, .card');
        return {
            name: btn.dataset.product || card?.querySelector('h3, .title')?.innerText?.trim() || 'Item',
            price: parseFloat(btn.dataset.price || card?.querySelector('.price')?.innerText.replace(/[^0-9.]/g,'') || 0),
            img: btn.dataset.img || card?.querySelector('img')?.src || ''
        };
    }

    function addToCart(data) {
        const item = cartItems.find(i => i.name === data.name);
        if (item) item.qty++; else cartItems.push({...data, qty:1});
        saveAll();
        showNotification(`🛒 ${data.name} - ₹${data.price} added!`);
    }

    function removeFromCart(name) {
        const item = cartItems.find(i => i.name === name);
        if (!item) return;
        item.qty--;
        if (item.qty <= 0) cartItems = cartItems.filter(i => i.name !== name);
        saveAll();
        showNotification(`🗑️ ${name} hata diya`, 'bg-red-600');
    }

    function toggleWishlist(name) {
        if (wishList.includes(name)) {
            wishList = wishList.filter(w => w !== name);
            showNotification(`💔 ${name} wishlist se hata`, 'bg-gray-600');
        } else {
            wishList.push(name);
            showNotification(`❤️ ${name} wishlist me!`, 'bg-pink-600');
        }
        saveAll();
    }

    function renderCartPage() {
        const container = document.getElementById('cart-items');
        const totalBox = document.getElementById('cart-total');
        if (!container) return;

        if (cartItems.length === 0) {
            container.innerHTML = '<p class="text-gray-500">Cart khali hai</p>';
            if (totalBox) totalBox.innerText = '';
            return;
        }

        let totalAmount = 0;
        container.innerHTML = cartItems.map(item => {
            const subtotal = item.price * item.qty;
            totalAmount += subtotal;
            return `
            <div class="flex items-center gap-3 py-3 border-b">
                <img src="${item.img}" class="w-14 h-14 object-cover rounded" onerror="this.style.display='none'">
                <div class="flex-1">
                    <p class="font-medium">${item.name}</p>
                    <p class="text-sm text-gray-600">₹${item.price} x ${item.qty} = ₹${subtotal}</p>
                </div>
                <button data-product="${item.name}" class="remove-btn text-red-500 text-sm px-2">Remove</button>
            </div>`;
        }).join('');

        if (totalBox) totalBox.innerText = `Total: ₹${totalAmount}`;
    }

    document.body.addEventListener('click', function(e) {
        const btn = e.target.closest('button, a');
        if (!btn) return;
        const text = btn.innerText.trim();
        const data = getProductData(btn);

        if (text.includes("Add to Cart") || text.includes("कार्ट में जोड़ें")) {
            e.preventDefault(); addToCart(data);
        } else if (text.includes("Remove") || text.includes("हटाएं")) {
            e.preventDefault(); removeFromCart(data.name);
        } else if (text.includes("Wishlist") || text.includes("❤")) {
            e.preventDefault(); toggleWishlist(data.name);
        } else if (text.includes("Buy Now")) {
            e.preventDefault(); showNotification(`🛍️ ${data.name} checkout...`);
        }
    });

    updateCounts();
    renderCartPage();
});
