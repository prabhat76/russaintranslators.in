import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  language = 'en',
  customStructuredData = null 
}) => {
  const defaultTitle = language === 'en' 
    ? "Language Liberty - Professional Russian Translation Services" 
    : "Language Liberty - Профессиональные услуги перевода с русского языка";
  
  const defaultDescription = language === 'en'
    ? "Expert Russian translation services with cultural sensitivity and professional accuracy. Get instant quotes and fast delivery for all your translation needs."
    : "Экспертные услуги перевода с русского языка с учетом культурных особенностей и профессиональной точностью. Получите мгновенную цену и быструю доставку для всех ваших потребностей в переводе.";

  const defaultKeywords = language === 'en'
    ? "Russian translation, professional translator, document translation, certified translation, Russian language services"
    : "русский перевод, профессиональный переводчик, перевод документов, сертифицированный перевод, услуги русского языка";

  const siteUrl = "https://languageliberty.com";
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalUrl = url || siteUrl;
  const finalImage = image || `${siteUrl}/images/og-image.jpg`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Language Liberty - Russian Translation Services",
    "description": "Professional Russian translation and interpretation services in Mumbai. Expert Russian-English translator with 6+ years experience.",
    "url": "https://languageliberty.com",
    "telephone": "+91-8789389223",
    "email": "sabrina@languageliberty.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.0760",
      "longitude": "72.8777"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "₹₹",
    "serviceArea": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Translation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Russian Document Translation",
            "description": "Professional Russian to English document translation services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Russian Interpretation",
            "description": "Live Russian interpretation for meetings and conferences"
          }
        }
      ]
    }
  };

  const jsonLd = customStructuredData || structuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language === 'en' ? 'English' : 'Russian'} />
      <meta name="author" content="Language Liberty" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Favicon */}
      <link rel="icon" type="image/webp" href="/images/download.webp" />
      <link rel="shortcut icon" type="image/webp" href="/images/download.webp" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="Language Liberty" />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : 'ru_RU'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      <meta property="twitter:creator" content="@languageliberty" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-navbutton-color" content="#667eea" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
      <link rel="alternate" hrefLang="ru" href={`${siteUrl}/ru`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </script>
    </Helmet>
  );
};

export default SEO;