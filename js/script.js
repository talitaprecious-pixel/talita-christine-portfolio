document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileMenu();
  initSkillAnimations();
  initSmoothScroll();
  initBackToTop();
  initFormSubmission();
  initScrollAnimations();
  initTestimonials();
  initCurrentYear();
});

/* =========================
   Theme Toggle
========================= */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    toggleBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  const shouldUseDark =
    savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches);

  applyTheme(shouldUseDark);

  toggleBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

/* =========================
   Mobile Menu
========================= */
function initMobileMenu() {
  const nav = document.querySelector("nav");
  const navLinks = document.querySelector(".nav-links");

  if (!nav || !navLinks) return;

  let menuToggle = document.getElementById("mobile-menu");

  if (!menuToggle) {
    menuToggle = document.createElement("button");
    menuToggle.id = "mobile-menu";
    menuToggle.className = "mobile-menu-btn";
    menuToggle.setAttribute("aria-label", "Toggle navigation menu");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = "<span></span><span></span><span></span>";
    nav.appendChild(menuToggle);
  }

  function closeMenu() {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    navLinks.classList.add("active");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && !nav.contains(e.target)) {
      closeMenu();
    }
  });
}

/* =========================
   Skill Bar Animations
========================= */
function initSkillAnimations() {
  const skillBars = document.querySelectorAll(".skill-level");
  if (!skillBars.length) return;

  skillBars.forEach((bar, index) => {
    const level = bar.getAttribute("data-level");
    if (!level) return;

    setTimeout(() => {
      bar.style.width = level;
    }, index * 120);
  });
}

/* =========================
   Smooth Scroll
========================= */
function initSmoothScroll() {
  const header = document.querySelector("header");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        10;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}

/* =========================
   Back To Top Button
========================= */
function initBackToTop() {
  let backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTop";
    backToTopBtn.setAttribute("aria-label", "Back to top");
    backToTopBtn.innerHTML = "↑";
    document.body.appendChild(backToTopBtn);
  }

  function toggleVisibility() {
    if (window.pageYOffset > 320) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleVisibility);
  toggleVisibility();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* =========================
   Form Submission
========================= */
function initFormSubmission() {
  const form = document.querySelector(".contact-form");
  const successPopup = document.getElementById("successPopup");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();

      if (successPopup) {
        successPopup.classList.add("show");
        setTimeout(() => {
          successPopup.classList.remove("show");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* =========================
   Scroll Reveal Animations
========================= */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    "#about p, .skills-category, .skill, .project-card, .entry, .contact-form, .testimonial-card"
  );

  if (!animatedElements.length) return;

  animatedElements.forEach((el) => {
    el.classList.add("reveal-base");
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("animated");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

/* =========================
   Testimonials Carousel
========================= */
function initTestimonials() {
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!testimonialCards.length) return;

  let currentIndex = 0;
  let autoPlay;

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    currentIndex = index;
  }

  function goNext() {
    showTestimonial((currentIndex + 1) % testimonialCards.length);
  }

  function goPrev() {
    showTestimonial((currentIndex - 1 + testimonialCards.length) % testimonialCards.length);
  }

  if (nextBtn) nextBtn.addEventListener("click", goNext);
  if (prevBtn) prevBtn.addEventListener("click", goPrev);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showTestimonial(index));
  });

  function startAutoPlay() {
    stopAutoPlay();
    autoPlay = setInterval(goNext, 5000);
  }

  function stopAutoPlay() {
    if (autoPlay) clearInterval(autoPlay);
  }

  const carousel = document.querySelector(".testimonial-carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
    carousel.addEventListener("touchstart", stopAutoPlay, { passive: true });
  }

  showTestimonial(0);
  startAutoPlay();
}

/* =========================
   Auto Current Year
========================= */
function initCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* =========================
   Inject Helper CSS
========================= */
const helperStyle = document.createElement("style");
helperStyle.textContent = `
  .reveal-base {
    opacity: 0;
    transform: translateY(24px);
  }

  .animated {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .mobile-menu-btn {
    display: none;
    width: 46px;
    height: 46px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    cursor: pointer;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    box-shadow: var(--shadow-sm);
  }

  .mobile-menu-btn span {
    display: block;
    width: 18px;
    height: 2px;
    background: #fff;
    border-radius: 999px;
    transition: all 0.3s ease;
  }

  .mobile-menu-btn.active span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  .mobile-menu-btn.active span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-btn.active span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  @media (max-width: 768px) {
    .mobile-menu-btn {
      display: inline-flex;
    }

    .nav-links {
      display: none;
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      padding-top: 0.75rem;
    }

    .nav-links.active {
      display: flex;
    }

    .nav-links li {
      width: 100%;
    }

    .nav-links a {
      display: block;
      width: 100%;
      text-align: center;
    }

    body.menu-open {
      overflow: hidden;
    }
  }
`;

document.head.appendChild(helperStyle);
