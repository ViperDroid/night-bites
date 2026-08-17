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
  const DEFAULT = {
    users: [{ id: 1, username: 'admin', pass: hash('admin') }],
    foods: seedFoods(),
    orders: [],
    order_items: [],
    settings: {
      print_width: '80', phone: '0750 947 1000', phones: '0750 947 1000',
      currency: 'IQD', reset_time: '00:00', show_preview: '1',
      business_name_ku: 'نایت بایتس', business_name_ar: 'نايت بايتس', business_name_en: 'NIGHT BITES',
    },
    printers: [],   // registered: { id, name, device, kind }
    zones: [],      // { id, name, printer_device, categories: [] }
    seq: { food: 100, order: 0 },
  };
  let db;
  try { db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { db = DEFAULT; save(); }
  // fill any missing top-level keys (forward-compat across updates)
  Object.keys(DEFAULT).forEach((k) => { if (db[k] === undefined) db[k] = DEFAULT[k]; });

  function save() {
    const tmp = DATA_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
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
  const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
  const money = (v) => Math.round(num(v) * 100) / 100;

  // ---- sessions (in-memory; single local user) ----
  const tokens = new Set();
  function auth(req, res, next) {
    const m = (req.headers.authorization || '').match(/^Bearer\s+(.+)$/i);
    if (m && tokens.has(m[1])) return next();
    res.status(401).json({ error: 'Unauthorized' });
  }

  const app = express();
  app.use(compression());
  app.use(express.json({ limit: '512kb' }));
  const wrap = (fn) => (req, res) => { try { fn(req, res); } catch (e) { console.error(e); res.status(500).json({ error: 'Server error' }); } };

  app.get('/api/health', (_q, r) => r.json({ status: 'ok', db: 'up', brand: 'NIGHT BITES' }));

  app.post('/api/login', wrap((req, res) => {
    const { username, password } = req.body || {};
    const u = db.users.find((x) => x.username === String(username || '').trim());
    if (!u || !verify(String(password || ''), u.pass)) return res.status(401).json({ error: 'Invalid username or password' });
    const tok = crypto.randomBytes(24).toString('hex'); tokens.add(tok);
    res.json({ token: tok, user: { id: u.id, username: u.username, display_name: 'Admin' } });
  }));
  app.get('/api/me', auth, (req, res) => res.json({ user: { id: 1, username: 'admin', display_name: 'Admin' } }));
  app.post('/api/logout', auth, (req, res) => { const m = (req.headers.authorization || '').match(/^Bearer\s+(.+)$/i); if (m) tokens.delete(m[1]); res.json({ ok: true }); });

  // ---- settings ----
  const ALLOWED = new Set(['print_width', 'business_name_ku', 'business_name_ar', 'business_name_en', 'phone', 'phones', 'currency', 'reset_time', 'show_preview']);
  app.get('/api/settings', auth, (_q, r) => r.json({ settings: db.settings }));
  app.put('/api/settings', auth, wrap((req, res) => {
    Object.keys(req.body || {}).forEach((k) => { if (ALLOWED.has(k)) db.settings[k] = String(req.body[k] == null ? '' : req.body[k]).slice(0, 500); });
    if (!['58', '80'].includes(db.settings.print_width)) db.settings.print_width = '80';
    db.settings.show_preview = (db.settings.show_preview === '0') ? '0' : '1';
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
  app.post('/api/foods', auth, wrap((req, res) => {
    const f = readFood(req.body); if (!f.name_ku && !f.name_en && !f.name_ar) return res.status(400).json({ error: 'Name is required' });
    const id = ++db.seq.food; f.id = id; if (!f.sort_order) f.sort_order = id * 10; db.foods.push(f); save(); res.status(201).json({ food: shapeFood(f) });
  }));
  app.put('/api/foods/:id', auth, wrap((req, res) => {
    const f = db.foods.find((x) => x.id === (parseInt(req.params.id, 10) || 0)); if (!f) return res.status(404).json({ error: 'Not found' });
    Object.assign(f, readFood(req.body), { id: f.id }); save(); res.json({ food: shapeFood(f) });
  }));
  app.delete('/api/foods/:id', auth, wrap((req, res) => {
    const id = parseInt(req.params.id, 10) || 0; const i = db.foods.findIndex((x) => x.id === id); if (i < 0) return res.status(404).json({ error: 'Not found' });
    db.foods.splice(i, 1); save(); res.json({ ok: true });
  }));
  app.post('/api/foods/reorder', auth, wrap((req, res) => {
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
  app.get('/api/orders/:id', auth, (req, res) => { const o = db.orders.find((x) => x.id === (parseInt(req.params.id, 10) || 0)); if (!o) return res.status(404).json({ error: 'Not found' }); res.json({ order: shapeOrder(o, true) }); });
  app.post('/api/orders', auth, wrap((req, res) => {
    const body = req.body || {}; const lang = ['ku', 'ar', 'en'].includes(body.lang) ? body.lang : 'ku';
    const nameFor = (f) => lang === 'ar' ? (f.name_ar || f.name_ku || f.name_en) : lang === 'en' ? (f.name_en || f.name_ku || f.name_ar) : (f.name_ku || f.name_ar || f.name_en);
    const items = [];
    (Array.isArray(body.items) ? body.items : []).forEach((it) => {
      const f = db.foods.find((x) => x.id === (parseInt(it && it.food_id, 10) || 0)); if (!f) return;
      const qty = Math.max(1, Math.round(num(it.qty))); const price = money(f.price);
      items.push({ food_id: f.id, name: String(nameFor(f)).slice(0, 160), price, qty, line_total: money(price * qty), category: f.category || '' });
    });
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
  app.put('/api/printers', auth, wrap((req, res) => {
    if (Array.isArray(req.body && req.body.printers)) db.printers = req.body.printers.slice(0, 20).map(shapePrinter);
    if (Array.isArray(req.body && req.body.zones)) db.zones = req.body.zones.slice(0, 20).map(shapeZone);
    save(); res.json({ printers: db.printers, zones: db.zones });
  }));

  // ---- static frontend ----
  app.use(express.static(APP_DIR, { index: 'index.html' }));
  app.get('*', (_q, res) => res.sendFile(path.join(APP_DIR, 'index.html')));

  return new Promise((resolve) => {
    const srv = app.listen(0, '127.0.0.1', () => resolve({ port: srv.address().port, server: srv }));
  });
}

module.exports = { createServer };
