import { memo, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import MenuContainer from '../components/menu/MenuContainer';

function MenuPage() {
  const { t } = useLanguage();
  const menuKey = useMemo(() => Date.now().toString(36), []);

  return (
    <>
      <Helmet>
        <title>{t('menu')} | {t('restaurantName')}</title>
      </Helmet>
      <section className="menu-page">
        <div className="container">
          <h2 className="page-title">
            <span className="title-ar">{t('menuTitle')}</span>
            <span className="title-en">{t('menuTitle')}</span>
          </h2>
          <p className="page-subtitle">{t('menuSubtitle')}</p>
          <div className="order-buttons">
            <a href="https://wa.me/+970594804807" target="_blank" rel="noopener noreferrer" className="order-btn whatsapp-btn">
              <i className="fab fa-whatsapp"></i> <span>{t('orderViaWhatsApp')}</span>
            </a>
            <a href="tel:0594804807" className="order-btn call-btn">
              <i className="fas fa-phone-alt"></i> <span>{t('callNow')}</span>
            </a>
          </div>
          <div id="menu-container">
            <MenuContainer key={menuKey} />
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(MenuPage);