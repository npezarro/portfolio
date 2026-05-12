/* ================================================================
   VARIANT R — "Code Journal"
   site.js — scroll reveals + mode toggle
   ================================================================ */

(function () {
  'use strict';

  /* ── Mode toggle ──────────────────────────────────────────────── */
  var html = document.documentElement;

  function applyMode(mode) {
    html.setAttribute('data-mode', mode);
    localStorage.setItem('np_mode', mode);
    var c = mode === 'light' ? '#f4f1eb' : '#111111';
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

  /* ── Scroll reveals ───────────────────────────────────────────── */
  var revealEls = document.querySelectorAll('[data-reveal], [data-stagger]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var stagger = el.getAttribute('data-stagger');
            var delay = stagger !== null ? parseInt(stagger, 10) * 80 : 0;
            setTimeout(function () {
              el.classList.add('revealed');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: reveal everything */
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }
})();
