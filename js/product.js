const shopBtn = document.querySelector("#shopBtn");
const mainContent = document.querySelector("main");
const productsSection = document.querySelector("#products");
const backBtn = document.querySelector("#backBtn");
const footer = document.querySelector("footer");
const searchInput = document.getElementById("searchInput");
const acc = document.querySelector(".register");
const userDisplay = document.getElementById("userDisplay");

const divider = document.querySelector(".divider");
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
const recommendedContainer = document.querySelector(".recommended-items");
const orderNotification = document.getElementById("orderNotification");
const orderNotificationText = document.getElementById("orderNotificationText");
const bestsellersTitle = document.getElementById("label-search"); 
const bestsellersContainer = document.getElementById("Bestsellers");

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
let qty = 1;
let basePrice = 0;
let selectedProduct = null;

const bestsellers = [
  { name: "Chocolate Cake", price: 250, desc: "Rich, moist, and chocolatey heaven.", image: "/images/cakes-removebg-preview.png" },
  { name: "Cookies", price: 90, desc: "Sweet, crunchy, and melt-in-your-mouth goodness.", image: "/images/cookies-removebg-preview.png" },
  { name: "Cupcake", price: 200, desc: "Light, airy cake in every bite, finished with rich, creamy frosting.", image: "/images/cupcake.png" },
  { name: "Cinnamon Roll", price: 110, desc: "Soft, warm, and sprinkled with cinnamon sugar.", image: "/images/cinnamon.png" },
  { name: "Flaky Croissant", price: 120, desc: "Buttery layers baked to perfection.", image: "/images/Croissant-removebg-preview.png" },
  { name: "Round Chocolate Donut", price: 120, desc: "Fluffy, golden donut coated in rich chocolate pure indulgence in every bite.", image: "/images/RoundChocolateeDonut-removebg-preview.png" },
];

const pastriesList = [
  { name: "Chocolate Cake", price: 250, desc: "Rich, moist, and chocolatey heaven.", image: "/images/cakes-removebg-preview.png" },
  { name: "Round Chocolate Donut", price: 120, desc: "Fluffy, golden donut coated in rich chocolate pure indulgence in every bite.", image: "/images/RoundChocolateeDonut-removebg-preview.png" },
  { name: "Cookies", price: 90, desc: "Sweet, crunchy, and melt-in-the-mouth goodness.", image: "/images/cookies-removebg-preview.png" },
  { name: "Flaky Croissant", price: 120, desc: "Buttery layers baked to perfection.", image: "/images/Croissant-removebg-preview.png" },
  { name: "Cinnamon Roll", price: 110, desc: "Soft, warm, and sprinkled with cinnamon sugar.", image: "/images/cinnamon.png" },
  { name: "Cupcake", price: 200, desc: "Light, airy cake in every bite, finished with rich, creamy frosting.", image: "/images/cupcake.png" },
  { name: "Chocolate Croissant", price: 250, desc: "Crisp on the outside, soft inside, with smooth chocolate that melts in your mouth.", image: "/images/ChocolateCroissant.png" },
  { name: "Pumpkin Pie", price: 350, desc: "Smooth, spiced pumpkin filling in a flaky crust a cozy taste of fall.", image: "/images/PumpkinPie.png" },
  { name: "Galleta", price: 110, desc: "Simple, sweet, and utterly satisfying the perfect bite anytime.", image: "/images/Galleta.png" },
  { name: "Pretzel", price: 75, desc: "Chewy inside, crisp outside, with that signature pretzel twist.", image: "/images/pretzel.png" },
  { name: "Bagel", price: 100, desc: "Soft and chewy inside with a golden crust a classic bagel for any time of day.", image: "/images/bagel.png" },
  { name: "Concha", price: 55, desc: "Soft, fluffy, and sweet a classic Mexican concha with a crunchy sugar topping.", image: "/images/concha.png" },
];

const recommended = [
  { name: "Mini Cake", price: 80, desc: "A small, delicious cake to complement your order.", image: "/images/cookies-removebg-preview.png" },
  { name: "Bread Roll", price: 50, desc: "Freshly baked bread roll.", image: "/images/cinnamon.png" },
  { name: "Chocolate Muffin", price: 60, desc: "Rich chocolate muffin for a sweet bite.", image: "/images/cakes-removebg-preview.png" },
];

function showFooter() { footer?.classList.add("active"); }
function hideFooter() { footer?.classList.remove("active"); }
function formatMoney(n) { return Number(n).toFixed(2); }

