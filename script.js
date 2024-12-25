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
};
// Sample data for reviews
const reviews = [
  { username: "Username1", date: "2024-12-12 13:30", stars: 5, review: "Amazing recipes! I tried the Burn
  { username: "Username2", date: "2024-11-24 14:45", stars: 5, review: "Loved it! Perfect and easy for be
  { username: "Username3", date: "2023-09-22 20:15",stars: 4, review: "Great unique recipes but a bit har
];

function renderReviews() {
  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = ''; 

  reviews.forEach((item) => {
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');

    reviewItem.innerHTML = `
      <img src="profile-placeholder.png" alt="Profile" class="profile-pic" />
      <div class="review-content">
        <p class="review-username">${item.username}</p>
        <p class="review-date">${item.date}</p>
        <p class="review-stars">${'★'.repeat(item.stars)}${'☆'.repeat(5 - item.stars)}</p>
        <p class="review-text">${item.review}</p>
      </div>
    `;

    reviewList.appendChild(reviewItem);
  });
}

// Load reviews on page load
window.onload = renderReviews;

  
