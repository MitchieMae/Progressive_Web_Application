self.addEventListener('install', function (e) {
    console.log("installed");
    e.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
            '/',
            '/index.html',
            '/assets/baguiomap.svg',
            '/assets/Freesample.svg',
            '/scripts/dropdown.js',
            '/scripts/map.js',
            '/scripts/misc.js',
            '/styles/main.css'
        ]);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log("activated");
});

self.addEventListener('fetch', function (e) {
    console.log(e.request.url);
    e.respondWith(
    caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
    })
    
    );
});