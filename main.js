'use strict';
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
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

ipcMain.handle('list-printers', async () => {
  try {
    if (!win) return [];
    const list = await win.webContents.getPrintersAsync();
    return list.map((p) => ({ name: p.name, displayName: p.displayName || p.name, status: p.status, isDefault: !!p.isDefault }));
  } catch { return []; }
});

// Print one ticket (HTML string) silently to a named printer. widthMm = 58 or 80.
ipcMain.handle('print-ticket', async (_e, payload) => {
  const html = String(payload && payload.html || '');
  const device = String(payload && payload.device || '');
  const widthMm = (payload && payload.widthMm === 58) ? 58 : 80;
  return new Promise((resolve) => {
    const w = new BrowserWindow({ show: false, width: 380, height: 1000, webPreferences: { offscreen: false } });
    w.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
    w.webContents.once('did-finish-load', () => {
      setTimeout(() => {
        w.webContents.print({
          silent: true,
          printBackground: true,
          deviceName: device || undefined,
          margins: { marginType: 'none' },
          pageSize: { width: widthMm * 1000, height: 297000 }, // microns; height auto-trimmed by driver
        }, (ok) => { try { w.close(); } catch (_) {} resolve({ ok: !!ok }); });
      }, 120);
    });
    w.webContents.once('did-fail-load', () => { try { w.close(); } catch (_) {} resolve({ ok: false }); });
  });
});

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(start);
app.on('window-all-closed', () => { if (serverInfo && serverInfo.server) try { serverInfo.server.close(); } catch (_) {}; app.quit(); });
