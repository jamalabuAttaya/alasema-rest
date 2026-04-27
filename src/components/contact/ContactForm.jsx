import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

function ContactForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = language === 'ar' 
      ? '✓ تم استلام رسالتك! سنتواصل معك قريباً'
      : '✓ Message received! We will contact you soon';
    alert(message);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          type="text" 
          id="name" 
          value={formData.name}
          onChange={handleChange}
          placeholder={language === 'ar' ? 'الاسم' : 'Name'} 
          required 
        />
      </div>
      <div className="form-group">
        <input 
          type="tel" 
          id="phone" 
          value={formData.phone}
          onChange={handleChange}
          placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone'} 
          required 
        />
      </div>
      <div className="form-group">
        <input 
          type="email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'} 
          required 
        />
      </div>
      <div className="form-group">
        <textarea 
          id="message" 
          rows="4" 
          value={formData.message}
          onChange={handleChange}
          placeholder={language === 'ar' ? 'رسالتك...' : 'Your message...'}
        ></textarea>
      </div>
      <button type="submit" className="submit-btn">
        <span>{t('send')}</span>
      </button>
    </form>
  );
}

export default ContactForm;