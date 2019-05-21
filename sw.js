importScripts('/cache-polyfill.js');

const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    '/index.html',
    '/bundle.css',
    '/bundle.js',
    '/global.css',
    '/favicon.png',
    '/manifest.json'
];

self.addEventListener('install', event => {
    console.log('Service Worker Install Event');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker (sw.js) Activated');
}
);

self.addEventListener('fetch', event => {
    // console.log('fetch intercepted for: ', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
        .catch(error => {
            console.log('cachedResponse Oh Oh: ', error);
        })
    );
});
