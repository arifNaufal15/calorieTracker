/*
const infoCards = document.querySelectorAll('.info');
const overlay = document.getElementById('popup-overlay');
const popupContent = document.getElementById('popup-content');
const popupClose = document.getElementById('popup-close');

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const peopleData = data;

        infoCards.forEach(card => {
            const id = card.getAttribute('data-id');
            const person = peopleData[id];

            if (person) {
                    card.innerHTML =
                        `<img src="${person.img}" alt="${person.name}" style="width:100px; height:100px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.2);"><br><br>
                        <p>${person.name}</p>`;
            }

            card.addEventListener('click', () => {
                if (person) {
                    popupContent.innerHTML =
                        `<img src="${person.img}" alt="${person.name}" style="width:100px; height:100px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.2);"><br><br>
                        <h3>${person.name}</h3>
                        <p>Matric No:</strong> ${person.matric}</p>
                        <p>Email:</strong> ${person.email}</p>
                        <p>${person.bio}</p>`;

                    overlay.classList.remove('hidden');
                }
            });
        });
    })

popupClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.add('hidden');
    }
});

*/
const personalInfoContainer = document.querySelector('.personal-info-container');
const overlay = document.getElementById('popup-overlay');
const popupContent = document.getElementById('popup-content');
const popupClose = document.getElementById('popup-close');

fetch("../data/team-members.json")
    .then(response => response.json())
    .then(data => {
        const peopleData = data;
        console.log(peopleData);
        for(let i = 1; i <= Object.keys(peopleData).length; i++)
        {
            personalInfoContainer.innerHTML += `<div class="info" data-id="${i}"></div>`
        }

        const infoCards = document.querySelectorAll('.info');
        infoCards.forEach(card => {
            const id = card.getAttribute('data-id');
            const person = peopleData[id];

            if (person) {
                    card.innerHTML =
                        `<img src="${person.img}" alt="${person.name}" style="width:100px; height:100px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.2);"><br><br>
                        <p>${person.name}</p>`;
            }

            card.addEventListener('click', () => {
                if (person) {
                    popupContent.innerHTML =
                        `<img src="${person.img}" alt="${person.name}" style="width:100px; height:100px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.2);"><br><br>
                        <h3>${person.name}</h3>
                        <p>Matric No:</strong> ${person.matric}</p>
                        <p>Email:</strong> ${person.email}</p>
                        <p>${person.bio}</p>`;

                    overlay.classList.remove('hidden');
                }
            });
        });
    })

popupClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.add('hidden');
    }
});