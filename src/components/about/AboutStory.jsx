import { useLanguage } from '../../context/LanguageContext';

function AboutStory() {
  const { t } = useLanguage();

  return (
    <div className="about-story">
      <div className="story-image">
        <img 
          src="/assets/images/about-restaurant.webp" 
          alt={t('restaurantName')}
          onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
        />
      </div>
      <div className="story-content">
        <h3>{t('ourStory')}</h3>
        <p>{t('aboutDescription')}</p>
      </div>
    </div>
  );
}

export default AboutStory;