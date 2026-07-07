/* GitHub Pages: fix paths when site is in a subfolder (e.g. /portfolio/) */
(function () {
  var path = window.location.pathname;
  var baseHref = "./";
  if (path.length > 1) {
    var lastSlash = path.lastIndexOf("/");
    if (lastSlash > 0) {
      baseHref = path.substring(0, lastSlash + 1);
    }
  }
  if (!document.querySelector("base[data-site-base]")) {
    var base = document.createElement("base");
    base.setAttribute("data-site-base", "1");
    base.href = baseHref;
    document.head.insertBefore(base, document.head.firstChild);
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  
  /* =========================
     ICONS INITIALIZATION
  ========================= */
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
     ACTIVE NAV HIGHLIGHT
  ========================= */
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll(".nav-links a[data-page]").forEach(function (link) {
      link.classList.toggle("active", link.dataset.page === currentPage);
    });
  }

  /* =========================
     FOOTER YEAR
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
     SCROLL PROGRESS BAR
  ========================= */
  const progressContainer = document.createElement("div");
  progressContainer.className = "scroll-progress-container";
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  progressContainer.appendChild(progressBar);
  document.body.appendChild(progressContainer);

  window.addEventListener("scroll", function () {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + "%";
  }, { passive: true });

  /* =========================
     DYNAMIC CURSOR GLOW ACCENT
  ========================= */
  if (window.matchMedia("(pointer: fine)").matches) {
    const glow = document.createElement("div");
    glow.className = "bg-glow";
    glow.style.position = "fixed";
    glow.style.top = "0";
    glow.style.left = "0";
    glow.style.willChange = "transform";
    document.body.appendChild(glow);

    document.addEventListener("mousemove", function (e) {
      requestAnimationFrame(function () {
        glow.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
      });
    }, { passive: true });
  }

  /* =========================
     MAGNETIC HOVER ANIMATIONS
  ========================= */
  const magneticEls = document.querySelectorAll(".btn, .btn-magnetic, .logo-icon");
  magneticEls.forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.03)`;
    });
    el.addEventListener("mouseleave", function () {
      el.style.transform = "translate(0px, 0px) scale(1)";
    });
  });

  /* =========================
     MODERN HERO PARALLAX MOTION
  ========================= */
  function initHeroMotion() {
    const hero = document.querySelector(".hero");
    if (!hero || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    const motionLayer = document.createElement("div");
    motionLayer.className = "hero-motion-layer";
    motionLayer.innerHTML = `
      <span class="hero-motion-shape shape-1"></span>
      <span class="hero-motion-shape shape-2"></span>
      <span class="hero-motion-shape shape-3"></span>
      <span class="hero-motion-shape shape-4"></span>
    `;
    hero.appendChild(motionLayer);

    let moveX = 0;
    let moveY = 0;
    let targetX = 0;
    let targetY = 0;

    hero.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    function animateMotion() {
      moveX += (targetX - moveX) * 0.08;
      moveY += (targetY - moveY) * 0.08;
      motionLayer.style.setProperty("--hero-move-x", `${moveX * 22}px`);
      motionLayer.style.setProperty("--hero-move-y", `${moveY * 22}px`);
      requestAnimationFrame(animateMotion);
    }

    requestAnimationFrame(animateMotion);
  }
  initHeroMotion();

  /* =========================
     STAGGERED SCROLL REVEAL
  ========================= */
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        // Sort elements based on their vertical page position to reveal top-to-bottom
        intersecting.sort(function (a, b) {
          return a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top;
        });

        intersecting.forEach(function (entry, index) {
          const el = entry.target;
          // Apply dynamic stagger delay for items triggered in the same frame
          const delay = index * 80; 
          setTimeout(function () {
            el.classList.add("active");
          }, delay);
          observer.unobserve(el);
        });
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* =========================
     STATS COUNTER ANIMATION
  ========================= */
  const statNumbers = document.querySelectorAll(".hero-stats strong[data-count], .result-card strong[data-count]");

  function animateCounter(el) {
    const target = Number(el.getAttribute("data-count")) || 0;
    const isTechi = el.textContent.includes("M");
    const suffix = isTechi ? "M+" : (target >= 5 ? "+" : "");
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out
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
    { threshold: 0.4 }
  );

  const heroStats = document.querySelector(".hero-stats");
  const resultsGrid = document.querySelector(".results-grid");
  
  if (statNumbers.length) {
    if (heroStats) statsObserver.observe(heroStats);
    if (resultsGrid) statsObserver.observe(resultsGrid);
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
        const speed = 12;

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
     3D TILT INTERACTIONS
     Applies a subtle 3D tilt to hero profile and project cards
  ========================= */
  (function init3DTilt() {
    const selectors = ['.profile-card', '.project-card'];
    const maxTilt = 12; // degrees
    const elems = document.querySelectorAll(selectors.join(','));

    elems.forEach(function (el) {
      // wrap with perspective container if not already
      if (!el.classList.contains('tilt-3d-wrapper')) el.classList.add('tilt-3d-wrapper');

      // create inner wrapper if missing
      if (!el.querySelector('.tilt-inner')) {
        const inner = document.createElement('div');
        inner.className = 'tilt-inner';
        while (el.firstChild) inner.appendChild(el.firstChild);
        el.appendChild(inner);
      }

      // add shine layer
      if (!el.querySelector('.tilt-shine')) {
        const shine = document.createElement('div');
        shine.className = 'tilt-shine';
        el.appendChild(shine);
      }

      const inner = el.querySelector('.tilt-inner');
      const shine = el.querySelector('.tilt-shine');
      let rafId = null;

      function handleMove(e) {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotY = (px - 0.5) * maxTilt * 2; // left/right
        const rotX = (0.5 - py) * maxTilt * 2; // up/down

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(function () {
          inner.style.transform = `translateZ(20px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
          if (shine) shine.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.12), transparent 40%)`;
          el.classList.remove('tilt-idle');
        });
      }

      function handleLeave() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(function () {
          inner.style.transform = '';
          if (shine) shine.style.background = '';
          el.classList.add('tilt-idle');
        });
      }

      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', handleLeave);
      el.addEventListener('mouseenter', function () { el.classList.remove('tilt-idle'); });

      // set initial idle float
      el.classList.add('tilt-idle');
    });
  })();

  /* =========================
     FORMSUBMIT AUTO NEXT URL
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

  /* =========================
     SCREENSHOT LIGHTBOX
  ========================= */
  (function initLightbox() {
    const thumbs = document.querySelectorAll('.screenshot-thumb');
    if (!thumbs.length) return;

    // create overlay elements
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-hidden', 'true');

    const content = document.createElement('div');
    content.className = 'lightbox-content';
    const img = document.createElement('img');
    img.alt = '';
    content.appendChild(img);
    overlay.appendChild(content);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close image');
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';

    document.body.appendChild(overlay);
    document.body.appendChild(closeBtn);
    closeBtn.style.display = 'none';

    function open(src, alt) {
      img.src = src;
      img.alt = alt || '';
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      closeBtn.style.display = 'grid';
      // trap focus
      closeBtn.focus();
    }

    function close() {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      img.src = '';
      closeBtn.style.display = 'none';
    }

    const galleryNote = document.querySelector('.gallery-note');

    thumbs.forEach(function (btn) {
      const imgEl = btn.querySelector('img');

      imgEl.addEventListener('error', function () {
        btn.classList.add('screenshot-missing');
        btn.innerHTML = '<div class="screenshot-missing-text">Screenshot unavailable</div>';
        if (galleryNote) galleryNote.style.display = 'block';
      });

      btn.addEventListener('click', function () {
        if (btn.classList.contains('screenshot-missing')) return;
        const full = btn.getAttribute('data-full') || imgEl.src;
        const alt = imgEl.getAttribute('alt') || '';
        open(full, alt);
      });
    });

    if (galleryNote && thumbs.length && !document.querySelector('.screenshot-missing')) {
      galleryNote.style.display = 'none';
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        close();
      }
    });
  })();
});
