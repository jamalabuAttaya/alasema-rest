import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { fadeUp, stagger, scaleIn, spring, buttonVariants, tapEffect, useIsMobile } from '../../animations/motionVariants';

function HeroSection() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const heroContent = useMemo(() => {
    if (language === 'ar') return { title: t('heroTitle'), subtitle: t('heroSubtitle'), showSubtitle: true };
    return { title: t('heroTitle'), subtitle: '', showSubtitle: false };
  }, [t, language]);

  const buttons = useMemo(() => [
    { to: '/menu', text: t('viewMenu'), className: 'hero-btn primary' },
    { to: '/contact', text: t('visitUs'), className: 'hero-btn secondary' },
  ], [t]);

  return (
    <motion.section className="hero" initial="hidden" animate="visible" variants={scaleIn}>
      <div className="hero-overlay" aria-hidden="true" />
      <motion.div className="hero-content" variants={stagger()}>
        <motion.h1 className="hero-title" variants={fadeUp}>
          <span className="title-ar">{heroContent.title}</span>
          {heroContent.showSubtitle && <motion.span className="title-en" variants={fadeUp}>{heroContent.subtitle}</motion.span>}
        </motion.h1>
        <div className="hero-buttons">
          {buttons.map((btn, i) => (
            <motion.div key={btn.to} custom={i} variants={buttonVariants}>
              <motion.div whileTap={tapEffect} whileHover={isMobile ? {} : { scale: 1.05 }} transition={spring}>
                <Link to={btn.to} className={btn.className}
                  onMouseEnter={() => { const l = document.createElement('link'); l.rel = 'prefetch'; l.href = btn.to; document.head.appendChild(l); }}>
                  {btn.text}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default memo(HeroSection);