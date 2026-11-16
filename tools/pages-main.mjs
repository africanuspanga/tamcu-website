import { t, ta, icon, SITE } from './lib.mjs';

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#org`,
  name: 'TAMCU LTD',
  legalName: 'Tunduru Agricultural Marketing Co-operative Union Ltd',
  alternateName: ['TAMCU', 'Chama Kikuu cha Ushirika Tunduru'],
  url: `${SITE}/`,
  logo: `${SITE}/assets/img/logo-512.png`,
  foundingDate: '1994-03-14',
  email: 'info@tamcu.co.tz',
  address: { '@type': 'PostalAddress', addressLocality: 'Tunduru', addressRegion: 'Ruvuma', addressCountry: 'TZ' },
  areaServed: ['Tunduru', 'Namtumbo', 'Songea', 'Nyasa', 'Mbinga', 'Madaba', 'Ludewa', 'Kyela'],
  sameAs: ['https://www.instagram.com/tamcultd', 'https://www.facebook.com/share/17rt69TDyn/', 'https://whatsapp.com/channel/0029VbCT6PNBfxo3zGT9mG3m'],
};

export function pageHero(eyebrow, h1, lede, img, crumbs = []) {
  return `
<section class="page-hero">
  ${img ? `<img class="bg" src="${img}" alt="" fetchpriority="high">` : ''}
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">${t('nav_home', 'Nyumbani', 'Home')}</a>${crumbs.map((c) => `${icon('chevron-right')}<span>${c}</span>`).join('')}</nav>
    <p class="eyebrow" style="color:var(--cashew)">${eyebrow}</p>
    <h1 class="display">${h1}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ''}
  </div>
</section>`;
}

/* The seven crops shown across the site. Images live in assets/img. */
export const CROPS = [
  { id: 'korosho', img: 'korosho-ghafi', sw: 'Korosho', en: 'Cashew', tagSw: 'Zao kuu la biashara', tagEn: 'Main cash crop', tag: '',
    dSw: 'Korosho ghafi za Tunduru zinauzwa kupitia minada ya ushirika kwa ubora unaotambulika kimataifa.', dEn: 'Raw cashew nuts from Tunduru, sold through co-operative auctions and known worldwide for their quality.' },
  { id: 'ufuta', img: 'ufuta', sw: 'Ufuta', en: 'Sesame', tagSw: 'Zao maarufu', tagEn: 'Popular crop', tag: 'tag-green',
    dSw: 'Ufuta wenye rangi na mafuta yanayovutia masoko ya Asia na Ulaya.', dEn: 'Sesame whose colour and oil content attract buyers in Asia and Europe.' },
  { id: 'mbaazi', img: 'mbaazi-nzima', sw: 'Mbaazi', en: 'Pigeon peas', tagSw: 'Chakula na biashara', tagEn: 'Food and cash crop', tag: 'tag-blue',
    dSw: 'Mbaazi nzima zilizokaushwa, chanzo cha protini na kipato kwa kaya za Tunduru.', dEn: 'Whole dried pigeon peas, a source of protein and income for Tunduru households.' },
  { id: 'karanga', img: 'karanga', sw: 'Karanga', en: 'Groundnuts', tagSw: 'Zao la mafuta', tagEn: 'Oilseed', tag: '',
    dSw: 'Karanga zenye mafuta mengi kwa viwanda vya mafuta na soko la ndani.', dEn: 'Oil-rich groundnuts for oil mills and the local market.' },
  { id: 'choroko', img: 'choroko', sw: 'Choroko', en: 'Green grams', tagSw: 'Zao la chakula', tagEn: 'Food crop', tag: 'tag-green',
    dSw: 'Choroko lenye protini nyingi, linalouzwa ndani na nje ya nchi.', dEn: 'Protein-rich green grams (mung beans) sold at home and abroad.' },
  { id: 'dengu', img: 'dengu', sw: 'Dengu', en: 'Chickpeas', tagSw: 'Zao la chakula', tagEn: 'Food crop', tag: 'tag-green',
    dSw: 'Dengu linalostawi msimu wa kiangazi na kuongeza kipato cha mkulima.', dEn: 'Chickpeas grown in the dry season to add to farmers’ income.' },
  { id: 'kunde', img: 'kunde', sw: 'Kunde', en: 'Cowpeas', tagSw: 'Zao la chakula', tagEn: 'Food crop', tag: 'tag-green',
    dSw: 'Kunde, zao la chakula la kila siku kwa jamii za Tunduru.', dEn: 'Cowpeas, an everyday food crop for Tunduru communities.' },
];

