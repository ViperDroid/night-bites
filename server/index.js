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
    settings: {
      print_width: '80', phone: '0750 947 1000', phones: '0750 947 1000',
      currency: 'IQD', reset_time: '00:00', show_preview: '1', beep: '1',
      business_name_ku: 'نایت بایتس', business_name_ar: 'نايت بايتس', business_name_en: 'NIGHT BITES',
    },
    printers: [],   // registered: { id, name, device, kind }
    zones: [],      // { id, name, printer_device, categories: [] }
    seq: { food: 100, order: 0, user: 1 },
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
    for (let attempt = 0; attempt < 4; attempt++) {
      try { raw = fs.readFileSync(DATA_FILE, 'utf8'); err = null; break; }
      catch (e) {
        err = e;
        if (e && e.code === 'ENOENT') break;          // genuinely no file yet — stop retrying
        const until = Date.now() + 150; while (Date.now() < until) { /* brief spin for a transient lock */ }
      }
    }
    if (err && err.code === 'ENOENT') { const d = DEFAULT; save(d); return d; }  // first run
    if (err) {                                          // exists but unreadable — do NOT overwrite
      console.error('night-bites: could not read data file (' + (err.code || err.message || err) + '); starting on defaults without overwriting.');
      return DEFAULT;
    }
    try { return JSON.parse(raw); }
    catch (e) {                                         // exists but corrupt JSON — preserve a copy, do NOT overwrite
      try { const bak = DATA_FILE + '.corrupt-' + Date.now(); fs.writeFileSync(bak, raw); console.error('night-bites: data file is corrupt (' + (e.message || e) + '); preserved a copy at ' + bak + ' and started on defaults without overwriting.'); }
      catch (_) { console.error('night-bites: data file is corrupt (' + (e.message || e) + '); started on defaults without overwriting.'); }
      return DEFAULT;
    }
  }
  // fill any missing top-level keys (forward-compat across updates)
  Object.keys(DEFAULT).forEach((k) => { if (db[k] === undefined) db[k] = DEFAULT[k]; });
  if (!db.seq.user) db.seq.user = 1;
  // migrate pre-accounts users (older installs): give them role/sections/etc.
  db.users.forEach((u) => {
    if (!u.role) u.role = 'admin';
    if (!Array.isArray(u.sections)) u.sections = SECTIONS.slice();
    if (u.is_active === undefined) u.is_active = true;
    if (!u.display_name) u.display_name = u.username === 'admin' ? 'Admin' : u.username;
    if (u.id > db.seq.user) db.seq.user = u.id;
  });

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
  const ALLOWED = new Set(['print_width', 'business_name_ku', 'business_name_ar', 'business_name_en', 'phone', 'phones', 'currency', 'reset_time', 'show_preview', 'beep']);
  app.get('/api/settings', auth, (_q, r) => r.json({ settings: db.settings }));
  app.put('/api/settings', auth, requireSection('settings'), wrap((req, res) => {
    Object.keys(req.body || {}).forEach((k) => { if (ALLOWED.has(k)) db.settings[k] = String(req.body[k] == null ? '' : req.body[k]).slice(0, 500); });
    if (!['58', '80'].includes(db.settings.print_width)) db.settings.print_width = '80';
    db.settings.show_preview = (db.settings.show_preview === '0') ? '0' : '1';
    db.settings.beep = (db.settings.beep === '0') ? '0' : '1';
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
      price: money(b && b.price), is_active: (b && b.is_active === false) ? false : true, sort_order: Math.round(num(b && b.sort_order)),
    };
  }
  app.post('/api/foods', auth, requireSection('foods'), wrap((req, res) => {
    const f = readFood(req.body); if (!f.name_ku && !f.name_en && !f.name_ar) return res.status(400).json({ error: 'Name is required' });
    const id = ++db.seq.food; f.id = id; if (!f.sort_order) f.sort_order = id * 10; db.foods.push(f); save(); res.status(201).json({ food: shapeFood(f) });
  }));
  app.put('/api/foods/:id', auth, requireSection('foods'), wrap((req, res) => {
    const f = db.foods.find((x) => x.id === (parseInt(req.params.id, 10) || 0)); if (!f) return res.status(404).json({ error: 'Not found' });
    Object.assign(f, readFood(req.body), { id: f.id }); save(); res.json({ food: shapeFood(f) });
  }));
  app.delete('/api/foods/:id', auth, requireSection('foods'), wrap((req, res) => {
    const id = parseInt(req.params.id, 10) || 0; const i = db.foods.findIndex((x) => x.id === id); if (i < 0) return res.status(404).json({ error: 'Not found' });
    db.foods.splice(i, 1); save(); res.json({ ok: true });
  }));
  app.post('/api/foods/reorder', auth, requireSection('foods'), wrap((req, res) => {
    const ids = Array.isArray(req.body && req.body.ids) ? req.body.ids.map((x) => parseInt(x, 10)) : [];
    let o = 10; ids.forEach((id) => { const f = db.foods.find((x) => x.id === id); if (f) { f.sort_order = o; o += 10; } }); save(); res.json({ ok: true });
  }));

  // ---- orders ----
  const shapeOrder = (o, withItems) => ({
    id: o.id, order_no: o.order_no, lang: o.lang, total: num(o.total), item_count: o.item_count,
    kitchen_status: o.kitchen_status || 'new', created_at: o.created_at,
    items: withItems ? db.order_items.filter((i) => i.order_id === o.id).map((i) => ({ id: i.id, food_id: i.food_id, name: i.name, price: num(i.price), qty: i.qty, line_total: num(i.line_total), category: i.category })) : undefined,
  });
  function boundary() {
    let rt = db.settings.reset_time || '00:00'; if (!/^\d{1,2}:\d{2}$/.test(rt)) rt = '00:00';
    const [h, m] = rt.split(':').map((x) => parseInt(x, 10));
    const now = new Date(); const b = new Date(now); b.setHours(h, m, 0, 0);
    if (now < b) b.setDate(b.getDate() - 1);
    return b.getTime();
  }
  app.get('/api/orders', auth, (req, res) => {
    const lim = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 200);
    const rows = db.orders.slice().sort((a, b) => b.id - a.id).slice(0, lim);
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
      const sf = q.from ? new Date(String(q.from) + 'T00:00:00') : null;
      const st = q.to ? new Date(String(q.to) + 'T23:59:59.999') : null;
      end = (st && !isNaN(st)) ? st : now;
      // missing/invalid 'from' → that single 'to' day (never all-history via epoch)
      start = (sf && !isNaN(sf)) ? sf : new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0, 0);
      if (start.getTime() > end.getTime()) { const tmp = start; start = end; end = tmp; }   // swap a reversed range
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
      items.push({ food_id: f.id, name: String(nameFor(f)).slice(0, 160), price, qty, line_total: money(price * qty), category: f.category || '' });
    });
    // Never silently drop items — that would understate the order/receipt/total. If any
    // requested item no longer resolves, reject the whole order so the cashier refreshes.
    if (missing.length) return res.status(409).json({ error: 'Menu changed — refresh and re-ring', missing });
    if (!items.length) return res.status(400).json({ error: 'Add at least one item' });
    const total = money(items.reduce((s, i) => s + i.line_total, 0));
    const count = items.reduce((s, i) => s + i.qty, 0);
    const b = boundary(); const order_no = db.orders.filter((o) => new Date(o.created_at).getTime() >= b).length + 1;
    const id = ++db.seq.order; const created_at = new Date().toISOString();
    const order = { id, order_no, lang, total, item_count: count, kitchen_status: 'new', created_at };
    db.orders.push(order);
    items.forEach((it) => db.order_items.push(Object.assign({ id: db.order_items.length ? db.order_items[db.order_items.length - 1].id + 1 : 1, order_id: id }, it)));
    save(); res.status(201).json({ order: shapeOrder(order, true) });
  }));
  app.post('/api/orders/:id/done', auth, wrap((req, res) => { const o = db.orders.find((x) => x.id === (parseInt(req.params.id, 10) || 0)); if (!o) return res.status(404).json({ error: 'Not found' }); o.kitchen_status = 'done'; save(); res.json({ ok: true }); }));
  app.get('/api/kitchen', auth, (_q, res) => { const b = boundary(); res.json({ orders: db.orders.filter((o) => (o.kitchen_status || 'new') === 'new' && new Date(o.created_at).getTime() >= b).sort((a, b) => a.id - b.id).slice(0, 60).map((o) => shapeOrder(o, true)) }); });

  // ---- printers & zones (config stored here; actual printing is in main via IPC) ----
  const str = (v, n) => String(v == null ? '' : v).slice(0, n || 80);
  const shapePrinter = (p) => ({
    id: str(p && p.id, 40) || ('p' + (++db.seq.food)),
    name: str(p && p.name, 80), kind: (p && p.kind === 'network') ? 'network' : 'system',
    device: str(p && p.device, 160), host: str(p && p.host, 60), port: Math.max(1, Math.min(65535, num((p && p.port) || 9100))),
  });
  const shapeZone = (z) => ({
    id: str(z && z.id, 40) || ('z' + (++db.seq.food)),
    name: str(z && z.name, 80), type: (z && z.type === 'customer') ? 'customer' : 'items',
    printer_id: str(z && z.printer_id, 40),
    categories: Array.isArray(z && z.categories) ? z.categories.map((c) => str(c, 40)).filter(Boolean).slice(0, 12) : [],
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
