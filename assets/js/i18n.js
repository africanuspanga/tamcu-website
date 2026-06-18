/**
 * TAMCU LTD - Bilingual i18n Engine (Swahili / English)
 * Strategy: data-i18n attributes on translatable elements,
 * original Swahili stored in data-i18n-original, English in dictionary.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'tamcu-lang';
  const DEFAULT_LANG = 'sw';

  /* ================================================================
     DICTIONARY: Swahili key → English text
     Keys mirror the data-i18n attribute values.
     ================================================================ */
  const DICT = {
    /* ---------- COMMON / NAVBAR ---------- */
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_services: 'Services',
    nav_products: 'Products',
    nav_investment: 'Investment',
    nav_news: 'News',
    nav_contact: 'Contact Us',
    nav_mobile_menu: 'Open menu',
    nav_mobile_close: 'Close menu',

    /* ---------- TICKER ---------- */
    ticker_label: 'PREVIOUS SEASON CROP PRICES:',

    /* ---------- FOOTER ---------- */
    footer_brand:
      'Agricultural Marketing Co-operative Union of Tunduru since 1994. Join and support.',
    footer_quickLinks: 'Quick Links',
    footer_magazine: 'TAMCU Magazine',
    footer_services: 'Our Services',
    footer_contact: 'Contact',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Use',
    footer_copyright: 'All Rights Reserved.',

    /* ---------- BUTTONS / CTAs ---------- */
    btn_learnMore: 'Learn More',
    btn_contactUs: 'Contact Us',
    btn_readMore: 'Read More',
    btn_showLess: 'Show Less',
    btn_joinNow: 'Join Now',
    btn_visitStore: 'Visit Store',
    btn_getAdvice: 'Get Advice',
    btn_checkPrices: 'Check Prices',
    btn_sendMessage: 'Send Message',
    btn_buyShares: 'Buy Shares Now',
    btn_bookWarehouse: 'Book Warehouse Space',
    btn_viewAllNews: 'View All News',

    /* ---------- SCROLL INDICATOR ---------- */
    scroll_text: 'Scroll',

    /* ---------- INDEX PAGE ---------- */
    index_title:
      'TAMCU LTD | Tunduru Agricultural Marketing Co-operative Union',
    index_desc:
      'TAMCU LTD is the Tunduru Agricultural Marketing Co-operative Union in Ruvuma. Registered on 14.03.1994 under Chapter 211 (Revised Edition 2023), registration number AFF-RVM-TUN-DC-2023-27. 49 Primary Societies (AMCOs), 44 Member Societies.',
    index_hero_subtitle: 'Tunduru Agricultural Marketing Co-operative Union',
    index_hero_title: 'Protect Co-operation,<br>Choose Integrity',
    index_hero_desc:
      'The Primary Co-operative Society for Agricultural Marketing in Tunduru since 1994. Working together with Cashew, Sesame and Pigeon Pea farmers.',

    index_about_label: 'About Us',
    index_about_title: 'Primary Co-operative Society (TAMCU LTD)',
    index_about_p1:
      'TAMCU Primary Co-operative Society was established on 14.03.1994 under the Co-operative Societies Act (Chapter 211 Revised Edition 2023) and its amendments of 2025, and was given registration number AFF-RVM-TUN-DC-2023-27.',
    index_about_p2: '',
    index_about_p3: '',
    index_about_cert: 'Chapter 211',
    index_about_certYear: 'Revised Edition 2023',
    index_about_reg: 'AFF-RVM-TUN-DC-2023-27',
    index_about_regLabel: 'Registration No.',

    index_stats_founded: 'Year Founded',
    index_stats_coops: 'Co-operative Societies',
    index_stats_primary: 'Primary Societies in Tunduru',
    index_stats_crops: 'Types of Crops',
    index_stats_amcos: 'Primary Societies (AMCOs)',
    index_stats_members: 'Member Societies',
    index_stats_nonmembers: 'Non-Member Societies',

    index_crops_label: 'Our Crops',
    index_crops_title: 'We Service Major Commercial Crops',
    index_crops_desc:
      'TAMCU LTD is involved in collection, management and market search for the following crops in Tunduru district and neighbouring regions.',

    index_crop_tag_main: 'Main Commercial',
    index_crop_tag_popular: 'Popular Crop',
    index_crop_tag_food: 'Food & Commercial',
    index_crop_tag_foodOnly: 'Food Crop',
    index_crop_tag_oil: 'Oil Crop',

    index_crop_cashew_desc:
      'Tunduru cashews are known for their world-class quality. We support farmers through training and better markets.',
    index_crop_sesame_desc:
      'Tunduru sesame has flavour and colour that attract the international market. We ensure farmers get good prices through co-operation.',
    index_crop_pigeon_desc:
      'Pigeon peas are an important source of protein and commerce for our farmers. TAMCU helps with harvesting and better transport.',
    index_crop_mung_desc:
      'Mung beans have high protein and are used for various foods. TAMCU helps farmers get quality seeds and markets.',
    index_crop_groundnut_desc:
      'Groundnuts are known for their oil and unique taste. We help farmers get good harvests and markets.',
    index_crop_blackeye_desc:
      'Black-eyed peas are an important food crop for Tunduru communities. We support farmers through training and better markets.',
    index_crop_peanut_desc:
      'Tunduru peanuts are of high quality and rich in oil. We help farmers get good prices in the market.',

    index_services_label: 'Our Services',
    index_services_title: 'We Provide Services to Our Members',
    index_services_desc:
      'TAMCU LTD offers various services aimed at improving the lives of farmers and our members.',

    index_service_saccos_desc:
      'Savings and Credit Co-operative Societies that enable members to obtain loans and financial services at low interest rates.',
    index_service_transport_desc:
      'Crop transport services from the farm to major markets and processing factories within and outside the country.',
    index_service_store_desc:
      'Availability of fertiliser, quality seeds, pesticides and other farming inputs at affordable prices for members.',

    index_news_label: 'News & Events',
    index_news_title: 'Latest Updates',

    index_news1_title: '23rd Annual General Meeting for Year 2026/2027',
    index_news1_desc:
      'Held today on 23rd April as part of the society\'s leadership duties for this year...',
    index_news2_title: 'Cashew Prices Continue to Rise in World Market',
    index_news2_desc:
      'A new report from the Food and Agriculture Organization (FAO) shows that cashew prices...',
    index_news3_title: '7 New Members Join TAMCU',
    index_news3_desc:
      '7 primary co-operative societies from neighbouring districts have officially joined TAMCU LTD to strengthen...',

    index_cta_title: 'Join Us Today',
    index_cta_desc:
      'Would you like to join TAMCU LTD or get more information about our services? Contact us today and be part of our history.',

    index_partners_label: 'Our Partners',
    index_partners_title: 'OUR PARTNERS',

    index_daily_label: 'Daily Updates',
    index_daily_title: 'DAILY UPDATES',
    index_daily_desc:
      'Check out photos of events and the latest updates from TAMCU LTD every day.',
    index_daily_cta: 'Follow us on Instagram',

    /* ---------- ABOUT PAGE ---------- */
    about_title: 'About Us | TAMCU LTD',
    about_desc:
      'Learn about TAMCU LTD history and registration. Registered on 14.03.1994 under Chapter 211 (Revised Edition 2023), registration number AFF-RVM-TUN-DC-2023-27. 49 Primary Societies (AMCOs), 44 Member Societies, 5 Non-Member Societies.',
    about_hero_label: 'Learn More',
    about_hero_title: 'About TAMCU LTD',
    about_hero_subtitle:
      'Agricultural Marketing Co-operative Union of Tunduru — since 1994.',

    about_history_label: 'Our History',
    about_history_title: 'History of TAMCU LTD',
    about_history_p1:
      'TAMCU Primary Co-operative Society was established on 14.03.1994 under the Co-operative Societies Act (Chapter 211 Revised Edition 2023) and its amendments of 2025, and was given registration number AFF-RVM-TUN-DC-2023-27.',
    about_history_p2:
      'The society involves 49 Primary Societies (AMCOs), of which 44 are Member Societies and 5 are Non-Member Societies.',
    about_history_p3: '',
    about_history_foundedLabel: 'Year Founded',
    about_history_regLabel: 'Registration Certificate',
    about_history_years: 'Years of Service',
    about_history_amcosLabel: 'Primary Societies (AMCOs)',
    about_history_membersLabel: 'Member Societies',
    about_history_nonmembersLabel: 'Non-Member Societies',

    about_mission_label: 'Our Purpose',
    about_mission_title: 'Vision and Mission',
    about_vision_title: 'Vision',
    about_vision_1:
      'To unite and register all Co-operative Societies (AMCOS) and continue to improve the capacity and efficiency of farmers.',
    about_vision_2:
      'To ensure availability of productive farming inputs on time.',
    about_vision_3:
      'To grow and improve relationships between farmers and buyers.',
    about_vision_4:
      'To continue making our co-operative a voice for farmers and other stakeholders.',
    about_mission_title2: 'Mission',
    about_mission_1:
      'Our intention is to have a competitive and efficient system in agricultural markets and products.',
    about_mission_2:
      'To be a pillar in improving and continuing to value co-operative crops.',
    about_mission_3:
      'To provide market and price advisory services to farmers and our stakeholders.',
    about_mission_4:
      'To be a Co-operative Society with influence and build a joint market.',

    about_regions_label: 'Service Area',
    about_regions_title: 'Districts We Serve',
    about_regions_desc:
      'TAMCU LTD serves co-operative societies from various districts in Tanzania.',
    about_region_home: 'Home District',
    about_region_district: 'District',
    about_region_town: 'Town Council',
    about_region_society: 'Society',
    about_region_societies: 'Societies',

    /* ---------- PRODUCTS PAGE ---------- */
    products_title: 'Our Products | TAMCU LTD',
    products_desc:
      'Explore TAMCU LTD crops from Tunduru, Tanzania, including cashew, sesame, pigeon peas, mung beans, groundnuts, black-eyed peas and peanuts.',
    products_hero_label: 'Our Products',
    products_hero_title: 'Commercial Crops',
    products_hero_subtitle:
      'Cashew, Sesame, Pigeon Peas, Mung Beans, Groundnuts, Black-eyed Peas and Peanuts — major crops grown by TAMCU LTD member farmers.',

    products_price_high: 'High Price',
    products_price_low: 'Low Price',

    products_cashew_tag: 'Main Commercial',
    products_cashew_title: 'Cashew',
    products_cashew_p1:
      'Cashew is the main commercial crop in Tunduru district. TAMCU LTD is involved in collection, management and market search for cashew for its members. Tunduru cashews are known for their world-class quality.',
    products_cashew_p2:
      'Through co-operation, farmers receive good farming training, quality seeds and markets with good prices. TAMCU also ensures farmers receive payments on time.',

    products_sesame_tag: 'Popular Crop',
    products_sesame_title: 'Sesame',
    products_sesame_p1:
      'Sesame is among the leading crops in income generation for Tunduru farmers. Tunduru sesame has flavour and colour that attract the international market, especially in Asia and Europe.',
    products_sesame_p2:
      'TAMCU LTD provides advisory services to sesame farmers on the best planting time, good crop protection chemicals and best harvesting and storage methods.',

    products_pigeon_tag: 'Food & Commercial',
    products_pigeon_title: 'Pigeon Peas',
    products_pigeon_p1:
      'Pigeon peas are an important source of protein for Tunduru communities and beyond. Besides household use, pigeon peas are also a business that brings good income to farmers.',
    products_pigeon_p2:
      'TAMCU LTD helps pigeon pea farmers get quality seeds, good farming training and valuable markets. The society also collaborates with research institutions to improve pigeon pea varieties.',

    products_mung_tag: 'Food Crop',
    products_mung_title: 'Mung Beans',
    products_mung_p1:
      'Mung beans are an important food and commercial crop in Tunduru district. They have high protein and are used for various traditional and modern foods.',
    products_mung_p2:
      'TAMCU LTD helps mung bean farmers get quality seeds, good farming training, and markets with good prices. Mung beans from Tunduru have quality that attracts the domestic and foreign market.',

    products_groundnut_tag: 'Oil Crop',
    products_groundnut_title: 'Groundnuts',
    products_groundnut_p1:
      'Groundnuts are among the crops with very high value in Tunduru district. They are known for the quality of their oil and their unique taste.',
    products_groundnut_p2:
      'TAMCU LTD helps groundnut farmers get quality seeds of indigenous varieties and training on how to get good harvests. Our groundnut markets reach oil factories and the domestic market.',

    products_blackeye_tag: 'Food Crop',
    products_blackeye_title: 'Black-eyed Peas',
    products_blackeye_p1:
      'Black-eyed peas are a very important food crop for Tunduru communities. They have high protein and are used for daily meals.',
    products_blackeye_p2:
      'TAMCU LTD provides advisory services to black-eyed pea farmers on good farming, harvesting, and storage. We also help them get markets with good prices for their harvests.',

    products_peanut_tag: 'Oil Crop',
    products_peanut_title: 'Peanuts',
    products_peanut_p1:
      'Peanuts are an oil and food crop that is widely grown in Tunduru district. Tunduru peanuts are known for their quality and the rich oil found inside.',
    products_peanut_p2:
      'TAMCU LTD helps peanut farmers get quality seeds, good farming training, and valuable markets. Our peanuts are sold in markets both raw and processed.',

    /* ---------- SERVICES PAGE ---------- */
    services_title: 'Our Services | TAMCU LTD',
    services_desc:
      'TAMCU LTD services for members and farmers include SACCOS, crop transport, agricultural inputs, market advice and company support.',
    services_hero_label: 'Our Projects',
    services_hero_title: 'Our Services',
    services_hero_subtitle:
      'We offer various services aimed at improving the lives of farmers and our members.',

    services_saccos_title: 'SACCOS',
    services_saccos_desc:
      'Savings and Credit Co-operative Societies that enable members to obtain loans and financial services at low interest rates. Members can invest and borrow on favourable terms.',
    services_saccos_1: 'Loans for farmers',
    services_saccos_2: 'Savings and interest payments',
    services_saccos_3: 'Entrepreneurship training',

    services_transport_title: 'Transport',
    services_transport_desc:
      'Crop transport services from the farm to major markets and processing factories within and outside the country. We ensure crops arrive safely and on time.',
    services_transport_1: 'Crop transport',
    services_transport_2: 'Warehouse storage',
    services_transport_3: 'Input transport',

    services_store_title: 'Input Store',
    services_store_desc:
      'Availability of fertiliser, quality seeds, pesticides and other farming inputs at affordable prices for our members.',
    services_store_1: 'High quality fertiliser',
    services_store_2: 'Quality crop seeds',
    services_store_3: 'Pest and disease chemicals',

    services_company_title: 'Company',
    services_company_desc:
      'TAMCU LTD owns and partners with various companies involved in crop processing and agricultural trade.',
    services_company_1: 'Crop processing',
    services_company_2: 'Crop trade',
    services_company_3: 'International partnerships',

    services_advice_title: 'Farming Advice',
    services_advice_desc:
      'Training and advice to farmers on good farming, harvesting, storage and markets for their crops.',
    services_advice_1: 'Farming training',
    services_advice_2: 'Market advice',
    services_advice_3: 'Harvest monitoring',

    services_market_title: 'Market Management',
    services_market_desc:
      'We monitor world market prices and provide reports to farmers so they can make better business decisions.',
    services_market_1: 'Price analysis',
    services_market_2: 'Market reports',
    services_market_3: 'Buyer connections',

    /* ---------- INVESTMENT PAGE ---------- */
    investment_title: 'Investment | TAMCU LTD',
    investment_desc:
      'Investment opportunities with TAMCU LTD through share purchases and warehouse services supporting crop storage, processing and marketing in Tunduru.',
    investment_hero_label: 'Investment Opportunities',
    investment_hero_title: 'Investment',
    investment_hero_subtitle:
      'Join TAMCU LTD through share purchase or use of our warehouse services.',

    investment_shares_label: 'Share Purchase',
    investment_shares_title: 'Join as an Investor',
    investment_shares_p1:
      'TAMCU LTD enables individuals and companies to buy shares in the society and be part of our success. Each investor receives profits according to their shares.',
    investment_shares_p2:
      'Share purchase enables you to participate in society decisions, receive profit dividends and grow your capital.',
    investment_benefit_profit: 'Investment Return',
    investment_benefit_profit_desc:
      'Receive profit dividends every year according to your shares.',
    investment_benefit_voice: 'Decision Voice',
    investment_benefit_voice_desc:
      'Participate in general meetings and society decisions.',
    investment_benefit_security: 'Capital Protection',
    investment_benefit_security_desc:
      'Your capital is protected by a society with 31 years of history.',

    investment_shares_info: 'Share Information',
    investment_share_value: 'Value per Share',
    investment_min_shares: 'Minimum shares to buy',
    investment_min_invest: 'Minimum investment',
    investment_return: 'Profit dividend (estimate)',
    investment_duration: 'Investment period',
    investment_per_year: 'per year',
    investment_over_year: 'Over 1 year',
    investment_disclaimer:
      '* Profit dividend depends on the society\'s performance for the relevant year.',

    investment_warehouse_label: 'Warehouse',
    investment_warehouse_title: 'Crop Storage',
    investment_warehouse_p1:
      'TAMCU LTD offers warehouse services to its members. Our warehouses have modern equipment for storing crops for a long time without spoiling.',
    investment_warehouse_p2:
      'This service enables farmers to store their crops until prices are good in the market. It also enables them to get loans using stored crops as collateral.',
    investment_wh_feature1: 'Modern Warehouse',
    investment_wh_feature1_desc:
      'Store your crops in a warehouse with good air conditioning and security.',
    investment_wh_feature2: 'Harvest Management',
    investment_wh_feature2_desc:
      'We help monitor the quality and quantity of stored crops.',
    investment_wh_feature3: 'Product Security',
    investment_wh_feature3_desc:
      'Our warehouses have adequate protection against theft and damage.',
    investment_wh_feature4: 'Loan Availability',
    investment_wh_feature4_desc:
      'Use stored crops as collateral to obtain loans.',

    /* ---------- CONTACT PAGE ---------- */
    contact_title: 'Contact Us | TAMCU LTD',
    contact_desc:
      'Contact TAMCU LTD in Tunduru, Ruvuma, Tanzania. Phone +255 (0) 753 -7999001. For membership, crop marketing, co-operative services, investment and general enquiries.',
    contact_hero_label: 'Send Us a Message',
    contact_hero_title: 'Contact Us',
    contact_hero_subtitle:
      'We are happy to hear from you. Contact us for questions, feedback or requests.',

    contact_info_label: 'Contact',
    contact_info_title: 'Reach Us',
    contact_info_desc:
      'We are in Tunduru, Ruvuma, Tanzania. You can reach us via email, phone or visit our office.',
    contact_address_label: 'Address',
    contact_address: 'Tunduru, Ruvuma, Tanzania',
    contact_email_label: 'Email',
    contact_phone_label: 'Phone',
    contact_hours_label: 'Working Hours',
    contact_hours_week: 'Mon - Fri: 08:00 - 17:00',
    contact_hours_sat: 'Sat: 08:00 - 13:00',
    contact_social: 'Social Media',

    contact_form_title: 'Send a Message',
    contact_form_name: 'Full Name',
    contact_form_name_ph: 'Enter your name',
    contact_form_email: 'Email',
    contact_form_email_ph: 'email@example.com',
    contact_form_phone: 'Phone Number',
    contact_form_phone_ph: '+255 (0) 753 -7999001',
    contact_form_subject: 'Subject',
    contact_form_subject_default: 'Choose subject...',
    contact_form_subject_join: 'Join the Society',
    contact_form_subject_invest: 'Investment',
    contact_form_subject_warehouse: 'Warehouse Services',
    contact_form_subject_transport: 'Transport',
    contact_form_subject_other: 'Other Purpose',
    contact_form_message: 'Message',
    contact_form_message_ph: 'Write your message here...',
    contact_form_submit: 'Send Message',
    contact_form_success: 'Thank you! Your message has been received.',

    contact_map_label: 'Our Location',
    contact_map_title: 'Where We Are',
    contact_map_desc: 'Our offices are in Tunduru, Ruvuma, Tanzania. You are very welcome!',
    contact_map_placeholder: 'Map will be placed here',

    /* ---------- NEWS PAGE ---------- */
    news_title: 'News | TAMCU LTD',
    news_desc:
      'Read news, events, crop market updates, meetings and announcements from TAMCU LTD, the Tunduru Agricultural Marketing Co-operative Union.',
    news_hero_label: 'Latest Updates',
    news_hero_title: 'News & Events',
    news_hero_subtitle: 'Read important news and events from TAMCU LTD.',

    news_tag_meeting: 'Meeting',
    news_tag_market: 'Markets',
    news_tag_membership: 'Membership',
    news_tag_training: 'Training',
    news_tag_transport: 'Transport',
    news_tag_coop: 'Co-operation',

    news1_title: '23rd Annual General Meeting for Year 2026/2027',
    news1_desc:
      'Held today on 23rd April as part of the society\'s leadership duties for this year. Members discussed various development issues.',
    news2_title: 'Cashew Prices Continue to Rise in World Market',
    news2_desc:
      'A new report from the Food and Agriculture Organization (FAO) shows that cashew prices have increased by 15 percent since last year.',
    news3_title: '7 New Members Join TAMCU',
    news3_desc:
      '7 primary co-operative societies from neighbouring districts have officially joined TAMCU LTD to strengthen agricultural co-operation.',
    news4_title: 'Good Cashew Farming Training Conducted',
    news4_desc:
      'A 3-day training was held for cashew farmers on good farming, harvesting and storage of cashew.',
    news5_title: 'Cashew Transport Begins for New Season',
    news5_desc:
      'TAMCU LTD has officially begun cashew transport for the 2026/2027 season to processing factories.',
    news6_title: 'TAMCU Wins Co-operative of the Year Award',
    news6_desc:
      'The Ruvuma District Primary Co-operative Society has awarded the Co-operative of the Year 2025 award to TAMCU LTD.',

    /* ---------- PRIVACY POLICY PAGE ---------- */
    privacy_title: 'Privacy Policy | TAMCU LTD',
    privacy_desc:
      'The TAMCU LTD Privacy Policy explains how we collect, use and protect your information when you visit the website or contact us.',
    privacy_hero_label: 'Laws and Terms',
    privacy_hero_title: 'Privacy Policy',
    privacy_hero_subtitle: 'How we handle and protect your information.',

    privacy_intro:
      'TAMCU LTD respects your privacy and protects your personal information. This privacy policy explains how we collect, use, and protect your information when you visit our website or participate in our activities.',

    privacy_sec1_title: '1. Information We Collect',
    privacy_sec1_intro: 'We may collect the following information:',
    privacy_sec1_1:
      'Personal Information: Name, address, phone number, email, and other information you provide when joining us or sending a message.',
    privacy_sec1_2:
      'Co-operative Information: Information about your co-operative society, number of members, and types of crops you are involved with.',
    privacy_sec1_3:
      'Financial Information: Information related to payments, investment, and financial activities.',
    privacy_sec1_4:
      'Network Information: IP address, browser type, and pages you visited on our website.',

    privacy_sec2_title: '2. How We Use Information',
    privacy_sec2_intro: 'We use your information for the following purposes:',
    privacy_sec2_1: 'To provide our services and manage your membership.',
    privacy_sec2_2:
      'To communicate with you about operational issues, markets, and investment opportunities.',
    privacy_sec2_3:
      'To improve our services and user experience on our website.',
    privacy_sec2_4: 'To fulfill our legal and regulatory obligations.',
    privacy_sec2_5: 'To prevent fraud and protect the security of your information.',

    privacy_sec3_title: '3. Cookies',
    privacy_sec3_text:
      'Our website may use cookies to improve your browsing experience. Cookies are small files stored on your device. You can control cookie usage through your browser settings.',

    privacy_sec4_title: '4. Information Security',
    privacy_sec4_text:
      'We implement technical and operational measures to protect your information against unauthorized access, destruction, or loss. However, no network transmission or electronic storage method is completely secure.',

    privacy_sec5_title: '5. Sharing Information with Others',
    privacy_sec5_intro:
      'We will not sell or rent your personal information to third parties. We may share your information:',
    privacy_sec5_1:
      'With government authorities when we are legally required to do so.',
    privacy_sec5_2:
      'With our partners who help us provide services, under confidentiality terms.',

    privacy_sec6_title: '6. Your Rights',
    privacy_sec6_text:
      'You have the right to request to view, correct, or delete your personal information that we hold. Contact us via email:',

    privacy_sec7_title: '7. Policy Changes',
    privacy_sec7_text:
      'We may change this policy at any time. Any changes will be announced on this page. We advise you to review this page regularly.',

    privacy_sec8_title: '8. Contact Us',
    privacy_sec8_text:
      'If you have questions about this privacy policy, please contact us:',
    privacy_org: 'TAMCU LTD',
    privacy_email_label: 'Email',
    privacy_last_updated: 'This policy was last updated: June 2026.',

    /* ---------- TERMS OF USE PAGE ---------- */
    terms_title: 'Terms of Use | TAMCU LTD',
    terms_desc:
      'The TAMCU LTD Terms of Use explain the rules for using the information, services and content provided on this website.',
    terms_hero_label: 'Laws and Terms',
    terms_hero_title: 'Terms of Use',
    terms_hero_subtitle: 'Laws and terms for using the TAMCU LTD website and services.',

    terms_intro:
      'Welcome to the TAMCU LTD website. By visiting or using this website, you agree to follow the following terms and laws. Please read carefully before using our services.',

    terms_sec1_title: '1. Acceptance of Terms',
    terms_sec1_text:
      'By accessing or using this website, you agree that you have read, understood, and agree to be bound by these terms. If you do not agree with these terms, please do not use our website.',

    terms_sec2_title: '2. Proper Use of Website',
    terms_sec2_intro: 'You agree to use this website for lawful purposes only. It is not proper to use this website:',
    terms_sec2_1:
      'In any way that violates existing laws or regulations in Tanzania.',
    terms_sec2_2:
      'To send or distribute false, defamatory, or hate-inciting content.',
    terms_sec2_3:
      'To attempt to invade, destroy, or disrupt the operation of our website.',
    terms_sec2_4:
      'To collect information about other users without their consent.',
    terms_sec2_5:
      'To use any equipment, software, or techniques that are harmful to our network.',

    terms_sec3_title: '3. Intellectual Property',
    terms_sec3_text:
      'All content on this website, including text, images, logos, trademarks, and software, is the property of TAMCU LTD or its distributors and is protected by copyright laws. You may not copy, modify, distribute, or display this content without our written permission.',

    terms_sec4_title: '4. Accuracy of Information',
    terms_sec4_text:
      'We strive to ensure that all information on this website is accurate and up to date. However, TAMCU LTD is not responsible for any errors or omissions in the information provided. Use of this information is at your own risk.',

    terms_sec5_title: '5. External Links',
    terms_sec5_text:
      'Our website may contain links to external pages. TAMCU LTD is not responsible for the content or privacy policies of these pages. We recommend reviewing their terms before using their services.',

    terms_sec6_title: '6. Limitation of Liability',
    terms_sec6_text:
      'TAMCU LTD, its employees, and its agents shall not be liable for any loss arising from the use or inability to use this website, even if we have been informed of the possibility of such loss.',

    terms_sec7_title: '7. Governing Law',
    terms_sec7_text:
      'These terms shall be governed by and construed in accordance with the laws of the United Republic of Tanzania. Any dispute shall be resolved through the courts of Tanzania.',

    terms_sec8_title: '8. Changes to Terms',
    terms_sec8_text:
      'We may change these terms at any time without prior notice. Changes will take effect immediately after being published on this page. Your continued use of the website means acceptance of those changes.',

    terms_sec9_title: '9. Termination',
    terms_sec9_text:
      'We may terminate or suspend your access to the website at any time, without notice, if we discover that you have violated these terms.',

    terms_sec10_title: '10. Contact Us',
    terms_sec10_text: 'If you have questions about these terms, please contact us:',
    terms_last_updated: 'These terms were last updated: June 2026.',
  };

  /* ================================================================
     ENGINE
     ================================================================ */

  /**
   * Extract the longest non-empty text node content from an element.
   */
  function extractMainText(el) {
    let best = '';
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const t = node.textContent;
        if (t.trim().length > best.trim().length) best = t;
      }
    }
    return best;
  }

  /**
   * Replace the main text content of an element while preserving child nodes.
   */
  function setMainText(el, newText) {
    const nodes = [];
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) nodes.push(node);
    }

    if (nodes.length === 0) {
      el.insertBefore(document.createTextNode(newText), el.firstChild);
      return;
    }
    if (nodes.length === 1) {
      nodes[0].textContent = newText;
      return;
    }

    // Find the node with the most non-whitespace content
    let mainNode = nodes[0];
    let maxLen = nodes[0].textContent.trim().length;
    for (let i = 1; i < nodes.length; i++) {
      const len = nodes[i].textContent.trim().length;
      if (len > maxLen) {
        maxLen = len;
        mainNode = nodes[i];
      }
    }
    if (mainNode) mainNode.textContent = newText;
  }

  /**
   * Apply translations for the given language.
   */
  function applyLanguage(lang) {
    // Update <html lang>
    document.documentElement.lang = lang;

    // Update <title>
    const titleEl = document.querySelector('title');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      if (key && DICT[key]) {
        if (lang === 'sw') {
          const orig = titleEl.getAttribute('data-i18n-original');
          if (orig) titleEl.textContent = orig;
        } else {
          if (!titleEl.hasAttribute('data-i18n-original')) {
            titleEl.setAttribute('data-i18n-original', titleEl.textContent);
          }
          titleEl.textContent = DICT[key];
        }
      }
    }

    // Update <meta name="description">
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const key = metaDesc.getAttribute('data-i18n');
      if (key && DICT[key]) {
        if (lang === 'sw') {
          const orig = metaDesc.getAttribute('data-i18n-original');
          if (orig) metaDesc.setAttribute('content', orig);
        } else {
          if (!metaDesc.hasAttribute('data-i18n-original')) {
            metaDesc.setAttribute(
              'data-i18n-original',
              metaDesc.getAttribute('content')
            );
          }
          metaDesc.setAttribute('content', DICT[key]);
        }
      }
    }

    // Update elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      // Skip title and meta (handled above)
      if (el.tagName === 'TITLE' || el.tagName === 'META') return;

      const key = el.getAttribute('data-i18n');
      const dictText = DICT[key];
      if (!dictText) return;

      // Store original Swahili text
      if (!el.hasAttribute('data-i18n-original')) {
        const orig = extractMainText(el);
        if (orig) el.setAttribute('data-i18n-original', orig);
      }

      if (lang === 'sw') {
        if (el.hasAttribute('data-i18n-original-html')) {
          el.innerHTML = el.getAttribute('data-i18n-original-html');
        } else {
          const orig = el.getAttribute('data-i18n-original');
          if (orig) setMainText(el, orig);
        }
      } else {
        // For innerHTML replacements (br tags etc)
        if (dictText.includes('<') || el.hasAttribute('data-i18n-html')) {
          if (!el.hasAttribute('data-i18n-original-html')) {
            el.setAttribute('data-i18n-original-html', el.innerHTML);
          }
          el.innerHTML = dictText;
        } else {
          setMainText(el, dictText);
        }
      }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      const dictText = DICT[key];
      if (!dictText) return;

      if (!el.hasAttribute('data-i18n-placeholder-original')) {
        el.setAttribute(
          'data-i18n-placeholder-original',
          el.getAttribute('placeholder') || ''
        );
      }

      if (lang === 'sw') {
        el.setAttribute(
          'placeholder',
          el.getAttribute('data-i18n-placeholder-original') || ''
        );
      } else {
        el.setAttribute('placeholder', dictText);
      }
    });

    // Update aria-label attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria');
      const dictText = DICT[key];
      if (!dictText) return;

      if (!el.hasAttribute('data-i18n-aria-original')) {
        el.setAttribute('data-i18n-aria-original', el.getAttribute('aria-label') || '');
      }

      if (lang === 'sw') {
        const orig = el.getAttribute('data-i18n-aria-original');
        if (orig) el.setAttribute('aria-label', orig);
      } else {
        el.setAttribute('aria-label', dictText);
      }
    });

    // Update toggle button states
    updateToggleButtons(lang);
  }

  /**
   * Update language toggle button visual states.
   */
  function updateToggleButtons(lang) {
    document.querySelectorAll('.lang-btn-sw').forEach(function (btn) {
      if (lang === 'sw') {
        btn.classList.add('bg-accent', 'text-white');
        btn.classList.remove('text-white/70', 'hover:text-white');
      } else {
        btn.classList.remove('bg-accent', 'text-white');
        btn.classList.add('text-white/70', 'hover:text-white');
      }
    });
    document.querySelectorAll('.lang-btn-en').forEach(function (btn) {
      if (lang === 'en') {
        btn.classList.add('bg-accent', 'text-white');
        btn.classList.remove('text-white/70', 'hover:text-white');
      } else {
        btn.classList.remove('bg-accent', 'text-white');
        btn.classList.add('text-white/70', 'hover:text-white');
      }
    });
  }

  /**
   * Set the active language (called by toggle buttons).
   */
  window.setLanguage = function (lang) {
    if (lang !== 'sw' && lang !== 'en') return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyLanguage(lang);
  };

  /**
   * Initialize on page load.
   */
  function init() {
    const lang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    applyLanguage(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
