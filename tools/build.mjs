// Builds the static pages, the language file, sitemap.xml and robots.txt.
// Run with: node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { layout, EN, SITE, esc } from './lib.mjs';
import { home, about, products, minada, uzalishaji } from './pages-main.mjs';
import { services, investment, news, article, contact, staff, notFound, legal } from './pages-other.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const VERSION = Date.now().toString(36);

/* Legal pages: reuse the approved wording from the previous site, both languages. */
function legacyDict() {
  const src = fs.readFileSync(path.join(ROOT, 'tools/legacy/i18n-old.js'), 'utf8');
  const start = src.indexOf('const DICT = {');
  const end = src.indexOf('\n  };', start);
  return vm.runInNewContext('(' + src.slice(start + 'const DICT = '.length, end + 4) + ')');
}
function legacyProse(file) {
  const html = fs.readFileSync(path.join(ROOT, 'tools/legacy', file), 'utf8');
  const start = html.indexOf('<div class="prose');
  const open = html.indexOf('>', start) + 1;
  const close = html.indexOf('\n    </div>\n  </div>\n</section>', open);
  return html.slice(open, close)
    .replace(/\sclass="[^"]*"/g, '')
    .replace(/\sdata-i18n-html/g, '')
    .replace(/tamcultd@gmail\.com/g, 'info@tamcu.co.tz');
}
const OLD = legacyDict();
function legalPage(file, legacyFile, sw, en) {
  const prose = legacyProse(legacyFile);
  for (const key of prose.matchAll(/data-i18n="([^"]+)"/g)) {
    if (OLD[key[1]]) EN[key[1]] = OLD[key[1]].replace(/tamcultd@gmail\.com/g, 'info@tamcu.co.tz');
  }
  return legal(file, sw, en, prose);
}

// Each page is built right before its layout so its icon sprite holds exactly the icons it uses.
const builders = [
  home, about, products, minada, uzalishaji, services, investment, news, article, contact, staff, notFound,
  () => legalPage('privacy-policy.html', 'privacy-old.html', 'Sera ya Faragha', 'Privacy Policy'),
  () => legalPage('terms-of-use.html', 'terms-old.html', 'Masharti ya Matumizi', 'Terms of Use'),
];
const pages = [];

for (const build of builders) {
  const p = build();
  pages.push(p);
  p.version = VERSION;
  let html = layout(p);
  if (p.base) html = html.replace('<head>\n', '<head>\n<base href="/">\n');
  fs.writeFileSync(path.join(ROOT, p.file), html);
}

// Language file = dictionary + engine
const engine = fs.readFileSync(path.join(ROOT, 'tools/i18n-engine.js'), 'utf8');
fs.writeFileSync(path.join(ROOT, 'assets/js/i18n.js'), `window.TAMCU_EN=${JSON.stringify(EN)};\n${engine}`);

// Sitemap + robots
const today = new Date().toISOString().slice(0, 10);
const priority = { 'index.html': '1.0', 'minada.html': '0.9', 'uzalishaji.html': '0.8', 'products.html': '0.8', 'about.html': '0.8', 'news.html': '0.7', 'contact.html': '0.7' };
const indexable = pages.filter((p) => !p.noindex && p.file !== 'habari.html');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url>
    <loc>${esc(p.file === 'index.html' ? SITE + '/' : SITE + '/' + p.file)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${['index.html', 'minada.html', 'news.html'].includes(p.file) ? 'daily' : 'monthly'}</changefreq>
    <priority>${priority[p.file] || '0.5'}</priority>
  </url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /staff-portal.html
Disallow: /tools/

Sitemap: ${SITE}/sitemap.xml
`);
console.log(`Built ${pages.length} pages, ${Object.keys(EN).length} English strings, version ${VERSION}`);
