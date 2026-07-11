// AyMart - FINAL with Telegram Notification - ID 2396277
document.addEventListener("DOMContentLoaded", function() {
    const MY_ASORT_ID = "2396277";
    const MY_STORE_URL = "https://anil.asort.in";
    const TELEGRAM_BOT_TOKEN = "8939013349:AAGmyulwOZhpY3QVLPVgVrEey_30MJdOqrk";
    const TELEGRAM_CHAT_ID = "8262111567";

    function showNotification(msg) {
        let n = document.getElementById('aymart-notify');
        if (!n) {
            n = document.createElement('div');
            n.id = 'aymart-notify';
            n.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#16a34a;color:white;padding:12px 18px;border-radius:10px;box-shadow:0 10px 20px rgba(0,0,0,0.2);transform:translateY(100px);opacity:0;transition:all 0.3s;z-index:9999;font-family:sans-serif;';
            document.body.appendChild(n);
        }
        n.innerText = msg;
        n.style.transform = 'translateY(0)'; n.style.opacity = '1';
        setTimeout(() => { n.style.transform = 'translateY(100px)'; n.style.opacity = '0'; }, 3000);
    }

    let cartItems = JSON.parse(localStorage.getItem('aymart-cart-items') || '[]');
    function updateCounts(){ const c=document.getElementById('cart-count'); if(c) c.textContent=cartItems.reduce((s,i)=>s+i.qty,0); }
    function saveAll(){ localStorage.setItem('aymart-cart-items', JSON.stringify(cartItems)); updateCounts(); renderCartPage(); }
    
    function getProductData(btn){
        const card = btn.closest('.product,.card,div[class*="shadow"],div[class*="border"]');
        return {
            name: btn.dataset.product || btn.getAttribute('data-product') || card?.querySelector('h3,h2')?.innerText?.trim() || 'AyMart Product',
            price: parseFloat(btn.dataset.price || card?.querySelector('[class*="price"]')?.innerText.replace(/[^0-9.]/g,'') || 499),
            img: card?.querySelector('img')?.src || ''
        };
    }

    function sendTelegramNotification(productName, price){
        const text = `🔥 NAYA ORDER AYA! 🔥\n\n🆔 ID: ${MY_ASORT_ID}\n👤 Anil Yadav\n🛒 Product: ${productName}\n💰 Price: Rs.${price}\n📍 Pin: Ajaygarh 488220\n\nJaldi Asort App check karo!`;
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(text)}`;
        fetch(url).then(r=>console.log("Telegram sent")).catch(e=>console.log("Telegram error",e));
    }

    function goToAsortCheckout(data){
        sendTelegramNotification(data.name, data.price);
        showNotification(`✅ Order track ho raha hai ID ${MY_ASORT_ID} par...`);
        const q = encodeURIComponent(data.name);
        setTimeout(()=>{ window.open(`${MY_STORE_URL}/search?q=${q}&ref=${MY_ASORT_ID}`, '_blank'); }, 800);
    }

    function renderCartPage(){
        const container = document.getElementById('cart-items');
        const totalBox = document.getElementById('cart-total');
        if(!container) return;
        if(cartItems.length===0){ container.innerHTML='<p style="text-align:center;padding:16px;color:#6b7280;">Cart khali hai</p>'; if(totalBox) totalBox.innerText=''; return; }
        let total=0; container.innerHTML=cartItems.map(i=>{ const s=i.price*i.qty; total+=s; return `<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #eee;"><img src="${i.img}" style="width:48px;height:48px;border-radius:8px;object-fit:cover;"><div style="flex:1;"><p style="font-size:14px;font-weight:600;margin:0;">${i.name}</p><p style="font-size:12px;color:#6b7280;margin:0;">Rs.${i.price} x ${i.qty} = Rs.${s}</p></div></div>`; }).join('');
        if(totalBox) totalBox.innerHTML=`Total: Rs.${total}<br><p style="font-size:11px;color:#16a34a;margin-top:4px;">Sold by ANIL YADAV • ID 2396277 • Fulfilled by Asort</p>`;
    }

    document.body.addEventListener('click', function(e){
        const btn = e.target.closest('button,a'); if(!btn) return;
        const t = (btn.innerText||'').trim();
        if(t.includes("Add to Cart")){ 
            e.preventDefault(); const d=getProductData(btn); const it=cartItems.find(x=>x.name===d.name); if(it) it.qty++; else cartItems.push({...d,qty:1}); saveAll(); showNotification(`🛒 ${d.name} added`);
        }
        else if(t.includes("Buy Now") || t.includes("Proceed to Buy")){ e.preventDefault(); const d=getProductData(btn); goToAsortCheckout(d); }
    });
    updateCounts(); renderCartPage();
    console.log("AyMart Final Loaded - ID 2396277 - Telegram ON - ChatID 8262111567");
});
        
