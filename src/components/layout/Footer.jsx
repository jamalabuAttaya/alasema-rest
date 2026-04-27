import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/assets/images/logo.webp" alt="ALASEMA" />
            <h3>ALASEMA</h3>
            <p>{t('restaurantName')}</p>
          </div>
          <div className="footer-links">
            <Link to="/">{t('home')}</Link>
            <Link to="/menu">{t('menu')}</Link>
            <Link to="/about">{t('about')}</Link>
            <Link to="/gallery">{t('gallery')}</Link>
            <Link to="/contact">{t('contact')}</Link>
          </div>
          <div className="social-icons">
            <a href="https://www.facebook.com/asemarest/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/asemarest" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/+970594804807" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" id="tiktok-link">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;