function cropCard(c, href) {
  return `<a class="crop reveal" href="${href}">
    <img src="assets/img/${c.img}.webp" alt="${c.sw} (${c.en})" loading="lazy" width="640" height="800">
    <div class="crop-body">
      <span class="tag ${c.tag}">${t('crop_tag_' + c.id, c.tagSw, c.tagEn)}</span>
      <h3>${t('crop_' + c.id, c.sw, c.en)}</h3>
      <p>${t('crop_desc_' + c.id, c.dSw, c.dEn)}</p>
    </div>
  </a>`;
}

/* ------------------------------------------------------------------ HOME */
export function home() {
  const slides = ['korosho-ghafi', 'ufuta', 'mbaazi-nzima', 'karanga', 'choroko'];
  const body = `
<section class="hero">
  <div class="hero-media" data-slideshow>
    ${slides.map((s, i) => `<img src="assets/img/${s}.webp" alt="" ${i === 0 ? 'class="is-active" fetchpriority="high"' : 'loading="lazy"'} width="1920" height="1280">`).join('\n    ')}
  </div>
  <div class="wrap hero-inner">
    <div>
      <span class="hero-kicker">Tunduru Agricultural Marketing Co-operative Union</span>
      <h1 class="display">${t('hero_title', 'Linda Ushirika,<br><em>chagua uadilifu</em>', 'Protect the co-operative,<br><em>choose integrity</em>')}</h1>
      <p class="hero-text">${t('hero_text', 'Chama Kikuu cha Ushirika cha masoko ya mazao ya kilimo Tunduru tangu 1994. Tunauza korosho, ufuta, mbaazi na mazao mengine ya wakulima kupitia minada ya wazi.', 'The Tunduru agricultural marketing co-operative union since 1994. We sell farmers’ cashew, sesame, pigeon peas and other crops through open auctions.')}</p>
      <div class="hero-actions">
        <a class="btn btn-cashew" href="minada.html">${icon('gavel')}${t('hero_cta_auctions', 'Matokeo ya Minada', 'Auction results')}</a>
        <a class="btn btn-ghost" href="about.html">${t('btn_about', 'Kuhusu TAMCU', 'About TAMCU')}${icon('arrow-right')}</a>
      </div>
      <div class="hero-caption"><div class="hero-dots" data-slide-dots></div></div>
    </div>
    <div class="board" data-render="season-board" aria-live="polite">
      <div class="board-head"><h2>${t('board_title', 'Mtiririko wa Msimu', 'Season calendar')}</h2></div>
      <div class="skeleton" style="margin:16px;min-height:260px"></div>
    </div>
  </div>
</section>

<section class="facts" aria-label="TAMCU kwa takwimu">
  <div class="wrap" data-render="facts">
    <div class="fact"><strong>1994</strong><span>${t('fact_founded', 'Mwaka wa kuanzishwa', 'Year founded')}</span></div>
    <div class="fact"><strong>49</strong><span>${t('fact_amcos', 'Vyama vya Msingi (AMCOs)', 'Primary societies (AMCOs)')}</span></div>
    <div class="fact"><strong>44</strong><span>${t('fact_members', 'Vyama wanachama', 'Member societies')}</span></div>
    <div class="fact"><strong>8</strong><span>${t('fact_districts', 'Wilaya tunazohudumia', 'Districts served')}</span></div>
  </div>
</section>

<section class="section section-white">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">${t('nav_about', 'Kuhusu Sisi', 'About Us')}</p>
      <h2 class="display">${t('home_about_title', 'Sauti ya wakulima wa Tunduru', 'The voice of Tunduru’s farmers')}</h2>
      <p class="lede" style="margin-top:16px">${t('home_about_p1', 'TAMCU LTD kilianzishwa tarehe 14.03.1994 chini ya Sheria ya Vyama vya Ushirika (Sura ya 211, toleo rekebu la 2023) na kupewa namba ya usajili AFF-RVM-TUN-DC-2023-27.', 'TAMCU LTD was founded on 14 March 1994 under the Co-operative Societies Act (Cap. 211, revised 2023) and holds registration number AFF-RVM-TUN-DC-2023-27.')}</p>
      <p>${t('home_about_p2', 'Tunaunganisha vyama vya msingi 49 kutoka wilaya nane, tunasimamia minada ya mazao, na kuhakikisha mkulima analipwa kwa wakati.', 'We bring together 49 primary societies from eight districts, run crop auctions and make sure farmers are paid on time.')}</p>
      <ul class="ticks" style="margin:20px 0 28px">
        <li>${icon('shield')}<span>${t('home_about_li1', 'Minada ya wazi kupitia TMX na mfumo wa stakabadhi za ghala', 'Open auctions through TMX and the warehouse receipt system')}</span></li>
        <li>${icon('shield')}<span>${t('home_about_li2', 'Pembejeo za kilimo kwa wakati kwa wanachama', 'Timely farm inputs for members')}</span></li>
        <li>${icon('shield')}<span>${t('home_about_li3', 'Ushauri wa masoko na bei kwa wakulima', 'Market and price advice for farmers')}</span></li>
      </ul>
      <a class="link-arrow" href="about.html">${t('btn_more_about', 'Soma historia yetu', 'Read our story')}${icon('arrow-right')}</a>
    </div>
    <div class="reveal">
      <div class="video">
        <video data-lazy-video muted playsinline loop controls preload="none" poster="assets/img/tamcu-video-poster.webp" aria-label="TAMCU LTD video">
          <source data-src="assets/videos/tamcu-intro-web.mp4" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${t('home_lead_eyebrow', 'Ujumbe wa Uongozi', 'A word from our leadership')}</p>
        <h2 class="display">${t('home_lead_title', 'Neno kutoka kwa Meneja Mkuu', 'From the General Manager')}</h2>
      </div>
      <a class="link-arrow" href="about.html#uongozi">${t('btn_all_leaders', 'Viongozi wote', 'All leaders')}${icon('arrow-right')}</a>
    </div>
    <div data-render="gm-message"><div class="skeleton" style="min-height:320px"></div></div>
  </div>
</section>

<section class="section section-white">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${t('nav_auctions', 'Minada', 'Auctions')}</p>
        <h2 class="display">${t('home_auction_title', 'Matokeo ya minada ya karibuni', 'Latest auction results')}</h2>
      </div>
      <a class="btn btn-primary" href="minada.html">${icon('gavel')}${t('btn_all_auctions', 'Minada yote', 'All auctions')}</a>
    </div>
    <div data-render="auction-latest"><div class="skeleton" style="min-height:280px"></div></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${t('crops_eyebrow', 'Mazao Yetu', 'Our crops')}</p>
        <h2 class="display">${t('crops_title', 'Mazao tunayoyauza', 'The crops we market')}</h2>
        <p class="lede">${t('crops_lede', 'Tunakusanya, kusimamia na kutafuta masoko ya mazao haya kutoka Tunduru na mikoa jirani.', 'We collect, manage and find markets for these crops from Tunduru and neighbouring regions.')}</p>
      </div>
      <a class="link-arrow" href="products.html">${t('btn_all_crops', 'Mazao yote', 'All crops')}${icon('arrow-right')}</a>
    </div>
    <div class="grid grid-4">${CROPS.slice(0, 4).map((c) => cropCard(c, `products.html#${c.id}`)).join('')}</div>
  </div>
</section>

<section class="section section-white" id="taarifa">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${t('updates_eyebrow', 'Kila siku', 'Every day')}</p>
        <h2 class="display">${t('updates_title', 'Taarifa za kila siku', 'Daily updates')}</h2>
        <p class="lede">${t('updates_lede', 'Picha na taarifa fupi za matukio ya chama.', 'Photos and short notices from around the union.')}</p>
      </div>
      <a class="link-arrow" href="https://www.instagram.com/tamcultd" data-bind="instagram" target="_blank" rel="noopener">${icon('instagram')}${t('btn_instagram', 'Tufuate Instagram', 'Follow us on Instagram')}</a>
    </div>
    <div data-render="updates"><div class="skeleton" style="min-height:420px"></div></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${t('news_eyebrow', 'Habari na Matukio', 'News and events')}</p>
        <h2 class="display">${t('news_title', 'Taarifa mpya', 'Latest news')}</h2>
      </div>
      <a class="link-arrow" href="news.html">${t('btn_all_news', 'Habari zote', 'All news')}${icon('arrow-right')}</a>
    </div>
    <div class="grid grid-3" data-render="news" data-limit="3"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>
  </div>
</section>

<section class="section section-white">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${t('footer_services', 'Huduma Zetu', 'Our services')}</p>
        <h2 class="display">${t('svc_title', 'Huduma kwa wanachama', 'Services for members')}</h2>
      </div>
      <a class="link-arrow" href="services.html">${t('btn_all_services', 'Huduma zote', 'All services')}${icon('arrow-right')}</a>
    </div>
    <div class="grid grid-3">
      <div class="service reveal"><div class="service-icon">${icon('landmark')}</div><h3>SACCOS</h3><p>${t('svc_saccos_short', 'Akiba na mikopo kwa riba nafuu kwa wanachama.', 'Savings and low-interest loans for members.')}</p><a class="link-arrow" href="services.html#saccos">${t('btn_more', 'Soma zaidi', 'Read more')}${icon('arrow-right')}</a></div>
      <div class="service reveal"><div class="service-icon">${icon('truck')}</div><h3>${t('svc_transport', 'Usafirishaji', 'Transport')}</h3><p>${t('svc_transport_short', 'Kusafirisha mazao kutoka maghala hadi bandari na viwanda.', 'Moving crops from warehouses to ports and processors.')}</p><a class="link-arrow" href="services.html#usafirishaji">${t('btn_more', 'Soma zaidi', 'Read more')}${icon('arrow-right')}</a></div>
      <div class="service reveal"><div class="service-icon">${icon('basket')}</div><h3>${t('svc_store', 'Duka la Pembejeo', 'Farm inputs shop')}</h3><p>${t('svc_store_short', 'Mbolea, mbegu bora na viuatilifu kwa bei nafuu.', 'Fertiliser, improved seed and crop protection at fair prices.')}</p><a class="link-arrow" href="services.html#pembejeo">${t('btn_more', 'Soma zaidi', 'Read more')}${icon('arrow-right')}</a></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${t('partners_eyebrow', 'Wadau Wetu', 'Our stakeholders')}</p>
        <h2 class="display">${t('partners_title', 'Tunashirikiana na', 'We work with')}</h2>
      </div>
    </div>
    <div class="partners" data-render="partners"></div>
  </div>
</section>

<section class="cta">
  <div class="wrap">
    <div>
      <h2 class="display">${t('cta_title', 'Jiunge na ushirika', 'Join the co-operative')}</h2>
      <p>${t('cta_text', 'Una swali kuhusu uanachama, minada au huduma zetu? Tuandikie au tupigie simu.', 'Questions about membership, auctions or our services? Write to us or give us a call.')}</p>
    </div>
    <a class="btn btn-cashew" href="contact.html">${t('nav_contact', 'Wasiliana Nasi', 'Contact Us')}${icon('arrow-right')}</a>
  </div>
</section>`;
  return {
    file: 'index.html',
    title: ['TAMCU LTD | Chama Kikuu cha Ushirika Tunduru — Korosho, Ufuta, Mbaazi', 'TAMCU LTD | Tunduru Agricultural Marketing Co-operative Union'],
    desc: ['TAMCU LTD ni Chama Kikuu cha Ushirika cha Masoko ya Mazao ya Kilimo Tunduru, Ruvuma tangu 1994. Matokeo ya minada ya korosho, ufuta na mbaazi, takwimu za uzalishaji na habari za chama.', 'TAMCU LTD is the Tunduru agricultural marketing co-operative union in Ruvuma, Tanzania, since 1994. Cashew, sesame and pigeon pea auction results, production figures and union news.'],
    preload: '<link rel="preload" as="image" href="assets/img/korosho-ghafi.webp" fetchpriority="high">',
    jsonld: [ORG, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'TAMCU LTD', url: `${SITE}/`, inLanguage: ['sw', 'en'], publisher: { '@id': `${SITE}/#org` } }],
    body,
  };
}

