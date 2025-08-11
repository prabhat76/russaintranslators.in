import React, { useState, useRef, useEffect } from 'react';

const Portfolio = ({ currentLanguage, isMobile, isTablet }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState(6);
  const portfolioRef = useRef(null);

  // Portfolio items data
  const portfolioItems = [
    {
      id: 1,
      title: currentLanguage === 'en' ? 'Legal Contract Translation' : 'Перевод юридического договора',
      category: 'legal',
      description: currentLanguage === 'en' 
        ? 'Complex international business contract with precise legal terminology'
        : 'Сложный международный деловой договор с точной юридической терминологией',
      client: currentLanguage === 'en' ? 'Global Corp Ltd.' : 'Глобал Корп Лтд.',
      pages: 45,
      timeframe: currentLanguage === 'en' ? '3 days' : '3 дня',
      languages: 'EN → RU',
      image: '/images/sabrina-work-1.jpeg',
      tags: ['Contract', 'Business', 'Legal'],
      year: 2024
    },
    {
      id: 2,
      title: currentLanguage === 'en' ? 'Medical Research Documentation' : 'Медицинская исследовательская документация',
      category: 'medical',
      description: currentLanguage === 'en'
        ? 'Clinical trial protocols and pharmaceutical research papers'
        : 'Протоколы клинических испытаний и фармацевтические исследовательские работы',
      client: currentLanguage === 'en' ? 'MedTech Solutions' : 'МедТех Солюшнз',
      pages: 120,
      timeframe: currentLanguage === 'en' ? '7 days' : '7 дней',
      languages: 'RU → EN',
      image: '/images/sabrina-work-2.jpeg',
      tags: ['Medical', 'Research', 'Scientific'],
      year: 2024
    },
    {
      id: 3,
      title: currentLanguage === 'en' ? 'Technical Manual Translation' : 'Перевод технического руководства',
      category: 'technical',
      description: currentLanguage === 'en'
        ? 'Industrial equipment operation and maintenance manual'
        : 'Руководство по эксплуатации и обслуживанию промышленного оборудования',
      client: currentLanguage === 'en' ? 'TechnoMach Industries' : 'ТехноМаш Индастриз',
      pages: 85,
      timeframe: currentLanguage === 'en' ? '5 days' : '5 дней',
      languages: 'EN → RU',
      image: '/images/sabrina-work-3.jpeg',
      tags: ['Technical', 'Industrial', 'Manual'],
      year: 2024
    },
    {
      id: 4,
      title: currentLanguage === 'en' ? 'Marketing Campaign Localization' : 'Локализация маркетинговой кампании',
      category: 'marketing',
      description: currentLanguage === 'en'
        ? 'Brand messaging and advertising materials for Russian market'
        : 'Брендинговые сообщения и рекламные материалы для российского рынка',
      client: currentLanguage === 'en' ? 'Creative Agency Plus' : 'Креатив Эйдженси Плюс',
      pages: 25,
      timeframe: currentLanguage === 'en' ? '2 days' : '2 дня',
      languages: 'EN → RU',
      image: '/images/sabrina-work-4.jpeg',
      tags: ['Marketing', 'Branding', 'Creative'],
      year: 2024
    },
    {
      id: 5,
      title: currentLanguage === 'en' ? 'Academic Research Paper' : 'Академическая исследовательская работа',
      category: 'academic',
      description: currentLanguage === 'en'
        ? 'Scholarly article on international relations and diplomacy'
        : 'Научная статья по международным отношениям и дипломатии',
      client: currentLanguage === 'en' ? 'International University' : 'Международный университет',
      pages: 35,
      timeframe: currentLanguage === 'en' ? '4 days' : '4 дня',
      languages: 'RU → EN',
      image: '/images/sabrina-work-5.jpeg',
      tags: ['Academic', 'Research', 'Scholarly'],
      year: 2024
    },
    {
      id: 6,
      title: currentLanguage === 'en' ? 'Financial Report Translation' : 'Перевод финансового отчета',
      category: 'business',
      description: currentLanguage === 'en'
        ? 'Annual financial statements and investment documentation'
        : 'Годовая финансовая отчетность и инвестиционная документация',
      client: currentLanguage === 'en' ? 'Investment Group LLC' : 'Инвестиционная Группа ООО',
      pages: 55,
      timeframe: currentLanguage === 'en' ? '3 days' : '3 дня',
      languages: 'EN → RU',
      image: '/images/sabrina-work-6.jpeg',
      tags: ['Finance', 'Business', 'Investment'],
      year: 2024
    },
    {
      id: 7,
      title: currentLanguage === 'en' ? 'Software Documentation' : 'Документация программного обеспечения',
      category: 'technical',
      description: currentLanguage === 'en'
        ? 'User guides and API documentation for software platform'
        : 'Руководства пользователя и документация API для программной платформы',
      client: currentLanguage === 'en' ? 'SoftDev Technologies' : 'СофтДев Технолоджис',
      pages: 95,
      timeframe: currentLanguage === 'en' ? '6 days' : '6 дней',
      languages: 'EN → RU',
      image: '/images/sabrina-work-7.jpeg',
      tags: ['Software', 'Technical', 'Documentation'],
      year: 2024
    },
    {
      id: 8,
      title: currentLanguage === 'en' ? 'Literary Translation Project' : 'Проект художественного перевода',
      category: 'literary',
      description: currentLanguage === 'en'
        ? 'Contemporary Russian novel translation for international publication'
        : 'Перевод современного русского романа для международной публикации',
      client: currentLanguage === 'en' ? 'Publishing House International' : 'Издательский дом Интернэшнл',
      pages: 200,
      timeframe: currentLanguage === 'en' ? '14 days' : '14 дней',
      languages: 'RU → EN',
      image: '/images/sabrina-work-8.jpeg',
      tags: ['Literary', 'Novel', 'Publishing'],
      year: 2024
    },
    {
      id: 9,
      title: currentLanguage === 'en' ? 'Educational Curriculum' : 'Образовательная программа',
      category: 'academic',
      description: currentLanguage === 'en'
        ? 'University course materials and educational content'
        : 'Материалы университетского курса и образовательный контент',
      client: currentLanguage === 'en' ? 'Education Excellence' : 'Образование Эксселенс',
      pages: 75,
      timeframe: currentLanguage === 'en' ? '5 days' : '5 дней',
      languages: 'EN → RU',
      image: '/images/sabrina-work-9.jpeg',
      tags: ['Education', 'Curriculum', 'Academic'],
      year: 2024
    }
  ];

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

  // Add CSS animations
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
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
      
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
              {currentLanguage === 'en' ? '🎯 Translation Portfolio' : '🎯 Портфолио переводов'}
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
            {currentLanguage === 'en' ? 'Our Recent Work' : 'Наши недавние работы'}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#cbd5e1',
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
                setVisibleItems(6);
              }}
              style={{
                background: activeFilter === category.id 
                  ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                  : 'rgba(255,255,255,0.1)',
                border: `1px solid ${activeFilter === category.id ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.2)'}`,
                borderRadius: '25px',
                padding: '0.75rem 1.5rem',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== category.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== category.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto 3rem'
        }}>
          {visiblePortfolioItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '24px',
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              {/* Project Image */}
              <div style={{
                position: 'relative',
                height: '200px',
                overflow: 'hidden'
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                
                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(59,130,246,0.9)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                  {categories.find(cat => cat.id === item.category)?.icon} {categories.find(cat => cat.id === item.category)?.label}
                </div>

                {/* Languages Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(34,197,94,0.9)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                  {item.languages}
                </div>
              </div>

              {/* Project Details */}
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#f1f5f9',
                  marginBottom: '0.75rem',
                  lineHeight: '1.3'
                }}>
                  {item.title}
                </h3>
                
                <p style={{
                  fontSize: '0.95rem',
                  color: '#cbd5e1',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {item.description}
                </p>

                {/* Project Meta */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem',
                  fontSize: '0.85rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#94a3b8'
                  }}>
                    <span>📄</span>
                    <span>{item.pages} {currentLanguage === 'en' ? 'pages' : 'страниц'}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#94a3b8'
                  }}>
                    <span>⏱️</span>
                    <span>{item.timeframe}</span>
                  </div>
                </div>

                {/* Client */}
                <div style={{
                  fontSize: '0.9rem',
                  color: '#60a5fa',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  {currentLanguage === 'en' ? 'Client:' : 'Клиент:'} {item.client}
                </div>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      style={{
                        background: 'rgba(168,85,247,0.2)',
                        color: '#c4b5fd',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        border: '1px solid rgba(168,85,247,0.3)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
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

        {/* Portfolio Stats */}
        <div style={{
          marginTop: '4rem',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '4rem auto 0'
        }}>
          {[
            {
              icon: '📊',
              number: '500+',
              label: currentLanguage === 'en' ? 'Projects Completed' : 'Завершенных проектов'
            },
            {
              icon: '🏢',
              number: '200+',
              label: currentLanguage === 'en' ? 'Happy Clients' : 'Довольных клиентов'
            },
            {
              icon: '🌍',
              number: '50+',
              label: currentLanguage === 'en' ? 'Countries Served' : 'Обслуженных стран'
            },
            {
              icon: '⭐',
              number: '99%',
              label: currentLanguage === 'en' ? 'Client Satisfaction' : 'Удовлетворенность клиентов'
            }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '2rem 1rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                color: '#60a5fa',
                marginBottom: '0.5rem'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#cbd5e1',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
