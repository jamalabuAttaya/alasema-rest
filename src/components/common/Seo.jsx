import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';

const BASE_URL = 'https://alasema-rest.vercel.app';

function Seo({ titleKey, descriptionKey, path = '/', noIndex = false, includeCanonical = true }) {
  const { t, language } = useLanguage();
  const title = t(titleKey);
  const description = t(descriptionKey);
  const canonicalUrl = `${BASE_URL}${path === '/' ? '/' : path}`;
  const locale = language === 'ar' ? 'ar_PS' : 'en_US';
  const alternateLocale = language === 'ar' ? 'en_US' : 'ar_PS';

  return (
    <Helmet>
      <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={t('seoKeywords')} />
      <meta name="author" content={t('developerName')} />
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      {includeCanonical && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={t('restaurantName')} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {includeCanonical && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default memo(Seo);
