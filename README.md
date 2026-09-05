# موقع مطعم العاصمة

موقع مطعم متجاوب مبني باستخدام React وVite، ويضم صفحات الرئيسية، قائمة الطعام، عن المطعم، المعرض والتواصل.

## المتطلبات

- Node.js 20.19.0 أو أحدث
- npm 10 أو أحدث

## التشغيل

```bash
npm install
npm run dev
```

## التحقق والإنتاج

```bash
npm run check
npm run build
npm run preview
```

ينفذ أمر `npm run check` فحص الشيفرة، والتحقق من تطابق بيانات قائمة الطعام العربية والإنجليزية، ثم إنشاء نسخة الإنتاج.

## إعدادات النشر

- إعدادات Vercel وترويسات الحماية موجودة في `vercel.json`.
- إعدادات Netlify الاحتياطية موجودة في `public/_headers`.
- ملفات الفهرسة موجودة في `public/robots.txt` و`public/sitemap.xml`.
- بيانات المطعم المنظمة موجودة داخل `index.html`.

## المطور

[جمال أبو عطايا](https://jamalabuattaya-portfolio.netlify.app)
