// Initialize Lucide icons
lucide.createIcons();

// Set current year in footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/**
 * Mobile Menu Toggle
 */
function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  const iconMenu = document.getElementById("icon-menu");
  const closeMenu = document.getElementById("icon-close");

  if (menu && iconMenu && closeMenu) {
    menu.classList.toggle("hidden");
    iconMenu.classList.toggle("hidden");
    closeMenu.classList.toggle("hidden");
  }
}

/**
 * Hero Carousel
 */
let currentHero = 0;
const heroSlides = document.querySelectorAll(".slide");
const heroDots = document.querySelectorAll("#hero-dots .dot");

function updateHero(index) {
  if (heroSlides.length === 0) return;

  heroSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("opacity-100", "z-20");
      slide.classList.remove("opacity-0", "z-10");
    } else {
      slide.classList.add("opacity-0", "z-10");
      slide.classList.remove("opacity-100", "z-20");
    }
  });

  // Update dots
  heroDots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("bg-white", "w-4");
      dot.classList.remove("bg-white/50");
    } else {
      dot.classList.remove("bg-white", "w-4");
      dot.classList.add("bg-white/50");
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

// Initial state and Auto-play
if (heroSlides.length > 0) {
  updateHero(0);
  setInterval(nextHero, 6000);
}
