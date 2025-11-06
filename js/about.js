const exploreBtn = document.querySelector(".explore-btn");
const recipe = document.querySelector(".recipe");
const recipe1 = document.querySelector(".recipe1");
const loginPopup = document.getElementById("loginPopup");
const closePopupBtn = document.querySelector(".close-popup");
const cancelPopupBtn = document.getElementById("cancelPopup");
const goLoginBtn = document.getElementById("goLogin");
const product = document.querySelector(".nav-link")

function showLoginPopup() {
  if (loginPopup) loginPopup.style.display = "flex";
}

if (closePopupBtn) closePopupBtn.addEventListener("click", () => loginPopup.style.display = "none");
if (cancelPopupBtn) cancelPopupBtn.addEventListener("click", () => loginPopup.style.display = "none");
if (goLoginBtn) goLoginBtn.addEventListener("click", () => window.location.href = "login.html");

if (exploreBtn) {
  exploreBtn.addEventListener("click", (e) => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      e.preventDefault();
      showLoginPopup();
    } else {
      window.location.href = "product.html";
    }
  });
}
if (recipe) {
  recipe.addEventListener("click", (e) => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      e.preventDefault();
      showLoginPopup();
    } else {
      window.location.href = "product.html";
    }
  });
}
if (exploreBtn) {
    recipe1.addEventListener("click", (e) => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      e.preventDefault();
      showLoginPopup();
    } else {
      window.location.href = "product.html";
    }
  });
}

if (exploreBtn) {
    recipe1.addEventListener("click", (e) => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      e.preventDefault();
      showLoginPopup();
    } else {
      window.location.href = "product.html";
    }
  });
}
if (product) {
    product.addEventListener("click", (e) => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      e.preventDefault();
      showLoginPopup();
    } else {
      window.location.href = "product.html";
    }
  });
}