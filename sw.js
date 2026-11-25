/* TWS Liquid Chef — service worker
   Pages, CSS & JS: network first (your edits show up right away), cached copy if the
   network is slow (>3s) or offline. Photos & fonts: served from cache, refreshed in the background.
   Videos are never cached (too large). Bump VERSION to clear old caches. */
const VERSION = "tws-v1";
const CORE = [
  "./", "index.html", "about.html", "services.html", "menu.html", "packages.html", "gallery.html",
  "reviews.html", "faqs.html", "investors.html", "contact.html",
  "css/style.css", "js/data.js", "js/site.js", "favicon.svg", "manifest.webmanifest"
];
const MAX_MEDIA = 40; // cross-origin entries are padded in storage accounting, keep this modest

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (!k.startsWith(VERSION)) await caches.delete(k);
    await self.clients.claim();
  })());
});

const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms));

async function networkFirst(req) {
  const cache = await caches.open(VERSION);
  const net = fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; });
  try {
    return await Promise.race([net, timeout(3000)]);
  } catch {
    const hit = await cache.match(req, { ignoreSearch: req.mode === "navigate" });
    return hit || net; // nothing cached yet: keep waiting for the network
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(VERSION + "-media");
  const hit = await cache.match(req);
  const net = fetch(req).then(async (res) => {
    if (res.ok || res.type === "opaque") {
      try {
        await cache.put(req, res.clone());
        const keys = await cache.keys();
        for (let i = 0; i < keys.length - MAX_MEDIA; i++) await cache.delete(keys[i]);
      } catch { /* storage full: just serve from network */ }
    }
    return res;
  }).catch(() => hit);
  return hit || net;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname.endsWith("mixkit.co") || req.headers.has("range")) return; // video: straight to network
  if (url.origin === location.origin) return e.respondWith(networkFirst(req));
  if (url.hostname === "images.unsplash.com" || url.hostname.endsWith("gstatic.com") || url.hostname === "fonts.googleapis.com" || url.hostname === "unpkg.com") {
    e.respondWith(staleWhileRevalidate(req));
  }
});
