'use strict';
(function () {
  var API = 'api';
  var TOKEN_KEY = 'bb_token';
  var TICKET_KEY = 'bb_ticket';   // the order the register is open on, so a restart comes back to it
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
      pay_print: 'Pay & print', send_kitchen: 'Send to kitchen', sent_kitchen: 'Sent to kitchen', already_sent: 'Already sent to the kitchen',
      ticket_no: 'Order no.', merge: 'Merge', merge_title: 'Change the order number', merge_from: 'This order', merge_into: 'Merge into order no.',
      merge_help: 'Type the number of the ticket this order belongs to. Everything here moves onto that ticket and the two become one bill.',
      merge_do: 'Merge', merge_need_no: 'Enter an order number', merge_same: 'That is already this order', merged_into: 'Merged into',
      merge_today: 'Today’s orders', merge_none: 'No other order today',
      st_sent: 'sent', st_new: 'new', line_locked: 'Already sent to the kitchen — it cannot be reduced',
      line_locked_hint: 'This food is already cooking. Add more, or make a new ticket.',
      ticket_new: 'New ticket', new_order: 'New order', new_order_hint: 'Close this ticket on screen and start the next customer',
      open_ticket: 'Open ticket…', open_ticket_help: 'Tickets that still owe money or still have food to cook.',
      no_open_tickets: 'Nothing open', opened_ticket: 'Opened', balance_due: 'Due', paid_full: 'Paid',
      nothing_due: 'Nothing left to pay on this ticket', paid_so_far: 'Paid', reprint_kitchen: 'Reprint kitchen ticket', reprinted: 'Reprinted',
      tr_title: 'Tell the kitchen the number changed', tr_skip: 'Not now', tr_print: 'Print transfer slip',
      tr_help: 'The kitchen already has a slip for {from}. That food is now on {to}. Print a slip so they match up.',
      tr_slip_title: 'ORDER NUMBER CHANGED', tr_slip_note: 'Same food — do not cook again', tr_printed: 'Transfer slip sent to the kitchen',
      kitchen_print_failed: 'The kitchen printer did not respond — nothing printed', no_printer_for: 'No kitchen printer is set for:',
      reprint_confirm: 'Print the last kitchen ticket again?', kitchen_hold_hint: 'Nothing reached the kitchen. This ticket is still open so you can print it again.', paid_before: 'Paid before', pay_unknown: 'From before the update — check if paid',
      order_closed_hint: 'This ticket is from a closed day — print it from Orders, then ring the new items as a new order.',
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
      receipt_designer: 'Receipt', rd_hint: 'Customize the customer receipt — the preview updates live as you change things.',
      logo: 'Logo', upload_logo: 'Upload logo', no_logo: 'No logo', subtitle: 'Subtitle / slogan', thanks_line: 'Thank-you line', footer_text: 'Footer text',
      text_size: 'Text size', name_size: 'Name size', logo_size: 'Logo size', alignment: 'Alignment', show_date: 'Date / №', show_hide: 'Show / hide',
      rd_customer: 'Customer receipt', rd_kitchen: 'Kitchen ticket', show_notes: 'Item notes', kitchen_footer: 'Kitchen footer',
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
      pay_print: 'پارەدان و چاپ', send_kitchen: 'ناردن بۆ چێشتخانە', sent_kitchen: 'نێردرا بۆ چێشتخانە', already_sent: 'پێشتر نێردراوە بۆ چێشتخانە',
      ticket_no: 'ژمارەی داواکاری', merge: 'تێکەڵکردن', merge_title: 'گۆڕینی ژمارەی داواکاری', merge_from: 'ئەم داواکارییە', merge_into: 'تێکەڵی داواکاری ژمارە',
      merge_help: 'ژمارەی ئەو داواکارییە بنووسە کە ئەمە هی ئەوە. هەموو ئەمانە دەچنە سەر ئەو ژمارەیە و دەبنە یەک پسوولە.',
      merge_do: 'تێکەڵ بکە', merge_need_no: 'ژمارەی داواکاری بنووسە', merge_same: 'ئەمە هەر خۆیەتی', merged_into: 'تێکەڵکرا لەگەڵ',
      merge_today: 'داواکارییەکانی ئەمڕۆ', merge_none: 'هیچ داواکارییەکی تر نییە ئەمڕۆ',
      st_sent: 'نێردراوە', st_new: 'نوێ', line_locked: 'نێردراوە بۆ چێشتخانە — ناتوانرێت کەم بکرێت',
      line_locked_hint: 'ئەم خواردنە ئێستا لێدەنرێت. زیاد بکە، یان داواکارییەکی نوێ دروست بکە.',
      ticket_new: 'داواکاری نوێ', new_order: 'داواکاری نوێ', new_order_hint: 'ئەم داواکارییە دابخە و دەست بە کڕیاری داهاتوو بکە',
      open_ticket: 'کردنەوەی داواکاری…', open_ticket_help: 'ئەو داواکارییانەی هێشتا پارەیان ماوە یان خواردنیان لێنەنراوە.',
      no_open_tickets: 'هیچ داواکارییەکی کراوە نییە', opened_ticket: 'کرایەوە', balance_due: 'ماوە', paid_full: 'پارە دراوە',
      nothing_due: 'هیچ پارەیەک نەماوە لەم داواکارییە', paid_so_far: 'دراوە', reprint_kitchen: 'دووبارە چاپکردنی پسوولەی چێشتخانە', reprinted: 'دووبارە چاپکرا',
      tr_title: 'ئاگادارکردنەوەی چێشتخانە بە گۆڕینی ژمارە', tr_skip: 'ئێستا نا', tr_print: 'چاپی پسوولەی گواستنەوە',
      tr_help: 'چێشتخانە پسوولەی {from} ی هەیە. ئەو خواردنە ئێستا لەسەر {to} یە. پسوولەیەک چاپ بکە بۆ یەکخستنیان.',
      tr_slip_title: 'ژمارەی داواکاری گۆڕا', tr_slip_note: 'هەمان خواردن — دووبارە لێمەنێ', tr_printed: 'پسوولەی گواستنەوە نێردرا بۆ چێشتخانە',
      kitchen_print_failed: 'پرینتەری چێشتخانە وەڵامی نەدایەوە — هیچ چاپ نەکرا', no_printer_for: 'پرینتەری چێشتخانە دانەنراوە بۆ:',
      reprint_confirm: 'دووبارە پسوولەی کۆتایی چێشتخانە چاپ بکرێت؟', kitchen_hold_hint: 'هیچ نەگەیشتە چێشتخانە. ئەم داواکارییە کراوەیە بۆ ئەوەی دووبارە چاپی بکەیت.', paid_before: 'پێشتر دراوە', pay_unknown: 'پێش نوێکردنەوە — بزانە پارە دراوە یان نا',
      order_closed_hint: 'ئەم داواکارییە هی ڕۆژێکی داخراوە — لە «داواکارییەکان» چاپی بکە، ئینجا شتە نوێیەکان وەک داواکارییەکی نوێ تۆمار بکە.',
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
      receipt_designer: 'وەسڵ', rd_hint: 'وەسڵی کڕیار خۆت ڕێکبخە — پێشبینین لە هەمان کاتدا نوێ دەبێتەوە.',
      logo: 'لۆگۆ', upload_logo: 'بارکردنی لۆگۆ', no_logo: 'بێ لۆگۆ', subtitle: 'ژێرناو / دروشم', thanks_line: 'دێڕی سوپاس', footer_text: 'نووسینی ژێرەوە',
      text_size: 'قەبارەی نووسین', name_size: 'قەبارەی ناو', logo_size: 'قەبارەی لۆگۆ', alignment: 'ڕێکخستن', show_date: 'بەروار / ژمارە', show_hide: 'پیشاندان / شاردنەوە',
      rd_customer: 'وەسڵی کڕیار', rd_kitchen: 'وەسڵی چێشتخانە', show_notes: 'تێبینییەکان', kitchen_footer: 'ژێرەوەی چێشتخانە',
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
      pay_print: 'الدفع والطباعة', send_kitchen: 'إرسال للمطبخ', sent_kitchen: 'أُرسل للمطبخ', already_sent: 'أُرسل للمطبخ مسبقاً',
      ticket_no: 'رقم الطلب', merge: 'دمج', merge_title: 'تغيير رقم الطلب', merge_from: 'هذا الطلب', merge_into: 'دمج مع الطلب رقم',
      merge_help: 'اكتب رقم الطلب الذي ينتمي إليه هذا الطلب. كل ما هنا ينتقل إلى ذلك الرقم ويصبحان فاتورة واحدة.',
      merge_do: 'دمج', merge_need_no: 'اكتب رقم الطلب', merge_same: 'هذا هو نفس الطلب', merged_into: 'تم الدمج مع',
      merge_today: 'طلبات اليوم', merge_none: 'لا يوجد طلب آخر اليوم',
      st_sent: 'أُرسل', st_new: 'جديد', line_locked: 'أُرسل للمطبخ — لا يمكن إنقاصه',
      line_locked_hint: 'هذا الصنف قيد الطهي. أضف المزيد أو ابدأ طلباً جديداً.',
      ticket_new: 'طلب جديد', new_order: 'طلب جديد', new_order_hint: 'أغلق هذا الطلب على الشاشة وابدأ بالزبون التالي',
      open_ticket: 'فتح طلب…', open_ticket_help: 'الطلبات التي عليها مبلغ متبقٍ أو أصناف لم تُطبخ بعد.',
      no_open_tickets: 'لا يوجد طلب مفتوح', opened_ticket: 'فُتح', balance_due: 'المتبقي', paid_full: 'مدفوع',
      nothing_due: 'لا يوجد مبلغ متبقٍ على هذا الطلب', paid_so_far: 'مدفوع', reprint_kitchen: 'إعادة طباعة تذكرة المطبخ', reprinted: 'أُعيدت الطباعة',
      tr_title: 'إبلاغ المطبخ بتغيّر الرقم', tr_skip: 'ليس الآن', tr_print: 'طباعة قسيمة التحويل',
      tr_help: 'لدى المطبخ قسيمة للطلب {from}. هذا الطعام الآن على {to}. اطبع قسيمة ليتطابقا.',
      tr_slip_title: 'تغيّر رقم الطلب', tr_slip_note: 'نفس الطعام — لا تطبخه مرة أخرى', tr_printed: 'أُرسلت قسيمة التحويل إلى المطبخ',
      kitchen_print_failed: 'طابعة المطبخ لم تستجب — لم تتم أي طباعة', no_printer_for: 'لا توجد طابعة مطبخ لـ:',
      reprint_confirm: 'إعادة طباعة آخر تذكرة مطبخ؟', kitchen_hold_hint: 'لم يصل شيء إلى المطبخ. هذا الطلب ما زال مفتوحاً لتتمكن من طباعته مرة أخرى.', paid_before: 'مدفوع سابقاً', pay_unknown: 'من قبل التحديث — تحقق من الدفع',
      order_closed_hint: 'هذا الطلب من يوم مُغلق — اطبعه من «الطلبات» ثم سجّل الأصناف الجديدة كطلب جديد.',
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
      receipt_designer: 'الإيصال', rd_hint: 'خصّص إيصال الزبون — المعاينة تتحدّث فوراً أثناء التغيير.',
      logo: 'الشعار', upload_logo: 'رفع شعار', no_logo: 'بلا شعار', subtitle: 'عنوان فرعي / شعار', thanks_line: 'سطر الشكر', footer_text: 'نص التذييل',
      text_size: 'حجم النص', name_size: 'حجم الاسم', logo_size: 'حجم الشعار', alignment: 'المحاذاة', show_date: 'التاريخ / الرقم', show_hide: 'إظهار / إخفاء',
      rd_customer: 'إيصال الزبون', rd_kitchen: 'تذكرة المطبخ', show_notes: 'الملاحظات', kitchen_footer: 'تذييل المطبخ',
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
    cart: [],          // [{ id, name, price, qty, note, sent }]
    // The order this cart is open on, once anything has been fired to the kitchen. Lives on `state`,
    // not inside renderPOS, so a trip to Settings/Foods and back doesn't lose the open ticket and
    // make the next "send to kitchen" ring a SECOND order for the same table.
    firedOrder: null,
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
          if (!res.ok) { var e = new Error((data && data.error) || 'Request failed'); e.status = res.status; e.data = data || {}; throw e; }
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
  function num(v) { var n = Number(v); return isFinite(n) ? n : 0; }
  function money(n) { var v = Math.round(Number(n) || 0); return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function phoneList(s) {
    s = s || state.settings;
    var raw = s.phones || s.phone || '0750 947 1000';
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
    // drop the open ticket on sign-out — the next cashier must never inherit someone else's
    // ticket number and grow it by mistake (this used to happen for free when firedOrder was a
    // renderPOS local; it now lives on state, so clear it explicitly)
    var done = function () { clearInterval(window._clk); window._clk = null; state.token = null; state.user = null; state.firedOrder = null; state.cart = []; localStorage.removeItem(TOKEN_KEY); try { localStorage.removeItem(TICKET_KEY); } catch (_) {} renderLogin(); };
    if (state.token) api('/logout', { method: 'POST' }).then(done, done); else done();
  }

  /* ------------------------------ LOGIN ------------------------------ */
  function renderLogin() {
    painted = null;                     // not a view — nothing to save or restore here
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
  // The whole page scrolls (the POS grid is not its own scroll box), so switching to Settings and
  // back would land the cashier at the top of a long menu. Remember where each view was left and
  // put it back after the new view has painted.
  var scrollPos = {};
  var painted = null;   // the view currently on screen, so renderApp can save ITS position
  function scroller() { return document.scrollingElement || document.documentElement; }
  // Save from inside renderApp rather than at each call site: the shell is also rebuilt by a
  // language switch, a settings save and the sidebar toggle, and those must record where the
  // cashier actually is — not replay the offset from the last time they navigated away.
  function saveScroll() { if (painted !== null) scrollPos[painted] = scroller().scrollTop; }
  function restoreScroll() {
    var key = painted, y = scrollPos[key] || 0; if (!y) return;
    var se = scroller(), tries = 0, done = false;
    var stop = function () {
      done = true;
      window.removeEventListener('wheel', stop); window.removeEventListener('touchstart', stop); window.removeEventListener('keydown', stop);
    };
    var attempt = function () {
      if (done || painted !== key) return stop();
      se.scrollTop = y; tries += 1;
      if (Math.abs(se.scrollTop - y) <= 1 || tries >= 6) stop();   // landed, or give up — never loop forever
    };
    // Orders, Foods and Reports paint EMPTY and fill in from the server after this render, so the
    // page is still too short to hold the offset on the first pass. Retry briefly until the content
    // has arrived — and stop the moment the cashier touches the screen, so we never fight them.
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    attempt();
    [16, 120, 300, 600, 1000].forEach(function (ms) { setTimeout(attempt, ms); });
  }
  function goView(key) { state.view = key; state.sidebarOpen = false; renderApp(); }
  function navItem(key, icon, label) {
    var kids = [];
    if (icon) kids.push(el('span', { class: 'ico', text: icon }));
    kids.push(el('span', { text: label }));
    return el('button', { class: 'sb-item' + (state.view === key ? ' active' : ''),
      onclick: function () { goView(key); } }, kids);
  }

  function renderApp() {
    saveScroll();                       // where the view being replaced actually is, right now
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
    painted = state.view || '_';
    restoreScroll();
  }

  /* ------------------------------ POS ------------------------------ */
  // Fold ONE food into the shared POS menu in place. state.foods holds only ACTIVE foods in the
  // server's order (sort_order, then id), so editing a food in Manage Foods can move its card to
  // the new category, rename it or drop it — without refetching the menu and rebuilding the grid.
  function foodOrder(a, b) { return (Number(a.sort_order || 0) - Number(b.sort_order || 0)) || (a.id - b.id); }
  function applyFoodLocal(f) {
    state.foods = state.foods.filter(function (x) { return x.id !== f.id; });
    if (f.is_active) state.foods.push(f);
    state.foods.sort(foodOrder);
  }
  function removeFoodLocal(id) { state.foods = state.foods.filter(function (x) { return x.id !== id; }); }
  function liveFood(id) { return state.foods.filter(function (x) { return x.id === id; })[0] || null; }
  // resolve name/price LIVE from state.foods (fall back to the add-time snapshot only if the food
  // was removed), so a mid-order language switch or a price edit shows in the cart and matches what
  // the server actually charges at checkout.
  function cartName(c) { var f = liveFood(c.id); return f ? foodName(f) : c.name; }
  function cartPrice(c) { var f = liveFood(c.id); return f ? f.price : c.price; }
  function cartTotal() { return state.cart.reduce(function (s, c) { return s + cartPrice(c) * c.qty; }, 0); }
  function cartCount() { return state.cart.reduce(function (s, c) { return s + c.qty; }, 0); }
  function addToCart(f) {
    // Merge repeated taps of the SAME food into ONE line — but only the PLAIN (no-note) line, so a
    // noted variant (e.g. "no tomato") keeps its own separate line. Grow a noted line with its +/- .
    // So: tap 2 → add the note → tap 2 more starts a fresh plain line = "2 no-tomato" + "2 normal".
    var plain = state.cart.filter(function (c) { return c.id === f.id && !(c.note || '').trim(); })[0];
    if (plain) { plain.qty += 1; return; }
    state.cart.push({ id: f.id, name: foodName(f), price: f.price, qty: 1, note: '', sent: 0 });
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
      // mirror the server's re-numbering (10, 20, 30…) locally, so a later in-place food edit
      // re-sorts to the arrangement the cashier just dragged instead of the pre-drag one
      state.foods.forEach(function (f, i) { f.sort_order = (i + 1) * 10; });
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
    // ---- keyed, in-place grid reconcile ----
    // A card is identified by its food id and is MUTATED, never rebuilt. The old nuke-and-rebuild
    // (grid.textContent = '' on every redraw) blanked the menu for a frame and dropped the page's
    // scroll position on every single cart tap and every menu edit. Now only what actually changed
    // touches the DOM: a card whose category changed moves between filters, a card whose name or
    // price changed updates its text, and everything else is left exactly where it is.
    function cardOf(f) {
      var card = el('div', { class: 'food-card', 'data-fid': f.id, onclick: function () {
        if (arrange) return;
        var live = liveFood(card._fid) || card._food;
        if (!live) return;
        addToCart(live); drawGrid(); drawCart();
        if (window.innerWidth <= 1000) { state.cartOpen = true; cartEl.classList.add('open'); }
      } }, [
        el('span', { class: 'fadd' }),
        el('div', { class: 'fname' }),
        el('div', { class: 'fprice' }, [el('span', { class: 'fp' }), ' ', el('small')]),
      ]);
      card._fid = f.id;
      bindDrag(card);   // bound once at creation; the handlers no-op while `arrange` is off
      return card;
    }
    function syncCard(card, f) {
      card._food = f;
      var q = state.cart.filter(function (c) { return c.id === f.id; }).reduce(function (s, c) { return s + c.qty; }, 0);
      // one badge span, three looks — .fgrip / .qbadge / .fadd sit in the same corner
      var badge = card.firstChild;
      var cls = arrange ? 'fgrip' : (q ? 'qbadge' : 'fadd');
      var txt = arrange ? '⋮⋮' : (q ? String(q) : '+');
      if (badge.className !== cls) badge.className = cls;
      if (badge.textContent !== txt) badge.textContent = txt;
      var nm = foodName(f), nEl = card.querySelector('.fname');
      if (nEl.textContent !== nm) nEl.textContent = nm;
      var pr = money(f.price), pEl = card.querySelector('.fp');
      if (pEl.textContent !== pr) pEl.textContent = pr;
      var cu = state.settings.currency || 'IQD', cEl = card.querySelector('.fprice small');
      if (cEl.textContent !== cu) cEl.textContent = cu;
    }
    function drawGrid() {
      grid.classList.toggle('arranging', arrange);
      var list = arrange ? state.foods
        : state.foods.filter(function (f) { return state.cat === 'all' || (f.category || 'other') === state.cat; });
      // index the cards already on screen; anything that isn't a card (the empty-state block) goes
      var have = {};
      Array.prototype.slice.call(grid.children).forEach(function (n) {
        var k = n.getAttribute && n.getAttribute('data-fid');
        if (k) have[k] = n; else grid.removeChild(n);
      });
      if (!list.length) {
        grid.textContent = '';
        grid.appendChild(el('div', { class: 'empty', style: 'grid-column:1/-1' }, [el('h3', { text: '—' })]));
        return;
      }
      var prev = null;
      list.forEach(function (f) {
        var key = String(f.id);
        var card = have[key];
        if (card) delete have[key]; else card = cardOf(f);
        syncCard(card, f);
        // move it only when it is not already in the right place — a needless insertBefore would
        // still tear the node out of the layout and kill an in-flight touch
        var want = prev ? prev.nextSibling : grid.firstChild;
        if (card !== want) grid.insertBefore(card, want);
        prev = card;
      });
      Object.keys(have).forEach(function (k) { if (have[k].parentNode === grid) grid.removeChild(have[k]); });
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
          var sent = Math.max(0, c.sent || 0);            // units the kitchen already has
          var fresh = Math.max(0, c.qty - sent);          // units the next Send will print
          var locked = sent > 0;
          var noteInput = el('input', { class: 'ci-note', type: 'text', dir: 'auto', value: c.note || '',
            placeholder: t('note_ph'), disabled: locked || undefined,
            title: locked ? t('line_locked_hint') : undefined,
            oninput: function (e) { c.note = e.target.value; } });
          // Refuse to take a line below what the kitchen is already cooking — that food exists.
          var tooLow = function () { toast(t('line_locked'), 'bad'); };
          bodyC.appendChild(el('div', { class: 'cart-item' + ((c.note || '').trim() ? ' has-note' : '') + (locked ? ' locked' : '') + (fresh > 0 && sent > 0 ? ' part' : '') }, [
            el('div', { class: 'ci-main' }, [
              el('div', { class: 'ci-name' }, [
                el('div', { class: 'n', text: cartName(c) }),
                el('div', { class: 'p', text: money(cartPrice(c)) }),
              ]),
              el('div', { class: 'qty' }, [
                el('button', { text: '−', onclick: function () {
                  if (c.qty - 1 < sent) return tooLow();
                  c.qty -= 1; if (c.qty <= 0) state.cart = state.cart.filter(function (x) { return x !== c; });
                  drawGrid(); drawCart();
                } }),
                el('span', { class: 'q', text: String(c.qty) }),
                el('button', { text: '+', onclick: function () { c.qty += 1; drawGrid(); drawCart(); } }),
              ]),
              el('div', { class: 'ci-tot', text: money(cartPrice(c) * c.qty) }),
              el('div', { class: 'ci-del', text: locked ? '🔒' : '✕', title: locked ? t('line_locked_hint') : '', onclick: function () {
                if (locked) return tooLow();
                state.cart = state.cart.filter(function (x) { return x !== c; }); drawGrid(); drawCart();
              } }),
            ]),
            // the whole point of the v1.7 work: the cashier can see, per line, what is already
            // cooking and what the kitchen button is about to print. Shown once the register is on a
            // ticket — on a fresh unbound cart every line is new, so badges would be pure noise.
            (state.firedOrder || sent) ? el('div', { class: 'ci-state' }, [
              sent ? el('span', { class: 'st-sent', text: '✓ ' + sent + ' ' + t('st_sent') }) : null,
              fresh ? el('span', { class: 'st-new', text: '+' + fresh + ' ' + t('st_new') }) : null,
            ]) : null,
            noteInput,
          ]));
        });
      }
      var o = state.firedOrder;
      // What is still owed, computed from the CART — o.balance is the server's last word and goes
      // stale the moment a new item is tapped, which would under-state what to collect.
      var collected = o ? num(o.paid_total) : 0;
      var owed = o ? Math.max(0, cartTotal() - collected) : cartTotal();
      var pendUnits = pendingLines().reduce(function (a, x) { return a + x.qty; }, 0);
      var foot = el('div', { class: 'cart-foot' }, [
        // WHICH TICKET AM I ON. This row is the answer, and it is always on screen while a ticket is
        // open — the register used to stay silently bound to a ticket after a merge, so the next
        // customer's food was billed to it. Tap the number to move this ticket onto another one.
        o ? el('div', { class: 'cart-ticket' + (owed > 0 ? ' owing' : '') }, [
          el('span', { class: 'ct-lbl', text: t('ticket_no') }),
          el('button', { class: 'ct-no', dir: 'ltr', title: t('merge_title'),
            onclick: function () { mergeTicket(); } }, ['#' + o.order_no, el('span', { class: 'ct-pen', text: '✎' })]),
          collected > 0 ? el('span', { class: 'ct-paid', dir: 'ltr',
            text: owed > 0 ? (t('paid_so_far') + ' ' + money(collected)) : t('paid_full') }) : null,
          el('button', { class: 'ct-new', text: t('new_order'), title: t('new_order_hint'),
            onclick: function () { releaseTicket(); } }),
        ]) : el('div', { class: 'cart-ticket' }, [
          el('span', { class: 'ct-lbl', text: t('ticket_new') }),
          el('button', { class: 'ct-open', text: t('open_ticket'), onclick: function () { openTicketPicker(); } }),
        ]),
        el('div', { class: 'cart-total' }, [
          el('span', { class: 'lbl', text: t('total') }),
          el('span', { class: 'val' }, [money(cartTotal()) + ' ', el('small', { text: state.settings.currency || 'IQD' })]),
        ]),
        // A ticket that has already taken money shows what is genuinely left to collect, so the
        // cashier never charges the whole ticket twice — or forgets to charge for the new food.
        collected > 0 ? el('div', { class: 'cart-total due' }, [
          el('span', { class: 'lbl', text: t('balance_due') }),
          el('span', { class: 'val' }, [money(owed) + ' ', el('small', { text: state.settings.currency || 'IQD' })]),
        ]) : null,
        el('div', { class: 'cart-actions' }, [
          el('button', { class: 'btn green', onclick: function () { payComplete(); } }, ['💵 ' + t('pay_print')]),
          (function () {
            var nothingNew = o && pendUnits === 0;
            return el('button', { class: 'btn kitchen' + (nothingNew ? ' sent' : ''), onclick: function () { sendToKitchen(); } },
              [nothingNew ? ('✓ ' + t('sent_kitchen') + ' #' + o.order_no)
                          : ('🍳 ' + t('send_kitchen') + (pendUnits ? ' (' + pendUnits + ')' : ''))]);
          })(),
        ]),
        // reprint is the recovery when the printer jammed — it re-sends what is already marked
        // cooked and changes nothing, so it can never double-book the food
        // NOT in the Clear slot and NOT full-width: the cashier's muscle memory says the button at
        // the bottom of the cart empties it, and a mis-tap here prints food to the grill.
        o && pendUnits === 0 && cartCount() > 0
          ? el('button', { class: 'cart-reprint', text: '⎙ ' + t('reprint_kitchen'), onclick: function () { reprintKitchen(); } }) : null,
        state.cart.length && !o ? el('button', { class: 'btn hold', onclick: function () { saveDraft(); } }, ['⏸ ' + t('save_draft')]) : null,
        state.cart.length && !o ? el('button', { class: 'cart-clear', text: t('clear'), onclick: function () { state.cart = []; drawGrid(); drawCart(); } }) : null,
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
          .then(function (d) { state.drafts.push(d.draft); state.cart = []; state.firedOrder = null; state.cartOpen = false; cartEl.classList.remove('open'); drawGrid(); drawCart(); drawDrafts(); toast(t('draft_saved'), 'ok'); })
          .catch(function (e) { if (e.status === 401) return logout(); toast(e.message || 'Error', 'bad'); });
      });
    }
    function recallDraft(d) {
      var go = function () {
        state.firedOrder = null;   // a recalled draft is a fresh cart — nothing sent to the kitchen yet
        try { localStorage.removeItem(TICKET_KEY); } catch (_) {}
        state.cart = (d.items || []).map(function (it) { var f = liveFood(it.food_id); return { id: it.food_id, name: f ? foodName(f) : (it.name || ''), price: f ? f.price : it.price, qty: it.qty, note: it.note || '', sent: 0 }; });
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

    // Two INDEPENDENT actions so paying never auto-fires the kitchen:
    //   • Pay & Print     -> save the order + print the customer/cash receipt (no kitchen ticket)
    //   • Send to kitchen -> save the order + print the kitchen station ticket(s) (no receipt)
    // To avoid a DOUBLE order when both are used on one cart (send to kitchen, then pay), "Send to
    // kitchen" remembers the saved order + a signature of the cart; "Pay & Print" reuses that same
    // order (just prints its receipt) as long as the cart hasn't changed since it was fired.
    // The order is OPENED on the first "Send to kitchen" (or at pay) and then GROWS in place: each
    // cart line tracks how many of it have been fired (line.sent). "Send to kitchen" fires ONLY the
    // not-yet-sent items and updates the SAME order (same #), so adding an item after a first send
    // sends just the new item — never re-fires what's already cooking and never makes a 2nd order.
    function liveCat(id) { var f = liveFood(id); return (f && f.category) || 'other'; }
    function orderItems() { return state.cart.map(function (c) { return { food_id: c.id, qty: c.qty, note: c.note || '' }; }); }
    // Lines with units not yet fired to the kitchen — captured as {line, qty} so we later mark
    // EXACTLY what we fired. We never re-read the live cart to mark "sent", because the cashier can
    // add/increment items during the server round-trip; those must stay pending, not be flagged sent.
    function pendingLines() {
      var out = [];
      state.cart.forEach(function (c) { var d = c.qty - (c.sent || 0); if (d > 0) out.push({ line: c, qty: d }); });
      return out;
    }
    // ---- the cart is now a VIEW of a server-owned ticket ----
    // Every line carries the server's printed_qty as `sent`, so "what has the kitchen got?" survives
    // a restart, a merge, a view switch and a second machine. It used to live only here, in memory.
    function lineOf(it) {
      var f = liveFood(it.food_id);
      return { id: it.food_id, item_id: it.id, name: f ? foodName(f) : (it.name || ''),
               price: f ? f.price : it.price, qty: it.qty, note: it.note || '', sent: num(it.printed_qty) };
    }
    function cartFromOrder(order) { applyOrder(order, null); }
    // Adopt the server's version of the ticket. When `posted` is given (what we just saved), any
    // units the cashier rang DURING the round trip are carried over instead of being wiped — the
    // save happens over two whole-file writes, which is easily long enough to tap another item.
    function applyOrder(order, posted) {
      state.firedOrder = order;
      var K = function (fid, note) { return fid + '|' + String(note || '').trim(); };
      var postedBy = {}, localBy = {};
      if (posted) {
        posted.forEach(function (it) { var k = K(it.food_id, it.note); postedBy[k] = (postedBy[k] || 0) + num(it.qty); });
        state.cart.forEach(function (c) { var k = K(c.id, c.note); localBy[k] = (localBy[k] || 0) + num(c.qty); });
      }
      var used = {}, next = [];
      (order.items || []).forEach(function (it) {
        var line = lineOf(it), k = K(it.food_id, it.note);
        if (posted && !used[k]) {                      // credit the mid-flight units once per line key
          used[k] = true;
          line.qty += Math.max(0, (localBy[k] || 0) - (postedBy[k] || 0));
        }
        next.push(line);
      });
      if (posted) state.cart.forEach(function (c) {    // a food tapped mid-flight the server never saw
        var k = K(c.id, c.note);
        if (used[k] || postedBy[k]) return;
        used[k] = true;
        next.push({ id: c.id, name: c.name, price: c.price, qty: c.qty, note: c.note || '', sent: 0 });
      });
      state.cart = next;
      rememberTicket(order.id);
    }
    function bindTicket(order) { cartFromOrder(order); drawGrid(); drawCart(); }
    function releaseTicket() {
      state.firedOrder = null; state.cart = []; rememberTicket(null);
      state.cartOpen = false; cartEl.classList.remove('open');
      drawGrid(); drawCart();
    }
    // print exactly what the SERVER said is un-printed — the browser no longer decides
    function firePrint(fired) {
      if (!fired || !(fired.items || []).length) return Promise.resolve({ ok: true, uncovered: [] });
      return routeStations({ order_no: fired.order_no, created_at: fired.at, lang: fired.lang || state.lang,
        items: (fired.items || []).map(function (it) { return { food_id: it.food_id, name: it.name, qty: it.qty, note: it.note || '', category: it.category || liveCat(it.food_id) }; }) });
    }
    // "The kitchen has no paper" is the one failure the cashier MUST not miss — the food is on the
    // bill and nobody is cooking it. A toast is the wrong weight: the receipt print fires its own
    // toast a moment later and buries it. So this blocks until it is acknowledged, and offers the
    // reprint right there. The ticket is deliberately left open behind it.
    function printWarn(r) {
      if (!r || r.ok || r.nobridge) return false;
      var uncovered = (r.uncovered && r.uncovered.length) ? r.uncovered.join(', ') : '';
      var bg = el('div', { class: 'modal-bg' });
      function close() { if (bg.parentNode) document.body.removeChild(bg); }
      var again = el('button', { class: 'btn', text: '⎙ ' + t('reprint_kitchen') });
      again.onclick = function () { close(); reprintKitchen(true); };
      bg.appendChild(el('div', { class: 'modal' }, [
        el('h3', { text: uncovered ? t('no_printer_for') : t('kitchen_print_failed') }),
        el('p', { class: 'mg-help', dir: 'auto',
          text: uncovered ? uncovered : (state.firedOrder ? (t('ticket_no') + ' #' + state.firedOrder.order_no + ' — ' + t('kitchen_hold_hint')) : t('kitchen_hold_hint')) }),
        el('div', { class: 'modal-actions' }, [
          el('button', { class: 'btn gray', text: t('close'), onclick: close }),
          uncovered ? null : again,
        ]),
      ]));
      document.body.appendChild(bg);
      return true;
    }
    function persistOrderRec() {   // create the order, or update the open one, to the FULL current cart
      var payload = { lang: state.lang, items: orderItems() };
      // NOTE: when the open ticket is no longer writable (the daily reset passed while it was still
      // open) this deliberately FAILS LOUDLY instead of re-ringing the cart as a new order. The
      // closed ticket still holds these lines, so a second order would book the same food twice —
      // silent phantom revenue in the day's totals. coErr() explains what to do instead.
      if (state.firedOrder) return api('/orders/' + state.firedOrder.id, { method: 'PUT', body: JSON.stringify(payload) }).then(function (d) { return d.order; });
      return api('/orders', { method: 'POST', body: JSON.stringify(payload) }).then(function (d) { return d.order; });
    }
    // "Save the open ticket exactly as the cart stands." Merging must never run against a cart the
    // server has not seen: the merge result replaces the cart, so an item added since the last save
    // would silently vanish off the bill. Both merge entry points flush through this first.
    state.flushOpenTicket = function () {
      if (!state.firedOrder || !state.cart.length) return Promise.resolve(null);
      return persistOrderRec().then(function (o) { state.firedOrder = o; return o; });
    };
    // remember which ticket the register is on, so an app restart mid-order comes back to it
    // instead of stranding the food (this is how a restart used to wipe every 'sent' count)
    function rememberTicket(id) {
      try { if (id) localStorage.setItem(TICKET_KEY, String(id)); else localStorage.removeItem(TICKET_KEY); } catch (_) {}
    }
    function coErr(e) {
      if (e.status === 401) return logout();
      // The open ticket belongs to a closed business day — the daily reset time passed while this
      // cart was still open. Never auto-recover by ringing a new order: the closed ticket already
      // holds these lines, so that would bill the same food twice. Tell the cashier what to do.
      if (e.status === 409 && e.data && e.data.closed) { toast(t('order_closed_hint'), 'bad'); return; }
      // 409 = a food in the cart was deleted under a stale grid; refresh the menu so it disappears
      if (e.status === 409) { api('/foods').then(function (d) { state.foods = d.foods || []; drawGrid(); drawCart(); }).catch(function () {}); }
      toast(e.message || 'Error', 'bad');
    }
    function sendToKitchen() {
      if (checkingOut) return;
      if (!state.cart.length) { toast(t('need_items'), 'bad'); return; }
      if (!pendingLines().length) { toast(t('already_sent'), 'bad'); return; }
      checkingOut = true;
      // 1. save the cart  2. ask the server for the un-printed delta (it marks it printed)
      // 3. print exactly that. The browser never decides what has already been cooked.
      var posted = orderItems();                     // exactly what we are about to save
      persistOrderRec().then(function (order) {
        return api('/orders/' + order.id + '/fire', { method: 'POST' });
      }).then(function (d) {
        return firePrint(d.fired).then(function (r) {
          applyOrder(d.order, posted);               // keep anything rung during the round trip
          drawGrid(); drawCart();
          if (!printWarn(r)) toast(d.fired ? (t('sent_kitchen') + ' · #' + d.order.order_no) : t('already_sent'), d.fired ? 'ok' : 'bad');
        });
      }).catch(coErr).then(function () { checkingOut = false; }, function () { checkingOut = false; });
    }
    // Re-print the kitchen ticket without changing any state — for a jam or an offline printer.
    function reprintKitchen(skipConfirm) {
      if (!state.firedOrder || checkingOut) return;
      // this puts paper on the grill — never on a single stray tap
      if (!skipConfirm && !confirm(t('reprint_confirm'))) return;
      checkingOut = true;
      api('/orders/' + state.firedOrder.id + '/refire', { method: 'POST' })
        .then(function (d) { firePrint(d.fired); toast(t('reprinted') + ' · #' + d.fired.order_no, 'ok'); })
        .catch(coErr).then(function () { checkingOut = false; }, function () { checkingOut = false; });
    }
    function payComplete() {
      if (checkingOut) return;
      if (!state.cart.length) { toast(t('need_items'), 'bad'); return; }
      checkingOut = true;
      var paid = null, posted = orderItems(), badPrint = false;
      // save -> flush anything the kitchen has not got (never bill uncooked food) -> collect the
      // BALANCE, not the whole total: a ticket reopened after payment only owes the new food.
      persistOrderRec().then(function (order) {
        return api('/orders/' + order.id + '/fire', { method: 'POST' });
      }).then(function (d) {
        return firePrint(d.fired).then(function (r) {
          badPrint = !!(r && !r.ok && !r.nobridge);
          return api('/orders/' + d.order.id + '/pay', { method: 'POST', body: JSON.stringify({}) });
        });
      }).then(function (d) {
        paid = d;
        printOrder(d.order);
        // The money is taken either way — the customer is standing there — but if the kitchen got
        // nothing, HOLD the ticket on screen and say so, instead of closing it and leaving food
        // billed that no one is cooking. Reprint is then one tap away.
        if (badPrint) { applyOrder(d.order, posted); drawGrid(); drawCart(); printWarn({ ok: false }); return; }
        toast(t('order_saved') + ' · #' + d.order.order_no + ' · ' + money(d.collected), 'ok');
        releaseTicket();
      }).catch(function (e) {
        // "Nothing to collect" just means this ticket was already settled and nothing new was added
        if (e && e.status === 400 && !paid) { toast(t('nothing_due'), 'bad'); return; }
        coErr(e);
      }).then(function () { checkingOut = false; }, function () { checkingOut = false; });
    }
    // ---- open ticket picker: the way back into a ticket that is still owed or still cooking ----
    function openTicketPicker() {
      if (checkingOut) return;
      var bg = el('div', { class: 'modal-bg' });
      function close() { if (bg.parentNode) document.body.removeChild(bg); }
      bg.onclick = function (e) { if (e.target === bg) close(); };
      var listBox = el('div', { class: 'mg-chips ot-list' });
      var cur = state.settings.currency || 'IQD';
      api('/orders?open=1&limit=60').then(function (d) {
        var rows = d.orders || [];
        if (!rows.length) { listBox.appendChild(el('span', { class: 'mg-none', text: t('no_open_tickets') })); return; }
        rows.forEach(function (o) {
          listBox.appendChild(el('button', { class: 'mg-chip ot-chip', dir: 'ltr', onclick: function () {
            close();
            api('/orders/' + o.id).then(function (r) {
              bindTicket(r.order);
              state.cartOpen = true; cartEl.classList.add('open');
              toast(t('opened_ticket') + ' #' + r.order.order_no, 'ok');
            }).catch(coErr);
          } }, [
            '#' + o.order_no,
            el('small', { text: o.item_count + '× · ' + money(o.total) + ' ' + cur }),
            o.paid_assumed ? el('small', { class: 'ot-owe', text: t('pay_unknown') })
              : (num(o.balance) > 0 ? el('small', { class: 'ot-owe', text: t('balance_due') + ' ' + money(o.balance) }) : null),
            num(o.pending_count) > 0 ? el('small', { class: 'ot-pend', text: '+' + o.pending_count + ' ' + t('st_new') }) : null,
          ]));
        });
      }).catch(function () {});
      bg.appendChild(el('div', { class: 'modal' }, [
        el('h3', { text: t('open_ticket') }),
        el('p', { class: 'mg-help', text: t('open_ticket_help') }),
        listBox,
        el('div', { class: 'modal-actions' }, [el('button', { class: 'btn gray', text: t('close'), onclick: close })]),
      ]));
      document.body.appendChild(bg);
    }

    // ---- change this ticket's number = merge it into another open ticket ----
    function mergeTicket() {
      if (!state.firedOrder || checkingOut) return;
      checkingOut = true;
      state.flushOpenTicket().then(function () {          // save anything added since the last send
        checkingOut = false;
        drawCart();                                       // the number may have moved on a recovery
        mergeModal(state.firedOrder, function (order, info) {
          bindTicket(order);
          toast(t('merged_into') + ' #' + order.order_no, 'ok');
          offerTransferSlip(info, order);
        });
      }, function (e) { checkingOut = false; coErr(e); });
    }

    menuWrap.appendChild(draftStrip); menuWrap.appendChild(catBar); menuWrap.appendChild(grid);
    pos.appendChild(menuWrap); pos.appendChild(cartEl);
    host.appendChild(pos);
    drawCats(); drawGrid(); drawCart(); drawDrafts(); refreshDrafts();
  }

  /* ------------------------------ FOODS MGMT ------------------------------ */
  function renderFoods(host) {
    var listBox = el('div');
    var rows = [];   // every food, active or not (this table's own copy)
    function load() {
      api('/foods?all=1').then(function (d) {
        rows = d.foods || [];
        draw(rows);
        // keep the shared POS list (grid + cart prices) in sync — it is otherwise only loaded at boot,
        // so a food added/edited/deleted here would be stale on the register until an app restart.
        state.foods = rows.filter(function (f) { return f.is_active; });
      }).catch(function (e) { if (e.status === 401) return logout(); });
    }
    // Targeted updates instead of a refetch: the server hands back the saved food, so patch both
    // lists from that one object. The POS grid then reconciles by id on its next draw — the card
    // simply moves to its new category and every other card, and the scroll position, stays put.
    function upsert(f) {
      var i = -1; rows.forEach(function (x, k) { if (x.id === f.id) i = k; });
      if (i >= 0) rows[i] = f; else rows.push(f);
      rows.sort(foodOrder);
      applyFoodLocal(f);
      draw(rows);
    }
    function drop(id) {
      rows = rows.filter(function (x) { return x.id !== id; });
      removeFoodLocal(id);
      draw(rows);
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
            el('button', { class: 'btn-ghost', text: t('edit'), onclick: function () { foodModal(f, upsert); } }),
            el('button', { class: 'btn-ghost danger', text: t('del'), onclick: function () {
              if (!confirm(t('confirm_del'))) return;
              api('/foods/' + f.id, { method: 'DELETE' }).then(function () { toast(t('saved'), 'ok'); drop(f.id); }).catch(function (e) { if (e.status === 401) return logout(); toast(e.message, 'bad'); });
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
        el('button', { class: 'btn', onclick: function () { foodModal(null, upsert); } }, [t('add_food')]),
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
      // hand the SAVED food (server's shape: real id, kept sort_order, normalised price) to the
      // caller so it can patch its lists in place instead of refetching the whole menu
      req.then(function (d) { toast(t('saved'), 'ok'); document.body.removeChild(bg); onSaved((d && d.food) || editing); })
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

  /* --------------------- MERGE TICKETS (change order no.) --------------------- */
  // Type the number of the ticket this order really belongs to. The server moves every line over,
  // folds identical lines together, recomputes the total and deletes this ticket — so two half
  // orders for one table become one bill with one number. Today's tickets only.
  function mergeModal(order, onDone) {
    var bg = el('div', { class: 'modal-bg' });
    function close() { if (bg.parentNode) document.body.removeChild(bg); }
    bg.onclick = function (e) { if (e.target === bg) close(); };
    var errBox = el('div', { class: 'err', style: 'display:none' });
    var input = el('input', { class: 'input', type: 'number', dir: 'ltr', min: '1', step: '1', inputmode: 'numeric', placeholder: '#' });
    var chips = el('div', { class: 'mg-chips' });
    var goB = el('button', { class: 'btn', text: t('merge_do') });
    var cur = state.settings.currency || 'IQD';
    // quick-pick: today's other tickets, newest first — faster and safer than typing a number
    api('/orders?today=1&limit=200').then(function (d) {
      var rows = (d.orders || []).filter(function (o) { return o.id !== order.id; }).slice(0, 30);
      if (!rows.length) { chips.appendChild(el('span', { class: 'mg-none', text: t('merge_none') })); return; }
      rows.forEach(function (o) {
        chips.appendChild(el('button', { class: 'mg-chip', dir: 'ltr', onclick: function () {
          input.value = String(o.order_no);
          Array.prototype.forEach.call(chips.children, function (n) { n.classList.remove('on'); });
          this.classList.add('on');
        } }, ['#' + o.order_no, el('small', { text: money(o.total) + ' ' + cur })]));
      });
    }).catch(function () {});
    goB.onclick = function () {
      var no = parseInt(input.value, 10) || 0;
      if (!no) { errBox.textContent = t('merge_need_no'); errBox.style.display = ''; return; }
      if (no === order.order_no) { errBox.textContent = t('merge_same'); errBox.style.display = ''; return; }
      goB.disabled = true;
      api('/orders/' + order.id + '/merge', { method: 'POST', body: JSON.stringify({ into_order_no: no }) })
        .then(function (d) { close(); onDone(d.order, d.merged_from); })
        .catch(function (e) { if (e.status === 401) return logout(); errBox.textContent = e.message || 'Error'; errBox.style.display = ''; goB.disabled = false; });
    };
    input.onkeydown = function (e) { if (e.key === 'Enter') goB.onclick(); };
    bg.appendChild(el('div', { class: 'modal' }, [
      el('h3', { text: t('merge_title') }),
      el('p', { class: 'mg-help', text: t('merge_help') }),
      errBox,
      el('div', { class: 'mg-from' }, [el('span', { text: t('merge_from') }), el('strong', { dir: 'ltr', text: '#' + order.order_no })]),
      el('div', { class: 'field' }, [el('label', { text: t('merge_into') }), input]),
      el('div', { class: 'field' }, [el('label', { text: t('merge_today') }), chips]),
      el('div', { class: 'modal-actions' }, [el('button', { class: 'btn gray', text: t('cancel'), onclick: close }), goB]),
    ]));
    document.body.appendChild(bg);
    setTimeout(function () { try { input.focus(); } catch (_) {} }, 30);
  }

  // ---- ISSUE 3: the kitchen is holding paper with the OLD number on it ----
  // Merging moves food between tickets, but a kitchen slip that already printed cannot be recalled.
  // If any of the moved food had already been sent, the kitchen has a slip headed #old for food that
  // now lives on #new — so offer the one thing that actually fixes it on a paper kitchen: a short
  // transfer slip telling them the number changed. Nothing is re-cooked; it carries no new food.
  function offerTransferSlip(info, order) {
    var moved = info && num(info.printed_qty);
    if (!moved || !order) return;
    if (!(window.nb && window.nb.printTicket)) return;      // no printer bridge (browser preview)
    var fromNo = info.order_no, toNo = order.order_no;
    var bg = el('div', { class: 'modal-bg' });
    function close() { if (bg.parentNode) document.body.removeChild(bg); }
    bg.onclick = function (e) { if (e.target === bg) close(); };
    var go = el('button', { class: 'btn', text: t('tr_print') });
    go.onclick = function () {
      close();
      var net = false;
      zones().forEach(function (z) {
        if (z.type === 'customer') return;
        var pr = printerById(z.printer_id); if (!pr) return;
        sendTo(pr, transferTicketHTML(fromNo, toNo, z.name, pr.kind === 'network', state.settings));
      });
      toast(t('tr_printed'), 'ok');
    };
    bg.appendChild(el('div', { class: 'modal' }, [
      el('h3', { text: t('tr_title') }),
      el('p', { class: 'mg-help' }, [t('tr_help').replace('{from}', '#' + fromNo).replace('{to}', '#' + toNo)]),
      el('div', { class: 'mg-from' }, [
        el('strong', { dir: 'ltr', text: '#' + fromNo }),
        el('span', { text: '→' }),
        el('strong', { dir: 'ltr', text: '#' + toNo }),
      ]),
      el('div', { class: 'modal-actions' }, [
        el('button', { class: 'btn gray', text: t('tr_skip'), onclick: close }), go,
      ]),
    ]));
    document.body.appendChild(bg);
  }

  /* ------------------------------ ORDERS ------------------------------ */
  function renderOrders(host) {
    var statsRow = el('div', { class: 'stats' });
    [t('orders_total'), t('today'), t('sales_today')].forEach(function (k) {
      statsRow.appendChild(el('div', { class: 'stat' }, [el('div', { class: 'k', text: k }), el('div', { class: 'v', text: '—' })]));
    });
    statsRow.children[2].querySelector('.v').classList.add('gold');
    var listBox = el('div');
    var todayIds = {};   // only today's tickets can still be merged — the server enforces it too
    function load() {
      api('/orders?today=1&limit=200').then(function (d) {
        todayIds = {}; (d.orders || []).forEach(function (o) { todayIds[o.id] = true; });
      }).catch(function () {}).then(function () {
        return api('/orders?limit=100').then(function (d) { draw(d.orders || []); });
      }).catch(function (e) { if (e && e.status === 401) return logout(); });
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
            // rang it twice by mistake and already paid? fold it onto the right ticket from here
            todayIds[order.id] ? el('button', { class: 'btn-ghost', text: t('merge'), onclick: function (e) { e.stopPropagation();
              // flush the register's open ticket first (see state.flushOpenTicket) so nothing the
              // cart is holding un-saved is lost when the merge result replaces it
              var flush = state.flushOpenTicket ? state.flushOpenTicket() : Promise.resolve(null);
              flush.then(function () {
                mergeModal(order, function (m, info) {
                  toast(t('merged_into') + ' #' + m.order_no, 'ok');
                  // if the register is open on either side of the merge, re-point it at the survivor
                  if (state.firedOrder && (state.firedOrder.id === order.id || state.firedOrder.id === m.id)) {
                    state.firedOrder = m;
                    state.cart = (m.items || []).map(function (it) {
                      var f = liveFood(it.food_id);
                      return { id: it.food_id, item_id: it.id, name: f ? foodName(f) : (it.name || ''),
                               price: f ? f.price : it.price, qty: it.qty, note: it.note || '', sent: num(it.printed_qty) };
                    });
                    try { localStorage.setItem(TICKET_KEY, String(m.id)); } catch (_) {}
                  }
                  offerTransferSlip(info, m);
                  load();   // this card's order no longer exists — reload rather than patch it
                });
              }, function (err) {
                // The register's open cart could NOT be saved. Do NOT merge anyway: the merge
                // replaces that cart with the server's version, which would silently drop whatever
                // failed to save. Say why and leave both tickets untouched.
                if (err && err.status === 401) return logout();
                toast((err && err.status === 409 && err.data && err.data.closed) ? t('order_closed_hint') : ((err && err.message) || 'Error'), 'bad');
              });
            } }) : null,
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
  // ---- Receipt designer: live-preview customizer for the customer receipt ----
  function renderReceiptDesigner(host) {
    var s = state.settings;
    var m = {
      logo: s.r_logo || '',
      nk: s.business_name_ku || '', na: s.business_name_ar || '', ne: s.business_name_en || '',
      subtitle: s.r_subtitle || '', phones: (s.phones || s.phone || ''), thanks: s.r_thanks || '', footer: s.r_footer || '',
      scale: String(s.r_scale || '1'), name_size: s.r_name_size || 'l', logo_size: s.r_logo_size || 'm', align: s.r_align || 'center',
      show_logo: s.r_show_logo !== '0', show_meta: s.r_show_meta !== '0', show_thanks: s.r_show_thanks !== '0', show_footer: s.r_show_footer !== '0', show_phone: s.r_show_phone !== '0',
      k_scale: String(s.k_scale || '1'), k_show_meta: s.k_show_meta !== '0', k_show_note: s.k_show_note !== '0', k_footer: s.k_footer || '',
    };
    var sample = { order_no: 7, lang: state.lang, created_at: new Date().toISOString(), total: 11000,
      items: [{ name: 'بەرگری گۆشت بە پەنیر', qty: 2, line_total: 9000, note: 'بەبێ تەماتە' }, { name: 'پەتاتەی سوورکراو', qty: 1, line_total: 2000, note: '' }] };
    var sampleK = { order_no: 7, lang: state.lang, created_at: new Date().toISOString(),
      items: [{ name: 'بەرگری گۆشت بە پەنیر', qty: 2, note: 'بەبێ تەماتە' }, { name: 'پەتاتەی سوورکراو', qty: 1, note: '' }] };
    function live() {
      return Object.assign({}, state.settings, {
        r_logo: m.logo, business_name_ku: m.nk, business_name_ar: m.na, business_name_en: m.ne,
        r_subtitle: m.subtitle, phones: m.phones, r_thanks: m.thanks, r_footer: m.footer,
        r_scale: m.scale, r_name_size: m.name_size, r_logo_size: m.logo_size, r_align: m.align,
        r_show_logo: m.show_logo ? '1' : '0', r_show_meta: m.show_meta ? '1' : '0', r_show_thanks: m.show_thanks ? '1' : '0', r_show_footer: m.show_footer ? '1' : '0', r_show_phone: m.show_phone ? '1' : '0',
        k_scale: m.k_scale, k_show_meta: m.k_show_meta ? '1' : '0', k_show_note: m.k_show_note ? '1' : '0', k_footer: m.k_footer,
      });
    }
    var preview = el('div', { class: 'rcpt-preview' });
    var reT, mode = 'customer';
    function refresh() { clearTimeout(reT); reT = setTimeout(function () {
      var ls = live(); preview.textContent = '';
      if (mode === 'kitchen') preview.appendChild(frameFromHTML(kitchenTicketHTML(sampleK, sampleK.items, t('nav_kitchen'), false, ls), ls.print_width === '58'));
      else preview.appendChild(receiptFrame(sample, ls));
    }, 70); }
    function seg(opts, cur, pick) {
      var w = el('div', { class: 'seg' });
      opts.forEach(function (o) { w.appendChild(el('button', { class: 'seg-b' + (String(o[0]) === String(cur) ? ' on' : ''), text: o[1], onclick: function () { Array.prototype.forEach.call(w.children, function (bb) { bb.classList.remove('on'); }); this.classList.add('on'); pick(o[0]); refresh(); } })); });
      return w;
    }
    function toggle(label, val, set) { var chk = el('input', { type: 'checkbox' }); chk.checked = val; chk.onchange = function () { set(chk.checked); refresh(); }; return el('label', { class: 'chkrow' }, [chk, el('span', { text: label })]); }
    function txt(val, ph, set, ta) { var e = el(ta ? 'textarea' : 'input', { class: ta ? 'textarea' : 'input', dir: 'auto', placeholder: ph || '' }); e.value = val; if (ta) e.style.minHeight = '64px'; e.oninput = function () { set(e.value); refresh(); }; return e; }

    var logoThumb = el('div', { class: 'logo-thumb' });
    function drawThumb() { logoThumb.textContent = ''; if (m.logo) logoThumb.appendChild(el('img', { src: m.logo })); else logoThumb.appendChild(el('span', { class: 'hint', text: t('no_logo') })); }
    drawThumb();
    var fileIn = el('input', { type: 'file', accept: 'image/*', style: 'display:none' });
    fileIn.onchange = function () {
      var f = fileIn.files && fileIn.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () { var img = new Image();
        img.onload = function () {
          var box = 380, sc = Math.min(1, box / img.width, box / img.height);
          var cw = Math.max(1, Math.round(img.width * sc)), ch = Math.max(1, Math.round(img.height * sc));
          var cv = document.createElement('canvas'); cv.width = cw; cv.height = ch; cv.getContext('2d').drawImage(img, 0, 0, cw, ch);
          var data = cv.toDataURL('image/png');
          if (data.length > 260000) {   // photographic logo → PNG too big; flatten on white + JPEG keeps it small
            var cv2 = document.createElement('canvas'); cv2.width = cw; cv2.height = ch; var c2 = cv2.getContext('2d');
            c2.fillStyle = '#fff'; c2.fillRect(0, 0, cw, ch); c2.drawImage(img, 0, 0, cw, ch);
            data = cv2.toDataURL('image/jpeg', 0.85);
          }
          if (data.length > 390000) { toast('Logo too large — use a smaller image', 'bad'); return; }
          m.logo = data; m.show_logo = true; drawThumb(); refresh();
        };
        img.onerror = function () { toast('Bad image', 'bad'); };
        img.src = rd.result; };
      rd.readAsDataURL(f); fileIn.value = '';
    };

    var saveBtn = el('button', { class: 'btn', text: t('save') });
    saveBtn.onclick = function () {
      saveBtn.disabled = true;
      var pl = m.phones.split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean);
      api('/settings', { method: 'PUT', body: JSON.stringify({
        business_name_ku: m.nk, business_name_ar: m.na, business_name_en: m.ne, phones: m.phones, phone: pl[0] || '',
        r_logo: m.logo, r_show_logo: m.show_logo ? '1' : '0', r_logo_size: m.logo_size,
        r_subtitle: m.subtitle, r_thanks: m.thanks, r_footer: m.footer,
        r_show_meta: m.show_meta ? '1' : '0', r_show_thanks: m.show_thanks ? '1' : '0', r_show_footer: m.show_footer ? '1' : '0', r_show_phone: m.show_phone ? '1' : '0',
        r_scale: m.scale, r_name_size: m.name_size, r_align: m.align,
        k_scale: m.k_scale, k_show_meta: m.k_show_meta ? '1' : '0', k_show_note: m.k_show_note ? '1' : '0', k_footer: m.k_footer,
      }) }).then(function (d) { state.settings = d.settings; toast(t('saved'), 'ok'); saveBtn.disabled = false; })
        .catch(function (e) { if (e.status === 401) return logout(); toast(e.message, 'bad'); saveBtn.disabled = false; });
    };

    var custBox = el('div', {}, [
      el('div', { class: 'field' }, [el('label', { text: t('logo') }),
        el('div', { class: 'logo-row' }, [logoThumb, el('div', { class: 'logo-btns' }, [
          el('button', { class: 'btn-ghost', text: t('upload_logo'), onclick: function () { fileIn.click(); } }),
          el('button', { class: 'btn-ghost danger', text: t('remove'), onclick: function () { m.logo = ''; drawThumb(); refresh(); } }), fileIn ])]),
        el('div', { class: 'sub-ctrl' }, [el('span', { class: 'hint', text: t('logo_size') }), seg([['s', 'S'], ['m', 'M'], ['l', 'L']], m.logo_size, function (v) { m.logo_size = v; })]),
      ]),
      el('div', { class: 'row3' }, [
        el('div', { class: 'field' }, [el('label', { text: t('biz_name') + ' (KU)' }), txt(m.nk, '', function (v) { m.nk = v; })]),
        el('div', { class: 'field' }, [el('label', { text: '(AR)' }), txt(m.na, '', function (v) { m.na = v; })]),
        el('div', { class: 'field' }, [el('label', { text: '(EN)' }), txt(m.ne, '', function (v) { m.ne = v; })]),
      ]),
      el('div', { class: 'field' }, [el('label', { text: t('subtitle') }), txt(m.subtitle, '', function (v) { m.subtitle = v; })]),
      el('div', { class: 'field' }, [el('label', { text: t('phones') }), txt(m.phones, '0750 947 1000', function (v) { m.phones = v; }, true)]),
      el('div', { class: 'field' }, [el('label', { text: t('thanks_line') }), txt(m.thanks, (I18N[state.lang] || I18N.ku).r_thanks, function (v) { m.thanks = v; })]),
      el('div', { class: 'field' }, [el('label', { text: t('footer_text') }), txt(m.footer, '', function (v) { m.footer = v; }, true)]),
      el('div', { class: 'row2' }, [
        el('div', { class: 'field' }, [el('label', { text: t('text_size') }), seg([['0.85', 'A−'], ['1', 'A'], ['1.15', 'A+'], ['1.3', 'A++']], m.scale, function (v) { m.scale = v; })]),
        el('div', { class: 'field' }, [el('label', { text: t('name_size') }), seg([['s', 'S'], ['m', 'M'], ['l', 'L'], ['xl', 'XL']], m.name_size, function (v) { m.name_size = v; })]),
      ]),
      el('div', { class: 'field' }, [el('label', { text: t('alignment') }), seg([['right', '⇤'], ['center', '↔'], ['left', '⇥']], m.align, function (v) { m.align = v; })]),
      el('div', { class: 'field' }, [el('label', { text: t('show_hide') }),
        el('div', { class: 'chk-grid' }, [
          toggle(t('logo'), m.show_logo, function (v) { m.show_logo = v; }),
          toggle(t('show_date'), m.show_meta, function (v) { m.show_meta = v; }),
          toggle(t('thanks_line'), m.show_thanks, function (v) { m.show_thanks = v; }),
          toggle(t('footer_text'), m.show_footer, function (v) { m.show_footer = v; }),
          toggle(t('phones'), m.show_phone, function (v) { m.show_phone = v; }),
        ]),
      ]),
    ]);
    var kitBox = el('div', { style: 'display:none' }, [
      el('div', { class: 'field' }, [el('label', { text: t('text_size') }), seg([['0.85', 'A−'], ['1', 'A'], ['1.15', 'A+'], ['1.3', 'A++']], m.k_scale, function (v) { m.k_scale = v; })]),
      el('div', { class: 'field' }, [el('label', { text: t('kitchen_footer') }), txt(m.k_footer, '', function (v) { m.k_footer = v; }, true)]),
      el('div', { class: 'field' }, [el('label', { text: t('show_hide') }),
        el('div', { class: 'chk-grid' }, [
          toggle(t('show_date'), m.k_show_meta, function (v) { m.k_show_meta = v; }),
          toggle(t('show_notes'), m.k_show_note, function (v) { m.k_show_note = v; }),
        ]),
      ]),
    ]);
    function setMode(mo) { mode = mo; custBox.style.display = mo === 'customer' ? '' : 'none'; kitBox.style.display = mo === 'kitchen' ? '' : 'none'; }

    host.appendChild(el('div', { class: 'panel receipt-designer' }, [
      el('h2', { text: t('receipt_designer') }),
      el('p', { class: 'hint', text: t('rd_hint') }),
      el('div', { class: 'rd-mode' }, [seg([['customer', t('rd_customer')], ['kitchen', t('rd_kitchen')]], 'customer', setMode)]),
      el('div', { class: 'rd-wrap' }, [
        el('div', { class: 'rd-preview-col' }, [preview]),
        el('div', { class: 'rd-controls' }, [custBox, kitBox, el('div', { style: 'margin-top:10px' }, [saveBtn])]),
      ]),
    ]));
    refresh();
  }

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

    var saveBtn = el('button', { class: 'btn', text: t('save') });
    saveBtn.onclick = function () {
      saveBtn.disabled = true;
      api('/settings', { method: 'PUT', body: JSON.stringify({
        print_width: chosen.w, reset_time: resetT.value || '00:00',
        show_preview: chosenPrev.on ? '1' : '0', beep: chosenBeep.on ? '1' : '0',
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
      el('div', { style: 'margin-top:14px' }, [saveBtn]),
    ]));

    renderReceiptDesigner(host);

    if (isAdmin()) renderUsersPanel(host);
    renderCategoriesPanel(host);
    renderPrintersPanel(host);

    // App version (desktop only) + manual update check
    var verEl = el('div', { class: 'hint', style: 'text-align:center;margin-top:18px;font-weight:700', text: 'NIGHT BITES' });
    host.appendChild(verEl);
    if (window.nb && window.nb.version) {
      var curVer = '';
      window.nb.version().then(function (v) { curVer = String(v || ''); verEl.textContent = 'NIGHT BITES  ·  v' + v; });
      var upBtn = el('button', { class: 'btn-ghost', style: 'display:block;margin:10px auto 0', text: 'Check for updates',
        onclick: function () {
          upBtn.disabled = true; upBtn.textContent = '…';
          var done = function () { upBtn.disabled = false; upBtn.textContent = 'Check for updates'; };
          window.nb.checkUpdate().then(function (r) {
            done();
            if (r && r.dev) return toast('Dev build — updates are disabled', 'ok');
            // A FAILED check must NEVER read as success. This said "You are up to date" whenever
            // the check threw (no internet, unreachable feed), which is exactly how a machine
            // sits on an old build believing it is current. Show the real reason instead.
            if (!r || !r.ok) return toast('Update check failed — ' + ((r && r.error) || 'no connection'), 'bad');
            if (r.version && curVer && r.version !== curVer) return toast('Update found: v' + r.version + ' — downloading, then restart', 'ok');
            return toast('You are up to date  ·  v' + (r.version || curVer), 'ok');
          }).catch(function (e) { done(); toast('Update check failed — ' + ((e && e.message) || 'no connection'), 'bad'); });
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
  function bizName(lang, s) {
    s = s || state.settings;
    return lang === 'ar' ? (s.business_name_ar || 'نايت بايتس') : lang === 'en' ? (s.business_name_en || 'NIGHT BITES') : (s.business_name_ku || 'نایت بایتس');
  }
  function orderDate(order) { var d = new Date(String(order.created_at).replace(' ', 'T')); return isNaN(d) ? String(order.created_at) : d.toLocaleString('en-GB'); }

  // On-screen receipt = an <iframe> rendering the EXACT print HTML (customerTicketHTML), so the
  // preview always matches what prints. Pass `s` to preview unsaved settings (the designer).
  // Build a preview iframe from ready ticket HTML. sandbox="allow-same-origin" (NO allow-scripts)
  // means any stray markup in the receipt can never run a script, while the parent can still size it.
  function frameFromHTML(html, narrow) {
    var ifr = el('iframe', { class: 'rcpt-frame', title: 'receipt' });
    ifr.setAttribute('scrolling', 'no');
    ifr.setAttribute('sandbox', 'allow-same-origin');
    ifr.style.width = (narrow ? 232 : 312) + 'px';
    ifr.addEventListener('load', function () { try { ifr.style.height = (ifr.contentDocument.body.scrollHeight + 2) + 'px'; } catch (e) {} });
    ifr.setAttribute('srcdoc', html);
    return ifr;
  }
  function receiptFrame(order, s) { return frameFromHTML(customerTicketHTML(order, false, s), (s || state.settings).print_width === '58'); }
  // Browser-print fallback: print the exact receipt HTML from its own iframe, but only AFTER its
  // embedded font + logo have decoded — otherwise font-display:block can print blank/invisible text.
  function printViaBrowser(order) {
    var ifr = document.createElement('iframe');
    ifr.style.cssText = 'position:fixed;right:-9999px;bottom:0;width:80mm;border:0;';
    ifr.setAttribute('srcdoc', customerTicketHTML(order, false));
    ifr.onload = function () {
      var w = ifr.contentWindow, d = w.document;
      var go = function () { try { w.focus(); w.print(); } catch (e) {} setTimeout(function () { try { document.body.removeChild(ifr); } catch (e) {} }, 3000); };
      try { Promise.all([d.fonts.ready, Promise.all(Array.prototype.map.call(d.images, function (i) { return i.decode ? i.decode().catch(function () {}) : 0; }))]).then(go, go); }
      catch (e) { setTimeout(go, 300); }
    };
    document.body.appendChild(ifr);
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
  function ticketStyle(net, dots, s, kind) {
    s = s || state.settings || {};
    kind = kind || 'customer';
    var cust = kind === 'customer', kit = kind === 'kitchen';
    var rScale = Math.max(0.7, Math.min(1.6, parseFloat(s.r_scale) || 1));
    var kScale = Math.max(0.7, Math.min(1.6, parseFloat(s.k_scale) || 1));
    var nameMul = cust ? (({ s: 0.8, m: 1, l: 1.2, xl: 1.45 })[s.r_name_size] || 1.2) : 1;
    var hAlign = cust ? (({ center: 'center', right: 'right', left: 'left' })[s.r_align] || 'center') : 'center';
    var logoW = ({ s: '34%', m: '50%', l: '66%' })[s.r_logo_size] || '50%';
    var logoMargin = hAlign === 'left' ? '0 auto 0 0' : hAlign === 'right' ? '0 0 0 auto' : '0 auto';
    var b = net ? (dots / 576) : 1;
    var u = net ? 'px' : 'pt';
    var sz = net
      ? { pad: Math.round(16 * b) + 'px ' + Math.round(12 * b) + 'px', brand: Math.round(40 * b), no: Math.round(30 * b), meta: Math.round(19 * b), th: Math.round(19 * b), td: Math.round(23 * b), tlbl: Math.round(26 * b), tval: Math.round(34 * b), phone: Math.round(26 * b), thanks: Math.round(22 * b), sub: Math.round(24 * b), footer: Math.round(22 * b), kq: Math.round(34 * b), kn: Math.round(30 * b), station: Math.round(26 * b), knote: Math.round(25 * b), inote: Math.round(20 * b) }
      : { pad: '4mm 3mm 6mm', brand: 20, no: 12, meta: 8.5, th: 8, td: 9.5, tlbl: 11, tval: 15, phone: 11, thanks: 10, sub: 11, footer: 9.5, kq: 14, kn: 14, station: 11, knote: 11, inote: 8.5 };
    // Scale ONLY the parts that belong to this ticket kind — a customer-receipt setting never
    // changes the kitchen ticket, and the kitchen scale never touches the customer receipt.
    var scale = kit ? kScale : (cust ? rScale : 1);
    var scaleKeys = kit ? ['brand', 'meta', 'kq', 'kn', 'knote', 'station', 'footer']
      : (cust ? ['brand', 'no', 'meta', 'th', 'td', 'tlbl', 'tval', 'phone', 'thanks', 'sub', 'footer', 'inote'] : []);
    scaleKeys.forEach(function (k) { sz[k] = Math.round(sz[k] * scale * 10) / 10; });
    var brandSize = Math.round(sz.brand * nameMul * 10) / 10;   // business-name size (customer only) on top of the scale
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
      + '.logo{display:block;width:' + logoW + ';max-width:100%;height:auto;margin:' + logoMargin + ';margin-bottom:' + (net ? '6px' : '1.5mm') + ';}'
      + '.brand{text-align:' + hAlign + ';font-size:' + brandSize + u + ';font-weight:900;letter-spacing:.02em;}'
      + '.subtitle{text-align:' + hAlign + ';font-size:' + sz.sub + u + ';font-weight:700;margin-top:' + (net ? '2px' : '.4mm') + ';}'
      + '.footer{text-align:' + hAlign + ';font-size:' + sz.footer + u + ';font-weight:600;margin-top:' + (net ? '6px' : '1.5mm') + ';white-space:pre-wrap;line-height:1.5;}'
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
      + '.thanks{text-align:' + hAlign + ';font-size:' + sz.thanks + u + ';font-weight:800;margin-top:' + (net ? '8px' : '2mm') + ';}'
      + '.phone{text-align:' + hAlign + ';font-weight:900;font-size:' + sz.phone + u + ';margin-top:' + (net ? '6px' : '1.5mm') + ';letter-spacing:.03em;}'
      + '.paidbox{margin-top:6px;padding-top:5px;border-top:1px dashed #000}.prow{display:flex;justify-content:space-between;font-size:.92em;font-weight:700}.prow.due{font-weight:900;font-size:1em}.krow{display:flex;align-items:center;gap:' + (net ? '10px' : '3mm') + ';padding:' + (net ? '7px 0' : '2mm 0') + ';border-bottom:1px dashed #000;}'
      + '.kq{min-width:' + (net ? Math.round(48 * b) + 'px' : '10mm') + ';font-size:' + sz.kq + u + ';font-weight:900;}'
      + '.kn{font-size:' + sz.kn + u + ';font-weight:800;}'
      // per-item note — prominent on the kitchen ticket (.knote), subtle on the customer receipt (.inote)
      + '.knote{display:block;font-size:' + sz.knote + u + ';font-weight:800;margin-top:' + (net ? '3px' : '.8mm') + ';}'
      + '.inote{display:block;font-size:' + sz.inote + u + ';font-weight:700;margin-top:' + (net ? '2px' : '.4mm') + ';}'
      // bidi: isolate every run so Kurdish/Arabic names never merge with Latin digits/prices
      + '.iname,.kn,.knote,.inote,.brand,.subtitle,.footer,.station,.thanks,.tlbl,.tval,.no,.kq,.num,.mid,.meta span{unicode-bidi:isolate;}'
      + '</style>';
  }
  function ticketDoc(inner, net, dots, dir, s, kind) {
    return '<!DOCTYPE html><html dir="' + (dir || 'rtl') + '"><head><meta charset="utf-8">' + ticketStyle(net, dots, s, kind)
      + '</head><body><div class="t">' + inner + '</div></body></html>';
  }
  // The ONE customer-receipt renderer — used for thermal print AND the live preview. Pass `s` to
  // preview unsaved settings; it falls back to the saved settings otherwise.
  function customerTicketHTML(order, net, s) {
    s = s || state.settings || {};
    var lang = order.lang || state.lang; var L = I18N[lang] || I18N.ku;
    var cur = s.currency || 'IQD';
    var dots = (s.print_width === '58' ? 384 : 576);
    var on = function (k) { return s[k] == null ? true : s[k] !== '0'; };   // toggles default ON
    var rows = (order.items || []).map(function (it) {
      var note = (it.note || '').trim();
      return '<tr><td class="iname" dir="auto">' + escHtml(it.name) + (note ? '<span class="inote" dir="auto">» ' + escHtml(note) + '</span>' : '') + '</td><td class="mid"><span dir="ltr">×' + escHtml(it.qty) + '</span></td><td class="num"><span dir="ltr">' + escHtml(money(it.line_total)) + '</span></td></tr>';
    }).join('');
    var inner = '';
    if (on('r_show_logo') && s.r_logo) inner += '<img class="logo" src="' + escHtml(s.r_logo) + '" alt="">';
    inner += '<div class="brand" dir="auto">' + escHtml(bizName(lang, s)) + '</div>';
    if ((s.r_subtitle || '').trim()) inner += '<div class="subtitle" dir="auto">' + escHtml(s.r_subtitle) + '</div>';
    inner += '<div class="rule"></div>'
      + '<div class="no">' + escHtml(L.order) + ' <span dir="ltr">#' + escHtml(order.order_no) + '</span></div>';
    if (on('r_show_meta')) inner += '<div class="meta"><span dir="ltr">' + escHtml(orderDate(order)) + '</span><span dir="ltr">#' + escHtml(order.order_no) + '</span></div>';
    // A ticket that was part-paid earlier (reopened, food added) must not print a receipt that
    // reads like the whole amount was just collected — the customer holds two receipts otherwise.
    var _paid = num(order.paid_total), _bal = num(order.balance);
    if (_paid > 0 && (_bal > 0 || _paid < num(order.total))) {
      inner += '<div class="paidbox">'
        + '<div class="prow"><span dir="auto">' + escHtml(t('paid_so_far')) + '</span><span dir="ltr">' + escHtml(money(_paid)) + '</span></div>'
        + (_bal > 0 ? '<div class="prow due"><span dir="auto">' + escHtml(t('balance_due')) + '</span><span dir="ltr">' + escHtml(money(_bal)) + '</span></div>' : '')
        + '</div>';
    }
    inner += '<div class="rule"></div>'
      + '<table><thead><tr><th>' + escHtml(L.item) + '</th><th class="mid">' + escHtml(L.qty) + '</th><th class="num">' + escHtml(L.total) + '</th></tr></thead><tbody>' + rows + '</tbody></table>'
      + '<div class="rule solid"></div>'
      + '<div class="total"><span class="tlbl">' + escHtml(L.total) + '</span><span class="tval" dir="ltr">' + escHtml(money(order.total)) + ' ' + escHtml(cur) + '</span></div>';
    if (on('r_show_thanks')) inner += '<div class="thanks" dir="auto">' + escHtml((s.r_thanks || '').trim() || L.r_thanks) + '</div>';
    if (on('r_show_footer') && (s.r_footer || '').trim()) inner += '<div class="footer" dir="auto">' + escHtml(s.r_footer) + '</div>';
    if (on('r_show_phone')) { var phones = phoneList(s).map(function (p) { return '<div>' + escHtml(p) + '</div>'; }).join(''); if (phones) inner += '<div class="phone" dir="ltr">' + phones + '</div>'; }
    return ticketDoc(inner, net, dots, L._dir, s, 'customer');
  }
  // Kitchen ticket renderer — customizable (text size, show date, item notes, footer) and used for
  // both print and the designer preview. Never inherits the customer-receipt styling.
  function kitchenTicketHTML(order, items, station, net, s) {
    s = s || state.settings || {};
    var lang = order.lang || state.lang; var L = I18N[lang] || I18N.ku;
    var dots = (s.print_width === '58' ? 384 : 576);
    var showNote = s.k_show_note !== '0';
    var rows = (items || []).map(function (it) {
      var note = showNote ? (it.note || '').trim() : '';
      return '<div class="krow"><span class="kq" dir="ltr">×' + escHtml(it.qty) + '</span><span class="kn" dir="auto">' + escHtml(it.name)
        + (note ? '<span class="knote" dir="auto">» ' + escHtml(note) + '</span>' : '') + '</span></div>';
    }).join('');
    var inner = '<div class="brand" dir="ltr">#' + escHtml(order.order_no) + '</div>'
      + (station ? '<div class="station" dir="auto">' + escHtml(station) + '</div>' : '');
    if (s.k_show_meta !== '0') inner += '<div class="meta"><span dir="ltr">' + escHtml(orderDate(order)) + '</span><span dir="ltr">#' + escHtml(order.order_no) + '</span></div>';
    inner += '<div class="rule"></div>' + rows;
    if ((s.k_footer || '').trim()) inner += '<div class="footer" dir="auto">' + escHtml(s.k_footer) + '</div>';
    return ticketDoc(inner, net, dots, L._dir, s, 'kitchen');
  }

  // A correction slip, not an order: big FROM -> TO and nothing that looks like food to cook.
  function transferTicketHTML(fromNo, toNo, station, net, s) {
    s = s || state.settings || {};
    var L = I18N[state.lang] || I18N.ku;
    var dots = (s.print_width === '58' ? 384 : 576);
    var inner = '<div class="brand" dir="ltr">#' + escHtml(toNo) + '</div>'
      + (station ? '<div class="station" dir="auto">' + escHtml(station) + '</div>' : '')
      + '<div class="rule"></div>'
      + '<div class="krow"><span class="kn" dir="auto">' + escHtml(t('tr_slip_title')) + '</span></div>'
      + '<div class="krow"><span class="kn" dir="ltr">#' + escHtml(fromNo) + '  \u2192  #' + escHtml(toNo) + '</span></div>'
      + '<div class="rule"></div>'
      + '<div class="krow"><span class="kn" dir="auto">' + escHtml(t('tr_slip_note')) + '</span></div>';
    return ticketDoc(inner, net, dots, L._dir, s, 'kitchen');
  }

  /* ---- routing ---- */
  function sendTo(printer, html) {
    if (!(window.nb && window.nb.printTicket && printer)) return Promise.resolve({ ok: false });
    return window.nb.printTicket(html, targetFor(printer), widthMm(), beepOn()).catch(function () { return { ok: false }; });
  }
  // Kitchen/station tickets — silent, one per zone that has matching items.
  // Returns { ok, uncovered: [names] } — whether every line actually reached a printer.
  // It used to return nothing and swallow both failures: a jammed printer and a food whose category
  // no zone covers both looked exactly like success, while the ticket was billed as cooked.
  function routeStations(order) {
    var all = (order.items || []);
    if (!(window.nb && window.nb.printTicket)) return Promise.resolve({ ok: false, uncovered: [], nobridge: true });
    var covered = {}, jobs = [];
    zones().forEach(function (z) {
      if (z.type === 'customer') return;
      var p = printerById(z.printer_id); if (!p) return;
      var items = all.filter(function (it) { return (z.categories || []).indexOf(it.category || 'other') >= 0; });
      if (!items.length) return;
      items.forEach(function (it) { covered[it.food_id + '|' + (it.note || '')] = true; });
      jobs.push(sendTo(p, kitchenTicketHTML(order, items, z.name, p.kind === 'network')));
    });
    var uncovered = all.filter(function (it) { return !covered[it.food_id + '|' + (it.note || '')]; })
                       .map(function (it) { return it.name; });
    if (!jobs.length) return Promise.resolve({ ok: false, uncovered: uncovered });
    return Promise.all(jobs).then(function (rs) {
      return { ok: rs.every(function (r) { return r && r.ok !== false; }) && !uncovered.length, uncovered: uncovered };
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
      el('div', { class: 'preview-paper', dir: L._dir }, [receiptFrame(order)]),
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
    return ticketDoc(inner, net, dots, L._dir, null, 'report').replace('</head>', extra + '</head>');
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
  // The register was mid-ticket when the app closed (a crash, a power cut, or the auto-updater's
  // "Restart now"). Re-open that ticket from the server so the food already with the kitchen is
  // still marked as sent — a restart used to wipe every sent count and re-fire the whole order.
  function restoreTicket() {
    var id = 0;
    try { id = parseInt(localStorage.getItem(TICKET_KEY), 10) || 0; } catch (_) { id = 0; }
    if (!id) return Promise.resolve();
    return api('/orders/' + id).then(function (d) {
      var o = d.order;
      // Finished business: fully paid AND nothing left to cook. Don't drag it back onto the screen.
      if (num(o.balance) <= 0 && num(o.pending_count) === 0 && !o.paid_assumed) { try { localStorage.removeItem(TICKET_KEY); } catch (_) {} return; }
      // The daily reset passed while the app was down. The server refuses every write to a closed
      // day, so binding to it would give the cashier a register where nothing can be saved or paid.
      if (o.closed) { try { localStorage.removeItem(TICKET_KEY); } catch (_) {} return; }
      state.firedOrder = o;
      state.cart = (o.items || []).map(function (it) {
        var f = liveFood(it.food_id);
        return { id: it.food_id, item_id: it.id, name: f ? foodName(f) : (it.name || ''),
                 price: f ? f.price : it.price, qty: it.qty, note: it.note || '', sent: num(it.printed_qty) };
      });
    }).catch(function () { try { localStorage.removeItem(TICKET_KEY); } catch (_) {} });
  }
  function boot() {
    Promise.all([
      api('/foods').then(function (d) { state.foods = d.foods || []; }),
      api('/categories').then(function (d) { state.categories = d.categories || []; }).catch(function () {}),
      api('/settings').then(function (d) { state.settings = d.settings || {}; }),
      api('/printers').then(function (d) { state.printerCfg = { printers: d.printers || [], zones: d.zones || [] }; }).catch(function () {}),
      api('/drafts').then(function (d) { state.drafts = d.drafts || []; }).catch(function () {}),
    ]).then(restoreTicket).then(function () { state.view = 'pos'; renderApp(); })
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
