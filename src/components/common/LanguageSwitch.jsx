import { memo, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  const switchToAr = useCallback(() => setLanguage('ar'), [setLanguage]);
  const switchToEn = useCallback(() => setLanguage('en'), [setLanguage]);

  return (
    <>
      <button 
        className={`lang-btn${language === 'ar' ? ' active' : ''}`}
        onClick={switchToAr}
        aria-label="العربية"
      >
        عربي
      </button>
      <button 
        className={`lang-btn${language === 'en' ? ' active' : ''}`}
        onClick={switchToEn}
        aria-label="English"
      >
        EN
      </button>
    </>
  );
}

export default memo(LanguageSwitch);