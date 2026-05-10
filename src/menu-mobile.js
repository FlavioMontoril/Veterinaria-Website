lucide.createIcons();

document.getElementById("year").textContent = new Date().getFullYear();

function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  const iconMenu = document.getElementById("icon-menu");
  const closeMenu = document.getElementById("icon-close");

  menu.classList.toggle("hidden");
  iconMenu.classList.toggle("hidden");
  closeMenu.classList.toggle("hidden");
}

// Carousel
lucide.createIcons();

// ... (sua função toggleMenu permanece igual)

let currentHero = 0;
const heroSlides = document.querySelectorAll(".slide");
// Seleciona as div filhas dentro do container de dots
const heroDots = document.querySelectorAll("#hero-dots .dot");

function updateHero(index) {
  heroSlides.forEach((s, i) => {
    if (i === index) {
      s.classList.replace("opacity-0", "opacity-100");
      s.style.zIndex = "20"; // Traz o slide ativo para frente
    } else {
      s.classList.replace("opacity-100", "opacity-0");
      s.style.zIndex = "10";
    }
  });

  // Atualiza os dots
  heroDots.forEach((d, i) => {
    if (i === index) {
      d.classList.add("bg-white", "w-4"); // Bolinha ativa fica branca e maior
      d.classList.remove("bg-white/50");
    } else {
      d.classList.remove("bg-white", "w-4");
      d.classList.add("bg-white/50");
    }
  });
}

function nextHero() {
  currentHero = (currentHero + 1) % heroSlides.length;
  updateHero(currentHero);
}

function prevHero() {
  currentHero = (currentHero - 1 + heroSlides.length) % heroSlides.length;
  updateHero(currentHero);
}

// Inicializa o primeiro estado
updateHero(0);

// Auto-play
setInterval(nextHero, 5000);
