import React, { useState, useRef } from 'react';

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
    
    // Simulate form submission
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
      content: 'sabrina@languageliberty.com',
      description: currentLanguage === 'en' ? 'Send us a message anytime' : 'Отправьте нам сообщение в любое время',
      action: 'mailto:sabrina@languageliberty.com',
      color: 'var(--primary-accent, #3b82f6)'
    },
    {
      icon: '📱',
      title: currentLanguage === 'en' ? 'Phone' : 'Телефон',
      content: '+91-8789389223',
      description: currentLanguage === 'en' ? 'Call for immediate assistance' : 'Звоните для немедленной помощи',
      action: 'tel:+918789389223',
      color: 'var(--success-color, #10b981)'
    },
    {
      icon: '💬',
      title: currentLanguage === 'en' ? 'WhatsApp' : 'WhatsApp',
      content: '+91-8789389223',
      description: currentLanguage === 'en' ? 'Quick chat for urgent requests' : 'Быстрый чат для срочных запросов',
      action: 'https://wa.me/918789389223',
      color: '#25d366'
    },
    {
      icon: '🕒',
      title: currentLanguage === 'en' ? 'Business Hours' : 'Рабочие часы',
      content: currentLanguage === 'en' ? 'Mon-Fri: 9AM-6PM EST' : 'Пн-Пт: 9:00-18:00 EST',
      description: currentLanguage === 'en' ? 'Available for urgent requests 24/7' : 'Доступны для срочных запросов 24/7',
      color: 'var(--warning-color, #f59e0b)'
    },
    {
      icon: '🌍',
      title: currentLanguage === 'en' ? 'Response Time' : 'Время ответа',
      content: currentLanguage === 'en' ? 'Within 1 hour' : 'В течение 1 часа',
      description: currentLanguage === 'en' ? 'Fast and professional response' : 'Быстрый и профессиональный ответ',
      color: 'var(--info-color, #8b5cf6)'
    },
    {
      icon: '🎯',
      title: currentLanguage === 'en' ? 'Project Consultation' : 'Консультация по проекту',
      content: currentLanguage === 'en' ? 'Free 15-min call' : 'Бесплатный 15-минутный звонок',
      description: currentLanguage === 'en' ? 'Discuss your project requirements' : 'Обсудите требования к вашему проекту',
      action: 'https://calendly.com/russian-translator',
      color: 'var(--danger-color, #ef4444)'
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
    <section id="contact" className="section bg-secondary" style={{
      background: 'var(--bg-secondary, #f8fafc)',
      padding: 'var(--spacing-xl, 3rem) 0',
      position: 'relative'
    }}>
      {/* Subtle Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 25% 25%, var(--primary-ultra-light, rgba(59, 130, 246, 0.03)) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, var(--primary-ultra-light, rgba(59, 130, 246, 0.02)) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }}></div>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {currentLanguage === 'en' ? 'Contact Us' : 'Связаться с нами'}
          </h2>
          <p className="section-subtitle">
            {currentLanguage === 'en' 
              ? 'Ready to start your translation project? Get in touch for a free consultation and professional quote within 1 hour'
              : 'Готовы начать свой переводческий проект? Свяжитесь с нами для бесплатной консультации и профессиональной расценки в течение 1 часа'
            }
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1fr',
          gap: 'var(--spacing-xl, 3rem)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Contact Information */}
          <div>
            <h3 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              marginBottom: 'var(--spacing-lg, 2rem)',
              color: 'var(--primary-color, #1e293b)'
            }}>
              {currentLanguage === 'en' ? 'Contact Information' : 'Контактная информация'}
            </h3>
            
            <div style={{
              display: 'grid',
              gap: 'var(--spacing-md, 1.5rem)',
              marginBottom: 'var(--spacing-xl, 3rem)'
            }}>
              {contactInfo.map((info, index) => (
                <div key={index} className="card" style={{
                  background: 'var(--bg-primary, white)',
                  border: '1px solid var(--secondary-light, #94a3b8)',
                  borderRadius: 'var(--radius-lg, 20px)',
                  padding: 'var(--spacing-lg, 2rem)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.15))';
                  e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))';
                  e.currentTarget.style.borderColor = 'var(--secondary-light, #94a3b8)';
                }}>
                  
                  {/* Background accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: `linear-gradient(135deg, ${info.color}10, transparent)`,
                    borderRadius: '50%',
                    transform: 'translate(30%, -30%)'
                  }}></div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-sm, 1rem)',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: 'var(--radius-md, 12px)',
                      background: `linear-gradient(135deg, ${info.color}, ${info.color}80)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      marginRight: 'var(--spacing-sm, 1rem)',
                      boxShadow: `0 4px 12px ${info.color}20`
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: '700',
                        color: 'var(--primary-color, #1e293b)',
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
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary, #475569)',
                    margin: 0,
                    position: 'relative',
                    zIndex: 2,
                    lineHeight: '1.6'
                  }}>
                    {info.description}
                  </p>
                  
                  {info.action && (
                    <div style={{
                      marginTop: 'var(--spacing-sm, 1rem)',
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

            {/* Trust Indicators */}
            <div className="card" style={{
              background: 'var(--bg-primary, white)',
              borderRadius: 'var(--radius-lg, 20px)',
              padding: 'var(--spacing-lg, 2rem)',
              border: '1px solid var(--secondary-light, #94a3b8)'
            }}>
              <h4 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--primary-color, #1e293b)',
                marginBottom: 'var(--spacing-md, 1.5rem)'
              }}>
                {currentLanguage === 'en' ? 'Why Choose Language Liberty?' : 'Почему выбирают Language Liberty?'}
              </h4>
              <div style={{
                display: 'grid',
                gap: 'var(--spacing-sm, 1rem)'
              }}>
                {[
                  { icon: '🏆', text: currentLanguage === 'en' ? 'Certified Professional Translator' : 'Сертифицированный профессиональный переводчик' },
                  { icon: '⚡', text: currentLanguage === 'en' ? '24/7 Emergency Translation Service' : '24/7 экстренный переводческий сервис' },
                  { icon: '🔒', text: currentLanguage === 'en' ? '100% Confidential & Secure' : '100% конфиденциально и безопасно' },
                  { icon: '✅', text: currentLanguage === 'en' ? 'Quality Guaranteed or Money Back' : 'Гарантия качества или возврат денег' }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm, 1rem)'
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--text-secondary, #475569)',
                      fontWeight: '500'
                    }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            ref={formRef}
            className="card"
            style={{
              background: 'var(--bg-primary, white)',
              border: '1px solid var(--secondary-light, #94a3b8)',
              borderRadius: 'var(--radius-lg, 20px)',
              padding: isMobile ? 'var(--spacing-lg, 2rem)' : 'var(--spacing-xl, 3rem)',
              position: 'relative',
              overflow: 'hidden'
            }}>
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 'var(--spacing-lg, 2rem)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius-md, 12px)',
                  background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginRight: 'var(--spacing-md, 1.5rem)',
                  boxShadow: 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))'
                }}>
                  💌
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.875rem',
                    fontWeight: '700',
                    color: 'var(--primary-color, #1e293b)',
                    margin: 0,
                    marginBottom: '0.5rem'
                  }}>
                    {currentLanguage === 'en' ? 'Get Your Quote' : 'Получите расценки'}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted, #64748b)',
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
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.1))',
                  border: '1px solid var(--success-color, #10b981)',
                  borderRadius: 'var(--radius-lg, 20px)',
                  padding: 'var(--spacing-xl, 3rem)',
                  textAlign: 'center',
                  color: 'var(--success-color, #10b981)'
                }}>
                  <div style={{ 
                    fontSize: '4rem', 
                    marginBottom: 'var(--spacing-md, 1.5rem)'
                  }}>✅</div>
                  <h4 style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: 'var(--spacing-sm, 1rem)',
                    fontWeight: '700',
                    color: 'var(--primary-color, #1e293b)'
                  }}>
                    {currentLanguage === 'en' ? 'Message Sent Successfully!' : 'Сообщение успешно отправлено!'}
                  </h4>
                  <p style={{ 
                    fontSize: '1rem', 
                    marginBottom: 'var(--spacing-md, 1.5rem)',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary, #475569)'
                  }}>
                    {currentLanguage === 'en' 
                      ? 'Thank you for contacting us! We\'ll get back to you within 1 hour with a detailed quote and project timeline.'
                      : 'Спасибо за обращение к нам! Мы свяжемся с вами в течение 1 часа с подробными расценками и планом проекта.'
                    }
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 'var(--spacing-sm, 1rem)',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      background: 'rgba(34,197,94,0.1)',
                      borderRadius: 'var(--radius-md, 12px)',
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      border: '1px solid rgba(34,197,94,0.2)'
                    }}>
                      📧 {currentLanguage === 'en' ? 'Email confirmation sent' : 'Подтверждение по email отправлено'}
                    </div>
                    <div style={{
                      background: 'rgba(34,197,94,0.1)',
                      borderRadius: 'var(--radius-md, 12px)',
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      border: '1px solid rgba(34,197,94,0.2)'
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
                    gap: 'var(--spacing-md, 1.5rem)',
                    marginBottom: 'var(--spacing-md, 1.5rem)'
                  }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        name="name"
                        placeholder={currentLanguage === 'en' ? 'Your Name *' : 'Ваше имя *'}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        style={{
                          width: '100%',
                          padding: 'var(--spacing-sm, 1rem)',
                          borderRadius: 'var(--radius-md, 12px)',
                          border: `2px solid ${formErrors.name ? 'var(--danger-color, #ef4444)' : 'var(--secondary-light, #94a3b8)'}`,
                          background: 'var(--bg-secondary, #f8fafc)',
                          color: 'var(--primary-color, #1e293b)',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          fontFamily: 'var(--font-family, Inter, sans-serif)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
                          e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-ultra-light, rgba(59, 130, 246, 0.1))';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = formErrors.name ? 'var(--danger-color, #ef4444)' : 'var(--secondary-light, #94a3b8)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                      {formErrors.name && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          fontSize: '0.8rem',
                          color: 'var(--danger-color, #ef4444)',
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
                        className="form-control"
                        style={{
                          width: '100%',
                          padding: 'var(--spacing-sm, 1rem)',
                          borderRadius: 'var(--radius-md, 12px)',
                          border: `2px solid ${formErrors.email ? 'var(--danger-color, #ef4444)' : 'var(--secondary-light, #94a3b8)'}`,
                          background: 'var(--bg-secondary, #f8fafc)',
                          color: 'var(--primary-color, #1e293b)',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          fontFamily: 'var(--font-family, Inter, sans-serif)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
                          e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-ultra-light, rgba(59, 130, 246, 0.1))';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = formErrors.email ? 'var(--danger-color, #ef4444)' : 'var(--secondary-light, #94a3b8)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                      {formErrors.email && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          fontSize: '0.8rem',
                          color: 'var(--danger-color, #ef4444)',
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
                    gap: 'var(--spacing-md, 1.5rem)',
                    marginBottom: 'var(--spacing-md, 1.5rem)'
                  }}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={currentLanguage === 'en' ? 'Phone Number (optional)' : 'Номер телефона (необязательно)'}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm, 1rem)',
                        borderRadius: 'var(--radius-md, 12px)',
                        border: '2px solid var(--secondary-light, #94a3b8)',
                        background: 'var(--bg-secondary, #f8fafc)',
                        color: 'var(--primary-color, #1e293b)',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-family, Inter, sans-serif)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-ultra-light, rgba(59, 130, 246, 0.1))';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--secondary-light, #94a3b8)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    
                    <input
                      type="text"
                      name="company"
                      placeholder={currentLanguage === 'en' ? 'Company/Organization (optional)' : 'Компания/Организация (необязательно)'}
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm, 1rem)',
                        borderRadius: 'var(--radius-md, 12px)',
                        border: '2px solid var(--secondary-light, #94a3b8)',
                        background: 'var(--bg-secondary, #f8fafc)',
                        color: 'var(--primary-color, #1e293b)',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-family, Inter, sans-serif)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-ultra-light, rgba(59, 130, 246, 0.1))';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--secondary-light, #94a3b8)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Service Selection */}
                  <div style={{ marginBottom: 'var(--spacing-md, 1.5rem)', position: 'relative' }}>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm, 1rem)',
                        borderRadius: 'var(--radius-md, 12px)',
                        border: `2px solid ${formErrors.service ? 'var(--danger-color, #ef4444)' : 'var(--secondary-light, #94a3b8)'}`,
                        background: 'var(--bg-secondary, #f8fafc)',
                        color: 'var(--primary-color, #1e293b)',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-family, Inter, sans-serif)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-ultra-light, rgba(59, 130, 246, 0.1))';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = formErrors.service ? 'var(--danger-color, #ef4444)' : 'var(--secondary-light, #94a3b8)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">
                        {currentLanguage === 'en' ? 'Select Service *' : 'Выберите услугу *'}
                      </option>
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
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
                        color: 'var(--danger-color, #ef4444)',
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
                    gap: 'var(--spacing-md, 1.5rem)',
                    marginBottom: 'var(--spacing-md, 1.5rem)'
                  }}>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm, 1rem)',
                        borderRadius: 'var(--radius-md, 12px)',
                        border: '2px solid var(--secondary-light, #94a3b8)',
                        background: 'var(--bg-secondary, #f8fafc)',
                        color: 'var(--primary-color, #1e293b)',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-family, Inter, sans-serif)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-ultra-light, rgba(59, 130, 246, 0.1))';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--secondary-light, #94a3b8)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">
                        {currentLanguage === 'en' ? 'Delivery Timeline' : 'Сроки доставки'}
                      </option>
                      {urgencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      name="wordCount"
                      value={formData.wordCount}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm, 1rem)',
                        borderRadius: 'var(--radius-md, 12px)',
                        border: '2px solid var(--secondary-light, #94a3b8)',
                        background: 'var(--bg-secondary, #f8fafc)',
                        color: 'var(--primary-color, #1e293b)',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-family, Inter, sans-serif)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-ultra-light, rgba(59, 130, 246, 0.1))';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--secondary-light, #94a3b8)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">
                        {currentLanguage === 'en' ? 'Estimated Word Count' : 'Примерное количество слов'}
                      </option>
                      {wordCountOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 'var(--spacing-lg, 2rem)', position: 'relative' }}>
                    <textarea
                      name="message"
                      placeholder={currentLanguage === 'en' ? 'Describe your project, special requirements, source language, target format, etc. *' : 'Опишите ваш проект, особые требования, исходный язык, целевой формат и т.д. *'}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="form-control"
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm, 1rem)',
                        borderRadius: 'var(--radius-md, 12px)',
                        border: `2px solid ${formErrors.message ? 'var(--danger-color, #ef4444)' : 'var(--secondary-light, #94a3b8)'}`,
                        background: 'var(--bg-secondary, #f8fafc)',
                        color: 'var(--primary-color, #1e293b)',
                        fontSize: '1rem',
                        resize: 'vertical',
                        fontFamily: 'var(--font-family, Inter, sans-serif)',
                        transition: 'all 0.3s ease',
                        minHeight: '120px'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-accent, #3b82f6)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-ultra-light, rgba(59, 130, 246, 0.1))';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = formErrors.message ? 'var(--danger-color, #ef4444)' : 'var(--secondary-light, #94a3b8)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    {formErrors.message && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        fontSize: '0.8rem',
                        color: 'var(--danger-color, #ef4444)',
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
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      background: isSubmitting 
                        ? 'var(--secondary-color, #64748b)' 
                        : 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                      color: 'white',
                      border: 'none',
                      padding: 'var(--spacing-md, 1.5rem) var(--spacing-lg, 2rem)',
                      borderRadius: 'var(--radius-md, 12px)',
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: isSubmitting ? 0.7 : 1,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))';
                      }
                    }}
                  >
                    {isSubmitting && (
                      <div style={{
                        position: 'absolute',
                        left: 'var(--spacing-md, 1.5rem)',
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
                    marginTop: 'var(--spacing-lg, 2rem)',
                    padding: 'var(--spacing-md, 1.5rem)',
                    background: 'rgba(59,130,246,0.05)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: 'var(--radius-md, 12px)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted, #64748b)',
                    textAlign: 'center'
                  }}>
                    <div style={{ marginBottom: 'var(--spacing-sm, 1rem)', fontSize: '1.5rem' }}>🔒</div>
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

      {/* Inline CSS for animations */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;