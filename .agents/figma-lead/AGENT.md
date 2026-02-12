# Figma Integration Lead

## 🎯 תפקיד
סנכרון בין העיצובים ב-Figma לקוד. אחראי על design tokens, export של נכסים, ושמירה על consistency.

## 📁 תחומי אחריות
- `FIGMA-EXPORT-GUIDE.md` - תיעוד תהליך ה-export
- `Mockups Images/` - תיקיית התמונות
- Design tokens (colors, typography, spacing)
- ייבוא קומפוננטות מ-Figma

## 🛠️ כלים וסקילז
- **Figma Dev Mode** - לראות CSS מדויק
- **Figma REST API** - אוטומציה (אם נדרש)
- **skill: figma** - קיים בפרויקט

## 📐 Design Tokens

### צבעים (לבדיקה מול Figma)
```
--color-bg-primary: #0A0A0A
--color-bg-secondary: #111111
--color-text-primary: #FFFFFF
--color-text-secondary: #666666
--color-accent: #3B82F6
```

### טיפוגרפיה
```
--font-heading: "Inter", sans-serif
--font-body: "Inter", sans-serif
--text-hero: 72px/80px
--text-h1: 48px/56px
--text-body: 16px/24px
```

### Spacing Scale
```
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
```

## ✅ משימות שגרתיות
1. בדיקה שהקוד תואם לעיצוב ב-Figma
2. Export של תמונות חדשות מ-Figma
3. עדכון design tokens
4. תיעוד שינויים בעיצוב

## 🔄 תהליך Export מתמונות
1. בחר את ה-frame ב-Figma
2. Export כ-PNG ב-2x
3. שמור בתיקייה המתאימה ב-`public/images/`
4. עדכן את ה-reference בקוד

## 🔍 בדיקות Quality
- [ ] התמונות בגודל מתאים (לא גדולות מדי)
- [ ] כל התמונות נטענות תקין
- [ ] ה-colors תואמים ל-Figma
- [ ] ה-typography scale נשמר
- [ ] ה-spacing תואם לעיצוב

## 📱 Responsive Breakpoints
```
mobile: < 640px
tablet: 640px - 1024px
desktop: > 1024px
```
