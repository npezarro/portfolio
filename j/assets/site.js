/* ================================================================
   VARIANT J — Blueprint / Technical Drawing — site.js
   Intersection Observer reveal + staggered draw-in animations
   ================================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Intersection Observer — add .is-visible to [data-animate] els
     --------------------------------------------------------------- */
  var animateEls = document.querySelectorAll('[data-animate]');

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animateEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: show everything immediately */
    animateEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------------------------------------------------------------
     Specs table: observe the .specs-table section itself
     --------------------------------------------------------------- */
  var specsTable = document.querySelector('.specs-table');
  if (specsTable && 'IntersectionObserver' in window) {
    var specsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            specsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    specsObserver.observe(specsTable);
  } else if (specsTable) {
    specsTable.classList.add('is-visible');
  }

  /* ---------------------------------------------------------------
     Smooth scroll for any internal anchor links
     --------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* ---------------------------------------------------------------
     Optional: subtle parallax on crop marks (decorative)
     --------------------------------------------------------------- */
  var cropMarks = document.querySelectorAll('.crop-mark');

  if (cropMarks.length && window.matchMedia('(min-width: 768px)').matches) {
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var scrollY = window.pageYOffset;
          var shift = Math.round(scrollY * 0.02);
          cropMarks.forEach(function (m) {
            m.style.transform = 'translate(0, ' + shift + 'px)';
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }
})();
