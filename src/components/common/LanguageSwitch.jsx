import { useLanguage } from '../../context/LanguageContext';

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <>
      <button 
        className={`lang-btn${language === 'ar' ? ' active' : ''}`}
        onClick={() => setLanguage('ar')}
      >
        عربي
      </button>
      <button 
        className={`lang-btn${language === 'en' ? ' active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </>
  );
}

export default LanguageSwitch;;