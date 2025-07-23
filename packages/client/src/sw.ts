const CACHE_NAME = 'echo-runner-cache-v1';

const URLS = ['/index.html', '/topics', '/signin', '/signup', '/profile', '/leaderboard', '/game', '/error'];

self.addEventListener('install', ((event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      }),
  );
}) as EventListener);

self.addEventListener('activate', ((event: ExtendableEvent) => {
  console.log('activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log('activate:', cacheNames);
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            caches.delete(name);
            console.log('delete cache', name);
          }),
      );
    }),
  );
}) as EventListener);

self.addEventListener('fetch', ((event: FetchEvent) => {
  event.respondWith(
    // Пытаемся найти ответ на такой запрос в кеше
    caches.match(event.request).then((response) => {
      // Если ответ найден, выдаём его
      if (response) {
        console.log('response found in cache');
        return response;
      }

      const fetchRequest = event.request.clone();
      // В противном случае делаем запрос на сервер
      return (
        fetch(fetchRequest)
          // Можно задавать дополнительные параметры запроса, если ответ вернулся некорректный.
          .then((response) => {
            // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш
            if (!response || response.status !== 200 || response.type !== 'basic') {
              console.log('failed response');
              return response;
            }

            const responseToCache = response.clone();
            // Получаем доступ к кешу по CACHE_NAME
            caches.open(CACHE_NAME).then((cache) => {
              // Записываем в кеш ответ, используя в качестве ключа запрос
              console.log('put into cache');
              cache.put(event.request, responseToCache);
            });
            // Отдаём в основной поток ответ
            return response;
          })
      );
    }),
  );
}) as EventListener);