/* ------------------------------------------------------------------ ABOUT */
export function about() {
  const regions = [
    ['Tunduru', 35, 'Wilaya ya makao makuu', 'Home district'], ['Namtumbo', 6, 'Mkoa wa Ruvuma', 'Ruvuma region'],
    ['Songea Vijijini', 1, 'Mkoa wa Ruvuma', 'Ruvuma region'], ['Nyasa', 1, 'Mkoa wa Ruvuma', 'Ruvuma region'],
    ['Mbinga', 1, 'Mkoa wa Ruvuma', 'Ruvuma region'], ['Madaba', 1, 'Mkoa wa Ruvuma', 'Ruvuma region'],
    ['Ludewa', 2, 'Mkoa wa Njombe', 'Njombe region'], ['Kyela', 1, 'Mkoa wa Mbeya', 'Mbeya region'],
  ];
  const vision = [
    ['Kuunganisha na kusajili vyama vyote vya ushirika (AMCOS) na kuendelea kuimarisha uwezo na ufanisi wa wakulima.', 'Unite and register all primary co-operatives (AMCOS) and keep strengthening farmers’ capacity and efficiency.'],
    ['Kuhakikisha upatikanaji wa pembejeo za kilimo zenye tija kwa wakati.', 'Make productive farm inputs available on time.'],
    ['Kukuza na kuboresha mahusiano kati ya mkulima na mnunuzi.', 'Build better relationships between farmers and buyers.'],
    ['Kuendelea kuufanya ushirika wetu kuwa sauti ya wakulima na wadau wengine.', 'Keep our co-operative the voice of farmers and other stakeholders.'],
  ];
  const mission = [
    ['Kuwa na mfumo wa ushindani na ufanisi kwenye masoko na bidhaa za kilimo.', 'Run a competitive, efficient system for agricultural markets and produce.'],
    ['Kuwa nguzo ya kuboresha na kuendelea kuyapa thamani mazao ya ushirika.', 'Be the pillar that keeps adding value to co-operative crops.'],
    ['Kutoa huduma za ushauri wa masoko na bei kwa wakulima na wadau wetu.', 'Advise farmers and stakeholders on markets and prices.'],
    ['Kuwa chama cha ushirika chenye ushawishi na kujenga soko la pamoja.', 'Be an influential co-operative that builds a shared market.'],
  ];
  const body = `
${pageHero(t('nav_about', 'Kuhusu Sisi', 'About Us'), t('about_h1', 'Kuhusu TAMCU LTD', 'About TAMCU LTD'), t('about_lede', 'Chama Kikuu cha Ushirika cha Masoko ya Mazao ya Kilimo Tunduru — tangu 1994.', 'The Tunduru agricultural marketing co-operative union — since 1994.'), 'assets/img/stafs.webp', [t('nav_about', 'Kuhusu Sisi', 'About Us')])}

<section class="section section-white">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">${t('about_history_eyebrow', 'Historia Yetu', 'Our history')}</p>
      <h2 class="display">${t('about_history_title', 'Miaka 31 ya ushirika', '31 years of co-operation')}</h2>
      <p class="lede" style="margin-top:16px">${t('about_history_p1', 'Chama Kikuu cha Ushirika cha TAMCU kilianzishwa tarehe 14.03.1994 chini ya Sheria ya Vyama vya Ushirika (Sura ya 211 toleo rekebu la 2023) na marekebisho yake ya mwaka 2025, na kupewa namba ya usajili AFF-RVM-TUN-DC-2023-27.', 'TAMCU was founded on 14 March 1994 under the Co-operative Societies Act (Cap. 211, revised 2023, amended 2025) and holds registration number AFF-RVM-TUN-DC-2023-27.')}</p>
      <p>${t('about_history_p2', 'Chama kinahusisha Vyama vya Msingi (AMCOs) 49, ambapo vyama wanachama ni 44 na vyama visivyo wanachama ni 5.', 'The union works with 49 primary societies (AMCOs): 44 members and 5 non-member societies.')}</p>
    </div>
    <div class="panel reveal">
      <div class="kv">
        <div><span>${t('kv_founded', 'Kuanzishwa', 'Founded')}</span><strong>14.03.1994</strong></div>
        <div><span>${t('kv_reg', 'Namba ya usajili', 'Registration no.')}</span><strong>AFF-RVM-TUN-DC-2023-27</strong></div>
        <div><span>${t('kv_law', 'Sheria', 'Law')}</span><strong>${t('kv_law_v', 'Sura ya 211 (2023)', 'Cap. 211 (2023)')}</strong></div>
        <div><span>${t('fact_amcos', 'Vyama vya Msingi (AMCOs)', 'Primary societies (AMCOs)')}</span><strong>49</strong></div>
        <div><span>${t('fact_members', 'Vyama wanachama', 'Member societies')}</span><strong>44</strong></div>
        <div><span>${t('kv_nonmembers', 'Vyama visivyo wanachama', 'Non-member societies')}</span><strong>5</strong></div>
        <div><span>${t('kv_hq', 'Makao makuu', 'Head office')}</span><strong>Tunduru, Ruvuma</strong></div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="uongozi">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow">${t('nav_leadership', 'Utawala na Uongozi', 'Leadership')}</p>
        <h2 class="display">${t('about_gov_title', 'Utawala wa chama', 'How the union is governed')}</h2>
        <p class="lede">${t('about_gov_lede', 'Chama kinaongozwa na Mkutano Mkuu wa wanachama, Bodi ya Wakurugenzi inayoongozwa na Mwenyekiti, na Menejimenti chini ya Meneja Mkuu.', 'The union is run by the General Meeting of members, a Board of Directors led by the Chairperson, and a management team under the General Manager.')}</p>
      </div>
    </div>
    <div data-render="gm-message"><div class="skeleton" style="min-height:320px"></div></div>
    <div style="margin-top:48px" data-render="chair-message"></div>
    <h3 style="margin:48px 0 18px;font-size:1.4rem">${t('about_team', 'Bodi na Menejimenti', 'Board and management')}</h3>
    <div class="leaders" data-render="leaders"></div>
  </div>
</section>

<section class="section section-white">
  <div class="wrap">
    <div class="section-head"><div>
      <p class="eyebrow">${t('about_mv_eyebrow', 'Tunakoelekea', 'Where we are going')}</p>
      <h2 class="display">${t('about_mv_title', 'Dira na Dhima', 'Vision and mission')}</h2>
    </div></div>
    <div class="grid grid-2">
      <div class="panel reveal"><h3 style="margin-bottom:16px">${t('about_vision', 'Dira', 'Vision')}</h3><ul class="ticks">${vision.map((v, i) => `<li>${icon('check-circle')}<span>${t('vision_' + i, v[0], v[1])}</span></li>`).join('')}</ul></div>
      <div class="panel reveal"><h3 style="margin-bottom:16px">${t('about_mission', 'Dhima', 'Mission')}</h3><ul class="ticks">${mission.map((v, i) => `<li>${icon('check-circle')}<span>${t('mission_' + i, v[0], v[1])}</span></li>`).join('')}</ul></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head"><div>
      <p class="eyebrow">${t('about_regions_eyebrow', 'Eneo la huduma', 'Where we work')}</p>
      <h2 class="display">${t('about_regions_title', 'Wilaya tunazohudumia', 'Districts we serve')}</h2>
      <p class="lede">${t('about_regions_lede', 'Idadi ya vyama vya msingi kwa kila wilaya.', 'Number of primary societies in each district.')}</p>
    </div></div>
    <div class="regions">${regions.map((r, i) => `<div class="region reveal"><div><strong>${r[0]}</strong><small>${t('region_' + i, r[2], r[3])}</small></div><b>${r[1]}</b></div>`).join('')}</div>
  </div>
</section>

<section class="section section-white">
  <div class="wrap">
    <div class="section-head"><div>
      <p class="eyebrow">${t('partners_eyebrow', 'Wadau Wetu', 'Our stakeholders')}</p>
      <h2 class="display">${t('partners_title', 'Tunashirikiana na', 'We work with')}</h2>
    </div></div>
    <div class="partners" data-render="partners"></div>
  </div>
</section>`;
  return {
    file: 'about.html',
    title: ['Kuhusu Sisi — Historia, Uongozi na Dira | TAMCU LTD', 'About Us — History, Leadership and Vision | TAMCU LTD'],
    desc: ['Historia ya TAMCU LTD tangu 1994, ujumbe wa Meneja Mkuu na Mwenyekiti, Bodi, dira na dhima, na wilaya nane tunazohudumia.', 'TAMCU LTD history since 1994, messages from the General Manager and Chairperson, the board, our vision and mission, and the eight districts we serve.'],
    jsonld: [ORG],
    body,
  };
}

