'use strict';
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const net = require('net');
const os = require('os');
const { autoUpdater } = require('electron-updater');
const { createServer } = require('./server');

let win = null;
let serverInfo = null;
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); }

async function start() {
  serverInfo = await createServer({
    dataFile: path.join(app.getPath('userData'), 'night-bites-data.json'),
    appDir: path.join(__dirname, 'app'),
  });

  win = new BrowserWindow({
    width: 1280, height: 820, minWidth: 900, minHeight: 600,
    backgroundColor: '#F4F6F9',
    icon: path.join(__dirname, 'build', 'icon.ico'),
    title: 'NIGHT BITES',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false,
    },
  });
  Menu.setApplicationMenu(null);        // clean, kiosk-like — no default menu bar
  win.loadURL(`http://127.0.0.1:${serverInfo.port}/`);
  // win.webContents.openDevTools();

  if (app.isPackaged) setupUpdates();
}

/* ------------------------------ auto-update ------------------------------ */
function setupUpdates() {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('update-available', (info) => {
    if (win) win.webContents.send('update-status', { state: 'available', version: info.version });
  });
  autoUpdater.on('download-progress', (p) => {
    if (win) win.webContents.send('update-status', { state: 'downloading', percent: Math.round(p.percent) });
  });
  autoUpdater.on('update-downloaded', (info) => {
    if (win) win.webContents.send('update-status', { state: 'ready', version: info.version });
    dialog.showMessageBox(win, {
      type: 'info',
      buttons: ['Restart now', 'Later'],
      defaultId: 0,
      title: 'Update ready',
      message: 'A new version (' + info.version + ') has been downloaded.',
      detail: 'Restart NIGHT BITES to install the update.',
    }).then((r) => { if (r.response === 0) autoUpdater.quitAndInstall(); });
  });
  autoUpdater.on('error', () => { /* stay silent: offline is normal */ });

  try { autoUpdater.checkForUpdates(); } catch (_) {}
  // re-check every 30 min while running
  setInterval(() => { try { autoUpdater.checkForUpdates(); } catch (_) {} }, 30 * 60 * 1000);
}

/* ------------------------------ IPC: app + printers ------------------------------ */
ipcMain.handle('app-version', () => app.getVersion());

ipcMain.handle('check-update', async () => {
  if (!app.isPackaged) return { ok: false, dev: true };
  try { const r = await autoUpdater.checkForUpdates(); return { ok: true, version: r && r.updateInfo && r.updateInfo.version }; }
  catch (e) { return { ok: false, error: String(e && e.message || e) }; }
});

// System printers = anything installed in Windows (USB with driver, or a network
// queue added by IP). These print via Chromium, so Arabic/Kurdish render perfectly.
ipcMain.handle('list-printers', async () => {
  try {
    if (!win) return [];
    const list = await win.webContents.getPrintersAsync();
    return list.map((p) => ({ name: p.name, displayName: p.displayName || p.name, status: p.status, isDefault: !!p.isDefault }));
  } catch { return []; }
});

// Network map: the PC's own IPv4 address(es), subnet, and the router/gateway —
// so the cashier can SEE the network before scanning.
ipcMain.handle('network-info', async () => {
  try {
    const nets = ipv4Interfaces();
    const gw = await defaultGateway();
    return { interfaces: nets, gateway: gw };
  } catch (e) { return { interfaces: [], gateway: null, error: String(e && e.message || e) }; }
});

// Quick reachability check for a single host:port (used by "Add manually" + Test).
ipcMain.handle('probe-printer', async (_e, payload) => {
  try {
    const host = String(payload && payload.host || '').trim();
    const port = parseInt(payload && payload.port, 10) || 9100;
    if (!host) return { ok: false };
    const ok = await probe(host, port, 1200);
    return { ok: !!ok };
  } catch { return { ok: false }; }
});

