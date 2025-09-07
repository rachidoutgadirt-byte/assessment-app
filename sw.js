const CACHE_NAME = 'Assessment-app';
const URLS_TO_CACHE = [
  '/', // يمثل الصفحة الرئيسية
  '/index.html' // اسم ملف HTML الرئيسي الخاص بك
];

// عند التثبيت، قم بتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// عند طلب أي ملف، حاول إحضاره من الشبكة أولاً، وإذا فشل، أحضره من الكاش
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
