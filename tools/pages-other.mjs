import { t, ta, icon } from './lib.mjs';
import { pageHero } from './pages-main.mjs';

/* ------------------------------------------------------------------ SERVICES */
export function services() {
  const items = [
    ['saccos', 'landmark', 'SACCOS', 'SACCOS', 'Jumuiya za kuweka akiba na kukopa zinazowawezesha wanachama kupata mikopo na huduma za kifedha kwa riba nafuu na masharti rahisi.', 'Savings and credit societies that give members loans and financial services at low interest and on simple terms.'],
    ['usafirishaji', 'truck', 'Usafirishaji', 'Transport', 'Usafirishaji wa mazao kutoka maghala ya vyama vya msingi hadi maghala makuu, bandari na viwanda vya usindikaji, kwa usalama na kwa wakati.', 'Moving crops from society stores to main warehouses, ports and processors, safely and on time.'],
    ['pembejeo', 'basket', 'Duka la Pembejeo', 'Farm inputs shop', 'Mbolea, mbegu bora, viuatilifu na vifaa vya kilimo kwa bei nafuu kwa wanachama, vinavyopatikana kabla ya msimu kuanza.', 'Fertiliser, improved seed, crop protection and farm tools at fair prices for members, in stock before the season starts.'],
    ['kampuni', 'building', 'Kampuni', 'Companies', 'TAMCU LTD inamiliki na kushirikiana na kampuni zinazojihusisha na usindikaji wa mazao na biashara ya kilimo.', 'TAMCU LTD owns and partners with companies in crop processing and agribusiness.'],
    ['ushauri', 'sprout', 'Ushauri wa Kilimo', 'Farming advice', 'Mafunzo kwa wakulima kuhusu kilimo bora, uvunaji, ubora wa mazao, uhifadhi na masoko.', 'Training for farmers on good practice, harvesting, crop quality, storage and markets.'],
    ['masoko', 'trending', 'Usimamizi wa Masoko', 'Market management', 'Kuandaa minada, kufuatilia bei za masoko ya dunia na kuwapa wakulima taarifa ili wafanye maamuzi sahihi.', 'Running auctions, tracking world prices and keeping farmers informed so they can make good decisions.'],
  ];
  const body = `
${pageHero(t('nav_services', 'Miradi', 'Services'), t('svc_h1', 'Huduma na miradi yetu', 'Our services and projects'), t('svc_lede', 'Huduma zinazoimarisha kipato na maisha ya wakulima na vyama wanachama.', 'Services that strengthen the income and lives of farmers and member societies.'), 'assets/img/karanga.webp', [t('nav_services', 'Miradi', 'Services')])}
<section class="section">
  <div class="wrap grid grid-3">
    ${items.map(([id, ic, sw, en, dsw, den]) => `
    <div class="service reveal" id="${id}" style="scroll-margin-top:96px">
      <div class="service-icon">${icon(ic)}</div>
      <h3>${t('svc_' + id + '_t', sw, en)}</h3>
      <p>${t('svc_' + id + '_d', dsw, den)}</p>
      <a class="link-arrow" href="contact.html">${t('btn_ask', 'Uliza zaidi', 'Ask about this')}${icon('arrow-right')}</a>
    </div>`).join('')}
  </div>
</section>`;
  return {
    file: 'services.html',
    title: ['Huduma na Miradi — SACCOS, Usafirishaji, Pembejeo | TAMCU LTD', 'Services — SACCOS, Transport, Farm Inputs | TAMCU LTD'],
    desc: ['Huduma za TAMCU LTD kwa wanachama: SACCOS, usafirishaji wa mazao, duka la pembejeo, ushauri wa kilimo na usimamizi wa masoko.', 'TAMCU LTD services for members: SACCOS, crop transport, farm inputs shop, farming advice and market management.'],
    body,
  };
}

