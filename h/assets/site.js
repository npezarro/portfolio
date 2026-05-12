/* ================================================================
   VARIANT H — Dark Luxury / High Fashion
   site.js — Reveal animations
   ================================================================ */

(function () {
  'use strict';

  // ---- Intersection Observer for reveal animations ----
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach(function (el, index) {
      // Stagger delay based on position within parent
      var siblings = el.parentElement
        ? el.parentElement.querySelectorAll('[data-reveal]')
        : [];
      var siblingIndex = Array.prototype.indexOf.call(siblings, el);
      if (siblingIndex < 0) siblingIndex = 0;

      el.style.transitionDelay = siblingIndex * 0.08 + 's';
      observer.observe(el);
    });
  } else {
    // Fallback: reveal everything immediately
    reveals.forEach(function (el) {
      el.classList.add('revealed');
    });
  }
})();
