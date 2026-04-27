import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const splashTexts = {
  '/': { ar: 'لحظات طعم لا تُنسى', en: 'Unforgettable Taste Moments' },
  '/menu': { ar: 'قائمة طعامنا', en: 'Our Menu' },
  '/about': { ar: 'قصتنا', en: 'Our Story' },
  '/gallery': { ar: 'معرض الصور', en: 'Photo Gallery' },
  '/contact': { ar: 'تواصل معنا', en: 'Contact Us' },
};

function SplashScreen() {
  const { language } = useLanguage();
  const location = useLocation();
  const text = splashTexts[location.pathname]?.[language] || splashTexts['/'].ar;

  return (
    <div className="splash-screen" id="splashScreen">
      <div className="splash-content">
        <div className="splash-logo-container">
          <img src="/assets/images/logo.webp" alt="ALASEMA" className="splash-logo-img" />
        </div>
        <div className="splash-title">ALASEMA</div>
        <div className="splash-subtitle">
          {language === 'ar' ? 'مطعم العاصمة' : 'ALASEMA Restaurant'}
        </div>
        <div className="splash-text">{text}</div>
        <div className="splash-spinner"></div>
      </div>
    </div>
  );
}

export default SplashScreen;