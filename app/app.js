'use strict';
(function () {
  var API = 'api';
  var TOKEN_KEY = 'bb_token';
  var LANG_KEY = 'bb_lang';

  /* ------------------------------ i18n ------------------------------ */
  var I18N = {
    en: {
      _dir: 'ltr', _name: 'English',
      brand2: 'BITES',
      signin: 'Sign in', username: 'Username', password: 'Password',
      welcome: 'Welcome', signin_sub: 'Sign in to start the register.',
      bad_login: 'Invalid username or password',
      nav_pos: 'Register (POS)', nav_foods: 'Foods', nav_orders: 'Orders', nav_settings: 'Settings', nav_kitchen: 'Kitchen',
      ready: 'Ready', kitchen_empty: 'No orders in the kitchen', reset_time: 'Order number reset time', reset_time_hint: 'Numbering restarts at this time each day', sent_kitchen: 'Sent to kitchen',
      sec_sale: 'SALE', sec_manage: 'MANAGE',
      signed_in: 'Signed in', logout: 'Sign out',
      cat_all: 'All', cat_burgers: 'Burgers', cat_sandwiches: 'Sandwiches', cat_sides: 'Sides', cat_other: 'Other',
      cart: 'Order', empty_cart: 'Tap a food to add it', total: 'Total', note_ph: 'Note (e.g. no onions)…',
      save_draft: 'Save to draft', drafts_title: 'Held orders', draft_saved: 'Saved to drafts', draft_name_title: 'Save to draft — pay later',
      draft_name_ph: 'Name (e.g. Table 5, red shirt)', draft_replace_confirm: 'Replace the current order with this held order?', draft_del_confirm: 'Delete this held order?',
      print: 'Print', save_print: 'Save & Print', clear: 'Clear', arrange: 'Arrange', arrange_done: 'Done',
      manage_foods: 'Foods', add_food: 'Add food', name_ku: 'Name (Kurdish)', name_ar: 'Name (Arabic)',
      name_en: 'Name (English)', category: 'Category', price: 'Price', active: 'Active', actions: '',
      edit: 'Edit', del: 'Delete', save: 'Save', cancel: 'Cancel', confirm_del: 'Delete this food?',
      food_name: 'Food', th_price: 'Price', th_status: 'Status',
      settings: 'Settings', print_size: 'Receipt printer size', business: 'Business info',
      biz_name: 'Business name', slogan: 'Slogan', phone: 'Phone number', phones: 'Phone numbers', phones_hint: 'One number per line — all appear on the receipt', def_lang: 'Default language',
      saved: 'Saved', today: 'Today', sales_today: "Today's sales", orders_total: 'Orders',
      no_orders: 'No orders yet', order: 'Order', qty: 'Qty', item: 'Item', date: 'Date',
      details: 'Details', hide: 'Hide', unit_price: 'Unit price', lang_label: 'Language', line_total: 'Total', order_details: 'Order items',
      r_thanks: 'Thank you! · See you again',
      need_items: 'Add at least one item first',
      order_saved: 'Order saved',
      receipt: 'Receipt', print_receipt: 'Print receipt', close: 'Close', printing: 'Printing…', printed: 'Printed', print_failed: 'Print failed',
      show_preview: 'Show receipt preview', show_preview_hint: 'When off, the receipt prints directly with no popup — faster for a busy cashier.',
      preview_on: 'On', preview_off: 'Off',
      beep: 'Beep on print', beep_hint: 'Network printers with a buzzer beep when a ticket prints.',
      printers_zones: 'Printers & Zones', pz_hint: 'Scan for printers, register them, then route each food category to its printer.',
      desktop_only: 'Available in the desktop app.',
      scan: 'Scan for printers', scanning: 'Scanning…', rescan: 'Scan again',
      scan_note: 'Finds USB / installed printers and network printers (port 9100) on this network.',
      found_printers: 'Found', registered_printers: 'Registered printers',
      no_found: 'Nothing yet — tap “Scan for printers”.', no_registered: 'No printers registered yet.',
      kind_system: 'USB / installed', kind_network: 'Network',
      register: 'Register', added: 'Added', already_added: 'Already added', remove: 'Remove', test: 'Test',
      zones_title: 'Print zones', zones_hint: 'A zone sends the chosen food categories to one printer.',
      add_zone: 'Add zone', no_zones: 'No zones yet.', zone_name: 'Zone name',
      zone_type: 'Type', ztype_customer: 'Customer receipt (whole order)', ztype_items: 'Kitchen ticket (chosen categories)',
      zone_printer: 'Printer', zone_cats: 'Food categories', pick: 'Choose…',
      station: 'Station', test_ticket: 'TEST TICKET',
      network: 'Network', your_pc: 'This PC', subnet: 'Subnet', gateway: 'Router (gateway)',
      add_manually: 'Add manually', ip_address: 'IP address', port: 'Port', printer_name: 'Name (optional)',
      add: 'Add', checking: 'Checking…', reachable: 'Reachable ✓', not_reachable: 'No answer — added anyway',
      manual_hint: 'Enter the printer IP (e.g. 192.168.1.50) and port (usually 9100).', bad_ip: 'Enter a valid IP, e.g. 192.168.1.50',
      help_title: 'How to connect a printer (quick guide)',
      help_1: 'Plug the printer into the SAME router as this PC (a LAN cable is the most reliable).',
      help_2: 'Print its network settings: turn the printer OFF, hold the FEED button, turn it ON — it prints its current IP.',
      help_3: 'The printer IP must be on your subnet — the same first three numbers as “This PC”. Example: PC 192.168.1.20 → printer 192.168.1.50.',
      help_4: 'To change the IP: open the printer’s current IP in a web browser, or use its “Net Config / Printer Setup” tool over USB — set a static IP, gateway = the Router shown above, port 9100.',
      help_5: 'Come back here → Scan (or Add manually) → Test. Then make a zone for it.',
      manage_categories: 'Categories', cat_hint: 'Add your own food categories, then assign foods to them.',
      add_category: 'Add category', edit_category: 'Edit category', del_category: 'Delete this category? Foods keep their name but lose this category.',
      cat_name_req: 'Enter a category name', no_categories: 'No categories yet — add one.',
      manage_users: 'Users & access', users_hint: 'Create a login for each cashier and pick what they can see.',
      add_user: 'Add user', edit_user: 'Edit user', del_user: 'Delete this user?',
      disp_name: 'Name', role: 'Role', role_admin: 'Admin — full access', role_staff: 'Cashier — limited',
      can_see: 'Can see these sections', pw_keep: 'Leave blank to keep the current password', account_active: 'Account active',
      you_tag: 'you', username_req: 'Username: 2–32 chars — letters, numbers, . _ -', pw_req: 'Password must be at least 3 characters',
      no_access: 'No access yet — ask an admin to grant you a section.',
      nav_reports: 'Reports',
      rng_today: 'Today', rng_week: 'Last 7 days', rng_month: 'This month', rng_custom: 'Custom',
      rep_from: 'From', rep_to: 'To', rep_apply: 'Show',
      rep_total_sales: 'Total sales', rep_orders: 'Orders', rep_items: 'Items sold', rep_avg: 'Avg order',
      rep_by_category: 'Sales by category', rep_top_items: 'Top items', rep_by_day: 'Daily sales',
      rep_print: 'Print total', rep_title: 'Sales Report', rep_none: 'No sales in this range.',
    },
    ku: {
      _dir: 'rtl', _name: 'کوردی',
      brand2: 'بایتس',
      signin: 'چوونەژوورەوە', username: 'ناوی بەکارهێنەر', password: 'وشەی نهێنی',
      welcome: 'بەخێربێیت', signin_sub: 'بچۆ ژوورەوە بۆ دەستپێکردن.',
      bad_login: 'ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە',
      nav_pos: 'فرۆشتن', nav_foods: 'خواردنەکان', nav_orders: 'داواکارییەکان', nav_settings: 'ڕێکخستن', nav_kitchen: 'چێشتخانە',
      ready: 'ئامادەیە', kitchen_empty: 'هیچ داواکارییەک لە چێشتخانە نییە', reset_time: 'کاتی سفرکردنەوەی ژمارەی داواکاری', reset_time_hint: 'ژمارەکردن هەموو ڕۆژێک لەم کاتەدا دەستپێدەکاتەوە', sent_kitchen: 'نێردرا بۆ چێشتخانە',
      sec_sale: 'فرۆشتن', sec_manage: 'بەڕێوەبردن',
      signed_in: 'چووەتە ژوورەوە', logout: 'چوونەدەرەوە',
      cat_all: 'هەموو', cat_burgers: 'بەرگر', cat_sandwiches: 'ساندویچ', cat_sides: 'لاوەکی', cat_other: 'ئەوانیتر',
      cart: 'داواکاری', empty_cart: 'کرتە لە خواردنێک بکە بۆ زیادکردن', total: 'کۆی گشتی', note_ph: 'تێبینی (بۆ نموونە بەبێ پیاز)…',
      save_draft: 'هەڵگرتن (پاشان پارە)', drafts_title: 'داواکارییە هەڵگیراوەکان', draft_saved: 'هەڵگیرا', draft_name_title: 'هەڵگرتن — پاشان پارە دەدرێت',
      draft_name_ph: 'ناو (نموونە: مێزی ٥، کراسی سوور)', draft_replace_confirm: 'داواکاری ئێستا بگۆڕدرێت بەم داواکارییە هەڵگیراوە؟', draft_del_confirm: 'ئەم داواکارییە هەڵگیراوە بسڕدرێتەوە؟',
      print: 'چاپکردن', save_print: 'پاشەکەوت و چاپ', clear: 'سڕینەوە', arrange: 'ڕیزکردن', arrange_done: 'تەواو',
      manage_foods: 'خواردنەکان', add_food: 'زیادکردنی خواردن', name_ku: 'ناو (کوردی)', name_ar: 'ناو (عەرەبی)',
      name_en: 'ناو (ئینگلیزی)', category: 'جۆر', price: 'نرخ', active: 'چالاک', actions: '',
      edit: 'دەستکاری', del: 'سڕینەوە', save: 'پاشەکەوت', cancel: 'پاشگەزبوونەوە', confirm_del: 'ئەم خواردنە بسڕێتەوە؟',
      food_name: 'خواردن', th_price: 'نرخ', th_status: 'دۆخ',
      settings: 'ڕێکخستن', print_size: 'قەبارەی پرینتەری وەسڵ', business: 'زانیاری بازرگانی',
      biz_name: 'ناوی بازرگانی', slogan: 'دروشم', phone: 'ژمارەی تەلەفۆن', phones: 'ژمارەکانی تەلەفۆن', phones_hint: 'هەر ژمارەیەک لە ڕیزێکدا — هەموویان لە وەسڵدا دەردەکەون', def_lang: 'زمانی بنەڕەت',
      saved: 'پاشەکەوتکرا', today: 'ئەمڕۆ', sales_today: 'فرۆشتنی ئەمڕۆ', orders_total: 'داواکارییەکان',
      no_orders: 'هێشتا داواکاری نییە', order: 'داواکاری', qty: 'بڕ', item: 'خواردن', date: 'بەروار',
      details: 'وردەکاری', hide: 'شاردنەوە', unit_price: 'نرخی یەکە', lang_label: 'زمان', line_total: 'کۆ', order_details: 'خواردنەکانی داواکاری',
      r_thanks: 'سوپاس! · دووبارە بەخێربێیتەوە',
      need_items: 'سەرەتا خواردنێک زیاد بکە',
      order_saved: 'داواکاری پاشەکەوتکرا',
      receipt: 'وەسڵ', print_receipt: 'چاپی وەسڵ', close: 'داخستن', printing: 'چاپکردن…', printed: 'چاپکرا', print_failed: 'چاپکردن سەرکەوتوو نەبوو',
      show_preview: 'پیشاندانی وەسڵ پێش چاپ', show_preview_hint: 'ئەگەر ناچالاک بێت، وەسڵ ڕاستەوخۆ چاپدەکرێت بەبێ پیشاندان — خێراترە بۆ کاشێر.',
      preview_on: 'چالاک', preview_off: 'ناچالاک',
      beep: 'دەنگ لە کاتی چاپ', beep_hint: 'پرینتەرە تۆڕییەکان کە بزوێنەریان هەیە دەنگ دەکەن کاتێک وەسڵ چاپدەکرێت.',
      printers_zones: 'پرینتەرەکان و زۆنەکان', pz_hint: 'گەڕان بۆ پرینتەر، تۆمارکردنیان، پاشان هەر جۆرێکی خواردن بنێرە بۆ پرینتەرەکەی.',
      desktop_only: 'تەنها لە بەرنامەی دیسکتۆپدا بەردەستە.',
      scan: 'گەڕان بۆ پرینتەر', scanning: 'گەڕان…', rescan: 'دووبارە گەڕان',
      scan_note: 'پرینتەری USB و پرینتەری ناو تۆڕ (پۆرت 9100) دەدۆزێتەوە.',
      found_printers: 'دۆزراوە', registered_printers: 'پرینتەرە تۆمارکراوەکان',
      no_found: 'هێشتا هیچ — کرتە لە «گەڕان بۆ پرینتەر» بکە.', no_registered: 'هێشتا هیچ پرینتەرێک تۆمار نەکراوە.',
      kind_system: 'USB / دامەزراو', kind_network: 'تۆڕ',
      register: 'تۆمارکردن', added: 'زیادکرا', already_added: 'پێشتر زیادکراوە', remove: 'لابردن', test: 'تاقیکردن',
      zones_title: 'زۆنەکانی چاپ', zones_hint: 'زۆنێک جۆرە دیاریکراوەکانی خواردن دەنێرێت بۆ پرینتەرێک.',
      add_zone: 'زیادکردنی زۆن', no_zones: 'هێشتا زۆن نییە.', zone_name: 'ناوی زۆن',
      zone_type: 'جۆر', ztype_customer: 'وەسڵی کڕیار (هەموو داواکاری)', ztype_items: 'وەسڵی چێشتخانە (جۆرە دیاریکراوەکان)',
      zone_printer: 'پرینتەر', zone_cats: 'جۆرەکانی خواردن', pick: 'هەڵبژێرە…',
      station: 'بەش', test_ticket: 'وەسڵی تاقیکردن',
      network: 'تۆڕ', your_pc: 'ئەم کۆمپیوتەرە', subnet: 'ساب‌نێت', gateway: 'ڕووتەر (گەیت‌وەی)',
      add_manually: 'زیادکردن بە دەستی', ip_address: 'ناونیشانی IP', port: 'پۆرت', printer_name: 'ناو (ئارەزوومەندانە)',
      add: 'زیادکردن', checking: 'پشکنین…', reachable: 'بەردەستە ✓', not_reachable: 'وەڵامی نەدایەوە — بەهەرحاڵ زیادکرا',
      manual_hint: 'ناونیشانی IP ی پرینتەر بنووسە (بۆ نموونە 192.168.1.50) و پۆرت (زۆرجار 9100).', bad_ip: 'IP ی دروست بنووسە، بۆ نموونە 192.168.1.50',
      help_title: 'چۆن پرینتەر پەیوەست بکەیت (ڕێنمایی خێرا)',
      help_1: 'پرینتەرەکە بە هەمان ڕووتەری ئەم کۆمپیوتەرەوە ببەستە (کێبڵی LAN باشترینە).',
      help_2: 'ڕێکخستنی تۆڕی چاپ بکە: پرینتەرەکە بکوژێنەوە، دووگمەی FEED دابگرە، بیکەرەوە — IP ی ئێستای چاپ دەکات.',
      help_3: 'IP ی پرینتەر دەبێت لەسەر هەمان ساب‌نێت بێت — هەمان سێ ژمارەی یەکەمی «ئەم کۆمپیوتەرە». نموونە: کۆمپیوتەر 192.168.1.20 ← پرینتەر 192.168.1.50.',
      help_4: 'بۆ گۆڕینی IP: IP ی ئێستای پرینتەر لە وێبگەڕدا بکەرەوە، یان بە ئامرازی «Net Config / Printer Setup» لەڕێی USB — IP ی جێگیر دابنێ، گەیت‌وەی = ڕووتەرەکەی سەرەوە، پۆرت 9100.',
      help_5: 'بگەڕێوە بۆ ئێرە ← گەڕان (یان زیادکردن بە دەستی) ← تاقیکردن. پاشان زۆنێکی بۆ دروستبکە.',
      manage_categories: 'جۆرەکان', cat_hint: 'جۆری خواردنی خۆت زیاد بکە، پاشان خواردنەکانیان بۆ دیاری بکە.',
      add_category: 'زیادکردنی جۆر', edit_category: 'دەستکاری جۆر', del_category: 'ئەم جۆرە بسڕێتەوە؟ خواردنەکان ناویان دەمێنێت بەڵام ئەم جۆرەیان نامێنێت.',
      cat_name_req: 'ناوی جۆر بنووسە', no_categories: 'هێشتا جۆر نییە — یەکێک زیاد بکە.',
      manage_users: 'بەکارهێنەران و دەسەڵات', users_hint: 'بۆ هەر کاشێرێک هەژمارێک دروستبکە و دیاری بکە چی دەبینێت.',
      add_user: 'زیادکردنی بەکارهێنەر', edit_user: 'دەستکاری بەکارهێنەر', del_user: 'ئەم بەکارهێنەرە بسڕێتەوە؟',
      disp_name: 'ناو', role: 'ڕۆڵ', role_admin: 'بەڕێوەبەر — دەسەڵاتی تەواو', role_staff: 'کاشێر — سنووردار',
      can_see: 'دەتوانێت ئەم بەشانە ببینێت', pw_keep: 'بەتاڵی بهێڵەرەوە بۆ هێشتنەوەی وشەی نهێنی', account_active: 'هەژمار چالاک',
      you_tag: 'تۆ', username_req: 'ناوی بەکارهێنەر: ٢–٣٢ پیت — پیت، ژمارە، . _ -', pw_req: 'وشەی نهێنی دەبێت لانیکەم ٣ پیت بێت',
      no_access: 'هێشتا دەستپێگەیشتنت نییە — داوا لە بەڕێوەبەر بکە بەشێکت پێبدات.',
      nav_reports: 'ڕاپۆرت',
      rng_today: 'ئەمڕۆ', rng_week: '٧ ڕۆژی ڕابردوو', rng_month: 'ئەم مانگە', rng_custom: 'دیاریکراو',
      rep_from: 'لە', rep_to: 'بۆ', rep_apply: 'پیشاندان',
      rep_total_sales: 'کۆی فرۆشتن', rep_orders: 'داواکارییەکان', rep_items: 'خواردنی فرۆشراو', rep_avg: 'ناوەندی داواکاری',
      rep_by_category: 'فرۆشتن بەپێی جۆر', rep_top_items: 'زۆرترین فرۆشراو', rep_by_day: 'فرۆشتنی ڕۆژانە',
      rep_print: 'چاپی کۆ', rep_title: 'ڕاپۆرتی فرۆشتن', rep_none: 'هیچ فرۆشتنێک لەم ماوەیەدا نییە.',
    },
    ar: {
      _dir: 'rtl', _name: 'العربية',
      brand2: 'بايتس',
      signin: 'تسجيل الدخول', username: 'اسم المستخدم', password: 'كلمة المرور',
      welcome: 'أهلاً بك', signin_sub: 'سجّل الدخول لبدء البيع.',
      bad_login: 'اسم المستخدم أو كلمة المرور خاطئة',
      nav_pos: 'نقطة البيع', nav_foods: 'الأصناف', nav_orders: 'الطلبات', nav_settings: 'الإعدادات', nav_kitchen: 'المطبخ',
      ready: 'جاهز', kitchen_empty: 'لا طلبات في المطبخ', reset_time: 'وقت تصفير ترقيم الطلبات', reset_time_hint: 'يبدأ الترقيم من جديد في هذا الوقت كل يوم', sent_kitchen: 'أُرسل إلى المطبخ',
      sec_sale: 'البيع', sec_manage: 'الإدارة',
      signed_in: 'مسجّل الدخول', logout: 'تسجيل الخروج',
      cat_all: 'الكل', cat_burgers: 'برجر', cat_sandwiches: 'ساندويتش', cat_sides: 'إضافات', cat_other: 'أخرى',
      cart: 'الطلب', empty_cart: 'اضغط على صنف لإضافته', total: 'الإجمالي', note_ph: 'ملاحظة (مثلاً بدون بصل)…',
      save_draft: 'حفظ (الدفع لاحقاً)', drafts_title: 'طلبات معلّقة', draft_saved: 'تم الحفظ', draft_name_title: 'حفظ — الدفع لاحقاً',
      draft_name_ph: 'اسم (مثلاً: طاولة ٥، قميص أحمر)', draft_replace_confirm: 'استبدال الطلب الحالي بهذا الطلب المعلّق؟', draft_del_confirm: 'حذف هذا الطلب المعلّق؟',
      print: 'طباعة', save_print: 'حفظ وطباعة', clear: 'مسح', arrange: 'ترتيب', arrange_done: 'تم',
      manage_foods: 'الأصناف', add_food: 'إضافة صنف', name_ku: 'الاسم (كردي)', name_ar: 'الاسم (عربي)',
      name_en: 'الاسم (إنجليزي)', category: 'الفئة', price: 'السعر', active: 'مُفعّل', actions: '',
      edit: 'تعديل', del: 'حذف', save: 'حفظ', cancel: 'إلغاء', confirm_del: 'حذف هذا الصنف؟',
      food_name: 'الصنف', th_price: 'السعر', th_status: 'الحالة',
      settings: 'الإعدادات', print_size: 'حجم طابعة الإيصال', business: 'معلومات المتجر',
      biz_name: 'اسم المتجر', slogan: 'الشعار', phone: 'رقم الهاتف', phones: 'أرقام الهاتف', phones_hint: 'رقم واحد في كل سطر — تظهر جميعها على الإيصال', def_lang: 'اللغة الافتراضية',
      saved: 'تم الحفظ', today: 'اليوم', sales_today: 'مبيعات اليوم', orders_total: 'الطلبات',
      no_orders: 'لا توجد طلبات بعد', order: 'طلب', qty: 'كمية', item: 'الصنف', date: 'التاريخ',
      details: 'التفاصيل', hide: 'إخفاء', unit_price: 'سعر الوحدة', lang_label: 'اللغة', line_total: 'الإجمالي', order_details: 'أصناف الطلب',
      r_thanks: 'شكراً! · نراكم مجدداً',
      need_items: 'أضف صنفاً واحداً على الأقل',
      order_saved: 'تم حفظ الطلب',
      receipt: 'الإيصال', print_receipt: 'طباعة الإيصال', close: 'إغلاق', printing: 'جارٍ الطباعة…', printed: 'تمت الطباعة', print_failed: 'فشلت الطباعة',
      show_preview: 'إظهار معاينة الإيصال', show_preview_hint: 'عند الإيقاف، يُطبع الإيصال مباشرة دون نافذة — أسرع لأمين الصندوق.',
      preview_on: 'مُفعّل', preview_off: 'مُطفأ',
      beep: 'صوت عند الطباعة', beep_hint: 'الطابعات الشبكية المزوّدة بجرس تُصدر صوتاً عند طباعة التذكرة.',
      printers_zones: 'الطابعات والمناطق', pz_hint: 'ابحث عن الطابعات، سجّلها، ثم وجّه كل فئة طعام إلى طابعتها.',
      desktop_only: 'متاح في تطبيق سطح المكتب.',
      scan: 'البحث عن الطابعات', scanning: 'جارٍ البحث…', rescan: 'إعادة البحث',
      scan_note: 'يعثر على طابعات USB والطابعات الشبكية (منفذ 9100) على هذه الشبكة.',
      found_printers: 'تم العثور', registered_printers: 'الطابعات المسجّلة',
      no_found: 'لا شيء بعد — اضغط «البحث عن الطابعات».', no_registered: 'لم تُسجّل أي طابعة بعد.',
      kind_system: 'USB / مثبّتة', kind_network: 'شبكة',
      register: 'تسجيل', added: 'أُضيفت', already_added: 'مضافة مسبقاً', remove: 'إزالة', test: 'اختبار',
      zones_title: 'مناطق الطباعة', zones_hint: 'المنطقة ترسل فئات الطعام المختارة إلى طابعة واحدة.',
      add_zone: 'إضافة منطقة', no_zones: 'لا مناطق بعد.', zone_name: 'اسم المنطقة',
      zone_type: 'النوع', ztype_customer: 'إيصال الزبون (الطلب كامل)', ztype_items: 'تذكرة المطبخ (الفئات المختارة)',
      zone_printer: 'الطابعة', zone_cats: 'فئات الطعام', pick: 'اختر…',
      station: 'القسم', test_ticket: 'تذكرة اختبار',
      network: 'الشبكة', your_pc: 'هذا الجهاز', subnet: 'الشبكة الفرعية', gateway: 'الراوتر (البوابة)',
      add_manually: 'إضافة يدوياً', ip_address: 'عنوان IP', port: 'المنفذ', printer_name: 'الاسم (اختياري)',
      add: 'إضافة', checking: 'جارٍ الفحص…', reachable: 'متصلة ✓', not_reachable: 'لا استجابة — أُضيفت على أي حال',
      manual_hint: 'أدخل IP الطابعة (مثل 192.168.1.50) والمنفذ (عادة 9100).', bad_ip: 'أدخل IP صحيحاً، مثل 192.168.1.50',
      help_title: 'كيفية توصيل الطابعة (دليل سريع)',
      help_1: 'صِل الطابعة بنفس راوتر هذا الجهاز (كابل LAN هو الأكثر موثوقية).',
      help_2: 'اطبع إعدادات الشبكة: أطفئ الطابعة، اضغط مطولاً زر FEED، ثم شغّلها — ستطبع IP الحالي.',
      help_3: 'يجب أن يكون IP الطابعة على شبكتك الفرعية — نفس الأرقام الثلاثة الأولى لـ«هذا الجهاز». مثال: الجهاز 192.168.1.20 ← الطابعة 192.168.1.50.',
      help_4: 'لتغيير IP: افتح IP الحالي للطابعة في المتصفح، أو استخدم أداة «Net Config / Printer Setup» عبر USB — عيّن IP ثابتاً، البوابة = الراوتر أعلاه، والمنفذ 9100.',
      help_5: 'عُد إلى هنا ← بحث (أو إضافة يدوياً) ← اختبار. ثم أنشئ له منطقة.',
      manage_categories: 'الفئات', cat_hint: 'أضف فئات الطعام الخاصة بك، ثم عيّن الأصناف لها.',
      add_category: 'إضافة فئة', edit_category: 'تعديل فئة', del_category: 'حذف هذه الفئة؟ تحتفظ الأصناف بأسمائها لكن تفقد هذه الفئة.',
      cat_name_req: 'أدخل اسم الفئة', no_categories: 'لا فئات بعد — أضف واحدة.',
      manage_users: 'المستخدمون والصلاحيات', users_hint: 'أنشئ حساباً لكل أمين صندوق واختر ما يمكنه رؤيته.',
      add_user: 'إضافة مستخدم', edit_user: 'تعديل مستخدم', del_user: 'حذف هذا المستخدم؟',
      disp_name: 'الاسم', role: 'الدور', role_admin: 'مدير — صلاحية كاملة', role_staff: 'أمين صندوق — محدود',
      can_see: 'يمكنه رؤية هذه الأقسام', pw_keep: 'اتركه فارغاً للإبقاء على كلمة المرور الحالية', account_active: 'الحساب مفعّل',
      you_tag: 'أنت', username_req: 'اسم المستخدم: 2–32 حرفاً — أحرف وأرقام و . _ -', pw_req: 'كلمة المرور 3 أحرف على الأقل',
      no_access: 'لا صلاحية بعد — اطلب من المدير منحك قسماً.',
      nav_reports: 'التقارير',
      rng_today: 'اليوم', rng_week: 'آخر 7 أيام', rng_month: 'هذا الشهر', rng_custom: 'مخصص',
      rep_from: 'من', rep_to: 'إلى', rep_apply: 'عرض',
      rep_total_sales: 'إجمالي المبيعات', rep_orders: 'الطلبات', rep_items: 'الأصناف المباعة', rep_avg: 'متوسط الطلب',
      rep_by_category: 'المبيعات حسب الفئة', rep_top_items: 'الأكثر مبيعاً', rep_by_day: 'المبيعات اليومية',
      rep_print: 'طباعة الإجمالي', rep_title: 'تقرير المبيعات', rep_none: 'لا مبيعات في هذه الفترة.',
    },
  };

  // Categories are user-managed (loaded from /api/categories). These read the live
  // list from state so POS tabs, the food modal, and zones all stay in sync.
  function cats() { return (state.categories || []).slice().sort(function (a, b) { return (a.sort_order - b.sort_order) || 0; }); }
  function catName(slug) {
    if (slug === 'other') return t('cat_other');
    var c = (state.categories || []).filter(function (x) { return x.id === slug; })[0];
    if (!c) return t('cat_other');
    return (state.lang === 'ar' ? (c.name_ar || c.name_ku || c.name_en) : state.lang === 'en' ? (c.name_en || c.name_ku || c.name_ar) : (c.name_ku || c.name_ar || c.name_en)) || c.id;
  }
  var SECTIONS = ['pos', 'orders', 'reports', 'foods', 'settings'];
  // section access: admin sees everything; staff only its granted sections
  function canSee(section) {
    var u = state.user || {};
    if (u.role === 'admin') return true;
    return (u.sections || []).indexOf(section) >= 0;
  }
  function isAdmin() { return (state.user || {}).role === 'admin'; }
  // set by the printers/zones panel so the categories panel can refresh zone
  // checkboxes in place (avoids a full renderApp that would drop unsaved form edits)
  var _zonesReload = null;

  var state = {
    token: localStorage.getItem(TOKEN_KEY) || null,
    user: null,
    lang: localStorage.getItem(LANG_KEY) || 'ku',
    view: 'pos',
    foods: [],
    categories: [],
    settings: {},
    printerCfg: { printers: [], zones: [] },
    cart: [],          // [{ id, name, price, qty, note }]
    drafts: [],        // held "pay later" orders (from /api/drafts)
    cat: 'all',
    sidebarOpen: false,
    cartOpen: false,
  };
  if (!I18N[state.lang]) state.lang = 'ku';

  var app = document.getElementById('app');
  var printRoot = document.getElementById('print-root');
  function t(k) { return (I18N[state.lang] && I18N[state.lang][k]) || I18N.en[k] || k; }

  /* ------------------------------ helpers ------------------------------ */
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.slice(0, 2) === 'on') n[k] = attrs[k];
      else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c != null && c !== false) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function api(path, opts) {
    opts = opts || {};
    var h = { 'Content-Type': 'application/json' };
    if (state.token) h.Authorization = 'Bearer ' + state.token;
    return fetch(API + path, { method: opts.method || 'GET', headers: h, body: opts.body || undefined })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok) { var e = new Error((data && data.error) || 'Request failed'); e.status = res.status; throw e; }
          return data;
        });
      });
  }
  var toastEl = null;
  function toast(msg, kind) {
    if (!toastEl) { toastEl = el('div', { class: 'toast' }); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.className = 'toast show ' + (kind || '');
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.className = 'toast ' + (kind || ''); }, 2400);
  }
  function money(n) { var v = Math.round(Number(n) || 0); return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function phoneList() {
    var raw = state.settings.phones || state.settings.phone || '0750 947 1000';
    return String(raw).split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function foodName(f, lang) {
    lang = lang || state.lang;
    if (lang === 'ar') return f.name_ar || f.name_ku || f.name_en;
    if (lang === 'en') return f.name_en || f.name_ku || f.name_ar;
    return f.name_ku || f.name_ar || f.name_en;
  }
  function applyDir() {
    var d = I18N[state.lang]._dir;
    document.documentElement.dir = d; document.documentElement.lang = state.lang;
  }
  function setLang(l) {
    if (!I18N[l]) return;
    state.lang = l; localStorage.setItem(LANG_KEY, l); applyDir();
    if (state.token && state.user) renderApp(); else renderLogin();
  }
  function logout() {
    var done = function () { clearInterval(window._clk); window._clk = null; state.token = null; state.user = null; localStorage.removeItem(TOKEN_KEY); renderLogin(); };
    if (state.token) api('/logout', { method: 'POST' }).then(done, done); else done();
  }

  /* ------------------------------ LOGIN ------------------------------ */
  function renderLogin() {
    applyDir(); app.textContent = '';
    var errBox = el('div', { class: 'err', style: 'display:none' });
    var u = el('input', { class: 'input', id: 'u', autocomplete: 'username', autocapitalize: 'none' });
    var p = el('input', { class: 'input', id: 'p', type: 'password', autocomplete: 'current-password' });
    var btn = el('button', { class: 'btn full lg', type: 'submit', text: t('signin') });

    var langRow = el('div', { class: 'langsel', style: 'margin-top:18px' },
      ['ku', 'ar', 'en'].map(function (l) {
        return el('button', { type: 'button', class: state.lang === l ? 'on' : '', text: I18N[l]._name,
          onclick: function () { setLang(l); } });
      }));

    var form = el('form', { class: 'login-card', onsubmit: function (e) {
      e.preventDefault(); errBox.style.display = 'none';
      btn.disabled = true; btn.textContent = ''; btn.appendChild(el('span', { class: 'spin' }));
      api('/login', { method: 'POST', body: JSON.stringify({ username: u.value, password: p.value }) })
        .then(function (d) { state.token = d.token; state.user = d.user; localStorage.setItem(TOKEN_KEY, d.token); boot(); })
        .catch(function (e) {
          errBox.textContent = e.status === 429 ? (e.message || t('bad_login')) : t('bad_login');
          errBox.style.display = ''; btn.disabled = false; btn.textContent = t('signin'); p.value = ''; p.focus();
        });
    } }, [
      el('div', { class: 'logo-badge', text: 'NB' }),
      el('div', { class: 'login-brand' }, ['NIGHT ', el('span', { class: 'b2', text: 'BITES' })]),
      el('div', { class: 'login-sub', text: t('signin_sub') }),
      errBox,
      el('div', { class: 'field' }, [el('label', { text: t('username') }), u]),
      el('div', { class: 'field' }, [el('label', { text: t('password') }), p]),
      btn, langRow,
    ]);
    app.appendChild(el('div', { class: 'login-screen' }, [form]));
    u.focus();
  }

  /* ------------------------------ APP SHELL ------------------------------ */
  function navItem(key, icon, label) {
    var kids = [];
    if (icon) kids.push(el('span', { class: 'ico', text: icon }));
    kids.push(el('span', { text: label }));
    return el('button', { class: 'sb-item' + (state.view === key ? ' active' : ''),
      onclick: function () { state.view = key; state.sidebarOpen = false; renderApp(); } }, kids);
  }

  function renderApp() {
    applyDir(); app.textContent = '';
    if (state.view === 'kitchen') state.view = 'pos';   // kitchen display hidden for now
    // section access: admin sees all; staff sees only its granted sections
    var allowed = SECTIONS.filter(canSee);
    if (!allowed.length) state.view = null;                 // no sections granted → no access
    else if (!canSee(state.view)) state.view = allowed[0];
    var name = (state.user && (state.user.display_name || state.user.username)) || '';

    var sidebar = el('aside', { class: 'sidebar' + (state.sidebarOpen ? ' open' : '') }, [
      el('div', { class: 'sb-brand' }, [
        el('div', { class: 'dot', text: 'NB' }),
        el('div', {}, [
          el('div', { class: 'name' }, ['NIGHT ', el('span', { class: 'b2', text: 'BITES' })]),
        ]),
      ]),
      el('nav', { class: 'sb-nav' }, (function () {
        var items = [];
        var sale = [];
        if (canSee('pos')) sale.push(navItem('pos', '', t('nav_pos')));
        if (canSee('orders')) sale.push(navItem('orders', '', t('nav_orders')));
        if (canSee('reports')) sale.push(navItem('reports', '', t('nav_reports')));
        if (sale.length) { items.push(el('div', { class: 'sb-sec', text: t('sec_sale') })); items = items.concat(sale); }
        var manage = [];
        if (canSee('foods')) manage.push(navItem('foods', '', t('nav_foods')));
        if (canSee('settings')) manage.push(navItem('settings', '', t('nav_settings')));
        if (manage.length) { items.push(el('div', { class: 'sb-sec', text: t('sec_manage') })); items = items.concat(manage); }
        return items;
      })()),
      el('div', { class: 'sb-foot' }, [
        el('div', { class: 'langsel' }, ['ku', 'ar', 'en'].map(function (l) {
          return el('button', { class: state.lang === l ? 'on' : '', text: I18N[l]._name, onclick: function () { setLang(l); } });
        })),
        el('div', { class: 'sb-user' }, [el('strong', { text: name }), t('signed_in')]),
        el('button', { class: 'sb-logout', text: t('logout'), onclick: logout }),
      ]),
    ]);

    var overlay = el('div', { class: 'overlay' + (state.sidebarOpen ? ' show' : ''),
      onclick: function () { state.sidebarOpen = false; renderApp(); } });

    var clock = el('div', { class: 'clock' });
    function tick() { var d = new Date(); clock.textContent = d.toLocaleDateString(state.lang === 'en' ? 'en-GB' : 'en-GB') + '  ·  ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); }
    tick(); clearInterval(window._clk); window._clk = setInterval(tick, 1000 * 20);
    clearInterval(window._kpoll); window._kpoll = null;

    var titles = { pos: t('nav_pos'), orders: t('nav_orders'), reports: t('nav_reports'), kitchen: t('nav_kitchen'), foods: t('nav_foods'), settings: t('nav_settings') };
    var body = el('div', { class: 'wrap' });
    var main = el('div', { class: 'main' }, [
      el('header', { class: 'topbar' }, [
        el('button', { class: 'hamburger', 'aria-label': 'Menu', onclick: function () { state.sidebarOpen = !state.sidebarOpen; renderApp(); } }, [el('span')]),
        el('h1', { text: titles[state.view] || '' }), clock,
      ]),
      body,
      el('div', { class: 'foot-phone' }, [el('strong', { dir: 'ltr', style: 'display:inline-block', text: phoneList().join('  ·  ') })]),
    ]);

    app.appendChild(el('div', { class: 'shell' }, [sidebar, overlay, main]));

    if (state.view === 'pos') renderPOS(main, body);
    else if (state.view === 'foods') renderFoods(body);
    else if (state.view === 'orders') renderOrders(body);
    else if (state.view === 'reports') renderReports(body);
    else if (state.view === 'settings') renderSettings(body);
    else body.appendChild(el('div', { class: 'empty' }, [el('h3', { text: t('no_access') })]));
  }

  /* ------------------------------ POS ------------------------------ */
  function liveFood(id) { return state.foods.filter(function (x) { return x.id === id; })[0] || null; }
  // resolve name/price LIVE from state.foods (fall back to the add-time snapshot only if the food
  // was removed), so a mid-order language switch or a price edit shows in the cart and matches what
  // the server actually charges at checkout.
  function cartName(c) { var f = liveFood(c.id); return f ? foodName(f) : c.name; }
  function cartPrice(c) { var f = liveFood(c.id); return f ? f.price : c.price; }
  function cartTotal() { return state.cart.reduce(function (s, c) { return s + cartPrice(c) * c.qty; }, 0); }
  function cartCount() { return state.cart.reduce(function (s, c) { return s + c.qty; }, 0); }
  function addToCart(f) {
    var ex = state.cart.filter(function (c) { return c.id === f.id; })[0];
    if (ex) ex.qty += 1; else state.cart.push({ id: f.id, name: foodName(f), price: f.price, qty: 1, note: '' });
  }

  function renderPOS(main, host) {
    var arrange = false;
    var dragEl = null, dragMoved = false;
    var checkingOut = false;   // re-entrancy guard so a double-tap can't save the order twice
    host.className = 'wrap'; host.style.padding = '0';
    var pos = el('div', { class: 'pos' });
    var menuWrap = el('div', { class: 'menu-wrap' });
    var catBar = el('div', { class: 'cat-bar' });
    var grid = el('div', { class: 'menu-grid' });
    var cartEl = el('aside', { class: 'cart' + (state.cartOpen ? ' open' : '') });
    var draftStrip = el('div', { class: 'draft-strip' });

    function drawCats() {
      catBar.textContent = '';
      var tabs = [{ id: 'all', name: t('cat_all') }].concat(cats().map(function (c) { return { id: c.id, name: catName(c.id) }; }));
      tabs.forEach(function (tb) {
        catBar.appendChild(el('button', { class: 'cat-b' + (state.cat === tb.id ? ' on' : ''),
          text: tb.name, onclick: function () { if (arrange) return; state.cat = tb.id; drawCats(); drawGrid(); } }));
      });
      catBar.appendChild(el('button', { class: 'cat-b arrange-b' + (arrange ? ' on' : ''),
        text: arrange ? t('arrange_done') : t('arrange'),
        onclick: function () { arrange = !arrange; if (arrange) state.cat = 'all'; drawCats(); drawGrid(); } }));
    }
    function persistOrder() {
      var ids = Array.prototype.slice.call(grid.children)
        .map(function (c) { return Number(c.getAttribute('data-fid')); }).filter(Boolean);
      state.foods.sort(function (a, b) { return ids.indexOf(a.id) - ids.indexOf(b.id); });
      api('/foods/reorder', { method: 'POST', body: JSON.stringify({ ids: ids }) })
        .then(function () { toast(t('saved'), 'ok'); })
        .catch(function (e) { if (e.status === 401) return logout(); toast(e.message, 'bad'); });
    }
    function bindDrag(card) {
      card.addEventListener('pointerdown', function (e) {
        if (!arrange) return;
        e.preventDefault();
        dragEl = card; dragMoved = false; card.classList.add('dragging');
        try { card.setPointerCapture(e.pointerId); } catch (_) {}
      });
      card.addEventListener('pointermove', function (e) {
        if (!arrange || !dragEl) return;
        dragMoved = true;
        dragEl.style.pointerEvents = 'none';
        var over = document.elementFromPoint(e.clientX, e.clientY);
        dragEl.style.pointerEvents = '';
        var overCard = over && over.closest ? over.closest('.food-card') : null;
        if (overCard && overCard !== dragEl && overCard.parentNode === grid) {
          var kids = Array.prototype.slice.call(grid.children);
          if (kids.indexOf(dragEl) < kids.indexOf(overCard)) grid.insertBefore(dragEl, overCard.nextSibling);
          else grid.insertBefore(dragEl, overCard);
        }
      });
      function endDrag() {
        if (!dragEl) return;
        dragEl.classList.remove('dragging'); dragEl.style.pointerEvents = '';
        var moved = dragMoved; dragEl = null;
        if (moved) persistOrder();
      }
      card.addEventListener('pointerup', endDrag);
      card.addEventListener('pointercancel', endDrag);
    }
    function drawGrid() {
      grid.textContent = '';
      grid.classList.toggle('arranging', arrange);
      var list = arrange ? state.foods
        : state.foods.filter(function (f) { return state.cat === 'all' || (f.category || 'other') === state.cat; });
      if (!list.length) { grid.appendChild(el('div', { class: 'empty', style: 'grid-column:1/-1' }, [el('h3', { text: '—' })])); return; }
      list.forEach(function (f) {
        var inCart = state.cart.filter(function (c) { return c.id === f.id; })[0];
        var card = el('div', { class: 'food-card', 'data-fid': f.id, onclick: function () {
          if (arrange) return;
          addToCart(f); drawGrid(); drawCart();
          if (window.innerWidth <= 1000) { state.cartOpen = true; cartEl.classList.add('open'); }
        } }, [
          arrange ? el('span', { class: 'fgrip', text: '⋮⋮' })
                  : (inCart ? el('span', { class: 'qbadge', text: String(inCart.qty) }) : el('span', { class: 'fadd', text: '+' })),
          el('div', { class: 'fname', text: foodName(f) }),
          el('div', { class: 'fprice' }, [money(f.price) + ' ', el('small', { text: state.settings.currency || 'IQD' })]),
        ]);
        if (arrange) bindDrag(card);
        grid.appendChild(card);
      });
    }
    function drawCart() {
      cartEl.textContent = '';
      var grip = el('div', { class: 'cart-grip' });
      var head = el('div', { class: 'cart-head', onclick: function () { if (window.innerWidth <= 1000) { state.cartOpen = !state.cartOpen; cartEl.classList.toggle('open', state.cartOpen); } } }, [
        el('h3', { text: t('cart') }), el('span', { class: 'cc', text: String(cartCount()) }),
      ]);
      var bodyC = el('div', { class: 'cart-body' });
      if (!state.cart.length) {
        bodyC.appendChild(el('div', { class: 'cart-empty' }, [el('div', { text: t('empty_cart') })]));
      } else {
        state.cart.forEach(function (c) {
          var noteInput = el('input', { class: 'ci-note', type: 'text', dir: 'auto', value: c.note || '', placeholder: t('note_ph'),
            oninput: function (e) { c.note = e.target.value; } });
          bodyC.appendChild(el('div', { class: 'cart-item' + ((c.note || '').trim() ? ' has-note' : '') }, [
            el('div', { class: 'ci-main' }, [
              el('div', { class: 'ci-name' }, [el('div', { class: 'n', text: cartName(c) }), el('div', { class: 'p', text: money(cartPrice(c)) })]),
              el('div', { class: 'qty' }, [
                el('button', { text: '−', onclick: function () { c.qty -= 1; if (c.qty <= 0) state.cart = state.cart.filter(function (x) { return x !== c; }); drawGrid(); drawCart(); } }),
                el('span', { class: 'q', text: String(c.qty) }),
                el('button', { text: '+', onclick: function () { c.qty += 1; drawGrid(); drawCart(); } }),
              ]),
              el('div', { class: 'ci-tot', text: money(cartPrice(c) * c.qty) }),
              el('div', { class: 'ci-del', text: '✕', onclick: function () { state.cart = state.cart.filter(function (x) { return x !== c; }); drawGrid(); drawCart(); } }),
            ]),
            noteInput,
          ]));
        });
      }
      var foot = el('div', { class: 'cart-foot' }, [
        el('div', { class: 'cart-total' }, [
          el('span', { class: 'lbl', text: t('total') }),
          el('span', { class: 'val' }, [money(cartTotal()) + ' ', el('small', { text: state.settings.currency || 'IQD' })]),
        ]),
        el('div', { class: 'cart-actions' }, [
          el('button', { class: 'btn gray', onclick: function () { checkout(false); } }, [t('print')]),
          el('button', { class: 'btn green', onclick: function () { checkout(true); } }, [t('save_print')]),
        ]),
        state.cart.length ? el('button', { class: 'btn hold', onclick: function () { saveDraft(); } }, ['⏸ ' + t('save_draft')]) : null,
        state.cart.length ? el('button', { class: 'cart-clear', text: t('clear'), onclick: function () { state.cart = []; drawGrid(); drawCart(); } }) : null,
      ]);
      cartEl.appendChild(grip); cartEl.appendChild(head); cartEl.appendChild(bodyC); cartEl.appendChild(foot);
    }

    /* ---- drafts: held "pay later" carts, shown as cards above the menu ---- */
    function draftTime(iso) { var d = new Date(iso); return isNaN(d) ? '' : d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); }
    function drawDrafts() {
      draftStrip.textContent = '';
      var list = state.drafts || [];
      if (!list.length) { draftStrip.classList.remove('has'); return; }
      draftStrip.classList.add('has');
      draftStrip.appendChild(el('div', { class: 'draft-strip-lbl', text: t('drafts_title') + ' · ' + list.length }));
      var row = el('div', { class: 'draft-cards' });
      var cur = state.settings.currency || 'IQD';
      list.forEach(function (d) {
        row.appendChild(el('div', { class: 'draft-card', onclick: function () { recallDraft(d); } }, [
          el('button', { class: 'dc-del', text: '✕', onclick: function (e) { e.stopPropagation(); deleteDraft(d); } }),
          el('div', { class: 'dc-name', dir: 'auto', text: d.name || ('#' + d.id) }),
          el('div', { class: 'dc-meta', dir: 'ltr', text: d.item_count + '× · ' + money(d.total) + ' ' + cur }),
          el('div', { class: 'dc-time', dir: 'ltr', text: draftTime(d.created_at) }),
        ]));
      });
      draftStrip.appendChild(row);
    }
    function refreshDrafts() { api('/drafts').then(function (d) { state.drafts = d.drafts || []; drawDrafts(); }).catch(function () {}); }
    function saveDraft() {
      if (!state.cart.length) { toast(t('need_items'), 'bad'); return; }
      askDraftName(function (name) {
        var items = state.cart.map(function (c) { return { food_id: c.id, name: cartName(c), price: cartPrice(c), qty: c.qty, note: c.note || '' }; });
        api('/drafts', { method: 'POST', body: JSON.stringify({ name: name, lang: state.lang, items: items }) })
          .then(function (d) { state.drafts.push(d.draft); state.cart = []; state.cartOpen = false; cartEl.classList.remove('open'); drawGrid(); drawCart(); drawDrafts(); toast(t('draft_saved'), 'ok'); })
          .catch(function (e) { if (e.status === 401) return logout(); toast(e.message || 'Error', 'bad'); });
      });
    }
    function recallDraft(d) {
      var go = function () {
        state.cart = (d.items || []).map(function (it) { var f = liveFood(it.food_id); return { id: it.food_id, name: f ? foodName(f) : (it.name || ''), price: f ? f.price : it.price, qty: it.qty, note: it.note || '' }; });
        state.drafts = state.drafts.filter(function (x) { return x.id !== d.id; });
        api('/drafts/' + d.id, { method: 'DELETE' }).catch(function () {});
        state.cartOpen = true; cartEl.classList.add('open'); drawGrid(); drawCart(); drawDrafts();
      };
      if (state.cart.length) { if (!confirm(t('draft_replace_confirm'))) return; }
      go();
    }
    function deleteDraft(d) {
      if (!confirm(t('draft_del_confirm'))) return;
      state.drafts = state.drafts.filter(function (x) { return x.id !== d.id; }); drawDrafts();
      api('/drafts/' + d.id, { method: 'DELETE' }).catch(function (e) { if (e && e.status === 401) return logout(); refreshDrafts(); });
    }
    function askDraftName(cb) {
      var bg = el('div', { class: 'modal-bg' });
      function close() { if (bg.parentNode) document.body.removeChild(bg); }
      bg.onclick = function (e) { if (e.target === bg) close(); };
      var input = el('input', { class: 'input', type: 'text', dir: 'auto', placeholder: t('draft_name_ph') });
      var saveB = el('button', { class: 'btn green', text: t('save_draft') });
      saveB.onclick = function () { var v = (input.value || '').trim(); close(); cb(v); };
      input.onkeydown = function (e) { if (e.key === 'Enter') saveB.onclick(); };
      bg.appendChild(el('div', { class: 'modal' }, [
        el('h3', { text: t('draft_name_title') }), input,
        el('div', { class: 'modal-actions' }, [el('button', { class: 'btn gray', text: t('close'), onclick: close }), saveB]),
      ]));
      document.body.appendChild(bg);
      setTimeout(function () { try { input.focus(); } catch (_) {} }, 30);
    }

    // both buttons save (a receipt must reflect a real, saved order). Green also
    // fires the kitchen/station tickets; gray prints just the customer receipt.
    function checkout(withStations) {
      if (checkingOut) return;                                  // ignore a rapid second tap
      if (!state.cart.length) { toast(t('need_items'), 'bad'); return; }
      checkingOut = true;
      var payload = { lang: state.lang, items: state.cart.map(function (c) { return { food_id: c.id, qty: c.qty, note: c.note || '' }; }) };
      api('/orders', { method: 'POST', body: JSON.stringify(payload) })
        .then(function (d) {
          if (withStations) routeStations(d.order);
          printOrder(d.order);
          toast(t('order_saved') + ' · #' + d.order.order_no, 'ok');
          state.cart = []; state.cartOpen = false; drawGrid(); drawCart(); cartEl.classList.remove('open');
        })
        .catch(function (e) {
          if (e.status === 401) return logout();
          // 409 = a food in the cart was deleted under a stale grid; refresh the menu so it disappears
          if (e.status === 409) { api('/foods').then(function (d) { state.foods = d.foods || []; drawGrid(); drawCart(); }).catch(function () {}); }
          toast(e.message || 'Error', 'bad');
        })
        .then(function () { checkingOut = false; }, function () { checkingOut = false; });
    }

    menuWrap.appendChild(draftStrip); menuWrap.appendChild(catBar); menuWrap.appendChild(grid);
    pos.appendChild(menuWrap); pos.appendChild(cartEl);
    host.appendChild(pos);
    drawCats(); drawGrid(); drawCart(); drawDrafts(); refreshDrafts();
  }

  /* ------------------------------ FOODS MGMT ------------------------------ */
  function renderFoods(host) {
    var listBox = el('div');
    function load() {
      api('/foods?all=1').then(function (d) {
        draw(d.foods || []);
        // keep the shared POS list (grid + cart prices) in sync — it is otherwise only loaded at boot,
        // so a food added/edited/deleted here would be stale on the register until an app restart.
        state.foods = (d.foods || []).filter(function (f) { return f.is_active; });
      }).catch(function (e) { if (e.status === 401) return logout(); });
    }
    function draw(rows) {
      listBox.textContent = '';
      if (!rows.length) { listBox.appendChild(el('div', { class: 'empty' }, [el('h3', { text: t('no_orders') })])); return; }
      var tbody = el('tbody');
      rows.forEach(function (f) {
        tbody.appendChild(el('tr', {}, [
          el('td', { 'data-l': t('food_name') }, [
            el('div', { style: 'font-weight:800', text: foodName(f) }),
            el('div', { style: 'font-size:12px;color:var(--faint)', text: [f.name_ku, f.name_ar, f.name_en].filter(Boolean).join(' · ') }),
          ]),
          el('td', { 'data-l': t('category') }, [el('span', { style: 'color:var(--muted)', text: f.category ? catName(f.category) : '—' })]),
          el('td', { 'data-l': t('th_price') }, [el('span', { class: 'fmoney', text: money(f.price) })]),
          el('td', { 'data-l': t('th_status') }, [el('span', { class: 'pill ' + (f.is_active ? 'on' : 'off'), text: f.is_active ? t('active') : '—' })]),
          el('td', {}, [el('div', { class: 'rowbtns' }, [
            el('button', { class: 'btn-ghost', text: t('edit'), onclick: function () { foodModal(f, load); } }),
            el('button', { class: 'btn-ghost danger', text: t('del'), onclick: function () {
              if (!confirm(t('confirm_del'))) return;
              api('/foods/' + f.id, { method: 'DELETE' }).then(function () { toast(t('saved'), 'ok'); load(); }).catch(function (e) { if (e.status === 401) return logout(); toast(e.message, 'bad'); });
            } }),
          ])]),
        ]));
      });
      listBox.appendChild(el('table', { class: 'tbl' }, [
        el('thead', {}, [el('tr', {}, [el('th', { text: t('food_name') }), el('th', { text: t('category') }), el('th', { text: t('th_price') }), el('th', { text: t('th_status') }), el('th', {})])]),
        tbody,
      ]));
    }
    host.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'ph-head' }, [
        el('h2', { text: t('manage_foods') }),
        el('button', { class: 'btn', onclick: function () { foodModal(null, load); } }, [t('add_food')]),
      ]),
      listBox,
    ]));
    load();
  }

  function foodModal(food, onSaved) {
    var editing = food || null;
    var f = {
      name_ku: el('input', { class: 'input', value: editing ? editing.name_ku : '' }),
      name_ar: el('input', { class: 'input', value: editing ? editing.name_ar : '' }),
      name_en: el('input', { class: 'input', value: editing ? editing.name_en : '' }),
      category: el('select', { class: 'input' }),
      price: el('input', { class: 'input', type: 'number', min: '0', step: '250', value: editing ? editing.price : '' }),
    };
    var catOpts = [['', '—']].concat(cats().map(function (c) { return [c.id, catName(c.id)]; }));
    // keep an existing food's category selectable even if that category was removed
    if (editing && editing.category && !cats().some(function (c) { return c.id === editing.category; })) catOpts.push([editing.category, editing.category]);
    catOpts.forEach(function (o) {
      var opt = el('option', { value: o[0], text: o[1] });
      if (editing && editing.category === o[0]) opt.selected = true;
      f.category.appendChild(opt);
    });
    var activeChk = el('input', { type: 'checkbox' }); activeChk.checked = editing ? editing.is_active : true;
    var errBox = el('div', { class: 'err', style: 'display:none' });

    var bg = el('div', { class: 'modal-bg', onclick: function (e) { if (e.target === bg) document.body.removeChild(bg); } });
    var saveBtn = el('button', { class: 'btn' , text: t('save') });
    saveBtn.onclick = function () {
      var body = { name_ku: f.name_ku.value, name_ar: f.name_ar.value, name_en: f.name_en.value,
        category: f.category.value, price: f.price.value, is_active: activeChk.checked };
      if (!body.name_ku && !body.name_ar && !body.name_en) { errBox.textContent = t('name_ku'); errBox.style.display = ''; return; }
      // category is optional — an empty category routes/displays as 'other' everywhere
      saveBtn.disabled = true;
      var req = editing ? api('/foods/' + editing.id, { method: 'PUT', body: JSON.stringify(body) })
                        : api('/foods', { method: 'POST', body: JSON.stringify(body) });
      req.then(function () { toast(t('saved'), 'ok'); document.body.removeChild(bg); onSaved(); })
        .catch(function (e) { if (e.status === 401) return logout(); errBox.textContent = e.message; errBox.style.display = ''; saveBtn.disabled = false; });
    };

    bg.appendChild(el('div', { class: 'modal' }, [
      el('h3', { text: editing ? t('edit') : t('add_food') }),
      errBox,
      el('div', { class: 'field' }, [el('label', { text: t('name_ku') }), f.name_ku]),
      el('div', { class: 'row2' }, [
        el('div', { class: 'field' }, [el('label', { text: t('name_ar') }), f.name_ar]),
        el('div', { class: 'field' }, [el('label', { text: t('name_en') }), f.name_en]),
      ]),
      el('div', { class: 'row2' }, [
        el('div', { class: 'field' }, [el('label', { text: t('category') }), f.category]),
        el('div', { class: 'field' }, [el('label', { text: t('price') }), f.price]),
      ]),
      el('label', { class: 'field', style: 'display:flex;align-items:center;gap:10px;cursor:pointer' }, [activeChk, el('span', { text: t('active') })]),
      el('div', { class: 'modal-actions' }, [
        el('button', { class: 'btn gray', text: t('cancel'), onclick: function () { document.body.removeChild(bg); } }),
        saveBtn,
      ]),
    ]));
    document.body.appendChild(bg);
    f.name_ku.focus();
  }

  /* ------------------------------ ORDERS ------------------------------ */
  function renderOrders(host) {
    var statsRow = el('div', { class: 'stats' });
    [t('orders_total'), t('today'), t('sales_today')].forEach(function (k) {
      statsRow.appendChild(el('div', { class: 'stat' }, [el('div', { class: 'k', text: k }), el('div', { class: 'v', text: '—' })]));
    });
    statsRow.children[2].querySelector('.v').classList.add('gold');
    var listBox = el('div');
    function load() {
      api('/orders?limit=100').then(function (d) { draw(d.orders || []); }).catch(function (e) { if (e.status === 401) return logout(); });
      api('/orders/stats').then(function (s) {
        var vals = [s.total, s.today, money(s.today_sales) + ' ' + (state.settings.currency || 'IQD')];
        Array.prototype.forEach.call(statsRow.children, function (n, i) { n.querySelector('.v').textContent = String(vals[i]); });
      }).catch(function () {});
    }
    function draw(rows) {
      listBox.textContent = '';
      if (!rows.length) { listBox.appendChild(el('div', { class: 'empty' }, [el('h3', { text: t('no_orders') })])); return; }
      var box = el('div', { class: 'order-list' });
      rows.forEach(function (o) {
        var d = new Date(String(o.created_at).replace(' ', 'T'));
        var cur = state.settings.currency || 'IQD';
        var loaded = false;
        var body = el('div', { class: 'od-body' });
        var chev = el('span', { class: 'od-chev', text: '⌄' });

        var head = el('div', { class: 'od-head', onclick: function () {
          var open = card.classList.toggle('open');
          if (open && !loaded) {
            body.appendChild(el('div', { class: 'od-loading', text: '…' }));
            api('/orders/' + o.id).then(function (r) { loaded = true; fill(r.order); })
              .catch(function (e) { body.textContent = ''; if (e.status === 401) return logout(); toast(e.message, 'bad'); });
          }
        } }, [
          el('span', { class: 'od-no', text: '#' + o.order_no }),
          el('span', { class: 'od-count', text: o.item_count + '× ' + t('item') }),
          el('span', { class: 'od-tot', text: money(o.total) + ' ' + cur }),
          el('span', { class: 'od-date', text: isNaN(d) ? String(o.created_at) : d.toLocaleString('en-GB') }),
          chev,
        ]);

        function fill(order) {
          body.textContent = '';
          (order.items || []).forEach(function (it) {
            body.appendChild(el('div', { class: 'od-item' }, [
              el('span', { class: 'od-iname', text: it.name + ((it.note || '').trim() ? '  » ' + (it.note || '').trim() : '') }),
              el('span', { class: 'od-iq', text: '×' + it.qty }),
              el('span', { class: 'od-iu', text: money(it.price) + ' ' + cur }),
              el('span', { class: 'od-ilt', text: money(it.line_total) + ' ' + cur }),
            ]));
          });
          body.appendChild(el('div', { class: 'od-foot' }, [
            el('span', { class: 'od-lang', text: t('lang_label') + ': ' + (I18N[order.lang] ? I18N[order.lang]._name : order.lang) }),
            el('button', { class: 'btn-ghost', text: t('print'), onclick: function (e) { e.stopPropagation();
              printOrder(order); } }),
            el('span', { class: 'od-gtot' }, [t('total') + ': ', el('strong', { text: money(order.total) + ' ' + cur })]),
          ]));
        }

        var card = el('div', { class: 'od-card' }, [head, body]);
        box.appendChild(card);
      });
      listBox.appendChild(box);
    }
    host.appendChild(statsRow);
    host.appendChild(el('div', { class: 'panel' }, [listBox]));
    load();
  }

  /* ------------------------------ REPORTS ------------------------------ */
  function renderReports(host) {
    var range = 'today';
    var cur = state.settings.currency || 'IQD';
    var data = null;
    var fromI = el('input', { class: 'input', type: 'date', dir: 'ltr' });
    var toI = el('input', { class: 'input', type: 'date', dir: 'ltr' });
    var body = el('div');
    var printBtn = el('button', { class: 'btn gray', text: t('rep_print'), onclick: function () { if (data && data.orders) printReport(data); } });

    var tabs = el('div', { class: 'seg rep-tabs' });
    [['today', t('rng_today')], ['week', t('rng_week')], ['month', t('rng_month')], ['custom', t('rng_custom')]].forEach(function (o) {
      tabs.appendChild(el('button', { class: 'seg-b' + (range === o[0] ? ' on' : ''), text: o[1], onclick: function () {
        range = o[0]; Array.prototype.forEach.call(tabs.children, function (b) { b.classList.remove('on'); }); this.classList.add('on');
        customRow.style.display = range === 'custom' ? '' : 'none';
        if (range !== 'custom') load();
      } }));
    });
    var customRow = el('div', { class: 'rep-custom', style: 'display:none' }, [
      el('div', { class: 'field' }, [el('label', { text: t('rep_from') }), fromI]),
      el('div', { class: 'field' }, [el('label', { text: t('rep_to') }), toI]),
      el('button', { class: 'btn', text: t('rep_apply'), onclick: function () { load(); } }),
    ]);

    function money2(n) { return money(n) + ' ' + cur; }
    function load() {
      if (range === 'custom' && !fromI.value && !toI.value) return;   // wait for a date
      var qs = range === 'custom'
        ? ('from=' + encodeURIComponent(fromI.value || '') + '&to=' + encodeURIComponent(toI.value || ''))
        : ('range=' + range);
      body.textContent = ''; body.appendChild(el('div', { class: 'od-loading', text: '…' }));
      api('/reports?' + qs).then(function (d) { data = d; draw(d); })
        .catch(function (e) { if (e.status === 401) return logout(); toast(e.message, 'bad'); });
    }
    function statTile(k, v, gold) {
      return el('div', { class: 'stat' }, [el('div', { class: 'k', text: k }), el('div', { class: 'v' + (gold ? ' gold' : ''), dir: 'ltr', text: v })]);
    }
    function panelList(title, rows) {
      var box = el('div', { class: 'panel rep-panel' }, [el('h2', { text: title })]);
      if (!rows.length) { box.appendChild(el('p', { class: 'hint', style: 'margin:8px 0 0', text: '—' })); return box; }
      rows.forEach(function (r) {
        box.appendChild(el('div', { class: 'rep-row' }, [
          el('span', { class: 'rep-name', dir: 'auto', text: r.name || '—' }),
          el('span', { class: 'rep-qty', dir: 'ltr', text: '×' + r.qty }),
          el('span', { class: 'rep-tot', dir: 'ltr', text: money(r.total) + ' ' + cur }),
        ]));
      });
      return box;
    }
    function dayChart(days) {
      var max = days.reduce(function (m, d) { return Math.max(m, Number(d.total) || 0); }, 0) || 1;
      var chart = el('div', { class: 'rep-chart' });
      days.forEach(function (d) {
        var pct = Math.max(2, Math.round((Number(d.total) || 0) / max * 100));
        chart.appendChild(el('div', { class: 'rep-bar-wrap' }, [
          el('div', { class: 'rep-bar-val', dir: 'ltr', text: money(d.total) }),
          el('div', { class: 'rep-bar' }, [el('div', { class: 'rep-bar-fill', style: 'height:' + pct + '%' })]),
          el('div', { class: 'rep-bar-lbl', dir: 'ltr', text: String(d.day).slice(5) }),
        ]));
      });
      return el('div', { class: 'panel' }, [el('h2', { text: t('rep_by_day') }), chart]);
    }
    function draw(d) {
      body.textContent = '';
      body.appendChild(el('div', { class: 'stats' }, [
        statTile(t('rep_total_sales'), money2(d.total_sales), true),
        statTile(t('rep_orders'), String(d.orders)),
        statTile(t('rep_items'), String(d.items_sold)),
        statTile(t('rep_avg'), money2(d.avg_order)),
      ]));
      if (!d.orders) { body.appendChild(el('div', { class: 'empty' }, [el('h3', { text: t('rep_none') })])); return; }
      body.appendChild(el('div', { class: 'rep-cols' }, [
        panelList(t('rep_by_category'), (d.by_category || []).map(function (c) { return { name: catName(c.category), qty: c.qty, total: c.total }; })),
        panelList(t('rep_top_items'), d.top_items || []),
      ]));
      if ((d.by_day || []).length > 1) body.appendChild(dayChart(d.by_day));
    }

    host.appendChild(el('div', { class: 'panel' }, [
      el('div', { class: 'ph-head' }, [el('h2', { text: t('rep_title') }), printBtn]),
      tabs, customRow,
    ]));
    host.appendChild(body);
    load();
  }

  /* ------------------------------ KITCHEN ------------------------------ */
  function renderKitchen(host) {
    var board = el('div', { class: 'kds' });
    host.appendChild(board);

    function draw(orders) {
      board.textContent = '';
      if (!orders.length) {
        board.appendChild(el('div', { class: 'empty', style: 'grid-column:1/-1' }, [el('h3', { text: t('kitchen_empty') })]));
        return;
      }
      orders.forEach(function (o) {
        var d = new Date(String(o.created_at).replace(' ', 'T'));
        var readyBtn = el('button', { class: 'btn green kds-ready', text: t('ready'), onclick: function () {
          readyBtn.disabled = true;
          api('/orders/' + o.id + '/done', { method: 'POST' }).then(load)
            .catch(function (e) { if (e.status === 401) return logout(); toast(e.message, 'bad'); readyBtn.disabled = false; });
        } });
        board.appendChild(el('div', { class: 'kds-card' }, [
          el('div', { class: 'kds-head' }, [
            el('span', { class: 'kds-no', text: '#' + o.order_no }),
            el('span', { class: 'kds-time', text: isNaN(d) ? '' : d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) }),
          ]),
          el('div', { class: 'kds-items' }, (o.items || []).map(function (it) {
            return el('div', { class: 'kds-item' }, [
              el('span', { class: 'kds-q', text: '×' + it.qty }),
              el('span', { class: 'kds-name', text: it.name }),
            ]);
          })),
          readyBtn,
        ]));
      });
    }
    function load() {
      api('/kitchen').then(function (d) { draw(d.orders || []); })
        .catch(function (e) { if (e.status === 401) return logout(); });
    }
    load();
    // live: poll while this screen is open
    clearInterval(window._kpoll);
    window._kpoll = setInterval(function () { if (state.view === 'kitchen') load(); }, 4000);
  }

  /* ------------------------------ SETTINGS ------------------------------ */
  function renderSettings(host) {
    var s = state.settings;
    var widthSeg = el('div', { class: 'seg' });
    var chosen = { w: s.print_width === '58' ? '58' : '80' };
    ['80', '58'].forEach(function (w) {
      widthSeg.appendChild(el('button', { class: 'seg-b' + (chosen.w === w ? ' on' : ''), text: w + 'mm', onclick: function () {
        chosen.w = w; Array.prototype.forEach.call(widthSeg.children, function (b) { b.classList.remove('on'); });
        this.classList.add('on');
      } }));
    });

    var chosenPrev = { on: String(s.show_preview == null ? '1' : s.show_preview) !== '0' };
    var prevSeg = el('div', { class: 'seg' });
    [['1', t('preview_on')], ['0', t('preview_off')]].forEach(function (o) {
      prevSeg.appendChild(el('button', { class: 'seg-b' + ((chosenPrev.on ? '1' : '0') === o[0] ? ' on' : ''), text: o[1], onclick: function () {
        chosenPrev.on = o[0] === '1'; Array.prototype.forEach.call(prevSeg.children, function (b) { b.classList.remove('on'); }); this.classList.add('on');
      } }));
    });

    var chosenBeep = { on: String(s.beep == null ? '1' : s.beep) !== '0' };
    var beepSeg = el('div', { class: 'seg' });
    [['1', t('preview_on')], ['0', t('preview_off')]].forEach(function (o) {
      beepSeg.appendChild(el('button', { class: 'seg-b' + ((chosenBeep.on ? '1' : '0') === o[0] ? ' on' : ''), text: o[1], onclick: function () {
        chosenBeep.on = o[0] === '1'; Array.prototype.forEach.call(beepSeg.children, function (b) { b.classList.remove('on'); }); this.classList.add('on');
      } }));
    });
    var resetT = el('input', { class: 'input', type: 'time', value: (s.reset_time || '00:00'), dir: 'ltr' });
    var phone = el('textarea', { class: 'textarea', dir: 'ltr', style: 'min-height:96px', placeholder: '0750 947 1000' });
    phone.value = (s.phones || s.phone || '');
    var nk = el('input', { class: 'input', value: s.business_name_ku || '' });
    var na = el('input', { class: 'input', value: s.business_name_ar || '' });
    var ne = el('input', { class: 'input', value: s.business_name_en || '' });

    var saveBtn = el('button', { class: 'btn', text: t('save') });
    saveBtn.onclick = function () {
      saveBtn.disabled = true;
      var pl = phone.value.split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean);
      api('/settings', { method: 'PUT', body: JSON.stringify({
        print_width: chosen.w, reset_time: resetT.value || '00:00', phones: phone.value, phone: pl[0] || '',
        show_preview: chosenPrev.on ? '1' : '0', beep: chosenBeep.on ? '1' : '0',
        business_name_ku: nk.value, business_name_ar: na.value, business_name_en: ne.value,
      }) }).then(function (d) { state.settings = d.settings; toast(t('saved'), 'ok'); saveBtn.disabled = false; renderApp(); })
        .catch(function (e) { if (e.status === 401) return logout(); toast(e.message, 'bad'); saveBtn.disabled = false; });
    };

    host.appendChild(el('div', { class: 'panel' }, [
      el('h2', { text: t('print_size') }),
      el('p', { class: 'hint', text: '80mm / 58mm' }),
      widthSeg,
      el('div', { class: 'field', style: 'margin-top:18px' }, [
        el('label', { text: t('reset_time') }), resetT,
        el('div', { class: 'hint', style: 'margin:6px 0 0', text: t('reset_time_hint') }),
      ]),
      el('div', { class: 'field', style: 'margin-top:18px' }, [
        el('label', { text: t('show_preview') }), prevSeg,
        el('div', { class: 'hint', style: 'margin:6px 0 0', text: t('show_preview_hint') }),
      ]),
      el('div', { class: 'field', style: 'margin-top:18px' }, [
        el('label', { text: t('beep') }), beepSeg,
        el('div', { class: 'hint', style: 'margin:6px 0 0', text: t('beep_hint') }),
      ]),
    ]));
    host.appendChild(el('div', { class: 'panel' }, [
      el('h2', { text: t('business') }),
      el('div', { class: 'field', style: 'margin-top:14px' }, [el('label', { text: t('phones') }), phone, el('div', { class: 'hint', style: 'margin:6px 0 0', text: t('phones_hint') })]),
      el('div', { class: 'row3' }, [
        el('div', { class: 'field' }, [el('label', { text: t('biz_name') + ' (KU)' }), nk]),
        el('div', { class: 'field' }, [el('label', { text: t('biz_name') + ' (AR)' }), na]),
        el('div', { class: 'field' }, [el('label', { text: t('biz_name') + ' (EN)' }), ne]),
      ]),
      el('div', { style: 'margin-top:6px' }, [saveBtn]),
    ]));

    if (isAdmin()) renderUsersPanel(host);
    renderCategoriesPanel(host);
    renderPrintersPanel(host);

    // App version (desktop only) + manual update check
    var verEl = el('div', { class: 'hint', style: 'text-align:center;margin-top:18px;font-weight:700', text: 'NIGHT BITES' });
    host.appendChild(verEl);
    if (window.nb && window.nb.version) {
      window.nb.version().then(function (v) { verEl.textContent = 'NIGHT BITES  ·  v' + v; });
      var upBtn = el('button', { class: 'btn-ghost', style: 'display:block;margin:10px auto 0', text: 'Check for updates',
        onclick: function () {
          upBtn.disabled = true; upBtn.textContent = '…';
          window.nb.checkUpdate().then(function (r) {
            upBtn.disabled = false; upBtn.textContent = 'Check for updates';
            toast(r && r.version ? ('Update: v' + r.version) : (r && r.dev ? 'Dev build' : 'You are up to date'), 'ok');
          }).catch(function () { upBtn.disabled = false; upBtn.textContent = 'Check for updates'; toast('Update check failed', 'bad'); });
        } });
      host.appendChild(upBtn);
    }
  }

  /* ------------------------------ USERS & ACCESS ------------------------------ */
  function renderUsersPanel(host) {
    var panel = el('div', { class: 'panel' });
    host.appendChild(panel);
    var users = [];
    function load() {
      api('/users').then(function (d) { users = d.users || []; draw(); })
        .catch(function (e) { if (e.status === 401) return logout(); if (e.status === 403) { if (panel.parentNode) panel.parentNode.removeChild(panel); return; } toast(e.message, 'bad'); });
    }
    function draw() {
      panel.textContent = '';
      panel.appendChild(el('div', { class: 'ph-head' }, [
        el('h2', { text: t('manage_users') }),
        el('button', { class: 'btn', onclick: function () { userModal(null); } }, [t('add_user')]),
      ]));
      panel.appendChild(el('p', { class: 'hint', text: t('users_hint') }));
      var box = el('div', { class: 'pr-list' });
      users.forEach(function (u) {
        var me = state.user && state.user.id === u.id;
        var secs = u.role === 'admin' ? SECTIONS.slice() : (u.sections || []);
        var secLabel = secs.map(function (s) { return t('nav_' + s); }).join(', ') || '—';
        box.appendChild(el('div', { class: 'pr-row' + (u.is_active ? '' : ' off') }, [
          el('span', { class: 'pr-kind ' + (u.role === 'admin' ? 'network' : 'system'), text: u.role === 'admin' ? t('role_admin') : t('role_staff') }),
          el('div', { class: 'pr-name' }, [
            el('strong', {}, [(u.display_name || u.username), me ? el('span', { class: 'you-tag', text: ' · ' + t('you_tag') }) : null]),
            el('span', { class: 'pr-sub', dir: 'ltr', text: '@' + u.username + '  ·  ' + secLabel }),
          ]),
          el('div', { class: 'rowbtns' }, [
            el('button', { class: 'btn-ghost', text: t('edit'), onclick: function () { userModal(u); } }),
            me ? null : el('button', { class: 'btn-ghost danger', text: t('del'), onclick: function () {
              if (!confirm(t('del_user'))) return;
              api('/users/' + u.id, { method: 'DELETE' }).then(function () { toast(t('saved'), 'ok'); load(); })
                .catch(function (e) { if (e.status === 401) return logout(); toast(e.message, 'bad'); });
            } }),
          ]),
        ]));
      });
      panel.appendChild(box);
    }
    function userModal(editing) {
      var uname = el('input', { class: 'input', dir: 'ltr', autocapitalize: 'none', value: editing ? editing.username : '' });
      if (editing) uname.disabled = true;
      var pw = el('input', { class: 'input', type: 'password', dir: 'ltr', autocomplete: 'new-password' });
      var dname = el('input', { class: 'input', value: editing ? (editing.display_name || '') : '' });
      var roleS = el('select', { class: 'input' });
      [['staff', t('role_staff')], ['admin', t('role_admin')]].forEach(function (o) {
        var opt = el('option', { value: o[0], text: o[1] }); if ((editing ? editing.role : 'staff') === o[0]) opt.selected = true; roleS.appendChild(opt);
      });
      var secChks = {};
      var secWrap = el('div', { class: 'zcats' });
      SECTIONS.forEach(function (s) {
        var chk = el('input', { type: 'checkbox' }); chk.checked = editing ? ((editing.sections || []).indexOf(s) >= 0) : (s === 'pos');
        secChks[s] = chk;
        secWrap.appendChild(el('label', { class: 'zchk' }, [chk, el('span', { text: t('nav_' + s) })]));
      });
      var secField = el('div', { class: 'field', style: 'margin-top:10px' }, [el('label', { text: t('can_see') }), secWrap]);
      function syncRole() { secField.style.display = roleS.value === 'admin' ? 'none' : ''; }
      roleS.onchange = syncRole; syncRole();
      var activeChk = el('input', { type: 'checkbox' }); activeChk.checked = editing ? editing.is_active : true;
      var editingSelf = editing && state.user && editing.id === state.user.id;
      if (editingSelf) { roleS.disabled = true; activeChk.disabled = true; }   // can't demote/deactivate yourself
      var errBox = el('div', { class: 'err', style: 'display:none' });
      var bg = el('div', { class: 'modal-bg', onclick: function (e) { if (e.target === bg) document.body.removeChild(bg); } });
      var saveBtn = el('button', { class: 'btn', text: t('save') });
      saveBtn.onclick = function () {
        var sections = SECTIONS.filter(function (s) { return secChks[s].checked; });
        var body = { display_name: dname.value, role: roleS.value, sections: sections, is_active: activeChk.checked };
        if (!editing) { body.username = uname.value; body.password = pw.value; }
        else if (pw.value) body.password = pw.value;
        saveBtn.disabled = true; errBox.style.display = 'none';
        var req = editing ? api('/users/' + editing.id, { method: 'PUT', body: JSON.stringify(body) })
                          : api('/users', { method: 'POST', body: JSON.stringify(body) });
        req.then(function (resp) {
          toast(t('saved'), 'ok'); if (bg.parentNode) document.body.removeChild(bg);
          if (editingSelf && resp && resp.user) { state.user = resp.user; renderApp(); return; }   // adopt updated own privileges
          load();
        }).catch(function (e) { if (e.status === 401) return logout(); errBox.textContent = e.message; errBox.style.display = ''; saveBtn.disabled = false; });
      };
      bg.appendChild(el('div', { class: 'modal' }, [
        el('h3', { text: editing ? t('edit_user') : t('add_user') }),
        errBox,
        el('div', { class: 'row2' }, [
          el('div', { class: 'field' }, [el('label', { text: t('username') }), uname]),
          el('div', { class: 'field' }, [el('label', { text: t('disp_name') }), dname]),
        ]),
        el('div', { class: 'field' }, [el('label', { text: t('password') }), pw, editing ? el('div', { class: 'hint', style: 'margin:6px 0 0', text: t('pw_keep') }) : null]),
        el('div', { class: 'field' }, [el('label', { text: t('role') }), roleS]),
        secField,
        el('label', { class: 'field', style: 'display:flex;align-items:center;gap:10px;cursor:pointer;margin-top:6px' }, [activeChk, el('span', { text: t('account_active') })]),
        el('div', { class: 'modal-actions' }, [
          el('button', { class: 'btn gray', text: t('cancel'), onclick: function () { document.body.removeChild(bg); } }),
          saveBtn,
        ]),
      ]));
      document.body.appendChild(bg);
      if (editing) dname.focus(); else uname.focus();
    }
    load();
  }

  /* ------------------------------ CATEGORIES ------------------------------ */
  function renderCategoriesPanel(host) {
    var panel = el('div', { class: 'panel' });
    host.appendChild(panel);
    function clone(o) { return JSON.parse(JSON.stringify(o)); }
    function uid() { return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
    var list = (state.categories || []).map(clone);
    function persist() {
      return api('/categories', { method: 'PUT', body: JSON.stringify({ categories: list }) })
        .then(function (d) { state.categories = d.categories || []; })
        .catch(function (e) { if (e.status === 401) return logout(); toast(e.message || 'Error', 'bad'); });
    }
    // after a category change: sync printers/zones (server cascade may have edited
    // them), redraw this panel + the zones panel — without a full renderApp() that
    // would discard unsaved edits in the business/print-size forms.
    function afterCatChange() {
      api('/printers').then(function (d) { state.printerCfg = { printers: d.printers || [], zones: d.zones || [] }; })
        .catch(function () {}).then(function () { draw(); if (_zonesReload) _zonesReload(); });
    }
    function nameOf(c) { return (state.lang === 'ar' ? (c.name_ar || c.name_ku || c.name_en) : state.lang === 'en' ? (c.name_en || c.name_ku || c.name_ar) : (c.name_ku || c.name_ar || c.name_en)) || c.id; }
    function draw() {
      panel.textContent = '';
      panel.appendChild(el('div', { class: 'ph-head' }, [
        el('h2', { text: t('manage_categories') }),
        el('button', { class: 'btn', onclick: function () { catModal(null); } }, [t('add_category')]),
      ]));
      panel.appendChild(el('p', { class: 'hint', text: t('cat_hint') }));
      if (!list.length) { panel.appendChild(el('p', { class: 'hint', text: t('no_categories') })); return; }
      var box = el('div', { class: 'pr-list' });
      list.forEach(function (c) {
        box.appendChild(el('div', { class: 'pr-row' }, [
          el('div', { class: 'pr-name' }, [
            el('strong', { text: nameOf(c) }),
            el('span', { class: 'pr-sub', text: [c.name_ku, c.name_ar, c.name_en].filter(Boolean).join(' · ') }),
          ]),
          el('div', { class: 'rowbtns' }, [
            el('button', { class: 'btn-ghost', text: t('edit'), onclick: function () { catModal(c); } }),
            el('button', { class: 'btn-ghost danger', text: t('del'), onclick: function () {
              if (!confirm(t('del_category'))) return;
              list = list.filter(function (x) { return x !== c; });
              persist().then(afterCatChange);
            } }),
          ]),
        ]));
      });
      panel.appendChild(box);
    }
    function catModal(editing) {
      var nk = el('input', { class: 'input', value: editing ? editing.name_ku : '' });
      var na = el('input', { class: 'input', value: editing ? editing.name_ar : '' });
      var ne = el('input', { class: 'input', value: editing ? editing.name_en : '' });
      var errBox = el('div', { class: 'err', style: 'display:none' });
      var bg = el('div', { class: 'modal-bg', onclick: function (e) { if (e.target === bg) document.body.removeChild(bg); } });
      var saveBtn = el('button', { class: 'btn', text: t('save') });
      saveBtn.onclick = function () {
        var ku = nk.value.trim(), ar = na.value.trim(), en = ne.value.trim();
        if (!ku && !ar && !en) { errBox.textContent = t('cat_name_req'); errBox.style.display = ''; return; }
        saveBtn.disabled = true;
        if (editing) { editing.name_ku = ku; editing.name_ar = ar; editing.name_en = en; }
        else { list.push({ id: uid(), name_ku: ku, name_ar: ar, name_en: en, sort_order: (list.length + 1) * 10 }); }
        persist().then(function () { if (bg.parentNode) document.body.removeChild(bg); afterCatChange(); });
      };
      bg.appendChild(el('div', { class: 'modal' }, [
        el('h3', { text: editing ? t('edit_category') : t('add_category') }),
        errBox,
        el('div', { class: 'field' }, [el('label', { text: t('name_ku') }), nk]),
        el('div', { class: 'row2' }, [
          el('div', { class: 'field' }, [el('label', { text: t('name_ar') }), na]),
          el('div', { class: 'field' }, [el('label', { text: t('name_en') }), ne]),
        ]),
        el('div', { class: 'modal-actions' }, [
          el('button', { class: 'btn gray', text: t('cancel'), onclick: function () { document.body.removeChild(bg); } }),
          saveBtn,
        ]),
      ]));
      document.body.appendChild(bg);
      nk.focus();
    }
    draw();
  }

  /* ------------------------------ PRINTERS & ZONES ------------------------------ */
  function renderPrintersPanel(host) {
    var panel = el('div', { class: 'panel' });
    host.appendChild(panel);
    if (!(window.nb && window.nb.listPrinters)) {
      panel.appendChild(el('h2', { text: t('printers_zones') }));
      panel.appendChild(el('p', { class: 'hint', style: 'margin:8px 0 0', text: t('desktop_only') }));
      return;
    }

    function clone(o) { return JSON.parse(JSON.stringify(o)); }
    function uid() { return 'id' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
    var cfg = { printers: printers().map(clone), zones: zones().map(clone) };
    var found = [];
    var scanning = false;
    var netinfo = null;
    var adding = false;   // guards register/addManual/addZone against double-clicks
    function validIp(s) {
      var m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(String(s || '').trim());
      return !!m && m.slice(1).every(function (o) { return +o >= 0 && +o <= 255; });
    }

    // NOTE: do NOT reassign `cfg` here. The zone/printer cards close over cfg's
    // objects; replacing them would orphan the handlers and lose the next edit.
    // The server preserves our client ids, so cfg and state stay in sync.
    function persist() {
      return api('/printers', { method: 'PUT', body: JSON.stringify({ printers: cfg.printers, zones: cfg.zones }) })
        .then(function (d) { state.printerCfg = { printers: d.printers || [], zones: d.zones || [] }; })
        .catch(function (e) { if (e.status === 401) return logout(); toast(e.message || 'Error', 'bad'); });
    }
    function isRegistered(f) {
      return cfg.printers.some(function (p) {
        return f.kind === 'network' ? (p.kind === 'network' && p.host === f.host && (p.port || 9100) === (f.port || 9100))
                                    : (p.kind === 'system' && p.device === f.device);
      });
    }
    function doScan() {
      scanning = true; redraw();
      var pSys = window.nb.listPrinters ? window.nb.listPrinters() : Promise.resolve([]);
      var pNet = window.nb.scanNetwork ? window.nb.scanNetwork() : Promise.resolve([]);
      Promise.all([pSys.catch(function () { return []; }), pNet.catch(function () { return []; })]).then(function (r) {
        var sys = (r[0] || []).map(function (p) { return { kind: 'system', name: p.displayName || p.name, device: p.name }; });
        var netw = (r[1] || []).map(function (n) { return { kind: 'network', name: n.host + ':' + n.port, host: n.host, port: n.port }; });
        found = sys.concat(netw);
        scanning = false; redraw();
      });
    }
    function register(f) {
      if (isRegistered(f)) return;   // never register the same printer twice
      if (adding) return; adding = true;
      cfg.printers.push({ id: uid(), name: f.name || f.device || f.host, kind: f.kind, device: f.device || '', host: f.host || '', port: f.port || 9100 });
      persist().then(function () { adding = false; redraw(); });
    }
    function addManual(host, port, name) {
      host = String(host || '').trim();
      if (!validIp(host)) { toast(t('bad_ip'), 'bad'); return; }
      port = parseInt(port, 10) || 9100;
      if (isRegistered({ kind: 'network', host: host, port: port })) { toast(t('already_added'), 'bad'); return; }  // no duplicate → no double prints
      if (adding) return; adding = true;
      var doAdd = function (reach) {
        cfg.printers.push({ id: uid(), name: (name || '').trim() || (host + ':' + port), kind: 'network', device: '', host: host, port: port });
        persist().then(function () { adding = false; toast(reach ? t('reachable') : t('not_reachable'), reach ? 'ok' : 'bad'); redraw(); });
      };
      if (window.nb.probePrinter) {
        toast(t('checking'), 'ok');
        window.nb.probePrinter(host, port).then(function (r) { doAdd(r && r.ok); }).catch(function () { doAdd(false); });
      } else doAdd(true);
    }
    function removePrinter(id) {
      cfg.printers = cfg.printers.filter(function (p) { return p.id !== id; });
      cfg.zones.forEach(function (z) { if (z.printer_id === id) z.printer_id = ''; });
      persist().then(redraw);
    }
    function testPrint(p) {
      var order = { order_no: 'TEST', lang: state.lang, created_at: new Date().toISOString(),
        items: [{ name: t('test_ticket'), qty: 1, line_total: 0, category: 'burgers' }], total: 0 };
      toast(t('printing'), 'ok');
      sendTo(p, customerTicketHTML(order, p.kind === 'network')).then(function (rr) { toast(rr && rr.ok ? t('printed') : t('print_failed'), rr && rr.ok ? 'ok' : 'bad'); });
    }
    function addZone() {
      if (adding) return; adding = true;
      cfg.zones.push({ id: uid(), name: t('station') + ' ' + (cfg.zones.length + 1), type: 'items',
        printer_id: (cfg.printers[0] && cfg.printers[0].id) || '', categories: [] });
      persist().then(function () { adding = false; redraw(); });
    }
    function removeZone(id) { cfg.zones = cfg.zones.filter(function (z) { return z.id !== id; }); persist().then(redraw); }

    function prRow(p, isFound) {
      var kids = [
        el('span', { class: 'pr-kind ' + p.kind, text: p.kind === 'network' ? t('kind_network') : t('kind_system') }),
        el('div', { class: 'pr-name' }, [
          el('strong', { text: p.name }),
          el('span', { class: 'pr-sub', dir: 'ltr', text: p.kind === 'network' ? (p.host + ':' + p.port) : (p.device || '') }),
        ]),
      ];
      if (isFound) {
        kids.push(isRegistered(p) ? el('span', { class: 'pr-added', text: t('added') })
          : el('button', { class: 'btn-ghost', text: t('register'), onclick: function () { register(p); } }));
      } else {
        kids.push(el('div', { class: 'rowbtns' }, [
          el('button', { class: 'btn-ghost', text: t('test'), onclick: function () { testPrint(p); } }),
          el('button', { class: 'btn-ghost danger', text: t('remove'), onclick: function () { removePrinter(p.id); } }),
        ]));
      }
      return el('div', { class: 'pr-row' }, kids);
    }

    function zoneCard(z) {
      var nameI = el('input', { class: 'input', value: z.name || '' });
      nameI.onchange = function () { z.name = nameI.value; persist(); };
      var typeS = el('select', { class: 'input' });
      [['items', t('ztype_items')], ['customer', t('ztype_customer')]].forEach(function (o) {
        var opt = el('option', { value: o[0], text: o[1] }); if (z.type === o[0]) opt.selected = true; typeS.appendChild(opt);
      });
      var prS = el('select', { class: 'input' });
      prS.appendChild(el('option', { value: '', text: t('pick') }));
      cfg.printers.forEach(function (p) { var opt = el('option', { value: p.id, text: p.name }); if (z.printer_id === p.id) opt.selected = true; prS.appendChild(opt); });
      prS.onchange = function () { z.printer_id = prS.value; persist(); };
      var catsWrap = el('div', { class: 'zcats' });
      cats().map(function (c) { return c.id; }).concat(['other']).forEach(function (c) {
        var chk = el('input', { type: 'checkbox' }); chk.checked = (z.categories || []).indexOf(c) >= 0;
        chk.onchange = function () {
          z.categories = z.categories || [];
          if (chk.checked) { if (z.categories.indexOf(c) < 0) z.categories.push(c); }
          else z.categories = z.categories.filter(function (x) { return x !== c; });
          persist();
        };
        catsWrap.appendChild(el('label', { class: 'zchk' }, [chk, el('span', { text: catName(c) })]));
      });
      var catsField = el('div', { class: 'field', style: 'margin-top:10px' }, [el('label', { text: t('zone_cats') }), catsWrap]);
      function syncCats() { catsField.style.display = (typeS.value === 'customer') ? 'none' : ''; }
      typeS.onchange = function () {
        z.type = typeS.value; syncCats();
        // only one customer-receipt zone allowed — demote any other customer zone to kitchen tickets
        if (z.type === 'customer') { cfg.zones.forEach(function (o) { if (o !== z && o.type === 'customer') o.type = 'items'; }); persist().then(redraw); return; }
        persist();
      };
      syncCats();
      return el('div', { class: 'zone-card' }, [
        el('div', { class: 'zone-top' }, [
          el('div', { class: 'field', style: 'flex:1;margin:0' }, [el('label', { text: t('zone_name') }), nameI]),
          el('button', { class: 'btn-ghost danger zone-x', text: t('remove'), onclick: function () { removeZone(z.id); } }),
        ]),
        el('div', { class: 'row2' }, [
          el('div', { class: 'field' }, [el('label', { text: t('zone_type') }), typeS]),
          el('div', { class: 'field' }, [el('label', { text: t('zone_printer') }), prS]),
        ]),
        catsField,
      ]);
    }

    function redraw() {
      panel.textContent = '';
      panel.appendChild(el('div', { class: 'ph-head' }, [
        el('h2', { text: t('printers_zones') }),
        el('button', { class: 'btn', disabled: scanning ? 'disabled' : undefined, onclick: doScan }, [scanning ? t('scanning') : t('scan')]),
      ]));
      panel.appendChild(el('p', { class: 'hint', text: t('pz_hint') }));

      var pc = netinfo && netinfo.interfaces && netinfo.interfaces[0];
      var gw = (netinfo && netinfo.gateway) || (pc && pc.guessGateway) || '';
      panel.appendChild(el('div', { class: 'net-card' }, [
        el('div', { class: 'net-cell' }, [el('span', { class: 'net-k', text: t('your_pc') }), el('span', { class: 'net-v', dir: 'ltr', text: pc ? pc.ip : '—' })]),
        el('div', { class: 'net-cell' }, [el('span', { class: 'net-k', text: t('subnet') }), el('span', { class: 'net-v', dir: 'ltr', text: pc ? (pc.network + '/' + pc.cidr) : '—' })]),
        el('div', { class: 'net-cell' }, [el('span', { class: 'net-k', text: t('gateway') }), el('span', { class: 'net-v', dir: 'ltr', text: gw || '—' })]),
      ]));

      if (scanning) { panel.appendChild(el('p', { class: 'hint', text: t('scanning') })); }
      else if (found.length) {
        var fl = el('div', { class: 'pr-list' });
        found.forEach(function (f) { fl.appendChild(prRow(f, true)); });
        panel.appendChild(el('div', { class: 'pr-block' }, [el('div', { class: 'pr-h', text: t('found_printers') + ' · ' + found.length }), fl]));
      } else {
        panel.appendChild(el('p', { class: 'hint', text: t('scan_note') }));
      }

      // manual add (by IP) — for printers you already know the address of
      var ipI = el('input', { class: 'input', dir: 'ltr', placeholder: '192.168.1.50' });
      var portI = el('input', { class: 'input', dir: 'ltr', type: 'number', value: '9100' });
      var nameI = el('input', { class: 'input', placeholder: t('printer_name') });
      panel.appendChild(el('div', { class: 'pr-h', style: 'margin-top:16px', text: t('add_manually') }));
      panel.appendChild(el('div', { class: 'manual-add' }, [
        el('div', { class: 'ma-fields' }, [
          el('div', { class: 'field ma-ip' }, [el('label', { text: t('ip_address') }), ipI]),
          el('div', { class: 'field ma-port' }, [el('label', { text: t('port') }), portI]),
          el('div', { class: 'field ma-name' }, [el('label', { text: t('printer_name') }), nameI]),
        ]),
        el('button', { class: 'btn ma-btn', text: t('add'), onclick: function () { addManual(ipI.value, portI.value, nameI.value); } }),
      ]));
      panel.appendChild(el('div', { class: 'hint', style: 'margin:6px 0 0', text: t('manual_hint') }));

      panel.appendChild(el('div', { class: 'pr-h', style: 'margin-top:18px', text: t('registered_printers') }));
      if (!cfg.printers.length) panel.appendChild(el('p', { class: 'hint', text: t('no_registered') }));
      else { var rl = el('div', { class: 'pr-list' }); cfg.printers.forEach(function (p) { rl.appendChild(prRow(p, false)); }); panel.appendChild(rl); }

      panel.appendChild(el('div', { class: 'pr-head2' }, [
        el('div', {}, [el('div', { class: 'pr-h', text: t('zones_title') }), el('div', { class: 'hint', style: 'margin:2px 0 0', text: t('zones_hint') })]),
        el('button', { class: 'btn-ghost', disabled: cfg.printers.length ? undefined : 'disabled', text: t('add_zone'), onclick: addZone }),
      ]));
      if (!cfg.zones.length) panel.appendChild(el('p', { class: 'hint', text: t('no_zones') }));
      else cfg.zones.forEach(function (z) { panel.appendChild(zoneCard(z)); });

      // how-to guide (collapsible)
      panel.appendChild(el('details', { class: 'help' }, [
        el('summary', { text: t('help_title') }),
        el('ol', { class: 'help-list' }, [
          el('li', { text: t('help_1') }), el('li', { text: t('help_2') }), el('li', { text: t('help_3') }),
          el('li', { text: t('help_4') }), el('li', { text: t('help_5') }),
        ]),
      ]));
    }

    // let the categories panel refresh zone checkboxes (reload cfg from fresh state)
    _zonesReload = function () { cfg = { printers: printers().map(clone), zones: zones().map(clone) }; redraw(); };
    if (window.nb.networkInfo) window.nb.networkInfo().then(function (ni) { netinfo = ni; redraw(); }).catch(function () {});
    redraw();
  }

  /* ------------------------------ PRINT ------------------------------ */
  function bizName(lang) {
    var s = state.settings;
    return lang === 'ar' ? (s.business_name_ar || 'نايت بايتس') : lang === 'en' ? (s.business_name_en || 'NIGHT BITES') : (s.business_name_ku || 'نایت بایتس');
  }
  function orderDate(order) { var d = new Date(String(order.created_at).replace(' ', 'T')); return isNaN(d) ? String(order.created_at) : d.toLocaleString('en-GB'); }

  // On-screen receipt element (used for the preview popup and the browser-print fallback).
  function buildReceiptEl(order) {
    var lang = order.lang || state.lang;
    var L = I18N[lang] || I18N.ku;
    var cur = state.settings.currency || 'IQD';
    var width = state.settings.print_width === '58' ? '58mm' : '80mm';
    var tbody = el('tbody');
    (order.items || []).forEach(function (it) {
      var note = (it.note || '').trim();
      var nameTd = el('td', { class: 'iname', dir: 'auto' }, [it.name]);
      if (note) nameTd.appendChild(el('span', { class: 'inote', dir: 'auto', text: '» ' + note }));
      tbody.appendChild(el('tr', {}, [
        nameTd,
        el('td', { class: 'mid' }, [el('span', { dir: 'ltr', text: '×' + it.qty })]),
        el('td', { class: 'num' }, [el('span', { dir: 'ltr', text: money(it.line_total) })]),
      ]));
    });
    return el('div', { class: 'rcpt', dir: L._dir, style: '--pw:' + width }, [
      el('div', { class: 'r-brand', dir: 'auto', text: bizName(lang) }),
      el('div', { class: 'r-rule' }),
      el('div', { class: 'r-no' }, [L.order + ' ', el('span', { dir: 'ltr', text: '#' + order.order_no })]),
      el('div', { class: 'r-meta' }, [el('span', { dir: 'ltr', text: orderDate(order) }), el('span', { dir: 'ltr', text: '#' + order.order_no })]),
      el('div', { class: 'r-rule' }),
      el('table', {}, [
        el('thead', {}, [el('tr', {}, [
          el('th', { text: L.item }), el('th', { class: 'mid', text: L.qty }), el('th', { class: 'num', text: L.total }),
        ])]),
        tbody,
      ]),
      el('div', { class: 'r-rule solid' }),
      el('div', { class: 'r-total' }, [
        el('span', { class: 't-lbl', text: L.total }),
        el('span', { class: 't-val', dir: 'ltr', text: money(order.total) + ' ' + cur }),
      ]),
      el('div', { class: 'r-thanks', text: L.r_thanks }),
      el('div', { class: 'r-phone', dir: 'ltr' }, phoneList().map(function (ph) { return el('div', { text: ph }); })),
    ]);
  }
  function printViaBrowser(order) {
    printRoot.textContent = '';
    printRoot.appendChild(buildReceiptEl(order));
    setTimeout(function () { window.print(); }, 80);
  }

  /* ---- printer / zone helpers ---- */
  function printers() { return (state.printerCfg && state.printerCfg.printers) || []; }
  function zones() { return (state.printerCfg && state.printerCfg.zones) || []; }
  function printerById(id) { return printers().filter(function (p) { return p.id === id; })[0] || null; }
  function customerZone() { return zones().filter(function (z) { return z.type === 'customer' && printerById(z.printer_id); })[0] || null; }
  function targetFor(p) { return p.kind === 'network' ? { kind: 'network', host: p.host, port: p.port || 9100 } : { kind: 'system', device: p.device }; }
  function widthMm() { return state.settings.print_width === '58' ? 58 : 80; }
  function beepOn() { return String(state.settings.beep == null ? '1' : state.settings.beep) !== '0'; }

  /* ---- self-contained HTML tickets for silent printing ---- */
  function escHtml(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ticketStyle(net, dots) {
    var b = net ? (dots / 576) : 1;
    var u = net ? 'px' : 'pt';
    var sz = net
      ? { pad: Math.round(16 * b) + 'px ' + Math.round(12 * b) + 'px', brand: Math.round(40 * b), no: Math.round(30 * b), meta: Math.round(19 * b), th: Math.round(19 * b), td: Math.round(23 * b), tlbl: Math.round(26 * b), tval: Math.round(34 * b), phone: Math.round(26 * b), thanks: Math.round(22 * b), kq: Math.round(34 * b), kn: Math.round(30 * b), station: Math.round(26 * b), knote: Math.round(25 * b), inote: Math.round(20 * b) }
      : { pad: '4mm 3mm 6mm', brand: 20, no: 12, meta: 8.5, th: 8, td: 9.5, tlbl: 11, tval: 15, phone: 11, thanks: 10, kq: 14, kn: 14, station: 11, knote: 11, inote: 8.5 };
    var w = net ? ('width:' + dots + 'px;') : ('width:' + (dots === 384 ? '58mm' : '80mm') + ';');
    var gap = net ? '8px' : '2.5mm';
    // Embed a Naskh font (thick, well-separated dots) so Kurdish/Arabic prints clearly on
    // thermal — the system fallback (Segoe UI) has thin dots that drop out. font-display:block
    // so the ticket is captured/printed with the real font, never the thin fallback.
    var fontFace = window.NB_TICKET_FONT
      ? "@font-face{font-family:'NBArabic';src:url(" + window.NB_TICKET_FONT + ") format('woff2');font-weight:400 900;font-style:normal;font-display:block;}"
      : '';
    var fam = (window.NB_TICKET_FONT ? "'NBArabic'," : '') + '"Segoe UI",Tahoma,Arial,sans-serif';
    return '<style>'
      + fontFace
      + '*{margin:0;padding:0;box-sizing:border-box;}'
      + 'body{background:#fff;color:#000;font-family:' + fam + ';-webkit-print-color-adjust:exact;print-color-adjust:exact;}'
      + '.t{' + w + 'padding:' + sz.pad + ';line-height:1.4;}'
      + '.brand{text-align:center;font-size:' + sz.brand + u + ';font-weight:900;letter-spacing:.02em;}'
      + '.station{text-align:center;font-size:' + sz.station + u + ';font-weight:900;margin-top:' + (net ? '3px' : '.6mm') + ';}'
      + '.rule{border-top:1px dashed #000;margin:' + gap + ' 0;}'
      + '.rule.solid{border-top:2px solid #000;}'
      + '.no{text-align:center;font-size:' + sz.no + u + ';font-weight:900;margin:' + (net ? '4px' : '1mm') + ' 0;}'
      + '.meta{display:flex;justify-content:space-between;font-size:' + sz.meta + u + ';font-weight:700;}'
      + 'table{width:100%;border-collapse:collapse;}'
      + 'th{font-size:' + sz.th + u + ';font-weight:800;border-bottom:1px solid #000;padding:' + (net ? '4px 0' : '1mm 0') + ';text-align:start;}'
      + 'td{font-size:' + sz.td + u + ';padding:' + (net ? '4px 0' : '1.2mm 0') + ';vertical-align:top;}'
      + '.mid{text-align:center;}.num{text-align:end;}'
      + '.iname{font-weight:700;}'
      + '.total{display:flex;justify-content:space-between;align-items:baseline;font-weight:900;margin-top:' + (net ? '8px' : '2mm') + ';}'
      + '.tlbl{font-size:' + sz.tlbl + u + ';}.tval{font-size:' + sz.tval + u + ';}'
      + '.thanks{text-align:center;font-size:' + sz.thanks + u + ';font-weight:800;margin-top:' + (net ? '8px' : '2mm') + ';}'
      + '.phone{text-align:center;font-weight:900;font-size:' + sz.phone + u + ';margin-top:' + (net ? '6px' : '1.5mm') + ';letter-spacing:.03em;}'
      + '.krow{display:flex;align-items:center;gap:' + (net ? '10px' : '3mm') + ';padding:' + (net ? '7px 0' : '2mm 0') + ';border-bottom:1px dashed #000;}'
      + '.kq{min-width:' + (net ? Math.round(48 * b) + 'px' : '10mm') + ';font-size:' + sz.kq + u + ';font-weight:900;}'
      + '.kn{font-size:' + sz.kn + u + ';font-weight:800;}'
      // per-item note — prominent on the kitchen ticket (.knote), subtle on the customer receipt (.inote)
      + '.knote{display:block;font-size:' + sz.knote + u + ';font-weight:800;margin-top:' + (net ? '3px' : '.8mm') + ';}'
      + '.inote{display:block;font-size:' + sz.inote + u + ';font-weight:700;margin-top:' + (net ? '2px' : '.4mm') + ';}'
      // bidi: isolate every run so Kurdish/Arabic names never merge with Latin digits/prices
      + '.iname,.kn,.knote,.inote,.brand,.station,.thanks,.tlbl,.tval,.no,.kq,.num,.mid,.meta span{unicode-bidi:isolate;}'
      + '</style>';
  }
  function ticketDoc(inner, net, dots, dir) {
    return '<!DOCTYPE html><html dir="' + (dir || 'rtl') + '"><head><meta charset="utf-8">' + ticketStyle(net, dots)
      + '</head><body><div class="t">' + inner + '</div></body></html>';
  }
  function customerTicketHTML(order, net) {
    var lang = order.lang || state.lang; var L = I18N[lang] || I18N.ku;
    var cur = state.settings.currency || 'IQD';
    var dots = widthMm() === 58 ? 384 : 576;
    var rows = (order.items || []).map(function (it) {
      var note = (it.note || '').trim();
      return '<tr><td class="iname" dir="auto">' + escHtml(it.name) + (note ? '<span class="inote" dir="auto">» ' + escHtml(note) + '</span>' : '') + '</td><td class="mid"><span dir="ltr">×' + escHtml(it.qty) + '</span></td><td class="num"><span dir="ltr">' + escHtml(money(it.line_total)) + '</span></td></tr>';
    }).join('');
    var phones = phoneList().map(function (p) { return '<div>' + escHtml(p) + '</div>'; }).join('');
    var inner = '<div class="brand" dir="auto">' + escHtml(bizName(lang)) + '</div><div class="rule"></div>'
      + '<div class="no">' + escHtml(L.order) + ' <span dir="ltr">#' + escHtml(order.order_no) + '</span></div>'
      + '<div class="meta"><span dir="ltr">' + escHtml(orderDate(order)) + '</span><span dir="ltr">#' + escHtml(order.order_no) + '</span></div>'
      + '<div class="rule"></div>'
      + '<table><thead><tr><th>' + escHtml(L.item) + '</th><th class="mid">' + escHtml(L.qty) + '</th><th class="num">' + escHtml(L.total) + '</th></tr></thead><tbody>' + rows + '</tbody></table>'
      + '<div class="rule solid"></div>'
      + '<div class="total"><span class="tlbl">' + escHtml(L.total) + '</span><span class="tval" dir="ltr">' + escHtml(money(order.total)) + ' ' + escHtml(cur) + '</span></div>'
      + '<div class="thanks">' + escHtml(L.r_thanks) + '</div>'
      + '<div class="phone" dir="ltr">' + phones + '</div>';
    return ticketDoc(inner, net, dots, L._dir);
  }
  function kitchenTicketHTML(order, items, station, net) {
    var lang = order.lang || state.lang; var L = I18N[lang] || I18N.ku;
    var dots = widthMm() === 58 ? 384 : 576;
    var rows = (items || []).map(function (it) {
      var note = (it.note || '').trim();
      return '<div class="krow"><span class="kq" dir="ltr">×' + escHtml(it.qty) + '</span><span class="kn" dir="auto">' + escHtml(it.name)
        + (note ? '<span class="knote" dir="auto">» ' + escHtml(note) + '</span>' : '') + '</span></div>';
    }).join('');
    var inner = '<div class="brand" dir="ltr">#' + escHtml(order.order_no) + '</div>'
      + (station ? '<div class="station" dir="auto">' + escHtml(station) + '</div>' : '')
      + '<div class="meta"><span dir="ltr">' + escHtml(orderDate(order)) + '</span><span dir="ltr">#' + escHtml(order.order_no) + '</span></div>'
      + '<div class="rule"></div>' + rows;
    return ticketDoc(inner, net, dots, L._dir);
  }

  /* ---- routing ---- */
  function sendTo(printer, html) {
    if (!(window.nb && window.nb.printTicket && printer)) return Promise.resolve({ ok: false });
    return window.nb.printTicket(html, targetFor(printer), widthMm(), beepOn()).catch(function () { return { ok: false }; });
  }
  // Kitchen/station tickets — silent, one per zone that has matching items.
  function routeStations(order) {
    if (!(window.nb && window.nb.printTicket)) return;
    zones().forEach(function (z) {
      if (z.type === 'customer') return;
      var p = printerById(z.printer_id); if (!p) return;
      var items = (order.items || []).filter(function (it) { return (z.categories || []).indexOf(it.category || 'other') >= 0; });
      if (!items.length) return;
      sendTo(p, kitchenTicketHTML(order, items, z.name, p.kind === 'network'));
    });
  }
  // Customer receipt — to the customer-zone printer if set, else the browser
  // printer. If the zone print fails (offline printer, no bridge) fall back to
  // the browser print so a receipt ALWAYS comes out — never nothing.
  function printCustomerDirect(order) {
    var z = (window.nb && window.nb.printTicket) ? customerZone() : null;
    if (z) {
      var p = printerById(z.printer_id);
      sendTo(p, customerTicketHTML(order, p.kind === 'network')).then(function (r) {
        if (r && r.ok) { toast(t('printed'), 'ok'); }
        else { toast(t('print_failed'), 'bad'); printViaBrowser(order); }
      });
      return;
    }
    printViaBrowser(order);
  }
  // Entry point wherever a customer receipt is wanted. Honours the preview toggle.
  function printOrder(order) {
    var showPrev = String(state.settings.show_preview == null ? '1' : state.settings.show_preview) !== '0';
    if (showPrev) showReceiptPreview(order);
    else printCustomerDirect(order);
  }
  function showReceiptPreview(order) {
    var lang = order.lang || state.lang; var L = I18N[lang] || I18N.ku;
    var bg = el('div', { class: 'modal-bg', onclick: function (e) { if (e.target === bg) close(); } });
    function close() { if (bg.parentNode) document.body.removeChild(bg); }
    var printBtn = el('button', { class: 'btn green', text: t('print_receipt') });
    printBtn.onclick = function () { printCustomerDirect(order); close(); };
    bg.appendChild(el('div', { class: 'modal receipt-modal' }, [
      el('div', { class: 'rm-title' }, [el('h3', { text: t('receipt') }), el('span', { class: 'rm-no', dir: 'ltr', text: '#' + order.order_no })]),
      el('div', { class: 'preview-paper', dir: L._dir }, [buildReceiptEl(order)]),
      el('div', { class: 'modal-actions' }, [
        el('button', { class: 'btn gray', text: t('close'), onclick: close }),
        printBtn,
      ]),
    ]));
    document.body.appendChild(bg);
  }

  /* ---- sales report thermal print ---- */
  function reportRangeLabel(d) {
    return d.label === 'today' ? t('rng_today') : d.label === 'week' ? t('rng_week') : d.label === 'month' ? t('rng_month') : t('rng_custom');
  }
  function reportDateRange(d) {
    var f = new Date(d.from), tt = new Date(d.to);
    return (isNaN(f) ? '' : f.toLocaleDateString('en-GB')) + ' — ' + (isNaN(tt) ? '' : tt.toLocaleDateString('en-GB'));
  }
  function buildReportEl(d) {
    var lang = state.lang; var L = I18N[lang] || I18N.ku;
    var cur = d.currency || state.settings.currency || 'IQD';
    var width = state.settings.print_width === '58' ? '58mm' : '80mm';
    function line(label, val, big) {
      return el('div', { class: 'r-line' + (big ? ' big' : '') }, [el('span', { dir: 'auto', text: label }), el('span', { dir: 'ltr', text: val })]);
    }
    var kids = [
      el('div', { class: 'r-brand', dir: 'auto', text: bizName(lang) }),
      el('div', { class: 'r-sub', text: t('rep_title') + ' · ' + reportRangeLabel(d) }),
      el('div', { class: 'r-meta' }, [el('span', { dir: 'ltr', text: reportDateRange(d) })]),
      el('div', { class: 'r-rule solid' }),
      line(t('rep_total_sales'), money(d.total_sales) + ' ' + cur, true),
      line(t('rep_orders'), String(d.orders)),
      line(t('rep_items'), String(d.items_sold)),
      line(t('rep_avg'), money(d.avg_order) + ' ' + cur),
    ];
    if ((d.by_category || []).length) {
      kids.push(el('div', { class: 'r-rule' }), el('div', { class: 'r-sec', text: t('rep_by_category') }));
      d.by_category.forEach(function (c) { kids.push(line(catName(c.category) + ' ×' + c.qty, money(c.total) + ' ' + cur)); });
    }
    if ((d.top_items || []).length) {
      kids.push(el('div', { class: 'r-rule' }), el('div', { class: 'r-sec', text: t('rep_top_items') }));
      d.top_items.slice(0, 8).forEach(function (it) { kids.push(line((it.name || '') + ' ×' + it.qty, money(it.total) + ' ' + cur)); });
    }
    kids.push(el('div', { class: 'r-rule' }), el('div', { class: 'r-phone', dir: 'ltr' }, phoneList().map(function (ph) { return el('div', { text: ph }); })));
    return el('div', { class: 'rcpt', dir: L._dir, style: '--pw:' + width }, kids);
  }
  function reportTicketHTML(d, net) {
    var lang = state.lang; var L = I18N[lang] || I18N.ku;
    var cur = d.currency || state.settings.currency || 'IQD';
    var dots = widthMm() === 58 ? 384 : 576;
    var b = net ? (dots / 576) : 1; var u = net ? 'px' : 'pt';
    var sz = function (n) { return net ? Math.round(n * b) + 'px' : n + 'pt'; };
    var line = function (l, v, big) { return '<div class="rl' + (big ? ' big' : '') + '"><span dir="auto">' + escHtml(l) + '</span><span dir="ltr">' + escHtml(v) + '</span></div>'; };
    var inner = '<div class="brand" dir="auto">' + escHtml(bizName(lang)) + '</div>'
      + '<div class="rsub">' + escHtml(t('rep_title') + ' · ' + reportRangeLabel(d)) + '</div>'
      + '<div class="meta"><span dir="ltr">' + escHtml(reportDateRange(d)) + '</span></div>'
      + '<div class="rule solid"></div>'
      + line(t('rep_total_sales'), money(d.total_sales) + ' ' + cur, true)
      + line(t('rep_orders'), String(d.orders)) + line(t('rep_items'), String(d.items_sold))
      + line(t('rep_avg'), money(d.avg_order) + ' ' + cur);
    if ((d.by_category || []).length) { inner += '<div class="rule"></div><div class="rs">' + escHtml(t('rep_by_category')) + '</div>'; d.by_category.forEach(function (c) { inner += line(catName(c.category) + ' ×' + c.qty, money(c.total) + ' ' + cur); }); }
    if ((d.top_items || []).length) { inner += '<div class="rule"></div><div class="rs">' + escHtml(t('rep_top_items')) + '</div>'; d.top_items.slice(0, 8).forEach(function (it) { inner += line((it.name || '') + ' ×' + it.qty, money(it.total) + ' ' + cur); }); }
    inner += '<div class="rule"></div><div class="phone" dir="ltr">' + phoneList().map(function (p) { return '<div>' + escHtml(p) + '</div>'; }).join('') + '</div>';
    var extra = '<style>'
      + '.rsub{text-align:center;font-weight:800;font-size:' + sz(11) + ';margin-top:' + (net ? '3px' : '.5mm') + ';}'
      + '.rs{font-weight:900;text-align:start;margin:' + (net ? '8px 0 3px' : '1.5mm 0 .5mm') + ';font-size:' + sz(9.5) + ';}'
      + '.rl{display:flex;justify-content:space-between;gap:8px;padding:' + (net ? '3px 0' : '.6mm 0') + ';font-size:' + sz(9.5) + ';}'
      + '.rl span{unicode-bidi:isolate;}.rl span:last-child{font-weight:800;}'
      + '.rl.big{font-weight:900;font-size:' + sz(14) + ';}'
      + '</style>';
    return ticketDoc(inner, net, dots, L._dir).replace('</head>', extra + '</head>');
  }
  function printReportBrowser(d) { printRoot.textContent = ''; printRoot.appendChild(buildReportEl(d)); setTimeout(function () { window.print(); }, 80); }
  function printReportDirect(d) {
    var z = (window.nb && window.nb.printTicket) ? customerZone() : null;
    if (z) {
      var p = printerById(z.printer_id);
      sendTo(p, reportTicketHTML(d, p.kind === 'network')).then(function (r) {
        if (r && r.ok) { toast(t('printed'), 'ok'); } else { toast(t('print_failed'), 'bad'); printReportBrowser(d); }
      });
      return;
    }
    printReportBrowser(d);
  }
  function printReport(d) {
    var showPrev = String(state.settings.show_preview == null ? '1' : state.settings.show_preview) !== '0';
    if (!showPrev) { printReportDirect(d); return; }
    var lang = state.lang; var L = I18N[lang] || I18N.ku;
    var bg = el('div', { class: 'modal-bg', onclick: function (e) { if (e.target === bg) close(); } });
    function close() { if (bg.parentNode) document.body.removeChild(bg); }
    var printBtn = el('button', { class: 'btn green', text: t('rep_print') });
    printBtn.onclick = function () { printReportDirect(d); close(); };
    bg.appendChild(el('div', { class: 'modal receipt-modal' }, [
      el('div', { class: 'rm-title' }, [el('h3', { text: t('rep_title') })]),
      el('div', { class: 'preview-paper', dir: L._dir }, [buildReportEl(d)]),
      el('div', { class: 'modal-actions' }, [el('button', { class: 'btn gray', text: t('close'), onclick: close }), printBtn]),
    ]));
    document.body.appendChild(bg);
  }

  /* ------------------------------ BOOT ------------------------------ */
  function boot() {
    Promise.all([
      api('/foods').then(function (d) { state.foods = d.foods || []; }),
      api('/categories').then(function (d) { state.categories = d.categories || []; }).catch(function () {}),
      api('/settings').then(function (d) { state.settings = d.settings || {}; }),
      api('/printers').then(function (d) { state.printerCfg = { printers: d.printers || [], zones: d.zones || [] }; }).catch(function () {}),
      api('/drafts').then(function (d) { state.drafts = d.drafts || []; }).catch(function () {}),
    ]).then(function () { state.view = 'pos'; renderApp(); })
      .catch(function () { state.view = 'pos'; renderApp(); });
  }

  if (window.nb && window.nb.onUpdate) {
    window.nb.onUpdate(function (d) {
      if (!d) return;
      if (d.state === 'available') toast('New update available — downloading…', 'ok');
      else if (d.state === 'downloading') toast('Downloading update… ' + (d.percent || 0) + '%', 'ok');
      else if (d.state === 'ready') toast('Update ready — restart to install', 'ok');
    });
  }

  if (state.token) {
    api('/me').then(function (d) { state.user = d.user; boot(); })
      .catch(function () { state.token = null; localStorage.removeItem(TOKEN_KEY); renderLogin(); });
  } else { renderLogin(); }
})();
