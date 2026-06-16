import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const SPLASH_TEXTS = Object.freeze({
  '/': { ar: 'لحظات طعم لا تُنسى', en: 'Unforgettable Taste Moments' },
  '/menu': { ar: 'قائمة طعامنا', en: 'Our Menu' },
  '/about': { ar: 'قصتنا', en: 'Our Story' },
  '/gallery': { ar: 'معرض الصور', en: 'Photo Gallery' },
  '/contact': { ar: 'تواصل معنا', en: 'Contact Us' },
});

// ⚡ جزيئات ذهبية متطايرة
const FloatingParticles = memo(() => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: `${4 + Math.random() * 6}px`,
          height: `${4 + Math.random() * 6}px`,
          borderRadius: '50%',
          background: ['#FFD700', '#FFC614', '#FFF5CC', '#DAA520'][i % 4],
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          scale: [0, 1, 0],
          y: [0, -20 - Math.random() * 30],
          x: [0, (Math.random() - 0.5) * 30],
        }}
        transition={{ duration: 2 + Math.random() * 2, delay: 0.3 + i * 0.15, repeat: Infinity, repeatDelay: 0.5 }}
      />
    ))}
  </div>
));

// ⚡ حلقة ذهبية تنبض حول الشعار
const PulseRing = memo(() => (
  <motion.div
    style={{
      position: 'absolute',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      border: '2px solid rgba(255,215,0,0.3)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1.4, opacity: [0, 0.5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    aria-hidden="true"
  />
));

function SplashScreen() {
  const { language } = useLanguage();
  const location = useLocation();
  const text = useMemo(
    () => SPLASH_TEXTS[location.pathname]?.[language] || 'لحظات طعم لا تُنسى',
    [location.pathname, language]
  );
  const subtitle = useMemo(
    () => (language === 'ar' ? 'مطعم العاصمة' : 'ALASEMA Restaurant'),
    [language]
  );

  return (
    <motion.div
      className="splash-screen"
      role="dialog"
      aria-label="Loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ✨ جزيئات ذهبية */}
      <FloatingParticles />

      <motion.div
        className="splash-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* 🏷️ الشعار مع نبض + حلقة */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <PulseRing />
          <motion.div
            className="splash-logo-container"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
          >
            <img
              src="/assets/images/logo.webp"
              alt="ALASEMA"
              className="splash-logo-img"
              width="90"
              height="90"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </div>

        {/* ✨ النصوص بتأثير Pop */}
        <motion.div
          className="splash-title"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
        >
          ALASEMA
        </motion.div>

        <motion.div
          className="splash-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        >
          {subtitle}
        </motion.div>

        <motion.div
          className="splash-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          {text}
        </motion.div>

        {/* 📊 شريط تقدم ذهبي */}
        <motion.div
          style={{
            width: '140px',
            height: '3px',
            background: 'rgba(0,0,0,0.05)',
            borderRadius: '2px',
            margin: '20px auto 0',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, delay: 0.2, ease: 'easeInOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #FFD700, #FFC614)',
              borderRadius: '2px',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default memo(SplashScreen);