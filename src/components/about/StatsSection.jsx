import { useLanguage } from '../../context/LanguageContext';

function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    { number: '15+', label: t('yearsExperience') },
    { number: '50+', label: t('foodItems') },
    { number: '10k+', label: t('happyCustomers') },
    { number: '24/7', label: t('continuousService') },
  ];

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

export default StatsSection;