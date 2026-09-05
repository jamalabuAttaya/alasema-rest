import { memo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Seo from '../components/common/Seo';
import PageHeading from '../components/common/PageHeading';

function GalleryPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo titleKey="gallerySeoTitle" descriptionKey="galleryDescription" path="/gallery" />
      <section className="gallery-page">
        <div className="container">
          <PageHeading
            eyebrow={t('galleryKicker')}
            title={t('galleryTitle')}
            subtitle={t('gallerySubtitle')}
          />
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}

export default memo(GalleryPage);
