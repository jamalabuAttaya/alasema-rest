import { useState, memo, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const INITIAL_FORM = Object.freeze({ name: '', phone: '', email: '', message: '' });
const PLACEHOLDERS = {
  ar: Object.freeze({ name: 'الاسم', phone: 'رقم الهاتف', email: 'البريد الإلكتروني', message: 'رسالتك...' }),
  en: Object.freeze({ name: 'Name', phone: 'Phone', email: 'Email', message: 'Your message...' }),
};

function ContactForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const msg = language === 'ar' ? '✓ تم استلام رسالتك! سنتواصل معك قريباً' : '✓ Message received! We will contact you soon';
    alert(msg);
    setFormData(INITIAL_FORM);
  }, [language]);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }, []);

  const placeholders = PLACEHOLDERS[language] || PLACEHOLDERS.ar;

  return (
    <form id="contactForm" className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder={placeholders.name} required className="contact-input" />
      </div>
      <div className="form-group">
        <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder={placeholders.phone} required className="contact-input" />
      </div>
      <div className="form-group">
        <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder={placeholders.email} required className="contact-input" />
      </div>
      <div className="form-group">
        <textarea id="message" rows="4" value={formData.message} onChange={handleChange} placeholder={placeholders.message} className="contact-input"></textarea>
      </div>
      <button type="submit" className="submit-btn">{t('send')}</button>
    </form>
  );
}

export default memo(ContactForm);