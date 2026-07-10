<!-- JavaScript for Buttons & Cart functionality -->
<script>
document.addEventListener("DOMContentLoaded", function() {
    // 1. Create a modern Floating Cart Notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-xl transform translate-y-20 opacity-0 transition-all duration-300 z-50 font-sans';
    document.body.appendChild(notification);

    function showNotification(message) {
        notification.innerText = message;
        notification.classList.remove('translate-y-20', 'opacity-0');
        setTimeout(() => {
            notification.classList.add('translate-y-20', 'opacity-0');
        }, 2500);
    }

    // 2. Global Click Event Handler for your Buttons
    document.body.addEventListener('click', function(event) {
        const target = event.target;
        const buttonText = target.innerText ? target.innerText.trim() : "";

        // Check if user clicked an "Add to Cart" or "Buy Now" button
        if (buttonText.includes("Add to Cart") || buttonText.includes("कार्ट में जोड़ें")) {
            event.preventDefault();
            showNotification("🛒 Item added to your cart!");
        } 
        else if (buttonText.includes("Buy Now") || buttonText.includes("अभी खरीदें")) {
            event.preventDefault();
            showNotification("🛍️ Redirecting to checkout...");
        }
        else if (buttonText.includes("Prime Member")) {
            event.preventDefault();
            showNotification("✨ Welcome Prime Member!");
        }
    });

    console.log("Ay-mart features are now active!");
});
</script>

