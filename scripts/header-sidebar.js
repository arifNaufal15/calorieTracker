let slideIndex = 1; // 
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) { //
  showSlides(slideIndex = n);
}

function showSlides(n) { //display slides 
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) 
    {slideIndex = 1}    
  if (n < 1) 
    {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function toggleSidebar() {  // open sidebar flexibly button
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");

  sidebar.classList.toggle("active");

  if(sidebar.classList.contains(active)) {
    content.style.marginLeft = "200px";
  } else {
    content.style.marginLeft = '0';

  }
}

const hamburgerIcon = document.querySelector(".hamburger-icon");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dotButton = document.querySelectorAll(".dot");

hamburgerIcon.addEventListener('click', () => { 
  toggleSidebar();
});

prevButton.addEventListener('click', () => { //previous button
  plusSlides(-1);
});

nextButton.addEventListener('click', () => { //nextslides button
  plusSlides(1);
});

dotButton.forEach ((dot, index) => {  
  dot.addEventListener('click', () => {
    currentSlide(index + 1);
  });
});