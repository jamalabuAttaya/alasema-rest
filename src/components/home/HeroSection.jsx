import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          {language === 'ar' ? (
            <>
              <span className="title-ar">{t('heroTitle')}</span>
              <span className="title-en">{t('heroSubtitle')}</span>
            </>
          ) : (
            <span className="title-ar" style={{fontSize: '2rem'}}>{t('heroTitle')}</span>
          )}
        </h1>
        <div className="hero-buttons">
          <Link to="/menu" className="hero-btn primary">{t('viewMenu')}</Link>
          <Link to="/contact" className="hero-btn secondary">{t('visitUs')}</Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;