import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { cardVariants, useIsMobile, viewportOnce } from '../../animations/motionVariants';

const STAT_NUMBERS = Object.freeze(['15+', '50+', '10k+', '24/7']);
const STAT_KEYS = Object.freeze(['yearsExperience', 'foodItems', 'happyCustomers', 'continuousService']);

function StatsSection() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const stats = useMemo(() => 
    STAT_NUMBERS.map((number, i) => ({
      number,
      label: t(STAT_KEYS[i]),
    })),
    [t]
  );

  return (
    <div className="stats-section">
      {stats.map((stat, index) => (
        <motion.div
          className="stat-card"
          key={stat.label}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce(isMobile)}
          variants={cardVariants(isMobile)}
        >
          <span className="stat-number">{stat.number}</span>
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default memo(StatsSection);
