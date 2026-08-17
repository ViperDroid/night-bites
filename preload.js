'use strict';
const { contextBridge, ipcRenderer } = require('electron');

// Bridge exposed to the web UI. Everything the page can't do itself (talk to
// printers, read the app version, receive update popups) goes through here.
contextBridge.exposeInMainWorld('nb', {
  isDesktop: true,
  version: () => ipcRenderer.invoke('app-version'),
  checkUpdate: () => ipcRenderer.invoke('check-update'),
  listPrinters: () => ipcRenderer.invoke('list-printers'),
  printTicket: (html, device, widthMm) => ipcRenderer.invoke('print-ticket', { html: html, device: device, widthMm: widthMm }),
  onUpdate: (cb) => ipcRenderer.on('update-status', (_e, data) => cb(data)),
});
