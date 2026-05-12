/* ==========================================================================
   Portfolio Variant Switcher
   Floating UI for navigating between all 20 design variants.
   ========================================================================== */
(function () {
  'use strict';

  var variants = [
    { key: '',  label: 'Original',       desc: 'Penston-inspired warm' },
    { key: 'a', label: 'A: Terminal',     desc: 'Green-on-black hacker' },
    { key: 'b', label: 'B: Editorial',    desc: 'Magazine serif layout' },
    { key: 'c', label: 'C: Bento Grid',   desc: 'Glass cards, gradients' },
    { key: 'd', label: 'D: Brutalist',    desc: 'Raw monospace, no polish' },
    { key: 'e', label: 'E: Newspaper',    desc: 'Broadsheet columns' },
    { key: 'f', label: 'F: Retro OS',     desc: 'Windows 95 desktop' },
    { key: 'g', label: 'G: Notion',       desc: 'Document / wiki style' },
    { key: 'h', label: 'H: Dark Luxury',  desc: 'High-fashion, gold accent' },
    { key: 'i', label: 'I: Playful',      desc: 'Rounded, colorful, bouncy' },
    { key: 'j', label: 'J: Blueprint',    desc: 'Technical drawing' },
    { key: 'k', label: 'K: Japanese',     desc: 'Zen minimalism' },
    { key: 'l', label: 'L: Compact Terminal', desc: 'Dense single-row list' },
    { key: 'm', label: 'M: Compact Editorial', desc: 'Two-col grid, tight' },
    { key: 'n', label: 'N: Compact Newspaper', desc: '3-col dense broadsheet' },
    { key: 'o', label: 'O: Compact Japanese',  desc: 'Names-only zen index' },
    { key: 'p', label: 'P: Monospace Zen',  desc: 'Terminal + Japanese hybrid' },
    { key: 'q', label: 'Q: Magazine Spread', desc: 'Editorial + Newspaper hybrid' },
    { key: 'r', label: 'R: Code Journal',   desc: 'Terminal + Editorial hybrid' },
    { key: 's', label: 'S: Quiet Press',    desc: 'Newspaper + Japanese hybrid' },
  ];

  // Detect which variant we're on from the URL path
  var path = window.location.pathname;
  // Match /portfolio/X/ or /portfolio/X/index.html where X is a single letter
  var match = path.match(/\/portfolio\/([a-s])\/?/);
  var currentKey = match ? match[1] : '';

  // Only show switcher on variant pages, not the main portfolio
  if (!currentKey) return;

  // Build the base path (handles both /portfolio/ and /portfolio/a/)
  var basePath = '/portfolio/';

  // Create switcher element
  var switcher = document.createElement('div');
  switcher.id = 'variant-switcher';
  switcher.innerHTML = '<button id="vs-toggle" aria-label="Switch design variant">' +
    '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>' +
    '</button>' +
    '<div id="vs-panel" class="vs-hidden">' +
    '<div id="vs-header">Design Variants</div>' +
    '<div id="vs-list"></div>' +
    '<div id="vs-nav">' +
    '<button id="vs-prev" aria-label="Previous variant">&larr;</button>' +
    '<span id="vs-current"></span>' +
    '<button id="vs-next" aria-label="Next variant">&rarr;</button>' +
    '</div>' +
    '</div>';

  // Inject styles
  var style = document.createElement('style');
  style.textContent = '#variant-switcher{position:fixed;bottom:24px;right:24px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}' +
    '#vs-toggle{width:48px;height:48px;border-radius:50%;border:none;background:#1a1a1a;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,0.3);transition:transform 0.15s,background 0.15s}' +
    '#vs-toggle:hover{transform:scale(1.08);background:#333}' +
    '@media(prefers-color-scheme:light){#vs-toggle{background:#fff;color:#1a1a1a;box-shadow:0 4px 20px rgba(0,0,0,0.15)}#vs-toggle:hover{background:#f0f0f0}}' +
    '#vs-panel{position:absolute;bottom:56px;right:0;width:280px;max-height:70vh;overflow-y:auto;background:#1a1a1a;border:1px solid #333;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,0.4);padding:0;transition:opacity 0.2s,transform 0.2s}' +
    '#vs-panel.vs-hidden{opacity:0;transform:translateY(8px) scale(0.95);pointer-events:none}' +
    '@media(prefers-color-scheme:light){#vs-panel{background:#fff;border-color:#e0e0e0;box-shadow:0 12px 40px rgba(0,0,0,0.12)}}' +
    '#vs-header{padding:14px 16px 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#888;border-bottom:1px solid #2a2a2a}' +
    '@media(prefers-color-scheme:light){#vs-header{color:#999;border-bottom-color:#eee}}' +
    '#vs-list{padding:6px}' +
    '.vs-item{display:block;width:100%;padding:10px 12px;border:none;background:none;text-align:left;cursor:pointer;border-radius:8px;transition:background 0.1s;text-decoration:none;color:inherit}' +
    '.vs-item:hover{background:#2a2a2a}' +
    '@media(prefers-color-scheme:light){.vs-item:hover{background:#f5f5f5}}' +
    '.vs-item.vs-active{background:#2a2a2a}' +
    '@media(prefers-color-scheme:light){.vs-item.vs-active{background:#f0f0ff}}' +
    '.vs-item-label{font-size:13px;font-weight:600;color:#fff;margin-bottom:2px}' +
    '@media(prefers-color-scheme:light){.vs-item-label{color:#1a1a1a}}' +
    '.vs-item.vs-active .vs-item-label{color:#6b8aff}' +
    '@media(prefers-color-scheme:light){.vs-item.vs-active .vs-item-label{color:#4a6adf}}' +
    '.vs-item-desc{font-size:11px;color:#888}' +
    '#vs-nav{display:flex;align-items:center;justify-content:space-between;padding:8px 12px 12px;border-top:1px solid #2a2a2a}' +
    '@media(prefers-color-scheme:light){#vs-nav{border-top-color:#eee}}' +
    '#vs-nav button{width:32px;height:32px;border:1px solid #333;border-radius:6px;background:none;color:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:background 0.1s}' +
    '#vs-nav button:hover{background:#333}' +
    '@media(prefers-color-scheme:light){#vs-nav button{border-color:#ddd;color:#1a1a1a}#vs-nav button:hover{background:#f0f0f0}}' +
    '#vs-current{font-size:11px;color:#888;font-weight:500}';
  document.head.appendChild(style);
  document.body.appendChild(switcher);

  // Populate list
  var list = document.getElementById('vs-list');
  var currentIdx = 0;
  variants.forEach(function (v, i) {
    var href = v.key ? basePath + v.key + '/' : basePath;
    var isActive = v.key === currentKey;
    if (isActive) currentIdx = i;
    var a = document.createElement('a');
    a.href = href;
    a.className = 'vs-item' + (isActive ? ' vs-active' : '');
    a.innerHTML = '<div class="vs-item-label">' + v.label + '</div><div class="vs-item-desc">' + v.desc + '</div>';
    list.appendChild(a);
  });

  // Update counter
  document.getElementById('vs-current').textContent = (currentIdx + 1) + ' / ' + variants.length;

  // Toggle panel
  var panel = document.getElementById('vs-panel');
  document.getElementById('vs-toggle').addEventListener('click', function () {
    panel.classList.toggle('vs-hidden');
  });

  // Close on click outside
  document.addEventListener('click', function (e) {
    if (!switcher.contains(e.target)) {
      panel.classList.add('vs-hidden');
    }
  });

  // Prev/Next navigation
  document.getElementById('vs-prev').addEventListener('click', function (e) {
    e.stopPropagation();
    var idx = (currentIdx - 1 + variants.length) % variants.length;
    var v = variants[idx];
    window.location.href = v.key ? basePath + v.key + '/' : basePath;
  });
  document.getElementById('vs-next').addEventListener('click', function (e) {
    e.stopPropagation();
    var idx = (currentIdx + 1) % variants.length;
    var v = variants[idx];
    window.location.href = v.key ? basePath + v.key + '/' : basePath;
  });

  // Keyboard nav: left/right arrows when panel is open
  document.addEventListener('keydown', function (e) {
    if (panel.classList.contains('vs-hidden')) return;
    if (e.key === 'ArrowLeft') {
      document.getElementById('vs-prev').click();
    } else if (e.key === 'ArrowRight') {
      document.getElementById('vs-next').click();
    } else if (e.key === 'Escape') {
      panel.classList.add('vs-hidden');
    }
  });
})();
