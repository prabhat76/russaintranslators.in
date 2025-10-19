import React from 'react';
import '../../styles/sections/hero.css';

const Hero = ({ content, currentLanguage }) => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      color: 'var(--primary-color)',
      minHeight: '90vh',
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Enhanced Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(30,58,138,0.03) 0%, transparent 60%),
          linear-gradient(45deg, transparent 40%, rgba(59,130,246,0.01) 50%, transparent 60%)
        `,
        zIndex: 1
      }}></div>
      
      {/* Premium Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '8%',
        width: '150px',
        height: '150px',
        border: '1px solid rgba(59,130,246,0.08)',
        borderRadius: '50%',
        zIndex: 1,
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '100px',
        height: '100px',
        border: '1px solid rgba(71,85,105,0.06)',
        borderRadius: '50%',
        zIndex: 1,
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      
      {/* Decorative Circles */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        border: '1px solid rgba(59,130,246,0.07)',
        borderRadius: '50%',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        border: '1px solid rgba(59,130,246,0.07)',
        borderRadius: '50%',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '25%',
        width: '150px',
        height: '150px',
        border: '1px solid rgba(59,130,246,0.07)',
        borderRadius: '50%',
        zIndex: 1
      }}></div>

      {/* Main Content */}
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '3rem 2rem',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        {/* Two-column layout for flag and content */}
        <div style={{
          display: 'flex',
          width: '100%',
          position: 'relative',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Left Column - Flag */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45%',
            position: 'relative',
            animation: 'fadeInUp 1s ease-out'
          }}>
            <div style={{
              width: '100%',
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.05), rgba(30, 64, 175, 0.08))',
              padding: '8px',
              backdropFilter: 'blur(10px)',
            }}>
              <img 
                src="/images/download.webp" 
                alt="Professional Translation Services - International Unity and Collaboration" 
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  animation: 'imageEnhance 8s ease-in-out infinite, premiumGlow 6s ease-in-out infinite',
                  boxShadow: '0 30px 60px rgba(30, 58, 138, 0.4), 0 15px 30px rgba(59, 130, 246, 0.2)',
                  borderRadius: '16px',
                  border: '3px solid rgba(255, 255, 255, 0.9)',
                  transform: 'translateY(0px)',
                  transition: 'all 0.5s ease-out',
                  objectFit: 'cover',
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                }}
              />
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3vw, 2.75rem)',
              fontWeight: '900',
              background: 'linear-gradient(to right, #1e3a8a, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.02em',
              animation: 'fadeInUp 1s ease-out 0.2s both',
              marginTop: '2rem',
              textAlign: 'center',
              width: '100%',
              textTransform: 'uppercase'
            }}>
              Language Liberty
            </h2>
          </div>
          
          {/* Right Column - Content */}
          <div style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative'
          }}>
            {/* Hero Badge */}
            <div style={{
              display: 'inline-block',
              padding: '0.6rem 1.8rem',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(30,58,138,0.15))',
              borderRadius: '50px',
              marginBottom: '1.8rem',
              backdropFilter: 'blur(10px)',
              animation: 'fadeInUp 1s ease-out 0.4s both',
              border: '1px solid rgba(59,130,246,0.2)'
            }}>
              <span style={{
                fontSize: '0.95rem',
                background: 'linear-gradient(to right, #3b82f6, #1e3a8a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '8px', fontSize: '1.1rem' }}>🏆</span>
                {currentLanguage === 'ru' ? 'Профессиональный русский перевод' : 'Professional Russian Translation'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: '900',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              background: 'linear-gradient(to right, #1e3a8a, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'fadeInUp 1s ease-out 0.6s both',
              textAlign: 'left',
              letterSpacing: '-0.02em'
            }}>
              {currentLanguage === 'ru' ? (
                <>
                  Экспертные<br />
                  <span style={{ color: '#3b82f6' }}>русские</span><br />
                  переводы
                </>
              ) : (
                <>
                  EXPERT<br />
                  RUSSIAN<br />
                  TRANSLATION<br />
                  SERVICES
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              lineHeight: '1.8',
              marginBottom: '2.5rem',
              animation: 'fadeInUp 1s ease-out 0.8s both',
              textAlign: 'left',
              maxWidth: '95%',
              fontWeight: '400',
              letterSpacing: '0.01em'
            }}>
              {currentLanguage === 'ru' 
                ? 'Профессиональные, точные и культурно осведомленные услуги русского перевода для предприятий, частных лиц и организаций по всему миру.'
                : 'Professional, accurate, and culturally-aware Russian translation services for businesses, individuals, and organizations worldwide.'
              }
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1rem',
              animation: 'fadeInUp 1s ease-out 1s both'
            }}>
              <button
                onClick={handleContactClick}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1e3a8a)',
                  color: 'white',
                  border: 'none',
                  padding: '0.85rem 2rem',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                }}
              >
                {currentLanguage === 'ru' ? 'Получить бесплатную оценку' : 'GET FREE QUOTE'}
              </button>

              <button
                onClick={scrollToServices}
                style={{
                  background: 'transparent',
                  color: '#3b82f6',
                  border: '2px solid #3b82f6',
                  padding: '0.85rem 2rem',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59,130,246,0.1)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {currentLanguage === 'ru' ? 'Просмотреть услуги' : 'VIEW SERVICES'}
              </button>
            </div>
            
            {/* Meet Your Translator Button */}
            <div style={{
              marginTop: '1.5rem',
              animation: 'fadeInUp 1s ease-out 1.2s both',
              position: 'relative'
            }}>
              {/* Animated scroll indicator */}
              <div style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '30px',
                height: '50px',
                opacity: 0.8,
                animation: 'scrollIndicator 2s ease-in-out infinite',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5L12 19M12 19L19 12M12 19L5 12" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <button
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1e3a8a)',
                  color: 'white',
                  border: 'none',
                  padding: '0.85rem 2rem',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                  // Find the arrow element and animate it
                  const arrow = e.currentTarget.querySelector('.arrow-icon');
                  if (arrow) {
                    arrow.style.transform = 'translateX(4px)';
                    arrow.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                  // Reset arrow animation
                  const arrow = e.currentTarget.querySelector('.arrow-icon');
                  if (arrow) {
                    arrow.style.transform = 'translateX(0)';
                    arrow.style.opacity = '0.7';
                  }
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>👋</span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {currentLanguage === 'ru' ? 'Встретьте вашего переводчика' : 'MEET YOUR TRANSLATOR'}
                  <span 
                    className="arrow-icon"
                    style={{
                      marginLeft: '8px',
                      display: 'inline-flex',
                      transition: 'all 0.3s ease',
                      opacity: '0.7',
                      animation: 'arrowPulse 2s infinite',
                      position: 'relative',
                      top: '1px'
                    }}
                  >
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 1L17 7M17 7L11 13M17 7H1" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Visual connector to About section */}
        <div style={{
          marginTop: '3rem', 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.6,
          animation: 'fadeInUp 1s ease-out 1.4s both'
        }}>
          <div style={{
            fontSize: '0.9rem',
            color: '#3b82f6',
            fontWeight: '600',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {currentLanguage === 'ru' ? 'Узнайте больше' : 'Scroll to Learn More'}
          </div>
          <div style={{
            animation: 'scrollIndicator 2s ease-in-out infinite',
            marginTop: '0.5rem'
          }}>
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 5V25M10 25L18 17M10 25L2 17" 
                stroke="#3b82f6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
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
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 15px 35px rgba(30, 64, 175, 0.2);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 25px 50px rgba(30, 64, 175, 0.35);
              transform: scale(1.02);
            }
          }
          
          @keyframes shine {
            from {
              background-position: 200% center;
            }
            to {
              background-position: -200% center;
            }
          }
          
          @keyframes arrowPulse {
            0%, 100% {
              transform: translateX(0);
              opacity: 0.7;
            }
            50% {
              transform: translateX(5px);
              opacity: 1;
            }
          }
          
          @keyframes scrollIndicator {
            0%, 100% {
              opacity: 0.5;
              transform: translateY(0);
            }
            50% {
              opacity: 1;
              transform: translateY(10px);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
