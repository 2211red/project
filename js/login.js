const loginForm = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("passwordError");
const homeBtn = document.querySelector(".ex");


homeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});


document.querySelector(".eye-icon").addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    this.src = "/images/view.png";
  } else {
    passwordInput.type = "password";
    this.src = "/images/hide.png";
  }
});


[emailInput, passwordInput].forEach(input => {
  input.addEventListener("focus", () => {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
  });
});


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
 
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    localStorage.setItem("activeUser", JSON.stringify(foundUser));

    window.location.href = "product.html";
  } else {
    errorMsg.textContent = "Invalid email or password!";
    errorMsg.style.display = "block";
  }
});
