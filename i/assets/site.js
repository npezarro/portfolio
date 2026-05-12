/* ==========================================================================
   VARIANT I — Playful / Rounded / Friendly — Site JS
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Dark / Light Toggle ---------- */
  var html = document.documentElement;
  var btn = document.querySelector('[data-mode-toggle]');

  function applyMode(mode) {
    html.setAttribute('data-mode', mode);
    localStorage.setItem('np_mode', mode);
    // Update theme-color meta
    var color = mode === 'light' ? '#faf7f2' : '#1c1917';
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (t) {
      t.setAttribute('content', color);
      t.removeAttribute('media');
    });
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var current = html.getAttribute('data-mode') || 'dark';
      applyMode(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Intersection Observer — Reveal ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Nav logo — scroll to top ---------- */
  var logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
