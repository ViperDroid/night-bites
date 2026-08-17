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
      cart: 'Order', empty_cart: 'Tap a food to add it', total: 'Total',
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
      cart: 'داواکاری', empty_cart: 'کرتە لە خواردنێک بکە بۆ زیادکردن', total: 'کۆی گشتی',
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
      cart: 'الطلب', empty_cart: 'اضغط على صنف لإضافته', total: 'الإجمالي',
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
    },
  };

  var CATS = ['burgers', 'sandwiches', 'sides'];

  var state = {
    token: localStorage.getItem(TOKEN_KEY) || null,
    user: null,
    lang: localStorage.getItem(LANG_KEY) || 'ku',
    view: 'pos',
    foods: [],
    settings: {},
    cart: [],          // [{ id, name, price, qty }]
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
    var done = function () { state.token = null; state.user = null; localStorage.removeItem(TOKEN_KEY); renderLogin(); };
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
    var name = (state.user && (state.user.display_name || state.user.username)) || '';

    var sidebar = el('aside', { class: 'sidebar' + (state.sidebarOpen ? ' open' : '') }, [
      el('div', { class: 'sb-brand' }, [
        el('div', { class: 'dot', text: 'NB' }),
        el('div', {}, [
          el('div', { class: 'name' }, ['NIGHT ', el('span', { class: 'b2', text: 'BITES' })]),
        ]),
      ]),
      el('nav', { class: 'sb-nav' }, [
        el('div', { class: 'sb-sec', text: t('sec_sale') }),
        navItem('pos', '', t('nav_pos')),
        navItem('orders', '', t('nav_orders')),
        navItem('kitchen', '', t('nav_kitchen')),
        el('div', { class: 'sb-sec', text: t('sec_manage') }),
        navItem('foods', '', t('nav_foods')),
        navItem('settings', '', t('nav_settings')),
      ]),
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

    var titles = { pos: t('nav_pos'), orders: t('nav_orders'), kitchen: t('nav_kitchen'), foods: t('nav_foods'), settings: t('nav_settings') };
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
    else if (state.view === 'kitchen') renderKitchen(body);
    else renderSettings(body);
  }

  /* ------------------------------ POS ------------------------------ */
  function cartTotal() { return state.cart.reduce(function (s, c) { return s + c.price * c.qty; }, 0); }
  function cartCount() { return state.cart.reduce(function (s, c) { return s + c.qty; }, 0); }
  function addToCart(f) {
    var ex = state.cart.filter(function (c) { return c.id === f.id; })[0];
    if (ex) ex.qty += 1; else state.cart.push({ id: f.id, name: foodName(f), price: f.price, qty: 1 });
  }

  function renderPOS(main, host) {
    var arrange = false;
    var dragEl = null, dragMoved = false;
    host.className = 'wrap'; host.style.padding = '0';
    var pos = el('div', { class: 'pos' });
    var menuWrap = el('div', { class: 'menu-wrap' });
    var catBar = el('div', { class: 'cat-bar' });
    var grid = el('div', { class: 'menu-grid' });
    var cartEl = el('aside', { class: 'cart' + (state.cartOpen ? ' open' : '') });

    function drawCats() {
      catBar.textContent = '';
      var cats = ['all'].concat(CATS);
      cats.forEach(function (c) {
        catBar.appendChild(el('button', { class: 'cat-b' + (state.cat === c ? ' on' : ''),
          text: t('cat_' + c), onclick: function () { if (arrange) return; state.cat = c; drawCats(); drawGrid(); } }));
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
          bodyC.appendChild(el('div', { class: 'cart-item' }, [
            el('div', { class: 'ci-name' }, [el('div', { class: 'n', text: c.name }), el('div', { class: 'p', text: money(c.price) })]),
            el('div', { class: 'qty' }, [
              el('button', { text: '−', onclick: function () { c.qty -= 1; if (c.qty <= 0) state.cart = state.cart.filter(function (x) { return x !== c; }); drawGrid(); drawCart(); } }),
              el('span', { class: 'q', text: String(c.qty) }),
              el('button', { text: '+', onclick: function () { c.qty += 1; drawGrid(); drawCart(); } }),
            ]),
            el('div', { class: 'ci-tot', text: money(c.price * c.qty) }),
            el('div', { class: 'ci-del', text: '✕', onclick: function () { state.cart = state.cart.filter(function (x) { return x !== c; }); drawGrid(); drawCart(); } }),
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
        state.cart.length ? el('button', { class: 'cart-clear', text: t('clear'), onclick: function () { state.cart = []; drawGrid(); drawCart(); } }) : null,
      ]);
      cartEl.appendChild(grip); cartEl.appendChild(head); cartEl.appendChild(bodyC); cartEl.appendChild(foot);
    }

    // both buttons save then print (a receipt must reflect a real, saved order).
    function checkout() {
      if (!state.cart.length) { toast(t('need_items'), 'bad'); return; }
      var payload = { lang: state.lang, items: state.cart.map(function (c) { return { food_id: c.id, qty: c.qty }; }) };
      api('/orders', { method: 'POST', body: JSON.stringify(payload) })
        .then(function (d) {
          printOrder(d.order);
          toast(t('sent_kitchen') + ' · #' + d.order.order_no, 'ok');
          state.cart = []; state.cartOpen = false; drawGrid(); drawCart(); cartEl.classList.remove('open');
        })
        .catch(function (e) { if (e.status === 401) return logout(); toast(e.message || 'Error', 'bad'); });
    }

    menuWrap.appendChild(catBar); menuWrap.appendChild(grid);
    pos.appendChild(menuWrap); pos.appendChild(cartEl);
    host.appendChild(pos);
    drawCats(); drawGrid(); drawCart();
  }

  /* ------------------------------ FOODS MGMT ------------------------------ */
  function renderFoods(host) {
    var listBox = el('div');
    function load() {
      api('/foods?all=1').then(function (d) { draw(d.foods || []); }).catch(function (e) { if (e.status === 401) return logout(); });
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
          el('td', { 'data-l': t('category') }, [el('span', { style: 'color:var(--muted)', text: f.category ? t('cat_' + f.category) : '—' })]),
          el('td', { 'data-l': t('th_price') }, [el('span', { class: 'fmoney', text: money(f.price) })]),
          el('td', { 'data-l': t('th_status') }, [el('span', { class: 'pill ' + (f.is_active ? 'on' : 'off'), text: f.is_active ? t('active') : '—' })]),
          el('td', {}, [el('div', { class: 'rowbtns' }, [
            el('button', { class: 'btn-ghost', text: t('edit'), onclick: function () { foodModal(f, load); } }),
            el('button', { class: 'btn-ghost danger', text: t('del'), onclick: function () {
              if (!confirm(t('confirm_del'))) return;
              api('/foods/' + f.id, { method: 'DELETE' }).then(function () { toast(t('saved'), 'ok'); load(); }).catch(function (e) { toast(e.message, 'bad'); });
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
    [['', '—']].concat(CATS.map(function (c) { return [c, t('cat_' + c)]; })).forEach(function (o) {
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
              .catch(function (e) { if (e.status === 401) return logout(); toast(e.message, 'bad'); });
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
              el('span', { class: 'od-iname', text: it.name }),
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
          });
        } });
      host.appendChild(upBtn);
    }
  }

  /* ------------------------------ PRINT ------------------------------ */
  function printOrder(order) {
    var lang = order.lang || state.lang;
    var L = I18N[lang] || I18N.ku;
    var s = state.settings;
    var bname = lang === 'ar' ? (s.business_name_ar || 'نايت بايتس') : lang === 'en' ? (s.business_name_en || 'NIGHT BITES') : (s.business_name_ku || 'نایت بایتس');
    var cur = s.currency || 'IQD';
    var width = s.print_width === '58' ? '58mm' : '80mm';
    var d = new Date(String(order.created_at).replace(' ', 'T'));
    var dateStr = isNaN(d) ? String(order.created_at) : d.toLocaleString('en-GB');

    var tbody = el('tbody');
    (order.items || []).forEach(function (it) {
      tbody.appendChild(el('tr', {}, [
        el('td', { class: 'iname', text: it.name }),
        el('td', { class: 'mid', text: '×' + it.qty }),
        el('td', { class: 'num', text: money(it.line_total) }),
      ]));
    });

    var rcpt = el('div', { class: 'rcpt', dir: L._dir, style: '--pw:' + width }, [
      el('div', { class: 'r-brand', text: bname }),
      el('div', { class: 'r-rule' }),
      el('div', { class: 'r-no', text: L.order + ' #' + order.order_no }),
      el('div', { class: 'r-meta' }, [el('span', { text: dateStr }), el('span', { dir: 'ltr', text: '#' + order.order_no })]),
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
        el('span', { class: 't-val', text: money(order.total) + ' ' + cur }),
      ]),
      el('div', { class: 'r-thanks', text: L.r_thanks }),
      el('div', { class: 'r-phone', dir: 'ltr' }, phoneList().map(function (ph) { return el('div', { text: ph }); })),
    ]);

    printRoot.textContent = '';
    printRoot.appendChild(rcpt);
    setTimeout(function () { window.print(); }, 80);
  }

  /* ------------------------------ BOOT ------------------------------ */
  function boot() {
    Promise.all([
      api('/foods').then(function (d) { state.foods = d.foods || []; }),
      api('/settings').then(function (d) { state.settings = d.settings || {}; if (d.settings && d.settings.print_width) {/* keep */} }),
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
