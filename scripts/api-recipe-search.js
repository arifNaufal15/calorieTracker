const button = document.querySelector(".search-recipe-button");

button.addEventListener('click', () => {
  let userInput = document.querySelector(".recipe-name-input").value;
  fetchFood(userInput);
});

async function fetchFood(userInput) {
  try{
    const response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(userInput)}`);

    if (!response.ok){
      throw new Error ("Could not fetch recipe");
    }

    const data = await response.json();

    const resultDiv = document.querySelector(".recipe-list");
    resultDiv.innerHTML = "";

    if (!data.meals) {
      alert("No recipes found for your search!");
      return;  // Exit early if no results
    }
    
    data.meals.forEach(meal => {
      const mealDiv = document.createElement("div");
      mealDiv.className = "meal";
      mealDiv.innerHTML = `
      <div class = "meal-details">
        <h1>${meal.strMeal}</h1>
        <h1>Cuisine: ${meal.strArea}</h1>
      </div>
      <a href = "${meal.strYoutube}">
        <img class = "meal-thumbnail" 
        src = "${meal.strMealThumb}">
      </a>
      `;

      resultDiv.appendChild(mealDiv);
    });

  }catch(error){
    console.error(error);
  }
}