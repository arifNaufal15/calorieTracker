//get foodList from localStorage
let foodAndCalorieList = JSON.parse(localStorage.getItem('foodAndCalorieList')) || []; 

let totalCalorie = 0;
let goalCalorie = 0;

function getInformation () {
  const foodName = document.getElementById("food-list").value;
  const calorieValue = document.getElementById("calorie-intake").value;

  //to check if user enters anything in the input box
  if (!foodName || !calorieValue) { 
    alert("Please insert the values properly!");
    return; 
  } else if (!goalCalorie){
    alert("Please insert your goal calorie first!");
    return;
  }

  const numericCalorie = Number(calorieValue);

  // Recalculate current total
  let currentTotal = foodAndCalorieList.reduce((sum, item) => {
    return sum + Number(item.calorieValue);
  }, 0);

  // Check if adding new item exceeds the goal
  if ((currentTotal + numericCalorie) > goalCalorie && goalCalorie) {
    alert("You exceeded your calorie limit! Stop eating!");
    return;
  }

  // Safe to add
  foodAndCalorieList.push({
    foodName,
    calorieValue
  });

  document.getElementById("food-list").value = "";
  document.getElementById("calorie-intake").value = "";

  localStorage.setItem('foodAndCalorieList', JSON.stringify(foodAndCalorieList));
  showList();
}

function showList () {
  let foodListHTML = '';
  totalCalorie = 0;

  foodAndCalorieList.forEach((item, index) => {

    //assigning foodName in an object to a variable through destructuring
    const {foodName, calorieValue} = item; 
    let numericCalorie = Number(calorieValue);
    totalCalorie += numericCalorie;

    const html = `
    <p class = "list-items">${foodName}</p>
    <p class = "list-items">${calorieValue}</p>
    <button class = "delete-button" data-index="${index}">Delete</button>`; 

    // generate HTML using JavaScript
    foodListHTML += html;
    localStorage.setItem('foodAndCalorieList', JSON.stringify(foodAndCalorieList)); 
  });
  
  document.querySelector(".info-list").innerHTML = foodListHTML;
  document.querySelector(".total-calorie-container").innerHTML = `Total Calorie: ${totalCalorie} kcal`;

  document.querySelectorAll('.delete-button')
  .forEach((button, index) => {
    button.addEventListener('click', () => {
    deleteList(index);
    })
  });

  updateDonut(totalCalorie, goalCalorie);
  
}

//function to update Calorie Wheel
function updateDonut(current, goal) {

  const percent = Math.min(current / goal, 1);
  const circle = document.getElementById('progressCircle');
  const label = document.getElementById('calorieLabel');

  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent);

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${offset}`;

  label.innerHTML = `${Math.round(percent * 100)}%<br>${current} / ${goal} kcal`;
}

//to enable delete food in the list
function deleteList (i) {
  foodAndCalorieList.splice(i, 1);
  showList();
}

//download food list to save it
function saveList() {
  let listToSave = '';
  for (let i = 0; i < foodAndCalorieList.length; i++) {
    listToSave += `${foodAndCalorieList[i].foodName} - ${foodAndCalorieList[i].calorieValue} kcal\n`;
  }

  listToSave += `\nTotal Calorie: ${totalCalorie} kcal`;

  const blob = new Blob([listToSave], {type: 'text/plain'});

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "food-list.txt";
  a.click();

  URL.revokeObjectURL(a.href);
}

document.querySelector('.add-button').addEventListener('click', () => {
  getInformation();
});

document.querySelector('.save-list').addEventListener('click', () => {
  saveList();
});

document.querySelector('.goal-calorie-button').addEventListener('click', () => {
  goalCalorie = Number(document.querySelector(".goal-calorie").value);
  updateDonut(0, goalCalorie);
  document.querySelector(".goal-calorie").value = "";
});

showList();
updateDonut(0, 2000); // show default value for calorie