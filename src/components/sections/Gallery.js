import React, { useState, useEffect } from 'react';
import { GALLERY_IMAGES } from '../../constants/content';

// Simple analytics tracking function
const trackEvent = (eventType, elementName, section, additionalData = {}) => {
  try {
    // Log to console and store in window object for debugging
    const event = {
      type: eventType,
      elementName,
      section,
      timestamp: new Date().toISOString(),
      ...additionalData
    };
    
    console.log('Analytics Event:', event);
    
    // Store in window for debugging
    window.analyticsEvents = window.analyticsEvents || [];
    window.analyticsEvents.push(event);
    
    // If Adobe Analytics is available, use it
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

const Gallery = ({ currentLanguage, isMobile, isTablet, openModal }) => {
  const [showAllImages, setShowAllImages] = useState(false);

  // Track page view when component mounts
  useEffect(() => {
    trackEvent('pageView', 'Gallery', 'portfolio', { language: currentLanguage });
  }, [currentLanguage]);

  // Handle image click with analytics
  const handleImageClick = (index, image) => {
    trackEvent('galleryInteraction', `gallery-image-${index}`, 'gallery', {
      action: 'image_click',
      imageName: image.title,
      imageIndex: index
    });
    openModal(index);
  };

  // Handle show more/less with analytics
  const handleToggleImages = () => {
    const action = showAllImages ? 'show_less' : 'show_more';
    trackEvent('click', 'gallery-toggle', 'gallery', { action });
    setShowAllImages(!showAllImages);
  };

  return (
    <section style={{
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 4rem',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      position: 'relative',
      minHeight: '100vh',
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
        pointerEvents: 'none'
      }}></div>

      <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        {/* Gallery Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 2rem',
            background: 'rgba(59,130,246,0.2)',
            border: '2px solid rgba(59,130,246,0.3)',
            borderRadius: '30px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: '#60a5fa',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {currentLanguage === 'en' ? '🖼️ Professional Gallery' : '🖼️ Профессиональная галерея'}
            </span>
          </div>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '900',
            marginBottom: '1rem',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            {currentLanguage === 'en' ? 'Translation Portfolio' : 'Портфолио переводов'}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#cbd5e1',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {currentLanguage === 'en' 
              ? 'Complete visual showcase of professional Russian translation work'
              : 'Полная визуальная демонстрация профессиональной работы по русскому переводу'
            }
          </p>
        </div>
        
        {/* Wall Gallery Grid */}
        <div style={{
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: isMobile ? 'none' : 
                              isTablet ? 'repeat(auto-fit, minmax(300px, 1fr))' : 
                              'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '1.5rem' : '2.5rem',
          maxWidth: '1800px',
          margin: '0 auto',
          gridAutoRows: isMobile ? 'none' : 'max-content',
          justifyItems: isMobile ? 'none' : 'center',
          alignItems: isMobile ? 'center' : 'start',
          // Mobile horizontal scroll properties
          overflowX: isMobile ? 'auto' : 'visible',
          overflowY: 'visible',
          padding: isMobile ? '0 1rem 1rem 1rem' : '0',
          scrollSnapType: isMobile ? 'x mandatory' : 'none',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: isMobile ? 'none' : 'auto',
          msOverflowStyle: isMobile ? 'none' : 'auto'
        }}>
          {(showAllImages ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, 10)).map((image, index) => {
            // Create different natural aspect ratios for variety
            const aspectRatios = [
              { width: 300, height: 400 }, // Portrait
              { width: 400, height: 300 }, // Landscape
              { width: 350, height: 450 }, // Tall portrait
              { width: 450, height: 300 }, // Wide landscape
              { width: 320, height: 320 }, // Square
              { width: 380, height: 280 }, // Wide
              { width: 280, height: 380 }, // Tall
              { width: 420, height: 350 }, // Medium landscape
              { width: 340, height: 420 }, // Medium portrait
              { width: 400, height: 400 }  // Large square
            ];
            
            const imageSize = aspectRatios[index % aspectRatios.length];
            
            return (
              <div key={index} style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: isMobile ? '16px' : '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isMobile ? 'none' : `rotate(${(Math.sin(index * 17) * 2)}deg)`,
                transformOrigin: 'center center',
                width: isMobile ? '280px' : `${Math.min(imageSize.width, 320)}px`,
                height: isMobile ? 'auto' : 'auto',
                minHeight: isMobile ? '350px' : '400px',
                minWidth: isMobile ? '280px' : 'auto',
                maxWidth: isMobile ? '280px' : '100%',
                flexShrink: isMobile ? 0 : 'initial',
                scrollSnapAlign: isMobile ? 'start' : 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                if (isMobile) {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                } else {
                  e.currentTarget.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
                }
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                
                // Show overlay
                const overlay = e.currentTarget.querySelector('.image-overlay');
                if (overlay) {
                  overlay.style.opacity = '1';
                  overlay.querySelector('div').style.transform = 'scale(1)';
                }
              }}
              onMouseLeave={(e) => {
                if (isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                } else {
                  e.currentTarget.style.transform = `rotate(${(Math.sin(index * 17) * 2)}deg) translateY(0) scale(1)`;
                }
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                
                // Hide overlay
                const overlay = e.currentTarget.querySelector('.image-overlay');
                if (overlay) {
                  overlay.style.opacity = '0';
                  overlay.querySelector('div').style.transform = 'scale(0.9)';
                }
              }}
              onClick={() => handleImageClick(index, image)}>
                
                {/* Gallery Frame */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: isMobile ? 'auto' : 'auto',
                  minHeight: isMobile ? '220px' : '250px',
                  overflow: 'hidden',
                  marginBottom: isMobile ? '0' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.05)'
                }}>
                  <img 
                    src={image.src} 
                    alt={image.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: isMobile ? '300px' : '350px',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      transition: 'transform 0.3s ease',
                      borderRadius: '8px'
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

                  {/* View Full Image Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    zIndex: 5
                  }}
                  className="image-overlay">
                    <div style={{
                      background: 'rgba(59,130,246,0.9)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255,255,255,0.3)',
                      transform: 'scale(0.9)',
                      transition: 'transform 0.3s ease'
                    }}>
                      🔍 {currentLanguage === 'en' ? 'View Full Image' : 'Посмотреть полное изображение'}
                    </div>
                  </div>

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

                  {/* Zoom Icon Indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'all 0.3s ease',
                    opacity: 0.7
                  }}>
                    🔍
                  </div>
                </div>

                {/* Gallery Label */}
                <div style={{
                  padding: isMobile ? '1rem' : '1.5rem',
                  minHeight: isMobile ? '120px' : '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: '1',
                  marginTop: 'auto'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: isMobile ? '1rem' : '1.2rem',
                      fontWeight: '600',
                      color: '#f1f5f9',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: isMobile ? 'nowrap' : 'normal'
                    }}>
                      {image.title}
                    </h4>
                    <p style={{
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      color: '#cbd5e1',
                      lineHeight: '1.4',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      margin: '0'
                    }}>
                      {image.desc}
                    </p>
                  </div>
                  {!isMobile && (
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#94a3b8',
                      marginTop: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: '500'
                    }}>
                      {index < 3 ? (currentLanguage === 'en' ? 'Business Meeting' : 'Деловая встреча') : 
                       index < 6 ? (currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов') : 
                       (currentLanguage === 'en' ? 'Training Session' : 'Учебная сессия')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        {GALLERY_IMAGES.length > 10 && (
          <div style={{
            textAlign: 'center',
            marginTop: '4rem'
          }}>
            <button
              onClick={handleToggleImages}
              style={{
                background: showAllImages 
                  ? 'linear-gradient(135deg, #64748b, #475569)' 
                  : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(59,130,246,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = showAllImages 
                  ? '0 15px 35px rgba(100,116,139,0.4)'
                  : '0 15px 35px rgba(59,130,246,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                e.currentTarget.style.boxShadow = showAllImages 
                  ? '0 10px 25px rgba(100,116,139,0.3)'
                  : '0 10px 25px rgba(59,130,246,0.3)';
              }}
            >
              {showAllImages 
                ? (currentLanguage === 'en' ? `Show Less (${GALLERY_IMAGES.length - 10} Hidden)` : `Показать меньше (${GALLERY_IMAGES.length - 10} скрыто)`)
                : (currentLanguage === 'en' ? `See More (${GALLERY_IMAGES.length - 10} More)` : `Посмотреть больше (еще ${GALLERY_IMAGES.length - 10})`)
              }
            </button>
          </div>
        )}
      </div>

      {/* Mobile Gallery Scroll Indicator */}
      {isMobile && (
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          color: '#64748b',
          fontSize: '0.9rem'
        }}>
          ← {currentLanguage === 'en' ? 'Swipe to see more' : 'Проведите пальцем, чтобы увидеть больше'} →
          <br />
          <span style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>
            📱 {currentLanguage === 'en' ? 'Tap any image to view full size' : 'Нажмите на любое изображение для полного просмотра'}
          </span>
        </div>
      )}

      {/* CSS for mobile scrollbar hiding and animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }
        
        @media (max-width: 768px) {
          div::-webkit-scrollbar {
            display: none;
          }
          div {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
