import { memo } from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import MenuContainer from '../components/menu/MenuContainer';
import Seo from '../components/common/Seo';
import PageHeading from '../components/common/PageHeading';

function MenuPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo titleKey="menuSeoTitle" descriptionKey="menuDescription" path="/menu" />

      <section className="menu-page">
        <div className="container">
          <PageHeading
            eyebrow={t('menuKicker')}
            title={t('menuTitle')}
            subtitle={t('menuSubtitle')}
          />

          <motion.div
            className="order-buttons"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.45 }}
          >
            <a
              href="https://wa.me/970594804807"
              target="_blank"
              rel="noopener noreferrer"
              className="order-btn whatsapp-btn"
            >
              <FaWhatsapp aria-hidden="true" />
              <span>{t('orderViaWhatsApp')}</span>
            </a>
            <a href="tel:+970594804807" className="order-btn call-btn">
              <FaPhoneAlt aria-hidden="true" />
              <span>{t('callNow')}</span>
            </a>
          </motion.div>

          <div id="menu-container">
            <MenuContainer />
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(MenuPage);
