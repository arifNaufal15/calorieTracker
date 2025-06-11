const personalInfoContainer = document.querySelector(".personal-info-container");
const overlay = document.getElementById('popup-overlay');
const popupContent = document.getElementById('popup-content');
const popupClose = document.getElementById('popup-close');

//fetch data from json
fetch("data/team-members.json")
    .then(response => response.json())
    .then(data => {
        const peopleData = data;

        for (let i = 1; i <= Object.keys(peopleData).length; i++) {
            personalInfoContainer.innerHTML += `<div class = "info" data-id = ${i}></div>`;
        } 

        const infoCards = document.querySelectorAll(".info");
        infoCards.forEach(card => {
            const id = card.getAttribute('data-id');
            const person = peopleData[id];

            //display members data
            if (person) {
                    card.innerHTML =
                        `<img src="${person.img}" alt="${person.name}" class = "profile-photo"><br><br>
                        <p>${person.name}</p>`;
            }

            //display popup
            card.addEventListener('click', () => {
                if (person) {
                    popupContent.innerHTML =
                        `<img src="${person.img}" alt="${person.name}" class = "profile-photo"><br><br>
                        <h3>${person.name}</h3>
                        <p>Matric No:</strong> ${person.matric}</p>
                        <p>Email:</strong> ${person.email}</p>
                        <p>${person.bio}</p>`;

                    overlay.classList.remove('hidden');
                }
            });
        });
    })

//close popup when close button is clicked
popupClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

//close popup when overlay is clicked
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.add('hidden');
    }
});