import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import ContactForm from '../components/contact/ContactForm';

function ContactPage() {
  const { t } = useLanguage();

  const contactDetails = [
    { icon: 'fa-map-marker-alt', title: t('address'), text: 'النصيرات - دوار أبو صرار، غزة' },
    { icon: 'fa-phone', title: t('phone'), text: '+970594804807' },
    { icon: 'fa-envelope', title: t('email'), text: 'asemarest@gmail.com' },
    { icon: 'fab fa-whatsapp', title: t('whatsapp'), text: '+970594804807' },
  ];

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
                    <i className={`fas ${item.icon}`}></i>
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
                  <a href="https://www.facebook.com/asemarest/" target="_blank" rel="noopener noreferrer" className="social-circle fb">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/asemarest" target="_blank" rel="noopener noreferrer" className="social-circle ig">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://wa.me/+970594804807" target="_blank" rel="noopener noreferrer" className="social-circle wa">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a href="#" className="social-circle tt" id="tiktok-contact">
                    <i className="fab fa-tiktok"></i>
                  </a>
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
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217124.38565334815!2d34.32847665!3d31.44847635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd7f2a2a5b5b5b%3A0x0!2zMzHCsDI2JzU0LjUiTiAzNMKwMjAnMzAuMCJF!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s" 
                width="100%" 
                height="250" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;