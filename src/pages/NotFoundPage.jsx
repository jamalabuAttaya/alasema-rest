import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Seo from '../components/common/Seo';

function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        titleKey="notFoundSeoTitle"
        descriptionKey="notFoundText"
        noIndex
        includeCanonical={false}
      />
      <section className="not-found-page">
        <div className="container not-found-content">
          <span className="not-found-code" aria-hidden="true">404</span>
          <h1>{t('notFoundTitle')}</h1>
          <p>{t('notFoundText')}</p>
          <Link to="/" className="hero-btn primary">{t('backHome')}</Link>
        </div>
      </section>
    </>
  );
}

export default memo(NotFoundPage);
