import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const SOCIAL_LINKS = Object.freeze([
  { href: 'https://www.facebook.com/asemarest/', Icon: FaFacebookF, label: 'Facebook' },
  { href: 'https://www.instagram.com/asemarest', Icon: FaInstagram, label: 'Instagram' },
  { href: 'https://wa.me/970594804807', Icon: FaWhatsapp, label: 'WhatsApp' },
]);

const FOOTER_LINKS = Object.freeze([
  { to: '/', key: 'home' },
  { to: '/menu', key: 'menu' },
  { to: '/about', key: 'about' },
  { to: '/gallery', key: 'gallery' },
  { to: '/contact', key: 'contact' },
]);

const SocialIcon = memo(({ href, Icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <Icon aria-hidden="true" />
  </a>
));

function Footer() {
  const { t } = useLanguage();
  const footerLinks = useMemo(
    () => FOOTER_LINKS.map((link) => ({ ...link, text: t(link.key) })),
    [t]
  );

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/assets/images/logo.webp" alt="" width="55" height="55" loading="lazy" />
            <h2>ALASEMA</h2>
            <p>{t('restaurantName')}</p>
          </div>

          <nav className="footer-links" aria-label={t('footerNavigation')}>
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to}>{link.text}</Link>
            ))}
          </nav>

          <div className="social-icons">
            {SOCIAL_LINKS.map((social) => (
              <SocialIcon key={social.label} {...social} />
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('copyright')}</p>
          <a
            className="developer-credit"
            href="https://jamalabuattaya-portfolio.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaCode aria-hidden="true" />
            <span>{t('developerCredit')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
