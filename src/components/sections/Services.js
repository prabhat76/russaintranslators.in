import React from 'react';

const Services = ({ currentLanguage, isMobile, isTablet }) => {
  const services = [
    {
      icon: '📄',
      title: currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов',
      description: currentLanguage === 'en' 
        ? 'Professional translation of legal, business, and personal documents with certified accuracy.'
        : 'Профессиональный перевод юридических, деловых и личных документов с сертифицированной точностью.',
      features: currentLanguage === 'en' 
        ? ['Legal Documents', 'Business Contracts', 'Personal Certificates', 'Academic Transcripts']
        : ['Юридические документы', 'Деловые контракты', 'Личные сертификаты', 'Академические справки']
    },
    {
      icon: '🎯',
      title: currentLanguage === 'en' ? 'Business Translation' : 'Деловой перевод',
      description: currentLanguage === 'en'
        ? 'Specialized business communication translation for international operations and partnerships.'
        : 'Специализированный перевод деловой коммуникации для международных операций и партнерств.',
      features: currentLanguage === 'en'
        ? ['Email Communication', 'Marketing Materials', 'Presentations', 'Reports']
        : ['Email коммуникация', 'Маркетинговые материалы', 'Презентации', 'Отчеты']
    },
    {
      icon: '🗣️',
      title: currentLanguage === 'en' ? 'Interpretation Services' : 'Услуги переводчика',
      description: currentLanguage === 'en'
        ? 'Real-time interpretation for meetings, conferences, and important business discussions.'
        : 'Перевод в реальном времени для встреч, конференций и важных деловых переговоров.',
      features: currentLanguage === 'en'
        ? ['Live Meetings', 'Conference Calls', 'Business Negotiations', 'Cultural Mediation']
        : ['Живые встречи', 'Конференц-звонки', 'Деловые переговоры', 'Культурное посредничество']
    },
    {
      icon: '⚡',
      title: currentLanguage === 'en' ? 'Express Translation' : 'Экспресс-перевод',
      description: currentLanguage === 'en'
        ? 'Fast, same-day translation services for urgent business needs and time-sensitive documents.'
        : 'Быстрые переводческие услуги в тот же день для срочных деловых потребностей и документов.',
      features: currentLanguage === 'en'
        ? ['Same-day Delivery', 'Emergency Support', 'Priority Processing', '24/7 Availability']
        : ['Доставка в тот же день', 'Экстренная поддержка', 'Приоритетная обработка', 'Доступность 24/7']
    },
    {
      icon: '🌐',
      title: currentLanguage === 'en' ? 'Website Localization' : 'Локализация сайтов',
      description: currentLanguage === 'en'
        ? 'Complete website translation and cultural adaptation for Russian-speaking markets.'
        : 'Полный перевод сайта и культурная адаптация для русскоязычных рынков.',
      features: currentLanguage === 'en'
        ? ['Content Translation', 'Cultural Adaptation', 'SEO Optimization', 'User Experience']
        : ['Перевод контента', 'Культурная адаптация', 'SEO оптимизация', 'Пользовательский опыт']
    },
    {
      icon: '🎓',
      title: currentLanguage === 'en' ? 'Educational Support' : 'Образовательная поддержка',
      description: currentLanguage === 'en'
        ? 'Academic translation services for students, researchers, and educational institutions.'
        : 'Академические переводческие услуги для студентов, исследователей и образовательных учреждений.',
      features: currentLanguage === 'en'
        ? ['Research Papers', 'Thesis Translation', 'Course Materials', 'Academic Correspondence']
        : ['Исследовательские работы', 'Перевод диссертаций', 'Учебные материалы', 'Академическая переписка']
    }
  ];

  return (
    <section style={{
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 2rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      position: 'relative',
      width: '100%'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(45deg, rgba(59,130,246,0.03) 25%, transparent 25%),
          linear-gradient(-45deg, rgba(59,130,246,0.03) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, rgba(59,130,246,0.03) 75%),
          linear-gradient(-45deg, transparent 75%, rgba(59,130,246,0.03) 75%)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none'
      }}></div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
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
              {currentLanguage === 'en' ? '🚀 Professional Services' : '🚀 Профессиональные услуги'}
            </span>
          </div>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '900',
            color: '#1e293b',
            marginBottom: '1rem',
            lineHeight: '1.1'
          }}>
            {currentLanguage === 'en' ? 'Translation Services' : 'Переводческие услуги'}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#64748b',
            maxWidth: isMobile ? '100%' : isTablet ? '80%' : '900px',
            margin: '0 auto'
          }}>
            {currentLanguage === 'en' 
              ? 'Comprehensive Russian translation solutions tailored to your specific business needs and industry requirements'
              : 'Комплексные решения русского перевода, адаптированные к вашим конкретным деловым потребностям и отраслевым требованиям'
            }
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? '1.5rem' : '2rem',
          width: '100%',
          padding: '0 1rem'
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '1px solid rgba(226,232,240,0.8)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(59,130,246,0.15)';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
            }}>
              
              {/* Background Gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: `linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)`,
                borderRadius: '24px 24px 0 0'
              }}></div>

              {/* Service Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 25px rgba(59,130,246,0.3)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: '2px',
                  background: 'white',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {service.icon}
                </div>
              </div>

              {/* Service Content */}
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                {service.title}
              </h3>

              <p style={{
                fontSize: '1rem',
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {service.description}
              </p>

              {/* Service Features */}
              <div style={{
                borderTop: '1px solid #f1f5f9',
                paddingTop: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#475569',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {currentLanguage === 'en' ? 'Key Features:' : 'Ключевые особенности:'}
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem'
                }}>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.85rem',
                      color: '#64748b'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        background: '#3b82f6',
                        borderRadius: '50%',
                        marginRight: '0.5rem',
                        flexShrink: 0
                      }}></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Indicator */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.7,
                transition: 'all 0.3s ease'
              }}>
                <span style={{
                  fontSize: '1.2rem',
                  color: '#64748b'
                }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            {currentLanguage === 'en' ? 'Need Custom Solutions?' : 'Нужны индивидуальные решения?'}
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#64748b',
            marginBottom: '2rem',
            maxWidth: isMobile ? '100%' : '600px',
            margin: '0 auto 2rem'
          }}>
            {currentLanguage === 'en' 
              ? 'Every project is unique. Contact us to discuss your specific translation requirements and get a personalized quote.'
              : 'Каждый проект уникален. Свяжитесь с нами, чтобы обсудить ваши конкретные требования к переводу и получить персональное предложение.'
            }
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: 'white',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px rgba(59,130,246,0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(59,130,246,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(59,130,246,0.3)';
          }}>
            {currentLanguage === 'en' ? 'Get Custom Quote' : 'Получить персональное предложение'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
