import { useLanguage } from '../../context/LanguageContext';

function QuickFeatures() {
  const { t } = useLanguage();
  
  const features = [
    { icon: 'fa-utensils', key: 'quality' },
    { icon: 'fa-truck-fast', key: 'delivery' },
    { icon: 'fa-leaf', key: 'fresh' },
    { icon: 'fa-clock', key: 'service' },
  ];

  return (
    <section className="quick-features">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-item" key={index}>
              <i className={`fas ${feature.icon}`}></i>
              <h3>{t(feature.key)}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickFeatures;