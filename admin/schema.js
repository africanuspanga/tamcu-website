/* What each admin section edits. Field types:
   text, number, date, url, textarea, image, bool, months, i18n (Swahili + English), i18n-area,
   strings (list of short texts), list (repeatable group), table (spreadsheet rows), group. */
window.SCHEMA = [
  {
    name: 'auctions', title: 'Minada', icon: '🔨',
    help: 'Kila zao lina misimu yake. Kila msimu una jedwali la minada hadi 20. Mistari isiyojazwa haionekani kwenye tovuti.',
    fields: [
      { key: 'note', type: 'i18n', label: 'Maelezo chini ya jedwali (hiari)' },
      {
        key: 'crops', type: 'list', label: 'Mazao', item: 'Zao', titleFrom: 'name', add: { name: { sw: '', en: '' }, seasons: [] },
        fields: [
          { key: 'id', type: 'text', label: 'Kitambulisho (herufi ndogo, mf. korosho)', half: true },
          { key: 'name', type: 'i18n', label: 'Jina la zao' },
          { key: 'image', type: 'image', label: 'Picha ndogo ya zao', max: 400 },
          {
            key: 'seasons', type: 'list', label: 'Misimu', item: 'Msimu', titleFrom: 'season', newFirst: true, add: { season: '', rows: [] },
            fields: [
              { key: 'season', type: 'text', label: 'Msimu (mf. 2025/2026)', half: true },
              {
                key: 'rows', type: 'table', label: 'Minada ya msimu huu', rows: 20,
                columns: [
                  { key: 'auction', label: 'Mnada wa ngapi', type: 'number', w: 70 },
                  { key: 'date', label: 'Tarehe', type: 'date', w: 140 },
                  { key: 'location', label: 'Mahali', type: 'text', w: 140 },
                  { key: 'host', label: 'Mwenyeji (AMCOS)', type: 'text', w: 160 },
                  { key: 'kg', label: 'Kilo zilizouzwa', type: 'number', w: 120 },
                  { key: 'lots', label: 'Idadi ya loti', type: 'number', w: 80 },
                  { key: 'high', label: 'Bei juu', type: 'number', w: 90 },
                  { key: 'low', label: 'Bei chini', type: 'number', w: 90 },
                  { key: 'avg', label: 'Bei wastani', type: 'number', w: 90 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'production', title: 'Uzalishaji', icon: '📊',
    help: 'Takwimu za kila msimu. Ukiacha "Thamani" wazi, tovuti itazidisha Uzito × Bei wastani yenyewe.',
    fields: [
      { key: 'title', type: 'i18n', label: 'Kichwa cha jedwali' },
      {
        key: 'crops', type: 'list', label: 'Mazao', item: 'Zao', titleFrom: 'name', add: { name: { sw: '', en: '' }, rows: [] },
        fields: [
          { key: 'id', type: 'text', label: 'Kitambulisho (herufi ndogo, mf. ufuta)', half: true },
          { key: 'name', type: 'i18n', label: 'Jina la zao' },
          { key: 'image', type: 'image', label: 'Picha ndogo ya zao', max: 400 },
          { key: 'note', type: 'i18n', label: 'Maelezo (hiari, mf. chanzo cha takwimu)' },
          {
            key: 'rows', type: 'table', label: 'Takwimu kwa msimu', rows: 12,
            columns: [
              { key: 'season', label: 'Msimu', type: 'text', w: 110 },
              { key: 'kg', label: 'Uzito (kg)', type: 'number', w: 150 },
              { key: 'avg_price', label: 'Bei wastani (TSh)', type: 'number', w: 130 },
              { key: 'value', label: 'Thamani (TSh) — hiari', type: 'number', w: 180 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'seasons', title: 'Mtiririko wa Msimu', icon: '📅',
    help: 'Kisanduku kilicho upande wa kulia wa picha kubwa ya ukurasa wa mwanzo. Chagua miezi ambayo zao linapatikana sokoni.',
    fields: [
      { key: 'title', type: 'i18n', label: 'Kichwa' },
      { key: 'subtitle', type: 'i18n', label: 'Maelezo madogo (hiari)' },
      {
        key: 'main', type: 'list', label: 'Mazao makuu (yenye vitufe vya Minada na Uzalishaji)', item: 'Zao', titleFrom: 'name', add: { id: '', name: { sw: '', en: '' }, months: [] },
        fields: [
          { key: 'id', type: 'text', label: 'Kitambulisho — sawa na kwenye Minada (mf. korosho)', half: true },
          { key: 'name', type: 'i18n', label: 'Jina' },
          { key: 'image', type: 'image', label: 'Picha ndogo', max: 400 },
          { key: 'months', type: 'months', label: 'Miezi ya msimu (kwa mpangilio, mf. Okt, Nov, Des, Jan)' },
        ],
      },
      {
        key: 'other', type: 'list', label: 'Mazao mengine (yanapopatikana)', item: 'Zao', titleFrom: 'name', add: { id: '', name: { sw: '', en: '' }, months: [] },
        fields: [
          { key: 'id', type: 'text', label: 'Kitambulisho (mf. dengu)', half: true },
          { key: 'name', type: 'i18n', label: 'Jina' },
          { key: 'months', type: 'months', label: 'Miezi yanapopatikana' },
          { key: 'note', type: 'i18n', label: 'Maandishi badala ya miezi (hiari, mf. "Inakuja hivi karibuni")' },
        ],
      },
    ],
  },
  {
    name: 'updates', title: 'Taarifa za Kila Siku', icon: '🖼️',
    help: 'Picha za 1080 × 1350 (wima) zenye maelezo pembeni. Taarifa 6 za karibuni zinaonekana kama P1–P6.',
    fields: [
      {
        key: 'items', type: 'list', label: 'Taarifa', item: 'Taarifa', titleFrom: 'title', newFirst: true, max: 40,
        add: function () { return { id: uid(), date: today(), title: { sw: '', en: '' }, body: { sw: '', en: '' } }; },
        fields: [
          { key: 'date', type: 'date', label: 'Tarehe', half: true },
          { key: 'image', type: 'image', label: 'Picha (1080 × 1350)', max: 1350, ratio: '1080 / 1350' },
          { key: 'title', type: 'i18n', label: 'Kichwa' },
          { key: 'body', type: 'i18n-area', label: 'Maelezo' },
          { key: 'link', type: 'url', label: 'Kiungo cha "Soma zaidi" (hiari, mf. habari.html?id=... au Instagram)' },
        ],
      },
    ],
  },
  {
    name: 'news', title: 'Habari', icon: '📰',
    help: 'Habari mpya huonekana juu. Picha ya habari inaonyeshwa kwa uwiano wa 16:10 kwenye kadi.',
    fields: [
      {
        key: 'items', type: 'list', label: 'Habari', item: 'Habari', titleFrom: 'title', newFirst: true, max: 200,
        add: function () { return { id: uid(), date: today(), published: true, title: { sw: '', en: '' }, excerpt: { sw: '', en: '' }, body: { sw: '', en: '' }, category: { sw: '', en: '' } }; },
        fields: [
          { key: 'date', type: 'date', label: 'Tarehe', half: true },
          { key: 'published', type: 'bool', label: 'Ionekane kwenye tovuti', half: true },
          { key: 'image', type: 'image', label: 'Picha (inapendekezwa 1600 × 1000)', max: 1600, ratio: '16 / 10' },
          { key: 'category', type: 'i18n', label: 'Kundi (mf. Mkutano, Masoko)' },
          { key: 'title', type: 'i18n', label: 'Kichwa' },
          { key: 'excerpt', type: 'i18n-area', label: 'Muhtasari (mistari 1–2)' },
          { key: 'body', type: 'i18n-area', label: 'Habari kamili', rows: 10 },
        ],
      },
    ],
  },
  {
    name: 'leaders', title: 'Uongozi', icon: '👤',
    help: 'Ujumbe wa Meneja Mkuu unaonekana ukurasa wa mwanzo na wa Kuhusu Sisi. Tenganisha aya kwa mstari mtupu.',
    fields: [
      {
        key: 'general_manager', type: 'group', label: 'Meneja Mkuu',
        fields: [
          { key: 'name', type: 'text', label: 'Jina kamili', half: true },
          { key: 'title', type: 'i18n', label: 'Cheo' },
          { key: 'photo', type: 'image', label: 'Picha (wima, 4:5)', max: 1000, ratio: '4 / 5' },
          { key: 'heading', type: 'i18n', label: 'Kichwa cha ujumbe (hiari)' },
          { key: 'message', type: 'i18n-area', label: 'Ujumbe', rows: 10 },
        ],
      },
      {
        key: 'chair', type: 'group', label: 'Mwenyekiti wa Bodi',
        fields: [
          { key: 'name', type: 'text', label: 'Jina kamili', half: true },
          { key: 'title', type: 'i18n', label: 'Cheo' },
          { key: 'photo', type: 'image', label: 'Picha (wima, 4:5)', max: 1000, ratio: '4 / 5' },
          { key: 'heading', type: 'i18n', label: 'Kichwa cha ujumbe (hiari)' },
          { key: 'message', type: 'i18n-area', label: 'Ujumbe (ukiacha wazi, haitaonyeshwa)', rows: 8 },
        ],
      },
      {
        key: 'team', type: 'list', label: 'Wajumbe wa Bodi na Menejimenti', item: 'Kiongozi', titleFrom: 'name', add: { name: '', title: { sw: '', en: '' } },
        fields: [
          { key: 'name', type: 'text', label: 'Jina', half: true },
          { key: 'title', type: 'i18n', label: 'Cheo' },
          { key: 'photo', type: 'image', label: 'Picha (mraba)', max: 800, ratio: '1' },
        ],
      },
    ],
  },
  {
    name: 'partners', title: 'Wadau', icon: '🤝',
    help: 'Nembo zinaonekana vizuri zaidi zikiwa PNG yenye mandharinyuma meupe au angavu.',
    fields: [
      {
        key: 'items', type: 'list', label: 'Wadau', item: 'Mdau', titleFrom: 'name', add: { name: '', url: '' },
        fields: [
          { key: 'name', type: 'text', label: 'Jina la taasisi' },
          { key: 'short', type: 'text', label: 'Kifupi (mf. TMX) — hutumika kama hakuna nembo', half: true },
          { key: 'url', type: 'url', label: 'Tovuti (https://...)' },
          { key: 'logo', type: 'image', label: 'Nembo', max: 400 },
        ],
      },
    ],
  },
  {
    name: 'settings', title: 'Mipangilio', icon: '⚙️',
    help: 'Mawasiliano, mitandao ya kijamii, bei kwenye mstari wa juu, na takwimu za ukurasa wa mwanzo.',
    fields: [
      {
        key: 'contact', type: 'group', label: 'Mawasiliano',
        fields: [
          { key: 'email', type: 'text', label: 'Barua pepe', half: true },
          { key: 'phones', type: 'strings', label: 'Namba za simu (ya kwanza ndiyo inaonyeshwa)' },
          { key: 'address', type: 'i18n', label: 'Anwani' },
        ],
      },
      {
        key: 'social', type: 'group', label: 'Mitandao ya kijamii',
        fields: [
          { key: 'instagram', type: 'url', label: 'Instagram' },
          { key: 'facebook', type: 'url', label: 'Facebook' },
          { key: 'whatsapp', type: 'url', label: 'WhatsApp Channel' },
        ],
      },
      { key: 'ticker_label', type: 'i18n', label: 'Maandishi ya mstari wa bei (juu kabisa)' },
      {
        key: 'prices', type: 'table', label: 'Bei kwenye mstari wa juu (TSh/kg)', rows: 8,
        columns: [
          { key: 'crop', label: 'Zao', type: 'i18n-cell', w: 220 },
          { key: 'high', label: 'Bei juu', type: 'number', w: 110 },
          { key: 'low', label: 'Bei chini', type: 'number', w: 110 },
        ],
      },
      {
        key: 'stats', type: 'list', label: 'Takwimu za ukurasa wa mwanzo (4)', item: 'Takwimu', titleFrom: 'label', max: 4, add: { value: '', label: { sw: '', en: '' } },
        fields: [
          { key: 'value', type: 'text', label: 'Namba', half: true },
          { key: 'label', type: 'i18n', label: 'Maelezo' },
        ],
      },
    ],
  },
];

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function today() { return new Date().toISOString().slice(0, 10); }
