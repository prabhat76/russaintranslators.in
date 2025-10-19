import React from 'react';

const Services = ({ currentLanguage, isMobile, isTablet }) => {
  const services = [
    {
      icon: '📄',
      title: currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов',
      description: currentLanguage === 'en' 
        ? 'Professional translation of legal, business, and personal documents with certified accuracy and cultural precision.'
        : 'Профессиональный перевод юридических, деловых и личных документов с сертифицированной точностью и культурной точностью.',
      features: currentLanguage === 'en' 
        ? ['Legal Documents', 'Business Contracts', 'Personal Certificates', 'Academic Transcripts']
        : ['Юридические документы', 'Деловые контракты', 'Личные сертификаты', 'Академические справки'],
      premium: true
    },
    {
      icon: '🎯',
      title: currentLanguage === 'en' ? 'Business Translation' : 'Деловой перевод',
      description: currentLanguage === 'en'
        ? 'Strategic business communication translation enabling seamless international operations and partnerships.'
        : 'Стратегический перевод деловой коммуникации, обеспечивающий бесшовные международные операции и партнерства.',
      features: currentLanguage === 'en'
        ? ['Email Communication', 'Marketing Materials', 'Presentations', 'Financial Reports']
        : ['Email коммуникация', 'Маркетинговые материалы', 'Презентации', 'Финансовые отчеты']
    },
    {
      icon: '🗣️',
      title: currentLanguage === 'en' ? 'Interpretation Services' : 'Услуги переводчика',
      description: currentLanguage === 'en'
        ? 'Real-time interpretation for critical meetings, conferences, and high-stakes business negotiations.'
        : 'Перевод в реальном времени для критически важных встреч, конференций и ответственных деловых переговоров.',
      features: currentLanguage === 'en'
        ? ['Live Meetings', 'Conference Calls', 'Business Negotiations', 'Cultural Mediation']
        : ['Живые встречи', 'Конференц-звонки', 'Деловые переговоры', 'Культурное посредничество']
    },
    {
      icon: '⚡',
      title: currentLanguage === 'en' ? 'Express Translation' : 'Экспресс-перевод',
      description: currentLanguage === 'en'
        ? 'Rapid, same-day translation services for urgent business needs and time-critical documents.'
        : 'Быстрые переводческие услуги в тот же день для срочных деловых потребностей и критически важных документов.',
      features: currentLanguage === 'en'
        ? ['Same-day Delivery', 'Emergency Support', 'Priority Processing', '24/7 Availability']
        : ['Доставка в тот же день', 'Экстренная поддержка', 'Приоритетная обработка', 'Доступность 24/7'],
      urgent: true
    },
    {
      icon: '🌐',
      title: currentLanguage === 'en' ? 'Website Localization' : 'Локализация сайтов',
      description: currentLanguage === 'en'
        ? 'Complete website translation and cultural adaptation for Russian-speaking markets and audiences.'
        : 'Полный перевод сайта и культурная адаптация для русскоязычных рынков и аудиторий.',
      features: currentLanguage === 'en'
        ? ['Content Translation', 'Cultural Adaptation', 'SEO Optimization', 'User Experience']
        : ['Перевод контента', 'Культурная адаптация', 'SEO оптимизация', 'Пользовательский опыт']
    },
    {
      icon: '🎓',
      title: currentLanguage === 'en' ? 'Educational Support' : 'Образовательная поддержка',
      description: currentLanguage === 'en'
        ? 'Specialized academic translation services for students, researchers, and educational institutions worldwide.'
        : 'Специализированные академические переводческие услуги для студентов, исследователей и образовательных учреждений по всему миру.',
      features: currentLanguage === 'en'
        ? ['Research Papers', 'Thesis Translation', 'Course Materials', 'Academic Correspondence']
        : ['Исследовательские работы', 'Перевод диссертаций', 'Учебные материалы', 'Академическая переписка']
    }
  ];

  return (
    <section id="services" className="section bg-primary" style={{
      background: 'linear-gradient(180deg, var(--bg-primary, white) 0%, #f8fafc 100%)',
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
          radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 80%, rgba(30, 58, 138, 0.03) 0%, transparent 70%),
          linear-gradient(135deg, transparent 30%, rgba(59, 130, 246, 0.01) 50%, transparent 70%)
        `,
        pointerEvents: 'none',
        zIndex: 1
      }}></div>
      
      {/* Premium Decorative Grid */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '40px',
        height: '40px',
        border: '1px solid rgba(59, 130, 246, 0.08)',
        borderRadius: '8px',
        transform: 'rotate(45deg)',
        zIndex: 1,
        animation: 'float 12s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '30px',
        height: '30px',
        border: '1px solid rgba(71, 85, 105, 0.06)',
        borderRadius: '50%',
        zIndex: 1,
        animation: 'float 9s ease-in-out infinite reverse'
      }}></div>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {currentLanguage === 'en' ? 'Professional Translation Services' : 'Профессиональные переводческие услуги'}
          </h2>
          <p className="section-subtitle">
            {currentLanguage === 'en' 
              ? 'Comprehensive Russian translation solutions designed for businesses seeking reliable, culturally-aware communication across international markets'
              : 'Комплексные решения русского перевода, разработанные для компаний, стремящихся к надежной, культурно-осведомленной коммуникации на международных рынках'
            }
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-3" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: 'var(--spacing-lg, 2rem)',
          position: 'relative',
          zIndex: 2
        }}>
          {services.map((service, index) => (
            <div key={index} className="card service-card" style={{
              background: 'var(--bg-primary, white)',
              borderRadius: 'var(--radius-lg, 20px)',
              padding: 'var(--spacing-lg, 2rem)',
              boxShadow: 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))',
              border: '1px solid var(--secondary-light, #94a3b8)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.15))';
              e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))';
              e.currentTarget.style.borderColor = 'var(--secondary-light, #94a3b8)';
            }}>
              
              {/* Premium/Urgent Badge */}
              {(service.premium || service.urgent) && (
                <div style={{
                  position: 'absolute',
                  top: 'var(--spacing-md, 1.5rem)',
                  right: 'var(--spacing-md, 1.5rem)',
                  background: service.premium 
                    ? 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))'
                    : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full, 50px)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {service.premium ? 'Premium' : 'Express'}
                </div>
              )}

              {/* Service Icon */}
              <div style={{
                width: '72px',
                height: '72px',
                background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                borderRadius: 'var(--radius-md, 12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: 'var(--spacing-md, 1.5rem)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: '3px',
                  background: 'var(--bg-primary, white)',
                  borderRadius: 'var(--radius-md, 12px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {service.icon}
                </div>
              </div>

              {/* Service Content */}
              <h3 style={{
                fontSize: '1.375rem',
                fontWeight: '700',
                color: 'var(--primary-color, #1e293b)',
                marginBottom: 'var(--spacing-sm, 1rem)',
                lineHeight: '1.3'
              }}>
                {service.title}
              </h3>

              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary, #475569)',
                lineHeight: '1.6',
                marginBottom: 'var(--spacing-md, 1.5rem)'
              }}>
                {service.description}
              </p>

              {/* Service Features */}
              <div style={{
                borderTop: '1px solid var(--secondary-light, #94a3b8)',
                paddingTop: 'var(--spacing-md, 1.5rem)'
              }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--text-muted, #64748b)',
                  marginBottom: 'var(--spacing-sm, 1rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {currentLanguage === 'en' ? 'Included:' : 'Включено:'}
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.5rem'
                }}>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary, #475569)'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        background: 'var(--primary-accent, #3b82f6)',
                        borderRadius: '50%',
                        marginRight: '0.75rem',
                        flexShrink: 0
                      }}></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="card" style={{
          textAlign: 'center',
          marginTop: 'var(--spacing-xl, 3rem)',
          padding: 'var(--spacing-xl, 3rem)',
          background: 'var(--bg-secondary, #f8fafc)',
          borderRadius: 'var(--radius-lg, 20px)',
          border: '1px solid var(--secondary-light, #94a3b8)'
        }}>
          <h3 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: 'var(--primary-color, #1e293b)',
            marginBottom: 'var(--spacing-md, 1.5rem)'
          }}>
            {currentLanguage === 'en' ? 'Need a Custom Solution?' : 'Нужно индивидуальное решение?'}
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
              ? 'Every business has unique translation needs. Let\'s discuss your specific requirements and create a tailored solution that ensures perfect communication across cultures.'
              : 'У каждого бизнеса есть уникальные потребности в переводе. Давайте обсудим ваши конкретные требования и создадим индивидуальное решение, обеспечивающее идеальную коммуникацию между культурами.'
            }
          </p>
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md, 1.5rem)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
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
              {currentLanguage === 'en' ? 'Get Custom Quote' : 'Получить индивидуальное предложение'}
            </button>
            <button 
              className="btn btn-secondary"
              style={{
                background: 'var(--bg-primary, white)',
                color: 'var(--primary-color, #1e293b)',
                border: '1px solid var(--secondary-light, #94a3b8)',
                padding: '1rem 2.5rem',
                borderRadius: 'var(--radius-md, 12px)',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))';
              }}
            >
              {currentLanguage === 'en' ? 'View Portfolio' : 'Посмотреть портфолио'}
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
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
              ⚡
            </div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: 'var(--primary-color, #1e293b)', 
              margin: '0 0 0.5rem 0' 
            }}>
              {currentLanguage === 'en' ? 'Fast Delivery' : 'Быстрая доставка'}
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? '24-48 hours' : '24-48 часов'}
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
              🎯
            </div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: 'var(--primary-color, #1e293b)', 
              margin: '0 0 0.5rem 0' 
            }}>
              {currentLanguage === 'en' ? '99% Accuracy' : '99% точность'}
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Quality guaranteed' : 'Гарантия качества'}
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
              🛡️
            </div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: 'var(--primary-color, #1e293b)', 
              margin: '0 0 0.5rem 0' 
            }}>
              {currentLanguage === 'en' ? 'Confidential' : 'Конфиденциально'}
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? 'Secure handling' : 'Безопасная обработка'}
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
              🤝
            </div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: 'var(--primary-color, #1e293b)', 
              margin: '0 0 0.5rem 0' 
            }}>
              {currentLanguage === 'en' ? 'Trusted' : 'Доверенный'}
            </h4>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary, #475569)', 
              margin: 0 
            }}>
              {currentLanguage === 'en' ? '1000+ clients' : '1000+ клиентов'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
