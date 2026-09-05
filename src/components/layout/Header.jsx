import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitch from '../common/LanguageSwitch';

const NAV_LINKS = Object.freeze([
  { path: '/', key: 'home' },
  { path: '/menu', key: 'menu' },
  { path: '/about', key: 'about' },
  { path: '/gallery', key: 'gallery' },
  { path: '/contact', key: 'contact' },
]);

const NavItem = memo(({ path, text, onClick }) => (
  <li>
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) => (isActive ? 'active' : undefined)}
    >
      {text}
    </NavLink>
  </li>
));

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMobileMenuOpen((open) => !open), []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, closeMenu]);

  useEffect(() => {
    if (mobileMenuOpen) setHeaderHidden(false);
  }, [mobileMenuOpen]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHeaderScrolled(latest > 18);
    setHeaderHidden(!mobileMenuOpen && latest > previous && latest > 150);
  });

  const navLinks = useMemo(
    () => NAV_LINKS.map((link) => ({ ...link, text: t(link.key) })),
    [t]
  );

  return (
    <motion.header
      className={headerScrolled ? 'header-scrolled' : undefined}
      animate={{ y: headerHidden && !reduceMotion ? '-105%' : '0%' }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container header-main-row">
        <Link to="/" className="logo-link" aria-label={t('restaurantName')}>
          <img
            src="/assets/images/logo.webp"
            alt=""
            className="header-logo-img"
            width="45"
            height="45"
          />
          <div className="logo-text">
            <span className="logo-title">ALASEMA</span>
            <span className="logo-subtitle">{t('restaurantName')}</span>
          </div>
        </Link>

        <LanguageSwitch />

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
        >
          {mobileMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>

        <nav
          id="primary-navigation"
          className={`header-nav${mobileMenuOpen ? ' show' : ''}`}
          aria-label={t('primaryNavigation')}
        >
          <ul>
            {navLinks.map((link) => (
              <NavItem
                key={link.path}
                path={link.path}
                text={link.text}
                onClick={closeMenu}
              />
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default memo(Header);