function renderProducts(containerId, list, center=false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.justifyContent = center ? "center" : "flex-start";
  container.style.flexDirection = "row";
  container.style.gap = "20px";

  list.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.dataset.name = product.name;
    card.dataset.price = product.price;
    card.dataset.desc = product.desc;
    card.dataset.image = product.image;

    card.style.flex = "0 1 180px";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
    `;

    card.addEventListener("click", () => openPopup(product));
    container.appendChild(card);
  });
}

function openPopup(product) {
  selectedProduct = product;
  basePrice = product.price;
  qty = 1;
  qtyEl.textContent = qty;

  popupName.textContent = product.name;
  popupPrice.textContent = `₱${formatMoney(product.price)}`;
  popupDesc.textContent = product.desc;
  popupImage.src = product.image;

  updateTotal();

  if (recommendedContainer) {
    recommendedContainer.innerHTML = "";
    recommended.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("recommended-card");
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p class="recommended-name">${item.name}</p>
        <p class="recommended-price">₱${item.price}</p>
      `;
      card.addEventListener("click", () => openPopup(item));
      recommendedContainer.appendChild(card);
    });
  }

  popup.classList.add("active");
  document.body.classList.add("popup-active");
}

function closePopup() {
  popup.classList.remove("active");
  document.body.classList.remove("popup-active");
}

function updateTotal() {
  const total = (basePrice || 0) * (qty || 0);
  totalPriceEl.textContent = `₱${formatMoney(total)}`;
}


renderProducts("Bestsellers", bestsellers);
renderProducts("pastries", pastriesList);

if (productsSection) productsSection.style.display = "none";
if (backBtn) backBtn.style.display = "none";

shopBtn?.addEventListener("click", () => {
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
      backBtn?.classList.add("show");
      backBtn.style.display = "block";
      showFooter();
    }, 50);
  }, 800);
});

backBtn?.addEventListener("click", () => {
  productsSection.style.transition = "all 0.8s ease";
  productsSection.style.opacity = "0";
  productsSection.style.transform = "translateY(50px)";
  backBtn.classList.remove("show");
  hideFooter();
  setTimeout(() => {
    productsSection.style.display = "none";
    backBtn.style.display = "none";
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

closeBtn?.addEventListener("click", closePopup);
popup?.addEventListener("click", e => { if (e.target === popup) closePopup(); });
increaseBtn?.addEventListener("click", () => { qty++; qtyEl.textContent = qty; updateTotal(); });
decreaseBtn?.addEventListener("click", () => { if (qty > 1) { qty--; qtyEl.textContent = qty; updateTotal(); } });

addCartBtn?.addEventListener("click", () => {
  if (!selectedProduct) return;
  const item = { name: selectedProduct.name, image: selectedProduct.image, price: basePrice, quantity: qty, total: basePrice * qty };
  let currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const idx = currentCart.findIndex(c => c.name === item.name);
  if (idx > -1) {
    currentCart[idx].quantity += item.quantity;
    currentCart[idx].total = currentCart[idx].quantity * currentCart[idx].price;
  } else currentCart.push(item);
  sessionStorage.setItem("cart", JSON.stringify(currentCart));
  orderNotificationText.textContent = `${item.name} added to cart successfully!`;
  orderNotification.style.transform = "translateY(0)";
  setTimeout(() => { orderNotification.style.transform = "translateY(-100%)"; }, 2000);
  closePopup();
});

orderNowBtn?.addEventListener("click", () => {
  if (!selectedProduct) return;
  sessionStorage.setItem("selectedProduct", JSON.stringify({ name: selectedProduct.name, image: selectedProduct.image, price: basePrice, quantity: qty, total: basePrice * qty }));
  window.location.href = "order.html";
});

searchInput?.addEventListener("input", e => {
  const query = e.target.value.toLowerCase().trim();
  const container = document.getElementById("pastries");

  if(query === "") {
    renderProducts("pastries", pastriesList, false);

    bestsellersContainer.style.display = "grid";
    bestsellersContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(180px, 1fr))";
    bestsellersContainer.style.gap = "20px";

    divider.textContent = "Our Bestsellers";
    return;
  }

  const filtered = pastriesList.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
  bestsellersContainer.style.display = "none";
  divider.textContent = "";
  renderProducts("pastries", filtered, true);

  if(filtered.length === 0) container.innerHTML = "<p class='no-results'>No products found.</p>";
});


acc?.addEventListener("click", () => { window.location.href = "account.html"; });

let activeUser = JSON.parse(localStorage.getItem("activeUser")) || JSON.parse(localStorage.getItem("currentUser"));
if(activeUser && activeUser.username) userDisplay.textContent = `Welcome, ${activeUser.username}!`;
else userDisplay.textContent = "";
