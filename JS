const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");

const playBtn = document.getElementById("playBtn");


// ========================
// MOBILE MENU
// ========================

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("open");

});


// Close menu after clicking link

document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

  });

});


// ========================
// SEARCH
// ========================

searchBtn.addEventListener("click", () => {

  searchOverlay.classList.add("active");

});


closeSearch.addEventListener("click", () => {

  searchOverlay.classList.remove("active");

});


searchOverlay.addEventListener("click", (event) => {

  if (event.target === searchOverlay) {

    searchOverlay.classList.remove("active");

  }

});


document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    searchOverlay.classList.remove("active");

  }

});


// ========================
// NOW PLAYING
// ========================

playBtn.addEventListener("click", () => {

  const playing =
    playBtn.dataset.playing === "true";

  playBtn.dataset.playing =
    String(!playing);

  playBtn.textContent =
    playing ? "▶" : "Ⅱ";

});


// ========================
// MUSIC CARDS
// ========================

document.querySelectorAll(".card-play")
.forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelectorAll(".card-play")
      .forEach(btn => {

        btn.textContent = "▶";

      });

    button.textContent = "Ⅱ";

  });

});


// ========================
// GENRE SELECT
// ========================

document.querySelectorAll(".genre-pill")
.forEach(pill => {

  pill.addEventListener("click", () => {

    document
      .querySelectorAll(".genre-pill")
      .forEach(item => {

        item.classList.remove("pill-accent");

      });

    pill.classList.add("pill-accent");

  });

});


// ========================
// SCROLL REVEAL
// ========================

const revealItems =
  document.querySelectorAll(
    ".music-card, .artist, .genres-section, .cta-section"
  );


const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealItems.forEach((item, index) => {

  item.style.opacity = "0";

  item.style.transform =
    "translateY(18px)";

  item.style.transition =
    `opacity .6s ease ${index * 0.04}s,
     transform .6s ease ${index * 0.04}s`;

  observer.observe(item);

});
