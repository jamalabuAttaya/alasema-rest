import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { spring, viewportOnce, useIsMobile } from '../../animations/motionVariants';

function AboutStory() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const handleError = useCallback((e) => {
    e.target.src = '/assets/images/placeholder.webp';
  }, []);

  return (
    <motion.div
      className="about-story"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce(isMobile)}
      transition={spring}
    >
      <motion.div
        className="story-image"
        whileHover={isMobile ? undefined : { scale: 0.985 }}
        transition={spring}
      >
        <img 
          src="/assets/images/about-restaurant.webp" 
          alt={t('restaurantName')}
          loading="lazy"
          onError={handleError}
        />
      </motion.div>
      <motion.div
        className="story-content"
        initial={{ opacity: 0, x: isMobile ? 0 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, ...spring }}
      >
        <span className="story-label">ALASEMA</span>
        <h3>{t('ourStory')}</h3>
        <p>{t('aboutDescription')}</p>
      </motion.div>
    </motion.div>
  );
}

export default memo(AboutStory);
