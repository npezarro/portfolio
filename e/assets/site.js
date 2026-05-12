/* ================================================================
   THE PEZARRO PORTFOLIO — Variant E (Newspaper)
   Minimal JS: smooth scroll on nav click
   ================================================================ */
(function () {
  'use strict';

  /* --- Smooth-scroll nav links --- */
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      /* Update URL hash without jumping */
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    });
  });
})();