/* ------------------------------------------------------------------ PRODUCTS */
export function products() {
  const long = {
    korosho: ['Korosho ni zao kuu la biashara wilayani Tunduru. TAMCU LTD inakusanya korosho ghafi kutoka vyama vya msingi, kuzihifadhi katika maghala yenye stakabadhi, na kuziuza kupitia minada ya wazi ili mkulima apate bei shindani na malipo kwa wakati.', 'Cashew is the main cash crop in Tunduru. TAMCU LTD collects raw cashew nuts from primary societies, stores them in licensed warehouses and sells them at open auctions so farmers get competitive prices and timely payment.'],
    ufuta: ['Ufuta ni miongoni mwa mazao yanayoongoza kwa kipato cha wakulima wa Tunduru. Unauzwa kupitia minada ya TMX na kununuliwa na wanunuzi wa Asia na Ulaya.', 'Sesame is one of the biggest earners for Tunduru farmers. It is sold through TMX auctions to buyers in Asia and Europe.'],
    mbaazi: ['Mbaazi nzima zilizokaushwa ni chanzo muhimu cha protini na kipato. TAMCU inasimamia ukusanyaji wake na kuziuza kupitia mfumo wa stakabadhi za ghala.', 'Whole dried pigeon peas are an important source of protein and income. TAMCU manages collection and sells them through the warehouse receipt system.'],
    karanga: ['Karanga zinajulikana kwa mafuta mengi na ladha yake. Tunasaidia wakulima kupata mbegu bora na masoko ya viwanda vya mafuta.', 'Groundnuts are known for their high oil content and flavour. We help farmers get good seed and reach oil mill buyers.'],
    choroko: ['Choroko lina protini nyingi na huuzwa ndani na nje ya nchi. Tunawaunganisha wakulima na wanunuzi kupitia ushirika.', 'Green grams are rich in protein and sold at home and abroad. We connect farmers with buyers through the co-operative.'],
    dengu: ['Dengu hulimwa baada ya mvua kuu na huongeza kipato cha mkulima nje ya msimu wa korosho.', 'Chickpeas are planted after the main rains and add to farmers’ income outside the cashew season.'],
    kunde: ['Kunde ni zao la chakula la kila siku. Tunatoa ushauri wa kilimo bora, uvunaji na uhifadhi.', 'Cowpeas are an everyday food crop. We advise on good farming, harvesting and storage.'],
  };
  const body = `
${pageHero(t('crops_eyebrow', 'Mazao Yetu', 'Our crops'), t('products_h1', 'Mazao ya ushirika', 'Co-operative crops'), t('products_lede', 'Msimu wa kila zao, jinsi linavyouzwa, na takwimu za minada na uzalishaji.', 'The season for each crop, how it is sold, and auction and production figures.'), 'assets/img/korosho-ghafi.webp', [t('nav_products', 'Mazao', 'Crops')])}
<section class="section">
  <div class="wrap" style="display:grid;gap:clamp(40px,6vw,72px)">
    ${CROPS.map((c, i) => `
    <article id="${c.id}" class="split reveal" style="scroll-margin-top:96px">
      <div style="${i % 2 ? 'order:2' : ''}">
        <img src="assets/img/${c.img}.webp" alt="${c.sw} (${c.en})" loading="lazy" width="960" height="640" style="border-radius:var(--radius-lg);aspect-ratio:3/2;object-fit:cover;width:100%">
      </div>
      <div>
        <span class="tag ${c.tag}">${t('crop_tag_' + c.id, c.tagSw, c.tagEn)}</span>
        <h2 class="display" style="margin:10px 0 14px">${t('crop_' + c.id, c.sw, c.en)}</h2>
        <p>${t('crop_long_' + c.id, long[c.id][0], long[c.id][1])}</p>
        <div class="panel" style="padding:16px 18px;margin:18px 0">
          <strong style="font-size:.85rem;color:var(--muted)">${t('season_label', 'Msimu wa masoko', 'Marketing season')}</strong>
          <div data-render="crop-months" data-crop="${c.id}"></div>
        </div>
        <div class="hero-actions">
          <a class="btn btn-primary btn-sm" href="minada.html?zao=${c.id}">${icon('gavel')}${t('btn_auctions', 'Minada', 'Auctions')}</a>
          <a class="btn btn-outline btn-sm" href="uzalishaji.html?zao=${c.id}">${icon('chart')}${t('btn_production', 'Uzalishaji', 'Production')}</a>
        </div>
      </div>
    </article>`).join('')}
    <p class="note" id="picha">${t('photo_credits', 'Picha', 'Photos')}: Imran Lapong/AusAID (CC BY 2.0), Omar Hoftun (CC BY-SA 4.0), Adoscam (CC BY-SA 4.0), Danielrosehill (CC BY 4.0) — Wikimedia Commons.</p>
  </div>
</section>`;
  return {
    file: 'products.html',
    title: ['Mazao — Korosho, Ufuta, Mbaazi, Karanga, Choroko, Dengu | TAMCU LTD', 'Crops — Cashew, Sesame, Pigeon Peas, Groundnuts, Green Grams | TAMCU LTD'],
    desc: ['Mazao yanayouzwa na TAMCU LTD Tunduru: korosho ghafi, ufuta, mbaazi, karanga, choroko, dengu na kunde. Misimu ya masoko, minada na takwimu za uzalishaji.', 'Crops marketed by TAMCU LTD in Tunduru: raw cashew, sesame, pigeon peas, groundnuts, green grams, chickpeas and cowpeas, with marketing seasons, auctions and production figures.'],
    image: 'assets/img/korosho-ghafi.webp',
    body,
  };
}

