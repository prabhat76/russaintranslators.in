import React, { useEffect } from 'react';

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
  // Track page view when component mounts
  useEffect(() => {
    trackEvent('pageView', 'About', 'about', { language: currentLanguage });
  }, [currentLanguage]);

  return (
    <section id="about" style={{ 
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 4rem',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(168,85,247,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(34,197,94,0.05) 0%, transparent 50%)
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
                background: 'rgba(59,130,246,0.2)',
                border: '2px solid rgba(59,130,246,0.3)',
                borderRadius: '25px',
                marginBottom: '1rem',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{
                  fontSize: '0.8rem',
                  color: '#60a5fa',
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
              background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {currentLanguage === 'en' ? 'MEET SABRINA' : 'ЗНАКОМЬТЕСЬ - САБРИНА'}
            </h1>
            
            <h2 style={{
              fontSize: '1.3rem',
              color: '#60a5fa',
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
              color: '#cbd5e1',
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
              color: '#cbd5e1',
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
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '0.75rem 1.25rem',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
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
                    color: '#f1f5f9' 
                  }}>
                    {currentLanguage === 'en' ? 'Certified' : 'Сертифицирована'}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: '#cbd5e1' 
                  }}>
                    {currentLanguage === 'en' ? '6+ Years' : '6+ лет'}
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '0.75rem 1.25rem',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
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
                    color: '#f1f5f9' 
                  }}>
                    {currentLanguage === 'en' ? 'Global' : 'Международный'}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: '#cbd5e1' 
                  }}>
                    {currentLanguage === 'en' ? 'Multi-cultural' : 'Мультикультурный'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{
                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '12px',
                border: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(96,165,250,0.4)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }} onClick={() => { 
                trackEvent('click', 'quote-button', 'about', { action: 'meet_sabrina_quote' }); 
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); 
              }}>
                {currentLanguage === 'en' ? 'GET QUOTE' : 'ПОЛУЧИТЬ ЦЕНУ'}
              </button>
              
              <button style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#f1f5f9',
                padding: '0.875rem 2rem',
                borderRadius: '12px',
                border: '2px solid rgba(255,255,255,0.2)',
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
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '30px',
              padding: '0.5rem',
              transform: 'rotate(-2deg)',
              boxShadow: '0 25px 50px rgba(59,130,246,0.3)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'visible'
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
                style={{
                  width: '110%',
                  height: isMobile ? '600px' : isTablet ? '750px' : '850px',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  transform: 'rotate(2deg) translateX(-5%)',
                  transition: 'all 0.5s ease',
                  filter: 'brightness(1.1) contrast(1.05)'
                }}
              />
            </div>
            
            {/* Floating decorative elements with animations */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '50%',
              width: '90px',
              height: '90px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              boxShadow: '0 15px 35px rgba(59,130,246,0.4)',
              zIndex: 10,
              border: '3px solid rgba(255,255,255,0.8)',
              transition: 'all 0.3s ease'
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
              bottom: '-15px',
              left: '-35px',
              background: 'linear-gradient(135deg, white, #f8fafc)',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
              border: '3px solid #e2e8f0',
              zIndex: 10,
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
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
              top: '50%',
              left: '-50px',
              background: 'linear-gradient(135deg, #2563eb, #1e40af)',
              borderRadius: '50%',
              width: '70px',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: '0 12px 30px rgba(239,68,68,0.4)',
              zIndex: 10,
              border: '3px solid rgba(255,255,255,0.9)',
              transition: 'all 0.3s ease'
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
    </section>
  );
};

export default About;
