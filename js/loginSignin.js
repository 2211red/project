let users = [
  { username: "JohnDoe", email: "johndoe@gmail.com", password: "123456" },
  { username: "JaneSmith", email: "janesmith@gmail.com", password: "password" },
  { username: "AlexBrown", email: "alexbrown@gmail.com", password: "abc123" }
];

const loginPopup = document.getElementById("loginPopup");
const closePopupBtn = document.querySelector(".close-popup");
const cancelPopupBtn = document.getElementById("cancelPopup");
const goLoginBtn = document.getElementById("goLogin");

function showLoginPopup() {
  if (loginPopup) loginPopup.style.display = "flex";
}

if (closePopupBtn) closePopupBtn.addEventListener("click", () => loginPopup.style.display = "none");
if (cancelPopupBtn) cancelPopupBtn.addEventListener("click", () => loginPopup.style.display = "none");
if (goLoginBtn) goLoginBtn.addEventListener("click", () => window.location.href = "login.html");

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    const linkHref = link.getAttribute("href").toLowerCase();
    if (linkHref.includes("home")) return;

    if (!loggedIn) {
      e.preventDefault();
      showLoginPopup();
    }
  });
});

function addPasswordToggle(inputSelector) {
  const input = document.querySelector(inputSelector);
  if (!input) return;
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";
  wrapper.style.width = "100%";

  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);

  const eye = document.createElement("img");
  eye.src = "/images/hide.png"; 
  eye.style.position = "absolute  ";
  eye.style.right = "20px";
  eye.style.top = "37%";
  eye.style.transform = "translateY(-50%)";
  eye.style.cursor = "pointer";
  eye.style.width = "24px";
  eye.style.height = "24px";
  wrapper.appendChild(eye);

  eye.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      eye.src = "/images/view.png";
    } else {
      input.type = "password";
      eye.src = "/images/hide.png"; 
    }
  });
}

const currentPage = window.location.pathname.split("/").pop();
if (currentPage === "login.html") {
  const loginForm = document.querySelector("form");
  const passwordInput = document.getElementById("password");

  addPasswordToggle("#password");

  const errorMsg = document.createElement("div");
  errorMsg.style.color = "red";
  errorMsg.style.fontSize = "15px";
  errorMsg.style.marginTop = "5px";
  passwordInput.insertAdjacentElement("afterend", errorMsg);

  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = passwordInput.value.trim();

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        errorMsg.textContent = "";
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "product.html"; 
      } else {
        errorMsg.textContent = "Wrong email or password. Please try again.";
        document.getElementById("email").value = "";
        passwordInput.value = "";
      }
    });
  }

  const backHomeBtn = document.querySelector(".ex");
  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

if (currentPage === "signin.html" || currentPage === "register.html") {
  const signInForm = document.querySelector("form");
  const passwordInput = document.getElementById("password");

  addPasswordToggle("#password");

  const errorMsg = document.createElement("div");
  errorMsg.style.color = "red";
  errorMsg.style.fontSize = "16px";
  errorMsg.style.marginTop = "5px";
  passwordInput.insertAdjacentElement("afterend", errorMsg);

  if (signInForm) {
    signInForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = passwordInput.value.trim();

      if (!username || !email || !password) {
        errorMsg.textContent = "Please fill in all fields.";
        return;
      }

      users.push({ username, email, password }); 
      sessionStorage.setItem("loggedIn", "true");
      errorMsg.textContent = "";
      alert("Account created successfully!");
      window.location.href = "login.html"; 
    });
  }

  const backHomeBtn = document.querySelector(".ex");
  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}




