const CACHE_PREFIX='memory-game-';
const CACHE_NAME=CACHE_PREFIX+'2026-09-29-v1';
const CORE=['./index.html','./ag-language-menu.js','./pwa.js','./manifest.webmanifest','./icon.svg','./memory-game-cover.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function networkFirst(request){return fetch(request).then(async r=>{if(r&&r.ok){const c=await caches.open(CACHE_NAME);await c.put(request,r.clone());}return r;}).catch(()=>caches.match(request));}
function navigationNetworkFirst(request){return fetch(request).then(async r=>{if(r&&r.ok){const c=await caches.open(CACHE_NAME);await c.put('./index.html',r.clone());}return r;}).catch(()=>caches.match('./index.html'));}
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;if(r.mode==='navigate'){e.respondWith(navigationNetworkFirst(r));return;}if(r.destination==='script'||r.destination==='manifest'){e.respondWith(networkFirst(r));return;}e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(async response=>{if(response&&response.ok){const c=await caches.open(CACHE_NAME);await c.put(r,response.clone());}return response;})));});
