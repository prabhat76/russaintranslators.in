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
            // Reached the end, reset to beginning
            container.scrollTo({ left: 0, behavior: 'smooth' });
            setCurrentIndex(0);
          } else {
            // Scroll to next image
            const nextScrollLeft = container.scrollLeft + scrollStep;
            container.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
            
            // Update current index based on scroll position
            const newIndex = Math.round(nextScrollLeft / scrollStep);
            setCurrentIndex(Math.min(newIndex, GALLERY_IMAGES.length - 1));
          }
        }, 3000); // Auto scroll every 3 seconds
      }

      return () => {
        if (interval) clearInterval(interval);
      };
    }, 1000); // Wait 1 second before starting auto scroll

    return () => clearTimeout(startDelay);
  }, [isAutoScrolling]);

  const handleUserInteraction = () => {
    setIsAutoScrolling(false);
    // Resume auto scroll after 10 seconds of no interaction
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const scrollToImage = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      if (!container) return;
      
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
        background: 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.1) 0%, transparent 50%)',
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
            borderRadius: '50px',
            marginBottom: '1rem'
          }}>
            <span style={{
              color: '#60a5fa',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {currentLanguage === 'en' ? '📱 Mobile Portfolio' : '📱 Мобильное портфолио'}
            </span>
          </div>
          
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {currentLanguage === 'en' ? 'Professional Work Gallery' : 'Галерея профессиональных работ'}
          </h2>
          
          <p style={{
            color: '#cbd5e1',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            {currentLanguage === 'en' 
              ? 'Swipe through our collection of successful translation projects and professional services.'
              : 'Просмотрите нашу коллекцию успешных переводческих проектов и профессиональных услуг.'}
          </p>
        </div>

        {/* Image Gallery */}
        <div 
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1rem',
            padding: '0 1rem',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          ref={scrollRef}
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
              animation: 'slideIn 0.6s ease-out ' + (index * 0.1) + 's both'
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
                
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  padding: '2rem 1rem 1rem',
                  color: 'white'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    opacity: 0.8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.25rem'
                  }}>
                    {currentLanguage === 'en' ? 'Professional Work' : 'Профессиональная работа'}
                  </div>
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
                    lineHeight: '1.2'
                  }}>
                    {image.title}
                  </h3>
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    lineHeight: '1.3',
                    margin: 0
                  }}>
                    {image.desc}
                  </p>
                </div>
              </div>

              {/* Quality Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(16,185,129,0.9)',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                ✓ {currentLanguage === 'en' ? 'Certified' : 'Сертифицировано'}
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