/* ------------------------------------------------------------------ AUCTIONS */
export function minada() {
  const body = `
${pageHero(t('nav_auctions', 'Minada', 'Auctions'), t('minada_h1', 'Matokeo ya minada', 'Auction results'), t('minada_lede', 'Kila mnada: tarehe, mahali na chama mwenyeji, kilo zilizouzwa, idadi ya loti, na bei za juu, chini na wastani.', 'Every auction: date, venue and host society, kilograms sold, number of lots, and the highest, lowest and average prices.'), 'assets/img/korosho-ghafi.webp', [t('nav_auctions', 'Minada', 'Auctions')])}
<section class="section">
  <div class="wrap" data-render="auctions-page">
    <div class="skeleton" style="min-height:420px"></div>
  </div>
</section>`;
  return {
    file: 'minada.html',
    title: ['Minada ya Korosho, Ufuta na Mbaazi — Matokeo na Bei | TAMCU LTD', 'Cashew, Sesame and Pigeon Pea Auction Results and Prices | TAMCU LTD'],
    desc: ['Matokeo ya minada ya TAMCU LTD Tunduru: tarehe, mahali, chama mwenyeji, kilo zilizouzwa, loti, bei ya juu, bei ya chini na bei ya wastani kwa kila mnada.', 'TAMCU LTD Tunduru auction results: date, venue, host society, kilograms sold, lots, and the highest, lowest and average price for each auction.'],
    body,
  };
}

