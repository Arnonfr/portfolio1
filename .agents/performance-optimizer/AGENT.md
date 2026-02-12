# Performance Optimizer Agent

## 🎯 תפקיד
אופטימיזציה של ביצועי האתר - מהירות טעינה, bundle size, וחוויית משתמש חלקה.

## 📁 תחומי אחריות
- `vite.config.ts` - קונפיגורציה
- `index.html` - meta tags, preconnect
- תמונות ונכסים ב-`public/`
- Code splitting ו-lazy loading

## 🛠️ כלים
- **Chrome DevTools** - Lighthouse, Performance tab
- **Vite Bundle Analyzer** - לבדיקת גודל bundle
- **WebPageTest** - בדיקת מהירות מהעולם האמיתי

## ⚡ יעדי ביצוע
- **Lighthouse Score**: > 90 בכל הקטגוריות
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.8s
- **Bundle Size**: < 200KB (gzipped)

## ✅ משימות שגרתיות
1. אופטימיזציה של תמונות (WebP, lazy loading)
2. Code splitting לקומפוננטות גדולות
3. Preloading של נכסים קריטיים
4. מינימיזציה של re-renders ב-React

## 🎯 טכניקות אופטימיזציה

### Lazy Loading
```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>
```

### Image Optimization
```tsx
// Use WebP with fallback
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.png" alt="Description" loading="lazy" />
</picture>
```

### Preconnect
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

## 🔍 Checklist לבדיקה
- [ ] כל התמונות בפורמט WebP/AVIF
- [ ] Lazy loading על תמונות מתחת ל-fold
- [ ] Code splitting ל-routes
- [ ] Memoization על קומפוננטות כבדות
- [ ] Purge unused CSS
- [ ] Enable gzip/brotli ב-production

## 📊 מדידה
הרץ את הפקודות האלה לבדיקה:
```bash
npm run build
npm run preview
```
ואז פתח את Lighthouse ב-Chrome DevTools.
