const navbar=document.querySelector(".navbar");
const reveals=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");observer.unobserve(e.target)}})
},{threshold:.12});
reveals.forEach(e=>observer.observe(e));
addEventListener("scroll",()=>navbar.classList.toggle("scrolled",scrollY>20));
addEventListener("pointermove",e=>{
document.documentElement.style.setProperty("--mx",e.clientX+"px");
document.documentElement.style.setProperty("--my",e.clientY+"px");
});
document.querySelectorAll(".magnetic,.nav-cta").forEach(btn=>{
btn.addEventListener("pointermove",e=>{
if(innerWidth<=700)return;
const r=btn.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.1,y=(e.clientY-r.top-r.height/2)*.1;
btn.style.transform=`translate(${x}px,${y}px) translateY(-2px)`;
});
btn.addEventListener("pointerleave",()=>btn.style.transform="");
});
const card=document.querySelector(".music-card");
if(card){
card.addEventListener("pointermove",e=>{
if(innerWidth<=700)return;
const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
card.style.transform=`perspective(900px) rotateX(${y*-6}deg) rotateY(${x*7}deg) translateY(-5px)`;
});
card.addEventListener("pointerleave",()=>card.style.transform="");
}

// ===== WIMUSIKAL INTERACTION PACK =====

const root = document.documentElement;
const nav = document.querySelector(".navbar");

// Cursor spotlight
window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--mx", `${event.clientX}px`);
  root.style.setProperty("--my", `${event.clientY}px`);
});

// Magnetic buttons
document.querySelectorAll(".primary-btn, .nav-cta").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    if (window.innerWidth <= 700) return;

    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.10;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.10;

    button.style.transform =
      `translate(${x}px, ${y}px) translateY(-2px)`;
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

// 3D music player
const musicCard = document.querySelector(".music-card");

if (musicCard) {
  musicCard.addEventListener("pointermove", (event) => {
    if (window.innerWidth <= 700) return;

    const rect = musicCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    musicCard.style.transform =
      `perspective(900px)
       rotateX(${y * -7}deg)
       rotateY(${x * 8}deg)
       translateY(-5px)`;
  });

  musicCard.addEventListener("pointerleave", () => {
    musicCard.style.transform = "";
  });
}

// Scroll reveal
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Navbar glass effect
window.addEventListener("scroll", () => {
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }
});

// Play button micro interaction
const playButton =
  document.querySelector("#playButton") ||
  document.querySelector(".play-btn");

if (playButton) {
  let playing = false;

  playButton.addEventListener("click", () => {
    playing = !playing;
    playButton.textContent = playing ? "Ⅱ" : "▶";

    const vinyl = document.querySelector(".vinyl");

    if (vinyl) {
      vinyl.style.animation =
        playing ? "vinylSpin 7s linear infinite" : "none";
    }
  });
}

// Small hover tilt for playlist cards
document.querySelectorAll(".playlist-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.innerWidth <= 700) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform =
      `perspective(700px)
       rotateX(${y * -2.5}deg)
       rotateY(${x * 3}deg)
       translateY(-10px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
