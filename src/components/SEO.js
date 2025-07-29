import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => {
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

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Russian Translation Services Mumbai | Language Liberty - Expert Russian Translator</title>
      <meta name="title" content="Russian Translation Services Mumbai | Language Liberty - Expert Russian Translator" />
      <meta name="description" content="Professional Russian translation & interpretation services in Mumbai. 6+ years experience. Document translation, online/offline meetings, Russian language courses. Call +91-8789389223" />
      <meta name="keywords" content="Russian translator Mumbai, Russian interpretation services, Russian document translation, Russian language course Mumbai, Russian English translator, professional Russian translator India" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Sabrina Bhatt - Language Liberty" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://languageliberty.com/" />
      <meta property="og:title" content="Russian Translation Services Mumbai | Language Liberty" />
      <meta property="og:description" content="Professional Russian translation & interpretation services in Mumbai. 6+ years experience. Get 20% OFF on first booking!" />
      <meta property="og:image" content="/images/sabrina-profile.jpeg" />
      <meta property="og:site_name" content="Language Liberty" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://languageliberty.com/" />
      <meta property="twitter:title" content="Russian Translation Services Mumbai | Language Liberty" />
      <meta property="twitter:description" content="Professional Russian translation & interpretation services in Mumbai. 6+ years experience." />
      <meta property="twitter:image" content="/images/sabrina-profile.jpeg" />
      
      {/* Additional SEO Tags */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Mumbai" />
      <meta name="geo.position" content="19.0760;72.8777" />
      <meta name="ICBM" content="19.0760, 72.8777" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://languageliberty.com/" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
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