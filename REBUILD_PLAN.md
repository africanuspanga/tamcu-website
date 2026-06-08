# TAMCU LTD Website Rebuild Plan

## Current State Assessment

**Verdict:** Legacy static site (XHTML 1.0, jQuery 2010, TemplateMo template, fixed 960px width, non-responsive, broken ASP links, borrowed school CSS). The site does NOT represent the credibility of a 31-year-old agricultural cooperative union with 42 member cooperatives.

---

## Assets Inventory (What We Can Reuse)

### Brand Assets ✅
| Asset | File | Quality | Usage |
|-------|------|---------|-------|
| **TAMCU Logo** | `logo.png` (400x400) | Excellent | Main brand mark, favicon, navbar |
| **Cover Banner** | `CoverPage.png` (1260x400) | Good | Can be recreated as modern hero bg |

### Photography ✅
| Asset | File | Subject | Usage |
|-------|------|---------|-------|
| Cashews | `slideshow/3.jpg` (4650x3211) | High-res cashew nuts | Hero / Products |
| Cashews 2 | `slideshow/5.jpg` (5760x3840) | High-res cashew background | Hero / Products |
| Sesame | `slideshow/4.jpg` (4800x2700) | Sesame seeds | Products section |
| Pigeon Peas | `slideshow/6.png` (390x256) | Mbaazi / split peas | Products section |
| Staff Photo | `gallery/stafs.png` (960x250) | Team with green caps | About / Team section |
| Group Photo | `gallery/IMG_0414.heic` | Unknown (HEIC) | Potentially usable |

### Icons & UI Elements ⚠️
- `double-up-24.png`, `double-down.png` — price arrows (reuseable)
- `icons8-verify-12.png` — checkmarks (replace with SVG)
- `Previous.png`, `Forward.png` — carousel arrows (replace with SVG)
- All other icons8 assets — low quality, replace with Heroicons/Lucide

---

## Design System (Generated via ui-ux-pro-max)

### Pattern: Trust & Authority + Minimal
**Best for:** Agricultural cooperatives, financial services, enterprise — builds member trust and institutional credibility.

### Color Palette
| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#0F172A` | Headings, navbar, footer |
| Secondary | `#334155` | Subheadings, borders |
| Accent/CTA | `#0369A1` | Buttons, links, highlights |
| Background | `#F8FAFC` | Page background |
| Surface | `#FFFFFF` | Cards, sections |
| Text | `#020617` | Body text |
| Success | `#16A34A` | Price increases, positive stats |
| Danger | `#DC2626` | Price decreases |

### Typography
- **Headings:** Poppins (600/700) — modern, friendly authority
- **Body:** Open Sans (400/500/600) — readable, professional
- **Scale:** Hero 48px → H2 36px → H3 24px → Body 16px → Small 14px

### Effects
- Smooth scroll behavior
- Card hover lift (translateY -4px + shadow)
- Button hover (brightness + scale)
- Section fade-in on scroll (intersection observer)
- Price ticker smooth CSS animation

---

## Proposed Site Architecture

```
├── Home (index.html)
│   ├── Announcement Bar (price ticker)
│   ├── Navbar (sticky, responsive, logo-centered)
│   ├── Hero (full-width, slideshow of crops + tagline)
│   ├── About TAMCU (mission, vision, history)
│   ├── Our Crops (3 cards: Korosho, Ufuta, Mbaazi)
│   ├── Statistics (members, cooperatives, years)
│   ├── Our Services (SACCOS, Transport, Input Shop)
│   ├── News / Updates
│   └── Footer (contact, partners, copyright)
│
├── About Us (about.html)
│   ├── Hero
│   ├── Full history & registration
│   ├── Organizational structure
│   └── Staff / Leadership
│
├── Services (services.html)
│   ├── SACCOS
│   ├── Usafirishaji (Transport)
│   ├── Duka la Pembejeo (Inputs)
│   └── Kampuni
│
├── Products (products.html)
│   ├── Korosho (Cashew)
│   ├── Ufuta (Sesame)
│   └── Mbaazi (Pigeon Peas)
│
├── Investment (investment.html)
│   ├── Ununuzi wa Hisa (Share purchase)
│   └── Ghala (Warehousing)
│
├── Contact (contact.html)
│   ├── Contact form
│   ├── Location map
│   └── Social links
│
└── News (news.html)
    └── Updates & announcements
```

---

## Page-by-Page Breakdown

### 1. HOME PAGE

