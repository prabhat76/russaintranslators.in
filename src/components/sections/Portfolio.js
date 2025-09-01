import React, { useState, useRef, useEffect } from 'react';

// Pinterest-style Masonry CSS - Exact Pinterest Layout
const masonryStyles = `
.masonry-grid {
  column-count: 4;
  column-gap: 16px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}
.masonry-item {
  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
  break-inside: avoid;
  overflow: hidden;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0,0,0,0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0,0,0,0.1);
  cursor: pointer;
  position: relative;
}
.masonry-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(59,130,246,0.3);
  background: rgba(0,0,0,0.08);
  border-color: rgba(59,130,246,0.4);
}
.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px 16px 0 0;
  transition: transform 0.3s ease;
}
.masonry-item:hover img {
  transform: scale(1.02);
}
@media (max-width: 1200px) {
  .masonry-grid { 
    column-count: 3;
    column-gap: 12px;
    padding: 0 12px;
  }
  .masonry-item { margin-bottom: 12px; }
}
@media (max-width: 768px) {
  .masonry-grid { 
    column-count: 2;
    column-gap: 8px;
    padding: 0 8px;
  }
  .masonry-item { 
    margin-bottom: 8px;
    border-radius: 12px;
  }
  .masonry-item img { border-radius: 12px 12px 0 0; }
}
@media (max-width: 480px) {
  .masonry-grid { 
    column-count: 1;
    column-gap: 0;
    padding: 0;
  }
}
`;
const Portfolio = ({ currentLanguage, isMobile, isTablet }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState(6);
  const portfolioRef = useRef(null);

  // Portfolio items data
  // All images in /public/images for the masonry grid
  const imageFiles = [
    'sabrina-work-1.jpeg',
    'sabrina-work-2.jpeg',
    'sabrina-work-3.jpeg',
    'sabrina-work-4.jpeg',
    'sabrina-work-5.jpeg',
    'sabrina-work-6.jpeg',
    'sabrina-work-7.jpeg',
    'sabrina-work-8.jpeg',
    'sabrina-work-9.jpeg',
    'sabrina-work-10.jpeg',
    'sabrina-work-1 copy.jpeg',
    'sabrina-work-1 copy 2.jpeg',
    'sabrina-work-1 copy 3.jpeg',
    'sabrina-work-1 copy 4.jpeg',
    'sabrina-work-1 copy 5.jpeg',
    'sabrina-work-1 copy 6.jpeg',
    'sabrina-work-1 copy 7.jpeg',
    'sabrina-work-1 copy 8.jpeg'
  ];

  const portfolioItems = imageFiles.map((img, idx) => ({
    id: idx + 1,
    title: currentLanguage === 'en' ? `Project #${idx + 1}` : `Проект №${idx + 1}`,
    category: ['legal','medical','technical','marketing','academic','business','literary'][idx % 7],
    description: currentLanguage === 'en'
      ? 'Sample translation project with real client deliverables.'
      : 'Пример переводческого проекта с реальными результатами для клиента.',
    client: currentLanguage === 'en' ? `Client ${idx + 1}` : `Клиент ${idx + 1}`,
    pages: 20 + (idx * 5) % 100,
    timeframe: currentLanguage === 'en' ? `${2 + (idx % 7)} days` : `${2 + (idx % 7)} дня`,
    languages: idx % 2 === 0 ? 'EN → RU' : 'RU → EN',
    image: `/images/${img}`,
    tags: ['Translation', 'Professional', 'Portfolio'],
    year: 2024
  }));

  const categories = [
    { id: 'all', label: currentLanguage === 'en' ? 'All Projects' : 'Все проекты', icon: '📁' },
    { id: 'legal', label: currentLanguage === 'en' ? 'Legal' : 'Юридический', icon: '⚖️' },
    { id: 'medical', label: currentLanguage === 'en' ? 'Medical' : 'Медицинский', icon: '🏥' },
    { id: 'technical', label: currentLanguage === 'en' ? 'Technical' : 'Технический', icon: '🔧' },
    { id: 'business', label: currentLanguage === 'en' ? 'Business' : 'Бизнес', icon: '💼' },
    { id: 'marketing', label: currentLanguage === 'en' ? 'Marketing' : 'Маркетинг', icon: '📈' },
    { id: 'academic', label: currentLanguage === 'en' ? 'Academic' : 'Академический', icon: '🎓' },
    { id: 'literary', label: currentLanguage === 'en' ? 'Literary' : 'Художественный', icon: '📚' }
  ];

  // Filter portfolio items
  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const visiblePortfolioItems = filteredItems.slice(0, visibleItems);

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, filteredItems.length));
  };

  // Add CSS animations and hover effects
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
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
      
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      .masonry-item:hover .pinterest-overlay {
        opacity: 1 !important;
      }
      
      .masonry-item .pinterest-overlay {
        transition: opacity 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section 
      ref={portfolioRef}
      style={{
        padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 4rem',
        background: '#ffffff',
        color: '#2d3748',
        position: 'relative',
        overflow: 'hidden'
      }}>
  {/* Masonry CSS */}
  <style>{masonryStyles}</style>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 30% 20%, rgba(59,130,246,0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(168,85,247,0.1) 0%, transparent 50%),
          radial-gradient(circle at 20% 60%, rgba(34,197,94,0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }}></div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '900',
            marginBottom: '1rem',
            lineHeight: '1.1',
            color: '#1e40af',
            background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none'
          }}>
            {currentLanguage === 'en' ? 'Our Recent Work' : 'Наши недавние работы'}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {currentLanguage === 'en' 
              ? 'Explore our diverse portfolio of professional translation projects across various industries and document types'
              : 'Ознакомьтесь с нашим разнообразным портфолио профессиональных переводческих проектов в различных отраслях и типах документов'
            }
          </p>
        </div>

        {/* Filter Categories */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveFilter(category.id);
              }}
              style={{
                background: activeFilter === category.id 
                  ? 'linear-gradient(135deg, #3b82f6, #1e40af)'
                  : 'rgba(59,130,246,0.1)',
                border: `1px solid ${activeFilter === category.id ? '#3b82f6' : 'rgba(59,130,246,0.3)'}`,
                borderRadius: '25px',
                padding: '0.75rem 1.5rem',
                color: activeFilter === category.id ? 'white' : '#3b82f6',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== category.id) {
                  e.currentTarget.style.background = 'rgba(59,130,246,0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.color = '#1e40af';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== category.id) {
                  e.currentTarget.style.background = 'rgba(59,130,246,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.color = '#3b82f6';
                }
              }}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>


        {/* True Pinterest-style Masonry Portfolio Grid */}
        <div className="masonry-grid" style={{marginBottom: '3rem'}}>
          {visiblePortfolioItems.map((item, index) => (
            <div
              key={item.id}
              className="masonry-item"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Project Image */}
              <div style={{
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    minHeight: `${180 + (index % 6) * 60}px`,
                    maxHeight: `${320 + (index % 4) * 80}px`,
                    objectFit: 'cover'
                  }}
                  loading="lazy"
                />
                
                {/* Pinterest-style Overlay on Hover */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.4)',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}
                className="pinterest-overlay">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>�</div>
                    {currentLanguage === 'en' ? 'Pin to Board' : 'Сохранить'}
                  </div>
                </div>
                
                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255,255,255,0.95)',
                  color: '#1e40af',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                  {categories.find(cat => cat.id === item.category)?.icon}
                </div>
              </div>
              
              {/* Minimal Project Info */}
              <div style={{ padding: '12px' }}>
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#2d3748',
                  marginBottom: '6px',
                  lineHeight: '1.3',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {item.title}
                </h3>
                
                <p style={{
                  fontSize: '0.8rem',
                  color: '#6b7280',
                  lineHeight: '1.4',
                  marginBottom: '8px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.description}
                </p>
                
                {/* Language Badge */}
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(34,197,94,0.2)',
                  color: '#4ade80',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}>
                  {item.languages}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleItems < filteredItems.length && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={loadMore}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(59,130,246,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>📂</span>
              {currentLanguage === 'en' ? 'Load More Projects' : 'Загрузить еще проекты'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
