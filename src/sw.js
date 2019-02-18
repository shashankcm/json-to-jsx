importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/favicon.ico',
       '/index.ejs',
       '/index.js',
       '/styles/about-page.css',
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open('airhorner')
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
                
              return response;
            }
          );
        })
      );

   });