/* ------------------------------------------------------------------ INVESTMENT */
export function investment() {
  const body = `
${pageHero(t('nav_investment', 'Uwekezaji', 'Investment'), t('inv_h1', 'Wekeza na TAMCU', 'Invest with TAMCU'), t('inv_lede', 'Nunua hisa za chama au tumia maghala yetu kuhifadhi mazao.', 'Buy shares in the union or use our warehouses to store your crop.'), 'assets/img/coverpage.webp', [t('nav_investment', 'Uwekezaji', 'Investment')])}
<section class="section section-white" id="hisa" style="scroll-margin-top:96px">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">${t('inv_shares', 'Ununuzi wa Hisa', 'Buying shares')}</p>
      <h2 class="display">${t('inv_shares_title', 'Kuwa mwekezaji', 'Become an investor')}</h2>
      <p class="lede" style="margin-top:16px">${t('inv_shares_p1', 'TAMCU LTD inawawezesha watu binafsi na makampuni kununua hisa za chama na kuwa sehemu ya mafanikio yake.', 'TAMCU LTD lets individuals and companies buy shares in the union and share in its success.')}</p>
      <ul class="ticks" style="margin:20px 0 28px">
        <li>${icon('coins')}<span>${t('inv_b1', 'Gawio la faida kila mwaka kulingana na hisa zako.', 'An annual dividend in line with your shares.')}</span></li>
        <li>${icon('vote')}<span>${t('inv_b2', 'Sauti katika mikutano mikuu na maamuzi ya chama.', 'A say in general meetings and union decisions.')}</span></li>
        <li>${icon('shield')}<span>${t('inv_b3', 'Mtaji wako unalindwa na chama chenye historia ya miaka 31.', 'Your capital is held by a union with a 31-year record.')}</span></li>
      </ul>
      <a class="btn btn-primary" href="contact.html">${t('inv_cta', 'Nunua hisa', 'Buy shares')}${icon('arrow-right')}</a>
    </div>
    <div class="panel reveal">
      <h3 style="margin-bottom:12px">${t('inv_info', 'Maelezo ya hisa', 'Share details')}</h3>
      <div class="kv">
        <div><span>${t('inv_k1', 'Thamani ya hisa moja', 'Value of one share')}</span><strong>TSh 10,000</strong></div>
        <div><span>${t('inv_k2', 'Hisa za chini kununua', 'Minimum shares')}</span><strong>10</strong></div>
        <div><span>${t('inv_k3', 'Uwekezaji wa chini', 'Minimum investment')}</span><strong>TSh 100,000</strong></div>
        <div><span>${t('inv_k4', 'Gawio (makadirio)', 'Dividend (estimate)')}</span><strong>${t('inv_k4v', '8–12% kwa mwaka', '8–12% a year')}</strong></div>
        <div><span>${t('inv_k5', 'Muda wa uwekezaji', 'Investment period')}</span><strong>${t('inv_k5v', 'Zaidi ya mwaka 1', 'Over 1 year')}</strong></div>
      </div>
      <p class="note">${t('inv_note', '* Gawio linategemea utendaji wa chama kwa mwaka husika.', '* Dividends depend on the union’s performance in the year.')}</p>
    </div>
  </div>
</section>
<section class="section" id="ghala" style="scroll-margin-top:96px">
  <div class="wrap">
    <div class="section-head"><div>
      <p class="eyebrow">${t('inv_warehouse', 'Huduma za Ghala', 'Warehouse services')}</p>
      <h2 class="display">${t('inv_wh_title', 'Hifadhi mazao, subiri bei nzuri', 'Store your crop, wait for a better price')}</h2>
      <p class="lede">${t('inv_wh_lede', 'Maghala yetu yanakuwezesha kuhifadhi mazao hadi bei zipande, na kutumia stakabadhi ya ghala kama dhamana ya mkopo.', 'Our warehouses let you hold your crop until prices rise, and use the warehouse receipt as loan collateral.')}</p>
    </div></div>
    <div class="grid grid-4">
      <div class="service reveal"><div class="service-icon">${icon('warehouse')}</div><h3>${t('inv_w1', 'Ghala la kisasa', 'Modern storage')}</h3><p>${t('inv_w1d', 'Hali bora ya hewa na ulinzi wa saa 24.', 'Good ventilation and 24-hour security.')}</p></div>
      <div class="service reveal"><div class="service-icon">${icon('chart')}</div><h3>${t('inv_w2', 'Kumbukumbu sahihi', 'Accurate records')}</h3><p>${t('inv_w2d', 'Tunafuatilia ubora na kiasi cha mazao yako.', 'We track the quality and quantity of your crop.')}</p></div>
      <div class="service reveal"><div class="service-icon">${icon('shield')}</div><h3>${t('inv_w3', 'Usalama wa mzigo', 'Safe stock')}</h3><p>${t('inv_w3d', 'Kinga dhidi ya wizi, unyevu na wadudu.', 'Protection from theft, damp and pests.')}</p></div>
      <div class="service reveal"><div class="service-icon">${icon('landmark')}</div><h3>${t('inv_w4', 'Mkopo kwa stakabadhi', 'Receipt-backed loans')}</h3><p>${t('inv_w4d', 'Tumia stakabadhi ya ghala kupata mkopo benki.', 'Use your warehouse receipt to get a bank loan.')}</p></div>
    </div>
    <p style="margin-top:28px"><a class="btn btn-primary" href="contact.html">${t('inv_wh_cta', 'Weka nafasi ya ghala', 'Book warehouse space')}${icon('arrow-right')}</a></p>
  </div>
</section>`;
  return {
    file: 'investment.html',
    title: ['Uwekezaji — Hisa na Huduma za Ghala | TAMCU LTD', 'Investment — Shares and Warehouse Services | TAMCU LTD'],
    desc: ['Nunua hisa za TAMCU LTD (TSh 10,000 kwa hisa) au tumia huduma za ghala na stakabadhi za ghala kuhifadhi mazao na kupata mkopo.', 'Buy TAMCU LTD shares (TSh 10,000 each) or use our warehouses and warehouse receipts to store crops and access credit.'],
    body,
  };
}

