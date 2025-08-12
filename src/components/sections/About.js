import React, { useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// Simple analytics tracking function
const trackEvent = (eventType, elementName, section, additionalData = {}) => {
  try {
    const event = {
      type: eventType,
      elementName,
      section,
      timestamp: new Date().toISOString(),
      ...additionalData
    };
    
    console.log('Analytics Event:', event);
    window.analyticsEvents = window.analyticsEvents || [];
    window.analyticsEvents.push(event);
    
    if (window.s && typeof window.s === 'object') {
      window.s.linkTrackVars = 'events,prop1,prop2,prop3';
      window.s.linkTrackEvents = 'event1';
      window.s.events = 'event1';
      window.s.prop1 = elementName;
      window.s.prop2 = eventType;
      window.s.prop3 = section;
      window.s.tl(true, 'o', elementName);
    }
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};

const About = ({ currentLanguage, isMobile, isTablet }) => {
  const { theme, isDarkMode } = useTheme();
  
  // Track page view when component mounts
  useEffect(() => {
    trackEvent('pageView', 'About', 'about', { language: currentLanguage });
  }, [currentLanguage]);

  return (
    <section id="about" style={{ 
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 4rem',
      background: theme.background,
      position: 'relative',
      overflow: 'hidden',
      color: theme.text
    }}>
      {/* Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, ${theme.primary}20 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, ${theme.secondary || '#8b5cf6'}20 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, ${theme.success || '#10b981'}15 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 1
      }}></div>
      
      <div style={{ width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '0.8fr 1.2fr', 
          gap: isMobile ? '3rem' : isTablet ? '4rem' : '6rem', 
          alignItems: 'center'
        }}>
          {/* Left Content - Order 2 on mobile, 1 on desktop */}
          <div style={{
            paddingLeft: '20px',
            paddingRight: '10px',
            order: isMobile ? 2 : 1
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1.5rem',
                background: `${theme.primary}40`,
                border: `2px solid ${theme.primary}60`,
                borderRadius: '25px',
                marginBottom: '1rem',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{
                  fontSize: '0.8rem',
                  color: theme.primary,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  {currentLanguage === 'en' ? '👋 About Your Translator' : '👋 О вашем переводчике'}
                </span>
              </div>
            </div>
            
            <h1 style={{
              fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: '800',
              marginBottom: '1rem',
              lineHeight: '1.1',
              color: theme.text, // Fallback color
              background: isDarkMode 
                ? 'linear-gradient(135deg, #60a5fa, #a78bfa)' 
                : 'linear-gradient(135deg, #3b82f6, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              // Fallback for browsers that don't support background-clip
              textShadow: isDarkMode ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {currentLanguage === 'en' ? 'MEET SABRINA' : 'ЗНАКОМЬТЕСЬ - САБРИНА'}
            </h1>
            
            <h2 style={{
              fontSize: '1.3rem',
              color: theme.primary,
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              {currentLanguage === 'en' 
                ? 'Professional Russian-English Translation Services'
                : 'Профессиональные услуги русско-английского перевода'
              }
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: theme.textSecondary,
              lineHeight: '1.7',
              marginBottom: '1.5rem'
            }}>
              {currentLanguage === 'en' 
                ? 'Born to a Russian mother and an Indian father, I bridge communication gaps between Russian-speaking countries and the world. With education in Russia, Uzbekistan, and India, I bring authentic cultural understanding to every translation project.' 
                : 'Рожденная от русской матери и индийского отца, я устраняю коммуникационные барьеры между русскоговорящими странами и миром. Получив образование в России, Узбекистане и Индии, я привношу подлинное культурное понимание в каждый переводческий проект.'
              }
            </p>
            
            <p style={{
              fontSize: '1.1rem',
              color: theme.textSecondary,
              lineHeight: '1.7',
              marginBottom: '2.5rem'
            }}>
              {currentLanguage === 'en'
                ? 'With 6+ years of professional experience, I specialize in business interpretation, document translation, and cultural consultation for companies expanding into Russian markets.'
                : 'Имея более 6 лет профессионального опыта, я специализируюсь на деловом переводе, переводе документов и культурных консультациях для компаний, расширяющихся на российские рынки.'
              }
            </p>
            
            {/* Credentials */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '2.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: theme.glass || 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.border}`,
                padding: '0.75rem 1.25rem',
                borderRadius: '50px',
                boxShadow: theme.shadow
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: theme.gradient || `linear-gradient(135deg, ${theme.primary}, ${theme.secondary || '#8b5cf6'})`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>🎓</span>
                </div>
                <div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: '600', 
                    color: theme.text 
                  }}>
                    {currentLanguage === 'en' ? 'Certified' : 'Сертифицирована'}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: theme.textSecondary 
                  }}>
                    {currentLanguage === 'en' ? '6+ Years' : '6+ лет'}
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: theme.glass || 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.border}`,
                padding: '0.75rem 1.25rem',
                borderRadius: '50px',
                boxShadow: theme.shadow
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: `linear-gradient(135deg, ${theme.success || '#10b981'}, #059669)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>🌍</span>
                </div>
                <div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: '600', 
                    color: theme.text 
                  }}>
                    {currentLanguage === 'en' ? 'Global' : 'Международный'}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: theme.textSecondary 
                  }}>
                    {currentLanguage === 'en' ? 'Multi-cultural' : 'Мультикультурный'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{
                background: theme.gradient || `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark || theme.primary})`,
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '12px',
                border: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: `0 8px 25px ${theme.primary}40`,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }} onClick={() => { 
                trackEvent('click', 'quote-button', 'about', { action: 'meet_sabrina_quote' }); 
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); 
              }}>
                {currentLanguage === 'en' ? 'GET QUOTE' : 'ПОЛУЧИТЬ ЦЕНУ'}
              </button>
              
              <button style={{
                background: theme.glass || 'rgba(255,255,255,0.1)',
                color: theme.text,
                padding: '0.875rem 2rem',
                borderRadius: '12px',
                border: `2px solid ${theme.border}`,
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }} onClick={() => { 
                trackEvent('click', 'portfolio-button', 'about', { action: 'view_portfolio' }); 
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); 
              }}>
                {currentLanguage === 'en' ? 'VIEW PORTFOLIO' : 'ПОРТФОЛИО'}
              </button>
            </div>
          </div>
          
          {/* Right Image - Order 1 on mobile, 2 on desktop */}
          <div style={{ 
            position: 'relative', 
            overflow: 'visible',
            order: isMobile ? 1 : 2
          }}>
            <div 
            className={isMobile ? "mobile-image-container" : ""}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '30px',
              padding: isMobile ? '0.3rem' : '0.5rem',
              transform: isMobile ? 'rotate(0deg)' : 'rotate(-2deg)',
              boxShadow: '0 25px 50px rgba(59,130,246,0.3)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'visible',
              width: isMobile ? '100%' : 'auto',
              height: isMobile ? 'auto' : 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(-1deg) translateY(-10px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 35px 70px rgba(59,130,246,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(-2deg) translateY(0px) scale(1)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(59,130,246,0.3)';
            }}>
              <img 
                src="/images/sabrina-profile.jpeg" 
                alt="Sabrina Bhatt - Professional Russian Translator"
                className={isMobile ? "about-image" : ""} 
                style={{
                  width: isMobile ? '100%' : '110%',
                  height: isMobile ? 'auto' : isTablet ? '750px' : '850px',
                  minHeight: isMobile ? '500px' : 'auto',
                  maxHeight: isMobile ? 'none' : '850px',
                  objectFit: isMobile ? 'contain' : 'cover',
                  objectPosition: isMobile ? 'center' : 'center',
                  borderRadius: '20px',
                  transform: isMobile ? 'rotate(0deg)' : 'rotate(2deg) translateX(-5%)',
                  transition: 'all 0.5s ease',
                  filter: 'brightness(1.1) contrast(1.05)',
                  animation: isMobile ? 'mobileImageFloat 3s ease-in-out infinite' : 'none'
                }}
              />
            </div>
            
            {/* Floating decorative elements with animations */}
            <div style={{
              position: 'absolute',
              top: isMobile ? '-15px' : '-20px',
              right: isMobile ? '-15px' : '-20px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '50%',
              width: isMobile ? '70px' : '90px',
              height: isMobile ? '70px' : '90px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '1.8rem' : '2.2rem',
              boxShadow: '0 15px 35px rgba(59,130,246,0.4)',
              zIndex: 10,
              border: '3px solid rgba(255,255,255,0.8)',
              transition: 'all 0.3s ease',
              animation: isMobile ? 'mobileFloat 2s ease-in-out infinite' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(59,130,246,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(59,130,246,0.4)';
            }}>
              🏆
            </div>
            
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '-10px' : '-15px',
              left: isMobile ? '-20px' : '-35px',
              background: 'linear-gradient(135deg, white, #f8fafc)',
              borderRadius: '20px',
              padding: isMobile ? '1rem' : '1.5rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
              border: '3px solid #e2e8f0',
              zIndex: 10,
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              animation: isMobile ? 'mobileFloat 2.5s ease-in-out infinite' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
            }}>
              <div style={{ fontWeight: '800', color: '#1e293b', fontSize: '1.1rem' }}>6+ Years</div>
              <div style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600' }}>Experience</div>
            </div>
            
            {/* Additional floating element - language indicator */}
            <div style={{
              position: 'absolute',
              top: isMobile ? '40%' : '50%',
              left: isMobile ? '-30px' : '-50px',
              background: 'linear-gradient(135deg, #2563eb, #1e40af)',
              borderRadius: '50%',
              width: isMobile ? '60px' : '70px',
              height: isMobile ? '60px' : '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '1.5rem' : '1.8rem',
              boxShadow: '0 12px 30px rgba(239,68,68,0.4)',
              zIndex: 10,
              border: '3px solid rgba(255,255,255,0.9)',
              transition: 'all 0.3s ease',
              animation: isMobile ? 'mobileFloat 3s ease-in-out infinite' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2) rotate(-10deg)';
              e.currentTarget.style.boxShadow = '0 18px 40px rgba(239,68,68,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(239,68,68,0.4)';
            }}>
              🇷🇺
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes mobileImageFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.01);
          }
        }

        @keyframes mobileFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.05);
          }
        }

        /* Mobile image hover effect */
        @media (max-width: 768px) {
          .mobile-image-container:hover {
            transform: translateY(-5px) scale(1.02) !important;
            box-shadow: 0 30px 60px rgba(59,130,246,0.4) !important;
          }
          
          /* Enhanced mobile animations */
          .mobile-image-container {
            animation: mobileImageFloat 4s ease-in-out infinite;
          }
        }

        /* Responsive image sizing */
        @media (max-width: 768px) {
          .about-image {
            width: 100% !important;
            height: auto !important;
            min-height: 400px !important;
            max-height: 600px !important;
            object-fit: contain !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
