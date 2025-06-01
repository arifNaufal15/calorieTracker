function getUserData (){
  const user = {
    gender: document.getElementById("gender").value,
    age: Number (document.getElementById("age").value),
    weight: Number (document.getElementById("weight").value),
    height: Number (document.getElementById("height").value),
    activityLevel: document.getElementById("activity-level").value
  }
  return (user);
}

function calculateCalorie (){
  user = getUserData ();
  let BMR = 0;
  if (user.gender === "Male") {
    BMR = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
  } else if (user.gender === "Female") {
    BMR = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
  }
  
  if (user.activityLevel === "Sedentary") {
    BMR *= 1.2;
  } else if (user.activityLevel === "Active") {
    BMR *= 1.55;
  }

  showCalorie (BMR);
}

function showCalorie(BMR){
  document.querySelector('.result').innerHTML = `${BMR.toFixed(2)} kcal`
}

function saveResult () {
  const resultToSave = document.querySelector('.result').innerText;
  const blob = new Blob([resultToSave], {type: 'text/plain'});
  const link = document.createElement('a');
  link.download = 'result.txt';

  link.href = window.URL.createObjectURL(blob);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}

document.getElementById('calculate-button').addEventListener('click', () => {
  calculateCalorie();
});

document.querySelector('.save-result-button').addEventListener('click', () => {
  saveResult();
});
