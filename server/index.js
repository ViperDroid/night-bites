'use strict';
// Offline data server for the NIGHT BITES desktop app. Pure JavaScript, no
// native modules (so the Windows build never fails to compile). Data lives in a
// single JSON file in the app's userData folder.
const express = require('express');
const compression = require('compression');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function createServer(opts) {
  const DATA_FILE = opts.dataFile;
  const APP_DIR = opts.appDir;

  // ---- JSON store ----
  const SECTIONS = ['pos', 'orders', 'reports', 'foods', 'settings'];
  const DEFAULT = {
    users: [{ id: 1, username: 'admin', pass: hash('admin'), display_name: 'Admin', role: 'admin', sections: SECTIONS.slice(), is_active: true }],
    foods: seedFoods(),
    categories: seedCategories(),
    orders: [],
    order_items: [],
    drafts: [],     // held "pay later" carts: { id, name, lang, items:[{food_id,name,price,qty,note}], total, item_count, created_at }
    settings: {
      print_width: '80', phone: '0750 947 1000', phones: '0750 947 1000',
      currency: 'IQD', reset_time: '00:00', show_preview: '1', beep: '1',
      business_name_ku: 'نایت بایتس', business_name_ar: 'نايت بايتس', business_name_en: 'NIGHT BITES',
      // customizable receipt (all optional; empty text falls back to sensible defaults)
      r_logo: '', r_show_logo: '1', r_logo_size: 'm',
      r_subtitle: '', r_thanks: '', r_footer: '',
      r_show_meta: '1', r_show_thanks: '1', r_show_footer: '1', r_show_phone: '1',
      r_scale: '1', r_name_size: 'l', r_align: 'center',
      // customizable kitchen ticket
      k_scale: '1', k_show_meta: '1', k_show_note: '1', k_footer: '',
    },
    printers: [],   // registered: { id, name, device, kind }
    zones: [],      // { id, name, printer_device, categories: [] }
    seq: { food: 100, order: 0, user: 1, draft: 0, item: 0 },
  };
  let db;
  db = loadDb();
  // Load the data file defensively. A first run (no file) seeds DEFAULT and saves.
  // But a file that EXISTS and can't be read/parsed (transient AV/backup lock, or a
  // power-loss-corrupted file) must NEVER be silently overwritten with defaults —
  // that would destroy all orders/menu/users. So: retry a few times for transient
  // read errors, keep a recoverable copy of anything we couldn't parse, and run on
  // defaults in memory WITHOUT persisting over the original.
  function loadDb() {
    let raw = null, err = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      try { raw = fs.readFileSync(DATA_FILE, 'utf8'); err = null; break; }
      catch (e) {
        err = e;
        if (e && e.code === 'ENOENT') break;          // genuinely no file yet — stop retrying
        const until = Date.now() + 200; while (Date.now() < until) { /* brief spin for a transient lock */ }
      }
    }
    if (err && err.code === 'ENOENT') { const d = DEFAULT; save(d); return d; }  // first run
    if (err) {
      // The file EXISTS but couldn't be read (antivirus/backup lock, or an IO error) even
      // after retries. NEVER run on defaults here — the next save() would overwrite the real
      // (intact) file with defaults and destroy all data. Fail fast: main.js shows an error
      // dialog and quits; relaunching once the lock clears loads the file normally.
      throw new Error('Could not read the data file (' + (err.code || err.message || err) + '). It may be locked by antivirus or backup software — close them and reopen NIGHT BITES.');
    }
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
      return parsed;
    } catch (e) {                                       // exists but corrupt/unusable JSON — preserve a copy, start fresh
      try { const bak = DATA_FILE + '.corrupt-' + Date.now(); fs.writeFileSync(bak, raw); console.error('night-bites: data file is corrupt (' + (e.message || e) + '); preserved a copy at ' + bak + ' and started on defaults.'); }
      catch (_) { console.error('night-bites: data file is corrupt (' + (e.message || e) + '); started on defaults.'); }
      return DEFAULT;
    }
  }
  // fill any missing/null top-level keys (forward-compat + repair partial corruption)
  Object.keys(DEFAULT).forEach((k) => { if (db[k] === undefined || db[k] === null) db[k] = DEFAULT[k]; });
  // deep-fill seq subkeys and coerce the users array so a partial/wrong-typed field can't
  // crash startup (db.seq.user / db.users.forEach below) or yield NaN ids.
  db.seq = Object.assign({}, DEFAULT.seq, (db.seq && typeof db.seq === 'object') ? db.seq : {});
  if (!Array.isArray(db.users) || !db.users.length) db.users = JSON.parse(JSON.stringify(DEFAULT.users));
  if (!db.seq.user) db.seq.user = 1;
  // migrate pre-accounts users (older installs): give them role/sections/etc.
  db.users.forEach((u) => {
    if (!u.role) u.role = 'admin';
    if (!Array.isArray(u.sections)) u.sections = SECTIONS.slice();
    if (u.is_active === undefined) u.is_active = true;
    if (!u.display_name) u.display_name = u.username === 'admin' ? 'Admin' : u.username;
    if (u.id > db.seq.user) db.seq.user = u.id;
  });

  // Repair ordering: any food missing a positive sort_order (older data, or added before the
  // append-to-end fix) is pushed to the END of the menu, stable by id, so it never sticks to the top.
  (function normalizeFoodSort() {
    let mx = db.foods.reduce((m, f) => Math.max(m, f.sort_order > 0 ? f.sort_order : 0), 0);
    db.foods.filter((f) => !(f.sort_order > 0)).sort((a, b) => a.id - b.id).forEach((f) => { mx += 10; f.sort_order = mx; });
  })();

  // Belt-and-suspenders data safety. The data file lives in userData, which an app update does NOT
  // touch — so data already survives updates — but on every startup (which includes right after an
  // auto-update installs and relaunches) we keep a small rolling set of backups of the just-loaded
  // file. That means a bad write, a corrupt file, or a botched update can always be rolled back:
  // copy night-bites-data.json.bak1 (most recent) back over night-bites-data.json.
  (function backupRolling() {
    try {
      if (!fs.existsSync(DATA_FILE)) return;                       // first run — nothing to back up yet
      const hasData = (db.orders && db.orders.length) || (db.foods && db.foods.length)
        || (db.order_items && db.order_items.length) || (db.drafts && db.drafts.length);
      if (!hasData) return;                                        // never overwrite good backups with an empty seed
      const KEEP = 5;
      for (let i = KEEP - 1; i >= 1; i--) {
        const from = DATA_FILE + '.bak' + i, to = DATA_FILE + '.bak' + (i + 1);
        if (fs.existsSync(from)) { try { fs.copyFileSync(from, to); } catch (_) {} }
      }
      fs.copyFileSync(DATA_FILE, DATA_FILE + '.bak1');
    } catch (_) { /* best-effort — must never block startup */ }
  })();

  function save(explicit) {
    const tmp = DATA_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(explicit || db, null, 2));
    fs.renameSync(tmp, DATA_FILE);
  }
  function hash(pw) { const s = crypto.randomBytes(16).toString('hex'); return s + ':' + crypto.scryptSync(pw, s, 32).toString('hex'); }
  function verify(pw, stored) {
    try { const [s, h] = String(stored).split(':'); return crypto.timingSafeEqual(Buffer.from(h, 'hex'), crypto.scryptSync(pw, s, 32)); }
    catch { return false; }
  }
  function seedFoods() {
    const raw = [
      ['بەرگری مریشک', 'برجر دجاج', 'Chicken Burger', 'burgers', 3000],
      ['بەرگری مریشک بە پەنیر', 'برجر دجاج بالجبن', 'Chicken Burger w/ Cheese', 'burgers', 3500],
      ['بەرگری گۆشت', 'برجر لحم', 'Beef Burger', 'burgers', 3000],
      ['بەرگری گۆشت بە پەنیر', 'برجر لحم بالجبن', 'Beef Burger w/ Cheese', 'burgers', 3500],
      ['بەرگری مریشک بە کوارك', 'برجر دجاج بالكوارك', 'Chicken Burger w/ Quark', 'burgers', 4500],
      ['بەرگری گۆشت بە کوارك', 'برجر لحم بالكوارك', 'Beef Burger w/ Quark', 'burgers', 4500],
      ['دەبڵ بەرگر', 'دبل برجر', 'Double Burger', 'burgers', 6500],
      ['بەرگر سبێشل', 'برجر سبيشل', 'Special Burger', 'burgers', 6000],
      ['ساندویچی کوارك', 'ساندويتش كوارك', 'Quark Sandwich', 'sandwiches', 2000],
      ['ساندویچی مریشکی', 'ساندويتش دجاج', 'Chicken Sandwich', 'sandwiches', 1500],
      ['ساندویچی گۆشتی خۆماڵی', 'ساندويتش لحم بلدي', 'Homemade Beef Sandwich', 'sandwiches', 3000],
      ['قاپ فنگەر', 'كأس بطاطا', 'Fries Cup', 'sides', 2000],
    ];
    return raw.map((r, i) => ({ id: i + 1, name_ku: r[0], name_ar: r[1], name_en: r[2], category: r[3], price: r[4], is_active: true, sort_order: (i + 1) * 10 }));
  }
  // Default categories use the food slugs as ids so existing foods keep matching.
  function seedCategories() {
    return [
      { id: 'burgers', name_ku: 'بەرگر', name_ar: 'برجر', name_en: 'Burgers', sort_order: 10 },
      { id: 'sandwiches', name_ku: 'ساندویچ', name_ar: 'ساندويتش', name_en: 'Sandwiches', sort_order: 20 },
      { id: 'sides', name_ku: 'لاوەکی', name_ar: 'إضافات', name_en: 'Sides', sort_order: 30 },
    ];
  }
  const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
  const money = (v) => Math.round(num(v) * 100) / 100;

  // ---- v1.7 schema: per-line kitchen print state ----
  // WHY: "has this line been sent to the kitchen?" used to live only in the browser's cart, so an
  // app restart, a Clear, a draft round-trip or a merge silently reset it — and the next Send
  // re-fired food that was already on the grill. It is stored per line now, on the server.
  //
  // num() coerces a MISSING field to 0, so it can never be used to test presence here: `absent` and
  // `zero` mean opposite things (never printed vs. explicitly nothing printed yet).
  const hasNum = (v) => v !== null && v !== '' && v !== undefined && Number.isFinite(Number(v));
  (function migrateOrderState() {
    let mx = 0;
    // ALWAYS, not just once: a row with no printed_qty was written by a build that had no print
    // state, so the kitchen already has it on paper. Every v1.7 write path sets the field
    // explicitly, so this can never fire on a row this build created — but it DOES catch rows
    // written by a v1.6 the shop rolled back to and then updated away from again, which the
    // one-shot schema stamp would have skipped straight past into a full re-fire.
    db.order_items.forEach((i) => {
      const q = Math.max(0, Math.round(num(i.qty)));
      if (!hasNum(i.printed_qty) || Number(i.printed_qty) < 0) i.printed_qty = q;
      i.printed_qty = Math.min(Math.round(num(i.printed_qty)), q);
      if (num(i.id) > mx) mx = num(i.id);
    });
    if (!hasNum(db.seq.item) || Number(db.seq.item) < mx) db.seq.item = mx;

    if (num(db.schema) < 17) {
      const b = boundaryFor(db.settings);
      db.orders.forEach((o) => {
        if (!Array.isArray(o.merged_from)) o.merged_from = [];
        if (hasNum(o.paid_total)) return;
        // A day that is already closed is settled business — treat it as collected so it can never
        // be presented for payment a second time.
        if (new Date(o.created_at).getTime() < b) { o.paid_total = money(o.total); return; }
        // TODAY's tickets are genuinely UNKNOWN: the old build recorded no payment at all. Claiming
        // they were paid loses the money on a table that is still eating; claiming they were not
        // risks charging twice. So say "unknown" out loud and let the cashier decide — they are
        // listed in the open-ticket picker with a "from before the update" flag.
        o.paid_total = 0; o.paid_assumed = true;
      });
      db.schema = 17;
    }
    // Best-effort persist. The migration is already correct in memory, so a locked data file
    // (antivirus, a backup agent) must NOT stop the restaurant's till from starting.
    try { save(); } catch (e) {
      console.error('night-bites: could not write the v1.7 migration now (' + (e.code || e.message || e) + '); it is applied in memory and will be saved with the next change.');
    }
  })();

  // ---- sessions (in-memory) ----
  const tokens = new Map();   // token -> userId
  const SEC = new Set(SECTIONS);
  const shapeUser = (u) => ({
    id: u.id, username: u.username, display_name: u.display_name || u.username,
    role: u.role === 'admin' ? 'admin' : 'staff',
    sections: Array.isArray(u.sections) ? u.sections.filter((s) => SEC.has(s)) : [],
    is_active: u.is_active !== false,
  });
  function auth(req, res, next) {
    const m = (req.headers.authorization || '').match(/^Bearer\s+(.+)$/i);
    const uid = m && tokens.get(m[1]);
    const u = uid && db.users.find((x) => x.id === uid);
    if (!u || u.is_active === false) return res.status(401).json({ error: 'Unauthorized' });
    req.user = u; req.token = m[1]; next();
  }
  function adminOnly(req, res, next) { if (req.user && req.user.role === 'admin') return next(); res.status(403).json({ error: 'Admins only' }); }
  // enforce section permissions server-side (frontend gating is not enough — a token can call the API directly)
  const requireSection = (sec) => (req, res, next) => (req.user && (req.user.role === 'admin' || (req.user.sections || []).indexOf(sec) >= 0)) ? next() : res.status(403).json({ error: 'Forbidden' });
  const activeAdmins = () => db.users.filter((x) => x.role === 'admin' && x.is_active !== false).length;

  const app = express();
  app.use(compression());
  app.use(express.json({ limit: '512kb' }));
  const wrap = (fn) => (req, res) => { try { fn(req, res); } catch (e) { console.error(e); res.status(500).json({ error: 'Server error' }); } };

  app.get('/api/health', (_q, r) => r.json({ status: 'ok', db: 'up', brand: 'NIGHT BITES' }));

  app.post('/api/login', wrap((req, res) => {
    const { username, password } = req.body || {};
    const uname = String(username || '').trim().toLowerCase();
    const u = db.users.find((x) => x.username === uname && x.is_active !== false);
    if (!u || !verify(String(password || ''), u.pass)) return res.status(401).json({ error: 'Invalid username or password' });
    const tok = crypto.randomBytes(24).toString('hex'); tokens.set(tok, u.id);
    res.json({ token: tok, user: shapeUser(u) });
  }));
  app.get('/api/me', auth, (req, res) => res.json({ user: shapeUser(req.user) }));
  app.post('/api/logout', auth, (req, res) => { tokens.delete(req.token); res.json({ ok: true }); });

  // ---- users (admin only) ----
  const cleanSections = (arr) => (Array.isArray(arr) ? arr.map((s) => String(s)).filter((s) => SEC.has(s)) : []);
  app.get('/api/users', auth, adminOnly, (_q, res) => res.json({ users: db.users.map(shapeUser) }));
  app.post('/api/users', auth, adminOnly, wrap((req, res) => {
    const b = req.body || {};
    const username = String(b.username || '').trim().toLowerCase();
    const password = String(b.password || '');
    if (!/^[a-z0-9._-]{2,32}$/.test(username)) return res.status(400).json({ error: 'Username: 2–32 chars — letters, numbers, . _ -' });
    if (password.length < 3) return res.status(400).json({ error: 'Password must be at least 3 characters' });
    if (db.users.some((x) => x.username === username)) return res.status(409).json({ error: 'Username already exists' });
    const role = b.role === 'admin' ? 'admin' : 'staff';
    const u = { id: ++db.seq.user, username, pass: hash(password), display_name: String(b.display_name || username).slice(0, 60),
      role, sections: role === 'admin' ? SECTIONS.slice() : cleanSections(b.sections), is_active: b.is_active !== false };
    db.users.push(u); save(); res.status(201).json({ user: shapeUser(u) });
  }));
  app.put('/api/users/:id', auth, adminOnly, wrap((req, res) => {
    const id = parseInt(req.params.id, 10) || 0;
    const u = db.users.find((x) => x.id === id); if (!u) return res.status(404).json({ error: 'Not found' });
    const b = req.body || {};
    // you can't strip your own admin role or deactivate yourself (avoid self-lockout)
    if (id === req.user.id && b.role !== undefined && b.role !== 'admin') return res.status(400).json({ error: 'You cannot remove your own admin role' });
    if (id === req.user.id && b.is_active === false) return res.status(400).json({ error: 'You cannot deactivate your own account' });
    if (b.display_name !== undefined) u.display_name = String(b.display_name || u.username).slice(0, 60);
    if (b.role !== undefined) {
      const role = b.role === 'admin' ? 'admin' : 'staff';
      if (u.role === 'admin' && u.is_active !== false && role !== 'admin' && activeAdmins() <= 1) return res.status(400).json({ error: 'At least one admin is required' });
      u.role = role;
    }
    if (b.sections !== undefined) u.sections = cleanSections(b.sections);
    if (u.role === 'admin') u.sections = SECTIONS.slice();
    if (b.is_active !== undefined) {
      const active = !!b.is_active;
      if (!active && u.role === 'admin' && u.is_active !== false && activeAdmins() <= 1) return res.status(400).json({ error: 'At least one admin is required' });
      u.is_active = active;
    }
    if (b.password) {
      if (String(b.password).length < 3) return res.status(400).json({ error: 'Password must be at least 3 characters' });
      u.pass = hash(String(b.password));
      // kick out that user's other sessions on a password reset (keep the admin's own)
      for (const [tok, uid] of tokens) { if (uid === u.id && tok !== req.token) tokens.delete(tok); }
    }
    save(); res.json({ user: shapeUser(u) });
  }));
  app.delete('/api/users/:id', auth, adminOnly, wrap((req, res) => {
    const id = parseInt(req.params.id, 10) || 0;
    if (id === req.user.id) return res.status(400).json({ error: 'You cannot delete your own account' });
    const i = db.users.findIndex((x) => x.id === id); if (i < 0) return res.status(404).json({ error: 'Not found' });
    if (db.users[i].role === 'admin' && db.users[i].is_active !== false && activeAdmins() <= 1) return res.status(400).json({ error: 'At least one admin is required' });
    for (const [tok, uid] of tokens) { if (uid === id) tokens.delete(tok); }
    db.users.splice(i, 1); save(); res.json({ ok: true });
  }));

  // ---- settings ----
  const ALLOWED = new Set(['print_width', 'business_name_ku', 'business_name_ar', 'business_name_en', 'phone', 'phones', 'currency', 'reset_time', 'show_preview', 'beep',
    // customizable receipt
    'r_logo', 'r_show_logo', 'r_logo_size', 'r_subtitle', 'r_thanks', 'r_footer',
    'r_show_meta', 'r_show_thanks', 'r_show_footer', 'r_show_phone', 'r_scale', 'r_name_size', 'r_align',
    'k_scale', 'k_show_meta', 'k_show_note', 'k_footer']);
  const R_TOGGLES = ['r_show_logo', 'r_show_meta', 'r_show_thanks', 'r_show_footer', 'r_show_phone', 'k_show_meta', 'k_show_note'];
  app.get('/api/settings', auth, (_q, r) => r.json({ settings: db.settings }));
  app.put('/api/settings', auth, requireSection('settings'), wrap((req, res) => {
    // Short fields (everything except the logo) capped to 500 chars.
    Object.keys(req.body || {}).forEach((k) => { if (ALLOWED.has(k) && k !== 'r_logo') db.settings[k] = String(req.body[k] == null ? '' : req.body[k]).slice(0, 500); });
    // Logo: accept ONLY a well-formed base64 image data-URI within the size cap. Never store a
    // truncated/corrupt string or a non-image value (which would be a script-injection vector when
    // interpolated into the receipt <img src>). Anything else clears the logo.
    if (Object.prototype.hasOwnProperty.call(req.body || {}, 'r_logo')) {
      const lg = String(req.body.r_logo == null ? '' : req.body.r_logo);
      db.settings.r_logo = (lg && lg.length <= 400000 && /^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+$/.test(lg)) ? lg : '';
    }
    if (!['58', '80'].includes(db.settings.print_width)) db.settings.print_width = '80';
    db.settings.show_preview = (db.settings.show_preview === '0') ? '0' : '1';
    db.settings.beep = (db.settings.beep === '0') ? '0' : '1';
    // normalise receipt + kitchen fields
    R_TOGGLES.forEach((k) => { db.settings[k] = (db.settings[k] === '0') ? '0' : '1'; });
    if (['s', 'm', 'l'].indexOf(db.settings.r_logo_size) < 0) db.settings.r_logo_size = 'm';
    if (['s', 'm', 'l', 'xl'].indexOf(db.settings.r_name_size) < 0) db.settings.r_name_size = 'l';
    if (['center', 'right', 'left'].indexOf(db.settings.r_align) < 0) db.settings.r_align = 'center';
    db.settings.r_scale = String(Math.max(0.7, Math.min(1.6, parseFloat(db.settings.r_scale) || 1)));
    db.settings.k_scale = String(Math.max(0.7, Math.min(1.6, parseFloat(db.settings.k_scale) || 1)));
    save(); res.json({ settings: db.settings });
  }));

  // ---- foods ----
  const shapeFood = (f) => ({ id: f.id, name_ku: f.name_ku, name_ar: f.name_ar || '', name_en: f.name_en || '', category: f.category || '', price: num(f.price), is_active: !!f.is_active, sort_order: f.sort_order });
  const sortedFoods = () => db.foods.slice().sort((a, b) => (a.sort_order - b.sort_order) || (a.id - b.id));
  app.get('/api/foods', auth, (req, res) => { const all = req.query.all === '1'; res.json({ foods: sortedFoods().filter((f) => all || f.is_active).map(shapeFood) }); });
  function readFood(b) {
    return {
      name_ku: String((b && b.name_ku) || '').trim().slice(0, 160), name_ar: String((b && b.name_ar) || '').trim().slice(0, 160),
      name_en: String((b && b.name_en) || '').trim().slice(0, 160), category: String((b && b.category) || '').trim().slice(0, 60),
      price: Math.max(0, money(b && b.price)), is_active: (b && b.is_active === false) ? false : true, sort_order: Math.round(num(b && b.sort_order)),
    };
  }
  app.post('/api/foods', auth, requireSection('foods'), wrap((req, res) => {
    const f = readFood(req.body); if (!f.name_ku && !f.name_en && !f.name_ar) return res.status(400).json({ error: 'Name is required' });
    // Always APPEND a new food to the end of the menu (max existing sort_order + 10) so it never
    // jumps to the top and never disturbs the cashier's drag-drop arrangement.
    const id = ++db.seq.food; f.id = id;
    f.sort_order = db.foods.reduce((m, x) => Math.max(m, x.sort_order || 0), 0) + 10;
    db.foods.push(f); save(); res.status(201).json({ food: shapeFood(f) });
  }));
  app.put('/api/foods/:id', auth, requireSection('foods'), wrap((req, res) => {
    const f = db.foods.find((x) => x.id === (parseInt(req.params.id, 10) || 0)); if (!f) return res.status(404).json({ error: 'Not found' });
    const nf = readFood(req.body); if (!nf.name_ku && !nf.name_en && !nf.name_ar) return res.status(400).json({ error: 'Name is required' });
    // Keep the card where the cashier dragged it. readFood() defaults a missing sort_order to 0, and
    // the edit form never sends one — without this an edit (e.g. changing a category) would yank the
    // item to the very front of the POS grid every time it is saved.
    if (!Object.prototype.hasOwnProperty.call(req.body || {}, 'sort_order')) nf.sort_order = f.sort_order;
    Object.assign(f, nf, { id: f.id }); save(); res.json({ food: shapeFood(f) });
  }));
  app.delete('/api/foods/:id', auth, requireSection('foods'), wrap((req, res) => {
    const id = parseInt(req.params.id, 10) || 0; const i = db.foods.findIndex((x) => x.id === id); if (i < 0) return res.status(404).json({ error: 'Not found' });
    db.foods.splice(i, 1); save(); res.json({ ok: true });
  }));
  // Reordering is a POS-layout action done by dragging cards in the register grid, so allow
  // 'pos' users (cashiers) — not just 'foods' managers — to persist it. Otherwise a cashier's
  // drag-drop 403s server-side and the order reverts to the saved sort on the next foods reload.
  app.post('/api/foods/reorder', auth, requireSection('pos'), wrap((req, res) => {
    const ids = Array.isArray(req.body && req.body.ids) ? req.body.ids.map((x) => parseInt(x, 10)) : [];
    let o = 10; ids.forEach((id) => { const f = db.foods.find((x) => x.id === id); if (f) { f.sort_order = o; o += 10; } }); save(); res.json({ ok: true });
  }));

  // ---- orders ----
  const itemsOf = (o) => db.order_items.filter((i) => i.order_id === o.id);
  const printedOf = (i) => Math.min(Math.max(0, Math.round(num(i.printed_qty))), Math.max(0, Math.round(num(i.qty))));
  const pendingOf = (i) => Math.max(0, Math.round(num(i.qty)) - printedOf(i));
  const pendingCount = (o) => itemsOf(o).reduce((s, i) => s + pendingOf(i), 0);
  const shapeOrder = (o, withItems) => ({
    id: o.id, order_no: o.order_no, lang: o.lang, total: num(o.total), item_count: o.item_count,
    kitchen_status: o.kitchen_status || 'new', created_at: o.created_at,
    paid_total: money(o.paid_total), balance: money(num(o.total) - num(o.paid_total)),
    paid_assumed: !!o.paid_assumed,                       // rung before the update — payment unknown
    closed: new Date(o.created_at).getTime() < boundary(),  // a settled day; nothing may be written to it
    pending_count: pendingCount(o), merged_from: Array.isArray(o.merged_from) ? o.merged_from : [],
    items: withItems ? itemsOf(o).map((i) => ({
      id: i.id, food_id: i.food_id, name: i.name, price: num(i.price), qty: i.qty,
      line_total: num(i.line_total), category: i.category, note: i.note || '',
      printed_qty: printedOf(i), pending_qty: pendingOf(i),
    })) : undefined,
  });
  function boundary() { return boundaryFor(db.settings); }
  function boundaryFor(settings) {
    let rt = (settings && settings.reset_time) || '00:00'; if (!/^\d{1,2}:\d{2}$/.test(rt)) rt = '00:00';
    let [h, m] = rt.split(':').map((x) => parseInt(x, 10));
    if (!(h >= 0 && h <= 23 && m >= 0 && m <= 59)) { h = 0; m = 0; }   // out-of-range time (e.g. 25:00) → midnight
    const now = new Date(); const b = new Date(now); b.setHours(h, m, 0, 0);
    if (now < b) b.setDate(b.getDate() - 1);
    return b.getTime();
  }
  function todaysOrders() { const b = boundary(); return db.orders.filter((o) => new Date(o.created_at).getTime() >= b); }
  // A ticket number must NEVER be handed out twice in a business day, because it is printed on a
  // kitchen ticket and a customer receipt the moment it is issued. Neither count+1 nor
  // max(live order_no)+1 is safe once merging exists: merging DELETES the source order, so both
  // free a number that is already on paper — merge the newest ticket and the next order would be
  // issued the very same number. So the day's high-water mark is stored and only ever goes up.
  // (The max() of live orders is still folded in, so data written by older builds is respected.)
  function nextOrderNo() {
    const b = boundary();
    const hw = (db.seq.order_no && db.seq.order_no.day === b) ? num(db.seq.order_no.last) : 0;
    const live = todaysOrders().reduce((m, o) => Math.max(m, num(o.order_no)), 0);
    const next = Math.max(hw, live) + 1;
    db.seq.order_no = { day: b, last: next };   // persisted by the caller's save()
    return next;
  }
  app.get('/api/orders', auth, (req, res) => {
    const lim = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 200);
    // ?today=1 → only the current business day, for the "merge into #…" ticket picker
    // ?open=1  → today's tickets that still need something: money owed, or food not yet fired.
    //            A settled, fully-cooked ticket is finished business and must not clutter the list.
    let src = db.orders;
    if (String(req.query.open || '') === '1') src = todaysOrders().filter((o) => money(num(o.total) - num(o.paid_total)) > 0 || pendingCount(o) > 0 || o.paid_assumed);
    else if (String(req.query.today || '') === '1') src = todaysOrders();
    const rows = src.slice().sort((a, b) => b.id - a.id).slice(0, lim);
    res.json({ orders: rows.map((o) => shapeOrder(o, false)), total: db.orders.length });
  });
  app.get('/api/orders/stats', auth, (_q, res) => {
    const b = boundary(); const today = db.orders.filter((o) => new Date(o.created_at).getTime() >= b);
    res.json({ total: db.orders.length, today: today.length, today_sales: today.reduce((s, o) => s + num(o.total), 0) });
  });

  // ---- sales reports / analytics ----
  const dayKey = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  app.get('/api/reports', auth, requireSection('reports'), wrap((req, res) => {
    const q = req.query || {};
    const now = new Date();
    let start, end, label = String(q.range || 'today');
    if (q.from || q.to) {
      label = 'custom';
      // swap a reversed range by the raw date strings, so 'from' keeps its 00:00 open and
      // 'to' its 23:59 close — swapping the parsed Dates would carry the wrong times and drop
      // most of both endpoint days.
      let fromStr = q.from ? String(q.from) : null;
      let toStr = q.to ? String(q.to) : null;
      if (fromStr && toStr && fromStr > toStr) { const tmp = fromStr; fromStr = toStr; toStr = tmp; }
      const sf = fromStr ? new Date(fromStr + 'T00:00:00') : null;
      const st = toStr ? new Date(toStr + 'T23:59:59.999') : null;
      end = (st && !isNaN(st)) ? st : now;
      // missing/invalid 'from' → that single 'to' day (never all-history via epoch)
      start = (sf && !isNaN(sf)) ? sf : new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0, 0);
      if (start.getTime() > end.getTime()) { const tmp = start; start = end; end = tmp; }   // backstop for invalid-date edges
    } else if (q.range === 'month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0); end = now;
    } else if (q.range === 'week') {
      start = new Date(now); start.setDate(now.getDate() - 6); start.setHours(0, 0, 0, 0); end = now;
    } else { start = new Date(boundary()); end = now; label = 'today'; }

    const s = start.getTime(), e = end.getTime();
    const orders = db.orders.filter((o) => { const t = new Date(o.created_at).getTime(); return t >= s && t <= e; });
    const oids = new Set(orders.map((o) => o.id));
    const items = db.order_items.filter((i) => oids.has(i.order_id));
    const totalSales = orders.reduce((a, o) => a + num(o.total), 0);
    const count = orders.length;
    const itemsSold = items.reduce((a, i) => a + num(i.qty), 0);

    const catMap = {};
    items.forEach((i) => { const c = i.category || 'other'; (catMap[c] = catMap[c] || { qty: 0, total: 0 }); catMap[c].qty += num(i.qty); catMap[c].total += num(i.line_total); });
    const byCategory = Object.keys(catMap).map((c) => ({ category: c, qty: catMap[c].qty, total: money(catMap[c].total) })).sort((a, b) => b.total - a.total);

    // key by food_id (language-stable) so the same food ordered in ku/ar/en isn't split
    const itemMap = {};
    items.forEach((i) => { const k = String(i.food_id || i.name); (itemMap[k] = itemMap[k] || { name: i.name || '', qty: 0, total: 0 }); if (!itemMap[k].name && i.name) itemMap[k].name = i.name; itemMap[k].qty += num(i.qty); itemMap[k].total += num(i.line_total); });
    const topItems = Object.keys(itemMap).map((k) => itemMap[k]).sort((a, b) => b.qty - a.qty).slice(0, 10).map((x) => ({ name: x.name, qty: x.qty, total: money(x.total) }));

    // contiguous days (fill zero-sale days) so the chart isn't misleading or vanishing
    const dayMap = {};
    orders.forEach((o) => { const k = dayKey(new Date(o.created_at)); (dayMap[k] = dayMap[k] || { count: 0, total: 0 }); dayMap[k].count += 1; dayMap[k].total += num(o.total); });
    const byDay = [];
    const cur = new Date(start); cur.setHours(0, 0, 0, 0);
    const endDay = new Date(end); endDay.setHours(0, 0, 0, 0);
    // keep the chart to the most recent 400 days so a very wide range shows the days that
    // actually hold data (near `end`), never a wall of old empty bars that hides them.
    const earliest = new Date(endDay); earliest.setDate(earliest.getDate() - 399);
    if (cur.getTime() < earliest.getTime()) cur.setTime(earliest.getTime());
    for (let g = 0; cur.getTime() <= endDay.getTime() && g < 400; g++) {
      const k = dayKey(cur); const v = dayMap[k] || { count: 0, total: 0 };
      byDay.push({ day: k, count: v.count, total: money(v.total) });
      cur.setDate(cur.getDate() + 1);
    }

    res.json({
      label, from: start.toISOString(), to: end.toISOString(),
      total_sales: money(totalSales), orders: count, items_sold: itemsSold,
      avg_order: money(count ? totalSales / count : 0),
      by_category: byCategory, top_items: topItems, by_day: byDay,
      currency: db.settings.currency || 'IQD',
    });
  }));
  app.get('/api/orders/:id', auth, (req, res) => { const o = db.orders.find((x) => x.id === (parseInt(req.params.id, 10) || 0)); if (!o) return res.status(404).json({ error: 'Not found' }); res.json({ order: shapeOrder(o, true) }); });
  app.post('/api/orders', auth, requireSection('pos'), wrap((req, res) => {
    const body = req.body || {}; const lang = ['ku', 'ar', 'en'].includes(body.lang) ? body.lang : 'ku';
    const nameFor = (f) => lang === 'ar' ? (f.name_ar || f.name_ku || f.name_en) : lang === 'en' ? (f.name_en || f.name_ku || f.name_ar) : (f.name_ku || f.name_ar || f.name_en);
    const items = [];
    const missing = [];
    (Array.isArray(body.items) ? body.items : []).forEach((it) => {
      const fid = parseInt(it && it.food_id, 10) || 0;
      const f = db.foods.find((x) => x.id === fid);
      if (!f) { missing.push(fid); return; }   // a food was deleted/renamed under a stale POS grid
      const qty = Math.max(1, Math.round(num(it.qty))); const price = money(f.price);
      items.push({ food_id: f.id, name: String(nameFor(f)).slice(0, 160), price, qty, line_total: money(price * qty), category: f.category || '', note: String((it && it.note) || '').trim().slice(0, 200) });
    });
    // Never silently drop items — that would understate the order/receipt/total. If any
    // requested item no longer resolves, reject the whole order so the cashier refreshes.
    if (missing.length) return res.status(409).json({ error: 'Menu changed — refresh and re-ring', missing });
    if (!items.length) return res.status(400).json({ error: 'Add at least one item' });
    const total = money(items.reduce((s, i) => s + i.line_total, 0));
    const count = items.reduce((s, i) => s + i.qty, 0);
    const order_no = nextOrderNo();
    const id = ++db.seq.order; const created_at = new Date().toISOString();
    const order = { id, order_no, lang, total, item_count: count, kitchen_status: 'new', created_at, paid_total: 0, merged_from: [] };
    db.orders.push(order);
    // Row ids come from db.seq.item so they are unique for the life of the file. The old
    // "last row id + 1" / "max(id) + 1" schemes reuse an id after a merge deletes rows, which
    // would graft one line's kitchen-print state onto a different line.
    items.forEach((it) => db.order_items.push(Object.assign({ id: ++db.seq.item, order_id: id, printed_qty: 0 }, it)));
    save(); res.status(201).json({ order: shapeOrder(order, true) });
  }));
  // Update an OPEN order's items — used when the cashier adds more to a cart that was already
  // partly sent to the kitchen. The order GROWS in place (same id + order_no + created_at) instead
  // of a second order being created, so the ticket number never changes mid-order.
  app.put('/api/orders/:id', auth, requireSection('pos'), wrap((req, res) => {
    const o = db.orders.find((x) => x.id === (parseInt(req.params.id, 10) || 0));
    if (!o) return res.status(404).json({ error: 'Not found' });
    // Only TODAY's orders can be grown in place — never rewrite a prior-day/closed order, which
    // would silently corrupt historical sales reports. The UI only ever PUTs the order it just
    // opened this session, so this never trips in normal use; it's a report-integrity guard.
    if (new Date(o.created_at).getTime() < boundary()) return res.status(409).json({ error: 'Order is closed', closed: true });
    const body = req.body || {}; const lang = ['ku', 'ar', 'en'].includes(body.lang) ? body.lang : o.lang;
    const nameFor = (f) => lang === 'ar' ? (f.name_ar || f.name_ku || f.name_en) : lang === 'en' ? (f.name_en || f.name_ku || f.name_ar) : (f.name_ku || f.name_ar || f.name_en);
    const items = []; const missing = [];
    (Array.isArray(body.items) ? body.items : []).forEach((it) => {
      const fid = parseInt(it && it.food_id, 10) || 0; const f = db.foods.find((x) => x.id === fid);
      if (!f) { missing.push(fid); return; }
      const qty = Math.max(1, Math.round(num(it.qty))); const price = money(f.price);
      items.push({ food_id: f.id, name: String(nameFor(f)).slice(0, 160), price, qty, line_total: money(price * qty), category: f.category || '', note: String((it && it.note) || '').trim().slice(0, 200) });
    });
    if (missing.length) return res.status(409).json({ error: 'Menu changed — refresh and re-ring', missing });
    if (!items.length) return res.status(400).json({ error: 'Add at least one item' });

    // RECONCILE, never nuke-and-repush. The old code deleted every row of this order and pushed
    // fresh ones, which threw away each line's printed_qty — so the next Send re-fired food that
    // was already on the grill.
    //
    // Matching is done PER KEY GROUP (food_id + note), never row-by-row in array order: two rows can
    // legitimately share a key (tap, add a note, tap again, add the same note), and pairing those by
    // position bound a posted line to the wrong row and produced a false "already sent" refusal.
    // The real invariant is per group: the ticket may never hold fewer units of a key than the
    // kitchen is already cooking of that key.
    //
    // NOTHING IS WRITTEN until every check has passed. The previous version mutated rows as it went
    // and could then return 409, leaving the rejected edit live in the database.
    const key = (x) => x.food_id + '\u0000' + String(x.note || '');
    const existing = itemsOf(o);
    const groups = {};
    existing.forEach((r) => { (groups[key(r)] = groups[key(r)] || { rows: [], posted: [] }).rows.push(r); });
    items.forEach((it) => { (groups[key(it)] = groups[key(it)] || { rows: [], posted: [] }).posted.push(it); });

    const blocked = [];
    Object.keys(groups).forEach((k) => {
      const g = groups[k];
      const cooking = g.rows.reduce((a, r) => a + printedOf(r), 0);
      const asked = g.posted.reduce((a, i) => a + num(i.qty), 0);
      // A line already sent to the kitchen cannot shrink below what the kitchen is cooking — that
      // food exists. Un-cooking it needs a void/cancel slip, which this build does not have, so
      // refuse loudly rather than let the screen quietly disagree with the grill.
      if (asked < cooking) {
        const r0 = g.rows[0];
        blocked.push({ name: (r0 && r0.name) || (g.posted[0] && g.posted[0].name) || '', note: (r0 && r0.note) || '', printed: cooking, asked });
      }
    });
    if (blocked.length) return res.status(409).json({ error: 'Already sent to the kitchen — it cannot be reduced', blocked });

    // ---- every check passed; now build the new row set ----
    const kept = [];
    Object.keys(groups).forEach((k) => {
      const g = groups[k];
      // spend the cooked rows first, biggest first, so print state is always carried on a row that
      // still has units under it
      const rows = g.rows.slice().sort((a, c) => printedOf(c) - printedOf(a));
      let want = g.posted.reduce((a, i) => a + num(i.qty), 0);
      const sample = g.posted[0];
      rows.forEach((r) => {
        if (want <= 0) return;                      // this row is gone (it had nothing cooking — checked above)
        const take = Math.max(printedOf(r), Math.min(num(r.qty), want));
        const q = Math.min(take, want);
        want -= q;
        r.qty = q;
        // A row keeps the PRICE IT WAS RUNG AT. Re-reading the live menu here retro-priced food the
        // customer had already eaten and paid for whenever the owner edited a price mid-shift.
        r.line_total = money(num(r.price) * q);
        if (sample) { r.name = sample.name; r.category = sample.category; }   // names still follow a language switch
        kept.push(r);
      });
      // anything still wanted is genuinely new food and takes the CURRENT menu price
      if (want > 0 && sample) {
        kept.push(Object.assign({}, sample, { id: ++db.seq.item, order_id: o.id, printed_qty: 0, qty: want, line_total: money(num(sample.price) * want) }));
      }
    });
    const keptIds = new Set(kept.map((r) => r.id));
    db.order_items = db.order_items.filter((i) => i.order_id !== o.id || keptIds.has(i.id));
    kept.forEach((r) => { if (db.order_items.indexOf(r) < 0) db.order_items.push(r); });
    const newCount = kept.reduce((s, i) => s + num(i.qty), 0);
    o.lang = lang; o.total = money(kept.reduce((s, i) => s + num(i.line_total), 0));
    // If the order grew, put it back in the kitchen queue so a KDS/kitchen screen shows the additions
    // (a print-based kitchen already got the delta ticket; this covers screen kitchens).
    if (newCount > o.item_count) o.kitchen_status = 'new';
    o.item_count = newCount;
    save(); res.json({ order: shapeOrder(o, true) });
  }));
  // Merge one of today's tickets INTO another — the cashier rang a second ticket (#51) for a table
  // that already has an open one (#50) and types 50 over the number. Every line on #51 moves to #50,
  // identical lines (same food, same note, same unit price) fold together, #51 disappears entirely,
  // and #50's total/count are recomputed from its items. One table = one ticket, one number, one bill.
  const sameLine = (a, c) => a.food_id === c.food_id && String(a.note || '') === String(c.note || '') && num(a.price) === num(c.price);
  function recalcOrder(o) {
    const its = db.order_items.filter((i) => i.order_id === o.id);
    o.total = money(its.reduce((s, i) => s + num(i.line_total), 0));
    o.item_count = its.reduce((s, i) => s + num(i.qty), 0);
  }
  app.post('/api/orders/:id/merge', auth, requireSection('pos'), wrap((req, res) => {
    const b = boundary();
    const src = db.orders.find((x) => x.id === (parseInt(req.params.id, 10) || 0));
    if (!src) return res.status(404).json({ error: 'Not found' });
    const want = parseInt((req.body || {}).into_order_no, 10) || 0;
    if (!want) return res.status(400).json({ error: 'Enter an order number' });
    // Today only, both sides: merging into a settled day would silently rewrite closed sales totals.
    if (new Date(src.created_at).getTime() < b) return res.status(409).json({ error: 'Order is closed', closed: true });
    // Newest match wins, so any duplicate numbers left by the old count+1 scheme resolve to the
    // ticket the cashier is actually looking at.
    const dst = todaysOrders().filter((o) => o.order_no === want).sort((a, c) => c.id - a.id)[0];
    if (!dst) return res.status(404).json({ error: 'No order #' + want + ' today' });
    if (dst.id === src.id) return res.status(400).json({ error: 'Same order' });

    const before = num(dst.item_count);
    const dstItems = db.order_items.filter((i) => i.order_id === dst.id);
    // How much of the source was ALREADY on a kitchen ticket under the source's own number. The
    // kitchen is holding that paper headed #src while the food now lives on #dst — the cashier is
    // offered a transfer slip for exactly this quantity (see Issue 3 handling in the client).
    let movedPrinted = 0;
    db.order_items.filter((i) => i.order_id === src.id).forEach((it) => {
      movedPrinted += printedOf(it);
      const hit = dstItems.filter((d) => sameLine(d, it))[0];
      if (hit) {
        // fold: quantities AND print state add up, so already-cooked units stay counted as cooked
        hit.qty = num(hit.qty) + num(it.qty);
        hit.printed_qty = printedOf(hit) + printedOf(it);
        hit.line_total = money(num(hit.price) * hit.qty);
      } else {
        // move the row itself — keeping its id preserves its print state and its identity
        it.order_id = dst.id; dstItems.push(it);
      }
    });
    const movedIds = new Set(dstItems.map((i) => i.id));
    db.order_items = db.order_items.filter((i) => i.order_id !== src.id || movedIds.has(i.id));
    db.orders = db.orders.filter((o) => o.id !== src.id);
    // The customer may already have paid part of this table on the other ticket — carry it over so
    // the balance is what is genuinely still owed, not the whole merged total.
    dst.paid_total = money(num(dst.paid_total) + num(src.paid_total));
    if (src.paid_assumed || dst.paid_assumed) dst.paid_assumed = true;   // unknown + known is still unknown
    if (!Array.isArray(dst.merged_from)) dst.merged_from = [];
    dst.merged_from = dst.merged_from.concat(Array.isArray(src.merged_from) ? src.merged_from : [], [num(src.order_no)]).slice(0, 40);
    recalcOrder(dst);
    // the merged-in food still has to reach a kitchen screen
    if (dst.item_count > before) dst.kitchen_status = 'new';
    save();
    res.json({
      order: shapeOrder(dst, true),
      merged_from: { id: src.id, order_no: src.order_no, printed_qty: movedPrinted },
    });
  }));
  // ---- fire the DELTA to the kitchen ----
  // The server decides what is un-printed, not the browser. This is the whole point of the v1.7
  // schema: the cart used to carry the only record of what had been sent, so a restart, a Clear, a
  // draft round-trip or a merge reset it and the next Send re-cooked the whole ticket.
  // printed_qty is raised HERE, before the paper is asked for — the same moment the old client
  // marked line.sent. A printer that jams therefore leaves food marked sent; the cashier recovers
  // with Reprint (below), which re-prints without changing any state. That is deliberate: marking
  // after a confirmation sounds safer but silently double-cooks whenever the ack is lost.
  app.post('/api/orders/:id/fire', auth, requireSection('pos'), wrap((req, res) => {
    const o = db.orders.find((x) => x.id === (parseInt(req.params.id, 10) || 0));
    if (!o) return res.status(404).json({ error: 'Not found' });
    if (new Date(o.created_at).getTime() < boundary()) return res.status(409).json({ error: 'Order is closed', closed: true });
    const lines = [];
    itemsOf(o).forEach((i) => {
      const d = pendingOf(i);
      if (d > 0) lines.push({ item_id: i.id, food_id: i.food_id, name: i.name, qty: d, note: i.note || '', category: i.category || '' });
    });
    if (!lines.length) return res.json({ fired: null, order: shapeOrder(o, true) });
    itemsOf(o).forEach((i) => { i.printed_qty = Math.round(num(i.qty)); });
    o.kitchen_status = 'new';
    o.last_fire_at = new Date().toISOString();
    // Keep the batch verbatim. A reprint must repeat THIS slip — recomputing one from printed_qty
    // would hand the kitchen the ticket's whole cooked history and every earlier course gets made
    // a second time.
    o.last_fire = { order_no: o.order_no, at: o.last_fire_at, lang: o.lang, items: lines };
    save();
    res.json({ fired: o.last_fire, order: shapeOrder(o, true) });
  }));
  // Re-print what was last fired, WITHOUT touching print state — for a jammed or offline printer.
  app.post('/api/orders/:id/refire', auth, requireSection('pos'), wrap((req, res) => {
    const o = db.orders.find((x) => x.id === (parseInt(req.params.id, 10) || 0));
    if (!o) return res.status(404).json({ error: 'Not found' });
    // ONLY the last batch, and only if we actually recorded one. Refusing is safe; re-sending a
    // ticket's whole history is not — the cooks would remake every earlier course.
    if (!o.last_fire || !(o.last_fire.items || []).length) return res.status(400).json({ error: 'Nothing has been sent to the kitchen yet' });
    res.json({ fired: Object.assign({}, o.last_fire, { order_no: o.order_no, reprint: true }) });
  }));
  // ---- record money actually collected ----
  // total = what is owed, paid_total = what has been taken. A ticket reopened after payment shows
  // the balance for the newly added food instead of quietly inflating a settled sale.
  app.post('/api/orders/:id/pay', auth, requireSection('pos'), wrap((req, res) => {
    const o = db.orders.find((x) => x.id === (parseInt(req.params.id, 10) || 0));
    if (!o) return res.status(404).json({ error: 'Not found' });
    const body = req.body || {};
    const amount = body.amount == null ? money(num(o.total) - num(o.paid_total)) : money(num(body.amount));
    if (!(amount > 0)) return res.status(400).json({ error: 'Nothing to collect' });
    o.paid_total = money(Math.min(num(o.paid_total) + amount, num(o.total)));   // never book more than the ticket
    o.paid_at = new Date().toISOString();
    o.paid_assumed = false;                                                     // a human has now settled it
    save();
    res.json({ order: shapeOrder(o, true), collected: amount });
  }));
  app.post('/api/orders/:id/done', auth, wrap((req, res) => { const o = db.orders.find((x) => x.id === (parseInt(req.params.id, 10) || 0)); if (!o) return res.status(404).json({ error: 'Not found' }); o.kitchen_status = 'done'; save(); res.json({ ok: true }); }));

  // ---- drafts (held "pay later" carts) — saved from the POS, recalled later to finish & print ----
  app.get('/api/drafts', auth, requireSection('pos'), (_q, res) => res.json({ drafts: db.drafts }));
  app.post('/api/drafts', auth, requireSection('pos'), wrap((req, res) => {
    const b = req.body || {};
    const items = (Array.isArray(b.items) ? b.items : []).map((it) => ({
      food_id: parseInt(it && it.food_id, 10) || 0,
      name: String((it && it.name) || '').slice(0, 160),
      price: money(it && it.price),
      qty: Math.max(1, Math.round(num(it && it.qty))),
      note: String((it && it.note) || '').trim().slice(0, 200),
    })).filter((it) => it.food_id);
    if (!items.length) return res.status(400).json({ error: 'Add at least one item' });
    const total = money(items.reduce((s, i) => s + i.price * i.qty, 0));
    const item_count = items.reduce((s, i) => s + i.qty, 0);
    const draft = { id: ++db.seq.draft, name: String(b.name || '').trim().slice(0, 60), lang: ['ku', 'ar', 'en'].includes(b.lang) ? b.lang : 'ku', items, total, item_count, created_at: new Date().toISOString() };
    db.drafts.push(draft); save(); res.status(201).json({ draft });
  }));
  app.delete('/api/drafts/:id', auth, requireSection('pos'), wrap((req, res) => {
    const id = parseInt(req.params.id, 10) || 0;
    const i = db.drafts.findIndex((d) => d.id === id); if (i < 0) return res.status(404).json({ error: 'Not found' });
    db.drafts.splice(i, 1); save(); res.json({ ok: true });
  }));
  app.get('/api/kitchen', auth, (_q, res) => { const b = boundary(); res.json({ orders: db.orders.filter((o) => (o.kitchen_status || 'new') === 'new' && new Date(o.created_at).getTime() >= b).sort((a, b) => a.id - b.id).slice(0, 60).map((o) => shapeOrder(o, true)) }); });

  // ---- printers & zones (config stored here; actual printing is in main via IPC) ----
  const str = (v, n) => String(v == null ? '' : v).slice(0, n || 80);
  const clampPort = (v) => { const n = parseInt(v, 10); return (n >= 1 && n <= 65535) ? n : 9100; };  // bad/missing port → 9100, never 1
  const shapePrinter = (p) => ({
    id: str(p && p.id, 40) || ('p' + (++db.seq.food)),
    name: str(p && p.name, 80), kind: (p && p.kind === 'network') ? 'network' : 'system',
    device: str(p && p.device, 160), host: str(p && p.host, 60), port: clampPort(p && p.port),
  });
  const shapeZone = (z) => ({
    id: str(z && z.id, 40) || ('z' + (++db.seq.food)),
    name: str(z && z.name, 80), type: (z && z.type === 'customer') ? 'customer' : 'items',
    printer_id: str(z && z.printer_id, 40),
    categories: Array.isArray(z && z.categories) ? z.categories.map((c) => str(c, 40)).filter(Boolean).slice(0, 60) : [],
  });
  app.get('/api/printers', auth, (_q, res) => res.json({ printers: db.printers, zones: db.zones }));
  app.put('/api/printers', auth, requireSection('settings'), wrap((req, res) => {
    if (Array.isArray(req.body && req.body.printers)) db.printers = req.body.printers.slice(0, 20).map(shapePrinter);
    if (Array.isArray(req.body && req.body.zones)) db.zones = req.body.zones.slice(0, 20).map(shapeZone);
    save(); res.json({ printers: db.printers, zones: db.zones });
  }));

  // ---- custom food categories (user-managed) ----
  const shapeCategory = (c) => ({
    id: str(c && c.id, 40) || ('c' + (++db.seq.food)),
    name_ku: str(c && c.name_ku, 60), name_ar: str(c && c.name_ar, 60), name_en: str(c && c.name_en, 60),
    sort_order: Math.round(num((c && c.sort_order) || 0)),
  });
  app.get('/api/categories', auth, (_q, res) => res.json({ categories: db.categories }));
  app.put('/api/categories', auth, requireSection('settings'), wrap((req, res) => {
    if (Array.isArray(req.body && req.body.categories)) {
      db.categories = req.body.categories.slice(0, 60).map(shapeCategory);
      // cascade: drop deleted category ids from every zone so no invisible rule keeps routing
      const valid = new Set(db.categories.map((c) => c.id).concat(['other']));
      db.zones.forEach((z) => { if (Array.isArray(z.categories)) z.categories = z.categories.filter((c) => valid.has(c)); });
    }
    save(); res.json({ categories: db.categories });
  }));

  // ---- static frontend ----
  // Any unmatched /api/* request is a real 404 (JSON) — do NOT let it fall through to
  // the SPA catch-all below, which would return 200 + index.html and mask the error.
  app.use('/api', (_q, res) => res.status(404).json({ error: 'Not found' }));
  app.use(express.static(APP_DIR, { index: 'index.html' }));
  app.get('*', (_q, res) => res.sendFile(path.join(APP_DIR, 'index.html')));

  return new Promise((resolve) => {
    const srv = app.listen(0, '127.0.0.1', () => resolve({ port: srv.address().port, server: srv }));
  });
}

module.exports = { createServer };
