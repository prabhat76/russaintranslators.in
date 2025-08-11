import React from 'react';
import { CONTENT } from '../../constants/content';

const About = ({ currentLanguage, isMobile, isTablet, analytics }) => {
  return (
    <section id="about" style={{ 
      padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 2rem' : '6rem 3rem', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                fontSize: '0.9rem',
                color: '#6366f1',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                ABOUT YOUR TRANSLATOR
              </span>
            </div>
            
            <h1 style={{
              fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              MEET SABRINA
            </h1>
            
            <h2 style={{
              fontSize: '1.3rem',
              color: '#6366f1',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              Professional Russian-English Translation Services
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#475569',
              lineHeight: '1.7',
              marginBottom: '1.5rem'
            }}>
              {currentLanguage === 'en' ? 'Born to a Russian mother and an Indian father, I bridge communication gaps between Russian-speaking countries and the world. With education in Russia, Uzbekistan, and India, I bring authentic cultural understanding to every translation project.' : 'Рожденная от русской матери и индийского отца, я устраняю коммуникационные барьеры между русскоговорящими странами и миром. Получив образование в России, Узбекистане и Индии, я привношу подлинное культурное понимание в каждый переводческий проект.'}
            </p>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#475569',
              lineHeight: '1.7',
              marginBottom: '2.5rem'
            }}>
              With 6+ years of professional experience, I specialize in business interpretation, document translation, and cultural consultation for companies expanding into Russian markets.
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
                background: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '50px',
                border: '2px solid #e2e8f0',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem'
                }}>
                  <span style={{ color: 'white', fontSize: '1.2rem' }}>✓</span>
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>CERTIFIED</div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>TRANSLATOR</div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '50px',
                border: '2px solid #e2e8f0',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem'
                }}>
                  <span style={{ color: 'white', fontSize: '1.2rem' }}>🌍</span>
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>MULTICULTURAL</div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>BACKGROUND</div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '50px',
                border: '2px solid #e2e8f0',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#f59e0b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem'
                }}>
                  <span style={{ color: 'white', fontSize: '1.2rem' }}>💼</span>
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>BUSINESS</div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>SPECIALIST</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{
                background: '#6366f1',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                transition: 'all 0.3s ease'
              }} onClick={() => { 
                analytics?.contactAttempt?.('meet_sabrina_quote'); 
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); 
              }}>
                GET QUOTE
              </button>
              
              <button style={{
                background: 'white',
                color: '#6366f1',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                border: '2px solid #6366f1',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }} onClick={() => { 
                analytics?.contactAttempt?.('meet_sabrina_call'); 
                window.open('tel:+918789389223'); 
              }}>
                📞 CALL NOW
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
