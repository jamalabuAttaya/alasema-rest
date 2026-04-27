import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitch from '../common/LanguageSwitch';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/', key: 'home' },
    { path: '/menu', key: 'menu' },
    { path: '/about', key: 'about' },
    { path: '/gallery', key: 'gallery' },
    { path: '/contact', key: 'contact' },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo-link">
          <img src="/assets/images/logo.webp" alt="ALASEMA" className="header-logo-img" />
          <div className="logo-text">
            <h1>ALASEMA</h1>
            <p>{t('restaurantName')}</p>
          </div>
        </Link>
        <div className="lang-switch">
          <LanguageSwitch />
        </div>
        <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <nav className={mobileMenuOpen ? 'show' : ''}>
        <ul>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;