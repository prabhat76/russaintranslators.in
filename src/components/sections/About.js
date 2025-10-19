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
    <section id="about" className="section bg-secondary" style={{ 
      background: 'linear-gradient(135deg, var(--bg-secondary, #f8fafc) 0%, #f1f5f9 50%, #e2e8f0 100%)',
      padding: 'var(--spacing-xl, 3rem) 0',
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
          radial-gradient(ellipse at 25% 25%, rgba(59, 130, 246, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 75% 75%, rgba(30, 64, 175, 0.04) 0%, transparent 70%),
          linear-gradient(45deg, transparent 30%, rgba(71, 85, 105, 0.02) 50%, transparent 70%)
        `,
        pointerEvents: 'none',
        zIndex: 1
      }}></div>
      
      {/* Floating Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '80px',
        height: '80px',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        borderRadius: '50%',
        zIndex: 1,
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '8%',
        width: '60px',
        height: '60px',
        border: '1px solid rgba(71, 85, 105, 0.08)',
        borderRadius: '50%',
        zIndex: 1,
        animation: 'float 10s ease-in-out infinite reverse'
      }}></div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Meet Sabrina Bhatt</h2>
          <p className="section-subtitle">
            Your trusted Russian translation expert with multicultural experience bridging Russia and India
          </p>
        </div>
        
        <div className="grid grid-2" style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '350px 1fr', 
          gap: 'var(--spacing-xl, 3rem)', 
          alignItems: 'start',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Profile Image Section */}
          <div style={{ 
            position: 'relative',
            textAlign: 'center'
          }}>
            <div style={{
              position: 'relative',
              display: 'inline-block'
            }}>
              <img 
                src="/images/sabrina-profile.jpeg" 
                alt="Sabrina Bhatt - Professional Russian Translator"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-lg, 20px)',
                  boxShadow: 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = 'var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.15))';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))';
                }}
              />
              
              {/* Experience Badge */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                color: 'white',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: '700',
                boxShadow: 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))',
                border: '3px solid var(--bg-primary, white)',
                zIndex: 10
              }}>
                <span style={{ fontSize: '1.2rem' }}>15+</span>
                <span style={{ fontSize: '0.65rem' }}>YEARS</span>
              </div>
              
              {/* Cultural Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-15px',
                left: '-20px',
                background: 'var(--bg-primary, white)',
                color: 'var(--primary-color, #1e293b)',
                borderRadius: 'var(--radius-md, 12px)',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                boxShadow: 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))',
                border: '1px solid var(--secondary-light, #94a3b8)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>🇷🇺🇮🇳</span>
                <span>Multicultural</span>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div>
            <h3 style={{ 
              fontSize: '1.75rem',
              fontWeight: '700',
              color: 'var(--primary-color, #1e293b)',
              marginBottom: 'var(--spacing-md, 1.5rem)',
              fontFamily: 'var(--font-heading, Inter, sans-serif)'
            }}>
              Expert Translator & Cultural Bridge
            </h3>
            
            <p className="text-lg" style={{ 
              marginBottom: 'var(--spacing-md, 1.5rem)',
              lineHeight: '1.7'
            }}>
              {currentLanguage === 'en' 
                ? 'Born to a Russian mother and an Indian father, Sabrina brings unique multicultural insight to every translation project. With over 15 years of professional experience and education across Russia, Uzbekistan, and India, she specializes in bridging communication gaps between Russian-speaking countries and the global market.' 
                : 'Рожденная от русской матери и индийского отца, Сабрина привносит уникальное мультикультурное понимание в каждый переводческий проект. Имея более 15 лет профессионального опыта и образование в России, Узбекистане и Индии, она специализируется на устранении коммуникационных барьеров между русскоговорящими странами и мировым рынком.'
              }
            </p>
            
            <p className="text-lg" style={{ 
              marginBottom: 'var(--spacing-lg, 2rem)',
              lineHeight: '1.7'
            }}>
              {currentLanguage === 'en'
                ? 'Sabrina excels in business interpretation, legal document translation, and cultural consultation, ensuring that complex communications maintain their precision and cultural context across languages. Her commitment to excellence has earned the trust of international clients and organizations.'
                : 'Сабрина превосходно выполняет деловые переводы, перевод юридических документов и культурные консультации, обеспечивая сохранение точности и культурного контекста сложных коммуникаций между языками. Её стремление к совершенству завоевало доверие международных клиентов и организаций.'
              }
            </p>
            
            {/* Expertise Areas */}
            <div className="grid grid-2" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 'var(--spacing-md, 1.5rem)',
              marginBottom: 'var(--spacing-lg, 2rem)'
            }}>
              <div className="card" style={{
                background: 'var(--bg-primary, white)',
                borderRadius: 'var(--radius-md, 12px)',
                padding: 'var(--spacing-md, 1.5rem)',
                boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))',
                border: '1px solid var(--secondary-light, #94a3b8)',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-sm, 1rem)',
                  fontSize: '1.5rem'
                }}>
                  📄
                </div>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--primary-color, #1e293b)',
                  marginBottom: '0.5rem'
                }}>
                  {currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов'}
                </h4>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary, #475569)',
                  margin: 0
                }}>
                  {currentLanguage === 'en' ? 'Legal, medical, technical documents' : 'Юридические, медицинские, технические документы'}
                </p>
              </div>
              
              <div className="card" style={{
                background: 'var(--bg-primary, white)',
                borderRadius: 'var(--radius-md, 12px)',
                padding: 'var(--spacing-md, 1.5rem)',
                boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))',
                border: '1px solid var(--secondary-light, #94a3b8)',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-sm, 1rem)',
                  fontSize: '1.5rem'
                }}>
                  🎯
                </div>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--primary-color, #1e293b)',
                  marginBottom: '0.5rem'
                }}>
                  {currentLanguage === 'en' ? 'Business Interpretation' : 'Деловой перевод'}
                </h4>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary, #475569)',
                  margin: 0
                }}>
                  {currentLanguage === 'en' ? 'Meetings, negotiations, conferences' : 'Встречи, переговоры, конференции'}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: 'var(--spacing-md, 1.5rem)',
              flexWrap: 'wrap'
            }}>
              <button 
                className="btn btn-primary"
                style={{
                  background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                  color: 'white',
                  border: 'none',
                  padding: '0.875rem 2rem',
                  borderRadius: 'var(--radius-md, 12px)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))'
                }}
                onClick={() => { 
                  trackEvent('click', 'quote-button', 'about', { action: 'get_quote' }); 
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); 
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))';
                }}
              >
                {currentLanguage === 'en' ? 'GET FREE QUOTE' : 'ПОЛУЧИТЬ ЦЕНУ'}
              </button>
              
              <button 
                className="btn btn-secondary"
                style={{
                  background: 'var(--bg-primary, white)',
                  color: 'var(--primary-color, #1e293b)',
                  border: '1px solid var(--secondary-light, #94a3b8)',
                  padding: '0.875rem 2rem',
                  borderRadius: 'var(--radius-md, 12px)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onClick={() => { 
                  trackEvent('click', 'portfolio-button', 'about', { action: 'view_portfolio' }); 
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); 
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))';
                }}
              >
                {currentLanguage === 'en' ? 'VIEW PORTFOLIO' : 'ПОРТФОЛИО'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Professional Stats */}
        <div className="grid grid-4 text-center" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 'var(--spacing-lg, 2rem)',
          marginTop: 'var(--spacing-xl, 3rem)',
          padding: 'var(--spacing-lg, 2rem) 0',
          borderTop: '1px solid var(--secondary-light, #94a3b8)'
        }}>
          <div>
            <h4 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: 'var(--primary-accent, #3b82f6)', 
              margin: '0 0 0.5rem 0' 
            }}>
              15+
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Years Experience' : 'Лет опыта'}
            </p>
          </div>
          <div>
            <h4 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: 'var(--primary-accent, #3b82f6)', 
              margin: '0 0 0.5rem 0' 
            }}>
              3
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Countries Lived' : 'Страны проживания'}
            </p>
          </div>
          <div>
            <h4 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: 'var(--primary-accent, #3b82f6)', 
              margin: '0 0 0.5rem 0' 
            }}>
              1000+
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Projects Completed' : 'Завершённых проектов'}
            </p>
          </div>
          <div>
            <h4 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: 'var(--primary-accent, #3b82f6)', 
              margin: '0 0 0.5rem 0' 
            }}>
              24/7
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Support Available' : 'Поддержка доступна'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
