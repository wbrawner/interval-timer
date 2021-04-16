self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('wbrawner-interval-timer').then(function(cache) {
     return cache.addAll([
        '/',
        '/audio/cool.mp3',
        '/audio/high.mp3',
        '/audio/low.mp3',
        '/audio/rest.mp3',
        '/audio/warm.mp3',
        '/browserconfig.xml',
        '/css/styles.css',
        '/favicon.ico',
        '/img/action-icon-android.png',
        '/img/action-icon-ios6.png',
        '/img/action-icon-ios7.png',
        '/img/android-chrome-144x144.png',
        '/img/android-chrome-192x192.png',
        '/img/android-chrome-256x256.png',
        '/img/android-chrome-36x36.png',
        '/img/android-chrome-384x384.png',
        '/img/android-chrome-48x48.png',
        '/img/android-chrome-512x512.png',
        '/img/android-chrome-72x72.png',
        '/img/android-chrome-96x96.png',
        '/img/apple-touch-icon-114x114.png',
        '/img/apple-touch-icon-114x114-precomposed.png',
        '/img/apple-touch-icon-120x120.png',
        '/img/apple-touch-icon-120x120-precomposed.png',
        '/img/apple-touch-icon-144x144.png',
        '/img/apple-touch-icon-144x144-precomposed.png',
        '/img/apple-touch-icon-152x152.png',
        '/img/apple-touch-icon-152x152-precomposed.png',
        '/img/apple-touch-icon-180x180.png',
        '/img/apple-touch-icon-180x180-precomposed.png',
        '/img/apple-touch-icon-57x57.png',
        '/img/apple-touch-icon-57x57-precomposed.png',
        '/img/apple-touch-icon-60x60.png',
        '/img/apple-touch-icon-60x60-precomposed.png',
        '/img/apple-touch-icon-72x72.png',
        '/img/apple-touch-icon-72x72-precomposed.png',
        '/img/apple-touch-icon-76x76.png',
        '/img/apple-touch-icon-76x76-precomposed.png',
        '/img/apple-touch-icon.png',
        '/img/apple-touch-icon-precomposed.png',
        '/img/browserconfig.xml',
        '/img/favicon-16x16.png',
        '/img/favicon-194x194.png',
        '/img/favicon-32x32.png',
        '/img/favicon.ico',
        '/img/favicons.zip',
        '/img/icon-152x152.png',
        '/img/icon-16x16.png',
        '/img/icon-196x196.png',
        '/img/icon.svg',
        '/img/manifest.json',
        '/img/menu-branding.png',
        '/img/menu-logo.png',
        '/img/mstile-144x144.png',
        '/img/mstile-150x150.png',
        '/img/mstile-310x310.png',
        '/img/mstile-70x70.png',
        '/img/safari-pinned-tab.svg',
        '/img/spinner.png',
        '/index.html',
        '/js/app.js',
        '/js/start.js',
        '/manifest.json',
        '/sw.js'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
 event.respondWith(
     caches.match(event.request).then(function(response) {
         caches.open('wbrawner-interval-timer').then(function(cache) {
             if (event.request.url.match(/^https?/)) {
                cache.add(event.request.url);
             }
         })
         return response || fetch(event.request);
     })
  );
});
