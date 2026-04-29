import { memo, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const STAT_NUMBERS = Object.freeze(['15+', '50+', '10k+', '24/7']);
const STAT_KEYS = Object.freeze(['yearsExperience', 'foodItems', 'happyCustomers', 'continuousService']);

function StatsSection() {
  const { t } = useLanguage();

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
        <div className="stat-card" key={index}>
          <span className="stat-number">{stat.number}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default memo(StatsSection);