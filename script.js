/* ------------------------------
   🌐 Website Logic (All in One)
------------------------------ */

// === Navbar Scroll Hide / Reveal ===
const navbar = document.getElementById("navbar");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // Hide when scrolling down
  if (currentScroll > lastScrollY && currentScroll > 100) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Show when scrolling up
    navbar.style.transform = "translateY(0)";
  }

  // Add subtle shadow after scrolling slightly
  if (currentScroll > 10) {
    navbar.classList.add("shadow-md");
  } else {
    navbar.classList.remove("shadow-md");
  }

  lastScrollY = currentScroll;
});

// === Smooth Scroll for Navigation ===
const allLinks = document.querySelectorAll('a[href^="#"]');
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 100, // Offset for navbar
        behavior: "smooth",
      });
    }
  });
});

// === Mobile Menu Logic ===
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn?.addEventListener("click", () => {
  mobileMenu.style.right = "0";
  document.body.style.overflow = "hidden";
});

closeBtn?.addEventListener("click", () => {
  mobileMenu.style.right = "-100%";
  document.body.style.overflow = "auto";
});

// Close mobile menu when clicking outside
window.addEventListener("click", (e) => {
  if (
    mobileMenu.style.right === "0px" &&
    !mobileMenu.contains(e.target) &&
    e.target !== menuBtn
  ) {
    mobileMenu.style.right = "-100%";
    document.body.style.overflow = "auto";
  }
});

// Close menu on link click
const mobileLinks = document.querySelectorAll(".mobile-link");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.style.right = "-100%";
    document.body.style.overflow = "auto";
  });
});

/* -------------------------------------
   🖼️ Carousel / Slider Functionality
------------------------------------- */
let currentSlide = 0;
const carouselTrack = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
const totalOriginalSlides = indicators.length || 2;

// Returns 2 slides on desktop, 1 on mobile
function getItemsToShow() {
  return window.innerWidth > 768 ? 2 : 1;
}

function updateCarouselPosition() {
  if (!carouselTrack) return;
  const itemsToShow = getItemsToShow();
  const slidePercentage = 100 / itemsToShow;
  const offset = -currentSlide * slidePercentage;
  carouselTrack.style.transform = `translateX(${offset}%)`;
}

function updateIndicators() {
  indicators.forEach((indicator) => indicator.classList.remove("active"));
  const indicatorIndex = currentSlide % totalOriginalSlides;
  if (indicators[indicatorIndex]) {
    indicators[indicatorIndex].classList.add("active");
  }
}

function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) currentSlide = 0;
  updateCarouselPosition();
  updateIndicators();
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  updateCarouselPosition();
  updateIndicators();
}

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn?.addEventListener("click", nextSlide);
prevBtn?.addEventListener("click", prevSlide);

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index;
    updateCarouselPosition();
    updateIndicators();
  });
});

window.addEventListener("resize", updateCarouselPosition);
updateCarouselPosition();

/* -------------------------------------
   ❓ FAQ Accordion Logic
------------------------------------- */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const title = item.querySelector(".faq-title");
  const toggle = item.querySelector(".faq-toggle");

  // Initial state: hide answer
  answer.style.maxHeight = null;
  answer.style.padding = "0";

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all other FAQ items
    faqItems.forEach((other) => {
      const otherAnswer = other.querySelector(".faq-answer");
      const otherTitle = other.querySelector(".faq-title");
      const otherToggle = other.querySelector(".faq-toggle");
      other.classList.remove("active");
      otherAnswer.style.maxHeight = null;
      otherAnswer.style.padding = "0";
      otherTitle.style.color = "#0a0a0a";
      otherToggle.textContent = "+";
      otherToggle.style.background = "#001f3f";
      otherToggle.style.color = "#fff";

      // Remove bottom border from other items
      other.style.borderBottom = "1px solid #e5e5e5";
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      title.style.color = "#5bc8dc";
      toggle.textContent = "−";
      toggle.style.background = "#5bc8dc";
      toggle.style.color = "#fff";

      // Add cyan bottom border to active item
      item.style.borderBottom = "4px solid #5bc8dc";
    } else {
      item.classList.remove("active");
      answer.style.maxHeight = null;
      answer.style.padding = "0";
      title.style.color = "#0a0a0a";
      toggle.textContent = "+";
      toggle.style.background = "#001f3f";
      toggle.style.color = "#fff";

      // Reset border
      item.style.borderBottom = "1px solid #e5e5e5";
    }
  });
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  answer.style.padding = "0";
  question.addEventListener("click", () => toggleFAQ(item));
});

/* -------------------------------------
   🧠 Utility: Handle Resize or Scroll Reset
------------------------------------- */
window.addEventListener("resize", () => {
  updateCarouselPosition();
  faqItems.forEach((item) => {
    const answer = item.querySelector(".faq-answer");
    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
