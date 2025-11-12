
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");


function renderCart() {
  if (!cartItemsContainer) return;


  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

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
          <p>₱${Number(item.price).toFixed(2)} × ${item.quantity}</p>
          <p><strong>Total: ₱${Number(item.total).toFixed(2)}</strong></p>
        </div>
      </div>
      <div class="cart-item-right">
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemCard);
  });

  updateCartTotal();


  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.target.dataset.index);
      const updatedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      updatedCart.splice(idx, 1);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      renderCart(); 
    });
  });
}

function updateCartTotal() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
  if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
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
