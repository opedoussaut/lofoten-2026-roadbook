# GitHub-only storage architecture

The roadbook no longer uses Google Drive, Google Sheets, OAuth or Apps Script.

## Repositories

- Public application: `opedoussaut/lofoten-2026-roadbook`
- Private trip data: `opedoussaut/lofoten-2026-data`

## Browser behavior

1. Every change is written immediately to the browser's local cache.
2. The roadbook marks the local state as pending.
3. When GitHub is unlocked and the network is available, changes are sent sequentially to the private repository.
4. A complete recovery snapshot is written to `backups/latest.json`.
5. The application remains usable offline; unsynchronized changes remain on the current device.

## Authentication

Create a fine-grained personal access token restricted to `opedoussaut/lofoten-2026-data` with repository permission:

- Contents: Read and write

Enter it in the roadbook's **Sauvegarde** tab. When “remember on this device” is enabled, the token is encrypted locally with AES-GCM using a PIN-derived key. The clear token is never committed to either repository.

## Synchronized files

- `trip/current.json`
- `trip/plan.json`
- `trip/hikes.json`
- `trip/van.json`
- `journal/entries.json`
- `expenses/expenses.json`
- `gps/track.geojson`
- `backups/latest.json`
- `sync/manifest.json`

## First migration

On the device containing the current roadbook data:

1. Open **Sauvegarde**.
2. Connect the restricted GitHub token.
3. Press **Synchroniser maintenant** before using **Charger depuis GitHub** on another device.

## Recovery

- Use **Charger depuis GitHub** to restore the most recent remote state.
- Use **Télécharger une sauvegarde** for an additional local JSON export.
- GitHub commit history provides previous versions of every synchronized file.

The private data repository must never be made public because it may contain journal entries, expenses and GPS positions.
