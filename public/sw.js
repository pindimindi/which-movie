let cacheName = "wich-movie";

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache =>
        cache.addAll([
          "/static/js/bundle.js",
          "/index.html",
          "/",
          "semantic.min.css",
          "style.css"
        ])
      )
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;

      let fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(function(fetchResponse) {
        if (fetchResponse || fetchResponse.status !== 0) return fetchResponse;

        let responseToCache = fetchResponse.clone();

        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return fetchResponse;
      });
    })
  );
});
