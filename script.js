document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU TOGGLE
  ========================== */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      const isOpen = navLinks.classList.contains("active");
      menuBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';

      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });

    // Close menu when link clicked
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.innerHTML = '<i data-lucide="menu"></i>';
        if (typeof lucide !== "undefined") lucide.createIcons();
      });
    });
  }

  /* =========================
     REVEAL ANIMATION ON SCROLL
  ========================== */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* =========================
     FOOTER YEAR AUTO UPDATE
  ========================== */
  const yearEl = document.getElementById("currentYear");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================
     CIRCULAR PROGRESS ANIMATION
  ========================== */
  const progressCards = document.querySelectorAll(".skill-card");
  progressCards.forEach(card => {
    const percent = card.getAttribute("data-percent");
    const circle = card.querySelector(".progress-circle");

    let start = 0;
    const end = parseInt(percent);
    const stepTime = 15; // ms per increment

    function animate() {
      if (start <= end) {
        circle.style.background = `conic-gradient(var(--primary) 0deg, var(--primary) ${start*3.6}deg, rgba(94,234,212,0.15) 0deg)`;
        circle.querySelector("span").textContent = start + "%";
        start++;
        requestAnimationFrame(animate);
      }
    }
    animate();
  });

  /* =========================
     HEADER SHADOW ON SCROLL
  ========================== */
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if(!header) return;
    if(window.scrollY > 20){
      header.style.boxShadow = "0 10px 35px rgba(0,0,0,0.25)";
    } else {
      header.style.boxShadow = "none";
    }
  });
});
