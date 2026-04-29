// ⚡ جميع متغيرات الحركة في ملف واحد - Scalable Architecture
import { useEffect, useState } from 'react';

// ⚡ فحص الموبايل للتحسين
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ⚡ Spring الرئييسي - يعطي إحساس Premium App
export const spring = {
  type: "spring",
  stiffness: 120,
  damping: 20,
};

// ⚡ Spring ناعم للبطاقات
export const springSoft = {
  type: "spring",
  stiffness: 100,
  damping: 25,
};

// ⚡ Fade Up مع Premium Easing
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ⚡ Fade In فقط
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ⚡ Stagger Children
export const stagger = (delay = 0.3, staggerChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren, delayChildren: delay } 
  },
});

// ⚡ Scale In للصور والخلفيات
export const scaleIn = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ⚡ بطاقة تظهر من الأسفل
export const cardVariants = (isMobile) => ({
  hidden: { opacity: 0, y: isMobile ? 20 : 30 },
  visible: (i) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: i * (isMobile ? 0.05 : 0.1), ...springSoft } 
  }),
});

// ⚡ Hover للبطاقات - Spring يعطي إحساس بريميوم
export const cardHover = {
  y: -10,
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  transition: springSoft,
};

// ⚡ Hover للصور - Zoom ناعم
export const imageHover = {
  scale: 1.08,
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ⚡ Tap feedback لكل العناصر
export const tapEffect = { scale: 0.96 };

// ⚡ Blur Loading (Netflix-style) للصور
export const blurLoad = {
  hidden: { filter: "blur(15px)", opacity: 0, scale: 1.05 },
  visible: { 
    filter: "blur(0px)", 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ⚡ عناصر المنيو تظهر بالتتابع
export const menuItemVariants = (isMobile) => ({
  hidden: { opacity: 0, x: -15 },
  visible: (i) => ({ 
    opacity: 1, 
    x: 0, 
    transition: { delay: i * (isMobile ? 0.02 : 0.03), duration: 0.3 } 
  }),
});

// ⚡ Page Transitions احترافية
export const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.97, 
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ⚡ أزرار تظهر بالتتابع
export const buttonVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: 0.5 + i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
  }),
};

// ⚡ Viewport Options للاستخدام في كل المكونات
export const viewportOnce = (isMobile) => ({
  once: true,
  margin: isMobile ? '-20px' : '-50px',
  amount: isMobile ? 0.1 : 0.2,
});