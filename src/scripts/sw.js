/* eslint-disable no-restricted-globals */
import 'regenerator-runtime/runtime';
import {
  precacheAndRoute
} from 'workbox-precaching/precacheAndRoute';
import {
  cleanupOutdatedCaches
} from 'workbox-precaching';
import {
  registerRoute
} from 'workbox-routing/registerRoute';
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst
} from 'workbox-strategies';
import {
  ExpirationPlugin
} from 'workbox-expiration';
import {
  clientsClaim,
  setCacheNameDetails
} from 'workbox-core';


clientsClaim();

setCacheNameDetails({
  prefix: 'insieme-app',
  precache: 'precache',
  runtime: 'runtime',
});

precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/.*/],
});

registerRoute(
  /^https:\/\/restaurant-api\.dicoding\.dev\/(?:(list|detail))/,
  new NetworkFirst({
    cacheName: 'dicoding-restaurant-api',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 * 2,
        maxEntries: 100,
      }),
    ],
  }),
);

registerRoute(
  ({
    request
  }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'cache-images',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
        maxEntries: 50,
      }),
    ],
  }),
);

registerRoute(
  ({
    url
  }) =>
  url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'my-google-fonts-cache',
    // Don't cache more than 50 items
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  }),
);

registerRoute(
  new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.css'),
  new CacheFirst({
    cacheName: 'icon-font-awesome',
  }),
);

registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: 'my-assets-cache',
  }),
);

cleanupOutdatedCaches();
