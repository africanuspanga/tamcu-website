# TAMCU Website

Static website for TAMCU LTD, the Tunduru Agricultural Marketing Co-operative Union.

## Pages

- `index.html`
- `about.html`
- `products.html`
- `services.html`
- `investment.html`
- `contact.html`
- `news.html`
- `privacy-policy.html`
- `terms-of-use.html`

## Bilingual Support

The site supports Swahili and English through `assets/js/i18n.js`.

- Swahili is the default language.
- The language choice is saved in `localStorage` under `tamcu-lang`.
- Translatable HTML uses `data-i18n`, `data-i18n-placeholder`, and `data-i18n-aria`.
- The language switcher is available in both the desktop navbar and mobile drawer.

## Local Preview

Run a simple static server from the project root:

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765/index.html
```

