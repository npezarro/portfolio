/* ================================================================
   VARIANT Q — "Magazine Spread" — site.js
   Scroll reveals + dark mode toggle
   ================================================================ */

(function () {
  'use strict';

  /* --- Dark / Light Toggle -------------------------------------- */
  var root = document.documentElement;

  function applyMode(mode) {
    root.setAttribute('data-mode', mode);
    localStorage.setItem('np_mode', mode);
    // Update theme-color meta
    var color = mode === 'light' ? '#fefdfb' : '#141210';
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (t) {
      t.setAttribute('content', color);
      t.removeAttribute('media');
    });
  }

  document.querySelectorAll('[data-mode-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-mode') === 'dark' ? 'light' : 'dark';
      applyMode(next);
    });
  });

  /* --- Scroll Reveal -------------------------------------------- */
  var reveals = document.querySelectorAll('[data-reveal]');

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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    reveals.forEach(function (el) {
      el.classList.add('revealed');
    });
  }
})();
