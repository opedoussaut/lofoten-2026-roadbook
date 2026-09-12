const CACHE = 'lofoten-2026-final-1';
const VERSION = '2026-final-1';
const CORE = ['./', './index.html', `roadbook-final.css?v=${VERSION}`, `roadbook-final.js?v=${VERSION}`, `journal-en.json?v=${VERSION}`, `route-plans-en.json?v=${VERSION}`, `expenses-current.json?v=${VERSION}`, `expense-labels-en.json?v=${VERSION}`, `manifest.webmanifest?v=${VERSION}`, 'assets/crew-hero.webp'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('lofoten-2026-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith(fetch(request, {cache:'no-store'}).then(response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy)));
    }
    return response;
  }).catch(async () => (await caches.match(request)) || (request.mode === 'navigate' ? await caches.match('./index.html') : undefined) || Response.error()));
});
