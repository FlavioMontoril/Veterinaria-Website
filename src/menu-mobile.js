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
  if (heroSlides.length === 0) return;
  currentHero = (currentHero + 1) % heroSlides.length;
  updateHero(currentHero);
}

function prevHero() {
  if (heroSlides.length === 0) return;
  currentHero = (currentHero - 1 + heroSlides.length) % heroSlides.length;
  updateHero(currentHero);
}

// Initial state and Auto-play for Hero
if (heroSlides.length > 0) {
  updateHero(0);
  setInterval(nextHero, 5000);
}

/**
 * Tips Carousel
 */
let currentTip = 0;
const tipsTrack = document.getElementById("tips-track");
const tipsItems = document.querySelectorAll("#tips-track > div");
const tipsDotsContainer = document.getElementById("tips-dots");

function updateTips() {
  if (!tipsTrack || tipsItems.length === 0) return;
  
  const itemWidth = tipsItems[0].offsetWidth;
  tipsTrack.style.transform = `translateX(-${currentTip * itemWidth}px)`;

  // Update dots
  const tipsDots = document.querySelectorAll(".tip-dot");
  tipsDots.forEach((dot, i) => {
    if (i === currentTip) {
      dot.classList.add("bg-verde-especializado", "w-4");
      dot.classList.remove("bg-slate-300");
    } else {
      dot.classList.remove("bg-verde-especializado", "w-4");
      dot.classList.add("bg-slate-300");
    }
  });
}

function nextTips() {
  if (tipsItems.length === 0) return;
  // Limit the slide so we don't show empty space at the end on desktop
  const itemsVisible = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
  const maxSlides = tipsItems.length - itemsVisible;
  
  if (currentTip < maxSlides) {
    currentTip++;
  } else {
    currentTip = 0; // Loop back
  }
  updateTips();
}

function prevTips() {
  if (tipsItems.length === 0) return;
  const itemsVisible = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
  const maxSlides = tipsItems.length - itemsVisible;

  if (currentTip > 0) {
    currentTip--;
  } else {
    currentTip = maxSlides; // Loop to end
  }
  updateTips();
}

// Initialize Tips Carousel
if (tipsTrack && tipsDotsContainer) {
  // Generate dots
  tipsItems.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "h-2 w-2 rounded-full bg-slate-300 transition-all cursor-pointer tip-dot";
    dot.onclick = () => {
      currentTip = i;
      // Cap the index based on visibility
      const itemsVisible = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
      const maxSlides = tipsItems.length - itemsVisible;
      if (currentTip > maxSlides) currentTip = maxSlides;
      updateTips();
    };
    tipsDotsContainer.appendChild(dot);
  });

  updateTips();
  window.addEventListener("resize", updateTips);
}
