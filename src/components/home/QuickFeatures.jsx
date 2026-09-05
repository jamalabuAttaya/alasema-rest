import { memo, useMemo } from 'react';
import { FaClock, FaLeaf, FaTruck, FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { cardVariants, useIsMobile, viewportOnce } from '../../animations/motionVariants';

const FEATURES = Object.freeze([
  { Icon: FaUtensils, key: 'quality' },
  { Icon: FaTruck, key: 'delivery' },
  { Icon: FaLeaf, key: 'fresh' },
  { Icon: FaClock, key: 'service' },
]);

const FeatureItem = memo(({ Icon, text, index, isMobile }) => (
  <motion.article
    className="feature-item"
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce(isMobile)}
    variants={cardVariants(isMobile)}
    whileHover={isMobile ? undefined : { y: -8 }}
  >
    <motion.span
      className="feature-icon"
      whileHover={isMobile ? undefined : { rotate: -8, scale: 1.08 }}
    >
      <Icon aria-hidden="true" />
    </motion.span>
    <h3>{text}</h3>
  </motion.article>
));

function QuickFeatures() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const features = useMemo(
    () => FEATURES.map((feature) => ({ ...feature, text: t(feature.key) })),
    [t]
  );

  return (
    <section className="quick-features" aria-label={t('quality')}>
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureItem key={feature.key} {...feature} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(QuickFeatures);
