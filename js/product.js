const shopBtn = document.querySelector("#shopBtn");
const mainContent = document.querySelector("main");
const productsSection = document.querySelector("#products");
const backBtn = document.querySelector("#backBtn");
const accountBtnBtn = document.querySelector("#dark-btn");

if (productsSection) productsSection.style.display = "none";

if (shopBtn) {
  shopBtn.addEventListener("click", () => {
    mainContent.style.transition = "all 0.8s ease";
    mainContent.style.opacity = "0";
    mainContent.style.transform = "translateY(-50px)";

    setTimeout(() => {
      mainContent.style.display = "none";

      productsSection.style.display = "block";
      productsSection.style.opacity = "0";
      productsSection.style.transform = "translateY(50px)";

      setTimeout(() => {
        productsSection.style.transition = "all 0.8s ease";
        productsSection.style.opacity = "1";
        productsSection.style.transform = "translateY(0)";

        if (backBtn) {
          backBtn.style.display = "block";
          backBtn.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }, 800);
  });
}

if (backBtn) {
  backBtn.addEventListener("click", () => {
    productsSection.style.transition = "all 0.8s ease";
    productsSection.style.opacity = "0";
    productsSection.style.transform = "translateY(50px)";
    backBtn.style.display = "none";

    setTimeout(() => {
      productsSection.style.display = "none";

      mainContent.style.display = "flex";
      mainContent.style.opacity = "0";
      mainContent.style.transform = "translateY(-50px)";

      setTimeout(() => {
        mainContent.style.transition = "all 0.8s ease";
        mainContent.style.opacity = "1";
        mainContent.style.transform = "translateY(0)";
      }, 50);
    }, 800);
  });
}

let cart = [];
try {
  cart = JSON.parse(sessionStorage.getItem("cart")) || [];
} catch (e) { cart = []; }

const products = [
  { name: "Chocolate Cake", price: 250, desc: "Rich, moist, and chocolatey heaven.", image: "/images/cakes-removebg-preview.png" },
  { name: "Flaky Croissant", price: 120, desc: "Buttery layers baked to perfection.", image: "/images/Croissant-removebg-preview.png" },
  { name: "Cookies", price: 90, desc: "Sweet, crunchy, and melt-in-your-mouth goodness.", image: "/images/cookies-removebg-preview.png" },
  { name: "Cinnamon Roll", price: 110, desc: "Soft, warm, and sprinkled with cinnamon sugar.", image: "/images/cinnamon.png" }
];

const recommended = [
  { name: "Mini Cake", price: 80, desc: "A small, delicious cake to complement your order.", image: "/images/cookies-removebg-preview.png" },
  { name: "Bread Roll", price: 50, desc: "Freshly baked bread roll.", image: "/images/cinnamon.png" },
  { name: "Chocolate Muffin", price: 60, desc: "Rich chocolate muffin for a sweet bite.", image: "/images/cakes-removebg-preview.png" }
];

const productGrid = document.getElementById("Bestsellers");
if (productGrid) {
  productGrid.innerHTML = "";
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
}

const recommendedContainer = document.querySelector(".recommended-items");
if (recommendedContainer) {
  recommendedContainer.innerHTML = "";
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
}

const accountBtn = document.getElementById("account");
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

const cartNotification = document.createElement("div");
cartNotification.id = "cartNotification";
cartNotification.style.position = "fixed";
cartNotification.style.top = "0";
cartNotification.style.left = "0";
cartNotification.style.width = "100%";
cartNotification.style.height = document.querySelector("header").offsetHeight + "px";
cartNotification.style.backgroundColor = "#4BB543";
cartNotification.style.color = "#fff";
cartNotification.style.display = "flex";
cartNotification.style.justifyContent = "center";
cartNotification.style.alignItems = "center";
cartNotification.style.fontWeight = "bold";
cartNotification.style.fontSize = "18px";
cartNotification.style.zIndex = "9999";
cartNotification.style.transform = "translateY(-100%)";
cartNotification.style.transition = "transform 0.5s ease";
document.body.appendChild(cartNotification);
const cartNotificationText = document.createElement("p");
cartNotification.appendChild(cartNotificationText);

let qty = 1;
let basePrice = 0;

function formatMoney(n) { return Number(n).toFixed(2); }
function updateTotal() {
  const total = (basePrice || 0) * (qty || 0);
  if (totalPriceEl) totalPriceEl.textContent = formatMoney(total);
}

accountBtn.addEventListener("click", () => {
  window.location.href = "account.html";
});

function openPopup(product) {
  popupName.textContent = product.name;
  popupPrice.textContent = `₱${formatMoney(product.price)}`;
  popupDesc.textContent = product.desc;
  popupImage.src = product.image;

  qty = 1; qtyEl.textContent = qty;
  basePrice = product.price; updateTotal();

  popup.classList.add("active");
  document.body.classList.add("popup-active");
}

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    const product = {
      name: card.dataset.name,
      price: parseFloat(card.dataset.price),
      desc: card.dataset.desc,
      image: card.dataset.image
    };
    openPopup(product);
  });
});

