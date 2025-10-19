import React from 'react';

const LanguageBanner = ({ currentLanguage }) => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="language-banner" style={{
      position: 'relative',
      padding: '0',
      overflow: 'hidden',
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #dbeafe 100%)',
      marginBottom: '-1px'  // Avoid gap between sections
    }}>
      {/* Background Flag SVG */}
      <div className="flag-background" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.12,
        backgroundImage: 'url(/images/download.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'float 15s ease-in-out infinite'
      }} />

      {/* Content Container */}
      <div className="banner-content" style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: '1000px',
        padding: '2rem',
        animation: 'fadeInUp 1s ease-out forwards'
      }}>
        <div className="banner-title" style={{
          display: 'inline-block',
          padding: '1rem 3rem',
          marginBottom: '2rem',
          background: 'rgba(30,64,175,0.1)',
          borderRadius: '50px',
          border: '2px solid rgba(30,64,175,0.2)',
          boxShadow: '0 10px 30px rgba(30,64,175,0.1)',
          backdropFilter: 'blur(10px)',
          animation: 'float 6s ease-in-out infinite'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            margin: 0,
            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Language Liberty
          </h2>
        </div>

        {/* Large Flag Image */}
        <div className="flag-image-container" style={{
          position: 'relative',
          margin: '0 auto 3rem',
          width: '100%',
          maxWidth: '700px',
          animation: 'float 8s ease-in-out infinite'
        }}>
          <img 
            src="/images/download.webp" 
            alt="Russia-India Translation - Professional Unity" 
            className="flag-image"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '20px',
              boxShadow: '0 20px 50px rgba(30,64,175,0.3)',
              transform: 'rotate(-2deg)',
              transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              objectFit: 'cover'
            }}
          />
          
          {/* Decorative Elements */}
          <div className="flag-badge" style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
            color: 'white',
            borderRadius: '50%',
            width: '90px',
            height: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 10px 30px rgba(30,64,175,0.4)',
            border: '3px solid white',
            animation: 'float 5s ease-in-out infinite reverse'
          }}>
            🌍
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={scrollToAbout}
          className="meet-translator-button"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '1.25rem 3rem',
            fontSize: '1.2rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 15px 35px rgba(30,64,175,0.3)',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeInUp 1s ease-out 0.5s forwards',
            opacity: 0
          }}
        >
          {currentLanguage === 'ru' ? 'Познакомьтесь с переводчиком' : 'Meet Your Translator'}
          
          {/* Button Light Effect */}
          <span className="button-light" style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0))',
            transform: 'rotate(30deg)',
            transition: 'all 0.8s ease',
            opacity: 0
          }}></span>
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .meet-translator-button:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 20px 40px rgba(30,64,175,0.4);
        }
        
        .meet-translator-button:hover .button-light {
          opacity: 1;
          transform: rotate(30deg) translate(50%, -50%);
        }
        
        .flag-image:hover {
          transform: rotate(0deg) scale(1.05);
          box-shadow: 0 25px 60px rgba(30,64,175,0.5);
        }
        
        @media (max-width: 768px) {
          .banner-title h2 {
            font-size: 1.8rem;
          }
          
          .flag-badge {
            width: 70px;
            height: 70px;
            font-size: 1.6rem;
            top: -10px;
            right: -10px;
          }
          
          .meet-translator-button {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default LanguageBanner;
