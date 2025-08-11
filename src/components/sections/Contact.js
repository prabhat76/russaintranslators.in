import React, { useState, useRef, useEffect } from 'react';

const Contact = ({ currentLanguage, isMobile, isTablet }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    urgency: '',
    wordCount: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isTyping, setIsTyping] = useState({});
  const formRef = useRef(null);

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
          transform: translateY(0);
        }
        40%, 43% {
          transform: translateY(-15px);
        }
        70% {
          transform: translateY(-7px);
        }
        90% {
          transform: translateY(-3px);
        }
      }
      
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = currentLanguage === 'en' ? 'Name is required' : 'Имя обязательно';
    }
    
    if (!formData.email.trim()) {
      errors.email = currentLanguage === 'en' ? 'Email is required' : 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = currentLanguage === 'en' ? 'Invalid email format' : 'Неверный формат email';
    }
    
    if (!formData.service) {
      errors.service = currentLanguage === 'en' ? 'Please select a service' : 'Выберите услугу';
    }
    
    if (!formData.message.trim()) {
      errors.message = currentLanguage === 'en' ? 'Message is required' : 'Сообщение обязательно';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors({});
    
    // Simulate form submission with better animation
    setTimeout(() => {
      setSubmitSuccess(true);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '',
        company: '',
        service: '', 
        urgency: '',
        wordCount: '',
        message: '' 
      });
      setIsSubmitting(false);
      
      // Scroll to success message
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    // Show typing indicator
    setIsTyping({
      ...isTyping,
      [name]: true
    });
    
    // Clear typing indicator after delay
    setTimeout(() => {
      setIsTyping({
        ...isTyping,
        [name]: false
      });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: currentLanguage === 'en' ? 'Email' : 'Электронная почта',
      content: 'contact@russian-translator.com',
      description: currentLanguage === 'en' ? 'Send us a message anytime' : 'Отправьте нам сообщение в любое время',
      action: 'mailto:contact@russian-translator.com',
      color: '#3b82f6'
    },
    {
      icon: '📱',
      title: currentLanguage === 'en' ? 'Phone' : 'Телефон',
      content: '+1 (555) 123-4567',
      description: currentLanguage === 'en' ? 'Call for immediate assistance' : 'Звоните для немедленной помощи',
      action: 'tel:+15551234567',
      color: '#10b981'
    },
    {
      icon: '�',
      title: currentLanguage === 'en' ? 'WhatsApp' : 'WhatsApp',
      content: '+1 (555) 987-6543',
      description: currentLanguage === 'en' ? 'Quick chat for urgent requests' : 'Быстрый чат для срочных запросов',
      action: 'https://wa.me/15559876543',
      color: '#25d366'
    },
    {
      icon: '�🕒',
      title: currentLanguage === 'en' ? 'Business Hours' : 'Рабочие часы',
      content: currentLanguage === 'en' ? 'Mon-Fri: 9AM-6PM EST' : 'Пн-Пт: 9:00-18:00 EST',
      description: currentLanguage === 'en' ? 'Available for urgent requests 24/7' : 'Доступны для срочных запросов 24/7',
      color: '#8b5cf6'
    },
    {
      icon: '🌍',
      title: currentLanguage === 'en' ? 'Response Time' : 'Время ответа',
      content: currentLanguage === 'en' ? 'Within 1 hour' : 'В течение 1 часа',
      description: currentLanguage === 'en' ? 'Fast and professional response' : 'Быстрый и профессиональный ответ',
      color: '#f59e0b'
    },
    {
      icon: '🎯',
      title: currentLanguage === 'en' ? 'Project Consultation' : 'Консультация по проекту',
      content: currentLanguage === 'en' ? 'Free 15-min call' : 'Бесплатный 15-минутный звонок',
      description: currentLanguage === 'en' ? 'Discuss your project requirements' : 'Обсудите требования к вашему проекту',
      action: 'https://calendly.com/russian-translator',
      color: '#ef4444'
    }
  ];

  const services = [
    { value: 'document', label: currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов', icon: '📄' },
    { value: 'business', label: currentLanguage === 'en' ? 'Business Translation' : 'Деловой перевод', icon: '💼' },
    { value: 'interpretation', label: currentLanguage === 'en' ? 'Interpretation Services' : 'Услуги переводчика', icon: '🎙️' },
    { value: 'express', label: currentLanguage === 'en' ? 'Express Translation (24h)' : 'Экспресс-перевод (24ч)', icon: '⚡' },
    { value: 'website', label: currentLanguage === 'en' ? 'Website Localization' : 'Локализация сайтов', icon: '🌐' },
    { value: 'educational', label: currentLanguage === 'en' ? 'Educational Documents' : 'Образовательные документы', icon: '🎓' },
    { value: 'legal', label: currentLanguage === 'en' ? 'Legal Translation' : 'Юридический перевод', icon: '⚖️' },
    { value: 'medical', label: currentLanguage === 'en' ? 'Medical Translation' : 'Медицинский перевод', icon: '🏥' },
    { value: 'technical', label: currentLanguage === 'en' ? 'Technical Translation' : 'Технический перевод', icon: '🔧' },
    { value: 'other', label: currentLanguage === 'en' ? 'Other' : 'Другое', icon: '📋' }
  ];

  const urgencyOptions = [
    { value: 'standard', label: currentLanguage === 'en' ? 'Standard (3-5 days)' : 'Стандартный (3-5 дней)', icon: '📅' },
    { value: 'urgent', label: currentLanguage === 'en' ? 'Urgent (1-2 days)' : 'Срочный (1-2 дня)', icon: '⏰' },
    { value: 'express', label: currentLanguage === 'en' ? 'Express (24 hours)' : 'Экспресс (24 часа)', icon: '⚡' },
    { value: 'immediate', label: currentLanguage === 'en' ? 'Immediate (same day)' : 'Немедленный (в тот же день)', icon: '🚀' }
  ];

  const wordCountOptions = [
    { value: 'small', label: currentLanguage === 'en' ? 'Small (< 500 words)' : 'Малый (< 500 слов)' },
    { value: 'medium', label: currentLanguage === 'en' ? 'Medium (500-2000 words)' : 'Средний (500-2000 слов)' },
    { value: 'large', label: currentLanguage === 'en' ? 'Large (2000-5000 words)' : 'Большой (2000-5000 слов)' },
    { value: 'xlarge', label: currentLanguage === 'en' ? 'Very Large (5000+ words)' : 'Очень большой (5000+ слов)' },
    { value: 'unknown', label: currentLanguage === 'en' ? 'Not sure' : 'Не уверен' }
  ];

  return (
    <section style={{
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 4rem',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
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
          radial-gradient(circle at 25% 25%, rgba(59,130,246,0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(168,85,247,0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(34,197,94,0.05) 0%, transparent 50%)
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
              {currentLanguage === 'en' ? '📞 Get In Touch' : '📞 Свяжитесь с нами'}
            </span>
          </div>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '900',
            marginBottom: '1rem',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {currentLanguage === 'en' ? 'Contact Us' : 'Связаться с нами'}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#cbd5e1',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {currentLanguage === 'en' 
              ? 'Ready to start your translation project? Get in touch for a free consultation and quote'
              : 'Готовы начать свой переводческий проект? Свяжитесь с нами для бесплатной консультации и расценок'
            }
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1fr',
          gap: '4rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Contact Information */}
          <div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '2rem',
              color: '#f1f5f9'
            }}>
              {currentLanguage === 'en' ? 'Contact Information' : 'Контактная информация'}
            </h3>
            
            <div style={{
              display: 'grid',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {contactInfo.map((info, index) => (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(15px)',
                  border: `1px solid ${info.color}30`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.4s ease',
                  cursor: info.action ? 'pointer' : 'default',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => {
                  if (info.action) {
                    if (info.action.startsWith('http')) {
                      window.open(info.action, '_blank');
                    } else {
                      window.location.href = info.action;
                    }
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateX(10px) scale(1.02)';
                  e.currentTarget.style.borderColor = `${info.color}60`;
                  e.currentTarget.style.boxShadow = `0 15px 35px ${info.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateX(0) scale(1)';
                  e.currentTarget.style.borderColor = `${info.color}30`;
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  
                  {/* Background gradient */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: `linear-gradient(135deg, ${info.color}20, transparent)`,
                    borderRadius: '50%',
                    transform: 'translate(30%, -30%)'
                  }}></div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${info.color}, ${info.color}80)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      marginRight: '1rem',
                      boxShadow: `0 8px 20px ${info.color}30`
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#f1f5f9',
                        margin: 0,
                        marginBottom: '0.25rem'
                      }}>
                        {info.title}
                      </h4>
                      <p style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: info.color,
                        margin: 0
                      }}>
                        {info.content}
                      </p>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#cbd5e1',
                    margin: 0,
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {info.description}
                  </p>
                  
                  {info.action && (
                    <div style={{
                      marginTop: '1rem',
                      fontSize: '0.8rem',
                      color: info.color,
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {currentLanguage === 'en' ? 'Click to contact' : 'Нажмите для связи'} →
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#f1f5f9',
                marginBottom: '1rem'
              }}>
                {currentLanguage === 'en' ? 'Follow Us' : 'Подписывайтесь на нас'}
              </h4>
              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                {['LinkedIn', 'Twitter', 'Facebook'].map((platform, index) => (
                  <div key={platform} style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(59,130,246,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    {platform === 'LinkedIn' ? '💼' : platform === 'Twitter' ? '🐦' : '📘'}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            ref={formRef}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '32px',
              padding: isMobile ? '2.5rem' : '3.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
            
            {/* Animated background pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 30%),
                radial-gradient(circle at 80% 80%, rgba(168,85,247,0.1) 0%, transparent 30%)
              `,
              pointerEvents: 'none'
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginRight: '1.5rem',
                  boxShadow: '0 10px 25px rgba(59,130,246,0.3)'
                }}>
                  💌
                </div>
                <div>
                  <h3 style={{
                    fontSize: '2.2rem',
                    fontWeight: '800',
                    color: '#f1f5f9',
                    margin: 0,
                    marginBottom: '0.5rem'
                  }}>
                    {currentLanguage === 'en' ? 'Get Your Quote' : 'Получите расценки'}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#cbd5e1',
                    margin: 0
                  }}>
                    {currentLanguage === 'en' 
                      ? 'Free consultation • Fast response • Professional service'
                      : 'Бесплатная консультация • Быстрый ответ • Профессиональный сервис'
                    }
                  </p>
                </div>
              </div>

              {submitSuccess ? (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.2))',
                  border: '1px solid rgba(34,197,94,0.4)',
                  borderRadius: '24px',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  color: '#86efac',
                  animation: 'slideInUp 0.6s ease-out'
                }}>
                  <div style={{ 
                    fontSize: '5rem', 
                    marginBottom: '1.5rem',
                    animation: 'bounce 1s ease-out'
                  }}>✅</div>
                  <h4 style={{ 
                    fontSize: '2rem', 
                    marginBottom: '1rem',
                    fontWeight: '700'
                  }}>
                    {currentLanguage === 'en' ? 'Message Sent Successfully!' : 'Сообщение успешно отправлено!'}
                  </h4>
                  <p style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    {currentLanguage === 'en' 
                      ? 'Thank you for contacting us! We\'ll get back to you within 1 hour with a detailed quote and project timeline.'
                      : 'Спасибо за обращение к нам! Мы свяжемся с вами в течение 1 часа с подробными расценками и планом проекта.'
                    }
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      background: 'rgba(34,197,94,0.2)',
                      borderRadius: '12px',
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      📧 {currentLanguage === 'en' ? 'Email confirmation sent' : 'Подтверждение по email отправлено'}
                    </div>
                    <div style={{
                      background: 'rgba(34,197,94,0.2)',
                      borderRadius: '12px',
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      ⏱️ {currentLanguage === 'en' ? 'Response within 1 hour' : 'Ответ в течение 1 часа'}
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Name and Email Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        name="name"
                        placeholder={currentLanguage === 'en' ? 'Your Name *' : 'Ваше имя *'}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '1.25rem',
                          borderRadius: '16px',
                          border: `2px solid ${formErrors.name ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                          background: isTyping.name 
                            ? 'rgba(59,130,246,0.1)' 
                            : 'rgba(255,255,255,0.1)',
                          color: 'white',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          boxShadow: formErrors.name ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#60a5fa';
                          e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(96,165,250,0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = formErrors.name ? '#ef4444' : 'rgba(255,255,255,0.2)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.boxShadow = formErrors.name ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none';
                        }}
                      />
                      {formErrors.name && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          fontSize: '0.8rem',
                          color: '#fca5a5',
                          marginTop: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          ⚠️ {formErrors.name}
                        </div>
                      )}
                    </div>
                    
                    <div style={{ position: 'relative' }}>
                      <input
                        type="email"
                        name="email"
                        placeholder={currentLanguage === 'en' ? 'Your Email *' : 'Ваш email *'}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '1.25rem',
                          borderRadius: '16px',
                          border: `2px solid ${formErrors.email ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                          background: isTyping.email 
                            ? 'rgba(59,130,246,0.1)' 
                            : 'rgba(255,255,255,0.1)',
                          color: 'white',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          boxShadow: formErrors.email ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#60a5fa';
                          e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(96,165,250,0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = formErrors.email ? '#ef4444' : 'rgba(255,255,255,0.2)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.boxShadow = formErrors.email ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none';
                        }}
                      />
                      {formErrors.email && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          fontSize: '0.8rem',
                          color: '#fca5a5',
                          marginTop: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          ⚠️ {formErrors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phone and Company Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={currentLanguage === 'en' ? 'Phone Number (optional)' : 'Номер телефона (необязательно)'}
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: '2px solid rgba(255,255,255,0.2)',
                        background: isTyping.phone 
                          ? 'rgba(59,130,246,0.1)' 
                          : 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#60a5fa';
                        e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      }}
                    />
                    
                    <input
                      type="text"
                      name="company"
                      placeholder={currentLanguage === 'en' ? 'Company/Organization (optional)' : 'Компания/Организация (необязательно)'}
                      value={formData.company}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: '2px solid rgba(255,255,255,0.2)',
                        background: isTyping.company 
                          ? 'rgba(59,130,246,0.1)' 
                          : 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#60a5fa';
                        e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      }}
                    />
                  </div>

                  {/* Service Selection */}
                  <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: `2px solid ${formErrors.service ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: formErrors.service ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#60a5fa';
                        e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(96,165,250,0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = formErrors.service ? '#ef4444' : 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.boxShadow = formErrors.service ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none';
                      }}
                    >
                      <option value="" style={{ background: '#1e293b', color: 'white' }}>
                        {currentLanguage === 'en' ? 'Select Service *' : 'Выберите услугу *'}
                      </option>
                      {services.map((service) => (
                        <option key={service.value} value={service.value} style={{ background: '#1e293b', color: 'white' }}>
                          {service.icon} {service.label}
                        </option>
                      ))}
                    </select>
                    {formErrors.service && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        fontSize: '0.8rem',
                        color: '#fca5a5',
                        marginTop: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        ⚠️ {formErrors.service}
                      </div>
                    )}
                  </div>

                  {/* Urgency and Word Count Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: '2px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#60a5fa';
                        e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      }}
                    >
                      <option value="" style={{ background: '#1e293b', color: 'white' }}>
                        {currentLanguage === 'en' ? 'Delivery Timeline' : 'Сроки доставки'}
                      </option>
                      {urgencyOptions.map((option) => (
                        <option key={option.value} value={option.value} style={{ background: '#1e293b', color: 'white' }}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      name="wordCount"
                      value={formData.wordCount}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: '2px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#60a5fa';
                        e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      }}
                    >
                      <option value="" style={{ background: '#1e293b', color: 'white' }}>
                        {currentLanguage === 'en' ? 'Estimated Word Count' : 'Примерное количество слов'}
                      </option>
                      {wordCountOptions.map((option) => (
                        <option key={option.value} value={option.value} style={{ background: '#1e293b', color: 'white' }}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '2rem', position: 'relative' }}>
                    <textarea
                      name="message"
                      placeholder={currentLanguage === 'en' ? 'Describe your project, special requirements, source language, target format, etc. *' : 'Опишите ваш проект, особые требования, исходный язык, целевой формат и т.д. *'}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: `2px solid ${formErrors.message ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                        background: isTyping.message 
                          ? 'rgba(59,130,246,0.1)' 
                          : 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        transition: 'all 0.3s ease',
                        boxShadow: formErrors.message ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
                        minHeight: '120px'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#60a5fa';
                        e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(96,165,250,0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = formErrors.message ? '#ef4444' : 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.boxShadow = formErrors.message ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none';
                      }}
                    />
                    {formErrors.message && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        fontSize: '0.8rem',
                        color: '#fca5a5',
                        marginTop: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        ⚠️ {formErrors.message}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      background: isSubmitting 
                        ? 'rgba(100,116,139,0.5)' 
                        : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      color: 'white',
                      border: 'none',
                      padding: '1.5rem 2rem',
                      borderRadius: '16px',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: isSubmitting ? 0.7 : 1,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(59,130,246,0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {isSubmitting && (
                      <div style={{
                        position: 'absolute',
                        left: '1.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                    )}
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '0.75rem'
                    }}>
                      {!isSubmitting && '🚀'}
                      {isSubmitting 
                        ? (currentLanguage === 'en' ? 'Sending Your Request...' : 'Отправка вашего запроса...')
                        : (currentLanguage === 'en' ? 'Get Free Quote & Timeline' : 'Получить бесплатную расценку и сроки')
                      }
                    </span>
                  </button>

                  {/* Additional Info */}
                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '16px',
                    fontSize: '0.9rem',
                    color: '#cbd5e1',
                    textAlign: 'center'
                  }}>
                    <div style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🔒</div>
                    <p style={{ margin: 0, lineHeight: '1.6' }}>
                      {currentLanguage === 'en' 
                        ? 'Your information is secure and will only be used to provide you with translation services. We respond to all inquiries within 1 hour during business hours.'
                        : 'Ваша информация защищена и будет использоваться только для предоставления вам переводческих услуг. Мы отвечаем на все запросы в течение 1 часа в рабочее время.'
                      }
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
