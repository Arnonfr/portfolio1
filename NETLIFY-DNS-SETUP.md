# 🚀 Handoff: חיבור הדומיין arnonfriedman.com ל-Netlify

## 📋 סטטוס הפרויקט

### ✅ מה שהושלם (על ידי AI):
- ✅ **Build מוצלח** — `npm run build` עובד ומייצר תיקיית `dist/`
- ✅ **Netlify CLI מותקן** — `netlify-cli` מותקן כ-dev dependency
- ✅ **התחברות ל-Netlify** — מחובר לחשבון: arnon7700@gmail.com (Cookit team)
- ✅ **דיפלוי ראשוני** — האתר חי ב-Netlify: https://radiant-bavarois-cc98ed.netlify.app
- ✅ **קובץ `netlify.toml`** — מוגדר עם build command, publish dir, ו-SPA redirects
- ✅ **רישום הדומיין ב-Netlify** — `arnonfriedman.com` + `www.arnonfriedman.com` רשומים ב-Netlify (site ID: `d0015c33-ed65-4f7f-aa4e-188810a77352`)

### ⚠️ מה שנותר לעשות (על ידך):
- ❌ **עדכון DNS ב-Hostinger** — צריך לשנות את רשומות ה-DNS כדי שהדומיין יצביע על Netlify
- ⏳ **המתנה להפצת DNS** — 10-30 דקות אחרי עדכון ה-DNS
- ⏳ **אימות SSL** — Netlify יפיק אוטומטית תעודת SSL אחרי שה-DNS יתעדכן

## 🔧 מה צריך לעשות (5 דקות):

### שלב 1: התחבר ל-Hostinger
1. פתח דפדפן והיכנס ל-[Hostinger hPanel](https://hpanel.hostinger.com/)
2. התחבר עם המייל והסיסמה שלך

### שלב 2: עבור להגדרות DNS
1. לחץ על **Domains** בתפריט הצד השמאלי
2. לחץ על **arnonfriedman.com** (הדומיין שלך)
3. לחץ על **DNS / Nameservers** או **DNS Records**

### שלב 3: מחק רשומות A קיימות
- מצא את כל הרשומות מסוג **A** (בדרך כלל מצביעות על IP של Hostinger)
- לחץ על **Delete** / **מחק** ליד כל רשומת A

### שלב 4: הוסף רשומות DNS חדשות

#### רשומה 1 - הדומיין הראשי:
```
Type: A
Name: @ (או השאר ריק)
Points to: 75.2.60.5
TTL: 3600 (ברירת מחדל)
```

#### רשומה 2 - תת-דומיין www:
```
Type: CNAME
Name: www
Points to: radiant-bavarois-cc98ed.netlify.app
TTL: 3600 (ברירת מחדל)
```

### שלב 5: שמור
לחץ על **Save** / **שמור**

## ⏱️ זמן המתנה:
- ההפצה לוקחת בדרך כלל **5-30 דקות**
- לפעמים יכול לקחת עד **48 שעות** (נדיר)
- Netlify יפיק אוטומטית תעודת SSL (HTTPS) ברגע שה-DNS יתעדכן

## ✅ בדיקה:
אחרי 10-15 דקות, נסה לגשת ל:
- http://arnonfriedman.com
- https://arnonfriedman.com
- https://www.arnonfriedman.com

## 🔍 בדיקת DNS מהטרמינל:
```bash
dig arnonfriedman.com
```
אמור להחזיר: `75.2.60.5`

## 📝 לדיפלויים עתידיים:
```bash
npm run build && npx netlify deploy --prod --dir=dist
```

---

**שים לב:** אני לא יכול לגשת לחשבון Hostinger שלך ישירות (צריך התחברות). אתה צריך לעשות את השלבים האלה בעצמך ב-hPanel.
