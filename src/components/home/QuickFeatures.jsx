import { memo, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FEATURE_ICONS = Object.freeze([
  { icon: 'fa-utensils', key: 'quality' },
  { icon: 'fa-truck-fast', key: 'delivery' },
  { icon: 'fa-leaf', key: 'fresh' },
  { icon: 'fa-clock', key: 'service' },
]);

const FeatureItem = memo(({ icon, text }) => (
  <div className="feature-item">
    <i className={`fas ${icon}`} aria-hidden="true"></i>
    <h3>{text}</h3>
  </div>
));

function QuickFeatures() {
  const { t } = useLanguage();

  const features = useMemo(() => 
    FEATURE_ICONS.map(f => ({ icon: f.icon, text: t(f.key) })),
    [t]
  );

  return (
    <section className="quick-features">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureItem key={index} icon={feature.icon} text={feature.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(QuickFeatures);