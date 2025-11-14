document.addEventListener("DOMContentLoaded", () => {
  // Animate skills
  const skills = document.querySelectorAll(".skill-level");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute("data-level");
        entry.target.style.width = level;
      }
    });
  }, { threshold: 0.5 });

  skills.forEach(skill => observer.observe(skill));

  // Theme toggle
  const toggleBtn = document.getElementById("theme-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleBtn.textContent = 
      document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
});


