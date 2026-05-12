/* ================================================================
   Variant G — "Notion / Documentation"
   Toggle sections, dark/light mode, TOC scroll spy
   ================================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Dark / Light Mode Toggle
     --------------------------------------------------------------- */
  const root = document.documentElement;

  function applyMode(mode) {
    root.setAttribute('data-mode', mode);
    localStorage.setItem('np_mode', mode);
  }

  // Toggle button
  document.querySelectorAll('[data-mode-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const current = root.getAttribute('data-mode') || 'light';
      applyMode(current === 'dark' ? 'light' : 'dark');
    });
  });

  /* ---------------------------------------------------------------
     Toggle Sections (expand/collapse)
     --------------------------------------------------------------- */
  document.querySelectorAll('.toggle-header').forEach(function (header) {
    var targetId = header.getAttribute('data-toggle');
    var body = document.getElementById(targetId);
    if (!body) return;

    // Start expanded
    body.style.maxHeight = body.scrollHeight + 'px';

    header.addEventListener('click', function () {
      var isCollapsed = header.classList.contains('collapsed');

      if (isCollapsed) {
        // Expand
        header.classList.remove('collapsed');
        body.classList.remove('hidden');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        // Collapse
        // First set explicit max-height for transition
        body.style.maxHeight = body.scrollHeight + 'px';
        // Force reflow
        body.offsetHeight;
        header.classList.add('collapsed');
        body.classList.add('hidden');
      }
    });

    // Re-measure on resize (content reflow)
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (!header.classList.contains('collapsed')) {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      }, 100);
    });
  });

  /* ---------------------------------------------------------------
     Table of Contents — Scroll Spy
     --------------------------------------------------------------- */
  var tocLinks = document.querySelectorAll('.toc-link');
  var sections = [];

  tocLinks.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    var el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el, link: link });
  });

  function updateActiveToc() {
    var scrollY = window.scrollY + 140;
    var active = null;

    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i].el.offsetTop <= scrollY) {
        active = sections[i];
        break;
      }
    }

    tocLinks.forEach(function (l) { l.classList.remove('active'); });
    if (active) active.link.classList.add('active');
  }

  if (sections.length > 0) {
    window.addEventListener('scroll', updateActiveToc, { passive: true });
    updateActiveToc();
  }

  /* ---------------------------------------------------------------
     TOC — smooth scroll on click
     --------------------------------------------------------------- */
  tocLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href').replace('#', '');
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

})();
