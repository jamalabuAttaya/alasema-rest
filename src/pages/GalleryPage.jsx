import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import GalleryGrid from '../components/gallery/GalleryGrid';

function GalleryPage() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('gallery')} | {t('restaurantName')}</title>
      </Helmet>
      <section className="gallery-page">
        <div className="container">
          <h2 className="page-title">
            <span className="title-ar">{t('galleryTitle')}</span>
            <span className="title-en">{t('galleryTitle')}</span>
          </h2>
          <p className="page-subtitle">{t('gallerySubtitle')}</p>
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}

export default memo(GalleryPage);