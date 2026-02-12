# Deployment & DevOps Lead

## 🎯 תפקיד
ניהול ה-build process, deployment, וכל מה שקשור ל-infrastructure של הפרויקט.

## 📁 תחומי אחריות
- `package.json` - dependencies ו-scripts
- `vite.config.ts` - build configuration
- `tsconfig.json` - TypeScript config
- `.env.local` - environment variables
- תהליך ה-deployment

## 🛠️ Stack טכנולוגי
- **Vite** - Build tool
- **TypeScript** - Type checking
- **Vercel/Netlify** - Deployment platform (משוער)

## 📋 Scripts זמינים
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## ✅ משימות שגרתיות
1. עדכון dependencies
2. ניהול environment variables
3. בדיקת build עובד ללא שגיאות
4. ניהול deployments

## 🚀 תהליך Deployment

### Pre-deployment
```bash
npm ci              # Clean install
npm run build       # Build for production
npm run preview     # Test locally
```

### Environment Variables
וודא שקיימים:
- `GEMINI_API_KEY` - ל-AI features

## 🔧 Configuration Files

### Vite Config Checks
- [ ] Base URL מוגדר נכון
- [ ] Build optimization מופעל
- [ ] Source maps ל-production (אופציונלי)

### TypeScript Checks
```bash
npx tsc --noEmit
```

## 🌐 Deployment Options

### Option 1: Vercel (מומלץ ל-React)
- Connect GitHub repo
- Build command: `npm run build`
- Output directory: `dist`

### Option 2: Netlify
- Connect GitHub repo
- Build command: `npm run build`
- Publish directory: `dist`

### Option 3: Static Hosting
```bash
npm run build
# Upload dist/ folder to hosting
```

## 📊 Monitoring
- [ ] Build time
- [ ] Bundle size
- [ ] Error logs
- [ ] Uptime monitoring (אם רלוונטי)

## 🔒 Security
- [ ] API keys לא נשמרות ב-git
- [ ] `.env.local` ב-.gitignore
- [ ] No sensitive data בלוגים
