document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     LUCIDE ICONS
  ========================= */
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  /* =========================
     MOBILE MENU
  ========================= */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      const isOpen = navLinks.classList.contains("active");

      menuBtn.innerHTML = isOpen
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';

      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuBtn.innerHTML = '<i data-lucide="menu"></i>';

        if (typeof lucide !== "undefined") {
          lucide.createIcons();
        }
      });
    });
  }

  /* =========================
     FOOTER YEAR
  ========================= */
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =========================
     HEADER SHADOW ON SCROLL
  ========================= */
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  /* =========================
     SCROLL REVEAL ANIMATION
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
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });

  /* =========================
     CIRCULAR PROGRESS ANIMATION
  ========================= */
  const skillCards = document.querySelectorAll(".skill-card");

  const progressObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const card = entry.target;
          const percent = Number(card.getAttribute("data-percent")) || 0;
          const circle = card.querySelector(".progress-circle");
          const number = circle ? circle.querySelector("span") : null;

          if (!circle || !number) return;

          let current = 0;
          const speed = 18;

          const progressTimer = setInterval(function () {
            if (current >= percent) {
              clearInterval(progressTimer);
              current = percent;
            }

            const degree = current * 3.6;

            circle.style.background =
              "conic-gradient(#5eead4 0deg, #5eead4 " +
              degree +
              "deg, rgba(94, 234, 212, 0.14) " +
              degree +
              "deg, rgba(94, 234, 212, 0.14) 360deg)";

            number.textContent = current + "%";
            current++;
          }, speed);

          observer.unobserve(card);
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  skillCards.forEach(function (card) {
    progressObserver.observe(card);
  });

  /* =========================
     CONTACT FORM BASIC ACTION
     GitHub Pages cannot send form directly.
  ========================= */
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = contactForm.querySelector('input[name="name"]').value.trim();
      const email = contactForm.querySelector('input[name="email"]').value.trim();
      const subject = contactForm.querySelector('input[name="subject"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();

      const mailSubject = subject || "SEO Project Inquiry";
      const mailBody =
        "Name: " + name + "%0D%0A" +
        "Email: " + email + "%0D%0A%0D%0A" +
        "Message:%0D%0A" + message;

      window.location.href =
        "mailto:raheelalam567@gmail.com?subject=" +
        encodeURIComponent(mailSubject) +
        "&body=" +
        mailBody;
    });
  }
});
