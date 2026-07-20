const CACHE='lofoten-2026-v9';
const CORE=['./','index.html','styles.css?v=9','enhancements.css?v=9','app.js?v=9','config.js?v=9','apps-script-client.js?v=9','enhancements.js?v=9','manifest.webmanifest?v=9'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),
    self.clients.claim()
  ]));
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  const isAppAsset=url.origin===self.location.origin;
  if(request.mode==='navigate'||isAppAsset){
    event.respondWith(fetch(request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(request,copy));
      return response;
    }).catch(()=>caches.match(request).then(hit=>hit||caches.match('index.html'))));
    return;
  }
  event.respondWith(caches.match(request).then(hit=>hit||fetch(request)));
});