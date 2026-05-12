/* ============================================================
   Terminal Portfolio — Variant A — site.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     SCROLL REVEAL — opacity only, line-by-line feel
     ---------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------
     TYPING EFFECT — CSS steps() on hero bio
     After a delay, remove the caret on the bio text
     ---------------------------------------------------------- */
  function initTypingEffect() {
    var bio = document.querySelector('.hero-bio');
    if (!bio) return;

    // After 3 seconds, stop the caret blinking on the bio
    setTimeout(function () {
      bio.classList.add('typed');
    }, 3000);
  }

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
    initReveal();
    initTypingEffect();
    initSmoothScroll();
  });

})();