// Powerful scan: probe EVERY host on all local /24 subnet(s) on the given raw-ESC/POS
// port(s) — defaults to 9100, the standard port. Returns the IPs that answered — finds
// any network printer even if it isn't installed in Windows yet.
ipcMain.handle('scan-network-printers', async (_e, payload) => {
  const ports = (payload && Array.isArray(payload.ports) && payload.ports.length)
    ? payload.ports.map((p) => parseInt(p, 10)).filter(Boolean)
    : [9100];                                  // 9100 = the standard raw ESC/POS port (fast path)
  const hosts = subnetHosts();
  const targets = [];
  hosts.forEach((h) => ports.forEach((p) => targets.push({ host: h, port: p })));
  const hits = {};   // host -> smallest answering port
  // fire the whole /24 at once (254 sockets) with a short timeout: a live printer
  // answers in a few ms, dead hosts drop after the timeout → full scan in <1s.
  await pool(targets, 300, (t) => probe(t.host, t.port, 250).then((ok) => {
    if (ok && (hits[t.host] === undefined || t.port < hits[t.host])) hits[t.host] = t.port;
  }));
  const found = Object.keys(hits).map((host) => ({ host, port: hits[host] }));
  found.sort((a, b) => ipNum(a.host) - ipNum(b.host));
  return found;
});

// Print one ticket (HTML string). target = { kind:'system', device } OR
// { kind:'network', host, port }. Never throws — always resolves { ok }.
ipcMain.handle('print-ticket', async (_e, payload) => {
  try {
    const html = String(payload && payload.html || '');
    const target = (payload && payload.target) || {};
    const widthMm = (payload && payload.widthMm === 58) ? 58 : 80;
    const beep = !!(payload && payload.beep);   // buzzer only works on the raw-ESC/POS (network) path
    if (target.kind === 'network' && target.host) {
      return await printNetwork(html, String(target.host), parseInt(target.port, 10) || 9100, widthMm, beep);
    }
    return await printSystem(html, String(target.device || ''), widthMm);
  } catch (e) { return { ok: false, error: String(e && e.message || e) }; }
});

/* ---- system-printer path: silent Chromium print to a named Windows printer ---- */
function printSystem(html, device, widthMm) {
  return new Promise((resolve) => {
    let done = false; const finish = (v) => { if (!done) { done = true; resolve(v); } };
    const w = new BrowserWindow({ show: false, width: 380, height: 1000, webPreferences: { offscreen: false } });
    const kill = () => { try { w.close(); } catch (_) {} };
    w.webContents.once('did-finish-load', () => {
      setTimeout(() => {
        try {
          w.webContents.print({
            silent: true,
            printBackground: true,
            deviceName: device || undefined,
            margins: { marginType: 'none' },
            pageSize: { width: widthMm * 1000, height: 297000 }, // microns; height auto-trimmed by driver
          }, (ok) => { kill(); finish({ ok: !!ok }); });
        } catch (e) { kill(); finish({ ok: false, error: String(e && e.message || e) }); }
      }, 150);
    });
    w.webContents.once('did-fail-load', () => { kill(); finish({ ok: false }); });
    setTimeout(() => { kill(); finish({ ok: false, error: 'timeout' }); }, 15000);
    w.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
  });
}

/* ---- network-printer path: render → rasterize → ESC/POS over TCP:9100 ----
   Renders the same HTML to a bitmap and ships it as a raster image, so Arabic /
   Kurdish print correctly on any raw network thermal printer (no driver needed). */
