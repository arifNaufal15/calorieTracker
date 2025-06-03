const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const content = document.querySelector(".info-content");
let user = []

const apiKey = '0AgbYxJ0Gi0Dh9P9m43VMA==JlHU7ZOD1TwjpeEh'; 

let searchInput = "";

//when user clicks the button to find desired food
document.querySelector(".search-food-calorie-button").addEventListener('click', async () => {
    searchInput = document.getElementById("search").value.trim();

    const food = await getFood(searchInput);
    display(food);
});

//when user press Enter key to find desired
document.addEventListener("keydown", async event => {
    
    if(event.key === "Enter"){
        searchInput = document.getElementById("search").value.trim();
        const food = await getFood(searchInput);
        display(food);
    }
})

async function getFood(userInput){

    const responses = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(userInput)}`,
    {
        method:'GET',
        headers: {'X-Api-Key':apiKey}
    });

    if(!responses.ok){
        displayError("This food doesn't exist");
        throw new Error("HTTPS request cannot be made");
    }

    const data = await responses.json();

    if (!userInput) {
        alert("Please type the food name first!");
        return;
    } else if (!data){
        alert("The food you've searched is not available!");
        return;
    }

    return data[0];
}

function display(food){

    content.innerHTML = `
        <p class="detailed-info"><strong>Fiber: </strong>${food.fiber_g} g</p>
        <p class="detailed-info"><strong>Sugar: </strong>${food.sugar_g} g</p>
        <p class="detailed-info"><strong>Fat: </strong>${food.fat_saturated_g} g</p>
        <p class="detailed-info"><strong>Carbs: </strong>${food.carbohydrates_total_g} g</p>
        <p class = "detailed-info"><strong>Cholestrol: </strong>${food.cholesterol_mg} mg</p>
        <p class="detailed-info"><strong>Calorie: </strong>
        ${(
            (food.fat_saturated_g * 9) +
            ((food.carbohydrates_total_g - food.fiber_g) * 4) +
            (food.fiber_g * 2)
        ).toFixed(2)} kcal
        </p>
    `;

}

function displayError(messsage){
    const error = document.createElement("p");
    error.textContent = messsage;
    content.appendChild(error);
}
