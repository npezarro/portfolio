/* ============================================================
   Compact Terminal Portfolio — Variant L — site.js
   Minimal JS: smooth scroll only. No animations, no reveals.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     SMOOTH SCROLL for nav links
     ---------------------------------------------------------- */
  function initSmoothScroll() {
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Scroll to top on nav prompt click
    var prompt = document.querySelector('.nav-prompt');
    if (prompt) {
      prompt.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initSmoothScroll();
  });

})();
