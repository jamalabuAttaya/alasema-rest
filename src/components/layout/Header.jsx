import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitch from '../common/LanguageSwitch';

// ⚡ روابط التنقل ثابتة خارج المكون (لا تعاد إنشاؤها كل تصيير)
const NAV_LINKS = Object.freeze([
  { path: '/', key: 'home' },
  { path: '/menu', key: 'menu' },
  { path: '/about', key: 'about' },
  { path: '/gallery', key: 'gallery' },
  { path: '/contact', key: 'contact' },
]);

// ⚡ مكون رابط القائمة - memo يمنع إعادة تصيير كل الروابط
const NavItem = memo(({ path, text, onClick }) => (
  <li>
    <NavLink 
      to={path}
      onClick={onClick}
      className={({ isActive }) => isActive ? 'active' : ''}
    >
      {text}
    </NavLink>
  </li>
));

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  // ⚡ useCallback لتثبيت دالة التبديل
  const toggleMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // ⚡ إغلاق القائمة عند تغيير المسار
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // ⚡ useMemo لروابط التنقل المترجمة (تتغير فقط عند تغيير اللغة)
  const navLinks = useMemo(() => 
    NAV_LINKS.map(link => ({
      ...link,
      text: t(link.key),
    })),
    [t]
  );

  return (
    <header>
      <div className="container">
        {/* ⚡ Preload للصفحة الرئيسية عند hover */}
        <Link 
          to="/" 
          className="logo-link"
          onMouseEnter={() => {
            // ⚡ تحميل مسبق للصفحة الرئيسية
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'prefetch';
            preloadLink.href = '/';
            document.head.appendChild(preloadLink);
          }}
        >
          <img 
            src="/assets/images/logo.webp" 
            alt="ALASEMA" 
            className="header-logo-img"
            width="45"
            height="45"
            loading="eager"
          />
          <div className="logo-text">
            <h1>ALASEMA</h1>
            <p>{t('restaurantName')}</p>
          </div>
        </Link>

        <div className="lang-switch">
          <LanguageSwitch />
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <nav className={mobileMenuOpen ? 'show' : ''} role="navigation">
        <ul>
          {navLinks.map(link => (
            <NavItem 
              key={link.path}
              path={link.path}
              text={link.text}
              onClick={closeMenu}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}

// ⚡ memo يمنع إعادة تصيير الهيدر إذا لم تتغير اللغة أو المسار
export default memo(Header);