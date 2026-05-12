/* ============================================================
   QUIET PRESS — Variant S
   Gentle scroll reveals + dark mode toggle
   ============================================================ */

(function () {
  'use strict';

  /* ---- Dark / light toggle ---- */
  var html = document.documentElement;

  function applyMode(mode) {
    html.setAttribute('data-mode', mode);
    localStorage.setItem('np_mode', mode);
    // Update theme-color meta
    var c = mode === 'light' ? '#f2ede4' : '#1a1816';
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (t) {
      t.setAttribute('content', c);
      t.removeAttribute('media');
    });
  }

  document.querySelectorAll('[data-mode-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = html.getAttribute('data-mode') === 'dark' ? 'light' : 'dark';
      applyMode(next);
    });
  });

  /* ---- Scroll reveal (opacity only, 800ms, very gentle) ---- */
  var reveals = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

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
