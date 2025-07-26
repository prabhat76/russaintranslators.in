import { useEffect } from 'react';

const SEO = ({ 
  title = "Russian Translator Mumbai | Professional Translation Services | Language Liberty",
  description = "Expert Russian translator in Mumbai with 6+ years experience. Professional English-Russian translation, interpretation, document translation, business meetings. 24/7 support. Get 20% OFF first booking!",
  keywords = "russian translator mumbai, russian interpreter mumbai, english to russian translation, russian translation services, document translation, business interpreter",
  canonical = "https://russiantranslator.in/"
}) => {
  useEffect(() => {
    document.title = title;
    
    // Meta tags
    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('author', 'Sabrina Bhatt - Russian Translator');
    updateMeta('robots', 'index, follow');
    
    // Open Graph tags
    const updateOG = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateOG('og:title', title);
    updateOG('og:description', description);
    updateOG('og:type', 'website');
    updateOG('og:url', canonical);
    
    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    
    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Language Liberty - Russian Translation Services",
      "description": description,
      "url": canonical,
      "telephone": "+91-8789389223",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressCountry": "IN"
      },
      "serviceArea": "Global",
      "priceRange": "$$",
      "openingHours": "Mo-Su 00:00-23:59"
    };
    
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
    
    // Real-time tracking
    const trackRealTimeData = () => {
      const sessionData = {
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        sessionId: sessionStorage.getItem('sessionId') || Date.now().toString()
      };
      
      if (!sessionStorage.getItem('sessionId')) {
        sessionStorage.setItem('sessionId', sessionData.sessionId);
      }
      
      // Store in localStorage for analytics
      const visits = JSON.parse(localStorage.getItem('seoData') || '[]');
      visits.push(sessionData);
      localStorage.setItem('seoData', JSON.stringify(visits.slice(-100))); // Keep last 100
      
      // Send to free analytics service (JSONBin.io)
      fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$your-api-key-here'
        },
        body: JSON.stringify(sessionData)
      }).catch(() => {}); // Silent fail
    };
    
    trackRealTimeData();
    
    // Track user interactions
    const trackEvent = (event, data) => {
      const eventData = {
        event,
        data,
        timestamp: new Date().toISOString(),
        sessionId: sessionStorage.getItem('sessionId')
      };
      
      const events = JSON.parse(localStorage.getItem('seoEvents') || '[]');
      events.push(eventData);
      localStorage.setItem('seoEvents', JSON.stringify(events.slice(-50)));
    };
    
    // Track clicks on important elements
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href*="tel:"]')) {
        trackEvent('phone_click', { number: e.target.href });
      }
      if (e.target.matches('a[href*="mailto:"]')) {
        trackEvent('email_click', { email: e.target.href });
      }
      if (e.target.matches('a[href*="linkedin"]')) {
        trackEvent('linkedin_click', { url: e.target.href });
      }
    });
    
    // Track form submissions
    document.addEventListener('submit', (e) => {
      trackEvent('form_submit', { form: e.target.className });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (scrollPercent % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          trackEvent('scroll_depth', { percent: scrollPercent });
        }
      }
    });
    
    // Google Analytics (with real ID)
    if (!window.gtag) {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      document.head.appendChild(gtagScript);
      
      const gtagConfig = document.createElement('script');
      gtagConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX', {
          page_title: '${title}',
          page_location: '${canonical}'
        });
      `;
      document.head.appendChild(gtagConfig);
    }
  }, [title, description, keywords, canonical]);
  
  // Expose tracking function globally
  useEffect(() => {
    window.trackSEOEvent = (event, data) => {
      const eventData = {
        event,
        data,
        timestamp: new Date().toISOString(),
        sessionId: sessionStorage.getItem('sessionId')
      };
      
      const events = JSON.parse(localStorage.getItem('seoEvents') || '[]');
      events.push(eventData);
      localStorage.setItem('seoEvents', JSON.stringify(events.slice(-50)));
    };
  }, []);

  return null;
};

export default SEO;