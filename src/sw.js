///<reference types="types-serviceworker" />
///<reference types="types-serviceworker/lib/workbox" />
//@ts-check
/* eslint no-restricted-globals: 1, no-undef: 0, no-useless-escape: 0 */

// to prevent errors due to create-react-app preventing isolated modules

//@ts-ignore
const precacheManifest = self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.precacheAndRoute(precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html", {
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

/**
 * STEP 3: Cache the images
 */
workbox.routing.registerRoute(
  new RegExp('https://.*giphy.com/.*\.gif'),
  // Custom Strategy
  // Cache First or Network: will do cache,
  // and if it fails it will fallback to network
  // without storing the response in the cache
  async ({ event }) => {
    const cache = await caches.open('favorites-cache');
    const response = await cache.match(event.request);
    return response || fetch(event.request);
  }
);
