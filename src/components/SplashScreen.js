import React, { useState, useEffect } from 'react';

const SplashScreen = ({ 
  onComplete, 
  duration = 2000, 
  currentLanguage = 'en',
  isVisible = true 
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('initial');

  console.log('SplashScreen rendering - isVisible:', isVisible, 'duration:', duration); // Debug log

  // Content for both languages
  const content = {
    en: {
      welcome: "Welcome to",
      brand: "Language Liberty",
      tagline: "Professional Russian-English Translation Services",
      subtitle: "Breaking Language Barriers with Excellence"
    },
    ru: {
      welcome: "Добро пожаловать в",
      brand: "Language Liberty",
      tagline: "Профессиональные услуги русско-английского перевода",
      subtitle: "Преодолеваем языковые барьеры с превосходством"
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

  if (!isVisible) {
    console.log('SplashScreen not visible, returning null'); // Debug log
    return null;
  }

  console.log('SplashScreen rendering JSX'); // Debug log

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
            <div className="logo-glow"></div>
          </div>

          {/* Text content */}
          <div className="splash-text">
            <div className="welcome-text">
              {currentContent.welcome}
            </div>
            <h1 className="brand-name">
              <span className="brand-text">{currentContent.brand}</span>
            </h1>
            <div className="tagline">
              {currentContent.tagline}
            </div>
            <div className="subtitle">
              {currentContent.subtitle}
            </div>
          </div>

          {/* Language flags */}
          <div className="language-flags">
            <span className="flag">🇺🇸</span>
            <span className="separator">⟷</span>
            <span className="flag">🇷🇺</span>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="splash-loader">
          <div className="loader-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