document.querySelectorAll(".recommended-card").forEach(card => {
  card.addEventListener("click", () => {
    const product = {
      name: card.dataset.name,
      price: parseFloat(card.dataset.price),
      desc: card.dataset.desc,
      image: card.querySelector("img").src
    };
    openPopup(product);
  });
});

if (closeBtn) closeBtn.addEventListener("click", closePopup);
if (popup) popup.addEventListener("click", e => { if (e.target === popup) closePopup(); });
function closePopup() {
  popup.classList.remove("active");
  document.body.classList.remove("popup-active");
}

if (increaseBtn) increaseBtn.addEventListener("click", () => { qty++; qtyEl.textContent = qty; updateTotal(); });
if (decreaseBtn) decreaseBtn.addEventListener("click", () => { if (qty > 1) { qty--; qtyEl.textContent = qty; updateTotal(); } });

if (addCartBtn) addCartBtn.addEventListener("click", () => {
  const item = {
    name: popupName.textContent,
    image: popupImage.src,
    price: basePrice,
    quantity: qty,
    total: basePrice * qty
  };

  let currentCart = [];
  try { currentCart = JSON.parse(sessionStorage.getItem("cart")) || []; } catch(e) { currentCart = []; }

  const idx = currentCart.findIndex(c => c.name === item.name && c.price === item.price);
  if (idx > -1) {
    currentCart[idx].quantity += item.quantity;
    currentCart[idx].total = currentCart[idx].quantity * currentCart[idx].price;
  } else {
    currentCart.push(item);
  }

  sessionStorage.setItem("cart", JSON.stringify(currentCart));
  cart = currentCart;

  cartNotificationText.textContent = `${item.quantity} x ${item.name} added to cart successfully!`;
  cartNotification.style.transform = "translateY(0)";
  setTimeout(() => { cartNotification.style.transform = "translateY(-100%)"; }, 1000);

  closePopup();
});

if (orderNowBtn) orderNowBtn.addEventListener("click", () => {
  const productData = {
    name: popupName.textContent,
    image: popupImage.src,
    price: basePrice,
    quantity: qty,
    total: basePrice * qty
  };
  sessionStorage.setItem("selectedProduct", JSON.stringify(productData));
  window.location.href = "order.html";
});

const searchInput = document.getElementById("searchInput"); 

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.desc.toLowerCase().includes(query)
    );

    if (productGrid) {
      productGrid.innerHTML = "";

      filteredProducts.forEach(product => {
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

      
        card.addEventListener("click", () => {
          openPopup(product);
        });
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const linkText = link.textContent.trim().toLowerCase();

      if (linkText === "products") {
        e.preventDefault();
        if (shopBtn) shopBtn.click();
      }

      if (linkText === "recipe") {
        e.preventDefault();
        window.location.href = "recipe.html";
      }
    });
  });
});


const recipeBtn = document.querySelector(".btn-dark");
if (recipeBtn) {
  recipeBtn.addEventListener("click", () => {
    window.location.href = "recipe.html";
  });
}

