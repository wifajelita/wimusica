const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

if(window.scrollY > 50){

navbar.style.background = "rgba(255,255,255,.95)";
navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

}else{

navbar.style.background = "rgba(255,255,255,.7)";
navbar.style.boxShadow = "none";

}

});

// Smooth Reveal Animation

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;
entry.target.style.transform="translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity=0;
card.style.transform="translateY(60px)";
card.style.transition=".8s";

observer.observe(card);

});
