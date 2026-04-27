import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import AboutStory from '../components/about/AboutStory';
import MissionVision from '../components/about/MissionVision';
import StatsSection from '../components/about/StatsSection';

function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('about')} | {t('restaurantName')}</title>
      </Helmet>
      <section className="about-page">
        <div className="container">
          <h2 className="page-title">
            <span className="title-ar">{t('aboutTitle')}</span>
            <span className="title-en">{t('aboutTitle')}</span>
          </h2>
          <AboutStory />
          <MissionVision />
          <StatsSection />
        </div>
      </section>
    </>
  );
}

export default AboutPage;