import React, { useState, useRef } from 'react';

const MobilePortfolio = ({ currentLanguage, isMobile, isTablet }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isMobile) return null; // Only show on mobile

  // Achievement/Certificate data
  const achievements = [
    {
      type: 'certificate',
      title: currentLanguage === 'en' ? 'Certified Translator' : 'Сертифицированный переводчик',
      subtitle: currentLanguage === 'en' ? 'Russian-English Translation' : 'Русско-английский перевод',
      year: '2018',
      icon: '🎓',
      frame: 'gold'
    },
    {
      type: 'award',
      title: currentLanguage === 'en' ? 'Excellence in Translation' : 'Превосходство в переводе',
      subtitle: currentLanguage === 'en' ? 'Professional Recognition' : 'Профессиональное признание',
      year: '2020',
      icon: '🏆',
      frame: 'silver'
    },
    {
      type: 'project',
      title: currentLanguage === 'en' ? 'International Conference' : 'Международная конференция',
      subtitle: currentLanguage === 'en' ? 'Simultaneous Interpretation' : 'Синхронный перевод',
      year: '2021',
      icon: '🎤',
      frame: 'bronze'
    },
    {
      type: 'certificate',
      title: currentLanguage === 'en' ? 'Legal Translation' : 'Юридический перевод',
      subtitle: currentLanguage === 'en' ? 'Specialized Certification' : 'Специализированная сертификация',
      year: '2019',
      icon: '⚖️',
      frame: 'gold'
    },
    {
      type: 'project',
      title: currentLanguage === 'en' ? 'Business Negotiations' : 'Деловые переговоры',
      subtitle: currentLanguage === 'en' ? 'High-Profile Translation' : 'Перевод высокого уровня',
      year: '2022',
      icon: '💼',
      frame: 'silver'
    },
    {
      type: 'award',
      title: currentLanguage === 'en' ? 'Client Satisfaction' : 'Удовлетворенность клиентов',
      subtitle: currentLanguage === 'en' ? '98% Success Rate' : '98% успешных проектов',
      year: '2023',
      icon: '⭐',
      frame: 'bronze'
    }
  ];

  const getFrameStyle = (frameType) => {
    const baseStyle = {
      position: 'absolute',
      top: '-8px',
      left: '-8px',
      right: '-8px',
      bottom: '-8px',
      borderRadius: '12px',
      border: '4px solid',
      zIndex: 1
    };

    switch (frameType) {
      case 'gold':
        return {
          ...baseStyle,
          borderColor: '#fbbf24',
          background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.3), inset 0 2px 4px rgba(255,255,255,0.3)'
        };
      case 'silver':
        return {
          ...baseStyle,
          borderColor: '#e5e7eb',
          background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb, #d1d5db)',
          boxShadow: '0 0 15px rgba(229, 231, 235, 0.3), inset 0 2px 4px rgba(255,255,255,0.5)'
        };
      case 'bronze':
        return {
          ...baseStyle,
          borderColor: '#d97706',
          background: 'linear-gradient(45deg, #f59e0b, #d97706, #b45309)',
          boxShadow: '0 0 15px rgba(217, 119, 6, 0.3), inset 0 2px 4px rgba(255,255,255,0.2)'
        };
      default:
        return baseStyle;
    }
  };

  return (
    <section style={{
      padding: '4rem 0',
      background: 'linear-gradient(135deg, #1e1b24 0%, #2d2a35 50%, #3a3645 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Museum Wall Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3
      }}></div>

      {/* Ambient Museum Lighting */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(ellipse at center, rgba(255,248,220,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Museum Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: 'rgba(212,175,55,0.2)',
            border: '2px solid rgba(212,175,55,0.4)',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-5px',
              left: '20px',
              right: '20px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #d4af37, transparent)'
            }}></div>
            <span style={{
              color: '#d4af37',
              fontSize: '1rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '0 0 10px rgba(212,175,55,0.3)'
            }}>
              🏛️ {currentLanguage === 'en' ? 'Gallery of Excellence' : 'Галерея превосходства'}
            </span>
          </div>
          
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: '800',
            color: '#f8fafc',
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            fontFamily: 'serif'
          }}>
            {currentLanguage === 'en' ? 'Professional Achievements' : 'Профессиональные достижения'}
          </h2>
          
          <p style={{
            color: '#cbd5e1',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontStyle: 'italic'
          }}>
            {currentLanguage === 'en' 
              ? 'A curated collection of certifications, awards, and professional milestones in translation excellence.'
              : 'Курируемая коллекция сертификатов, наград и профессиональных достижений в области превосходного перевода.'}
          </p>
        </div>

        {/* Gallery Wall */}
        <div 
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '2rem',
            padding: '2rem 2rem 3rem',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          ref={scrollRef}
        >
          {achievements.map((achievement, index) => (
            <div key={index} style={{
              minWidth: '300px',
              width: '300px',
              height: '400px',
              position: 'relative',
              scrollSnapAlign: 'center',
              flexShrink: 0
            }}>
              {/* Frame */}
              <div style={getFrameStyle(achievement.frame)}></div>
              
              {/* Certificate/Award */}
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #fefefe, #f8f9fa)',
                borderRadius: '8px',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(0,0,0,0.1)'
              }}>
                {/* Decorative Border */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  border: '2px solid #d4af37',
                  borderRadius: '4px',
                  opacity: 0.3
                }}></div>

                {/* Institution Seal */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '40px',
                  height: '40px',
                  background: 'radial-gradient(circle, #d4af37, #b8941f)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}>
                  ✓
                </div>

                {/* Year Badge */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  background: '#1e293b',
                  color: '#d4af37',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  letterSpacing: '1px'
                }}>
                  {achievement.year}
                </div>

                {/* Icon */}
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }}>
                  {achievement.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '0.5rem',
                  lineHeight: '1.2',
                  fontFamily: 'serif'
                }}>
                  {achievement.title}
                </h3>

                {/* Subtitle */}
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: '1.4',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  {achievement.subtitle}
                </p>

                {/* Decorative Element */}
                <div style={{
                  width: '80px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                  marginBottom: '1rem'
                }}></div>

                {/* Type Badge */}
                <div style={{
                  background: achievement.type === 'certificate' ? '#10b981' : 
                            achievement.type === 'award' ? '#f59e0b' : '#3b82f6',
                  color: 'white',
                  padding: '0.3rem 1rem',
                  borderRadius: '15px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {achievement.type === 'certificate' ? 
                    (currentLanguage === 'en' ? 'Certificate' : 'Сертификат') :
                    achievement.type === 'award' ?
                    (currentLanguage === 'en' ? 'Award' : 'Награда') :
                    (currentLanguage === 'en' ? 'Project' : 'Проект')
                  }
                </div>
              </div>

              {/* Museum Spotlight Effect */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '60px',
                background: 'radial-gradient(ellipse at bottom, rgba(255,248,220,0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 3,
                pointerEvents: 'none'
              }}></div>
            </div>
          ))}
        </div>

        {/* Gallery Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem',
          padding: '0 2rem'
        }}>
          {achievements.map((_, index) => (
            <div
              key={index}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                background: currentIndex === index ? '#d4af37' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)',
                boxShadow: currentIndex === index ? '0 0 10px rgba(212,175,55,0.5)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Museum Ambiance */}
      <style>{`
        /* Hide scrollbar */
        div::-webkit-scrollbar {
          display: none;
        }
        
        /* Subtle hover effects for frames */
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(212,175,55,0.3); }
          50% { box-shadow: 0 0 20px rgba(212,175,55,0.6), 0 0 30px rgba(212,175,55,0.4); }
        }
      `}</style>
    </section>
  );
};

export default MobilePortfolio;
