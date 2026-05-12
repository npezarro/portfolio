/* ================================================================
   EDITORIAL / MAGAZINE — Variant B  |  site.js
   ================================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     DARK / LIGHT MODE TOGGLE
     --------------------------------------------------------------- */
  var root = document.documentElement;

  function applyMode(mode) {
    root.setAttribute('data-mode', mode);
    localStorage.setItem('np_mode', mode);

    // Update theme-color meta tags
    var color = mode === 'dark' ? '#0d1117' : '#faf8f5';
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (el) {
      el.setAttribute('content', color);
      el.removeAttribute('media');
    });
  }

  document.querySelectorAll('[data-mode-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-mode') || 'light';
      applyMode(current === 'dark' ? 'light' : 'dark');
    });
  });

  /* ---------------------------------------------------------------
     SCROLL REVEAL  (IntersectionObserver)
     --------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ---------------------------------------------------------------
     SMOOTH SCROLL for nav links
     --------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
