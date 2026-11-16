// Shared helpers for the static page build.
import { icon, sprite } from './icons.mjs';

export const SITE = 'https://www.tamcu.co.tz';
export const EN = {};

/** Bilingual inline text. Swahili is written into the page, English goes to the dictionary. */
export function t(key, sw, en) {
  register(key, en);
  return `<span data-i18n="${key}">${sw}</span>`;
}
/** Bilingual attribute, e.g. ta('placeholder', 'form_name_ph', 'Andika jina', 'Your name') */
export function ta(attr, key, sw, en) {
  register(key, en);
  return `${attr}="${esc(sw)}" data-i18n-${attr}="${key}"`;
}
function register(key, en) {
  if (key in EN && EN[key] !== en) throw new Error(`i18n key "${key}" has two English texts`);
  EN[key] = en;
}
export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const NAV = [
  ['index.html', 'nav_home', 'Nyumbani', 'Home'],
  ['about.html', 'nav_about', 'Kuhusu Sisi', 'About Us'],
  ['services.html', 'nav_services', 'Miradi', 'Services'],
  ['products.html', 'nav_products', 'Mazao', 'Crops'],
  ['minada.html', 'nav_auctions', 'Minada', 'Auctions'],
  ['investment.html', 'nav_investment', 'Uwekezaji', 'Investment'],
  ['news.html', 'nav_news', 'Habari', 'News'],
];

function langSwitch() {
  return `<div class="lang" role="group" aria-label="Lugha / Language">
    <button type="button" data-lang="sw" aria-pressed="true">SW</button>
    <button type="button" data-lang="en" aria-pressed="false">EN</button>
  </div>`;
}

function header(active) {
  const links = NAV.map(([href, k, sw, en]) =>
    `<a href="${href}"${href === active ? ' aria-current="page"' : ''}>${t(k, sw, en)}</a>`).join('');
  const drawerLinks = [...NAV, ['uzalishaji.html', 'nav_production', 'Uzalishaji', 'Production'], ['contact.html', 'nav_contact', 'Wasiliana Nasi', 'Contact Us']]
    .map(([href, k, sw, en]) => `<a href="${href}"${href === active ? ' aria-current="page"' : ''}>${t(k, sw, en)}${icon('chevron-right')}</a>`).join('');
  return `
<a class="skip-link" href="#main">${t('skip', 'Ruka hadi maudhui', 'Skip to content')}</a>
<div class="topbar">
  <div class="wrap">
    <div class="ticker" aria-label="Bei za mazao">
      <div class="ticker-track" data-render="ticker"></div>
    </div>
    <div class="topbar-links">
      <a href="mailto:info@tamcu.co.tz" data-bind="email-link">${icon('mail')}<span data-bind="email">info@tamcu.co.tz</span></a>
      <a href="staff-portal.html">${icon('lock')}${t('nav_staff', 'Staff Portal', 'Staff Portal')}</a>
    </div>
  </div>
</div>
<header class="header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="TAMCU LTD — Nyumbani">
      <img src="assets/img/logo-192.webp" width="48" height="48" alt="">
      <span><span class="brand-name">TAMCU LTD</span><span class="brand-sub">Tunduru Agricultural Marketing Co-operative Union</span></span>
    </a>
    <nav class="nav" aria-label="Main">${links}</nav>
    <div class="header-actions">
      ${langSwitch()}
      <a class="btn btn-cashew btn-sm btn-contact" href="contact.html">${t('nav_contact', 'Wasiliana Nasi', 'Contact Us')}</a>
      <button class="menu-btn" type="button" data-drawer-open aria-controls="drawer" aria-expanded="false" ${ta('aria-label', 'menu_open', 'Fungua menyu', 'Open menu')}>${icon('menu')}</button>
    </div>
  </div>
</header>
<div class="drawer-backdrop" data-drawer-close></div>
<aside class="drawer" id="drawer" aria-label="Menu" inert>
  <div class="drawer-head">
    <strong>TAMCU LTD</strong>
    <button class="drawer-close" type="button" data-drawer-close ${ta('aria-label', 'menu_close', 'Funga menyu', 'Close menu')}>${icon('x')}</button>
  </div>
  <nav>${drawerLinks}</nav>
  <div class="drawer-foot">
    ${langSwitch()}
    <a class="btn btn-outline" href="staff-portal.html">${icon('lock')}${t('nav_staff', 'Staff Portal', 'Staff Portal')}</a>
  </div>
</aside>`;
}

