import { memo, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import ContactForm from '../components/contact/ContactForm';

const SOCIAL_LINKS = Object.freeze([
  { href: 'https://www.facebook.com/asemarest/', icon: 'fa-facebook-f', className: 'social-circle fb', label: 'Facebook' },
  { href: 'https://www.instagram.com/asemarest', icon: 'fa-instagram', className: 'social-circle ig', label: 'Instagram' },
  { href: 'https://wa.me/+970594804807', icon: 'fa-whatsapp', className: 'social-circle wa', label: 'WhatsApp' },
  { href: '#', icon: 'fa-tiktok', className: 'social-circle tt', label: 'TikTok' },
]);

const CONTACT_ICONS = Object.freeze(['fa-map-marker-alt', 'fa-phone', 'fa-envelope', 'fab fa-whatsapp']);
const ADDRESS_TEXT = 'النصيرات - دوار أبو صرار، غزة';
const PHONE_TEXT = '+970594804807';
const EMAIL_TEXT = 'asemarest@gmail.com';

function ContactPage() {
  const { t } = useLanguage();

  const contactDetails = useMemo(() => [
    { icon: CONTACT_ICONS[0], title: t('address'), text: ADDRESS_TEXT },
    { icon: CONTACT_ICONS[1], title: t('phone'), text: PHONE_TEXT },
    { icon: CONTACT_ICONS[2], title: t('email'), text: EMAIL_TEXT },
    { icon: CONTACT_ICONS[3], title: t('whatsapp'), text: PHONE_TEXT },
  ], [t]);

  return (
    <>
      <Helmet>
        <title>{t('contact')} | {t('restaurantName')}</title>
      </Helmet>
      <section className="contact-page">
        <div className="container">
          <h2 className="page-title">
            <span className="title-ar">{t('getInTouch')}</span>
            <span className="title-en">{t('getInTouch')}</span>
          </h2>
          <div className="contact-wrapper">
            <div className="contact-info-side">
              <div className="contact-details-list">
                {contactDetails.map((item, index) => (
                  <div className="contact-detail-item" key={index}>
                    <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="social-links-section">
                <h3>{t('followUs')}</h3>
                <div className="social-icons-large">
                  {SOCIAL_LINKS.map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={social.className} aria-label={social.label}>
                      <i className={`fab ${social.icon}`} aria-hidden="true"></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="contact-form-side">
              <ContactForm />
            </div>
          </div>
          <div className="map-section">
            <h3>{t('ourLocation')}</h3>
            <div className="map-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217124.38565334815!2d34.32847665!3d31.44847635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd7f2a2a5b5b5b%3A0x0!2zMzHCsDI2JzU0LjUiTiAzNMKwMjAnMzAuMCJF!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s" width="100%" height="250" style={{border:0}} allowFullScreen="" loading="lazy" title="Location Map" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(ContactPage);