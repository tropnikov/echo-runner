/// <reference lib="webworker" />

const CACHE_NAME = 'echo-runner-cache-v1';
const API_CACHE_NAME = 'echo-runner-api-cache-v2';
const API_ENDPOINTS = ['/auth/user'];

const URLS = ['/index.html', '/', '/topics', '/signin', '/signup', '/profile', '/leaderboard', '/game', '/error'];

self.addEventListener('install', ((event: ExtendableEvent) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Opened static cache:', CACHE_NAME);
        return cache.addAll(URLS);
      }),
      caches.open(API_CACHE_NAME).then((cache) => {
        console.log('Opened API cache:', API_CACHE_NAME);
        return cache;
      }),
    ]).catch((err) => {
      console.log('Install error:', err);
      throw err;
    }),
  );
}) as EventListener);

self.addEventListener('activate', ((event: ExtendableEvent) => {
  console.log('activate');
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        console.log('activate:', cacheNames);
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== API_CACHE_NAME)
            .map((name) => {
              caches.delete(name);
              console.log('delete cache', name);
            }),
        );
      })
      .then(() => (self as unknown as ServiceWorkerGlobalScope).clients.claim()),
  );
}) as EventListener);

self.addEventListener('fetch', ((event: FetchEvent) => {
  if (isApiRequest(event.request.url)) {
    event.respondWith(handleApiRequest(event));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('response found in cache');
        return response;
      }

      const fetchRequest = event.request.clone();
      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          console.log('failed response');
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          console.log('put into cache');
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    }),
  );
}) as EventListener);

function isApiRequest(url: string): boolean {
  try {
    const urlObj = new URL(url);

    const isApi = API_ENDPOINTS.some((endpoint) => {
      const fullApiPath = '/api/v2' + endpoint;
      const match = urlObj.pathname === fullApiPath || urlObj.pathname.endsWith(endpoint);
      return match;
    });

    return isApi;
  } catch (error) {
    console.log('isApiRequest error:', error);
    return false;
  }
}

function handleApiRequest(event: FetchEvent): Promise<Response> {
  return caches.open(API_CACHE_NAME).then((cache) => {
    return cache.match(event.request).then((response) => {
      if (response) {
        console.log('API response found in cache, returning cached version');
        return response;
      }

      console.log('No cached response found, making network request');
      // Если в кэше нет, делаем запрос
      const fetchRequest = event.request.clone();
      return fetch(fetchRequest)
        .then((response) => {
          console.log('Network response received, status:', response.status);
          // Кэшируем только успешные ответы
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            cache.put(event.request, responseToCache).then(() => {
              console.log('API response cached successfully');
            });
          } else {
            console.log('Response not cached due to status:', response.status);
          }
          return response;
        })
        .catch((error) => {
          console.log('Network request failed:', error, 'trying cache fallback');
          // Если запрос не удался, пробуем найти в кэше еще раз
          return cache.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              console.log('Returning cached API response after network failure');
              return cachedResponse;
            }
            console.log('No cached fallback available');
            throw error;
          });
        });
    });
  });
}

self.addEventListener('message', (event: MessageEvent) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    (self as unknown as ServiceWorkerGlobalScope).skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_API_CACHE') {
    console.log('Clearing API cache...');
    caches.delete(API_CACHE_NAME).then(() => {
      console.log('API cache cleared');
    });
  }
});
