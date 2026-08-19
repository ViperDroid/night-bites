# NIGHT BITES — Offline POS

Windows desktop point-of-sale for **NIGHT BITES** (Kurdish / Arabic / English, RTL/LTR).
Offline-first (local JSON data), silent multi-printer support (customer + kitchen zones),
and automatic updates.

- Built with Electron. The Windows `.exe` is produced by GitHub Actions (`.github/workflows/build.yml`):
  every push to `main` uploads a build artifact, and pushing a `v*` tag publishes a durable GitHub Release
  (installer + `latest.yml` + `blockmap`).
- Auto-update: the app checks `lightstudio.space/bite-burger/updates/` every 30 min. For updates to actually
  reach machines, that URL must serve the release's `latest.yml` + `.exe` + `.blockmap` (host the files there,
  or switch the `publish` provider in `package.json` to `github` so the app polls the GitHub Release directly).
- Login: `admin` / `admin`.
