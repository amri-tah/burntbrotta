window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  fetch("recipes.json")
    .then((response) => response.json())
    .then((recipes) => {
      const recipe = recipes.find((r) => r.id === recipeId);

      if (recipe) {
        document.getElementById("recipe-name").innerText = recipe.name.toUpperCase();
        document.getElementById("recipe-image").src = recipe.image;
        document.getElementById("recipe-image").height = 600;
        document.getElementById("recipe-image").width = 400;
        document.getElementById("recipe-image").alt = recipe.name;
        document.getElementById("recipe-description").innerText = recipe.description;
        document.getElementById("recipe-time").innerText = recipe.time;
        document.getElementById("recipe-servings").innerText = recipe.servings;
        document.getElementById("recipe-difficulty").innerText = recipe.difficulty;

        const ingredientsList = document.getElementById("ingredients-list");
        recipe.ingredients.forEach((ingredient) => {
          const li = document.createElement("li");
          li.innerText = ingredient;
          ingredientsList.appendChild(li);
        });

        const instructionsList = document.getElementById("instructions-list");
        instructionsList.style.listStyleType = "none";
        instructionsList.style.paddingLeft = "0";
        recipe.instructions.forEach((instruction) => {
          const li = document.createElement("li");
          li.innerHTML = `${instruction}<br><br>`;
          instructionsList.appendChild(li);
        });
      } else {
        alert("Recipe not found!");
      }
    })
    .catch((error) => {
      console.error("Error fetching the recipe data:", error);
    });
}

//selecting button by id
var button=document.getElementById("back-to-top");
//add a click event listener 
button.addEventListener("click",()=>
{
  window.history.go(-1); // go back to the previous page
});