/* ------------------------------------------------------------------ NEWS */
export function news() {
  const body = `
${pageHero(t('news_eyebrow', 'Habari na Matukio', 'News and events'), t('news_h1', 'Habari za TAMCU', 'TAMCU news'), t('news_lede', 'Mikutano, minada, mafunzo na matukio mengine ya chama.', 'Meetings, auctions, training and other union events.'), 'assets/img/daily-update-3.webp', [t('nav_news', 'Habari', 'News')])}
<section class="section">
  <div class="wrap">
    <div class="grid grid-3" data-render="news"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>
  </div>
</section>
<section class="section section-white" id="taarifa">
  <div class="wrap">
    <div class="section-head"><div>
      <p class="eyebrow">${t('updates_eyebrow', 'Kila siku', 'Every day')}</p>
      <h2 class="display">${t('updates_title', 'Taarifa za kila siku', 'Daily updates')}</h2>
    </div></div>
    <div data-render="updates"><div class="skeleton" style="min-height:420px"></div></div>
  </div>
</section>`;
  return {
    file: 'news.html',
    title: ['Habari na Matukio | TAMCU LTD', 'News and Events | TAMCU LTD'],
    desc: ['Habari mpya kutoka TAMCU LTD: mikutano mikuu, minada ya korosho na ufuta, mafunzo kwa wakulima na taarifa za kila siku.', 'Latest from TAMCU LTD: general meetings, cashew and sesame auctions, farmer training and daily updates.'],
    body,
  };
}

export function article() {
  const body = `
<section class="section section-white">
  <div class="wrap" style="max-width:820px" data-render="article">
    <div class="skeleton" style="min-height:480px"></div>
  </div>
</section>`;
  return {
    file: 'habari.html',
    title: ['Habari | TAMCU LTD', 'News | TAMCU LTD'],
    desc: ['Habari kutoka TAMCU LTD, Chama Kikuu cha Ushirika Tunduru.', 'News from TAMCU LTD, the Tunduru co-operative union.'],
    ogType: 'article',
    body,
  };
}

