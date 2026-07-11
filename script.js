// Ay-mart - FIXED - Commission ab tere ID par ayega
document.addEventListener("DOMContentLoaded", function() {
    const MY_ASORT_ID = "2396277";
    const MY_STORE_URL = "https://anil.asort.in";

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
        const card = btn.closest('.product,.card, [class*="shadow"]');
        return {
            name: btn.dataset.product || card?.querySelector('h3,.title')?.innerText?.trim() || 'Product',
            price: parseFloat(btn.dataset.price || card?.querySelector('.price')?.innerText.replace(/[^0-9.]/g,'') || 0),
            img: btn.dataset.img || card?.querySelector('img')?.src || '',
            sku: card?.innerText.match(/FZ-|MRU-|ESC-|SLT-|ABK-|MKD-|ABK-HB-PREM-08/)?.[0] || ''
        };
    }

    function addToCart(data) {
        const item = cartItems.find(i => i.name === data.name);
        if (item) item.qty++; else cartItems.push({...data, qty:1});
        saveAll();
        showNotification(`🛒 ${data.name} added!`);
    }

    function removeFromCart(name) {
        cartItems = cartItems.filter(i => i.name!== name);
        saveAll();
        showNotification(`🗑️ ${name} hata diya`, 'bg-red-600');
    }

    function goToAsortCheckout(productName) {
        // Customer ko tere store par bhej dega taaki commission tere ID par track ho
        const searchQuery = encodeURIComponent(productName);
        const asortLink = `${MY_STORE_URL}/search?q=${searchQuery}&ref=${MY_ASORT_ID}`;
        showNotification(`✅ Ab aapko Asort par le ja rahe hain...`);
        setTimeout(() => {
            window.open(asortLink, '_blank');
        }, 600);
    }

    function renderCartPage() {
        const container = document.getElementById('cart-items');
        const totalBox = document.getElementById('cart-total');
        if (!container) return;
        if (cartItems.length === 0) {
            container.innerHTML = '<p class="text-gray-500 p-4 text-center">Cart khali hai</p>';
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
                    <p class="font-medium text-sm">${item.name}</p>
                    <p class="text-sm text-gray-600">₹${item.price} x ${item.qty} = ₹${subtotal}</p>
                </div>
                <button data-product="${item.name}" class="remove-btn text-red-500 text-sm px-2">Remove</button>
            </div>`;
        }).join('');
        if (totalBox) totalBox.innerHTML = `Total: ₹${totalAmount} <br><button onclick="window.open('${MY_STORE_URL}?ref=${MY_ASORT_ID}','_blank')" class="mt-2 bg-black text-white px-4 py-2 rounded w-full">Asort par Checkout karo</button><p class="text-xs text-green-600 mt-1">Commission ID ${MY_ASORT_ID} par jayega</p>`;
    }

    document.body.addEventListener('click', function(e) {
        const btn = e.target.closest('button, a');
        if (!btn) return;
        const text = btn.innerText.trim();
        const data = getProductData(btn);

        if (text.includes("Add to Cart")) {
            e.preventDefault(); addToCart(data);
        } else if (text.includes("Remove")) {
            e.preventDefault(); removeFromCart(data.name);
        } else if (text.includes("Buy Now")) {
            e.preventDefault();
            goToAsortCheckout(data.name);
        }
    });

    updateCounts();
    renderCartPage();
});
