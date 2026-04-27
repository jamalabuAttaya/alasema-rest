import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SplashScreen from './components/layout/SplashScreen';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowSplash(true);
    setContentVisible(false);
    
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => {
        setContentVisible(true);
      }, 100);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showSplash && <SplashScreen />}
      <div id="mainContent" className={`main-content${contentVisible ? ' visible' : ''}`}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;