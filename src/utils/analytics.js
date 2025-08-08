import { addDoc, collection } from 'firebase/firestore';
import { ref, push } from 'firebase/database';
import { db, rtdb } from '../firebase';

export const trackEvent = async (eventName, properties = {}) => {
  const eventData = {
    event: eventName,
    properties,
    timestamp: new Date(),
    sessionId: getSessionId(),
    userId: getUserId(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    referrer: document.referrer
  };
  
  try {
    // Store in Firestore
    await addDoc(collection(db, 'analytics'), eventData);
    
    // Push to Realtime Database
    await push(ref(rtdb, 'analytics'), {
      ...eventData,
      timestamp: Date.now()
    });
    
    console.log('📊 Event tracked:', eventName);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// Predefined events
export const analytics = {
  pageView: (page) => trackEvent('page_view', { page }),
  formSubmit: (formType, data) => trackEvent('form_submit', { formType, ...data }),
  buttonClick: (buttonName, location) => trackEvent('button_click', { buttonName, location }),
  languageSwitch: (from, to) => trackEvent('language_switch', { from, to }),
  serviceView: (service) => trackEvent('service_view', { service }),
  galleryView: (image) => trackEvent('gallery_view', { image }),
  contactAttempt: (method) => trackEvent('contact_attempt', { method }),
  quoteRequest: (service, amount) => trackEvent('quote_request', { service, amount }),
  liveChatOpen: () => trackEvent('live_chat_open'),
  liveChatMessage: (messageType) => trackEvent('live_chat_message', { messageType })
};