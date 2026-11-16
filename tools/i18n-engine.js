/* TAMCU LTD — language switch (Swahili default, English from dictionary). */
(function () {
  'use strict';
  var KEY = 'tamcu-lang';
  var D = window.TAMCU_EN || {};
  function load() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked */ } }

  function swap(el, key, attr, lang) {
    if (!(key in D)) return;
    var store = 'data-sw-' + (attr || 'html');
    if (!el.hasAttribute(store)) el.setAttribute(store, attr ? (el.getAttribute(attr) || '') : el.innerHTML);
    var value = lang === 'en' ? D[key] : el.getAttribute(store);
    if (attr) el.setAttribute(attr, value); else el.innerHTML = value;
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { swap(el, el.getAttribute('data-i18n'), null, lang); });
    ['placeholder', 'aria-label', 'content', 'title'].forEach(function (attr) {
      document.querySelectorAll('[data-i18n-' + attr + ']').forEach(function (el) { swap(el, el.getAttribute('data-i18n-' + attr), attr, lang); });
    });
    var title = document.querySelector('title[data-i18n-title]');
    if (title) {
      if (!title.hasAttribute('data-sw')) title.setAttribute('data-sw', document.title);
      var k = title.getAttribute('data-i18n-title');
      document.title = lang === 'en' && D[k] ? D[k] : title.getAttribute('data-sw');
    }
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    window.TAMCU_LANG = lang;
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  window.setLanguage = function (lang) {
    if (lang !== 'sw' && lang !== 'en') return;
    save(lang);
    apply(lang);
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-lang]');
    if (b) window.setLanguage(b.getAttribute('data-lang'));
  });
  window.TAMCU_LANG = load() === 'en' ? 'en' : 'sw';
  if (window.TAMCU_LANG === 'en') apply('en');
})();
