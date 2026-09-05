import { memo, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { FaArrowLeft, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import {
  buttonVariants,
  fadeUp,
  spring,
  stagger,
  tapEffect,
  useIsMobile,
} from '../../animations/motionVariants';

function HeroSection() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.13]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0]);

  const buttons = useMemo(() => [
    { to: '/menu', text: t('viewMenu'), className: 'hero-btn primary' },
    { to: '/contact', text: t('visitUs'), className: 'hero-btn secondary' },
  ], [t]);

  return (
    <motion.section
      ref={heroRef}
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.7 }}
    >
      <motion.div
        className="hero-media"
        style={{ y: reduceMotion ? 0 : mediaY, scale: reduceMotion ? 1.04 : mediaScale }}
        aria-hidden="true"
      >
        <img
          src="/assets/images/hero-bg-new.webp"
          alt=""
          width="1600"
          height="900"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-frame" aria-hidden="true" />

      <motion.div
        className="hero-content container"
        initial="hidden"
        animate="visible"
        variants={stagger(0.16, 0.11)}
        style={{ y: reduceMotion ? 0 : contentY, opacity: reduceMotion ? 1 : contentOpacity }}
      >
        <motion.span className="hero-eyebrow" variants={fadeUp}>
          <span aria-hidden="true" />
          {t('heroEyebrow')}
        </motion.span>

        <motion.h1 className="hero-title" variants={fadeUp}>
          <span className="hero-title-main">{t('heroTitle')}</span>
          <span className="hero-title-accent">{t('heroTitleAccent')}</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={fadeUp}>
          {t('heroSubtitle')}
        </motion.p>

        <motion.div className="hero-buttons" variants={fadeUp}>
          {buttons.map((button, index) => (
            <motion.div key={button.to} custom={index} variants={buttonVariants}>
              <motion.div
                whileTap={tapEffect}
                whileHover={isMobile ? undefined : { y: -3, scale: 1.025 }}
                transition={spring}
              >
                <Link to={button.to} className={button.className}>
                  <span>{button.text}</span>
                  <FaArrowLeft className="hero-btn-icon" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-details" variants={fadeUp}>
          <span><FaMapMarkerAlt aria-hidden="true" /> {t('heroLocation')}</span>
          <span><FaWhatsapp aria-hidden="true" /> {t('heroOrder')}</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll-cue"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span />
      </motion.div>
    </motion.section>
  );
}

export default memo(HeroSection);
