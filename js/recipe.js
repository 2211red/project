const popup = document.getElementById("recipePopup");
const popupTitle = document.getElementById("popupTitle");
const popupSteps = document.getElementById("popupSteps");
const popupImage = document.getElementById("popupImage");
const closeBtn = document.querySelector(".close");
const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");

const recipesData = [
  {
    title: "Classic Bread",
    description: "Fluffy homemade bread made with love and patience.",
    image: "/images/bread.png",
    type: "bread",
    steps: "1. Mix flour, yeast, sugar, and salt.\n2. Add water and knead.\n3. Let it rise for 1 hour.\n4. Bake at 180°C for 25 mins."
  },
  {
    title: "Garlic Bread",
    description: "Toasted bread topped with garlic butter and herbs.",
    image: "/images/cinnamon.png",
    type: "garlic",
    steps: "1. Slice the bread.\n2. Mix butter, garlic, and parsley.\n3. Spread and toast.\n4. Serve warm."
  },
  {
    title: "Banana Bread",
    description: "Sweet and moist banana loaf perfect for any snack.",
    image: "/images/cakes-removebg-preview.png",
    type: "banana",
    steps: "1. Mash bananas.\n2. Mix flour, sugar, eggs, and butter.\n3. Bake for 40 minutes.\n4. Cool and serve."
  },
 
];

function displayRecipes(recipes) {
  recipeContainer.innerHTML = recipes
    .map(
      recipe => `
      <div class="recipe-card" data-title="${recipe.title.toLowerCase()}">
        <img src="${recipe.image}" alt="${recipe.title}">
        <div class="recipe-info">
          <h2>${recipe.title}</h2>
          <p>${recipe.description}</p>
          <button class="view-recipe" 
            data-recipe="${recipe.type}" 
            data-image="${recipe.image}" 
            data-steps="${recipe.steps.replace(/\n/g, '&#10;')}">
            View Recipe
          </button>
        </div>
      </div>
    `
    )
    .join("");

  document.querySelectorAll(".view-recipe").forEach(btn => {
    btn.addEventListener("click", () => {
      const recipeTitle = btn.parentElement.querySelector("h2").textContent;
      const imageSrc = btn.dataset.image;
      const steps = btn.dataset.steps.replace(/&#10;/g, "\n");

      popupTitle.textContent = recipeTitle;
      popupSteps.textContent = steps;
      popupImage.src = imageSrc;
      popup.style.display = "flex";
    });
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipesData.filter(r => r.title.toLowerCase().includes(query));
  displayRecipes(filtered);
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === popup) popup.style.display = "none";
});

displayRecipes(recipesData);