/* ------------------------------------------------------------------ CONTACT */
export function contact() {
  const body = `
${pageHero(t('nav_contact', 'Wasiliana Nasi', 'Contact Us'), t('contact_h1', 'Tuandikie', 'Get in touch'), t('contact_lede', 'Maswali kuhusu uanachama, minada, hisa au huduma za ghala — tutakujibu.', 'Questions about membership, auctions, shares or warehouses — we will get back to you.'), 'assets/img/stafs.webp', [t('nav_contact', 'Wasiliana Nasi', 'Contact Us')])}
<section class="section">
  <div class="wrap split split-wide" style="align-items:start">
    <div class="panel reveal">
      <h2 style="font-size:1.5rem;margin-bottom:18px">${t('form_title', 'Tuma ujumbe', 'Send a message')}</h2>
      <form class="form" data-contact-form novalidate>
        <div class="form-row">
          <div class="field"><label for="f-name">${t('form_name', 'Jina kamili', 'Full name')}</label><input class="input" id="f-name" name="name" required autocomplete="name" ${ta('placeholder', 'form_name_ph', 'Mf. Asha Juma', 'e.g. Asha Juma')}></div>
          <div class="field"><label for="f-phone">${t('form_phone', 'Namba ya simu', 'Phone number')}</label><input class="input" id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="07XX XXX XXX"></div>
        </div>
        <div class="field"><label for="f-email">${t('form_email', 'Barua pepe', 'Email')}</label><input class="input" id="f-email" name="email" type="email" required autocomplete="email" placeholder="jina@mfano.co.tz"></div>
        <div class="field"><label for="f-subject">${t('form_subject', 'Mada', 'Subject')}</label>
          <select class="input select" id="f-subject" name="subject">
            <option value="Uanachama">${t('subj_member', 'Kujiunga na chama', 'Membership')}</option>
            <option value="Minada">${t('subj_auction', 'Minada na bei', 'Auctions and prices')}</option>
            <option value="Hisa">${t('subj_shares', 'Kununua hisa', 'Buying shares')}</option>
            <option value="Ghala">${t('inv_warehouse', 'Huduma za Ghala', 'Warehouse services')}</option>
            <option value="Usafirishaji">${t('svc_transport', 'Usafirishaji', 'Transport')}</option>
            <option value="Mengineyo">${t('subj_other', 'Mengineyo', 'Something else')}</option>
          </select>
        </div>
        <div class="field"><label for="f-msg">${t('form_msg', 'Ujumbe', 'Message')}</label><textarea class="input" id="f-msg" name="message" required></textarea></div>
        <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="alert alert-ok" data-form-ok hidden role="status">${icon('check-circle')}<span>${t('form_ok', 'Asante! Ujumbe wako umetufikia. Tutakujibu hivi karibuni.', 'Thank you! Your message has reached us. We will reply soon.')}</span></div>
        <div class="alert alert-err" data-form-err hidden role="alert">${icon('info')}<span>${t('form_err', 'Ujumbe haukutumwa. Jaza jina, barua pepe na ujumbe, kisha jaribu tena — au tupigie simu.', 'Your message was not sent. Fill in your name, email and message and try again — or call us.')}</span></div>
        <button class="btn btn-primary" type="submit">${icon('send')}${t('form_send', 'Tuma ujumbe', 'Send message')}</button>
      </form>
    </div>
    <div class="reveal">
      <div class="contact-list">
        <div class="contact-item"><div class="service-icon">${icon('map-pin')}</div><div><strong>${t('c_address', 'Anwani', 'Address')}</strong><span data-bind="address">Tunduru, Ruvuma, Tanzania</span></div></div>
        <div class="contact-item"><div class="service-icon">${icon('mail')}</div><div><strong>${t('form_email', 'Barua pepe', 'Email')}</strong><a href="mailto:info@tamcu.co.tz" data-bind="email-link"><span data-bind="email">info@tamcu.co.tz</span></a></div></div>
        <div class="contact-item"><div class="service-icon">${icon('phone')}</div><div><strong>${t('c_phone', 'Simu', 'Phone')}</strong><a href="tel:+255753799001" data-bind="phone-link"><span data-bind="phone">+255 753 799 001</span></a></div></div>
        <div class="contact-item"><div class="service-icon">${icon('clock')}</div><div><strong>${t('c_hours', 'Saa za kazi', 'Office hours')}</strong><span>${t('c_hours_v', 'Jumatatu – Ijumaa: 08:00 – 17:00<br>Jumamosi: 08:00 – 13:00', 'Monday – Friday: 08:00 – 17:00<br>Saturday: 08:00 – 13:00')}</span></div></div>
      </div>
      <iframe class="map" style="margin-top:16px" title="Ramani ya Tunduru" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Tunduru%2C%20Ruvuma%2C%20Tanzania&z=13&output=embed"></iframe>
    </div>
  </div>
</section>`;
  return {
    file: 'contact.html',
    title: ['Wasiliana Nasi | TAMCU LTD Tunduru', 'Contact Us | TAMCU LTD Tunduru'],
    desc: ['Wasiliana na TAMCU LTD, Tunduru, Ruvuma: barua pepe info@tamcu.co.tz, simu, anwani na fomu ya ujumbe.', 'Contact TAMCU LTD in Tunduru, Ruvuma: email info@tamcu.co.tz, phone, address and a message form.'],
    body,
  };
}

