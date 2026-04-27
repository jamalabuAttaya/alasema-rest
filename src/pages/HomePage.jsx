import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import HeroSection from '../components/home/HeroSection';
import FeaturedDishes from '../components/home/FeaturedDishes';
import QuickFeatures from '../components/home/QuickFeatures';

function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('restaurantName')} | ALASEMA</title>
        <meta name="description" content="مطعم العاصمة في النصيرات - غزة يقدم أشهى الوجبات السريعة والمشاوي" />
      </Helmet>
      <HeroSection />
      <FeaturedDishes />
      <QuickFeatures />
    </>
  );
}

export default HomePage;