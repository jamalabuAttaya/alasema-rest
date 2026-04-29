import { memo, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

function AboutStory() {
  const { t } = useLanguage();

  const handleError = useCallback((e) => {
    e.target.src = '/assets/images/placeholder.webp';
  }, []);

  return (
    <div className="about-story">
      <div className="story-image">
        <img 
          src="/assets/images/about-restaurant.webp" 
          alt={t('restaurantName')}
          loading="lazy"
          onError={handleError}
        />
      </div>
      <div className="story-content">
        <h3>{t('ourStory')}</h3>
        <p>{t('aboutDescription')}</p>
      </div>
    </div>
  );
}

export default memo(AboutStory);