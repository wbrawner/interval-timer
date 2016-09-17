self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('wbrawner-interval-timer').then(function(cache) {
     return cache.addAll([
       '/',
       '/audio/beep-10.mp3',
       '/audio/beep-09.mp3',
       '/audio/button-42(1).mp3',
       '/css/addtohomescreen.css',
       '/css/font-awesome.min.css',
       '/css/styles.css',
       '/fonts/fontawesome-webfont.woff',
       '/fonts/FontAwesome.otf',
       '/fonts/fontawesome-webfont.svg',
       '/fonts/fontawesome-webfont.woff2',
       '/fonts/fontawesome-webfont.ttf',
       '/fonts/fontawesome-webfont.eot',
       '/index.html',
       '/js/start.js',
       '/js/angular-cookies.min.js',
       '/js/addtohomescreen.min.js',
       '/js/addtohomescreen.js',
       '/js/angular.min.js',
       '/js/app.js',
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
