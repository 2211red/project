const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmPasswordError");
const form = document.getElementById("registerForm");
const home = document.querySelector(".ex");
const popup = document.getElementById("successPopup");
const popupOkBtn = document.getElementById("popupOkBtn");
const emailInput = document.getElementById("email");

document.querySelectorAll(".password-wrapper .eye-icon").forEach((eye) => {
  const input = eye.closest(".password-wrapper").querySelector("input");
  eye.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      eye.src = "/images/view.png";
    } else {
      input.type = "password";
      eye.src = "/images/hide.png";
    }
  });
});


home.addEventListener("click", () => {
  window.location.href = "index.html";
});

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", () => {
    passwordError.style.display = "none";
    confirmError.style.display = "none";
    input.classList.remove("invalid");
  });
});


emailInput.addEventListener("input", () => {
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    emailInput.classList.add("invalid");
  } else {
    emailInput.classList.remove("invalid");
  }
});


passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length < 6) {
    passwordInput.classList.add("invalid");
  } else {
    passwordInput.classList.remove("invalid");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmInput.value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let hasError = false;


  if (password !== confirmPassword) {
    confirmError.textContent = "Passwords do not match!";
    confirmError.style.display = "block";
    confirmInput.classList.add("invalid");
    hasError = true;
  }


  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters!";
    passwordError.style.display = "block";
    passwordInput.classList.add("invalid");
    hasError = true;
  }


  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    passwordError.textContent = "Invalid email format!";
    passwordError.style.display = "block";
    emailInput.classList.add("invalid");
    hasError = true;
  }

  
  if (users.some((u) => u.email === email)) {
    passwordError.textContent = "Email already registered!";
    passwordError.style.display = "block";
    emailInput.classList.add("invalid");
    hasError = true;
  }


  if (!hasError) {
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    popup.style.display = "flex";
  }
});

popupOkBtn.addEventListener("click", () => {
  popup.style.display = "none";
  window.location.href = "login.html";
});
