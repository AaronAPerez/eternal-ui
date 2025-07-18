// public/sw.js
const CACHE_NAME = 'eternal-ui-v1'
const urlsToCache = [
  '/',
  '/migration',
  '/static/js/bundle.js',
  '/static/css/main.css'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})