async function printNetwork(html, host, port, widthMm, beep) {
  const dots = widthMm === 58 ? 384 : 576;   // printable dots: 58mm≈384, 80mm≈576
  let w = null;
  try {
    w = new BrowserWindow({
      show: false, useContentSize: true, width: dots, height: 200,
      paintWhenInitiallyHidden: true,
      webPreferences: { offscreen: false, backgroundThrottling: false },
    });
    await withTimeout(loadData(w, html), 8000, 'load timeout');
    await wait(160);
    let h = await w.webContents.executeJavaScript('Math.ceil(document.body.getBoundingClientRect().height)').catch(() => 800);
    h = Math.max(1, Math.min(Math.round(h) || 800, 20000));
    w.setContentSize(dots, h);
    await wait(80);
    let img = await withTimeout(w.webContents.capturePage(), 8000, 'capture timeout');
    // Normalise to exactly `dots` pixels wide so HiDPI display scaling (125/150%)
    // can't skew the raster stride or clip the right edge — was garbling tickets.
    img = img.resize({ width: dots });
    const size = img.getSize();
    const bmp = img.toBitmap();               // BGRA
    const realW = size.height ? Math.round((bmp.length / 4) / size.height) : size.width;
    const payload = rasterEscpos(bmp, realW, size.height, beep);
    try { w.close(); } catch (_) {} w = null;
    return await sendTcp(host, port, payload);
  } catch (e) {
    if (w) { try { w.close(); } catch (_) {} }
    return { ok: false, error: String(e && e.message || e) };
  }
}

function loadData(w, html) {
  return new Promise((resolve, reject) => {
    w.webContents.once('did-finish-load', resolve);
    w.webContents.once('did-fail-load', () => reject(new Error('load fail')));
    w.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
  });
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
// Hard watchdog so a wedged render can never hang the print or leak the window.
function withTimeout(p, ms, msg) {
  return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(msg || 'timeout')), ms))]);
}

// BGRA bitmap → ESC/POS raster (banded so we never overflow the printer buffer).
function rasterEscpos(bmp, width, height, beep) {
  const W = Math.min(width, 576);
  const bytesPerRow = Math.ceil(W / 8);
  const chunks = [Buffer.from([0x1B, 0x40])]; // ESC @  (init)
  const BAND = 128;
  for (let y0 = 0; y0 < height; y0 += BAND) {
    const rows = Math.min(BAND, height - y0);
    const data = Buffer.alloc(bytesPerRow * rows, 0);
    for (let y = 0; y < rows; y++) {
      const srcY = y0 + y;
      for (let x = 0; x < W; x++) {
        const i = (srcY * width + x) * 4;
        const b = bmp[i], g = bmp[i + 1], r = bmp[i + 2], a = bmp[i + 3];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const eff = lum * (a / 255) + 255 * (1 - a / 255); // composite over white
        if (eff < 128) data[y * bytesPerRow + (x >> 3)] |= (0x80 >> (x & 7));
      }
    }
    const xL = bytesPerRow & 0xff, xH = (bytesPerRow >> 8) & 0xff;
    const yL = rows & 0xff, yH = (rows >> 8) & 0xff;
    chunks.push(Buffer.from([0x1D, 0x76, 0x30, 0x00, xL, xH, yL, yH]));
    chunks.push(data);
  }
  // Xprinter buzzer (models with a physical beeper): ESC B n t — n beeps of t×50ms.
  // Harmless on printers that don't support it; gated by the "Beep on print" setting.
  if (beep) chunks.push(Buffer.from([0x1B, 0x42, 0x02, 0x03]));  // 2 beeps
  chunks.push(Buffer.from([0x0A, 0x0A, 0x0A, 0x0A]));      // feed
  chunks.push(Buffer.from([0x1D, 0x56, 0x42, 0x00]));      // GS V B 0 — partial cut
  return Buffer.concat(chunks);
}

function sendTcp(host, port, buf) {
  return new Promise((resolve) => {
    let done = false; const finish = (v) => { if (!done) { done = true; resolve(v); } };
    const s = net.connect({ host, port, timeout: 6000 }, () => { s.write(buf, () => s.end()); });
    s.on('close', () => finish({ ok: true }));
    s.on('error', (e) => { try { s.destroy(); } catch (_) {} finish({ ok: false, error: String(e && e.message || e) }); });
    s.on('timeout', () => { try { s.destroy(); } catch (_) {} finish({ ok: false, error: 'timeout' }); });
  });
}

