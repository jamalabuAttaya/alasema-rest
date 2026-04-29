import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense, useCallback, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { pageVariants, useIsMobile } from './animations/motionVariants';

const HomePage = lazy(() => import('./pages/HomePage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

import SplashScreen from './components/layout/SplashScreen';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const PageLoader = memo(() => <div className="loading-spinner" style={{ padding: '60px 0' }}><div className="spinner" /></div>);

function AnimatedRoutes() {
  const location = useLocation();
  const isMobile = useIsMobile();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit"
        transition={{ duration: isMobile ? 0.25 : 0.4 }}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const location = useLocation();

  const handleSplashEnd = useCallback(() => {
    setShowSplash(false);
    requestAnimationFrame(() => { requestAnimationFrame(() => { setContentVisible(true); }); });
  }, []);

  useEffect(() => {
    setShowSplash(true); setContentVisible(false);
    const timer = setTimeout(handleSplashEnd, 2000);
    return () => clearTimeout(timer);
  }, [location.pathname, handleSplashEnd]);

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <motion.div className={`main-content${contentVisible ? ' visible' : ''}`}
        initial={{ opacity: 0 }} animate={{ opacity: contentVisible ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <Header />
        <main><AnimatedRoutes /></main>
        <Footer />
      </motion.div>
    </>
  );
}

export default App;