import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import App from './App';
import './styles/style.css';

// ⚡ تحسينات الأداء المسبقة
function initPerformanceOptimizations() {
  // ⚡ DNS Prefetch للخدمات الخارجية
  const dnsPrefetchDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com',
    'https://wa.me',
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });

  // ⚡ Preconnect للخدمات المهمة
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // ⚡ Preload للصور المهمة (تظهر فوراً)
  const criticalImages = [
    '/assets/images/logo.webp',
    '/assets/images/hero-bg-new.webp',
  ];

  criticalImages.forEach(img => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img;
    document.head.appendChild(link);
  });

  // ⚡ تخزين اللغة في متغير عام للوصول السريع
  window.__INITIAL_LANG__ = localStorage.getItem('preferred_lang') || 'ar';
}

// ⚡ تشغيل التحسينات قبل تصيير React
initPerformanceOptimizations();

// ⚡ تصيير التطبيق
const root = document.getElementById('root');

// ⚡ استخدام createRoot مع خيارات متقدمة
ReactDOM.createRoot(root, {
  // ⚡ تفعيل Concurrent Mode للتحميل التدريجي
  unstable_concurrentUpdatesByDefault: true,
}).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// ⚡ تسجيل Service Worker للتخزين المؤقت (اختياري)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    // يمكن تفعيل Service Worker لاحقاً للتخزين الكامل
    // navigator.serviceWorker.register('/sw.js');
  });
}