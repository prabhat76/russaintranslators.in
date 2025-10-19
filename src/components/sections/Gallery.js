import React, { useState, useEffect } from 'react';
import { GALLERY_IMAGES } from '../../constants/content';

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
    <section id="portfolio" className="section bg-secondary" style={{
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
          radial-gradient(ellipse at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 60%),
          radial-gradient(ellipse at 75% 75%, rgba(30, 64, 175, 0.03) 0%, transparent 70%),
          linear-gradient(225deg, transparent 40%, rgba(71, 85, 105, 0.02) 50%, transparent 60%)
        `,
        pointerEvents: 'none',
        zIndex: 1
      }}></div>
      
      {/* Artistic Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '6%',
        width: '90px',
        height: '90px',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        borderRadius: '18px',
        transform: 'rotate(12deg)',
        zIndex: 1,
        animation: 'float 10s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '18%',
        right: '8%',
        width: '70px',
        height: '70px',
        border: '1px solid rgba(71, 85, 105, 0.08)',
        borderRadius: '50%',
        zIndex: 1,
        animation: 'float 7s ease-in-out infinite reverse'
      }}></div>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {currentLanguage === 'en' ? 'Translation Portfolio' : 'Портфолио переводов'}
          </h2>
          <p className="section-subtitle">
            {currentLanguage === 'en' 
              ? 'Explore our extensive collection of professional translation work, showcasing expertise across diverse industries and document types'
              : 'Изучите нашу обширную коллекцию профессиональной переводческой работы, демонстрирующую экспертизу в различных отраслях и типах документов'
            }
          </p>
        </div>
        
        {/* Portfolio Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: 'var(--spacing-lg, 2rem)',
          position: 'relative',
          zIndex: 2
        }}>
          {(showAllImages ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, 9)).map((image, index) => (
            <div key={index} className="card portfolio-item" style={{
              background: 'var(--bg-primary, white)',
              borderRadius: 'var(--radius-lg, 20px)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))',
              border: '1px solid var(--secondary-light, #94a3b8)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.15))';
              e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
              
              // Show overlay
              const overlay = e.currentTarget.querySelector('.portfolio-overlay');
              if (overlay) {
                overlay.style.opacity = '1';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))';
              e.currentTarget.style.borderColor = 'var(--secondary-light, #94a3b8)';
              
              // Hide overlay
              const overlay = e.currentTarget.querySelector('.portfolio-overlay');
              if (overlay) {
                overlay.style.opacity = '0';
              }
            }}
            onClick={() => handleImageClick(index, image)}>
              
              {/* Image Container */}
              <div style={{
                position: 'relative',
                height: '300px',
                overflow: 'hidden',
                background: 'var(--bg-secondary, #f8fafc)'
              }}>
                <img 
                  src={image.src} 
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.3s ease'
                  }}
                />
                
                {/* Project Type Badge */}
                <div style={{
                  position: 'absolute',
                  top: 'var(--spacing-md, 1.5rem)',
                  right: 'var(--spacing-md, 1.5rem)',
                  background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                  color: 'white',
                  padding: '0.375rem 0.875rem',
                  borderRadius: 'var(--radius-full, 50px)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {index < 3 ? (currentLanguage === 'en' ? 'Business' : 'Бизнес') : 
                   index < 6 ? (currentLanguage === 'en' ? 'Document' : 'Документ') : 
                   (currentLanguage === 'en' ? 'Training' : 'Обучение')}
                </div>

                {/* Portfolio Overlay */}
                <div className="portfolio-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(30, 41, 59, 0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  backdropFilter: 'blur(4px)'
                }}>
                  <div style={{
                    background: 'var(--bg-primary, white)',
                    color: 'var(--primary-color, #1e293b)',
                    padding: '0.875rem 1.75rem',
                    borderRadius: 'var(--radius-full, 50px)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))'
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>🔍</span>
                    {currentLanguage === 'en' ? 'View Details' : 'Посмотреть детали'}
                  </div>
                </div>
              </div>

              {/* Portfolio Content */}
              <div style={{
                padding: 'var(--spacing-lg, 2rem)'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'var(--primary-color, #1e293b)',
                  marginBottom: 'var(--spacing-sm, 1rem)',
                  lineHeight: '1.3'
                }}>
                  {image.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary, #475569)',
                  lineHeight: '1.6',
                  marginBottom: 'var(--spacing-md, 1.5rem)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {image.desc}
                </p>

                {/* Project Details */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 'var(--spacing-md, 1.5rem)',
                  borderTop: '1px solid var(--secondary-light, #94a3b8)'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted, #64748b)',
                    fontWeight: '500'
                  }}>
                    {index < 3 ? (currentLanguage === 'en' ? 'Business Meeting' : 'Деловая встреча') : 
                     index < 6 ? (currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов') : 
                     (currentLanguage === 'en' ? 'Training Session' : 'Учебная сессия')}
                  </div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.875rem'
                  }}>
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        {GALLERY_IMAGES.length > 9 && (
          <div style={{
            textAlign: 'center',
            marginTop: 'var(--spacing-xl, 3rem)'
          }}>
            <button
              onClick={handleToggleImages}
              className={showAllImages ? "btn btn-secondary" : "btn btn-primary"}
              style={{
                background: showAllImages 
                  ? 'var(--bg-primary, white)'
                  : 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                color: showAllImages 
                  ? 'var(--primary-color, #1e293b)'
                  : 'white',
                border: showAllImages 
                  ? '1px solid var(--secondary-light, #94a3b8)'
                  : 'none',
                padding: '1rem 2.5rem',
                borderRadius: 'var(--radius-md, 12px)',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))'
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
              {showAllImages 
                ? (currentLanguage === 'en' ? `Show Less (${GALLERY_IMAGES.length - 9} Hidden)` : `Показать меньше (${GALLERY_IMAGES.length - 9} скрыто)`)
                : (currentLanguage === 'en' ? `View All Projects (${GALLERY_IMAGES.length - 9} More)` : `Посмотреть все проекты (еще ${GALLERY_IMAGES.length - 9})`)
              }
            </button>
          </div>
        )}

        {/* Portfolio Stats */}
        <div className="grid grid-4 text-center" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 'var(--spacing-lg, 2rem)',
          marginTop: 'var(--spacing-xl, 3rem)',
          padding: 'var(--spacing-lg, 2rem) 0',
          borderTop: '1px solid var(--secondary-light, #94a3b8)'
        }}>
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem',
              color: 'white'
            }}>
              📊
            </div>
            <h4 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: 'var(--primary-accent, #3b82f6)', 
              margin: '0 0 0.5rem 0' 
            }}>
              {GALLERY_IMAGES.length}+
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Projects Completed' : 'Проектов завершено'}
            </p>
          </div>
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem',
              color: 'white'
            }}>
              🏢
            </div>
            <h4 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: 'var(--primary-accent, #3b82f6)', 
              margin: '0 0 0.5rem 0' 
            }}>
              5+
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Industries Served' : 'Отраслей обслужено'}
            </p>
          </div>
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem',
              color: 'white'
            }}>
              🌍
            </div>
            <h4 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: 'var(--primary-accent, #3b82f6)', 
              margin: '0 0 0.5rem 0' 
            }}>
              10+
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Countries Served' : 'Стран обслужено'}
            </p>
          </div>
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem',
              color: 'white'
            }}>
              ⭐
            </div>
            <h4 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: 'var(--primary-accent, #3b82f6)', 
              margin: '0 0 0.5rem 0' 
            }}>
              99%
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Client Satisfaction' : 'Удовлетворенность клиентов'}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card text-center" style={{
          background: 'var(--bg-primary, white)',
          borderRadius: 'var(--radius-lg, 20px)',
          padding: 'var(--spacing-xl, 3rem)',
          marginTop: 'var(--spacing-xl, 3rem)',
          border: '1px solid var(--secondary-light, #94a3b8)'
        }}>
          <h3 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: 'var(--primary-color, #1e293b)',
            marginBottom: 'var(--spacing-md, 1.5rem)'
          }}>
            {currentLanguage === 'en' ? 'Ready to Start Your Project?' : 'Готовы начать свой проект?'}
          </h3>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary, #475569)',
            marginBottom: 'var(--spacing-lg, 2rem)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {currentLanguage === 'en' 
              ? 'Join our satisfied clients and experience professional translation services that deliver results. Contact us today for a free consultation.'
              : 'Присоединяйтесь к нашим довольным клиентам и получите профессиональные переводческие услуги, которые приносят результаты. Свяжитесь с нами сегодня для бесплатной консультации.'
            }
          </p>
          <button 
            className="btn btn-primary"
            style={{
              background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
              color: 'white',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: 'var(--radius-md, 12px)',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))'
            }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))';
            }}
          >
            {currentLanguage === 'en' ? 'Start Your Project' : 'Начать ваш проект'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
