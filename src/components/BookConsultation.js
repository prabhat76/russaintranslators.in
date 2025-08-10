import React from 'react';

const BookConsultation = ({ currentLanguage, analytics }) => {
  return (
    <section className="book-consultation">
      <div className="consultation-content">
        <h2>{currentLanguage === 'en' ? 'Ready to Break Language Barriers?' : 'Готовы преодолеть языковые барьеры?'}</h2>
        <p>
          {currentLanguage === 'en' 
            ? 'Book a consultation today and discover how professional translation can transform your global communication.'
            : 'Забронируйте консультацию сегодня и узнайте, как профессиональный перевод может изменить ваше глобальное общение.'
          }
        </p>
        
        <div className="consultation-features">
          <div className="feature-item">
            <h3>{currentLanguage === 'en' ? '⚡ Fast Turnaround' : '⚡ Быстрое выполнение'}</h3>
            <p>{currentLanguage === 'en' ? 'Quality translations delivered on time' : 'Качественные переводы в срок'}</p>
          </div>
          <div className="feature-item">
            <h3>{currentLanguage === 'en' ? '🎯 Cultural Accuracy' : '🎯 Культурная точность'}</h3>
            <p>{currentLanguage === 'en' ? 'Native understanding of cultural nuances' : 'Понимание культурных нюансов'}</p>
          </div>
          <div className="feature-item">
            <h3>{currentLanguage === 'en' ? '🔒 Confidential' : '🔒 Конфиденциально'}</h3>
            <p>{currentLanguage === 'en' ? 'Your documents are always secure' : 'Ваши документы всегда в безопасности'}</p>
          </div>
        </div>
        
        <a 
          href="#contact" 
          className="consultation-cta"
          onClick={() => analytics.buttonClick('consultation_cta', 'book_consultation')}
        >
          {currentLanguage === 'en' ? 'Book Consultation' : 'Записаться на консультацию'}
        </a>
      </div>
    </section>
  );
};

export default BookConsultation;
