import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const SPLASH_TEXTS = Object.freeze({
  '/': { ar: 'لحظات طعم لا تُنسى', en: 'Unforgettable Taste Moments' },
  '/menu': { ar: 'قائمة طعامنا', en: 'Our Menu' },
  '/about': { ar: 'قصتنا', en: 'Our Story' },
  '/gallery': { ar: 'معرض الصور', en: 'Photo Gallery' },
  '/contact': { ar: 'تواصل معنا', en: 'Contact Us' },
});

function SplashScreen() {
  const { language } = useLanguage();
  const location = useLocation();
  const text = useMemo(() => SPLASH_TEXTS[location.pathname]?.[language] || 'لحظات طعم لا تُنسى', [location.pathname, language]);
  const subtitle = useMemo(() => language === 'ar' ? 'مطعم العاصمة' : 'ALASEMA Restaurant', [language]);

  return (
    <motion.div 
      className="splash-screen" 
      aria-label="Loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div 
        className="splash-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="splash-logo-container"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/assets/images/logo.webp" alt="ALASEMA" className="splash-logo-img" width="90" height="90" loading="eager" fetchPriority="high" />
        </motion.div>
        <motion.div className="splash-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>ALASEMA</motion.div>
        <motion.div className="splash-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{subtitle}</motion.div>
        <motion.div className="splash-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>{text}</motion.div>
        <div className="splash-spinner" aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

export default memo(SplashScreen);