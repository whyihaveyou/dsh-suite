/* 作者中心(徽章生成器 + 作者数据卡)——纯客户端、零依赖、现读 catalog.json */
(function () {
  'use strict';
  var I = window.__AC_I18N__ || {};
  var page = document.body.getAttribute('data-ac-page');
  if (!page) return;
  var isZh = /^zh/i.test(document.documentElement.lang || '');

  var state = { catalog: null, entries: [], watchlist: [] };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fill(tpl, kv) {
    return String(tpl == null ? '' : tpl).replace(/\{(\w+)\}/g, function (m, k) { return kv[k] != null ? kv[k] : m; });
  }
  function copyTxt(txt, btn) {
    function done() {
      if (!btn) return;
      var old = btn.textContent;
      btn.textContent = I.btnCopied || 'copied!';
      btn.classList.add('copied');
      setTimeout(function () { btn.textContent = old; btn.classList.remove('copied'); }, 1500);
    }
    function legacy() {
      var ta = document.createElement('textarea');
      ta.value = txt; ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) { /* 忽略,降级尽力而为 */ }
      ta.remove(); done();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done, legacy);
    else legacy();
  }

  function loadCatalog(force, cb) {
    var url = 'catalog.json' + (force ? '?t=' + Date.now() : '');
    fetch(url, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (d) {
        state.catalog = d;
        state.entries = d.plugins || [];
        state.watchlist = d.watchlist || [];
        cb(null);
      })
      .catch(function (e) { cb(e); });
  }

  function ownerOf(repo) { return String(repo || '').split('/')[0] || ''; }
  function repoName(repo) { return String(repo || '').split('/')[1] || ''; }
  function npmOf(p) {
    var m = /^dsh plugin add (@?.+)$/.exec(String(p.installCmd || '').trim());
    return m && m[1].indexOf('git+') !== 0 ? m[1] : null;
  }
  function fmtStars(n) { n = Number(n) || 0; return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n); }

  /* ---------------- shields ---------------- */
  var D_LOGO = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NiA5NiI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iMjAiIGZpbGw9IiMwMDU1RDQiLz48dGV4dCB4PSI0OCIgeT0iNjIiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iNDQiIGZvbnQtd2VpZ2h0PSI3MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPkQ8L3RleHQ+PC9zdmc+';
  function shield(label, value, color, style, withLogo) {
    var u = 'https://img.shields.io/badge/' + encodeURIComponent(label) + '-' + encodeURIComponent(value) + '-' + color;
    var sep = '?';
    if (withLogo !== false) { u += sep + 'logo=data:image/svg+xml;base64,' + D_LOGO; sep = '&'; }
    return u + sep + 'style=' + encodeURIComponent(style);
  }
  function compatShield(status, style) {
    var m = { ok: ['ok', 'brightgreen'], broken: ['broken', 'critical'], unmaintained: ['unmaintained', 'orange'], unknown: ['unknown', 'lightgrey'] }[status] || ['unknown', 'lightgrey'];
    return shield(I.badgeK_compat || 'compat', m[0], m[1], style, status !== 'unknown');
  }
  function starsShield(stars, style) { return shield(I.badgeK_stars || 'stars', fmtStars(stars), 'blue', style); }
  function installShield(style) { return shield(I.badgeK_install || 'install', 'dsh', '0055D4', style); }
  function listedShield(style) { return shield('dsh-suite', 'listed', 'midnightblue', style); }
  function authorShield(owner, n, style) { return shield('plugins by @' + owner, String(n), '0055D4', style); }

  function badgeRow(key, url) {
    var md = '![' + key + '](' + url + ')';
    var html = '<img alt="' + esc(key) + '" src="' + esc(url) + '">';
    return '<div class="ac-badge-row">'
      + '<div class="ac-badge-head"><span class="ac-badge-key">' + esc(key) + '</span><img class="ac-badge-img" src="' + esc(url) + '" alt="' + esc(key) + '" loading="lazy"></div>'
      + [['colUrl', url], ['colMd', md], ['colHtml', html]].map(function (pair) {
        return '<div class="ac-code-row"><span class="ac-col">' + esc(I[pair[0]] || pair[0]) + '</span>'
          + '<code class="ac-code">' + esc(pair[1]) + '</code>'
          + '<button class="ac-copy" type="button" data-copy="' + esc(pair[1]) + '">' + esc(I.btnCopy || 'copy') + '</button></div>';
      }).join('')
      + '</div>';
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.ac-copy');
    if (b) copyTxt(b.getAttribute('data-copy') || '', b);
  });

  /* ================= 徽章生成器页 ================= */
  if (page === 'badge') {
    var pick = document.getElementById('ac-pick');
    var list = document.getElementById('ac-picklist');
    var result = document.getElementById('ac-result');
    var byId = {}, byRepo = {}, byNpm = {};
    var current = null;

    function style() {
      var r = document.querySelector('input[name="ac-style"]:checked');
      return r ? r.value : 'flat-square';
    }
    function matchEntry(q) {
      q = String(q || '').trim().toLowerCase();
      if (!q) return null;
      if (byRepo[q]) return byRepo[q];
      if (byId[q]) return byId[q];
      if (byNpm[q]) return byNpm[q];
      var hits = state.entries.filter(function (p) {
        return p.id.toLowerCase().indexOf(q) >= 0 || String(p.repo || '').toLowerCase().indexOf(q) >= 0 || String(p.name || '').toLowerCase().indexOf(q) >= 0;
      });
      return hits.length === 1 ? hits[0] : null;
    }
    function renderBadges() {
      if (!current) {
        result.innerHTML = '<p class="ac-hint">' + esc(I.badgeNoPick || '') + '</p>'
          + badgeRow(I.badgeK_listed || 'dsh-suite listed', listedShield(style()));
        return;
      }
      var p = current, owner = ownerOf(p.repo);
      var n = state.entries.filter(function (x) { return ownerOf(x.repo).toLowerCase() === owner.toLowerCase(); }).length;
      result.innerHTML =
        '<div class="ac-picked"><strong>' + esc(p.repo || p.id) + '</strong> · ★ ' + fmtStars(p.stars) + ' · <a class="ac-link" href="' + (isZh ? 'author-zh.html' : 'author.html') + '?q=' + encodeURIComponent(owner) + '">' + esc(fill(I.badgeToAuthor || '', { owner: owner })) + '</a></div>'
        + badgeRow(I.badgeK_compat || 'compat', compatShield(p.compatStatus, style()))
        + badgeRow(I.badgeK_stars || 'stars', starsShield(p.stars, style()))
        + badgeRow(I.badgeK_install || 'install', installShield(style()))
        + badgeRow(I.badgeK_author || 'author count', authorShield(owner, n, style()))
        + badgeRow(I.badgeK_listed || 'dsh-suite listed', listedShield(style()));
    }
    pick.addEventListener('input', function () { current = matchEntry(pick.value); renderBadges(); });
    document.getElementById('ac-styles').addEventListener('change', renderBadges);
    loadCatalog(false, function (err) {
      if (err) { result.innerHTML = '<p class="ac-hint">' + esc(I.acLoadFail || '') + '</p>'; return; }
      state.entries.forEach(function (p) {
        var opt = document.createElement('option');
        opt.value = p.repo || p.id;
        opt.label = p.name + ' · ★' + fmtStars(p.stars);
        list.appendChild(opt);
        byRepo[String(p.repo || '').toLowerCase()] = p;
        byId[p.id.toLowerCase()] = p;
        var npm = npmOf(p);
        if (npm) { byNpm[npm.toLowerCase()] = p; byNpm[npm.split('/').pop().toLowerCase()] = p; } // 也支持裸包名
      });
      var q = new URLSearchParams(location.search).get('q') || pick.value; // 加载前就输入了也要补匹配
      if (q) { pick.value = q; current = matchEntry(q); renderBadges(); }
    });
    renderBadges(); // listed 通用块开箱即见
    return;
  }

  /* ================= 作者数据卡页 ================= */
  var qInput = document.getElementById('ac-q');
  var sug = document.getElementById('ac-suggest');
  var out = document.getElementById('ac-out');
  var prBox = document.getElementById('ac-pr');
  var prPatch = document.getElementById('ac-patch');
  var goBtn = document.getElementById('ac-go');

  function normalize(q) {
    q = String(q || '').trim();
    q = q.replace(/^dsh\s+plugin\s+add\s+/i, '').replace(/^dsh\s+add\s+/i, '');
    q = q.replace(/^https?:\/\/github\.com\//i, '').replace(/\.git$/i, '').replace(/\/$/, '');
    return q;
  }
  var pendingQ = null;
  function dedupeRepos(list) {
    // 同一 repo 可能被多个类别重复收录——按 repo 去重,保留星数最高的条目做展示
    var m = {};
    list.forEach(function (p) {
      var k = String(p.repo || p.id).toLowerCase();
      if (!m[k] || (Number(p.stars) || 0) > (Number(m[k].stars) || 0)) m[k] = p;
    });
    return Object.keys(m).map(function (k) { return m[k]; });
  }
  function query(q) {
    q = normalize(q);
    if (!q) { out.innerHTML = '<p class="ac-hint">' + esc(I.acNeedInput || '') + '</p>'; prBox.hidden = true; return; }
    if (!state.catalog) { // 目录仍在加载(1.9MB)——挂起,加载完成自动重跑
      pendingQ = q;
      out.innerHTML = '<p class="ac-hint">' + esc(I.acLoading || '') + '</p>';
      return;
    }
    goBtn.textContent = I.authorChecking || 'checking…';
    window.setTimeout(function () { goBtn.textContent = I.authorBtn; }, 400);
    prBox.hidden = true;
    var ql = q.toLowerCase();
    var isRepoForm = ql.indexOf('/') > 0 || ql.indexOf('@') === 0;

    var hitRepos = [], hitOwners = [], hitWatch = [];
    if (isRepoForm) {
      hitRepos = state.entries.filter(function (p) {
        var npm = (npmOf(p) || '').toLowerCase();
        var npmBare = npm ? npm.split('/').pop() : '';
        return String(p.repo || '').toLowerCase() === ql || String(p.id || '').toLowerCase() === ql
          || (npm && (npm === ql || npmBare === ql || npm === '@' + ql));
      });
      hitWatch = state.watchlist.filter(function (w) { return String(w.repo || '').toLowerCase() === ql; });
      if (!hitRepos.length && !hitWatch.length) { renderNotFound(q); return; }
      renderResults(ql, dedupeRepos(hitRepos), hitWatch, true);
      return;
    }
    // owner 查询
    hitOwners = dedupeRepos(state.entries.filter(function (p) { return ownerOf(p.repo).toLowerCase() === ql; }));
    hitWatch = state.watchlist.filter(function (w) { return ownerOf(w.repo).toLowerCase() === ql; });
    if (!hitOwners.length && !hitWatch.length) { renderNotFound(q); return; }
    renderResults(ql, hitOwners, hitWatch, false);
  }

  function compatChip(status) {
    var k = status === 'ok' ? 'ok' : status === 'broken' ? 'broken' : 'unknown';
    var txt = k === 'ok' ? (I.compatOk || 'compat OK') : k === 'broken' ? (I.compatBroken || 'compat broken') : (I.compatUnknown || 'untested');
    var dot = k === 'ok' ? '🟢' : k === 'broken' ? '🔴' : '⚪';
    return '<span class="ac-chip ac-chip-' + k + '">' + dot + ' ' + esc(txt) + '</span>';
  }

  function entryCard(p) {
    var desc = isZh ? (p.descZh || p.descEn || '') : (p.descEn || p.descZh || '');
    var risk = p.risk && (p.risk.malware || p.risk.suspicious) ? '<div class="ac-risk">' + esc(I.riskNote || '') + '</div>' : '';
    return '<article class="ac-card">'
      + '<div class="ac-card-head">'
      + '<a class="ac-card-name" href="https://github.com/' + esc(p.repo || '') + '" target="_blank" rel="noopener noreferrer">' + esc(repoName(p.repo) || p.id) + '</a>'
      + (p.featured ? '<span class="ac-feat" title="' + esc(I.fldFeatured || '') + '">' + esc(I.fldFeatured || '★ featured') + '</span>' : '')
      + compatChip(p.compatStatus)
      + '</div>'
      + (p.isOfficialBeta ? '<div class="ac-official">official</div>' : '')
      + '<p class="ac-desc">' + esc(desc) + '</p>'
      + '<div class="ac-fields">'
      + '<span><b>' + esc(I.fldStars || 'stars') + '</b> ★ ' + fmtStars(p.stars) + '</span>'
      + (p.language ? '<span><b>' + esc(I.fldLang || 'language') + '</b> ' + esc(p.language) + '</span>' : '')
      + (p.license ? '<span><b>' + esc(I.fldLicense || 'license') + '</b> ' + esc(p.license) + '</span>' : '')
      + (p.category ? '<span class="ac-cat">' + esc(p.category) + '</span>' : '')
      + '</div>'
      + risk
      + '<div class="ac-code-row"><span class="ac-col">' + esc(I.fldInstall || 'install') + '</span><code class="ac-code">' + esc(p.installCmd || '') + '</code><button class="ac-copy" type="button" data-copy="' + esc(p.installCmd || '') + '">' + esc(I.btnCopy || 'copy') + '</button></div>'
      + '<div class="ac-card-foot"><a class="ac-link" href="' + (isZh ? 'badge-zh.html' : 'badge.html') + '?q=' + encodeURIComponent(p.repo || p.id) + '">' + esc(I.authorOpenBadge || '→ Generate badges') + '</a></div>'
      + '</article>';
  }

  function watchCard(w) {
    return '<article class="ac-card ac-card-watch">'
      + '<div class="ac-card-head"><a class="ac-card-name" href="https://github.com/' + esc(w.repo) + '" target="_blank" rel="noopener noreferrer">' + esc(repoName(w.repo)) + '</a>'
      + '<span class="ac-chip ac-chip-unknown">' + esc(I.fldWatchlist || 'watchlist') + '</span></div>'
      + '<p class="ac-desc">' + esc(w.desc || '') + '</p>'
      + '<div class="ac-code-row"><span class="ac-col">' + esc(I.fldInstall || 'install') + '</span><code class="ac-code">' + esc('dsh plugin add git+https://github.com/' + w.repo) + '</code><button class="ac-copy" type="button" data-copy="' + esc('dsh plugin add git+https://github.com/' + w.repo) + '">' + esc(I.btnCopy || 'copy') + '</button></div>'
      + '</article>';
  }

  function renderResults(q, entries, watches, isRepo) {
    var owner = isRepo ? ownerOf((entries[0] || watches[0] || {}).repo) : q;
    var starsTotal = entries.reduce(function (s, p) { return s + (Number(p.stars) || 0); }, 0);
    var style = 'flat-square';
    var summary = '<section class="ac-panel ac-summary">'
      + '<h3>@' + esc(owner) + '</h3>'
      + '<p>' + esc(fill(I.authorSummary || '', { n: entries.length, ies: entries.length === 1 ? 'y' : 'ies', owner: owner, stars: fmtStars(starsTotal) })) + '</p>'
      + (watches.length ? '<p class="ac-hint">' + esc(fill(I.authorSummaryWatch || '', { w: watches.length })) + '</p>' : '')
      + (entries.length ? '<div class="ac-code-row"><span class="ac-col">' + esc(I.colMd || 'Markdown') + '</span><code class="ac-code">![' + esc('plugins by @' + owner) + '](' + esc(authorShield(owner, entries.length, style)) + ')</code><button class="ac-copy" type="button" data-copy="' + esc('![' + 'plugins by @' + owner + '](' + authorShield(owner, entries.length, style) + ')') + '">' + esc(I.btnCopy || 'copy') + '</button></div>' : '')
      + '</section>';
    var cards = entries.map(entryCard).join('') + watches.map(watchCard).join('');
    out.innerHTML = summary + '<section class="ac-grid">' + cards + '</section>';
  }

  function renderNotFound(q) {
    var issueTitle = '[submission] ' + q;
    var issueBody = 'Repo: https://github.com/' + q + '\n\n' + 'Submitted via dsh-suite Author Center.';
    var issueUrl = 'https://github.com/whyihaveyou/dsh-suite/issues/new?title=' + encodeURIComponent(issueTitle) + '&body=' + encodeURIComponent(issueBody);
    out.innerHTML = '<section class="ac-panel ac-notfound">'
      + '<h3>' + esc(fill(I.authorNotFoundTitle || '', { q: q })) + '</h3>'
      + '<p>' + esc(I.authorNotFoundDesc || '') + '</p>'
      + '<a class="ac-btn" href="' + esc(issueUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(I.authorSubmitCta || '') + '</a>'
      + '</section>';
    // PR 补丁预填
    var repo = /^[\w.-]+\/[\w.-]+$/.test(q) ? q : 'owner/repo';
    var patch = {
      op: 'add', path: '/plugins/-',
      value: {
        name: { en: '', zh: '' },
        repo: repo,
        description: { en: '', zh: '' },
        category: 'productivity',
        guides: [], langImpacts: [],
        install: { type: 'npm', package: repoName(repo) || 'npm-name', minVersion: '0.6.2' }
      }
    };
    prPatch.value = JSON.stringify(patch, null, 2);
    prBox.hidden = false;
  }

  document.getElementById('ac-copy-patch').addEventListener('click', function () { copyTxt(prPatch.value, this); });
  goBtn.addEventListener('click', function () { query(qInput.value); });
  qInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') query(qInput.value); });
  document.getElementById('ac-refresh').addEventListener('click', function () {
    var btn = this;
    loadCatalog(true, function (err) {
      if (err) { out.innerHTML = '<p class="ac-hint">' + esc(I.acLoadFail || '') + '</p>'; return; }
      var old = btn.textContent;
      btn.textContent = I.authorRefreshed || 'refreshed';
      setTimeout(function () { btn.textContent = old; }, 1200);
      if (qInput.value.trim()) query(qInput.value);
    });
  });

  loadCatalog(false, function (err) {
    if (err) { out.innerHTML = '<p class="ac-hint">' + esc(I.acLoadFail || '') + '</p>'; return; }
    // 建议列表:全部 owner + 全部 repo
    var owners = {};
    state.entries.forEach(function (p) { owners[ownerOf(p.repo).toLowerCase()] = ownerOf(p.repo); });
    Object.keys(owners).slice(0, 400).forEach(function (k) {
      var opt = document.createElement('option'); opt.value = owners[k]; opt.label = 'owner'; sug.appendChild(opt);
    });
    state.entries.slice(0, 800).forEach(function (p) {
      var opt = document.createElement('option'); opt.value = p.repo; opt.label = repoName(p.repo); sug.appendChild(opt);
    });
    var q = new URLSearchParams(location.search).get('q') || pendingQ;
    if (q) { pendingQ = null; qInput.value = q; query(q); }
  });
})();
