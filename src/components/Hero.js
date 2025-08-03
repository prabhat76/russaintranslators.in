import React from 'react';

const Hero = ({ language, content }) => {
  return (
    <section id="home" className="hero-enhanced">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            🏆 {language === 'en' ? '6+ Years Experience' : '6+ лет опыта'}
          </div>
          <h1 className="hero-title">
            {language === 'en' ? 'Professional Russian Translation Services in Mumbai' : 'Профессиональные услуги русского перевода в Мумбаи'}
          </h1>
          <p className="hero-subtitle">
            {language === 'en' 
              ? 'Expert Russian-English translator with 6+ years of experience. Serving Fortune 500 companies, government officials, and international businesses.' 
              : 'Эксперт русско-английского перевода с опытом работы 6+ лет. Обслуживаем компании Fortune 500, государственных чиновников и международный бизнес.'}
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">{language === 'en' ? 'Projects' : 'Проектов'}</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">{language === 'en' ? 'Support' : 'Поддержка'}</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">{language === 'en' ? 'Accuracy' : 'Точность'}</span>
            </div>
          </div>
          
          <div className="hero-cta">
            <a href="tel:+918789389223" className="cta-primary">
              📞 {language === 'en' ? 'Call Now - Get 20% OFF' : 'Звонить - Скидка 20%'}
            </a>
            <a href="https://wa.me/918789389223" className="cta-secondary">
              💬 {language === 'en' ? 'WhatsApp' : 'WhatsApp'}
            </a>
          </div>
          
          <div className="hero-trust">
            <p>✅ {language === 'en' ? 'Trusted by Coal India, Belaz, Artek Surfin Chemical Ltd' : 'Доверяют Coal India, Belaz, Artek Surfin Chemical Ltd'}</p>
          </div>
        </div>
        
        <div className="hero-image">
          <img src="/images/sabrina-profile.jpeg" alt="Sabrina Bhatt - Russian Translator" />
          <div className="hero-badge-floating">
            🇷🇺 {language === 'en' ? 'Native Russian Speaker' : 'Носитель русского языка'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;