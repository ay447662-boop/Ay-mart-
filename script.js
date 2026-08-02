// ===== AyMart Script =====

// Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Update Counts
function updateCounts() {
  let cartCount = document.getElementById("cart-count");
  let wishCount = document.getElementById("wish-count");

  if (cartCount) cartCount.innerText = cart.length;
  if (wishCount) wishCount.innerText = wishlist.length;
}

// Add to Cart
function addToCart(id, name, price, image) {
  cart.push({
    id: id,
    name: name,
    price: price,
    image: image
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCounts();

  alert(name + " added to cart");
}

// Add to Wishlist
function addToWishlist(id, name, price, image) {
  wishlist.push({
    id: id,
    name: name,
    price: price,
    image: image
  });

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  updateCounts();

  alert(name + " added to wishlist");
}

// Search
function searchProducts() {

let input = document.getElementById("searchInput");

if(!input) return;

let filter = input.value.toUpperCase();

let products = document.querySelectorAll(".product-card");

products.forEach(product=>{

let title = product.querySelector("h3").innerText;

if(title.toUpperCase().indexOf(filter)>-1){

product.style.display="block";

}else{

product.style.display="none";

}

});

}

// Banner Slider

let slide = 0;

function autoBanner(){

let banners = document.querySelectorAll(".banner");

if(banners.length==0) return;

banners.forEach(b=>b.style.display="none");

slide++;

if(slide>banners.length){

slide=1;

}

banners[slide-1].style.display="block";

}

setInterval(autoBanner,3000);

// Start

window.onload=function(){

updateCounts();

autoBanner();

let search=document.getElementById("searchInput");

if(search){

search.addEventListener("keyup",searchProducts);

}

}
