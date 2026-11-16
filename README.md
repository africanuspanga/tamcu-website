# TAMCU LTD website

Website of TAMCU LTD (Tunduru Agricultural Marketing Co-operative Union), www.tamcu.co.tz.
Static HTML pages with a small PHP admin panel. Hosted on the union's Apache/cPanel hosting.

## How it fits together

| Part | Where | Notes |
|---|---|---|
| Pages | `*.html` (root) | **Generated** — edit `tools/pages-*.mjs`, then run the build. |
| Editable content | `data/*.json` | Auctions, production, season calendar, news, daily updates, leaders, partners, contacts. Written by the admin panel. |
| Admin panel | `admin/` | PHP 7.3+. Signs in with one admin account, edits `data/*.json`, uploads photos to `uploads/`. |
| Contact form | `contact.php` | Saves messages for the admin inbox and emails the address set in the admin. |
| Styles / scripts | `assets/css/site.css`, `assets/js/site.js` | `assets/js/i18n.js` is generated (Swahili/English). |
| Images | `assets/img/` | Optimised WebP. Originals in `assets/images/` are not used by the pages. |

Swahili is the default language; English text comes from the build dictionary (static text) and from the
`en` fields in the data files (editable content). An empty English field falls back to Swahili.

## Build

```bash
node tools/build.mjs
```

Regenerates every page, `assets/js/i18n.js`, `sitemap.xml` and `robots.txt`. Needs Node 18+, no packages.

## Deploying to cPanel

Upload these to `public_html/`:

```
*.html  contact.php  .htaccess  robots.txt  sitemap.xml  site.webmanifest
assets/  data/  admin/  uploads/
```

Do **not** upload `tools/`, `images/`, `css/`, `js/`, `pages/`, `design-system/` or `.git`.

On the server, the first time only:

1. Copy `admin/config.sample.php` to `admin/config.php` and set `SETUP_KEY` to a long random value.
2. Make sure `data/`, `uploads/` and `admin/private/` are writable (permissions 755).
3. Open `https://www.tamcu.co.tz/admin/`, enter the setup key, and create the admin username and password.

**When re-deploying, do not overwrite `data/`, `uploads/` or `admin/private/` on the server** — they hold
everything the owner has entered through the admin panel.

## Admin panel

`/admin/` — sections: Minada, Uzalishaji, Mtiririko wa Msimu, Taarifa za Kila Siku, Habari, Uongozi,
Wadau, Mipangilio, Ujumbe (contact messages) and Nenosiri.

- Auction tables have 20 rows per season; empty rows are hidden on the site.
- Every save keeps a backup; "Matoleo ya awali" restores an earlier version.
- Uploaded photos are resized (and converted to WebP when the server has GD).
- Six failed sign-ins from one address block that address for 15 minutes.

## Staff Portal

`staff-portal.html` shows a sign-in form; pressing "Ingia" shows "Under construction". Replace this page when
the staff system is ready.

## Image credits (Wikimedia Commons)

- Raw cashew drying — Imran Lapong/AusAID, CC BY 2.0
- Raw cashew nuts — Omar Hoftun, CC BY-SA 4.0
- Whole pigeon peas — Adoscam, CC BY-SA 4.0
- Chickpeas — Danielrosehill, CC BY 4.0

Partner logos belong to their organisations.
