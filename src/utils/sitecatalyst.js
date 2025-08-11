// Analytics utility for SiteCatalyst tracking
class AnalyticsTracker {
  constructor() {
    this.isInitialized = false;
    this.events = [];
    this.initialize();
  }

  // Initialize SiteCatalyst/Adobe Analytics
  initialize() {
    try {
      // Check if Adobe Analytics is available
      if (typeof window !== 'undefined') {
        // Initialize Adobe Analytics if available
        if (window.s && typeof window.s === 'object') {
          this.isInitialized = true;
          console.log('Adobe Analytics initialized');
        } else {
          // Fallback to custom tracking
          this.initializeFallback();
        }
      }
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
      this.initializeFallback();
    }
  }

  // Fallback tracking system
  initializeFallback() {
    window.analyticsTracker = window.analyticsTracker || {
      events: [],
      pageViews: [],
      clicks: [],
      interactions: []
    };
    this.isInitialized = true;
    console.log('Fallback analytics initialized');
  }

  // Track page views
  trackPageView(pageName, section = '', language = 'en') {
    const event = {
      type: 'pageView',
      pageName,
      section,
      language,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    try {
      if (window.s && this.isInitialized) {
        // Adobe Analytics tracking
        window.s.pageName = pageName;
        window.s.channel = section;
        window.s.language = language;
        window.s.t();
      } else {
        // Fallback tracking
        window.analyticsTracker.pageViews.push(event);
      }
      
      console.log('Page view tracked:', event);
    } catch (error) {
      console.error('Page view tracking failed:', error);
    }
  }

  // Track clicks and interactions
  trackClick(elementName, elementType, section, additionalData = {}) {
    const event = {
      type: 'click',
      elementName,
      elementType,
      section,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      ...additionalData
    };

    try {
      if (window.s && this.isInitialized) {
        // Adobe Analytics event tracking
        window.s.linkTrackVars = 'events,prop1,prop2,prop3';
        window.s.linkTrackEvents = 'event1';
        window.s.events = 'event1';
        window.s.prop1 = elementName;
        window.s.prop2 = elementType;
        window.s.prop3 = section;
        window.s.tl(true, 'o', elementName);
      } else {
        // Fallback tracking
        window.analyticsTracker.clicks.push(event);
      }
      
      console.log('Click tracked:', event);
    } catch (error) {
      console.error('Click tracking failed:', error);
    }
  }

  // Track form submissions
  trackFormSubmission(formName, formData, success = true) {
    const event = {
      type: 'formSubmission',
      formName,
      success,
      timestamp: new Date().toISOString(),
      formData: this.sanitizeFormData(formData)
    };

    try {
      if (window.s && this.isInitialized) {
        window.s.linkTrackVars = 'events,eVar1,eVar2';
        window.s.linkTrackEvents = success ? 'event2' : 'event3';
        window.s.events = success ? 'event2' : 'event3';
        window.s.eVar1 = formName;
        window.s.eVar2 = success ? 'success' : 'error';
        window.s.tl(true, 'o', `Form ${formName}`);
      } else {
        window.analyticsTracker.interactions.push(event);
      }
      
      console.log('Form submission tracked:', event);
    } catch (error) {
      console.error('Form tracking failed:', error);
    }
  }

  // Track scrolling behavior
  trackScroll(section, scrollPercentage) {
    const event = {
      type: 'scroll',
      section,
      scrollPercentage,
      timestamp: new Date().toISOString()
    };

    try {
      if (window.s && this.isInitialized) {
        window.s.linkTrackVars = 'events,prop4,prop5';
        window.s.linkTrackEvents = 'event4';
        window.s.events = 'event4';
        window.s.prop4 = section;
        window.s.prop5 = scrollPercentage;
        window.s.tl(true, 'o', `Scroll ${section}`);
      } else {
        window.analyticsTracker.interactions.push(event);
      }
      
      console.log('Scroll tracked:', event);
    } catch (error) {
      console.error('Scroll tracking failed:', error);
    }
  }

  // Track language changes
  trackLanguageChange(newLanguage, previousLanguage) {
    const event = {
      type: 'languageChange',
      newLanguage,
      previousLanguage,
      timestamp: new Date().toISOString()
    };

    try {
      if (window.s && this.isInitialized) {
        window.s.linkTrackVars = 'events,eVar3,eVar4';
        window.s.linkTrackEvents = 'event5';
        window.s.events = 'event5';
        window.s.eVar3 = newLanguage;
        window.s.eVar4 = previousLanguage;
        window.s.tl(true, 'o', 'Language Change');
      } else {
        window.analyticsTracker.interactions.push(event);
      }
      
      console.log('Language change tracked:', event);
    } catch (error) {
      console.error('Language change tracking failed:', error);
    }
  }

  // Track gallery interactions
  trackGalleryInteraction(action, imageIndex, imageName) {
    const event = {
      type: 'galleryInteraction',
      action,
      imageIndex,
      imageName,
      timestamp: new Date().toISOString()
    };

    try {
      if (window.s && this.isInitialized) {
        window.s.linkTrackVars = 'events,prop6,prop7,prop8';
        window.s.linkTrackEvents = 'event6';
        window.s.events = 'event6';
        window.s.prop6 = action;
        window.s.prop7 = imageIndex;
        window.s.prop8 = imageName;
        window.s.tl(true, 'o', `Gallery ${action}`);
      } else {
        window.analyticsTracker.interactions.push(event);
      }
      
      console.log('Gallery interaction tracked:', event);
    } catch (error) {
      console.error('Gallery tracking failed:', error);
    }
  }

  // Sanitize form data for privacy
  sanitizeFormData(formData) {
    const sanitized = { ...formData };
    // Remove sensitive fields
    delete sanitized.email;
    delete sanitized.phone;
    delete sanitized.password;
    return sanitized;
  }

  // Get analytics data for debugging
  getAnalyticsData() {
    return window.analyticsTracker || {};
  }

  // Export analytics data
  exportAnalyticsData() {
    const data = this.getAnalyticsData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Create singleton instance
const analytics = new AnalyticsTracker();

// React hook for analytics
export const useAnalytics = () => {
  return {
    trackPageView: (pageName, section, language) => analytics.trackPageView(pageName, section, language),
    trackClick: (elementName, elementType, section, additionalData) => analytics.trackClick(elementName, elementType, section, additionalData),
    trackFormSubmission: (formName, formData, success) => analytics.trackFormSubmission(formName, formData, success),
    trackScroll: (section, scrollPercentage) => analytics.trackScroll(section, scrollPercentage),
    trackLanguageChange: (newLanguage, previousLanguage) => analytics.trackLanguageChange(newLanguage, previousLanguage),
    trackGalleryInteraction: (action, imageIndex, imageName) => analytics.trackGalleryInteraction(action, imageIndex, imageName),
    getAnalyticsData: () => analytics.getAnalyticsData(),
    exportAnalyticsData: () => analytics.exportAnalyticsData()
  };
};

export default analytics;
