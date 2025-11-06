const products = [
  { name: "Chocolate Cake", price: 250, desc: "Rich, moist, and chocolatey heaven.", image: "/images/cakes-removebg-preview.png" },
  { name: "Flaky Croissant", price: 120, desc: "Buttery layers baked to perfection.", image: "/images/Croissant-removebg-preview.png" },
  { name: "Cookies", price: 90, desc: "Sweet, crunchy, and melt-in-your-mouth goodness.", image: "/images/cookies-removebg-preview.png" },
  { name: "Bread", price: 90, desc: "Sweet, crunchy, and melt-in-your-mouth goodness.", image: "/images/bread.png" },
  { name: "Cinnamon Roll", price: 110, desc: "Soft, warm, and sprinkled with cinnamon sugar.", image: "/images/cinnamon.png" }
];

const recommended = [
  { name: "Mini Cake", price: 80, desc: "A small, delicious cake to complement your order.", image: "/images/cookies-removebg-preview.png" },
  { name: "Bread Roll", price: 50, desc: "Freshly baked bread roll.", image: "/images/cinnamon.png" },
  { name: "Chocolate Muffin", price: 60, desc: "Rich chocolate muffin for a sweet bite.", image: "/images/cakes-removebg-preview.png" }
];

const productGrid = document.getElementById("Bestsellers");
products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.dataset.name = product.name;
  card.dataset.price = product.price;
  card.dataset.desc = product.desc;
  card.dataset.image = product.image;
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.desc}</p>
  `;
  productGrid.appendChild(card);
});

const recommendedContainer = document.querySelector(".recommended-items");
recommended.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("recommended-card");
  card.dataset.name = item.name;
  card.dataset.price = item.price;
  card.dataset.desc = item.desc;
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <p class="recommended-name">${item.name}</p>
    <p class="recommended-price">${item.price}</p>
  `;
  recommendedContainer.appendChild(card);
});

const popup = document.getElementById("productPopup");
const closeBtn = document.querySelector(".close-popup");
const popupImage = document.getElementById("popupImage");
const popupName = document.getElementById("popupName");
const popupPrice = document.getElementById("popupPrice");
const popupDesc = document.getElementById("popupDesc");
const qtyEl = document.getElementById("qty");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const totalPriceEl = document.getElementById("totalPrice");
const addCartBtn = document.querySelector(".add-cart");
const orderNowBtn = document.querySelector(".order-now");

let qty = 1, basePrice = 0;
function formatMoney(n){ return Number(n).toFixed(2); }
function updateTotal(){ totalPriceEl.textContent = formatMoney(basePrice * qty); }

function openPopup(product){
  popupName.textContent = product.name;
  popupPrice.textContent = `₱${formatMoney(product.price)}`;
  popupDesc.textContent = product.desc;
  popupImage.src = product.image;
  qty = 1; qtyEl.textContent = qty; basePrice = product.price; updateTotal();
  popup.classList.add("active"); 
  document.body.classList.add("popup-active");
}

function closePopup(){
  popup.classList.remove("active"); 
  document.body.classList.remove("popup-active");
}

closeBtn.addEventListener("click", closePopup);
popup.addEventListener("click", e => { if(e.target === popup) closePopup(); });

increaseBtn.addEventListener("click", () => { qty++; qtyEl.textContent = qty; updateTotal(); });
decreaseBtn.addEventListener("click", () => { if(qty>1){ qty--; qtyEl.textContent=qty; updateTotal(); } });

document.querySelectorAll(".product-card, .recommended-card").forEach(card=>{
  card.addEventListener("click", ()=> openPopup({
    name: card.dataset.name,
    price: parseFloat(card.dataset.price),
    desc: card.dataset.desc,
    image: card.dataset.image || card.querySelector("img").src
  }));
});

const loginMessage = document.createElement("div");
loginMessage.style.position = "absolute";
loginMessage.style.top = "10px";
loginMessage.style.left = "50%";
loginMessage.style.transform = "translateX(-50%)";
loginMessage.style.backgroundColor = "#ff4d4d";
loginMessage.style.color = "#fff";
loginMessage.style.padding = "10px 20px";
loginMessage.style.borderRadius = "10px";
loginMessage.style.fontWeight = "bold";
loginMessage.style.display = "none";
loginMessage.style.zIndex = "9999";
loginMessage.style.textAlign = "center";
loginMessage.textContent = "You need to log in to continue.";
popup.querySelector(".popup-content").appendChild(loginMessage);

function showLoginMessage(){
  loginMessage.style.display = "block";
  setTimeout(()=>{ loginMessage.style.display = "none"; }, 2000);
}

const headerCart = document.getElementById("acc");
const headerAccount = document.getElementById("account");
const bodyRecipeBtn = document.querySelector(".btn-dark");

[headerCart, headerAccount, bodyRecipeBtn].forEach(el=>{
  if(el){
    el.addEventListener("click", e=>{
      e.preventDefault();
      alert("You need to log in to continue."); 
    });
  }
});

document.querySelectorAll("nav a").forEach(link=>{
  if(link.textContent !== "Home"){
    link.addEventListener("click", e=>{
      e.preventDefault();
      alert("You need to log in to continue.");
    });
  }
});

const shopBtn = document.querySelector("#shopBtn");
const mainContent = document.querySelector("main");
const productsSection = document.querySelector("#products");
if(productsSection) productsSection.style.display="none";

shopBtn.addEventListener("click", ()=>{
  mainContent.style.transition="all 0.8s ease"; mainContent.style.opacity="0"; mainContent.style.transform="translateY(-50px)";
  setTimeout(()=>{
    mainContent.style.display="none";
    productsSection.style.display="block"; productsSection.style.opacity="0"; productsSection.style.transform="translateY(50px)";
    setTimeout(()=>{
      productsSection.style.transition="all 0.8s ease"; productsSection.style.opacity="1"; productsSection.style.transform="translateY(0)";
    },50);
  },800);
});

addCartBtn.addEventListener("click", showLoginMessage);
orderNowBtn.addEventListener("click", showLoginMessage);

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", ()=>{
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(p=>p.name.toLowerCase().includes(query)||p.desc.toLowerCase().includes(query));
  productGrid.innerHTML="";
  filtered.forEach(product=>{
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.dataset.name = product.name; card.dataset.price = product.price;
    card.dataset.desc = product.desc; card.dataset.image = product.image;
    card.innerHTML = `<img src="${product.image}" alt="${product.name}"><h3>${product.name}</h3><p>${product.desc}</p>`;
    productGrid.appendChild(card);
    card.addEventListener("click", ()=>openPopup(product));
  });
});
