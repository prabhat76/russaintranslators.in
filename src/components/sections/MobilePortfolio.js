import React, { useEffect, useRef, useState } from 'react';
import { GALLERY_IMAGES } from '../../constants/content';

const MobilePortfolio = ({ currentLanguage, isMobile, isTablet }) => {
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll functionality
  useEffect(() => {
    // Add a small delay to ensure component is fully mounted
    const startDelay = setTimeout(() => {
      let interval;
      if (isAutoScrolling && scrollRef.current) {
        interval = setInterval(() => {
          const container = scrollRef.current;
          if (!container) return; // Additional safety check
          
          const maxScroll = container.scrollWidth - container.clientWidth;
          const scrollStep = container.clientWidth * 0.8; // Scroll by 80% of container width
          
          if (container.scrollLeft >= maxScroll - 10) {
            // Reset to beginning when reaching the end
            container.scrollTo({ left: 0, behavior: 'smooth' });
            setCurrentIndex(0);
          } else {
            // Scroll to next position
            const newScrollLeft = Math.min(container.scrollLeft + scrollStep, maxScroll);
            container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
            setCurrentIndex(Math.floor(newScrollLeft / scrollStep));
          }
        }, 3000); // Change slide every 3 seconds
      }

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, 1000); // Wait 1 second before starting auto-scroll

    return () => {
      clearTimeout(startDelay);
    };
  }, [isAutoScrolling]);

  // Pause auto scroll on user interaction
  const handleUserInteraction = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000); // Resume after 10 seconds
  };

  const scrollToImage = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      if (!container) return; // Additional safety check
      
      const imageWidth = container.clientWidth * 0.8;
      const scrollLeft = index * imageWidth;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      setCurrentIndex(index);
      handleUserInteraction();
    }
  };

  if (!isMobile) return null; // Only show on mobile

  return (
    <section style={{
      padding: '3rem 0',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(168,85,247,0.1) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite'
      }}></div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          padding: '0 1rem'
        }}>
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
              {currentLanguage === 'en' ? '📱 Mobile Portfolio' : '📱 Мобильное портфолио'}
            </span>
          </div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '0.5rem',
            lineHeight: '1.2'
          }}>
            {currentLanguage === 'en' ? 'Translation Work' : 'Переводческие работы'}
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#cbd5e1',
            lineHeight: '1.5'
          }}>
            {currentLanguage === 'en' 
              ? 'Swipe through our professional translation projects'
              : 'Просмотрите наши профессиональные переводческие проекты'
            }
          </p>
        </div>

        {/* Horizontal Scrolling Portfolio */}
        <div 
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '0 1rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onTouchStart={handleUserInteraction}
          onMouseDown={handleUserInteraction}
        >
          {GALLERY_IMAGES.slice(0, 8).map((image, index) => (
            <div key={index} style={{
              minWidth: '280px',
              width: '280px',
              height: '320px',
              position: 'relative',
              scrollSnapAlign: 'start',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
            }}>
              {/* Image Container */}
              <div style={{
                width: '100%',
                height: '220px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img 
                  src={image.src} 
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                
                {/* Overlay Gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  pointerEvents: 'none'
                }}></div>

                {/* Project Type Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(59,130,246,0.9)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                  {index < 3 ? (currentLanguage === 'en' ? 'Business' : 'Бизнес') : 
                   index < 6 ? (currentLanguage === 'en' ? 'Document' : 'Документ') : 
                   (currentLanguage === 'en' ? 'Training' : 'Обучение')}
                </div>
              </div>

              {/* Content */}
              <div style={{
                padding: '1rem',
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                    lineHeight: '1.3',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {image.title}
                  </h3>
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    lineHeight: '1.4',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {image.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '2rem',
          padding: '0 1rem'
        }}>
          {GALLERY_IMAGES.slice(0, 8).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToImage(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                background: currentIndex === index ? '#60a5fa' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS for animations and hiding scrollbar */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        /* Hide scrollbar */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MobilePortfolio;
