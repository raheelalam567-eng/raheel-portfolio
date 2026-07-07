(function () {
  var el = document.getElementById("site-footer");
  if (!el) return;

  el.className = "footer";
  el.setAttribute("role", "contentinfo");

  el.innerHTML =
    '<div class="container">' +
    '<div class="footer-grid-expanded">' +
    '<div class="footer-brand">' +
    '<a href="index.html" class="logo"><span class="logo-icon" aria-hidden="true">R</span> Raheel Alam</a>' +
    "<p>SEO Strategist, WordPress Developer &amp; Meta Ads Expert — Karachi, Pakistan · Remote &amp; International Projects.</p>" +
    "</div>" +
    '<div class="footer-menu">' +
    "<h4>Main Pages</h4>" +
    '<a href="index.html">Home</a>' +
    '<a href="about.html">About Me</a>' +
    '<a href="services.html">Services</a>' +
    '<a href="projects.html">Projects</a>' +
    '<a href="results.html">Results</a>' +
    '<a href="reviews.html">Reviews</a>' +
    '<a href="contact.html">Contact</a>' +
    "</div>" +
    '<div class="footer-menu">' +
    "<h4>Services</h4>" +
    '<a href="seo-services.html">SEO Services</a>' +
    '<a href="wordpress-development.html">WordPress Development</a>' +
    '<a href="meta-ads.html">Meta Ads</a>' +
    '<a href="seo-services.html#geo-aeo">GEO &amp; AEO</a>' +
    '<a href="contact.html">Get a Quote</a>' +
    "</div>" +
    '<div class="footer-menu">' +
    "<h4>Contact Us</h4>" +
    '<a href="mailto:raheelalam567@gmail.com">raheelalam567@gmail.com</a>' +
    '<a href="https://wa.me/923045080931" target="_blank" rel="noopener noreferrer">+92 304 5080931</a>' +
    '<a href="contact.html">Send a Message</a>' +
    '<a href="https://www.linkedin.com/in/raheel-alam-seo/" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
    "</div>" +
    "</div>" +
    '<div class="footer-bottom">' +
    '<p>&copy; <span id="currentYear"></span> Raheel Alam. All rights reserved. · SEO Strategist · WordPress Developer · Meta Ads Expert</p>' +
    '<div class="footer-social-links">' +
    '<a href="https://www.linkedin.com/in/raheel-alam-seo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i data-lucide="linkedin"></i></a>' +
    '<a href="https://wa.me/923045080931" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i data-lucide="message-circle"></i></a>' +
    '<a href="mailto:raheelalam567@gmail.com" aria-label="Email"><i data-lucide="mail"></i></a>' +
    '<a href="https://www.techi.com/@raheelalam/" target="_blank" rel="noopener noreferrer" aria-label="Techi"><i data-lucide="external-link"></i></a>' +
    "</div>" +
    "</div>" +
    "</div>";
})();
