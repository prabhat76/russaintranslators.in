import React from 'react';

const Hero = ({ currentLanguage, isMobile, isTablet }) => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 75%, #dbeafe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(30,64,175,0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(59,130,246,0.15) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite'
      }}></div>

      {/* Floating Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '50%',
        animation: 'float 15s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '70%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'rgba(168,85,247,0.1)',
        borderRadius: '50%',
        animation: 'float 18s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '80px',
        height: '80px',
        background: 'rgba(34,197,94,0.1)',
        borderRadius: '50%',
        animation: 'float 12s ease-in-out infinite'
      }}></div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '8rem 1rem 4rem' : isTablet ? '8rem 2rem 4rem' : '8rem 4rem 4rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Hero Badge */}
        <div style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          background: 'rgba(59,130,246,0.2)',
          border: '2px solid rgba(59,130,246,0.3)',
          borderRadius: '50px',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)',
          animation: 'fadeInUp 1s ease-out'
        }}>
          <span style={{
            fontSize: '1rem',
            color: '#60a5fa',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            {currentLanguage === 'en' ? '🏆 Professional Russian Translation' : '🏆 Профессиональный русский перевод'}
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: isMobile ? '3rem' : isTablet ? '4.5rem' : '6rem',
          fontWeight: '900',
          lineHeight: '1.1',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'fadeInUp 1s ease-out 0.2s both'
        }}>
          {currentLanguage === 'en' ? (
            <>
              Expert Russian<br />
              <span style={{ color: '#60a5fa' }}>Translation</span><br />
              Services
            </>
          ) : (
            <>
              Экспертные<br />
              <span style={{ color: '#60a5fa' }}>русские</span><br />
              переводы
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: isMobile ? '1.2rem' : '1.5rem',
          color: '#cbd5e1',
          lineHeight: '1.6',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          animation: 'fadeInUp 1s ease-out 0.4s both'
        }}>
          {currentLanguage === 'en' 
            ? 'Professional, accurate, and culturally-aware Russian translation services for businesses, individuals, and organizations worldwide.'
            : 'Профессиональные, точные и культурно осведомленные услуги русского перевода для предприятий, частных лиц и организаций по всему миру.'
          }
        </p>

        {/* Key Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '2rem',
          marginBottom: '4rem',
          animation: 'fadeInUp 1s ease-out 0.6s both'
        }}>
          {[
            {
              icon: '⚡',
              title: currentLanguage === 'en' ? 'Fast Delivery' : 'Быстрая доставка',
              desc: currentLanguage === 'en' ? '24-48 hours' : '24-48 часов'
            },
            {
              icon: '🎯',
              title: currentLanguage === 'en' ? '99% Accuracy' : '99% точность',
              desc: currentLanguage === 'en' ? 'Certified quality' : 'Сертифицированное качество'
            },
            {
              icon: '🌍',
              title: currentLanguage === 'en' ? 'Global Reach' : 'Глобальный охват',
              desc: currentLanguage === 'en' ? 'Worldwide service' : 'Обслуживание по всему миру'
            },
            {
              icon: '🔒',
              title: currentLanguage === 'en' ? 'Confidential' : 'Конфиденциально',
              desc: currentLanguage === 'en' ? 'NDA protected' : 'Защищено NDA'
            }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#f1f5f9',
                marginBottom: '0.5rem'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#cbd5e1',
                margin: 0
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'fadeInUp 1s ease-out 0.8s both'
        }}>
                    <button
            onClick={scrollToContact}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              color: '#1e40af',
              border: 'none',
              padding: '1.25rem 3rem',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: '0 15px 35px rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: isMobile ? '100%' : 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(255,255,255,0.4)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(255,255,255,0.3)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
            }}
          >
            {currentLanguage === 'en' ? 'Get Free Quote' : 'Получить бесплатную оценку'}
          </button>

          <button
            onClick={scrollToServices}
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              padding: '1.25rem 3rem',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              backdropFilter: 'blur(10px)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: isMobile ? '100%' : 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = '#60a5fa';
              e.currentTarget.style.color = '#60a5fa';
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            {currentLanguage === 'en' ? 'View Services' : 'Просмотреть услуги'}
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '2rem',
          marginTop: '5rem',
          padding: '3rem 0',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          animation: 'fadeInUp 1s ease-out 1s both'
        }}>
          {[
            { number: '500+', label: currentLanguage === 'en' ? 'Projects Completed' : 'Завершенных проектов' },
            { number: '98%', label: currentLanguage === 'en' ? 'Client Satisfaction' : 'Удовлетворенность клиентов' },
            { number: '24/7', label: currentLanguage === 'en' ? 'Support Available' : 'Поддержка доступна' },
            { number: '5★', label: currentLanguage === 'en' ? 'Average Rating' : 'Средний рейтинг' }
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: '900',
                color: '#60a5fa',
                marginBottom: '0.5rem'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#cbd5e1',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
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
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
