import React from 'react';

const About = ({ currentLanguage, isMobile, isTablet }) => {
  return (
    <section id="about" style={{ 
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      color: 'white',
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {currentLanguage === 'en' ? 'About Sabrina' : 'О Сабрине'}
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
          {currentLanguage === 'en' 
            ? 'Professional Russian-English translator with 6+ years of experience.'
            : 'Профессиональный русско-английский переводчик с опытом работы более 6 лет.'}
        </p>
      </div>
    </section>
  );
};

export default About;
