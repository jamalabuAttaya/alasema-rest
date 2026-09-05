import { memo, useCallback, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const INITIAL_FORM = Object.freeze({ name: '', phone: '', email: '', message: '' });
const WHATSAPP_NUMBER = '970594804807';

function ContactForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('');

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setStatus('');
    setFormData((current) => ({ ...current, [name]: value }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const message = language === 'ar'
      ? [
          'رسالة جديدة من موقع مطعم العاصمة',
          `الاسم: ${formData.name.trim()}`,
          `الهاتف: ${formData.phone.trim()}`,
          `البريد الإلكتروني: ${formData.email.trim()}`,
          `الرسالة: ${formData.message.trim()}`,
        ].join('\n')
      : [
          'New message from the ALASEMA website',
          `Name: ${formData.name.trim()}`,
          `Phone: ${formData.phone.trim()}`,
          `Email: ${formData.email.trim()}`,
          `Message: ${formData.message.trim()}`,
        ].join('\n');

    const whatsappUrl = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
    whatsappUrl.searchParams.set('text', message);
    setStatus(t('whatsappOpened'));
    window.location.assign(whatsappUrl.toString());
  }, [formData, language, t]);

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="contact-name">{t('formName')}</label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="80"
          autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-phone">{t('formPhone')}</label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          minLength="7"
          maxLength="20"
          pattern="[0-9+() -]{7,20}"
          inputMode="tel"
          autoComplete="tel"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">{t('formEmail')}</label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength="120"
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">{t('formMessage')}</label>
        <textarea
          id="contact-message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          minLength="3"
          maxLength="1000"
        />
      </div>

      <p id="contact-form-hint" className="form-hint">{t('formHint')}</p>
      {status && <p className="form-status" role="status">{status}</p>}

      <button type="submit" className="submit-btn" aria-describedby="contact-form-hint">
        <FaWhatsapp aria-hidden="true" />
        <span>{t('sendViaWhatsApp')}</span>
      </button>
    </form>
  );
}

export default memo(ContactForm);
