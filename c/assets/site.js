/* ================================================================
   Variant C — Bento Grid / Modern SaaS — JS
   ================================================================ */

(function () {
  'use strict';

  /* -------------------------------------------------------------- */
  /* Dark / Light toggle                                             */
  /* -------------------------------------------------------------- */
  var toggle = document.querySelector('[data-mode-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var html = document.documentElement;
      var next = html.getAttribute('data-mode') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-mode', next);
      localStorage.setItem('np_mode', next);
      // Update theme-color meta
      document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
        m.setAttribute('content', next === 'dark' ? '#09090b' : '#fafafa');
        m.removeAttribute('media');
      });
    });
  }

  /* -------------------------------------------------------------- */
  /* Intersection Observer — reveal on scroll                        */
  /* -------------------------------------------------------------- */
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything
    document.querySelectorAll('.bento-card, .stats, .section-header, .about-headline, .about-body, [data-reveal]').forEach(function (el) {
      el.classList.add('is-visible');
      el.style.opacity = '';
      el.style.transform = '';
    });
    return;
  }

  // Cards — stagger within each grid
  var cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var card = entry.target;
      cardObserver.unobserve(card);

      // Find sibling cards in same grid for stagger index
      var grid = card.parentElement;
      var siblings = Array.prototype.slice.call(grid.querySelectorAll('[data-card]'));
      var idx = siblings.indexOf(card);
      var delay = idx * 100; // 0.1s stagger

      card.style.animationDelay = delay + 'ms';
      card.classList.add('is-visible');
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('[data-card]').forEach(function (card) {
    cardObserver.observe(card);
  });

  // General elements — stats, section headers, about text
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  // Observe stats
  document.querySelectorAll('.stats').forEach(function (el) {
    revealObserver.observe(el);
  });

  // Observe section headers (for line animation)
  document.querySelectorAll('.section-header').forEach(function (el) {
    revealObserver.observe(el);
  });

  // Observe about elements
  document.querySelectorAll('.about-headline, .about-body').forEach(function (el) {
    revealObserver.observe(el);
  });

  // Generic data-reveal sections
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    if (!el.classList.contains('stats')) {
      revealObserver.observe(el);
    }
  });

})();
