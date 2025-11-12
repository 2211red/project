const popup = document.getElementById("recipePopup");
const popupTitle = document.getElementById("popupTitle");
const popupSteps = document.getElementById("popupSteps");
const popupImage = document.getElementById("popupImage");
const closeBtn = document.querySelector(".close");
const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const acc = document.querySelector('.register');





  acc.addEventListener('click', () => {
      window.location.href = 'account.html';
    });

const recipesData = [

  {
    title: "Chocolate Cake",
    description: "Rich, moist, and chocolatey heaven.",
    image: "/images/cakes-removebg-preview.png",
    type: "cake",
    steps: "1. Mix cocoa, flour, sugar, and eggs.\n2. Bake until fluffy.\n3. Frost with rich chocolate icing.\n4. Slice and serve."
  },
  {
    title: "Round Chocolate Donut",
    description: "Fluffy, golden donut coated in rich chocolate — pure indulgence in every bite.",
    image: "/images/RoundChocolateeDonut-removebg-preview.png",
    type: "donut",
    steps: "1. Mix dough and shape into rings.\n2. Fry until golden brown.\n3. Dip in melted chocolate.\n4. Cool and enjoy."
  },
  {
    title: "Cookies",
    description: "Sweet, crunchy, and melt-in-your-mouth goodness.",
    image: "/images/cookies-removebg-preview.png",
    type: "cookie",
    steps: "1. Cream butter and sugar.\n2. Add flour and chocolate chips.\n3. Scoop onto tray.\n4. Bake until golden."
  },
  {
    title: "Flaky Croissant",
    description: "Buttery layers baked to perfection.",
    image: "/images/Croissant-removebg-preview.png",
    type: "pastry",
    steps: "1. Roll dough with butter layers.\n2. Fold and chill repeatedly.\n3. Shape into crescents.\n4. Bake until golden and flaky."
  },
  {
    title: "Cinnamon Roll",
    description: "Soft, warm, and sprinkled with cinnamon sugar.",
    image: "/images/cinnamon.png",
    type: "pastry",
    steps: "1. Roll dough with cinnamon filling.\n2. Slice and let rise.\n3. Bake until golden.\n4. Drizzle with icing."
  },
  {
    title: "Cupcake",
    description: "Light, airy cake in every bite, finished with rich, creamy frosting.",
    image: "/images/cupcake.png",
    type: "cake",
    steps: "1. Mix batter and pour into cups.\n2. Bake until fluffy.\n3. Cool and frost.\n4. Decorate and serve."
  },
  {
    title: "Chocolate Croissant",
    description: "Crisp on the outside, soft inside, with smooth chocolate that melts in your mouth.",
    image: "/images/ChocolateCroissant.png",
    type: "pastry",
    steps: "1. Roll croissant dough with chocolate.\n2. Shape and let rise.\n3. Bake until golden.\n4. Serve warm."
  },
  {
    title: "Pumpkin Pie",
    description: "Smooth, spiced pumpkin filling in a flaky crust — a cozy taste of fall.",
    image: "/images/PumpkinPie.png",
    type: "pie",
    steps: "1. Prepare crust and fill with pumpkin mixture.\n2. Bake until set.\n3. Cool completely.\n4. Top with whipped cream."
  },
  {
    title: "Galleta",
    description: "Simple, sweet, and utterly satisfying — the perfect bite anytime.",
    image: "/images/Galleta.png",
    type: "cookie",
    steps: "1. Mix butter, sugar, and flour.\n2. Shape into rounds.\n3. Bake until golden.\n4. Cool and enjoy."
  },
  {
    title: "Pretzel",
    description: "Chewy inside, crisp outside, with that signature pretzel twist.",
    image: "/images/pretzel.png",
    type: "bread",
    steps: "1. Shape dough into pretzels.\n2. Dip in baking soda water.\n3. Bake until golden.\n4. Sprinkle with salt."
  },
  {
    title: "Bagel",
    description: "Soft and chewy inside with a golden crust — a classic bagel for any time of day.",
    image: "/images/bagel.png",
    type: "bread",
    steps: "1. Shape dough into rings.\n2. Boil briefly.\n3. Bake until golden.\n4. Serve with your favorite spread."
  },
  {
    title: "Concha",
    description: "Soft, fluffy, and sweet — a classic Mexican concha with a crunchy sugar topping.",
    image: "/images/concha.png",
    type: "bread",
    steps: "1. Prepare sweet dough.\n2. Add sugar topping pattern.\n3. Let rise.\n4. Bake until soft and lightly golden."
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

const activeUser = JSON.parse(localStorage.getItem("activeUser"));
if (activeUser) {
  document.getElementById("userDisplay").textContent = `Hello, ${activeUser.username}!`;
}
