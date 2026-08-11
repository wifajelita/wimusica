const reveal = document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

reveal.forEach(section=>{

const top = section.getBoundingClientRect().top;

const windowHeight = window.innerHeight;

if(top < windowHeight-120){

section.classList.add("active");

}

});

});

window.dispatchEvent(new Event("scroll"));
