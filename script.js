/* Interaction and motion system. No third-party animation dependency. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const body = document.body;
  const menu = document.querySelector('#navigation');
  const menuButton = document.querySelector('.menu-toggle');
  const setMenu = open => {
    if (!menu || !menuButton) return;
    menu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu?.classList.contains('open')) { setMenu(false); menuButton.focus(); }
  });
  document.addEventListener('click', e => { if (menu?.classList.contains('open') && !e.target.closest('.site-header')) setMenu(false); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  document.querySelectorAll('#currentYear').forEach(el => el.textContent = new Date().getFullYear());

  const reveals = document.querySelectorAll('.reveal');
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));
    body.classList.add('motion-ready');
  }

  const tabs = [...document.querySelectorAll('[data-lab]')];
  function selectTab(tab, focus = false) {
    tabs.forEach(t => {
      const active = t === tab;
      t.setAttribute('aria-selected', String(active)); t.tabIndex = active ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) tab.focus();
    const visual = document.querySelector('.lab-visual');
    if (visual) visual.dataset.active = tab.dataset.lab;
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); selectTab(tabs[next], true); }
    });
  });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('[data-category]')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    let count = 0;
    projects.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
    const output = document.getElementById('project-count');
    if (output) output.textContent = `${count} project${count === 1 ? '' : 's'}`;
  }));

  const next = document.getElementById('formNext');
  if (next) next.value = new URL('thanks.html', window.location.href).href;
  // Native validation runs before submit. Keep the submit control usable if a request fails.
  document.querySelectorAll('[data-formsubmit]').forEach(form => form.addEventListener('submit', () => {
    const button = form.querySelector('[type="submit"]');
    if (button) { const original = button.innerHTML; button.textContent = 'Opening secure submission…'; setTimeout(() => { button.innerHTML = original; }, 8000); }
  }));

  let savedPause = false;
  try { savedPause = localStorage.getItem('ra-motion-paused') === 'true'; } catch {}
  let paused = savedPause || reduceMotion.matches;
  const motionToggle = document.querySelector('.motion-toggle');
  function syncMotion() {
    body.classList.toggle('motion-paused', paused);
    if (motionToggle) {
      motionToggle.setAttribute('aria-pressed', String(paused));
      motionToggle.textContent = paused ? 'Resume animations' : 'Pause animations';
      motionToggle.disabled = reduceMotion.matches;
      if (reduceMotion.matches) motionToggle.textContent = 'Reduced motion enabled';
    }
  }
  motionToggle?.addEventListener('click', () => {
    if (reduceMotion.matches) return;
    paused = !paused; savedPause = paused;
    try { localStorage.setItem('ra-motion-paused', String(paused)); } catch {}
    syncMotion(); motionControllers.forEach(c => c.wake());
  });
  reduceMotion.addEventListener('change', e => { paused = e.matches || savedPause; syncMotion(); motionControllers.forEach(c => c.wake()); });
  syncMotion();

  // A small, responsive particle field. Stop work while offscreen, hidden, or paused.
  const motionControllers = [];
  document.querySelectorAll('.particle-canvas').forEach(canvas => {
    const context = canvas.getContext('2d');
    if (!context) return;
    const surface = canvas.parentElement;
    let width = 0, height = 0, points = [], frame = null, visible = true, previous = 0;
    const pointer = { x: -1000, y: -1000 };
    function resize() {
      width = surface.clientWidth; height = surface.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(width < 680 ? 22 : 42, Math.max(12, Math.floor(width / 32)));
      points = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, r: Math.random() * 1.7 + 1 }));
      draw(false);
    }
    function draw(move) {
      context.clearRect(0, 0, width, height);
      points.forEach((p, i) => {
        if (move) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > width) p.vx *= -1; if (p.y < 0 || p.y > height) p.vy *= -1; }
        context.beginPath(); context.arc(p.x, p.y, p.r, 0, Math.PI * 2); context.fillStyle = i % 5 === 0 ? 'rgba(204,103,75,.33)' : 'rgba(22,60,54,.22)'; context.fill();
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j], distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < 145) { context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(q.x, q.y); context.strokeStyle = `rgba(22,60,54,${(1 - distance / 145) * .09})`; context.lineWidth = .7; context.stroke(); }
        }
        if (Math.hypot(p.x - pointer.x, p.y - pointer.y) < 130 && move) {
          context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(pointer.x, pointer.y); context.strokeStyle = 'rgba(204,103,75,.15)'; context.stroke();
        }
      });
      // Slow orbital geometry makes the field intentional rather than visual noise.
      context.save(); context.translate(width * .76, height * .5); context.rotate(move ? performance.now() / 90000 : .3);
      context.beginPath(); context.ellipse(0, 0, Math.min(width * .28, 300), Math.min(height * .3, 200), -.5, 0, Math.PI * 2); context.strokeStyle = 'rgba(22,60,54,.055)'; context.lineWidth = 1; context.stroke(); context.restore();
    }
    function tick(now) {
      frame = null;
      if (!visible || document.hidden || paused) return;
      if (now - previous >= 32) { draw(true); previous = now; }
      frame = requestAnimationFrame(tick);
    }
    function wake() { if (frame !== null) cancelAnimationFrame(frame); frame = null; draw(false); if (visible && !document.hidden && !paused) frame = requestAnimationFrame(tick); }
    const controller = { wake }; motionControllers.push(controller);
    if ('ResizeObserver' in window) new ResizeObserver(() => { resize(); wake(); }).observe(surface);
    else window.addEventListener('resize', () => { resize(); wake(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; wake(); }).observe(surface);
    document.addEventListener('visibilitychange', wake);
    surface.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; const box = surface.getBoundingClientRect(); pointer.x = e.clientX - box.left; pointer.y = e.clientY - box.top; }, { passive: true });
    surface.addEventListener('pointerleave', () => { pointer.x = -1000; pointer.y = -1000; });
    resize(); wake();
  });
})();
