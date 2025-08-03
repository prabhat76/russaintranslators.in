import React from 'react';

const WhyChooseUs = ({ language }) => {
  const features = language === 'en' ? [
    {
      icon: '🎯',
      title: '99.9% Accuracy',
      description: 'Native Russian speaker with cultural expertise ensures perfect translations'
    },
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: '24-hour turnaround for urgent projects with same-day service available'
    },
    {
      icon: '🏆',
      title: 'Fortune 500 Trusted',
      description: 'Trusted by Coal India, Belaz, and international pharmaceutical companies'
    },
    {
      icon: '🔒',
      title: 'Confidential & Secure',
      description: 'NDA compliance and secure handling of sensitive business documents'
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Transparent pricing with 20% OFF for first-time clients'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Round-the-clock availability for urgent translation needs'
    }
  ] : [
    {
      icon: '🎯',
      title: '99.9% точность',
      description: 'Носитель русского языка с культурной экспертизой обеспечивает идеальные переводы'
    },
    {
      icon: '⚡',
      title: 'Быстрая доставка',
      description: '24-часовой оборот для срочных проектов с услугой в тот же день'
    },
    {
      icon: '🏆',
      title: 'Доверие Fortune 500',
      description: 'Доверяют Coal India, Belaz и международные фармацевтические компании'
    },
    {
      icon: '🔒',
      title: 'Конфиденциально и безопасно',
      description: 'Соблюдение NDA и безопасная обработка конфиденциальных документов'
    },
    {
      icon: '💰',
      title: 'Конкурентные цены',
      description: 'Прозрачное ценообразование со скидкой 20% для новых клиентов'
    },
    {
      icon: '📞',
      title: 'Поддержка 24/7',
      description: 'Круглосуточная доступность для срочных переводческих потребностей'
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <h2>{language === 'en' ? 'Why Choose Language Liberty?' : 'Почему выбирают Language Liberty?'}</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;