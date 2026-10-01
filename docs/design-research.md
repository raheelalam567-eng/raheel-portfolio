# Portfolio design research

Research date: 1 October 2026.

## References and access limits

- **Brittany Chiang**: inspected the public portfolio implementation at https://github.com/bchiang7/v4, particularly `src/components/sections/hero.js` and `src/styles/theme.js`. The introduction establishes identity and purpose with a small introductory label, a prominent headline, constrained reading width, a clear action, and reduced-motion-aware entrance behavior. The live domain returned HTTP 403 from this environment; this comparison is based on source, not a claimed live visual review.
- **Chanh Dai**: inspected https://github.com/ncdai/chanhdai.com, including the home page and profile header. The home separates projects, skills, experience, education, testimonials, and recognition into distinct modules. Its profile uses deliberate framing, a compact personal identity, and an interactive visual rather than piling decorative badges onto the text. Source inspection only; no runtime animation claims.
- **Minimal portfolio template**: inspected the current https://github.com/leerob/leerob.io implementation. The current repository is a minimal MDX portfolio/blog template, not evidence of Lee Robinson's current personal-site design. Its restrained Inter typography, readable content column, and balanced headings provide a useful counterpoint to animated templates.
- **Reeni Home 02**: https://inversweb.com/product/html/reeni/index-02.html was rendered and visually inspected earlier in this session. It uses an oversized portrait, rotating profession, experience, skills, work, and testimonials. It offers clear section completeness, but repeating its portrait-and-badge composition did not meet the requested direction.
- Prior live browser inspection of https://labs.google/ and https://linear.app/ also informed purposeful visual hierarchy and restrained interface motion.

Dennis Snellenberg, Sean Halpin, and Bruno Simon's public sites were attempted, but returned HTTP 403. They are not presented as inspected references. Public references were fetched read-only; no forms were submitted.

## Implemented direction

A warm editorial portfolio with paper-white, charcoal, olive, and burnt-orange surfaces. Its original headline emphasizes the offered work; the personal portrait occupies a clean photographic panel. Selected work follows the introduction. Work, services, career, certifications, achievements, capabilities, testimonials, and contact use different layouts and surface treatments. Thin borders and modest corners replace repeated floating cards. Hover motion communicates links; reduced-motion and pause controls remain supported.

Existing local Plus Jakarta Sans and Inter fonts remain, with a consistent responsive hierarchy. Supplied career information, credentials, project names, and client-attributed results are preserved. No reference artwork, branding, source code, or proprietary animations were copied.

## Validation

Check all eleven primary pages at phone and desktop widths, plus narrow-phone and tablet layouts. Verify runtime errors, horizontal overflow, images, keyboard navigation and service tabs, certificate previews, project filtering, native contact validation without submission, reduced motion, and pause persistence. Verify the actual GitHub Pages deployment before reporting publication complete.
