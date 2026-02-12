# 📸 מדריך ייצוא תמונות מ-Figma - Claim Movement

## סה"כ 4 תמונות לייצא

---

## 🎯 לפני שמתחילים

### בפיגמה - ודא שיש לך:
- ✅ מסך של הממשק **הישן** (Legacy)
- ✅ מסך של הממשך **החדש** (עם המודאל המלא)

---

## תמונה 1️⃣: Legacy Interface (הממשך הישן)

### מה לייצא:
- צילום מסך של **כל המסך הישן**
- צריך לראות את הבלגן: טאבים מרובים, שדות לא מסודרים

### איך לייצא מפיגמה:

**צעד 1:** פתח את הקובץ בפיגמה
```
https://www.figma.com/design/G6XAHpklkeBTHFWt5j5gbb/Untitled
```

**צעד 2:** מצא את Frame של הממשק הישן
- חפש frame ששמו דומה ל: "Old Modal", "Legacy", "Before", או משהו דומה

**צעד 3:** בחר את ה-Frame
- לחץ על ה-Frame (לא על אלמנטים בפנים!)

**צעד 4:** ייצא
1. לחץ ימני על ה-Frame → **Export**
2. או: בחר ב-Frame ולחץ על הפאנל **Design** בצד ימין
3. גלול למטה ל-**Export**
4. הגדרות ייצוא:
   - **Format:** PNG
   - **Size:** 2x (לאיכות גבוהה)
5. לחץ **Export [שם Frame]**

**צעד 5:** שמור את הקובץ
```
שם: legacy-interface.png
מיקום: /Users/hyh/Documents/copy-of-copy-of-interactive-portfolio/public/images/
```

---

## תמונה 2️⃣: Row Duplication (כפתור השכפול)

### מה לייצא:
- **קרופ מדויק** של שורת הטבלה
- צריך לראות את כפתור ה-Duplicate בצד ימין

### איך לייצא:

**אופציה A: ייצוא חלק מה-Frame (מומלץ)**

1. בחר את ה-Frame של המודאל החדש
2. לחץ **Slice Tool** (S במקלדת)
3. צייר מלבן מעל **השורה בטבלה עם כפתורי ה-Actions**
   - התמקד בחלק הימני של השורה (Actions column)
4. לחץ ימני על ה-Slice → **Export Slice**
5. PNG, 2x
6. שמור בשם: `row-duplication-feature.png`

**אופציה B: Screenshot ידני**

1. פתח את המודאל החדש בפיגמה
2. זום-אין על השורה עם ה-Actions
3. Command+Shift+4 (Mac) או Snipping Tool (Windows)
4. צלם רק את השורה הרלוונטית
5. שמור בשם: `row-duplication-feature.png`

---

## תמונה 3️⃣: Smart Defaults (Dropdown המטבע)

### מה לייצא:
- קרופ של **עמודת Settlement Currency** בטבלה
- צריך לראות dropdown עם USD נבחר

### איך לייצא:

**אופציה A: Slice (מומלץ)**

1. בחר את ה-Frame של המודאל החדש
2. Slice Tool (S)
3. צייר מלבן מעל **עמודת Settlement Currency**
   - כלול 1-2 שורות כדי לראות את הדרופדאון
4. Export Slice → PNG, 2x
5. שמור: `smart-defaults-currency.png`

**אופציה B: Screenshot**

1. זום-אין על עמודת Settlement
2. Command+Shift+4 / Snipping Tool
3. צלם רק את העמודה הרלוונטית
4. שמור: `smart-defaults-currency.png`

---

## תמונה 4️⃣: Unified Summary (סקשן Summary)

### מה לייצא:
- **כל סקשן ה-Summary** בתחתית המודאל
- צריך לראות: טאבים (USD-USD, GBP-GBP) + טבלת totals

### איך לייצא:

**אופציה A: Slice (מומלץ)**

1. בחר את ה-Frame של המודאל החדש
2. Slice Tool (S)
3. צייר מלבן מעל **כל סקשן Summary**
   - מה-Header "Summary" עד סוף הטבלה
4. Export Slice → PNG, 2x
5. שמור: `unified-summary-section.png`

**אופציה B: בחר Component**

אם ה-Summary הוא component נפרד:
1. מצא את ה-Component "Summary"
2. לחץ עליו (right click) → Export
3. PNG, 2x
4. שמור: `unified-summary-section.png`

---

## ⚙️ הגדרות ייצוא מומלצות

בכל ייצוא מפיגמה:

```
Format: PNG
Size: 2x (רזולוציה גבוהה)
Include in Export: ✓ (סמן הכל)
```

**למה 2x?**
- נראה חד ב-Retina displays
- איכות מקצועית
- לא כבד מדי

---

## 📂 איפה לשמור את התמונות

**תיקייה:**
```
/Users/hyh/Documents/copy-of-copy-of-interactive-portfolio/public/images/
```

**שמות הקבצים:**
```
legacy-interface.png
row-duplication-feature.png
smart-defaults-currency.png
unified-summary-section.png
```

---

## 🔧 אחרי שתייצא - איך להחליף בקוד

### דוגמה: תמונה 1 (Legacy)

**קובץ:** `components/ProjectPage.tsx`
**שורה:** ~215

**מחק:**
```tsx
<div className="w-full aspect-[16/10] bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col items-center justify-center p-12 text-center">
  <!-- כל ה-placeholder -->
</div>
```

**החלף ב:**
```tsx
<img
  src="/images/legacy-interface.png"
  alt="Legacy Claim Movement Interface"
  className="w-full h-auto object-cover"
/>
```

### דוגמה: תמונה 2 (Row Duplication)

**שורה:** ~343

**החלף:**
```tsx
<img
  src="/images/row-duplication-feature.png"
  alt="Row duplication feature"
  className="w-full h-auto object-cover rounded-lg"
/>
```

### דוגמה: תמונה 3 (Smart Defaults)

**שורה:** ~371

**החלף:**
```tsx
<img
  src="/images/smart-defaults-currency.png"
  alt="Smart currency defaults"
  className="w-full h-auto object-cover rounded-lg"
/>
```

### דוגמה: תמונה 4 (Summary)

**שורה:** ~399

**החלף:**
```tsx
<img
  src="/images/unified-summary-section.png"
  alt="Unified summary section"
  className="w-full h-auto object-cover rounded-lg"
/>
```

---

## ✅ בדיקה

אחרי שתחליף:
1. שמור את `ProjectPage.tsx`
2. הדפדפן יתרענן אוטומטית (hot reload)
3. גלול לסקשן הרלוונטי
4. תראה את התמונה!

---

## 💡 טיפים

### גודל קבצים:
- אם התמונה כבדה מדי (>500KB), נסה 1x במקום 2x
- או דחוס ב-TinyPNG.com

### איכות:
- וודא שהטקסט קריא
- אם מטושטש - נסה זום גבוה יותר לפני הייצוא

### אם אין Frame ברור:
- תעשה Screenshot ידני (Command+Shift+4)
- פשוט וטוב לא פחות!

---

**זהו! עכשיו יש לך הכל כדי לייצא בעצמך 🎯**

יש בעיה? שאל אותי!
