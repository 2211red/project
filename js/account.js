const popup = document.getElementById("recipePopup");
const popupTitle = document.getElementById("popupTitle");
const popupSteps = document.getElementById("popupSteps");
const popupImage = document.getElementById("popupImage");
const closeBtn = document.querySelector(".close");
const homeBtn = document.getElementById("homeBtn");

homeBtn.addEventListener("click", () => {
  window.location.href = "product.html";
});

const recipes = {
  cookies: {
    title: "Chocolate Chip Cookies",
    steps: `1. Mix butter and sugar.\n2. Add eggs and vanilla.\n3. Stir in flour and chocolate chips.\n4. Bake for 12 mins at 180°C.`,
    image: "../images/cookies-removebg-preview.png"
  },
  cake: {
    title: "Vanilla Cake",
    steps: `1. Mix flour, sugar, and eggs.\n2. Add milk and butter.\n3. Bake at 175°C for 30 mins.\n4. Frost and serve.`,
    image: "../images/cakes-removebg-preview.png"
  },
  cinnamon: {
    title: "Cinnamon Bread",
    steps: `1. Mix flour, sugar, cinnamon.\n2. Add yeast and milk.\n3. Knead and let rise.\n4. Bake 25 mins at 190°C.`,
    image: "../images/cinnamon.png"
  }
};

document.querySelectorAll(".view-recipe").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.recipe;
    const recipe = recipes[key];
    if (!recipe) return;

    popupTitle.textContent = recipe.title;
    popupSteps.textContent = recipe.steps;
    popupImage.src = recipe.image;

    popup.classList.add("active");
    document.body.classList.add("popup-active");
  });
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
  document.body.classList.remove("popup-active");
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("active");
    document.body.classList.remove("popup-active");
  }
});
