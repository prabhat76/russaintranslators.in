import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../../constants/content';

const Gallery = ({ currentLanguage, isMobile, isTablet, openModal }) => {
  const [showAllImages, setShowAllImages] = useState(false);

  return (
    <section style={{
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 4rem',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
      position: 'relative',
      minHeight: '100vh'
    }}>
      {/* Gallery Wall Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.02) 0px,
            rgba(0,0,0,0.02) 1px,
            transparent 1px,
            transparent 40px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(0,0,0,0.02) 0px,
            rgba(0,0,0,0.02) 1px,
            transparent 1px,
            transparent 40px
          )
        `,
        pointerEvents: 'none'
      }}></div>

      <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        {/* Gallery Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 2rem',
            background: 'rgba(59,130,246,0.1)',
            border: '2px solid #3b82f6',
            borderRadius: '30px',
            marginBottom: '2rem'
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: '#3b82f6',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {currentLanguage === 'en' ? '🖼️ Professional Gallery Wall' : '🖼️ Профессиональная галерея'}
            </span>
          </div>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '900',
            color: '#1e293b',
            marginBottom: '1rem',
            lineHeight: '1.1',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            {currentLanguage === 'en' ? 'Translation Portfolio' : 'Портфолио переводов'}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#64748b',
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
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(250px, 1fr))' : 
                              isTablet ? 'repeat(auto-fit, minmax(300px, 1fr))' : 
                              'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '2rem' : '2.5rem',
          maxWidth: '1800px',
          margin: '0 auto',
          gridAutoRows: 'max-content',
          justifyItems: 'center',
          alignItems: 'start'
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
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: `
                  0 4px 6px rgba(0,0,0,0.07),
                  0 10px 15px rgba(0,0,0,0.08),
                  inset 0 1px 0 rgba(255,255,255,0.9)
                `,
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                transform: `rotate(${(Math.sin(index * 17) * 3)}deg)`,
                transformOrigin: 'center center',
                width: `${isMobile ? Math.min(imageSize.width * 0.8, 280) : imageSize.width}px`,
                maxWidth: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.02) translateY(-8px)';
                e.currentTarget.style.boxShadow = `
                  0 20px 25px rgba(0,0,0,0.15),
                  0 30px 40px rgba(0,0,0,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.9)
                `;
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${(Math.sin(index * 17) * 3)}deg) scale(1) translateY(0px)`;
                e.currentTarget.style.boxShadow = `
                  0 4px 6px rgba(0,0,0,0.07),
                  0 10px 15px rgba(0,0,0,0.08),
                  inset 0 1px 0 rgba(255,255,255,0.9)
                `;
                e.currentTarget.style.zIndex = '1';
              }}
              onClick={() => openModal(index)}>
                
                {/* Gallery Frame */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: `${isMobile ? Math.min(imageSize.height * 0.8, 350) : imageSize.height}px`,
                  background: '#f8f9fa',
                  border: '3px solid #e9ecef',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '15px'
                }}>
                  <img 
                    src={image.src} 
                    alt={image.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.4s ease',
                      filter: 'brightness(0.95) contrast(1.05) saturate(1.1)'
                    }}
                  />
                  
                  {/* Photo Corner Tabs */}
                  <div style={{
                    position: 'absolute',
                    top: '-5px',
                    left: '20px',
                    width: '40px',
                    height: '20px',
                    background: 'rgba(255,255,255,0.9)',
                    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '20px',
                    width: '40px',
                    height: '20px',
                    background: 'rgba(255,255,255,0.9)',
                    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}></div>
                </div>

                {/* Gallery Label */}
                <div style={{
                  background: 'white',
                  padding: '12px 15px',
                  textAlign: 'center',
                  borderTop: '1px solid #e9ecef'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '5px',
                    fontFamily: 'serif'
                  }}>
                    {image.title}
                  </h4>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    margin: '5px 0',
                    fontStyle: 'italic'
                  }}>
                    {image.desc}
                  </p>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    marginTop: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: '500'
                  }}>
                    {index < 3 ? (currentLanguage === 'en' ? 'Business Meeting' : 'Деловая встреча') : 
                     index < 6 ? (currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов') : 
                     (currentLanguage === 'en' ? 'Training Session' : 'Учебная сессия')}
                  </div>
                </div>

                {/* Gallery Number Plate */}
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '15px',
                  background: '#3b82f6',
                  color: 'white',
                  width: '30px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
                  boxShadow: '0 2px 4px rgba(59,130,246,0.3)'
                }}>
                  {index + 1}
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
              onClick={() => setShowAllImages(!showAllImages)}
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
    </section>
  );
};

export default Gallery;
