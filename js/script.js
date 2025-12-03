document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initThemeToggle();
  initMobileMenu();
  initSkillAnimations();
  initSmoothScroll();
  initBackToTop();
  initFormSubmission();
  initScrollAnimations();
});

// Theme Toggle
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = toggleBtn.querySelector("i");
  
  // Check for saved theme or prefer-color-scheme
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
  
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// Skill Bar Animations
function initSkillAnimations() {
  const skillBars = document.querySelectorAll(".skill-level");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute("data-level");
        entry.target.style.width = level;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px"
  });
  
  skillBars.forEach(bar => observer.observe(bar));
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });
  
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Form Submission
function initFormSubmission() {
  const form = document.querySelector(".contact-form");
  const successPopup = document.getElementById("successPopup");
  
  if (!form) return;
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Show success popup
        successPopup.classList.add("show");
        form.reset();
        
        // Hide popup after 3 seconds
        setTimeout(() => {
          successPopup.classList.remove("show");
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      // Reset button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Scroll Animations for Elements
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".about-content, .skill-card, .project-card, .timeline-content, .contact-card"
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

// Add CSS for animated class
const style = document.createElement('style');
style.textContent = `
  .animated {
    animation: fadeInUp 0.8s ease forwards;
  }
`;
document.head.appendChild(style);