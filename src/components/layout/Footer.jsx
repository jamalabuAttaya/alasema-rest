import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// ⚡ روابط السوشيال ميديا ثابتة خارج المكون
const SOCIAL_LINKS = Object.freeze([
  { 
    href: 'https://www.facebook.com/asemarest/', 
    icon: 'fa-facebook-f', 
    label: 'Facebook' 
  },
  { 
    href: 'https://www.instagram.com/asemarest', 
    icon: 'fa-instagram', 
    label: 'Instagram' 
  },
  { 
    href: 'https://wa.me/+970594804807', 
    icon: 'fa-whatsapp', 
    label: 'WhatsApp' 
  },
  { 
    href: '#', 
    icon: 'fa-tiktok', 
    label: 'TikTok' 
  },
]);

// ⚡ روابط التنقل ثابتة خارج المكون
const FOOTER_LINKS = Object.freeze([
  { to: '/', key: 'home' },
  { to: '/menu', key: 'menu' },
  { to: '/about', key: 'about' },
  { to: '/gallery', key: 'gallery' },
  { to: '/contact', key: 'contact' },
]);

// ⚡ مكون أيقونة السوشيال ميديا
const SocialIcon = memo(({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
  >
    <i className={`fab ${icon}`} aria-hidden="true"></i>
  </a>
));

// ⚡ مكون رابط الفوتر
const FooterLink = memo(({ to, text }) => (
  <Link to={to}>{text}</Link>
));

function Footer() {
  const { t } = useLanguage();

  // ⚡ useMemo للروابط المترجمة
  const footerLinks = useMemo(() => 
    FOOTER_LINKS.map(link => ({
      ...link,
      text: t(link.key),
    })),
    [t]
  );

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          {/* ⚡ لوجو الفوتر */}
          <div className="footer-logo">
            <img 
              src="/assets/images/logo.webp" 
              alt="ALASEMA" 
              width="55"
              height="55"
              loading="lazy"
            />
            <h3>ALASEMA</h3>
            <p>{t('restaurantName')}</p>
          </div>

          {/* ⚡ روابط التنقل */}
          <nav className="footer-links" aria-label="Footer navigation">
            {footerLinks.map(link => (
              <FooterLink 
                key={link.to} 
                to={link.to} 
                text={link.text} 
              />
            ))}
          </nav>

          {/* ⚡ أيقونات السوشيال ميديا */}
          <div className="social-icons">
            {SOCIAL_LINKS.map((social, index) => (
              <SocialIcon 
                key={index}
                href={social.href}
                icon={social.icon}
                label={social.label}
              />
            ))}
          </div>
        </div>

        {/* ⚡ حقوق النشر */}
        <div className="footer-bottom">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

// ⚡ memo يمنع إعادة تصيير الفوتر (مكون ثابت)
export default memo(Footer);