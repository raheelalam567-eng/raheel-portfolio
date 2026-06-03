// Load Lucide icons
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // Automatically update footer year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Mobile navigation menu
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuBtn.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';

            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }
        });

        // Close mobile menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuBtn.innerHTML = '<i data-lucide="menu"></i>';

                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }
            });
        });
    }

    // Reveal elements when scrolling
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

    // Add shadow to navigation bar after scrolling
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (!header) return;

        if (window.scrollY > 20) {
            header.style.boxShadow = "0 10px 35px rgba(0, 0, 0, 0.25)";
        } else {
            header.style.boxShadow = "none";
        }
    });
});
