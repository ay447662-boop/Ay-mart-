// AyMart v2 Script

let cartCount = 0;

function addToCart(productName) {
    cartCount++;
    alert(productName + " added to cart 🛒");
    updateCart();
}

function updateCart() {
    const cart = document.getElementById("cart-count");
    if (cart) {
        cart.innerText = cartCount;
    }
}

// Search
function searchProduct() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();

        if (title.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Welcome
window.onload = function () {
    console.log("Welcome to AyMart");
};
// Auto Banner Slider

let slideIndex = 0;

showSlides();

function showSlides(){

let slides = document.getElementsByClassName("slides");

for(let i=0;i<slides.length;i++){
slides[i].style.display="none";
}

slideIndex++;

if(slideIndex>slides.length){
slideIndex=1;
}

slides[slideIndex-1].style.display="block";

setTimeout(showSlides,3000);

}