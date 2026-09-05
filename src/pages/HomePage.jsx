import { memo } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedDishes from '../components/home/FeaturedDishes';
import QuickFeatures from '../components/home/QuickFeatures';
import Seo from '../components/common/Seo';

function HomePage() {
  return (
    <>
      <Seo titleKey="homeSeoTitle" descriptionKey="homeDescription" />
      <HeroSection />
      <FeaturedDishes />
      <QuickFeatures />
    </>
  );
}

export default memo(HomePage);
