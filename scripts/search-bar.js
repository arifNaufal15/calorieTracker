const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const content = document.querySelector(".content-info");
let user = []

const apiKey = '0AgbYxJ0Gi0Dh9P9m43VMA==JlHU7ZOD1TwjpeEh'; 

 
document.addEventListener("keydown" ,async event =>{
    
    if(event.key === "Enter"){
        const searchInput = document.getElementById("search").value.trim();
        console.log("hello");
        const food = await getFood(searchInput);
        display(food);
        
        console.log(food);
    }
})

async function getFood(userInput){

    const responses = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(userInput)}`,
    {
        method:'GET',
        headers: {'X-Api-Key':apiKey}
    });

    if(!responses.ok){
        displayError("This food doesnt exist");
        throw new Error("HTTPS request cannot be made");
    }

    const data = await responses.json();
    return data[0];
}

function display(food){

    const foodName = document.createElement("h2");
    const fiber = document.createElement("p");
    const sugar = document.createElement("p");
    const fat = document.createElement("p");
    const carbo = document.createElement("p");

    foodName.textContent = `Food Name : ${food.name}`;
    fiber.textContent = "Fiber : " + food.fiber_g + " g";
    sugar.textContent = "Sugar : " + food.sugar_g + " g";
    fat.textContent = "Fat : " + food.fat_saturated_g + " g";
    carbo.textContent = "Carbohydrate : " + food.carbohydrates_total_g + " g";

    content.style.display = "block"
    content.innerHTML = "The food's Nutrition";
    content.appendChild(foodName);
    content.appendChild(fiber);
    content.appendChild(sugar);
    content.appendChild(fat);
    content.appendChild(carbo);
}

function displayError(messsage){

    const error = document.createElement("p");
    error.textContent = messsage;
    content.appendChild(error);
}
