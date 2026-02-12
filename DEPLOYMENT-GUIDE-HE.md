# מדריך פריסה לאתר: Hostinger ו-GitHub Actions

מדריך זה מתאר כיצד לפרוס (Deploy) את אתר הפורטפוליו לשרתי Hostinger באופן אוטומטי בעזרת GitHub Actions.

## דרישות מקדימות

1.  **חשבון Hostinger פעיל**: ודא שיש לך תוכנית אחסון בתוקף.
2.  **חשבון GitHub**: נדרש כדי לארח את קוד המקור ולהריץ את האוטומציה.
3.  **דומיין**: הדומיין שברצונך לחבר לאתר (למשל `arnonfriedman.com`).
4.  **גישה לקוד**: ודא שאתה נמצא בתיקיית הפרויקט במחשב שלך.

---

## שלב 1: יצירת מאגר (Repository) ב-GitHub

1.  הכנס ל-[GitHub](https://github.com/new) וצור מאגר חדש (Repository).
2.  תן לו שם, למשל `portfolio-website`.
3.  **אל** תסמן את האפשרויות להוספת README, .gitignore או License (כדי להשאיר אותו ריק).
4.  הרץ את הפקודות הבאות בטרמינל (Terminal) בתיקיית הפרויקט שלך:

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    # החלף את YOUR_USERNAME בשם המשתמש שלך ב-GitHub
    git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
    git push -u origin main
    ```

## שלב 2: השגת פרטי FTP מ-Hostinger

1.  התחבר לממשק הניהול [Hostinger hPanel](https://hpanel.hostinger.com/).
2.  עבור ל-**Websites** -> **Dashboard** (לוח בקרה) עבור הדומיין שלך.
3.  בצד שמאל, חפש את **Files** -> **FTP Accounts**.
4.  רשום לעצמך את הפרטים הבאים:
    *   **FTP Host**: (למשל `ftp.yourdomain.com` או כתובת IP).
    *   **FTP Username**: (למשל `u123456789`).
    *   **FTP Password**: (אם אינך יודע אותה, ניתן לשנות אותה במסך זה).

## שלב 3: הגדרת סודות (Secrets) ב-GitHub

כדי ש-GitHub יוכל להתחבר לשרת שלך, עלינו לשמור את הסיסמאות בצורה מאובטחת.

1.  כנס למאגר (Repository) שיצרת ב-GitHub.
2.  לחץ על **Settings** (הגדרות) -> **Secrets and variables** -> **Actions**.
3.  לחץ על הכפתור הירוק **New repository secret**.
4.  הוסף את המשתנים הבאים (שים לב לאיות המדויק באנגלית):
    *   שם: `FTP_SERVER`, ערך: כתובת ה-Host (מהשלב הקודם).
    *   שם: `FTP_USERNAME`, ערך: שם המשתמש.
    *   שם: `FTP_PASSWORD`, ערך: הסיסמה שלך.

## שלב 4: הפעלת הפריסה (Deployment)

1.  ברגע שהסודות מוגדרים, כל שינוי שתדחוף (Push) לענף `main` ב-GitHub יפעיל אוטומטית את תהליך הפריסה.
2.  כדי לבדוק זאת, בצע שינוי קטן בקוד ודחוף אותו, או פשוט כנס ללשונית **Actions** ב-GitHub.
3.  אם התהליך הסתיים בירוק (Success), הקבצים שלך עברו לתיקיית `public_html` בשרת של Hostinger.

## שלב 5: חיבור הדומיין

אם הדומיין שלך חדש או טרם חובר:
1.  ב-Hostinger hPanel, חפש הגדרות **Domain**.
2.  ודא שה-Nameservers של הדומיין מצביעים ל-Hostinger (`ns1.dns-parking.com`, `ns2.dns-parking.com`).
3.  תהליך עדכון DNS יכול לקחת עד 24 שעות, אך לרוב קורה מהר יותר.

---

**פתרון תקלות נפוצות:**
*   **שגיאת 403 Forbidden**: ודא שבקובץ `.github/workflows/deploy.yml` ההגדרה `server-dir` היא `./public_html/`.
*   **מסך לבן**: פתח את כלי המפתחים (F12) בדפדפן. אם אתה רואה שגיאות על קבצי JS/CSS שלא נמצאו (MIME type errors), ייתכן שצריך לעדכן את ה-Base URL בקובץ `vite.config.ts`.
