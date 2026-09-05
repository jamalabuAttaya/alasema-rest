import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import ContactForm from '../components/contact/ContactForm';
import Seo from '../components/common/Seo';
import PageHeading from '../components/common/PageHeading';
import { spring } from '../animations/motionVariants';

const SOCIAL_LINKS = Object.freeze([
  { href: 'https://www.facebook.com/asemarest/', Icon: FaFacebookF, className: 'social-circle fb', label: 'Facebook' },
  { href: 'https://www.instagram.com/asemarest', Icon: FaInstagram, className: 'social-circle ig', label: 'Instagram' },
  { href: 'https://wa.me/970594804807', Icon: FaWhatsapp, className: 'social-circle wa', label: 'WhatsApp' },
]);

const PHONE_TEXT = '+970 59 480 4807';
const PHONE_LINK = '+970594804807';
const EMAIL_TEXT = 'asemarest@gmail.com';

function ContactPage() {
  const { t } = useLanguage();
  const contactDetails = useMemo(() => [
    { Icon: FaMapMarkerAlt, title: t('address'), text: t('addressText') },
    { Icon: FaPhone, title: t('phone'), text: PHONE_TEXT, href: `tel:${PHONE_LINK}` },
    { Icon: FaEnvelope, title: t('email'), text: EMAIL_TEXT, href: `mailto:${EMAIL_TEXT}` },
    { Icon: FaWhatsapp, title: t('whatsapp'), text: PHONE_TEXT, href: 'https://wa.me/970594804807', external: true },
  ], [t]);

  return (
    <>
      <Seo titleKey="contactSeoTitle" descriptionKey="contactDescription" path="/contact" />

      <section className="contact-page">
        <div className="container">
          <PageHeading
            eyebrow={t('contactKicker')}
            title={t('getInTouch')}
            subtitle={t('contactPageIntro')}
          />

          <motion.div
            className="contact-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={spring}
          >
            <div className="contact-info-side">
              <div className="contact-details-list">
                {contactDetails.map(({ Icon, title, text, href, external }) => (
                  <div className="contact-detail-item" key={title}>
                    <span className="contact-icon"><Icon aria-hidden="true" /></span>
                    <div>
                      <h2>{title}</h2>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {text}
                        </a>
                      ) : <p>{text}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-links-section">
                <h2>{t('followUs')}</h2>
                <div className="social-icons-large">
                  {SOCIAL_LINKS.map(({ href, Icon, className, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                      aria-label={label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-form-side">
              <ContactForm />
            </div>
          </motion.div>

          <motion.div
            className="map-section"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.08, ...spring }}
          >
            <h2>{t('ourLocation')}</h2>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217124.38565334815!2d34.32847665!3d31.44847635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd7f2a2a5b5b5b%3A0x0!2zMzHCsDI2JzU0LjUiTiAzNMKwMjAnMzAuMCJF!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title={t('ourLocation')}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default memo(ContactPage);