#### Announcement Bar
- Dark navy bar (`#0F172A`)
- White text, smooth horizontal scroll animation
- "Bei za Mazao Msimu Uliopita: KOROSHO ▲ 2500 ▼ 1900, MBAAZI ▲ 1000 ▼ 1500, UFUTA ▲ 3500 ▼ 2500"
- Replace PNG arrows with inline SVG

#### Navbar
- Transparent → solid on scroll
- Logo left (circular, 48px height)
- Nav links: NYUMBANI | KUHUSU SISI | MIRADI | MAZAO | UWEKEZAJI | HABARI | WASILIANA NASI
- Mobile: hamburger menu with slide-in drawer
- CTA button: "Wasiliana Nasi" (accent color)

#### Hero Section
- Full viewport height (100vh)
- Background: Crossfade slideshow of existing crop images (3.jpg, 4.jpg, 5.jpg, 6.png)
- Overlay: gradient from left (dark) to right (transparent)
- Text left-aligned:
  - Tagline: "Tunduru Agricultural Marketing Co-operative Union"
  - H1: "Kuimarisha Ushirika, Kuongeza Tija"
  - Subtitle: "Chama Kikuu cha Ushirika cha Masoko ya Mazao ya Kilimo Tunduru tangu 1994"
  - CTA buttons: "Jifunze Zaidi" (primary) + "Wasiliana Nasi" (outline)
- Dots indicator at bottom

#### About Section
- White background
- Two-column layout (text left, logo right)
- "Chama Kikuu Cha Ushirika (TAMCU LTD)"
- Truncated text with "Soma Zaidi" toggle (existing content, modernized)
- Logo watermark effect behind text

#### Statistics Bar
- Accent blue background (`#0369A1`)
- 4 stats with animated counters:
  - **1994** — Mwaka wa Kuanzishwa
  - **42** — Vyama vya Ushirika vya Msingi
  - **13** — Vyama vya Msingi vya Tunduru
  - **3** — Aina za Mazao

#### Our Crops Section
- Light gray background (`#F8FAFC`)
- 3 cards in a row (responsive: 1 col mobile, 3 col desktop)
- Each card:
  - Crop image (existing slideshow photos)
  - Crop name: KOROSHO / UFUTA / MBAAZI
  - Short description
  - "Soma Zaidi" link
- Card hover: lift + shadow

#### Services Section
- White background
- 3-column grid
- SACCOS, USAFIRISHAJI, DUKA LA PEMBEJEO
- Icon + title + description

#### News Section
- 2-3 latest news cards
- "Habari Zote" link

#### Footer
- Dark navy (`#0F172A`)
- 4 columns:
  1. Logo + short description
  2. Quick links
  3. Services
  4. Contact info + social icons
- Bottom bar: "Copyright © 2026 TAMCU LTD" + partner logos text

---

### 2. ABOUT US PAGE
- Hero banner (smaller, ~40vh)
- Full history text (expandable sections)
- Mission (Dira) + Vision (Dhima) cards
- Staff photo (`gallery/stafs.png`) with caption
- Organizational regions map/list

### 3. PRODUCTS PAGE
- Hero
- 3 product detail sections with large images
- Price information (reuse ticker data)
- Market info

### 4. SERVICES PAGE
- Hero
- Service cards (SACCOS, Transport, Input Shop, Kampuni)
- Details for each

### 5. INVESTMENT PAGE
- Hero
- Share purchase info
- Warehouse (Ghala) info

### 6. CONTACT PAGE
- Hero
- Contact form (name, email, phone, message)
- Address, phone, email
- Social media links (Instagram, etc.)
- Embedded map placeholder

### 7. NEWS PAGE
- News listing
- Individual news cards

---

## Technical Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Markup** | HTML5 | Modern semantic elements |
| **Styling** | Tailwind CSS (CDN) | Rapid development, responsive, consistent |
| **Fonts** | Google Fonts (Poppins + Open Sans) | Professional, fast CDN |
| **Icons** | Lucide Icons (CDN) | Clean SVG icons, consistent |
| **Animation** | CSS animations + Intersection Observer | Lightweight, no jQuery |
| **Slideshow** | Custom vanilla JS | Lightweight, no dependencies |
| **Responsive** | Tailwind breakpoints | Mobile-first, proven |

---

## Implementation Order

1. **Phase 1: Foundation**
   - Create new `index.html` with HTML5 boilerplate
   - Set up Tailwind CSS CDN
   - Set up Google Fonts
   - Set up Lucide Icons
   - Create global CSS variables / Tailwind config