/* ------------------------------------------------------------------ PRODUCTION */
export function uzalishaji() {
  const body = `
${pageHero(t('nav_production', 'Uzalishaji', 'Production'), t('uzal_h1', 'Uzalishaji wa mazao', 'Crop production'), t('uzal_lede', 'Uzito uliouzwa, bei ya wastani na thamani kwa kila msimu.', 'Weight sold, average price and total value for every season.'), 'assets/img/ufuta.webp', [t('nav_production', 'Uzalishaji', 'Production')])}
<section class="section">
  <div class="wrap" data-render="production-page">
    <div class="skeleton" style="min-height:420px"></div>
  </div>
</section>`;
  return {
    file: 'uzalishaji.html',
    title: ['Uzalishaji wa Mazao 2021–2026 — Korosho, Ufuta, Mbaazi | TAMCU LTD', 'Crop Production 2021–2026 — Cashew, Sesame, Pigeon Peas | TAMCU LTD'],
    desc: ['Takwimu za uzalishaji wa mazao ya TAMCU LTD kwa kila msimu: uzito (kg), bei ya wastani (TSh) na thamani (TSh) ya korosho, ufuta na mbaazi.', 'TAMCU LTD production figures by season: weight (kg), average price (TSh) and value (TSh) for cashew, sesame and pigeon peas.'],
    body,
  };
}

export { ta };