/* ---- subnet discovery helpers ---- */
function ipNum(ip) { return ip.split('.').reduce((s, n, i) => s + (parseInt(n, 10) || 0) * Math.pow(256, 3 - i), 0); }
function intToIp(n) { n = n >>> 0; return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); }
function prefixFromMask(mask) {
  try { return mask.split('.').reduce((s, o) => s + ((parseInt(o, 10) || 0).toString(2).match(/1/g) || []).length, 0); }
  catch { return 24; }
}
// The PC's own IPv4 addresses, with subnet + the likely router (network+1).
function ipv4Interfaces() {
  const out = [];
  const ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach((name) => {
    (ifaces[name] || []).forEach((ni) => {
      if (ni && ni.family === 'IPv4' && !ni.internal && ni.address && ni.netmask) {
        const net = (ipNum(ni.address) & ipNum(ni.netmask)) >>> 0;
        out.push({ name, ip: ni.address, netmask: ni.netmask, cidr: prefixFromMask(ni.netmask),
          network: intToIp(net), guessGateway: intToIp(net + 1) });
      }
    });
  });
  return out;
}
// Best-effort default gateway via the OS routing table (never throws).
function defaultGateway() {
  return new Promise((resolve) => {
    try {
      const cp = require('child_process');
      const isWin = process.platform === 'win32';
      const cmd = isWin ? 'ipconfig' : 'ip route';
      cp.exec(cmd, { timeout: 3000, windowsHide: true }, (err, stdout) => {
        if (err || !stdout) return resolve(null);
        let gw = null;
        if (isWin) { const m = stdout.match(/Default Gateway[ .]*:\s*([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/i); if (m) gw = m[1]; }
        else { const m = stdout.match(/default via ([0-9.]+)/); if (m) gw = m[1]; }
        resolve(gw);
      });
    } catch { resolve(null); }
  });
}
function subnetHosts() {
  const out = [];
  const seen = new Set();
  const ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach((name) => {
    (ifaces[name] || []).forEach((ni) => {
      if (ni && ni.family === 'IPv4' && !ni.internal) {
        const parts = ni.address.split('.');
        if (parts.length === 4) {
          const base = parts[0] + '.' + parts[1] + '.' + parts[2] + '.';
          if (!seen.has(base)) {
            seen.add(base);
            for (let i = 1; i <= 254; i++) if (parts[3] !== String(i)) out.push(base + i);
          }
        }
      }
    });
  });
  return out;
}
function probe(host, port, timeout) {
  return new Promise((resolve) => {
    let done = false; const fin = (v) => { if (!done) { done = true; try { s.destroy(); } catch (_) {} resolve(v); } };
    const s = net.connect({ host, port, timeout });
    s.on('connect', () => fin(true));
    s.on('timeout', () => fin(false));
    s.on('error', () => fin(false));
  });
}
// run `worker` over `items` with at most `size` in flight
function pool(items, size, worker) {
  return new Promise((resolve) => {
    let i = 0, active = 0, finished = 0; const n = items.length;
    if (!n) return resolve();
    const next = () => {
      while (active < size && i < n) {
        const item = items[i++]; active++;
        Promise.resolve(worker(item)).catch(() => {}).then(() => {
          active--; finished++;
          if (finished >= n) resolve(); else next();
        });
      }
    };
    next();
  });
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
// If startup fails (e.g. userData is unwritable / disk full so the server can't boot),
// show the operator a clear error instead of leaving an invisible, window-less process
// running that only Task Manager can kill.
app.whenReady().then(start).catch((e) => {
  try { dialog.showErrorBox('NIGHT BITES failed to start', String((e && e.stack) || (e && e.message) || e)); } catch (_) {}
  app.quit();
});
app.on('window-all-closed', () => { if (serverInfo && serverInfo.server) try { serverInfo.server.close(); } catch (_) {}; app.quit(); });
