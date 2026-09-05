import { memo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import AboutStory from '../components/about/AboutStory';
import MissionVision from '../components/about/MissionVision';
import StatsSection from '../components/about/StatsSection';
import Seo from '../components/common/Seo';
import PageHeading from '../components/common/PageHeading';

function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo titleKey="aboutSeoTitle" descriptionKey="aboutPageDescription" path="/about" />
      <section className="about-page">
        <div className="container">
          <PageHeading
            eyebrow={t('aboutKicker')}
            title={t('aboutTitle')}
            subtitle={t('aboutPageIntro')}
          />
          <AboutStory />
          <MissionVision />
          <StatsSection />
        </div>
      </section>
    </>
  );
}

export default memo(AboutPage);
