/* TAMCU LTD — site behaviour and content rendering.
   Editable content lives in /data/*.json (managed from /admin/). */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var lang = function () { return window.TAMCU_LANG === 'en' ? 'en' : 'sw'; };
  var L = function (v) { return v == null ? '' : typeof v === 'object' ? (v[lang()] || v.sw || v.en || '') : String(v); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var has = function (v) { return v !== '' && v != null && !(typeof v === 'number' && isNaN(v)); };
  var num = function (v) { if (!has(v)) return NaN; return typeof v === 'number' ? v : parseFloat(String(v).replace(/[, ]/g, '')); };
  var fmt = function (v, dp) { var n = num(v); return isNaN(n) ? '—' : n.toLocaleString('en-US', { maximumFractionDigits: dp || 0 }); };
  var safeUrl = function (u) { u = String(u || '').trim(); return /^(https?:\/\/|\/|uploads\/|assets\/|data\/|[a-z0-9-]+\.html)/i.test(u) && !/^javascript:/i.test(u) ? u : ''; };

  var UI = {
    sw: {
      months: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ago', 'Sep', 'Okt', 'Nov', 'Des'],
      monthsLong: ['Januari', 'Februari', 'Machi', 'Aprili', 'Mei', 'Juni', 'Julai', 'Agosti', 'Septemba', 'Oktoba', 'Novemba', 'Desemba'],
      inSeason: 'Msimu unaendelea', starts: 'Unaanza', auctions: 'Minada', production: 'Uzalishaji', otherCrops: 'Mazao mengine na yanapopatikana',
      seasonBoard: 'Mtiririko wa Msimu', now: 'Mwezi huu',
      sn: 'Na.', auction: 'Mnada', date: 'Tarehe', place: 'Mahali', host: 'Mwenyeji', kg: 'Kilo zilizouzwa', lots: 'Idadi ya loti',
      high: 'Bei juu', low: 'Bei chini', avg: 'Bei wastani', season: 'Msimu', weight: 'Uzito (kg)', avgPrice: 'Bei wastani (TSh)', value: 'Thamani (TSh)', total: 'Jumla',
      chooseSeason: 'Chagua msimu', sumKg: 'Jumla ya kilo', sumLots: 'Jumla ya loti', topPrice: 'Bei ya juu kabisa', wavg: 'Wastani wa bei (kwa uzito)',
      auctionNo: 'Mnada wa', noAuctions: 'Matokeo ya minada ya zao hili hayajawekwa bado. Yataonekana hapa mara tu mnada utakapofanyika.',
      noProduction: 'Takwimu za uzalishaji wa zao hili zitawekwa hivi karibuni.', prices: 'Bei zote ni TSh kwa kilo.',
      tickerLabel: 'Bei za mazao msimu uliopita:', readMore: 'Soma zaidi', allNews: 'Habari zote', noNews: 'Hakuna habari kwa sasa.',
      msgFrom: 'Ujumbe wa', latestOf: 'Minada ya', seeAll: 'Angalia minada yote', weightChart: 'Uzito kwa msimu (kg)',
      notFound: 'Habari hii haipatikani. Huenda imeondolewa.', back: 'Rudi kwenye habari', updatesEmpty: 'Taarifa mpya zitawekwa hapa.', open: 'Fungua',
    },
    en: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      monthsLong: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      inSeason: 'In season', starts: 'Starts', auctions: 'Auctions', production: 'Production', otherCrops: 'Other crops and when they are available',
      seasonBoard: 'Season calendar', now: 'This month',
      sn: 'No.', auction: 'Auction', date: 'Date', place: 'Venue', host: 'Host', kg: 'Kg sold', lots: 'Lots',
      high: 'Highest', low: 'Lowest', avg: 'Average', season: 'Season', weight: 'Weight (kg)', avgPrice: 'Avg. price (TSh)', value: 'Value (TSh)', total: 'Total',
      chooseSeason: 'Choose season', sumKg: 'Total kg sold', sumLots: 'Total lots', topPrice: 'Highest price', wavg: 'Weighted average price',
      auctionNo: 'Auction', noAuctions: 'No auction results for this crop yet. They will appear here as soon as an auction is held.',
      noProduction: 'Production figures for this crop will be added soon.', prices: 'All prices are TSh per kg.',
      tickerLabel: 'Last season’s crop prices:', readMore: 'Read more', allNews: 'All news', noNews: 'No news yet.',
      msgFrom: 'Message from the', latestOf: 'Auctions:', seeAll: 'See all auctions', weightChart: 'Weight by season (kg)',
      notFound: 'This story is not available. It may have been removed.', back: 'Back to news', updatesEmpty: 'New updates will appear here.', open: 'Open',
    },
  };
  var u = function (k) { return UI[lang()][k]; };
  var dateText = function (iso, short) {
    if (!iso) return '';
    var d = new Date(iso + (String(iso).length === 10 ? 'T00:00:00' : ''));
    if (isNaN(d)) return esc(iso);
    return short ? d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() : d.getDate() + ' ' + u('monthsLong')[d.getMonth()] + ' ' + d.getFullYear();
  };
  var svg = function (name) { return '<svg class="i" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; };
  var ICON_FALLBACK = { gavel: 1, chart: 1, 'arrow-right': 1, calendar: 1, user: 1, newspaper: 1, 'map-pin': 1, 'chevron-up': 1, 'chevron-down': 1, external: 1, info: 1 };
  /* make sure icons used by rendered content exist even if the page did not include them */
  function ensureIcons() {
    var defs = $('svg defs');
    if (!defs) return;
    var paths = {
      gavel: '<path d="m14 13-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
      chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
      'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
      calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
      user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
      newspaper: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
      'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
      'chevron-up': '<path d="m18 15-6-6-6 6"/>', 'chevron-down': '<path d="m6 9 6 6 6-6"/>',
      external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
      info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    };
    Object.keys(ICON_FALLBACK).forEach(function (n) {
      if (!document.getElementById('i-' + n)) defs.insertAdjacentHTML('beforeend', '<symbol id="i-' + n + '" viewBox="0 0 24 24">' + paths[n] + '</symbol>');
    });
  }

  /* ---------------------------------------------------------------- data */
  var cache = {};
  function data(name) {
    if (!cache[name]) {
      cache[name] = fetch('data/' + name + '.json', { cache: 'no-cache' }).then(function (r) {
        if (!r.ok) throw new Error(name);
        return r.json();
      });
    }
    return cache[name];
  }
  var params = new URLSearchParams(location.search);

  /* ---------------------------------------------------------------- renderers */
  var R = {};

  R.ticker = function (el) {
    return data('settings').then(function (s) {
      var items = (s.prices || []).filter(function (p) { return L(p.crop); });
      if (!items.length) { el.closest('.ticker').hidden = true; return; }
      var one = '<span class="ticker-item"><span class="ticker-label">' + esc(L(s.ticker_label) || u('tickerLabel')) + '</span></span>' +
        items.map(function (p) {
          return '<span class="ticker-item"><b>' + esc(L(p.crop).toUpperCase()) + '</b>' +
            (has(p.high) ? '<span class="up">▲ ' + fmt(p.high) + '</span>' : '') +
            (has(p.low) ? '<span class="down">▼ ' + fmt(p.low) + '</span>' : '') + '</span>';
        }).join('');
      el.innerHTML = one + one;
    });
  };

  R.binds = function () {
    return data('settings').then(function (s) {
      var c = s.contact || {}, so = s.social || {};
      var phone = (c.phones || [])[0] || '';
      $$('[data-bind="email"]').forEach(function (e) { if (c.email) e.textContent = c.email; });
      $$('[data-bind="email-link"]').forEach(function (e) { if (c.email) e.href = 'mailto:' + c.email; });
      $$('[data-bind="phone"]').forEach(function (e) { if (phone) e.textContent = phone; });
      $$('[data-bind="phone-link"]').forEach(function (e) { if (phone) e.href = 'tel:' + phone.replace(/[^+\d]/g, ''); });
      $$('[data-bind="address"]').forEach(function (e) { if (L(c.address)) e.textContent = L(c.address); });
      ['instagram', 'facebook', 'whatsapp'].forEach(function (k) {
        $$('[data-bind="' + k + '"]').forEach(function (e) { if (safeUrl(so[k])) e.href = so[k]; else if (so[k] === '') e.hidden = true; });
      });
    });
  };

  R.facts = function (el) {
    return data('settings').then(function (s) {
      if (!s.stats || !s.stats.length) return;
      el.innerHTML = s.stats.slice(0, 4).map(function (f) {
        return '<div class="fact"><strong>' + esc(f.value) + '</strong><span>' + esc(L(f.label)) + '</span></div>';
      }).join('');
    });
  };

  function monthsStrip(months) {
    var now = new Date().getMonth() + 1;
    var on = (months || []).map(Number);
    return '<div class="months" aria-hidden="true">' + u('months').map(function (m, i) {
      var cls = (on.indexOf(i + 1) > -1 ? 'on' : '') + (now === i + 1 ? ' now' : '');
      return '<span class="' + cls.trim() + '"' + (now === i + 1 ? ' title="' + u('now') + '"' : '') + '>' + m.charAt(0) + '</span>';
    }).join('') + '</div>';
  }
  function monthsLabel(months) {
    var m = (months || []).map(Number).filter(Boolean);
    if (!m.length) return '';
    var names = u('monthsLong');
    return m.length === 1 ? names[m[0] - 1] : names[m[0] - 1] + ' – ' + names[m[m.length - 1] - 1];
  }
  function seasonStatus(months) {
    var m = (months || []).map(Number);
    if (!m.length) return '';
    var now = new Date().getMonth() + 1;
    if (m.indexOf(now) > -1) return '<span class="status">' + u('inSeason') + '</span>';
    return '<span class="status off">' + u('starts') + ' ' + u('months')[m[0] - 1] + '</span>';
  }

  R['season-board'] = function (el) {
    return data('seasons').then(function (s) {
      var main = (s.main || []).filter(function (c) { return L(c.name); });
      var other = (s.other || []).filter(function (c) { return L(c.name); });
      el.innerHTML = '<div class="board-head"><h2>' + esc(L(s.title) || u('seasonBoard')) + '</h2><span>' + esc(L(s.subtitle)) + '</span></div>' +
        main.map(function (c) {
          return '<div class="board-row"><div class="board-row-top">' +
            (c.image ? '<img class="board-thumb" src="' + esc(safeUrl(c.image)) + '" alt="" loading="lazy" width="46" height="46">' : '') +
            '<div><div class="board-name">' + esc(L(c.name)) + seasonStatus(c.months) + '</div><div class="board-months">' + esc(monthsLabel(c.months)) + '</div></div>' +
            '<div class="board-links"><a href="minada.html?zao=' + encodeURIComponent(c.id) + '">' + u('auctions') + '</a><a href="uzalishaji.html?zao=' + encodeURIComponent(c.id) + '">' + u('production') + '</a></div>' +
            '</div>' + monthsStrip(c.months) + '</div>';
        }).join('') +
        (other.length ? '<div class="board-other"><h3>' + u('otherCrops') + '</h3><div class="chips">' + other.map(function (c) {
          return '<span class="chip"><b>' + esc(L(c.name)) + '</b><small>' + esc(L(c.note) || monthsLabel(c.months)) + '</small></span>';
        }).join('') + '</div></div>' : '');
    });
  };

  R['crop-months'] = function (el) {
    return data('seasons').then(function (s) {
      var id = el.getAttribute('data-crop');
      var c = (s.main || []).concat(s.other || []).filter(function (x) { return x.id === id; })[0];
      if (!c) { el.closest('.panel').hidden = true; return; }
      el.innerHTML = '<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:4px"><strong style="color:var(--ink)">' + esc(L(c.note) || monthsLabel(c.months)) + '</strong>' + seasonStatus(c.months) + '</div>' + monthsStrip(c.months);
    });
  };

  /* ---- auctions ---- */
  function filledRows(rows) {
    return (rows || []).filter(function (r) { return has(r.date) || has(r.kg) || has(r.avg) || has(r.location); }).slice(0, 20);
  }
  function auctionSummary(rows) {
    var kg = 0, lots = 0, top = NaN, w = 0, wk = 0;
    rows.forEach(function (r) {
      var k = num(r.kg), a = num(r.avg), h = num(r.high), l = num(r.lots);
      if (!isNaN(k)) kg += k;
      if (!isNaN(l)) lots += l;
      if (!isNaN(h) && (isNaN(top) || h > top)) top = h;
      if (!isNaN(k) && !isNaN(a)) { w += k * a; wk += k; }
    });
    return { kg: kg, lots: lots, top: top, avg: wk ? w / wk : NaN };
  }
  function auctionTable(crop, season, rows, compact) {
    var head = '<tr><th>' + u('sn') + '</th><th>' + u('auction') + '</th><th>' + u('date') + '</th><th>' + u('place') + '</th>' +
      '<th class="r">' + u('kg') + '</th><th class="r">' + u('lots') + '</th><th class="r">' + u('high') + '</th><th class="r">' + u('low') + '</th><th class="r">' + u('avg') + '</th></tr>';
    var body = rows.map(function (r, i) {
      return '<tr><td>' + (i + 1) + '</td><td>' + (has(r.auction) ? u('auctionNo') + ' ' + esc(r.auction) : '—') + '</td><td>' + dateText(r.date, true) + '</td>' +
        '<td><strong>' + esc(r.location || '—') + '</strong>' + (r.host ? '<small>' + u('host') + ': ' + esc(r.host) + '</small>' : '') + '</td>' +
        '<td class="r">' + fmt(r.kg) + '</td><td class="r">' + fmt(r.lots) + '</td><td class="r hi">' + fmt(r.high) + '</td><td class="r lo">' + fmt(r.low) + '</td><td class="r avg">' + fmt(r.avg) + '</td></tr>';
    }).join('');
    var s = auctionSummary(rows);
    var foot = rows.length > 1 && !compact ? '<tfoot><tr><td></td><td colspan="3">' + u('total') + '</td><td class="r">' + fmt(s.kg) + '</td><td class="r">' + (s.lots ? fmt(s.lots) : '—') + '</td><td class="r">' + fmt(s.top) + '</td><td></td><td class="r">' + fmt(s.avg) + '</td></tr></tfoot>' : '';
    return '<div class="table-card"><div class="table-title">' + svg('gavel') + '<h3>' + esc(u('latestOf') + ' ' + L(crop.name)) + '</h3><span>' + esc(season.season || '') + '</span></div>' +
      '<div class="table-scroll"><table class="data"><thead>' + head + '</thead><tbody>' + body + '</tbody>' + foot + '</table></div></div>';
  }
  function summaryCards(rows) {
    var s = auctionSummary(rows);
    return '<div class="summary"><div><span>' + u('sumKg') + '</span><strong>' + fmt(s.kg) + '</strong></div><div><span>' + u('sumLots') + '</span><strong>' + (s.lots ? fmt(s.lots) : '—') + '</strong></div>' +
      '<div><span>' + u('topPrice') + '</span><strong>' + fmt(s.top) + '</strong></div><div><span>' + u('wavg') + '</span><strong>' + fmt(s.avg) + '</strong></div></div>';
  }
  function empty(text, icon) { return '<div class="table-card"><div class="empty">' + svg(icon || 'info') + '<p>' + esc(text) + '</p></div></div>'; }
  function tabs(crops, current, kind) {
    return '<div class="tabs" role="tablist">' + crops.map(function (c) {
      return '<button type="button" role="tab" data-crop="' + esc(c.id) + '" aria-selected="' + (c.id === current) + '">' +
        (c.image ? '<img src="' + esc(safeUrl(c.image)) + '" alt="" loading="lazy">' : '') + esc(L(c.name)) + '</button>';
    }).join('') + '</div>';
  }
  function latestSeason(crop) {
    var seasons = (crop.seasons || []).filter(function (s) { return filledRows(s.rows).length; });
    return seasons[0];
  }

  R['auction-latest'] = function (el) {
    return data('auctions').then(function (a) {
      var crops = a.crops || [];
      var crop = crops.filter(function (c) { return latestSeason(c); })[0];
      if (!crop) { el.innerHTML = empty(u('noAuctions'), 'gavel'); return; }
      var season = latestSeason(crop);
      var rows = filledRows(season.rows);
      el.innerHTML = summaryCards(rows) + auctionTable(crop, season, rows.slice(-5), true) +
        '<p class="note">' + u('prices') + '</p>';
    });
  };

  R['auctions-page'] = function (el) {
    return data('auctions').then(function (a) {
      var crops = (a.crops || []).filter(function (c) { return L(c.name); });
      var current = params.get('zao');
      if (!crops.some(function (c) { return c.id === current; })) current = crops[0] && crops[0].id;
      function draw() {
        var crop = crops.filter(function (c) { return c.id === current; })[0];
        var seasons = (crop && crop.seasons || []).filter(function (s) { return s.season; });
        var seasonName = params.get('msimu');
        var season = seasons.filter(function (s) { return s.season === seasonName; })[0] || latestSeason(crop || {}) || seasons[0];
        var rows = season ? filledRows(season.rows) : [];
        el.innerHTML = tabs(crops, current) +
          '<div class="toolbar"><h2 class="display" style="font-size:clamp(1.5rem,3vw,2rem)">' + esc(u('auctions') + ' — ' + L(crop && crop.name)) + '</h2>' +
          (seasons.length > 1 ? '<label><span class="sr-only">' + u('chooseSeason') + '</span><select class="select" data-season>' + seasons.map(function (s) {
            return '<option' + (season && s.season === season.season ? ' selected' : '') + '>' + esc(s.season) + '</option>';
          }).join('') + '</select></label>' : (season ? '<span class="tag tag-blue">' + esc(season.season) + '</span>' : '')) + '</div>' +
          (rows.length ? summaryCards(rows) + auctionTable(crop, season, rows) + '<p class="note">' + u('prices') + (L(a.note) ? ' ' + esc(L(a.note)) : '') + '</p>' : empty(u('noAuctions'), 'gavel'));
        $$('[data-crop]', el).forEach(function (b) {
          b.addEventListener('click', function () { current = b.getAttribute('data-crop'); params.delete('msimu'); params.set('zao', current); history.replaceState(null, '', '?' + params); draw(); });
        });
        var sel = $('[data-season]', el);
        if (sel) sel.addEventListener('change', function () { params.set('msimu', sel.value); history.replaceState(null, '', '?' + params); draw(); });
      }
      el._redraw = draw;
      draw();
    });
  };

  /* ---- production ---- */
  R['production-page'] = function (el) {
    return data('production').then(function (p) {
      var crops = (p.crops || []).filter(function (c) { return L(c.name); });
      var current = params.get('zao');
      if (!crops.some(function (c) { return c.id === current; })) current = crops[0] && crops[0].id;
      function draw() {
        var crop = crops.filter(function (c) { return c.id === current; })[0] || {};
        var rows = (crop.rows || []).filter(function (r) { return r.season && (has(r.kg) || has(r.avg_price)); });
        var tk = 0, tv = 0;
        var body = rows.map(function (r, i) {
          var kg = num(r.kg), price = num(r.avg_price), value = has(r.value) ? num(r.value) : kg * price;
          if (!isNaN(kg)) tk += kg;
          if (!isNaN(value)) tv += value;
          return '<tr><td>' + String(i + 1).padStart(2, '0') + '</td><td><strong>' + esc(r.season) + '</strong></td><td class="r">' + fmt(kg) + '</td><td class="r avg">' + fmt(price) + '</td><td class="r">' + fmt(value) + '</td></tr>';
        }).join('');
        var max = Math.max.apply(null, rows.map(function (r) { return num(r.kg) || 0; }).concat([1]));
        el.innerHTML = tabs(crops, current) +
          '<div class="toolbar"><h2 class="display" style="font-size:clamp(1.5rem,3vw,2rem)">' + esc(u('production') + ' — ' + L(crop.name)) + '</h2></div>' +
          (rows.length ? '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));align-items:start">' +
            '<div class="table-card"><div class="table-title">' + svg('chart') + '<h3>' + esc(L(p.title) || u('production')) + '</h3><span>' + esc(L(crop.name)) + '</span></div><div class="table-scroll"><table class="data"><thead><tr><th>' + u('sn') + '</th><th>' + u('season') + '</th><th class="r">' + u('weight') + '</th><th class="r">' + u('avgPrice') + '</th><th class="r">' + u('value') + '</th></tr></thead><tbody>' + body + '</tbody>' +
            (rows.length > 1 ? '<tfoot><tr><td></td><td>' + u('total') + '</td><td class="r">' + fmt(tk) + '</td><td class="r">' + (tk ? fmt(tv / tk) : '—') + '</td><td class="r">' + fmt(tv) + '</td></tr></tfoot>' : '') + '</table></div></div>' +
            '<div class="table-card"><div class="table-title">' + svg('chart') + '<h3>' + u('weightChart') + '</h3></div><div class="bars">' + rows.map(function (r) {
              var kg = num(r.kg) || 0;
              return '<div class="bar"><span>' + esc(r.season) + '</span><div class="bar-track"><div class="bar-fill" data-w="' + (kg / max * 100).toFixed(1) + '"></div></div><small>' + fmt(kg / 1e6, 1) + 'M</small></div>';
            }).join('') + '</div></div></div>' + (L(crop.note) ? '<p class="note">' + esc(L(crop.note)) + '</p>' : '')
            : empty(u('noProduction'), 'chart'));
        requestAnimationFrame(function () { $$('.bar-fill', el).forEach(function (b) { b.style.width = b.getAttribute('data-w') + '%'; }); });
        $$('[data-crop]', el).forEach(function (b) {
          b.addEventListener('click', function () { current = b.getAttribute('data-crop'); params.set('zao', current); history.replaceState(null, '', '?' + params); draw(); });
        });
      }
      el._redraw = draw;
      draw();
    });
  };

  /* ---- leaders ---- */
  function portrait(person, caption) {
    var img = safeUrl(person.photo);
    return '<figure class="portrait' + (img ? '' : ' portrait-empty') + '" style="margin:0">' +
      (img ? '<img src="' + esc(img) + '" alt="' + esc(person.name) + '" loading="lazy">' : svg('user')) +
      (caption ? '<figcaption><strong>' + esc(person.name) + '</strong><span>' + esc(L(person.title)) + '</span></figcaption>' : '') + '</figure>';
  }
  function messageBlock(person) {
    var paras = L(person.message).split(/\n\s*\n/).filter(Boolean).map(function (p) { return '<p>' + esc(p.trim()) + '</p>'; }).join('');
    return '<div class="message reveal in">' + portrait(person, true) +
      '<div><h3 style="font-size:1.5rem;margin-bottom:16px">' + esc(L(person.heading) || (u('msgFrom') + ' ' + L(person.title))) + '</h3><div class="quote">' + paras + '</div>' +
      '<div class="signature"><strong>' + esc(person.name) + '</strong><span>' + esc(L(person.title)) + ', TAMCU LTD</span></div></div></div>';
  }
  R['gm-message'] = function (el) {
    return data('leaders').then(function (d) { if (d.general_manager && d.general_manager.name) el.innerHTML = messageBlock(d.general_manager); else el.innerHTML = ''; });
  };
  R['chair-message'] = function (el) {
    return data('leaders').then(function (d) {
      el.innerHTML = d.chair && d.chair.name && L(d.chair.message) ? messageBlock(d.chair) : '';
    });
  };
  R.leaders = function (el) {
    return data('leaders').then(function (d) {
      var list = [d.chair, d.general_manager].filter(function (p) { return p && p.name; }).concat(d.team || []).filter(function (p) { return p && p.name; });
      el.innerHTML = list.map(function (p) {
        return '<div class="leader">' + portrait(p, false) + '<div class="leader-body"><strong>' + esc(p.name) + '</strong><span>' + esc(L(p.title)) + '</span></div></div>';
      }).join('');
    });
  };

  /* ---- partners ---- */
  R.partners = function (el) {
    return data('partners').then(function (d) {
      el.innerHTML = (d.items || []).filter(function (p) { return p.name; }).map(function (p) {
        var url = safeUrl(p.url), logo = safeUrl(p.logo);
        var initials = (p.short || p.name).split(/\s+/).map(function (w) { return w.charAt(0); }).join('').slice(0, 4).toUpperCase();
        var inner = (logo ? '<img src="' + esc(logo) + '" alt="" loading="lazy">' : '<span class="partner-mark">' + esc(p.short || initials) + '</span>') + '<span>' + esc(p.name) + '</span>';
        return url ? '<a class="partner" href="' + esc(url) + '" target="_blank" rel="noopener">' + inner + '</a>' : '<div class="partner">' + inner + '</div>';
      }).join('');
    });
  };

  /* ---- news ---- */
  function sortedNews(d) {
    return (d.items || []).filter(function (n) { return L(n.title) && n.published !== false; })
      .sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
  }
  R.news = function (el) {
    return data('news').then(function (d) {
      var items = sortedNews(d);
      var limit = parseInt(el.getAttribute('data-limit'), 10);
      if (limit) items = items.slice(0, limit);
      if (!items.length) { el.innerHTML = '<p>' + u('noNews') + '</p>'; return; }
      el.innerHTML = items.map(function (n) {
        var img = safeUrl(n.image) || 'assets/img/coverpage.webp';
        return '<a class="card" href="habari.html?id=' + encodeURIComponent(n.id) + '"><div class="card-media"><img src="' + esc(img) + '" alt="" loading="lazy" width="640" height="400"></div>' +
          '<div class="card-body"><div class="meta">' + (L(n.category) ? '<span class="tag tag-blue">' + esc(L(n.category)) + '</span>' : '') + '<span>' + svg('calendar') + dateText(n.date) + '</span></div>' +
          '<h3>' + esc(L(n.title)) + '</h3><p>' + esc(L(n.excerpt)) + '</p><span class="link-arrow">' + u('readMore') + svg('arrow-right') + '</span></div></a>';
      }).join('');
    });
  };
  R.article = function (el) {
    return data('news').then(function (d) {
      var id = params.get('id');
      var n = (d.items || []).filter(function (x) { return String(x.id) === id; })[0];
      if (!n) {
        el.innerHTML = '<div class="empty">' + svg('newspaper') + '<p>' + u('notFound') + '</p><a class="btn btn-primary" href="news.html">' + u('back') + '</a></div>';
        return;
      }
      document.title = L(n.title) + ' | TAMCU LTD';
      var meta = $('meta[name="description"]');
      if (meta) meta.setAttribute('content', L(n.excerpt));
      var img = safeUrl(n.image);
      el.innerHTML = '<nav class="crumbs" style="color:var(--muted)"><a href="news.html" style="color:var(--blue)">' + u('allNews') + '</a></nav>' +
        '<div class="meta" style="margin-bottom:12px">' + (L(n.category) ? '<span class="tag tag-blue">' + esc(L(n.category)) + '</span>' : '') + '<span>' + svg('calendar') + dateText(n.date) + '</span></div>' +
        '<h1 class="display" style="font-size:clamp(2rem,5vw,3.2rem);margin-bottom:24px">' + esc(L(n.title)) + '</h1>' +
        (img ? '<div class="article-cover"><img src="' + esc(img) + '" alt=""></div>' : '') +
        '<p class="lede">' + esc(L(n.excerpt)) + '</p><div class="article-body">' + esc(L(n.body)) + '</div>' +
        '<p style="margin-top:32px"><a class="link-arrow" href="news.html">' + u('back') + svg('arrow-right') + '</a></p>';
    });
  };

  /* ---- daily updates (1080 x 1350 posts with P1–P6 thumbnails) ---- */
  R.updates = function (el) {
    return data('updates').then(function (d) {
      var items = (d.items || []).filter(function (x) { return x.image || L(x.title); })
        .sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }).slice(0, 6);
      if (!items.length) { el.innerHTML = empty(u('updatesEmpty')); return; }
      var idx = Math.min(el._idx || 0, items.length - 1);
      function draw() {
        var x = items[idx];
        var link = safeUrl(x.link);
        el.innerHTML = '<div class="updates"><div class="update-image">' + (x.image ? '<img src="' + esc(safeUrl(x.image)) + '" alt="' + esc(L(x.title)) + '" width="1080" height="1350">' : '') + '</div>' +
          '<div class="update-text"><div class="meta"><span>' + svg('calendar') + dateText(x.date) + '</span></div><h3>' + esc(L(x.title)) + '</h3><div class="update-body">' + esc(L(x.body)) + '</div>' +
          (link ? '<a class="btn btn-primary btn-sm" style="align-self:flex-start" href="' + esc(link) + '"' + (/^https?:/.test(link) ? ' target="_blank" rel="noopener"' : '') + '>' + u('readMore') + svg('arrow-right') + '</a>' : '') +
          '<div class="thumbs" role="tablist">' + items.map(function (it, i) {
            return '<button type="button" role="tab" aria-current="' + (i === idx) + '" aria-label="' + esc(L(it.title) || ('P' + (i + 1))) + '" data-i="' + i + '">' +
              (it.image ? '<img src="' + esc(safeUrl(it.image)) + '" alt="" loading="lazy">' : '') + '<span>P' + (i + 1) + '</span></button>';
          }).join('') + '</div></div></div>';
        $$('[data-i]', el).forEach(function (b) { b.addEventListener('click', function () { idx = el._idx = +b.getAttribute('data-i'); draw(); }); });
      }
      draw();
    });
  };

  function renderAll() {
    var jobs = [R.binds()];
    $$('[data-render]').forEach(function (el) {
      var fn = R[el.getAttribute('data-render')];
      if (!fn) return;
      jobs.push(fn(el).catch(function () {
        if (el.querySelector('.skeleton')) el.innerHTML = '';
      }));
    });
    return Promise.all(jobs).catch(function () {}).then(observeReveal);
  }

  /* ---------------------------------------------------------------- UI behaviour */
  function drawer() {
    var d = $('#drawer'), btn = $('[data-drawer-open]');
    if (!d || !btn) return;
    function set(open) {
      document.body.classList.toggle('drawer-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open) { d.removeAttribute('inert'); $('.drawer-close', d).focus(); } else { d.setAttribute('inert', ''); }
    }
    btn.addEventListener('click', function () { set(true); });
    $$('[data-drawer-close]').forEach(function (b) { b.addEventListener('click', function () { set(false); btn.focus(); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) { set(false); btn.focus(); } });
  }

  function slideshow() {
    var box = $('[data-slideshow]');
    if (!box) return;
    var imgs = $$('img', box), dots = $('[data-slide-dots]'), i = 0, timer;
    if (imgs.length < 2) return;
    dots.innerHTML = imgs.map(function (_, n) { return '<button type="button" aria-label="Picha ' + (n + 1) + '"' + (n === 0 ? ' aria-current="true"' : '') + '></button>'; }).join('');
    var buttons = $$('button', dots);
    function show(n) {
      imgs[i].classList.remove('is-active'); buttons[i].removeAttribute('aria-current');
      i = (n + imgs.length) % imgs.length;
      imgs[i].loading = 'eager';
      imgs[i].classList.add('is-active'); buttons[i].setAttribute('aria-current', 'true');
    }
    function start() { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(function () { show(i + 1); }, 6000); }
    buttons.forEach(function (b, n) { b.addEventListener('click', function () { clearInterval(timer); show(n); start(); }); });
    // start cycling after the page has settled so the first image gets the bandwidth
    window.addEventListener('load', function () { setTimeout(start, 1500); });
  }

  var io;
  function observeReveal() {
    var els = $$('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    io = io || new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  function lazyVideo() {
    $$('video[data-lazy-video]').forEach(function (v) {
      function load() {
        $$('source[data-src]', v).forEach(function (s) { s.src = s.getAttribute('data-src'); s.removeAttribute('data-src'); });
        v.load();
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      }
      if (!('IntersectionObserver' in window)) return load();
      var o = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { o.disconnect(); load(); } }, { rootMargin: '200px' });
      o.observe(v);
    });
  }

  function contactForm() {
    var f = $('[data-contact-form]');
    if (!f) return;
    var ok = $('[data-form-ok]', f), err = $('[data-form-err]', f), btn = $('button[type="submit"]', f);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      ok.hidden = err.hidden = true;
      if (!f.checkValidity()) { err.hidden = false; f.reportValidity(); return; }
      btn.disabled = true;
      fetch('contact.php', { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.ok) throw j; }); })
        .then(function () { ok.hidden = false; f.reset(); })
        .catch(function () { err.hidden = false; })
        .then(function () { btn.disabled = false; });
    });
  }

  function portal() {
    var f = $('[data-portal-form]');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      $('[data-portal-login]').hidden = true;
      var m = $('[data-portal-msg]'); m.hidden = false; m.querySelector('a').focus();
    });
  }

  document.addEventListener('langchange', function () {
    if (!renderAll._done) return;
    $$('[data-render]').forEach(function (el) {
      if (el._redraw) el._redraw();
      else { var fn = R[el.getAttribute('data-render')]; if (fn) fn(el).catch(function () {}); }
    });
  });

  function init() {
    ensureIcons();
    $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
    drawer(); slideshow(); lazyVideo(); contactForm(); portal(); observeReveal();
    renderAll().then(function () { renderAll._done = true; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
