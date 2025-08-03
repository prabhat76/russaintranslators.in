import { useState, useCallback } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, push } from 'firebase/database';
import { db, rtdb, mockFirebaseOps } from '../firebase';
import { sendContactEmail } from '../utils/emailService';
import { analytics } from '../utils/analytics';

export const useForm = (initialState, currentLanguage) => {
  const [formData, setFormData] = useState(initialState);
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track form submission
      analytics.formSubmit('quote_request', {
        service: formData.service,
        language: currentLanguage,
        hasPhone: !!formData.phone
      });
      
      // Log user credentials
      console.log('User Quote Request:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        language: currentLanguage,
        timestamp: new Date().toISOString(),
        ip: 'logged',
        userAgent: navigator.userAgent
      });
      
      if (!mockFirebaseOps) {
        // Store in contacts collection
        await addDoc(collection(db, 'contacts'), {
          ...formData,
          language: currentLanguage,
          timestamp: new Date(),
          status: 'new',
          ip: 'logged',
          userAgent: navigator.userAgent
        });
        
        // Store in quotes collection for admin tracking
        await addDoc(collection(db, 'quotes'), {
          ...formData,
          language: currentLanguage,
          timestamp: new Date(),
          status: 'pending'
        });
        
        // Push to Realtime Database
        await push(ref(rtdb, 'quotes'), {
          ...formData,
          language: currentLanguage,
          timestamp: Date.now(),
          status: 'pending'
        });
        
        // Send emails to both client and admin
        await sendContactEmail({ ...formData, language: currentLanguage });
      }
      
      setFormStatus(currentLanguage === 'en' ? 'Thank you! We will contact you soon.' : 'Спасибо! Мы свяжемся с вами в ближайшее время.');
      setFormData(initialState);
    } catch (error) {
      console.warn('Form submission error:', error.message);
      setFormStatus(currentLanguage === 'en' ? 'Thank you! We will contact you soon.' : 'Спасибо! Мы свяжемся с вами в ближайшее время.');
      setFormData(initialState);
    }
    
    setIsSubmitting(false);
    setTimeout(() => setFormStatus(''), 5000);
  }, [formData, currentLanguage, initialState]);

  return {
    formData,
    formStatus,
    isSubmitting,
    handleInputChange,
    handleFormSubmit
  };
};