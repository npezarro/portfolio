/* ========================================================
   Variant K — Japanese Minimalism / Zen
   site.js
   ======================================================== */

(function () {
  'use strict';

  /* ---- Dark / Light Toggle ---- */
  var toggle = document.querySelector('[data-mode-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-mode');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-mode', next);
      localStorage.setItem('np_mode', next);

      // Update theme-color meta tags
      var color = next === 'light' ? '#f7f3ee' : '#1a1816';
      document.querySelectorAll('meta[name="theme-color"]').forEach(function (t) {
        t.setAttribute('content', color);
        t.removeAttribute('media');
      });
    });
  }

  /* ---- Scroll Reveal (opacity only, 800ms) ---- */
  var reveals = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
