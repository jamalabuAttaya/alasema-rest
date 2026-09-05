import { memo, useCallback, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

function SplashScreen({ onFinish }) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const skipButtonRef = useRef(null);
  const finish = useCallback(() => onFinish(), [onFinish]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    skipButtonRef.current?.focus({ preventScroll: true });

    const timer = window.setTimeout(finish, reduceMotion ? 500 : 2200);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') finish();
      if (event.key === 'Tab') {
        event.preventDefault();
        skipButtonRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [finish, reduceMotion]);

  return (
    <motion.div
        className="splash-screen"
        role="dialog"
        aria-modal="true"
        aria-label={t('restaurantName')}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.45 } }}
      >
        <motion.div
          className="splash-glow splash-glow-one"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { scale: [1, 1.22, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="splash-glow splash-glow-two"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { scale: [1.15, 0.9, 1.15], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="splash-content"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="splash-logo-frame"
            initial={reduceMotion ? false : { rotate: -8, scale: 0.75 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/assets/images/logo.webp" alt="" width="118" height="118" />
          </motion.div>

          <motion.p
            className="splash-name"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.4, duration: 0.55 }}
          >
            ALASEMA
          </motion.p>
          <motion.p
            className="splash-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.65, duration: 0.5 }}
          >
            {t('splashTagline')}
          </motion.p>

          <div className="splash-progress" aria-hidden="true">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0.35 : 1.65, delay: reduceMotion ? 0 : 0.35, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        <button ref={skipButtonRef} type="button" className="splash-skip" onClick={finish}>
          {t('skipSplash')}
        </button>
    </motion.div>
  );
}

export default memo(SplashScreen);
