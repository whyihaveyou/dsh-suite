/* dsh-suite 目录站 · 前端交互（零依赖）
   搜索（中英模糊）/ 分类筛选 / 排序 / 一键复制安装命令 */

(function () {
  'use strict';

  var root = document.getElementById('catalog-data');
  if (!root) return;
  var data = JSON.parse(root.textContent);
  var catalog = data.catalog || [];

  var LANG = (document.documentElement.lang || 'en').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';

  var I18N = {
    en: {
      results: 'results',
      copy: 'Copy', copied: 'Copied!', repo: 'Repo', stars: 'stars', badge: 'Badge',
      badgeTitle: 'Copy badge code — for plugin authors to embed in README',
      badgeCopied: 'Badge code copied — paste it at the top of your README',
      featured: 'Featured', beta: 'Beta',
      compat: { ok: 'Compatible', broken: 'Broken', unknown: 'Unverified', unmaintained: 'Unmaintained' },
    },
    zh: {
      results: '条结果',
      copy: '复制', copied: '已复制！', repo: '仓库', stars: '星', badge: '徽章',
      badgeTitle: '复制徽章代码 · 供插件作者嵌入 README',
      badgeCopied: '徽章代码已复制，粘贴到你的 README 顶部即可展示',
      featured: '精选', beta: '内测',
      compat: { ok: '兼容', broken: '损坏', unknown: '未验证', unmaintained: '弃坑' },
    },
  };
  var T = I18N[LANG];

  var BADGE_MD = '[![featured on dsh-suite](https://img.shields.io/badge/featured%20on-dsh--suite-4d6bfe)](https://whyihaveyou.github.io/dsh-suite/)';

  var COMPAT_ICON = { ok: '🟢', broken: '🔴', unknown: '⚪', unmaintained: '⚫' };

  var state = { q: '', cat: 'all', sort: 'stars_desc' };

  var $search = document.getElementById('search');
  var $sort = document.getElementById('sort');
  var $filters = document.getElementById('filters');
  var $featured = document.getElementById('featured');
  var $featuredGrid = document.getElementById('featured-grid');
  var $catalogGrid = document.getElementById('catalog-grid');
  var $resultCount = document.getElementById('result-count');

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function fmtStars(n) {
    n = Number(n) || 0;
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k';
    return String(n);
  }

  function desc(p) { return LANG === 'zh' ? p.desc_zh : p.desc_en; }

  /* 模糊搜索：名称 + 中英描述，大小写不敏感子串；多词时逐词 AND */
  function matches(p, q) {
    if (!q) return true;
    var hay = [p.name, p.desc_en, p.desc_zh, p.author || ''].join('\n').toLowerCase();
    var nq = q.trim().toLowerCase();
    if (!nq) return true;
    if (hay.indexOf(nq) !== -1) return true;
    var words = nq.split(/\s+/).filter(Boolean);
    if (words.length > 1 && words.every(function (w) { return hay.indexOf(w) !== -1; })) return true;
    return false;
  }

  function byCat(p) { return state.cat === 'all' || p.category === state.cat; }

  var SORTERS = {
    stars_desc: function (a, b) { return b.stars - a.stars || a.name.localeCompare(b.name); },
    stars_asc: function (a, b) { return a.stars - b.stars || a.name.localeCompare(b.name); },
    name_asc: function (a, b) { return a.name.localeCompare(b.name); },
    name_desc: function (a, b) { return b.name.localeCompare(a.name); },
  };

  function cardHTML(p, opts) {
    opts = opts || {};
    var comp = T.compat[p.compatStatus] || T.compat.unknown;
    var ribbons = '';
    if (opts.featured) ribbons += '<span class="ribbon ribbon-featured">★ ' + esc(T.featured) + '</span>';
    if (p.isOfficialBeta) ribbons += '<span class="ribbon ribbon-beta">' + esc(T.beta) + '</span>';

    var copyBtn = p.installCmd
      ? '<button class="copy-btn" type="button" data-cmd="' + esc(p.installCmd) + '" aria-label="' + esc(T.copy) + '">' + esc(T.copy) + '</button>'
      : '';
    var badgeBtn = '<button class="copy-btn copy-badge" type="button" data-cmd="' + BADGE_MD + '" data-copied-text="' + esc(T.badgeCopied) + '" aria-label="' + esc(T.badgeTitle) + '" title="' + esc(T.badgeTitle) + '">📛 ' + esc(T.badge) + '</button>';

    return (
      '<article class="card' + (opts.featured ? ' card-featured' : '') + '" data-id="' + esc(p.id) + '" data-name="' + esc(p.name) + '" data-category="' + esc(p.category) + '" data-stars="' + p.stars + '">' +
        '<div class="card-top">' +
          '<a class="card-name" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' + esc(p.name) + '</a>' +
          '<div class="card-ribbons">' + ribbons + '</div>' +
        '</div>' +
        '<p class="card-desc">' + esc(desc(p)) + '</p>' +
        '<div class="card-meta">' +
          '<span class="badge badge-compat badge-compat-' + (p.compatStatus || 'unknown') + '">' + (COMPAT_ICON[p.compatStatus] || COMPAT_ICON.unknown) + ' ' + esc(comp) + '</span>' +
          (p.language ? '<span class="card-lang">' + esc(p.language) + '</span>' : '') +
          (p.author ? '<span class="card-author">@' + esc(p.author) + '</span>' : '') +
          '<span class="card-meta-spacer"></span>' +
          '<span class="card-stars" title="' + p.stars + ' ' + esc(T.stars) + '">★ ' + fmtStars(p.stars) + '</span>' +
        '</div>' +
        '<div class="card-foot">' +
          '<code class="install-cmd">' + esc(p.installCmd || '') + '</code>' +
          copyBtn +
          badgeBtn +
          '<a class="repo-link" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' + esc(T.repo) + ' ↗</a>' +
        '</div>' +
      '</article>'
    );
  }

  function render() {
    var browsing = state.q.trim() === '' && state.cat === 'all';
    var filtered = catalog.filter(function (p) { return matches(p, state.q) && byCat(p); });
    var sorted = filtered.slice().sort(SORTERS[state.sort] || SORTERS.stars_desc);

    if (browsing) {
      $featured.hidden = false;
      var featured = catalog.filter(function (p) { return p.featured; }).sort(SORTERS.stars_desc);
      $featuredGrid.innerHTML = featured.map(function (p) { return cardHTML(p, { featured: true }); }).join('');
      $catalogGrid.innerHTML = sorted.map(function (p) { return cardHTML(p); }).join('');
      $resultCount.hidden = true;
    } else {
      $featured.hidden = true;
      $catalogGrid.innerHTML = sorted.map(function (p) { return cardHTML(p); }).join('');
      $resultCount.hidden = false;
      $resultCount.textContent = sorted.length + ' ' + T.results;
    }
  }

  /* 事件绑定 */
  var debounce;
  $search.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(function () { state.q = $search.value; render(); }, 120);
  });

  $sort.addEventListener('change', function () { state.sort = $sort.value; render(); });

  $filters.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    state.cat = chip.getAttribute('data-cat');
    $filters.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('active', c === chip); });
    render();
  });

  /* 一键复制（事件委托，兼容无 clipboard API 的环境） */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.copy-btn');
    if (!btn) return;
    var cmd = btn.getAttribute('data-cmd');
    function done() {
      var prev = btn.textContent;
      btn.textContent = btn.getAttribute('data-copied-text') || T.copied;
      btn.classList.add('copied');
      setTimeout(function () { btn.textContent = prev; btn.classList.remove('copied'); }, 2600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cmd).then(done, function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = cmd; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (err) {}
      document.body.removeChild(ta);
    }
  });

  /* SVG → PNG 下载（仪表盘图表，零依赖：序列化 → var() 解析 → canvas → toDataURL → a.download） */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.png-btn');
    if (!btn) return;
    var svg = document.querySelector(btn.getAttribute('data-svg') + ' svg');
    if (!svg) svg = document.querySelector(btn.getAttribute('data-svg'));
    if (!svg) return;
    var rect = svg.getBoundingClientRect();
    var w = Math.round(rect.width) || 640;
    var h = Math.round(rect.height) || 300;
    var clone = svg.cloneNode(true);
    clone.setAttribute('width', w);
    clone.setAttribute('height', h);
    var cs = getComputedStyle(document.documentElement);
    var xml = new XMLSerializer().serializeToString(clone).replace(/var\(--[\w-]+\)/g, function (m) {
      return cs.getPropertyValue(m.slice(4, -1)).trim() || '#fff';
    });
    var img = new Image();
    img.onload = function () {
      var scale = 2;
      var canvas = document.createElement('canvas');
      canvas.width = w * scale;
      canvas.height = h * scale;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0b0f1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var a = document.createElement('a');
      a.download = btn.getAttribute('data-name') + '.png';
      a.href = canvas.toDataURL('image/png');
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
  });
})();