/* ------------------------------------------------------------------ STAFF PORTAL */
export function staff() {
  const body = `
<section class="portal">
  <div class="portal-card">
    <div data-portal-login>
      <img src="assets/img/logo-192.webp" width="64" height="64" alt="TAMCU LTD">
      <h1>${t('portal_h1', 'Staff Portal', 'Staff Portal')}</h1>
      <p>${t('portal_lede', 'Ingia kwa kutumia akaunti uliyopewa na TAMCU.', 'Sign in with the account TAMCU gave you.')}</p>
      <form class="form" data-portal-form>
        <div class="field"><label for="p-user">${t('portal_user', 'Namba ya mtumishi au barua pepe', 'Staff number or email')}</label><input class="input" id="p-user" name="user" autocomplete="username" required></div>
        <div class="field"><label for="p-pass">${t('portal_pass', 'Nenosiri', 'Password')}</label><input class="input" id="p-pass" name="pass" type="password" autocomplete="current-password" required></div>
        <button class="btn btn-primary" type="submit">${icon('lock')}${t('portal_btn', 'Ingia', 'Sign in')}</button>
      </form>
    </div>
    <div class="construction" data-portal-msg hidden>
      ${icon('construction')}
      <h1>${t('portal_uc', 'Under construction', 'Under construction')}</h1>
      <p>${t('portal_uc_p', 'Mfumo wa watumishi wa TAMCU unajengwa na utapatikana hivi karibuni. Kwa sasa wasiliana na ofisi kuu kwa msaada.', 'The TAMCU staff system is being built and will be available soon. For now, please contact the head office for help.')}</p>
      <a class="btn btn-outline" href="index.html">${icon('arrow-left')}${t('portal_back', 'Rudi nyumbani', 'Back to home')}</a>
    </div>
  </div>
</section>`;
  return {
    file: 'staff-portal.html',
    title: ['Staff Portal | TAMCU LTD', 'Staff Portal | TAMCU LTD'],
    desc: ['Lango la watumishi wa TAMCU LTD.', 'TAMCU LTD staff sign-in.'],
    noindex: true,
    body,
  };
}

/* ------------------------------------------------------------------ 404 */
export function notFound() {
  const body = `
<section class="section">
  <div class="wrap" style="text-align:center;max-width:640px">
    <h1 class="display" style="font-size:clamp(4rem,14vw,8rem);color:var(--cashew)">404</h1>
    <h2 style="font-size:1.6rem;margin:8px 0 12px">${t('nf_title', 'Ukurasa haupatikani', 'Page not found')}</h2>
    <p class="lede" style="margin:0 auto 24px">${t('nf_text', 'Ukurasa ulioutafuta umehamishwa au haupo. Anzia ukurasa wa nyumbani.', 'The page you are looking for has moved or does not exist. Start from the home page.')}</p>
    <a class="btn btn-primary" href="/index.html">${t('portal_back', 'Rudi nyumbani', 'Back to home')}</a>
  </div>
</section>`;
  return { file: '404.html', title: ['Ukurasa haupatikani | TAMCU LTD', 'Page not found | TAMCU LTD'], desc: ['Ukurasa haupatikani.', 'Page not found.'], noindex: true, body, base: true };
}

/* ------------------------------------------------------------------ LEGAL (content reused from the old pages) */
export function legal(file, swTitle, enTitle, contentHtml) {
  const key = file.replace('.html', '').replace(/-/g, '_');
  const body = `
${pageHero(t('legal_eyebrow', 'Taarifa za kisheria', 'Legal'), t(key + '_h1', swTitle, enTitle), '', '', [t(key + '_h1', swTitle, enTitle)])}
<section class="section section-white"><div class="wrap"><div class="prose">${contentHtml}</div></div></section>`;
  return { file, title: [`${swTitle} | TAMCU LTD`, `${enTitle} | TAMCU LTD`], desc: [`${swTitle} ya tovuti ya TAMCU LTD.`, `${enTitle} for the TAMCU LTD website.`], body };
}
