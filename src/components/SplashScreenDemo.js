import React, { useState } from 'react';
import SplashScreen from './SplashScreen';

const SplashScreenDemo = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const resetDemo = () => {
    setShowSplash(true);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'ru' : 'en');
    setShowSplash(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {showSplash && (
        <SplashScreen
          onComplete={handleSplashComplete}
          duration={3000}
          currentLanguage={currentLanguage}
          isVisible={showSplash}
        />
      )}
      
      {!showSplash && (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>Welcome to Russian Translators!</h1>
          <p>The splash screen has completed loading.</p>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
            <button 
              onClick={resetDemo}
              style={{
                padding: '12px 24px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Show Splash Again
            </button>
            
            <button 
              onClick={toggleLanguage}
              style={{
                padding: '12px 24px',
                backgroundColor: '#764ba2',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Switch to {currentLanguage === 'en' ? 'Russian' : 'English'}
            </button>
          </div>
          
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            Current Language: {currentLanguage === 'en' ? 'English' : 'Русский'}
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreenDemo;
