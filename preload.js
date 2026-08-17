'use strict';
const { contextBridge, ipcRenderer } = require('electron');

// Bridge exposed to the web UI. Everything the page can't do itself (talk to
// printers, scan the network, read the app version, receive update popups) goes
// through here. contextIsolation keeps the page sandboxed from Node.
contextBridge.exposeInMainWorld('nb', {
  isDesktop: true,
  version: () => ipcRenderer.invoke('app-version'),
  checkUpdate: () => ipcRenderer.invoke('check-update'),
  listPrinters: () => ipcRenderer.invoke('list-printers'),
  networkInfo: () => ipcRenderer.invoke('network-info'),
  scanNetwork: (ports) => ipcRenderer.invoke('scan-network-printers', { ports: ports }),
  probePrinter: (host, port) => ipcRenderer.invoke('probe-printer', { host: host, port: port }),
  // target = { kind:'system', device } | { kind:'network', host, port }
  printTicket: (html, target, widthMm) => ipcRenderer.invoke('print-ticket', { html: html, target: target, widthMm: widthMm }),
  onUpdate: (cb) => ipcRenderer.on('update-status', (_e, data) => cb(data)),
});
