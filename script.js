document.addEventListener("DOMContentLoaded", function () {
  function initIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  initIcons();

  /* =========================
     MOBILE MENU
  ========================= */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    function setMenuState(isOpen) {
      navLinks.classList.toggle("active", isOpen);
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.innerHTML = isOpen
        ? '<i data-lucide="x" aria-hidden="true"></i>'
        : '<i data-lucide="menu" aria-hidden="true"></i>';
      initIcons();
    }

    menuBtn.addEventListener("click", function () {
      setMenuState(!navLinks.classList.contains("active"));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        setMenuState(false);
      }
    });
  }

  /* =========================
     ACTIVE NAV (multi-page)
  ========================= */
  const currentPage = document.body.dataset.page;

  if (currentPage) {
    document.querySelectorAll(".nav-links a[data-page]").forEach(function (link) {
      link.classList.toggle("active", link.dataset.page === currentPage);
    });
  }

  /* =========================
     FOOTER YEAR (after footer.js injects markup)
  ========================= */
  function setFooterYear() {
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  setFooterYear();

  /* =========================
     HEADER SHADOW ON SCROLL
  ========================= */
  const header = document.querySelector(".header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("header-scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* =========================
     SCROLL REVEAL
  ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* =========================
     HERO STATS COUNTER
  ========================= */
  const statNumbers = document.querySelectorAll(".hero-stats strong[data-count]");

  function animateCounter(el) {
    const target = Number(el.getAttribute("data-count")) || 0;
    const suffix = target >= 5 ? "+" : "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          statNumbers.forEach(animateCounter);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector(".hero-stats");
  if (heroStats && statNumbers.length) {
    statsObserver.observe(heroStats);
  }

  /* =========================
     SKILL PROGRESS CIRCLES
  ========================= */
  const skillCards = document.querySelectorAll(".skill-card");

  const progressObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const card = entry.target;
        const percent = Number(card.getAttribute("data-percent")) || 0;
        const circle = card.querySelector(".progress-circle");
        const number = circle ? circle.querySelector("span") : null;

        if (!circle || !number) return;

        let current = 0;
        const speed = 16;

        const timer = setInterval(function () {
          if (current >= percent) {
            clearInterval(timer);
            current = percent;
          }

          const degree = current * 3.6;
          circle.style.background =
            "conic-gradient(#2dd4bf 0deg, #2dd4bf " +
            degree +
            "deg, rgba(45, 212, 191, 0.12) " +
            degree +
            "deg, rgba(45, 212, 191, 0.12) 360deg)";

          number.textContent = current + "%";
          current++;
        }, speed);

        observer.unobserve(card);
      });
    },
    { threshold: 0.3 }
  );

  skillCards.forEach(function (card) {
    progressObserver.observe(card);
  });

  /* =========================
     FORMSUBMIT — auto email
  ========================= */
  const formNext = document.getElementById("formNext");

  if (formNext) {
    formNext.value = new URL("thanks.html", window.location.href).href;
  }

  const submitForms = document.querySelectorAll("form[data-formsubmit]");

  submitForms.forEach(function (form) {
    form.addEventListener("submit", function () {
      const btn = form.querySelector("#submitBtn") || form.querySelector('[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = "Sending…";
      }
    });
  });
});
