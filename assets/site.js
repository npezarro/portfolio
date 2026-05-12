/* ==========================================================================
   Nick Pezarro — Portfolio
   Dark/light toggle + scroll reveal.
   ========================================================================== */

(function () {
  'use strict';

  // ---- Dark / Light toggle ----
  var toggle = document.querySelector('[data-mode-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-mode');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-mode', next);
      localStorage.setItem('np_mode', next);

      // Sync theme-color meta tags
      var color = next === 'light' ? '#efece4' : '#0c0b08';
      document.querySelectorAll('meta[name="theme-color"]').forEach(function (t) {
        t.setAttribute('content', color);
        t.removeAttribute('media');
      });
    });
  }

  // ---- Scroll reveal (IntersectionObserver) ----
  var reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  // ---- Smooth scroll to top on nav logo click ----
  var navMark = document.querySelector('.nav-mark');
  if (navMark) {
    navMark.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
