/* ============================================================
   VARIANT F — RETRO OS / WINDOWS 95 — site.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Taskbar Clock ---- */
  var clockEl = document.getElementById('taskbar-clock');

  function updateClock() {
    if (!clockEl) return;
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    var mm = m < 10 ? '0' + m : m;
    clockEl.textContent = h + ':' + mm + ' ' + ampm;
  }

  updateClock();
  setInterval(updateClock, 10000);

  /* ---- Double-click to open file rows ---- */
  var fileRows = document.querySelectorAll('.file-row');
  fileRows.forEach(function (row) {
    row.addEventListener('dblclick', function (e) {
      e.preventDefault();
      var href = row.getAttribute('href');
      if (href) window.location.href = href;
    });

    // Single click selects (highlight), prevent navigation
    row.addEventListener('click', function (e) {
      e.preventDefault();
      // Remove selection from all rows
      fileRows.forEach(function (r) { r.classList.remove('file-selected'); });
      row.classList.add('file-selected');
    });
  });

  /* ---- Add selected style dynamically ---- */
  var style = document.createElement('style');
  style.textContent =
    '.file-row.file-selected { background: #000080 !important; color: #fff !important; }' +
    '.file-row.file-selected .file-type, .file-row.file-selected .file-size { color: #ccc !important; }' +
    '.file-row.file-selected .private-tag { color: #ffff00 !important; border-color: #ffff00 !important; }';
  document.head.appendChild(style);

  /* ---- Title bar drag simulation (visual only) ---- */
  var titleBar = document.getElementById('title-bar');
  if (titleBar) {
    titleBar.style.cursor = 'default';
  }

  /* ---- Start button click feedback ---- */
  var startBtn = document.querySelector('.start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      startBtn.classList.toggle('start-active');
    });

    // Close start menu on outside click
    document.addEventListener('click', function (e) {
      if (!startBtn.contains(e.target)) {
        startBtn.classList.remove('start-active');
      }
    });
  }

  /* ---- Window close button (fun easter egg: hides window briefly) ---- */
  var closeBtn = document.querySelector('.title-btn-close');
  var mainWindow = document.getElementById('main-window');
  if (closeBtn && mainWindow) {
    closeBtn.addEventListener('click', function () {
      mainWindow.style.display = 'none';
      setTimeout(function () {
        mainWindow.style.display = '';
      }, 1500);
    });
  }

  /* ---- Minimize button (collapse to just title bar) ---- */
  var minBtn = document.querySelector('.title-btn[aria-label="Minimize"]');
  var windowBody = document.querySelector('.window-body');
  var menuBar = document.querySelector('.menu-bar');
  if (minBtn && windowBody && menuBar) {
    minBtn.addEventListener('click', function () {
      var hidden = windowBody.style.display === 'none';
      windowBody.style.display = hidden ? '' : 'none';
      menuBar.style.display = hidden ? '' : 'none';
    });
  }

})();
