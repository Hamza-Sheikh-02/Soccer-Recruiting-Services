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

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".solution-item");
  const image = document.getElementById("solutionImage");
  const subtext = document.getElementById("solutionSubtext");

  // Each image now includes subtext (empty for #4)
  const slides = [
    {
      src: "images/solution1.png",
      text: "Easy to locate coach's contact information and see the entire team",
    },
    {
      src: "images/solution2.png",
      text: "Easy for coaches to read and access a player profile",
    },
    {
      src: "images/solution3.png",
      text: "Links directly to players YouTube channel or personal player profile",
    },
    { src: "images/solution4.png", text: "" },
    {
      src: "images/solution5.png",
      text: "We can complete the entire process in as little as 10 business days if your Club is committed!",
    },
  ];

  let currentIndex = 0;
  let autoSlide;

  // Apply active styles + update image & text
  function setActive(index) {
    items.forEach((item, i) => {
      const heading = item.querySelector(".solution-heading");
      if (i === index) {
        heading.classList.add("text-cyan-500");
        item.classList.add("active-solution");
      } else {
        heading.classList.remove("text-cyan-500");
        item.classList.remove("active-solution");
      }
    });

    // Smooth fade for image and subtext
    image.style.opacity = 0;
    subtext.style.opacity = 0;

    setTimeout(() => {
      image.src = slides[index].src;
      if (slides[index].text) {
        subtext.textContent = slides[index].text;
        subtext.style.display = "block";
      } else {
        subtext.style.display = "none";
      }
      image.style.opacity = 1;
      subtext.style.opacity = 1;
    }, 300);

    currentIndex = index;
  }

  // Move to next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    setActive(currentIndex);
  }

  // Restart auto slide when user interacts
  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 4000);
  }

  // Click event for manual selection
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      setActive(index);
      resetAutoSlide();
    });
  });

  // Initialize first slide
  setActive(0);
  autoSlide = setInterval(nextSlide, 4000);
});

const btn = document.getElementById("button");
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Sending...";

  const serviceID = "service_xub5je4";
  const templateID = "template_kgj7bpx";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Send Email";
      statusText.innerText = "✅ Message sent successfully!";
      form.reset();
    },
    (err) => {
      btn.value = "Send Email";
      console.error("EmailJS Error:", err);
      statusText.innerText = "❌ Failed to send message. Please try again.";
    }
  );
});
