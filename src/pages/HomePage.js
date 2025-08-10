import MeetSabrinaModern from '../components/MeetSabrinaModern';
  {/* Meet Sabrina Section (Modern) */}
  <MeetSabrinaModern />
import React from 'react';

const HomePage = ({ 
  currentLanguage, 
  switchLanguage, 
  t, 
  selectedImage,
  setSelectedImage,
  currentImageIndex,
  setCurrentImageIndex,
  liveFeedback,
  showFeedbackForm,
  setShowFeedbackForm,
  feedbackData,
  setFeedbackData,
  handleFeedbackSubmit,
  handleFeedbackChange,
  testimonials,
  formData,
  formStatus,
  isSubmitting,
  handleInputChange,
  handleFormSubmit,
  showToast,
  analytics
}) => {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>{currentLanguage === 'en' ? 'Russian Translator' : 'Русский переводчик'}</h1>
          <nav className="header-nav">
            <a href="#services">{currentLanguage === 'en' ? 'Services' : 'Услуги'}</a>
            <a href="#contact">{currentLanguage === 'en' ? 'Contact' : 'Контакт'}</a>
            <button 
              className="language-toggle in-header" 
              onClick={() => switchLanguage(currentLanguage === 'en' ? 'ru' : 'en')}
            >
              {currentLanguage === 'en' ? '🇷🇺 Русский' : '🇺🇸 English'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{t.hero?.title || 'Professional Russian Translation Services'}</h1>
          <p>{t.hero?.subtitle || 'Bridge language barriers with expert translation'}</p>
          <a 
            href="#contact" 
            className="hero-cta"
            onClick={() => analytics.buttonClick('hero_cta', 'hero_section')}
          >
            {currentLanguage === 'en' ? 'Get Started' : 'Начать'}
          </a>
        </div>
      </section>

      {/* Meet Sabrina Section */}
      <section className="meet-sabrina">
        <div className="meet-sabrina-content">
          <div className="meet-sabrina-text">
            <div className="section-label">
              {currentLanguage === 'en' ? 'About Your Translator' : 'О вашем переводчике'}
            </div>
            <h2>
              {currentLanguage === 'en' ? 'Meet Sabrina' : 'Познакомьтесь с Сабриной'}
            </h2>
            <div className="sabrina-subtitle">
              {currentLanguage === 'en' 
                ? 'Professional Russian-English Translation Services'
                : 'Профессиональные услуги русско-английского перевода'
              }
            </div>
            <div className="sabrina-description">
              <p>
                {currentLanguage === 'en'
                  ? 'Born to a Russian mother and an Indian father, I bridge communication gaps between Russian-speaking countries and the world. With education in Russia, Uzbekistan, and India, I bring authentic cultural understanding to every translation project.'
                  : 'Рожденная от русской матери и индийского отца, я устраняю коммуникационные барьеры между русскоговорящими странами и миром. Получив образование в России, Узбекистане и Индии, я привношу подлинное культурное понимание в каждый переводческий проект.'
                }
              </p>
              <p>
                {currentLanguage === 'en'
                  ? 'With 6+ years of professional experience, I specialize in business interpretation, document translation, and cultural consultation for companies expanding into Russian markets.'
                  : 'Имея более 6 лет профессионального опыта, я специализируюсь на деловом переводе, переводе документов и культурном консультировании для компаний, выходящих на российские рынки.'
                }
              </p>
            </div>

            {/* Credentials */}
            <div className="credentials">
              <div className="credential-badge">
                <div className="badge-icon">🎓</div>
                <div className="badge-text">
                  <span className="badge-title">{currentLanguage === 'en' ? 'CERTIFIED' : 'СЕРТИФИЦИРОВАНО'}</span>
                  <span className="badge-subtitle">{currentLanguage === 'en' ? 'TRANSLATOR' : 'ПЕРЕВОДЧИК'}</span>
                </div>
              </div>
              <div className="credential-badge">
                <div className="badge-icon">🌍</div>
                <div className="badge-text">
                  <span className="badge-title">{currentLanguage === 'en' ? 'MULTICULTURAL' : 'МУЛЬТИКУЛЬТУРНОЕ'}</span>
                  <span className="badge-subtitle">{currentLanguage === 'en' ? 'BACKGROUND' : 'ОБРАЗОВАНИЕ'}</span>
                </div>
              </div>
              <div className="credential-badge">
                <div className="badge-icon">💼</div>
                <div className="badge-text">
                  <span className="badge-title">{currentLanguage === 'en' ? 'BUSINESS' : 'БИЗНЕС'}</span>
                  <span className="badge-subtitle">{currentLanguage === 'en' ? 'SPECIALIST' : 'СПЕЦИАЛИСТ'}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="trusted-cta">
              <button 
                className="cta-button primary-cta"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                {currentLanguage === 'en' ? 'GET QUOTE' : 'ПОЛУЧИТЬ РАСЦЕНКИ'}
              </button>
              <button 
                className="cta-button secondary-cta"
                onClick={() => window.open('tel:+918789389223')}
              >
                📞 {currentLanguage === 'en' ? 'CALL NOW' : 'ПОЗВОНИТЬ'}
              </button>
            </div>
          </div>

          <div className="meet-sabrina-image">
            <img 
              src="/images/sabrina-profile.jpeg" 
              alt="Sabrina Bhatt - Professional Russian Translator"
              className="sabrina-profile"
            />
          </div>
        </div>
      </section>

      {/* Book Consultation Section */}
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
    </div>
  );
};

export default HomePage;
