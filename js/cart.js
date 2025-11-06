const cartItemsContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const accountBtn = document.querySelector("#accountBtn");

let cart = [];

try {
  cart = JSON.parse(sessionStorage.getItem("cart")) || [];
} catch {
  cart = [];
}
accountBtn.addEventListener("click", () => {
  window.location.href = "account.html";
});

function formatPrice(num) {
  return Number(num || 0).toFixed(2);
}

function computeTotal() {
  return cart.reduce((sum, item) => {
    const itemTotal = Number(item.total) || Number(item.price) * Number(item.quantity) || 0;
    return sum + itemTotal;
  }, 0);
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
    if (cartTotalEl) cartTotalEl.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    const itemCard = document.createElement("div");
    itemCard.className = "cart-item";
    itemCard.innerHTML = `
      <div class="cart-item-left">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>₱${formatPrice(item.price)} × ${item.quantity}</p>
          <p><strong>Total: ₱${formatPrice(item.price * item.quantity)}</strong></p>
        </div>
      </div>
      <div class="cart-item-right">
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemCard);
  });

  updateTotal();

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.target.dataset.index);
      cart.splice(idx, 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

function updateTotal() {
  const total = computeTotal();
  if (cartTotalEl) cartTotalEl.textContent = formatPrice(total);
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    sessionStorage.setItem("selectedOrder", JSON.stringify(cart));
    sessionStorage.setItem("cameFromCart", "true");

    window.location.href = "order.html";
  });
}

renderCart();


const shopBtn = document.querySelector("#shopBtn");
const mainContent = document.querySelector("main");
const productsSection = document.querySelector("#products");
const backBtn = document.querySelector("#backBtn");

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

let cartUser = [];
try {
  cartUser = JSON.parse(sessionStorage.getItem("cart")) || [];
} catch (e) { cartUser = []; }

const products = [
  { name: "Chocolate Cake", price: 250, desc: "Rich, moist, and chocolatey heaven.", image: "/images/cakes-removebg-preview.png" },
  { name: "Flaky Croissant", price: 120, desc: "Buttery layers baked to perfection.", image: "/images/Croissant-removebg-preview.png" },
  { name: "Cookies", price: 90, desc: "Sweet, crunchy, and melt-in-your-mouth goodness.", image: "/images/cookies-removebg-preview.png" },
  { name: "bread", price: 90, desc: "Sweet, crunchy, and melt-in-your-mouth goodness.", image: "/images/bread.png" },
  { name: "Cinnamon Roll", price: 110, desc: "Soft, warm, and sprinkled with cinnamon sugar.", image: "/images/cinnamon.png" }
];

const recommended = [
  { name: "Mini Cake", price: 80, desc: "A small, delicious cake to complement your order.", image: "/images/cookies-removebg-preview.png" },
  { name: "Bread Roll", price: 50, desc: "Freshly baked bread roll.", image: "/images/cinnamon.png" },
  { name: "Chocolate Muffin", price: 60, desc: "Rich chocolate muffin for a sweet bite.", image: "/images/cakes-removebg-preview.png" }
];

