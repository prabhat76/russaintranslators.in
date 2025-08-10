import React, { useState, useEffect } from 'react';

const LanguageToggle = ({ currentLanguage, switchLanguage }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
      
      // Check if header is visible
      const header = document.querySelector('.header');
      if (header) {
        const headerRect = header.getBoundingClientRect();
        setIsHeaderVisible(headerRect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    const newLang = currentLanguage === 'en' ? 'ru' : 'en';
    switchLanguage(newLang);
    
    // Add switching animation
    const button = document.querySelector('.language-toggle');
    if (button) {
      button.classList.add('switching');
      setTimeout(() => button.classList.remove('switching'), 300);
    }
  };

  // Don't show floating toggle if header is visible
  if (isHeaderVisible) {
    return null;
  }

  return (
    <button 
      className={`language-toggle ${isScrolled ? 'scrolled' : ''}`}
      onClick={handleToggle}
      data-lang={currentLanguage.toUpperCase()}
      aria-label={`Switch to ${currentLanguage === 'en' ? 'Russian' : 'English'}`}
    >
      {currentLanguage === 'en' ? '🇷🇺 Русский' : '🇺🇸 English'}
    </button>
  );
};

export default LanguageToggle;
