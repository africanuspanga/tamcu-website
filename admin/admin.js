/* TAMCU admin — schema-driven content editor. Builds DOM nodes directly (no HTML strings from data). */
(function () {
  'use strict';
  var A = window.ADMIN, S = window.SCHEMA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var MONTHS = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ago', 'Sep', 'Okt', 'Nov', 'Des'];
  var view = $('#view'), title = $('#title'), status = $('#status'), saveBtn = $('#save');
  var current = null, data = null, dirty = false;

  /* ---------- tiny DOM helper ---------- */
  function h(tag, attrs) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), v);
      else if (k === 'value') node.value = v;
      else if (k === 'checked') node.checked = !!v;
      else node.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      (Array.isArray(c) ? c : [c]).forEach(function (x) { if (x != null && x !== false) node.appendChild(typeof x === 'string' ? document.createTextNode(x) : x); });
    }
    return node;
  }

  /* ---------- API ---------- */
  function api(action, opts) {
    opts = opts || {};
    var q = Object.keys(opts.query || {}).map(function (k) { return '&' + k + '=' + encodeURIComponent(opts.query[k]); }).join('');
    var init = { method: opts.method || (opts.body || opts.form ? 'POST' : 'GET'), headers: { 'X-CSRF': A.csrf }, credentials: 'same-origin' };
    if (opts.body) { init.headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(opts.body); }
    if (opts.form) init.body = opts.form;
    return fetch('api.php?action=' + action + q, init).then(function (r) {
      return r.json().catch(function () { return { ok: false, error: 'Seva imerudisha jibu lisiloeleweka (' + r.status + ').' }; }).then(function (j) {
        if (r.status === 401 && j.login) { location.reload(); }
        if (!j.ok) throw new Error(j.error || 'Hitilafu');
        return j;
      });
    });
  }

  function setStatus(text, kind) {
    status.textContent = text || '';
    status.className = 'status' + (kind ? ' ' + kind : '');
  }
  function markDirty() {
    if (!dirty) { dirty = true; setStatus('Kuna mabadiliko hayajahifadhiwa', 'warn'); }
  }
  window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

  /* ---------- navigation ---------- */
  var nav = $('#nav');
  var routes = [{ name: '', title: 'Dashibodi', icon: '🏠' }].concat(S, [{ name: 'messages', title: 'Ujumbe (Contact)', icon: '✉️' }, { name: 'password', title: 'Nenosiri', icon: '🔑' }]);
  routes.forEach(function (r) {
    nav.appendChild(h('a', { href: '#' + r.name, 'data-route': r.name }, h('span', { 'aria-hidden': 'true' }, r.icon), r.title));
  });
  $('#menu').addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
  window.addEventListener('hashchange', route);

  function route() {
    var name = location.hash.slice(1);
    if (dirty && current !== name && !confirm('Una mabadiliko ambayo hayajahifadhiwa. Ukiondoka yatapotea. Endelea?')) {
      history.replaceState(null, '', '#' + (current || ''));
      return;
    }
    dirty = false; setStatus('');
    document.body.classList.remove('nav-open');
    Array.prototype.forEach.call(nav.children, function (a) { a.classList.toggle('active', a.getAttribute('data-route') === name); });
    current = name;
    saveBtn.hidden = true;
    var sec = S.filter(function (s) { return s.name === name; })[0];
    if (sec) return openSection(sec);
    if (name === 'messages') return messages();
    if (name === 'password') return password();
    return dashboard();
  }

  /* ---------- dashboard ---------- */
  function dashboard() {
    title.textContent = 'Dashibodi';
    view.replaceChildren(
      h('p', { class: 'lead' }, 'Karibu, ' + A.user + '. Chagua unachotaka kubadilisha. Mabadiliko yanaonekana kwenye tovuti mara tu unapobonyeza “Hifadhi mabadiliko”.'),
      h('div', { class: 'tiles' }, S.map(function (s) {
        return h('a', { class: 'tile', href: '#' + s.name }, h('span', { class: 'tile-icon', 'aria-hidden': 'true' }, s.icon), h('strong', { text: s.title }), h('span', { class: 'muted small', text: s.help }));
      }).concat([h('a', { class: 'tile', href: '#messages' }, h('span', { class: 'tile-icon', 'aria-hidden': 'true' }, '✉️'), h('strong', { text: 'Ujumbe kutoka tovutini' }), h('span', { class: 'muted small', text: 'Jumbe zilizotumwa kupitia fomu ya Wasiliana Nasi.' }))])),
      h('div', { class: 'card tips' },
        h('h2', { text: 'Vidokezo' }),
        h('ul', null,
          h('li', { text: 'Andika Kiswahili kwanza. Ukiacha Kiingereza wazi, tovuti itaonyesha Kiswahili kwa wanaotumia EN.' }),
          h('li', { text: 'Picha zinapunguzwa ukubwa zenyewe zinapopakiwa, ili tovuti iwe nyepesi.' }),
          h('li', { text: 'Kila unapohifadhi, nakala ya awali inahifadhiwa. Tumia “Matoleo ya awali” kurudisha.' })))
    );
  }

  /* ---------- section editor ---------- */
  function openSection(sec) {
    title.textContent = sec.title;
    view.replaceChildren(h('p', { class: 'muted', text: 'Inapakia…' }));
    api('get', { query: { name: sec.name } }).then(function (j) {
      data = j.data && typeof j.data === 'object' && !Array.isArray(j.data) ? j.data : {};
      var form = h('div', { class: 'form' });
      sec.fields.forEach(function (f) { form.appendChild(field(f, data)); });
      saveBtn.hidden = false;
      saveBtn.onclick = function () { save(sec); };
      view.replaceChildren(
        h('div', { class: 'section-top' }, h('p', { class: 'lead', text: sec.help }), h('button', { class: 'btn ghost', type: 'button', onclick: function () { history_(sec); } }, 'Matoleo ya awali')),
        form,
        h('div', { class: 'save-row' }, h('button', { class: 'btn primary', type: 'button', onclick: function () { save(sec); } }, 'Hifadhi mabadiliko'))
      );
    }).catch(function (e) { view.replaceChildren(h('div', { class: 'alert err', text: e.message })); });
  }

  function save(sec) {
    saveBtn.disabled = true;
    setStatus('Inahifadhi…');
    var clean = tidy(JSON.parse(JSON.stringify(data)), sec.fields);
    api('save', { query: { name: sec.name }, body: clean }).then(function (j) {
      dirty = false;
      setStatus('Imehifadhiwa saa ' + j.saved + ' ✓', 'ok');
    }).catch(function (e) { setStatus(e.message, 'err'); alert('Haikuhifadhiwa: ' + e.message); })
      .then(function () { saveBtn.disabled = false; });
  }

  /* drop empty table rows, order months, keep ids tidy */
  function tidy(obj, fields) {
    fields.forEach(function (f) {
      var v = obj[f.key];
      if (f.type === 'table' && Array.isArray(v)) {
        obj[f.key] = v.filter(function (row) {
          return Object.keys(row || {}).some(function (k) { var x = row[k]; return x && typeof x === 'object' ? (x.sw || x.en) : x !== '' && x != null; });
        });
      } else if (f.type === 'months' && Array.isArray(v)) {
        obj[f.key] = orderMonths(v);
      } else if (f.type === 'list' && Array.isArray(v)) {
        v.forEach(function (item) { tidy(item, f.fields); });
      } else if (f.type === 'group' && v) {
        tidy(v, f.fields);
      } else if (f.key === 'id' && typeof v === 'string') {
        obj.id = v.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
      }
    });
    return obj;
  }
  /* months that wrap the new year (Okt–Jan) start at the first month of the run */
  function orderMonths(list) {
    var set = {}; list.forEach(function (m) { set[+m] = true; });
    var on = Object.keys(set).map(Number).filter(function (m) { return m >= 1 && m <= 12; });
    if (on.length === 0 || on.length === 12) return on.sort(function (a, b) { return a - b; });
    var start = on.filter(function (m) { return !set[m === 1 ? 12 : m - 1]; }).sort(function (a, b) { return a - b; })[0];
    var out = [];
    for (var i = 0; i < 12; i++) { var m = ((start - 1 + i) % 12) + 1; if (set[m]) out.push(m); }
    return out;
  }

  function history_(sec) {
    api('backups', { query: { name: sec.name } }).then(function (j) {
      if (!j.items.length) { alert('Bado hakuna matoleo ya awali ya sehemu hii.'); return; }
      var dlg = h('dialog', { class: 'dialog' },
        h('h2', { text: 'Matoleo ya awali — ' + sec.title }),
        h('p', { class: 'muted small', text: 'Kurudisha toleo kunaweka maudhui hayo kwenye tovuti mara moja. Toleo la sasa linahifadhiwa kwanza.' }),
        h('ul', { class: 'backups' }, j.items.map(function (f) {
          var m = f.match(/-(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})/);
          var label = m ? m[3] + '/' + m[2] + '/' + m[1] + ' saa ' + m[4] + ':' + m[5] : f;
          return h('li', null, h('span', { text: label }), h('button', { class: 'btn ghost small', type: 'button', onclick: function () {
            if (!confirm('Rudisha toleo la ' + label + '?')) return;
            api('restore', { query: { file: f }, body: {} }).then(function () { dlg.close(); dirty = false; openSection(sec); setStatus('Toleo limerudishwa ✓', 'ok'); }).catch(function (e) { alert(e.message); });
          } }, 'Rudisha'));
        })),
        h('form', { method: 'dialog' }, h('button', { class: 'btn', text: 'Funga' })));
      document.body.appendChild(dlg);
      dlg.addEventListener('close', function () { dlg.remove(); });
      dlg.showModal();
    }).catch(function (e) { alert(e.message); });
  }

  /* ---------- field renderers ---------- */
  function label(f, child, extraClass) {
    return h('div', { class: 'field' + (f.half ? ' half' : '') + (extraClass ? ' ' + extraClass : '') }, h('label', { class: 'label', text: f.label }), child);
  }
  function lang2(obj, key) {
    if (!obj[key] || typeof obj[key] !== 'object') obj[key] = { sw: typeof obj[key] === 'string' ? obj[key] : '', en: '' };
    return obj[key];
  }

  function field(f, obj) {
    switch (f.type) {
      case 'text': case 'url': case 'date': case 'number':
        return label(f, input(f.type, obj, f.key));
      case 'textarea':
        return label(f, h('textarea', { class: 'input', rows: f.rows || 4, value: obj[f.key] || '', oninput: function (e) { obj[f.key] = e.target.value; markDirty(); } }));
      case 'bool':
        if (obj[f.key] == null) obj[f.key] = true;
        return h('label', { class: 'field half check' }, h('input', { type: 'checkbox', checked: obj[f.key], onchange: function (e) { obj[f.key] = e.target.checked; markDirty(); } }), f.label);
      case 'i18n': case 'i18n-area':
        var v = lang2(obj, f.key);
        var mk = function (lng, ph) {
          return f.type === 'i18n'
            ? h('input', { class: 'input', value: v[lng] || '', placeholder: ph, 'aria-label': f.label + ' (' + ph + ')', oninput: function (e) { v[lng] = e.target.value; markDirty(); } })
            : h('textarea', { class: 'input', rows: f.rows || 4, value: v[lng] || '', placeholder: ph, 'aria-label': f.label + ' (' + ph + ')', oninput: function (e) { v[lng] = e.target.value; markDirty(); } });
        };
        return label(f, h('div', { class: 'pair' }, h('div', null, h('span', { class: 'lang', text: 'SW' }), mk('sw', 'Kiswahili')), h('div', null, h('span', { class: 'lang', text: 'EN' }), mk('en', 'English'))));
      case 'image':
        return label(f, imageField(f, obj));
      case 'months':
        return label(f, monthsField(obj, f.key));
      case 'strings':
        return label(f, stringsField(obj, f.key));
      case 'group':
        if (!obj[f.key] || typeof obj[f.key] !== 'object') obj[f.key] = {};
        return h('fieldset', { class: 'group' }, h('legend', { text: f.label }), f.fields.map(function (c) { return field(c, obj[f.key]); }));
      case 'list':
        return listField(f, obj);
      case 'table':
        return label(f, tableField(f, obj), 'wide');
    }
    return h('div', { text: 'Unknown field ' + f.type });
  }

  function input(type, obj, key, extra) {
    var isNum = type === 'number';
    return h('input', Object.assign({
      class: 'input', type: isNum ? 'text' : type === 'url' ? 'text' : type, inputmode: isNum ? 'decimal' : null,
      value: obj[key] == null ? '' : String(obj[key]),
      oninput: function (e) {
        var val = e.target.value;
        if (isNum) {
          var n = val.replace(/[, ]/g, '');
          obj[key] = n === '' ? '' : (isNaN(+n) ? val : +n);
        } else obj[key] = val;
        markDirty();
      },
    }, extra || {}));
  }

  function imageField(f, obj) {
    var wrap = h('div', { class: 'image-field' });
    function draw() {
      var url = obj[f.key] || '';
      var file = h('input', { type: 'file', accept: 'image/jpeg,image/png,image/webp', hidden: true, onchange: function () {
        if (!file.files[0]) return;
        btn.disabled = true; btn.textContent = 'Inapakia…';
        shrink(file.files[0], f.max || 1600).then(function (blob) {
          var fd = new FormData(); fd.append('file', blob.file || blob, blob.name || 'picha.jpg');
          return api('upload', { form: fd, query: { max: f.max || 1600 } });
        }).then(function (j) { obj[f.key] = j.url; markDirty(); draw(); })
          .catch(function (e) { alert(e.message); btn.disabled = false; btn.textContent = 'Pakia picha'; });
      } });
      var btn = h('button', { class: 'btn ghost small', type: 'button', onclick: function () { file.click(); } }, url ? 'Badilisha picha' : 'Pakia picha');
      wrap.replaceChildren(
        h('div', { class: 'thumb', style: f.ratio ? 'aspect-ratio:' + f.ratio : '' }, url ? h('img', { src: '../' + url, alt: '' }) : h('span', { class: 'muted small', text: 'Hakuna picha' })),
        h('div', { class: 'image-actions' }, btn, file,
          url ? h('button', { class: 'btn ghost small danger', type: 'button', onclick: function () { obj[f.key] = ''; markDirty(); draw(); } }, 'Ondoa') : null,
          h('input', { class: 'input small', value: url, placeholder: 'au weka njia ya picha', 'aria-label': 'Njia ya picha', onchange: function (e) { obj[f.key] = e.target.value.trim(); markDirty(); draw(); } }))
      );
    }
    draw();
    return wrap;
  }

  /* Resize big photos in the browser before upload: phone photos are often 3–8 MB, while many hosts
     accept only 2 MB. Small files and images that cannot be decoded are sent unchanged. */
  function shrink(fileObj, maxPx) {
    var limit = Math.max(maxPx, 1200);
    return new Promise(function (resolve) {
      if (!/^image\/(jpeg|png|webp)$/.test(fileObj.type) || !window.createImageBitmap) return resolve({ file: fileObj, name: fileObj.name });
      createImageBitmap(fileObj, { imageOrientation: 'from-image' }).then(function (bmp) {
        var scale = Math.min(1, limit / Math.max(bmp.width, bmp.height));
        if (scale === 1 && fileObj.size < 1.5 * 1024 * 1024) return resolve({ file: fileObj, name: fileObj.name });
        var c = document.createElement('canvas');
        c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
        c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
        var keepAlpha = fileObj.type !== 'image/jpeg';
        c.toBlob(function (b) {
          if (b && b.type === 'image/webp') return resolve({ file: b, name: 'picha.webp' });
          // browser could not make WebP (older Safari): use PNG for logos, JPEG for photos
          c.toBlob(function (b2) { resolve(b2 ? { file: b2, name: keepAlpha ? 'picha.png' : 'picha.jpg' } : { file: fileObj, name: fileObj.name }); }, keepAlpha ? 'image/png' : 'image/jpeg', 0.85);
        }, 'image/webp', 0.85);
      }).catch(function () { resolve({ file: fileObj, name: fileObj.name }); });
    });
  }

  function monthsField(obj, key) {
    if (!Array.isArray(obj[key])) obj[key] = [];
    return h('div', { class: 'months' }, MONTHS.map(function (m, i) {
      var b = h('button', { type: 'button', class: 'month', 'aria-pressed': String(obj[key].indexOf(i + 1) > -1), text: m, onclick: function () {
        var at = obj[key].indexOf(i + 1);
        if (at > -1) obj[key].splice(at, 1); else obj[key].push(i + 1);
        obj[key] = orderMonths(obj[key]);
        b.setAttribute('aria-pressed', String(obj[key].indexOf(i + 1) > -1));
        markDirty();
      } });
      return b;
    }));
  }

  function stringsField(obj, key) {
    if (!Array.isArray(obj[key])) obj[key] = [];
    var box = h('div', { class: 'strings' });
    function draw() {
      box.replaceChildren(obj[key].map(function (s, i) {
        return h('div', { class: 'row' }, input('text', obj[key], i), h('button', { class: 'btn ghost small danger', type: 'button', 'aria-label': 'Ondoa', onclick: function () { obj[key].splice(i, 1); markDirty(); draw(); } }, '✕'));
      }), h('button', { class: 'btn ghost small', type: 'button', onclick: function () { obj[key].push(''); markDirty(); draw(); } }, '+ Ongeza'));
    }
    draw();
    return box;
  }

  function itemTitle(f, item, i) {
    var v = item[f.titleFrom];
    var text = v && typeof v === 'object' ? (v.sw || v.en) : v;
    var extra = item.date ? ' · ' + item.date : '';
    return (text || f.item + ' ' + (i + 1)) + extra;
  }

  function listField(f, obj) {
    if (!Array.isArray(obj[f.key])) obj[f.key] = [];
    var arr = obj[f.key];
    var box = h('div', { class: 'list' });
    var open = {};
    function draw() {
      var items = arr.map(function (item, i) {
        var d = h('details', { class: 'item', open: open[i] ? true : null, ontoggle: function () { open[i] = d.open; } },
          h('summary', null, h('span', { class: 'item-title', text: itemTitle(f, item, i) }),
            h('span', { class: 'item-actions' },
              h('button', { type: 'button', class: 'icon-btn', title: 'Panda juu', 'aria-label': 'Panda juu', disabled: i === 0, onclick: function (e) { e.preventDefault(); move(i, -1); } }, '↑'),
              h('button', { type: 'button', class: 'icon-btn', title: 'Shuka chini', 'aria-label': 'Shuka chini', disabled: i === arr.length - 1, onclick: function (e) { e.preventDefault(); move(i, 1); } }, '↓'),
              h('button', { type: 'button', class: 'icon-btn danger', title: 'Futa', 'aria-label': 'Futa', onclick: function (e) {
                e.preventDefault();
                if (!confirm('Futa "' + itemTitle(f, item, i) + '"?')) return;
                arr.splice(i, 1); open = {}; markDirty(); draw();
              } }, '🗑'))),
          h('div', { class: 'item-body' }, f.fields.map(function (c) {
            var node = field(c, item);
            if (c.key === f.titleFrom) node.addEventListener('input', function () { $('.item-title', d).textContent = itemTitle(f, item, i); });
            return node;
          })));
        return d;
      });
      var full = f.max && arr.length >= f.max;
      box.replaceChildren(
        h('div', { class: 'list-head' }, h('h2', { text: f.label }), h('span', { class: 'muted small', text: arr.length + (f.max ? ' / ' + f.max : '') })),
        items.length ? h('div', { class: 'items' }, items) : h('p', { class: 'muted small', text: 'Bado hakuna. Bonyeza “Ongeza” kuanza.' }),
        h('button', { class: 'btn ghost', type: 'button', disabled: full, onclick: function () {
          var fresh = typeof f.add === 'function' ? f.add() : JSON.parse(JSON.stringify(f.add || {}));
          if (f.newFirst) { arr.unshift(fresh); open = { 0: true }; } else { arr.push(fresh); open = {}; open[arr.length - 1] = true; }
          markDirty(); draw();
        } }, '+ Ongeza ' + f.item.toLowerCase()));
    }
    function move(i, dir) {
      var j = i + dir; if (j < 0 || j >= arr.length) return;
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t; open = {}; markDirty(); draw();
    }
    draw();
    return box;
  }

  function tableField(f, obj) {
    if (!Array.isArray(obj[f.key])) obj[f.key] = [];
    var rows = obj[f.key];
    while (rows.length < f.rows) rows.push({});
    if (rows.length > f.rows) rows.length = f.rows;
    var table = h('table', { class: 'grid' },
      h('thead', null, h('tr', null, h('th', { text: 'Na.' }), f.columns.map(function (c) { return h('th', { style: 'min-width:' + c.w + 'px', text: c.label }); }))),
      h('tbody', null, rows.map(function (row, i) {
        return h('tr', null, h('td', { class: 'n', text: String(i + 1) }), f.columns.map(function (c) {
          if (c.type === 'i18n-cell') {
            var v = lang2(row, c.key);
            return h('td', null, h('input', { class: 'cell', value: v.sw || '', placeholder: 'SW', 'aria-label': c.label + ' SW ' + (i + 1), oninput: function (e) { v.sw = e.target.value; markDirty(); } }),
              h('input', { class: 'cell', value: v.en || '', placeholder: 'EN', 'aria-label': c.label + ' EN ' + (i + 1), oninput: function (e) { v.en = e.target.value; markDirty(); } }));
          }
          return h('td', null, input(c.type, row, c.key, { class: 'cell' + (c.type === 'number' ? ' num' : ''), 'aria-label': c.label + ' ' + (i + 1) }));
        }));
      })));
    return h('div', null, h('div', { class: 'grid-scroll' }, table), h('p', { class: 'muted small', text: 'Mistari ' + f.rows + ' ipo tayari. Jaza unayohitaji tu — mistari mitupu haionekani kwenye tovuti.' }));
  }

  /* ---------- messages ---------- */
  function messages() {
    title.textContent = 'Ujumbe kutoka tovutini';
    view.replaceChildren(h('p', { class: 'muted', text: 'Inapakia…' }));
    api('messages').then(function (j) {
      if (!j.items.length) { view.replaceChildren(h('div', { class: 'card' }, h('p', { text: 'Bado hakuna ujumbe. Jumbe zinazotumwa kupitia ukurasa wa Wasiliana Nasi zitaonekana hapa.' }))); return; }
      view.replaceChildren(h('div', { class: 'messages' }, j.items.map(function (m) {
        var card = h('article', { class: 'card msg' },
          h('header', null, h('strong', { text: m.name || '—' }), h('span', { class: 'muted small', text: (m.date || '').replace('T', ' ').slice(0, 16) })),
          h('div', { class: 'muted small' }, (m.subject ? m.subject + ' · ' : '') + (m.email || '') + (m.phone ? ' · ' + m.phone : '')),
          h('p', { class: 'msg-body', text: m.message || '' }),
          h('div', { class: 'row' },
            m.email ? h('a', { class: 'btn ghost small', href: 'mailto:' + m.email + '?subject=' + encodeURIComponent('Re: ' + (m.subject || 'TAMCU')) }, 'Jibu kwa barua pepe') : null,
            h('button', { class: 'btn ghost small danger', type: 'button', onclick: function () {
              if (!confirm('Futa ujumbe huu?')) return;
              api('delete_message', { query: { id: m.id }, body: {} }).then(function () { card.remove(); }).catch(function (e) { alert(e.message); });
            } }, 'Futa')));
        return card;
      })));
    }).catch(function (e) { view.replaceChildren(h('div', { class: 'alert err', text: e.message })); });
  }

  /* ---------- password ---------- */
  function password() {
    title.textContent = 'Badilisha nenosiri';
    var cur = h('input', { class: 'input', type: 'password', autocomplete: 'current-password', required: true });
    var nw = h('input', { class: 'input', type: 'password', autocomplete: 'new-password', required: true, minlength: 10 });
    var nw2 = h('input', { class: 'input', type: 'password', autocomplete: 'new-password', required: true });
    var msg = h('div', { role: 'status' });
    view.replaceChildren(h('form', { class: 'card narrow', onsubmit: function (e) {
      e.preventDefault();
      if (nw.value !== nw2.value) { msg.className = 'alert err'; msg.textContent = 'Manenosiri mapya hayafanani.'; return; }
      api('password', { body: { current: cur.value, new: nw.value } }).then(function () {
        msg.className = 'alert ok'; msg.textContent = 'Nenosiri limebadilishwa.'; e.target.reset();
      }).catch(function (err) { msg.className = 'alert err'; msg.textContent = err.message; });
    } },
      h('label', { class: 'label' }, 'Nenosiri la sasa', cur),
      h('label', { class: 'label' }, 'Nenosiri jipya (herufi 10+)', nw),
      h('label', { class: 'label' }, 'Rudia nenosiri jipya', nw2),
      msg,
      h('button', { class: 'btn primary', type: 'submit' }, 'Badilisha nenosiri')));
  }

  route();
})();