2. **Phase 2: Home Page**
   - Navbar component
   - Hero slideshow (reuse existing images)
   - About section
   - Statistics bar
   - Crops section
   - Services preview
   - News preview
   - Footer

3. **Phase 3: Inner Pages**
   - About Us
   - Products
   - Services
   - Investment
   - Contact
   - News

4. **Phase 4: Polish**
   - Responsive testing (mobile, tablet, desktop)
   - Image optimization (compress existing JPGs)
   - Accessibility check (contrast, alt text, focus states)
   - Performance (lazy loading images)
   - SEO meta tags

---

## What Gets Deleted

| Old | Reason |
|-----|--------|
| `css/jquery.lightbox-0.5.css` | Unused, outdated |
| `css/nivo-slider.css` | Unused, outdated |
| `css/templatemo_style.css` | Replaced by Tailwind |
| `js/jquery.*` (all) | jQuery dependency eliminated |
| `js/jquery.nivo.slider.js` | Replaced by vanilla JS |
| `js/st.franciscoSecSchool/*` | Borrowed school CSS, irrelevant |
| `js/st.franciscoSecSchoolOther/*` | Ancient DHTML menu system |
| `pages/about.html` (old) | TemplateMo boilerplate |
| `pages/blog.html` | TemplateMo boilerplate |
| `pages/contact.html` (old) | TemplateMo boilerplate |
| `pages/portfolio.html` | TemplateMo boilerplate |
| `pages/oh test.html` | Junk file |
| `images/Forex Trading Analysis Background.jpg` | Irrelevant stock photo |
| `images/templatemo_header.jpg` | Old template asset |
| `images/xml_node_repeat.gif` | Old template asset |
| `images/stimage.gif` | Old template asset |
| `images/pngtree-*.png` | Irrelevant stock |
| `images/test.png`, `testHii.png` | Test files |

---

## Anti-Patterns We Will AVOID

- ❌ No emojis as icons (SVG only)
- ❌ No fixed-width 960px containers
- ❌ No inline styles
- ❌ No jQuery
- ❌ No borrowed CSS from unrelated projects
- ❌ No broken ASP links
- ❌ No XHTML 1.0 Transitional
- ❌ No inline JS event handlers
- ❌ No unreadable tiny fonts (minimum 16px body)
- ❌ No horizontal scroll on mobile

---

## File Structure (After Rebuild)

```
css/
├── index.html              (new home page)
├── about.html              (new about page)
├── services.html           (new services page)
├── products.html           (new products page)
├── investment.html         (new investment page)
├── contact.html            (new contact page)
├── news.html               (new news page)
│
├── assets/
│   ├── css/
│   │   └── main.css        (minimal custom styles)
│   ├── js/
│   │   ├── hero-slider.js
│   │   ├── navbar-scroll.js
│   │   ├── stats-counter.js
│   │   └── mobile-menu.js
│   └── images/
│       ├── logo.png
│       ├── logo-white.png  (generate from existing)
│       ├── CoverPage.png
│       ├── slideshow/
│       │   ├── korosho.jpg    (was 3.jpg)
│       │   ├── ufuta.jpg      (was 4.jpg)
│       │   ├── korosho-2.jpg  (was 5.jpg)
│       │   └── mbaazi.png     (was 6.png)
│       ├── gallery/
│       │   ├── stafs.png
│       │   └── ...
│       └── icons/
│           └── ... (SVG icons inline)
│
└── REBUILD_PLAN.md
```

---

## Time Estimate

| Phase | Pages | Complexity | Est. Time |
|-------|-------|-----------|-----------|
| Foundation | — | Low | 30 min |
| Home Page | 1 | High | 2–3 hrs |
| Inner Pages | 6 | Medium | 3–4 hrs |
| Polish | — | Medium | 1–2 hrs |
| **Total** | **7 pages** | | **6–10 hrs** |

---

## Deliverables

- [ ] 7 fully responsive HTML pages
- [ ] Modern navbar with mobile hamburger menu
- [ ] Full-viewport hero with auto-slideshow
- [ ] Animated statistics counters
- [ ] Expandable read-more sections
- [ ] Smooth scroll navigation
- [ ] Price ticker announcement bar
- [ ] Contact form with validation
- [ ] All existing images properly sized and optimized
- [ ] No external dependencies beyond Tailwind CDN + Google Fonts
- [ ] Accessible (WCAG AA minimum)
- [ ] Mobile-first responsive (375px → 1440px)
