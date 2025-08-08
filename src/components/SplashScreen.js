import React, { useState, useEffect } from 'react';

const SplashScreen = ({ 
  onComplete, 
  duration = 2000, 
  currentLanguage = 'en',
  isVisible = true 
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('initial');

  // Content for both languages
  const content = {
    en: {
      welcome: "Welcome to",
      brand: "Russian Translators",
      tagline: "Professional Russian-English Translation Services"
    },
    ru: {
      welcome: "Добро пожаловать в",
      brand: "Русские переводчики",
      tagline: "Профессиональные услуги русско-английского перевода"
    }
  };

  const currentContent = content[currentLanguage] || content.en;

  useEffect(() => {
    if (!isVisible) return;

    // Reset states when component becomes visible
    setIsComplete(false);
    setAnimationPhase('initial');

    // Animation sequence timing
    const timers = [];

    // Phase 1: Initial fade in
    timers.push(setTimeout(() => {
      setAnimationPhase('fadeIn');
    }, 300));

    // Phase 2: Brand reveal
    timers.push(setTimeout(() => {
      setAnimationPhase('brandReveal');
    }, 800));

    // Complete animation
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
      }, 800);
    }, duration);

    timers.push(completeTimer);

    return () => {
      // Cleanup all timers
      timers.forEach(timer => {
        if (timer) {
          clearTimeout(timer);
        }
      });
    };
  }, [isVisible, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`splash-screen ${isComplete ? 'complete' : ''}`}>
      {/* Animated background orbs */}
      <div className="splash-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Main content */}
      <div className="splash-content">
        <div className={`splash-main ${animationPhase}`}>
          {/* Logo */}
          <div className="splash-logo">
            <img 
              src="/images/download.webp" 
              alt="Language Liberty Logo" 
              className="logo-image"
            />
          </div>

          {/* Text content */}
          <div className="splash-text">
            <div className="welcome-text">
              {currentContent.welcome}
            </div>
            <h1 className="brand-name">
              {currentContent.brand}
            </h1>
            <div className="tagline">
              {currentContent.tagline}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
