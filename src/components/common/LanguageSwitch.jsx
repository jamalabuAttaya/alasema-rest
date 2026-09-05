import { memo } from 'react';
import { useLanguage } from '../../context/LanguageContext';

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-btn${language === 'ar' ? ' active' : ''}`}
        onClick={() => setLanguage('ar')}
        aria-pressed={language === 'ar'}
      >
        عربي
      </button>
      <button
        type="button"
        className={`lang-btn${language === 'en' ? ' active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
}

export default memo(LanguageSwitch);
