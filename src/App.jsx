import { lazy, memo, Suspense, useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SplashScreen from './components/layout/SplashScreen';
import { useLanguage } from './context/LanguageContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const SPLASH_SESSION_KEY = 'alasema_splash_seen_v2';

function shouldShowSplash() {
  try {
    return sessionStorage.getItem(SPLASH_SESSION_KEY) !== '1';
  } catch {
    return true;
  }
}

const PageLoader = memo(function PageLoader() {
  const { t } = useLanguage();

  return (
    <div className="loading-spinner page-loader" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <span className="sr-only">{t('loadingPage')}</span>
    </div>
  );
});

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="route-shell"
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.998 }}
        transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const { t } = useLanguage();
  const [showSplash, setShowSplash] = useState(shouldShowSplash);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });

  const finishSplash = useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, '1');
    } catch {
      // The intro can still be closed when browser storage is unavailable.
    }
    setShowSplash(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} aria-hidden="true" />
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" onFinish={finishSplash} />}
      </AnimatePresence>
      <a className="skip-link" href="#main-content">{t('skipToContent')}</a>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
