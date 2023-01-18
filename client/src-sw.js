const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
	cacheName: 'page-cache',
	plugins: [
		new CacheableResponsePlugin({
			statuses: [0, 200],
		}),
		new ExpirationPlugin({
			maxAgeSeconds: 30 * 24 * 60 * 60,
		}),
	],
});

warmStrategyCache({
	urls: ['/index.html', '/'],
	strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

registerRoute(
	({ request }) => request.destination === 'images',

	// sets cache first strategy for images
	new CacheFirst({
		cacheName: 'image-cache',
		plugins: [
			// plugin added for cacheable responses
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				// sets expiration for 30 days hence
				maxAgeSeconds: 30 * 24 * 60 * 60,
			}),
		],
	})
);
