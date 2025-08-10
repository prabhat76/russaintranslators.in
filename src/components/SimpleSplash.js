import React from 'react';

const SimpleSplash = ({ onComplete, currentLanguage }) => {
  console.log('SimpleSplash rendering with language:', currentLanguage); // Debug log

  React.useEffect(() => {
    console.log('SimpleSplash useEffect triggered'); // Debug log
    const timer = setTimeout(() => {
      console.log('SimpleSplash timer completed, calling onComplete'); // Debug log
      if (onComplete) {
        onComplete();
      }
    }, 4000); // Increased to 4 seconds
    
    return () => {
      console.log('SimpleSplash cleanup'); // Debug log
      clearTimeout(timer);
    };
  }, [onComplete]);

  console.log('SimpleSplash rendering JSX'); // Debug log

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #dc2626 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '3rem',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <img 
          src="/images/download.webp" 
          alt="Language Liberty Logo" 
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '20px',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '3px solid rgba(255,255,255,0.2)'
          }}
        />
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '900',
          marginBottom: '1rem',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Language Liberty
        </h1>
        <p style={{
          fontSize: '1.3rem',
          opacity: 0.9,
          marginBottom: '1.5rem'
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
          opacity: 0.8,
          fontStyle: 'italic'
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

export default SimpleSplash;
