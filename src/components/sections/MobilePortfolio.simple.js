import React, { useState, useRef, useEffect } from 'react';

const MobilePortfolio = ({ currentLanguage, isMobile, isTablet }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Auto toggle between dark and light mode every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDarkMode(prev => !prev);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isMobile) return null; // Only show on mobile

  // Theme configuration
  const getTheme = () => {
    if (isDarkMode) {
      return {
        // Dark Museum Theme
        background: 'linear-gradient(135deg, #1e1b24 0%, #2d2a35 50%, #3a3645 100%)',
        wallPattern: 'rgba(0,0,0,0.1)',
        ambientLight: 'rgba(255,248,220,0.05)',
        headerBg: 'rgba(212,175,55,0.2)',
        headerBorder: 'rgba(212,175,55,0.4)',
        headerColor: '#d4af37',
        titleColor: '#f8fafc',
        subtitleColor: '#cbd5e1',
        cardBg: 'linear-gradient(145deg, #fefefe, #f8f9fa)',
        cardShadow: '0 20px 40px rgba(0,0,0,0.3)',
        spotlightColor: 'rgba(255,248,220,0.2)',
        navIndicator: '#d4af37',
        navIndicatorGlow: 'rgba(212,175,55,0.5)',
        modeIcon: '🌙',
        modeText: currentLanguage === 'en' ? 'Night Gallery' : 'Ночная галерея'
      };
    } else {
      return {
        // Light Museum Theme  
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        wallPattern: 'rgba(0,0,0,0.05)',
        ambientLight: 'rgba(59,130,246,0.08)',
        headerBg: 'rgba(59,130,246,0.15)',
        headerBorder: 'rgba(59,130,246,0.3)',
        headerColor: '#3b82f6',
        titleColor: '#1e293b',
        subtitleColor: '#475569',
        cardBg: 'linear-gradient(145deg, #ffffff, #f1f5f9)',
        cardShadow: '0 20px 40px rgba(59,130,246,0.15)',
        spotlightColor: 'rgba(59,130,246,0.15)',
        navIndicator: '#3b82f6',
        navIndicatorGlow: 'rgba(59,130,246,0.5)',
        modeIcon: '☀️',
        modeText: currentLanguage === 'en' ? 'Day Gallery' : 'Дневная галерея'
      };
    }
  };

  const theme = getTheme();

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
      background: theme.background,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 1s ease-in-out'
    }}>
      {/* Theme Toggle Indicator */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 10,
        background: 'rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '0.75rem 1.5rem',
        borderRadius: '50px',
        border: `2px solid ${theme.headerBorder}`,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 1s ease-in-out'
      }}>
        <span style={{ fontSize: '1.2rem' }}>{theme.modeIcon}</span>
        <span style={{
          color: theme.headerColor,
          fontSize: '0.8rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {theme.modeText}
        </span>
      </div>

      {/* Museum Wall Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(90deg, ${theme.wallPattern} 1px, transparent 1px),
          linear-gradient(${theme.wallPattern} 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3,
        transition: 'all 1s ease-in-out'
      }}></div>

      {/* Ambient Museum Lighting */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200%',
        height: '200%',
        background: `radial-gradient(ellipse at center, ${theme.ambientLight} 0%, transparent 70%)`,
        pointerEvents: 'none',
        transition: 'all 1s ease-in-out'
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
            background: theme.headerBg,
            border: `2px solid ${theme.headerBorder}`,
            borderRadius: '8px',
            marginBottom: '1.5rem',
            position: 'relative',
            transition: 'all 1s ease-in-out'
          }}>
            <div style={{
              position: 'absolute',
              top: '-5px',
              left: '20px',
              right: '20px',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${theme.headerColor}, transparent)`,
              transition: 'all 1s ease-in-out'
            }}></div>
            <span style={{
              color: theme.headerColor,
              fontSize: '1rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: `0 0 10px ${theme.headerColor}30`,
              transition: 'all 1s ease-in-out'
            }}>
              🏛️ {currentLanguage === 'en' ? 'Gallery of Excellence' : 'Галерея превосходства'}
            </span>
          </div>
          
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: '800',
            color: theme.titleColor,
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            fontFamily: 'serif',
            transition: 'all 1s ease-in-out'
          }}>
            {currentLanguage === 'en' ? 'Professional Achievements' : 'Профессиональные достижения'}
          </h2>
          
          <p style={{
            color: theme.subtitleColor,
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontStyle: 'italic',
            transition: 'all 1s ease-in-out'
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
                background: theme.cardBg,
                borderRadius: '8px',
                position: 'relative',
                zIndex: 2,
                boxShadow: `${theme.cardShadow}, inset 0 1px 0 rgba(255,255,255,0.8)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(0,0,0,0.1)',
                transition: 'all 1s ease-in-out'
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
                background: `radial-gradient(ellipse at bottom, ${theme.spotlightColor} 0%, transparent 70%)`,
                borderRadius: '50%',
                zIndex: 3,
                pointerEvents: 'none',
                transition: 'all 1s ease-in-out'
              }}></div>
            </div>
          ))}

          {/* See More Section */}
          <div style={{
            minWidth: '300px',
            width: '300px',
            height: '400px',
            position: 'relative',
            scrollSnapAlign: 'center',
            flexShrink: 0
          }}>
            {/* Interactive Frame */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '-8px',
              right: '-8px',
              bottom: '-8px',
              borderRadius: '12px',
              border: `4px dashed ${isDarkMode ? '#60a5fa' : '#3b82f6'}`,
              background: `linear-gradient(45deg, ${isDarkMode ? 'rgba(96,165,250,0.1)' : 'rgba(59,130,246,0.15)'}, ${isDarkMode ? 'rgba(59,130,246,0.2)' : 'rgba(96,165,250,0.1)'})`,
              zIndex: 1,
              animation: 'pulse 2s ease-in-out infinite',
              transition: 'all 1s ease-in-out'
            }}></div>
            
            {/* See More Card */}
            <div style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(145deg, ${isDarkMode ? 'rgba(96,165,250,0.1)' : 'rgba(59,130,246,0.08)'}, ${isDarkMode ? 'rgba(59,130,246,0.05)' : 'rgba(96,165,250,0.12)'})`,
              borderRadius: '8px',
              position: 'relative',
              zIndex: 2,
              boxShadow: `0 20px 40px ${isDarkMode ? 'rgba(96,165,250,0.2)' : 'rgba(59,130,246,0.25)'}, inset 0 1px 0 rgba(255,255,255,0.3)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
              textAlign: 'center',
              border: `2px dashed ${isDarkMode ? 'rgba(96,165,250,0.3)' : 'rgba(59,130,246,0.4)'}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => {
              // Navigate to full portfolio/gallery section
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.background = 'linear-gradient(145deg, rgba(96,165,250,0.2), rgba(59,130,246,0.1))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'linear-gradient(145deg, rgba(96,165,250,0.1), rgba(59,130,246,0.05))';
            }}
            >
              {/* Plus Icon */}
              <div style={{
                fontSize: '5rem',
                color: isDarkMode ? '#60a5fa' : '#3b82f6',
                marginBottom: '1.5rem',
                filter: `drop-shadow(0 4px 8px ${isDarkMode ? 'rgba(96,165,250,0.3)' : 'rgba(59,130,246,0.4)'})`,
                animation: 'bounce 2s ease-in-out infinite',
                transition: 'all 1s ease-in-out'
              }}>
                ➕
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: isDarkMode ? '#f1f5f9' : '#1e293b',
                marginBottom: '1rem',
                lineHeight: '1.2',
                fontFamily: 'serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                transition: 'all 1s ease-in-out'
              }}>
                {currentLanguage === 'en' ? 'See More Work' : 'Больше работ'}
              </h3>

              {/* Subtitle */}
              <p style={{
                fontSize: '1.1rem',
                color: isDarkMode ? '#cbd5e1' : '#475569',
                lineHeight: '1.4',
                marginBottom: '2rem',
                fontStyle: 'italic',
                transition: 'all 1s ease-in-out'
              }}>
                {currentLanguage === 'en' 
                  ? 'Explore our complete portfolio of professional translation projects'
                  : 'Изучите наше полное портфолио профессиональных переводческих проектов'}
              </p>

              {/* CTA Button */}
              <div style={{
                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 8px 25px rgba(96,165,250,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                {currentLanguage === 'en' ? 'View Gallery' : 'Смотреть галерею'}
              </div>

              {/* Arrow Indicator */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                fontSize: '1.5rem',
                color: '#60a5fa',
                animation: 'slideLeft 1.5s ease-in-out infinite'
              }}>
                →
              </div>
            </div>

            {/* Interactive Spotlight */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '60px',
              background: 'radial-gradient(ellipse at bottom, rgba(96,165,250,0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              zIndex: 3,
              pointerEvents: 'none',
              animation: 'glow 3s ease-in-out infinite'
            }}></div>
          </div>
        </div>

        {/* Gallery Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem',
          padding: '0 2rem'
        }}>
          {[...achievements, { type: 'see-more' }].map((_, index) => (
            <div
              key={index}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                background: currentIndex === index ? theme.navIndicator : 
                           index === achievements.length ? (isDarkMode ? '#60a5fa' : '#3b82f6') : 
                           (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'),
                cursor: 'pointer',
                transition: 'all 1s ease-in-out',
                transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)',
                boxShadow: currentIndex === index ? `0 0 10px ${theme.navIndicatorGlow}` : 
                          index === achievements.length ? `0 0 10px ${isDarkMode ? 'rgba(96,165,250,0.5)' : 'rgba(59,130,246,0.5)'}` : 'none'
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

        /* Pulse animation for See More frame */
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.7;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.02);
          }
        }

        /* Bounce animation for plus icon */
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        /* Slide animation for arrow */
        @keyframes slideLeft {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.7;
          }
          50% {
            transform: translateX(5px);
            opacity: 1;
          }
        }

        /* Enhanced glow for See More spotlight */
        @keyframes glow {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translateX(-50%) scale(1.1);
          }
        }
      `}</style>
    </section>
  );
};

export default MobilePortfolio;