function footer() {
  return `
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="brand" href="index.html"><img src="assets/img/logo-192.webp" width="48" height="48" alt="" loading="lazy"><span><span class="brand-name">TAMCU LTD</span><span class="brand-sub">Tunduru Agricultural Marketing Co-operative Union</span></span></a>
        <p>${t('footer_about', 'Chama Kikuu cha Ushirika cha Masoko ya Mazao ya Kilimo Tunduru, tangu 1994. Uzalendo na uwajibikaji.', 'The Tunduru agricultural marketing co-operative union, serving farmers since 1994. Patriotism and accountability.')}</p>
        <div class="socials">
          <a href="https://www.instagram.com/tamcultd" data-bind="instagram" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
          <a href="https://www.facebook.com/share/17rt69TDyn/" data-bind="facebook" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
          <a href="https://whatsapp.com/channel/0029VbCT6PNBfxo3zGT9mG3m" data-bind="whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
        </div>
      </div>
      <div>
        <h4>${t('footer_links', 'Viungo vya Haraka', 'Quick links')}</h4>
        <ul>
          <li><a href="about.html">${t('nav_about', 'Kuhusu Sisi', 'About Us')}</a></li>
          <li><a href="about.html#uongozi">${t('nav_leadership', 'Utawala na Uongozi', 'Leadership')}</a></li>
          <li><a href="minada.html">${t('footer_auctions', 'Matokeo ya Minada', 'Auction results')}</a></li>
          <li><a href="uzalishaji.html">${t('footer_production', 'Takwimu za Uzalishaji', 'Production figures')}</a></li>
          <li><a href="news.html">${t('nav_news', 'Habari', 'News')}</a></li>
          <li><a href="staff-portal.html">${t('nav_staff', 'Staff Portal', 'Staff Portal')}</a></li>
        </ul>
      </div>
      <div>
        <h4>${t('footer_services', 'Huduma Zetu', 'Our services')}</h4>
        <ul>
          <li><a href="services.html#saccos">SACCOS</a></li>
          <li><a href="services.html#usafirishaji">${t('svc_transport', 'Usafirishaji', 'Transport')}</a></li>
          <li><a href="services.html#pembejeo">${t('svc_store', 'Duka la Pembejeo', 'Farm inputs shop')}</a></li>
          <li><a href="investment.html#hisa">${t('inv_shares', 'Ununuzi wa Hisa', 'Buying shares')}</a></li>
          <li><a href="investment.html#ghala">${t('inv_warehouse', 'Huduma za Ghala', 'Warehouse services')}</a></li>
        </ul>
      </div>
      <div>
        <h4>${t('footer_contact', 'Mawasiliano', 'Contact')}</h4>
        <ul class="footer-contact">
          <li>${icon('map-pin')}<span data-bind="address">Tunduru, Ruvuma, Tanzania</span></li>
          <li>${icon('mail')}<a href="mailto:info@tamcu.co.tz" data-bind="email-link"><span data-bind="email">info@tamcu.co.tz</span></a></li>
          <li>${icon('phone')}<a href="tel:+255753799001" data-bind="phone-link"><span data-bind="phone">+255 753 799 001</span></a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> TAMCU LTD. ${t('footer_rights', 'Haki zote zimehifadhiwa.', 'All rights reserved.')}</span>
      <nav>
        <a href="privacy-policy.html">${t('footer_privacy', 'Sera ya Faragha', 'Privacy policy')}</a>
        <a href="terms-of-use.html">${t('footer_terms', 'Masharti ya Matumizi', 'Terms of use')}</a>
        <a href="sitemap.xml">Sitemap</a>
      </nav>
    </div>
  </div>
</footer>`;
}

/**
 * Wrap a page body in the full document.
 * page = { file, title:[sw,en], desc:[sw,en], body, image?, noindex?, jsonld?, bare? }
 */
export function layout(page) {
  const url = page.file === 'index.html' ? `${SITE}/` : `${SITE}/${page.file}`;
  const titleKey = 'title_' + page.file.replace('.html', '').replace(/-/g, '_');
  const descKey = 'desc_' + page.file.replace('.html', '').replace(/-/g, '_');
  register(titleKey, page.title[1]);
  register(descKey, page.desc[1]);
  const image = `${SITE}/${page.image || 'assets/img/og-cover.jpg'}`;
  const top = page.bare ? '' : header(page.file);
  const bottom = page.bare ? '' : footer();
  const body = page.body; // build body first so its icons are registered
  const html = `<!DOCTYPE html>
<html lang="sw" class="no-js">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title data-i18n-title="${titleKey}">${esc(page.title[0])}</title>
<meta name="description" content="${esc(page.desc[0])}" data-i18n-content="${descKey}">
<meta name="robots" content="${page.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="sw" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta name="theme-color" content="#0d2250">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/img/logo-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="assets/img/logo-192.png">
<link rel="manifest" href="site.webmanifest">
<meta property="og:site_name" content="TAMCU LTD">
<meta property="og:locale" content="sw_TZ">
<meta property="og:locale:alternate" content="en_GB">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:title" content="${esc(page.title[0])}">
<meta property="og:description" content="${esc(page.desc[0])}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title[0])}">
<meta name="twitter:description" content="${esc(page.desc[0])}">
<meta name="twitter:image" content="${image}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,600..800&amp;family=Public+Sans:wght@400;600;700;800&amp;display=swap">
<link rel="stylesheet" href="assets/css/site.css?v=${page.version}">
${page.preload || ''}
<script>document.documentElement.classList.remove('no-js');</script>
${(page.jsonld || []).map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>
${top}
<main id="main">
${body}
</main>
${bottom}
<script src="assets/js/i18n.js?v=${page.version}" defer></script>
<script src="assets/js/site.js?v=${page.version}" defer></script>
</body>
</html>
`;
  // sprite goes right after <body>, built last so it contains every icon used on the page
  return html.replace(/<body([^>]*)>\n/, (m) => m + sprite() + '\n');
}

export { icon };
