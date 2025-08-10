import React, { useState, useCallback } from 'react';

// Splash Screen Component
const SplashScreen = ({ onComplete, currentLanguage }) => {
  React.useEffect(() => {
    console.log('SplashScreen mounted');
    const timer = setTimeout(() => {
      console.log('SplashScreen timer complete');
      if (onComplete) {
        onComplete();
      }
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: '#1e3a8a',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(30,58,138,0.05)',
        padding: '3rem',
        borderRadius: '20px',
        border: '1px solid rgba(30,58,138,0.1)',
        boxShadow: '0 20px 40px rgba(30,58,138,0.1)'
      }}>
        <img 
          src="/images/download.webp" 
          alt="Language Liberty Logo" 
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '20px',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(30,58,138,0.2)',
            border: '2px solid rgba(30,58,138,0.1)'
          }}
        />
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '900',
          marginBottom: '1rem',
          color: '#1e3a8a',
          textShadow: 'none'
        }}>
          Language Liberty
        </h1>
        <p style={{
          fontSize: '1.3rem',
          opacity: 0.8,
          marginBottom: '1.5rem',
          color: '#475569'
        }}>
          {currentLanguage === 'ru' 
            ? 'Профессиональные услуги русско-английского перевода'
            : 'Professional Russian-English Translation Services'
          }
        </p>
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          🇺🇸 ⟷ 🇷🇺
        </div>
        <div style={{
          fontSize: '1rem',
          opacity: 0.7,
          fontStyle: 'italic',
          color: '#64748b'
        }}>
          {currentLanguage === 'ru' 
            ? 'Преодолеваем языковые барьеры'
            : 'Breaking Language Barriers'
          }
        </div>
      </div>
    </div>
  );
};

// Main Website Content - will be imported as lazy component
const MainContent = React.lazy(() => import('./AppTest'));

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentLanguage] = useState(() => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ru') ? 'ru' : 'en';
  });

  console.log('App rendering - showSplash:', showSplash);

  const handleSplashComplete = useCallback(() => {
    console.log('Splash complete called');
    setShowSplash(false);
  }, []);

  // Check if current path is admin
  const isAdminRoute = window.location.pathname === '/admin';
  
  if (isAdminRoute) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Admin Panel</h1>
        <p>Admin functionality will be restored.</p>
      </div>
    );
  }

  if (showSplash) {
    return (
      <SplashScreen
        onComplete={handleSplashComplete}
        currentLanguage={currentLanguage}
      />
    );
  }

  return <MainContent />;
}

export default App;
