const popup = document.getElementById("recipePopup");
const popupTitle = document.getElementById("popupTitle");
const popupSteps = document.getElementById("popupSteps");
const popupImage = document.getElementById("popupImage");
const closeBtn = document.querySelector(".close");
const homeBtn = document.getElementById("homeBtn");

homeBtn.addEventListener("click", () => {
  window.location.href = "product.html";
});


const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "login.html";
} else {
  document.getElementById("username").textContent = currentUser.username;
  document.getElementById("email").textContent = currentUser.email;

  const infoCards = document.querySelectorAll(".info-card p");
  infoCards[0].innerHTML = `<strong>Username:</strong> ${currentUser.username}`;
  infoCards[1].innerHTML = `<strong>Email:</strong> ${currentUser.email}`;
  infoCards[2].innerHTML = `<strong>Account Type:</strong> Regular`;
}



const logoutPopup = document.createElement("div");
logoutPopup.classList.add("logout-popup");
logoutPopup.innerHTML = `
  <div class="logout-popup-content">
    <h3>Are you sure you want to log out?</h3>
    <div class="logout-buttons">
      <button id="confirmLogout">Yes</button>
      <button id="cancelLogout">Cancel</button>
    </div>
  </div>
`;
document.body.appendChild(logoutPopup);

const logoutBtn = document.createElement("button");
logoutBtn.id = "logoutBtn";
logoutBtn.textContent = "Log Out";
logoutBtn.style.marginTop = "12px";
logoutBtn.style.padding = "8px 16px";
logoutBtn.style.border = "none";
logoutBtn.style.borderRadius = "8px";
logoutBtn.style.backgroundColor = "#f44336";
logoutBtn.style.color = "white";
logoutBtn.style.cursor = "pointer";
logoutBtn.style.fontSize = "15px";
logoutBtn.style.transition = "0.2s";

logoutBtn.addEventListener("mouseenter", () => (logoutBtn.style.backgroundColor = "#d32f2f"));
logoutBtn.addEventListener("mouseleave", () => (logoutBtn.style.backgroundColor = "#f44336"));


document.querySelector(".profile-section").appendChild(logoutBtn);


logoutBtn.addEventListener("click", () => {
  logoutPopup.classList.add("show");
});


logoutPopup.addEventListener("click", (e) => {
  if (e.target.id === "confirmLogout") {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  } else if (e.target.id === "cancelLogout" || e.target === logoutPopup) {
    logoutPopup.classList.remove("show");
  }
});

const ordersGrid = document.getElementById("ordersGrid");
const noOrdersMsg = document.getElementById("noOrdersMsg");

if (!currentUser.orders) currentUser.orders = [];


function displayOrders() {
  ordersGrid.innerHTML = "";

  if (currentUser.orders.length === 0) {
    noOrdersMsg.style.display = "block";
    return;
  }

  noOrdersMsg.style.display = "none";

  currentUser.orders.forEach(order => {
    const card = document.createElement("div");
    card.classList.add("order-card");
    card.innerHTML = `
      <img style="margin-left: 20px;" src="${order.image}" alt="${order.product}">
      <h4>${order.product}</h4>
      <p>Ordered on: ${order.date}</p>
    `;
    ordersGrid.appendChild(card);
  });
} 


displayOrders();


function addOrder(product, image) {
  const date = new Date().toLocaleDateString();
  currentUser.orders.push({ product, image, date });

 
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const index = users.findIndex(u => u.email === currentUser.email);
  if (index !== -1) {
    users[index] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  displayOrders();
}


