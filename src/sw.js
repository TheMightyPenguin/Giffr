workbox.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.routing.registerNavigationRoute("/index.html", {
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

workbox.LOG_LEVEL = 'debug';

workbox.routing.registerRoute(
  new RegExp('https://.*giphy.com/.*\.gif'),
  // Custom Strategy
  // Cache First or Network: will do cache,
  // and if it fails it will fallback to network
  // without storing the response in the cache
  async ({ url, event, params }) => {
    try {
      const myCache = await caches.open('favorites-cache');
      const response = await myCache.match(event.request);
      return response || fetch(event.request);
    } catch(e) {
      return fetch(event.request);
    }
  }
);
