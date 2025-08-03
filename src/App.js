import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import './App.css';
import { GALLERY_IMAGES } from './constants/content';
import { useContent } from './hooks/useContent';
import { useForm } from './hooks/useForm';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp, getDocs } from 'firebase/firestore';
import { db, mockFirebaseOps } from './firebase';
import { throttle } from './utils/performance';
import { analytics } from './utils/analytics';

const Chatbot = lazy(() => import('./components/Chatbot'));


const AppContent = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liveFeedback, setLiveFeedback] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ rating: 5, message: '', name: '' });
  const [testimonials, setTestimonials] = useState([]);

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ru') ? 'ru' : 'en';
  });
  
  const switchLanguage = useCallback((lang) => {
    analytics.languageSwitch(currentLanguage, lang);
    setCurrentLanguage(lang);
  }, [currentLanguage]);
  
  const { formData, formStatus, isSubmitting, handleInputChange, handleFormSubmit } = useForm({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  }, currentLanguage);
  
  const { content: t, loading: contentLoading } = useContent(currentLanguage);
  
  const closeModal = useCallback(() => setSelectedImage(null), []);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  
  const handleFeedbackSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!mockFirebaseOps) {
      try {
        await addDoc(collection(db, 'feedback'), {
          ...feedbackData,
          timestamp: serverTimestamp(),
          language: currentLanguage
        });
      } catch (error) {
        console.warn('Feedback submission error:', error.message);
      }
    } else {
      console.log('Mock feedback submission:', feedbackData);
    }
    
    setFeedbackData({ rating: 5, message: '', name: '' });
    setShowFeedbackForm(false);
  }, [feedbackData, currentLanguage]);
  
  const handleFeedbackChange = useCallback((e) => {
    setFeedbackData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const openModal = useCallback((index) => {
    analytics.galleryView(GALLERY_IMAGES[index].title);
    setCurrentImageIndex(index);
    setSelectedImage(GALLERY_IMAGES[index]);
  }, []);

  const nextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % GALLERY_IMAGES.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(GALLERY_IMAGES[nextIndex]);
  }, [currentImageIndex]);

  const prevImage = useCallback(() => {
    const prevIndex = (currentImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(GALLERY_IMAGES[prevIndex]);
  }, [currentImageIndex]);

  useEffect(() => {
    // Track page view
    analytics.pageView('home');
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Russian Translation Services - Language Liberty',
        page_location: window.location.href
      });
    }
    
    // Real-time listeners
    let unsubscribeFeedback = () => {};
    let unsubscribeTestimonials = () => {};
    
    if (!mockFirebaseOps) {
      try {
        // Feedback listener
        const feedbackQuery = query(collection(db, 'feedback'), orderBy('timestamp', 'desc'), limit(5));
        unsubscribeFeedback = onSnapshot(feedbackQuery, (snapshot) => {
          setLiveFeedback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        
        // Testimonials listener
        const testimonialsQuery = query(collection(db, 'testimonials'), orderBy('timestamp', 'desc'));
        unsubscribeTestimonials = onSnapshot(testimonialsQuery, (snapshot) => {
          setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        

      } catch (error) {
        console.warn('Firestore setup error:', error.message);
      }
    }
    
    // Mobile gallery auto-scroll with performance optimization
    const checkMobile = () => window.innerWidth <= 768;
    const handleResize = throttle(() => {
      if (!checkMobile()) {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
          galleryGrid.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 250);

    window.addEventListener('resize', handleResize);
    let galleryInterval;
    
    if (checkMobile()) {
      const galleryGrid = document.querySelector('.gallery-grid');
      if (galleryGrid) {
        let scrollPosition = 0;
        const cardWidth = window.innerWidth <= 480 ? 250 : 280;
        const gap = window.innerWidth <= 480 ? 12 : 15;
        
        galleryInterval = setInterval(() => {
          if (!checkMobile()) {
            clearInterval(galleryInterval);
            return;
          }
          scrollPosition += cardWidth + gap;
          if (scrollPosition >= galleryGrid.scrollWidth - galleryGrid.clientWidth) {
            scrollPosition = 0;
          }
          galleryGrid.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }, 3000);
      }
    }
    
    return () => {
      unsubscribeFeedback();
      unsubscribeTestimonials();
      if (galleryInterval) clearInterval(galleryInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (contentLoading) {
    return <div className="loading">Loading content...</div>;
  }
  
  // Debug: Log the actual content structure
  console.log('Current content:', t);
  console.log('Contact section:', t?.contact);

  return (
    <div className="App">
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-info">
              <div className="info-item">
                <span className="info-icon">📞</span>
                <a href="tel:+918789389223">+91-8789389223</a>
              </div>
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <a href="mailto:sabrina@languageliberty.com">sabrina@languageliberty.com</a>
              </div>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <span>Mumbai, India</span>
              </div>
            </div>
            <div className="header-actions">
              <div className="language-toggle">
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="langToggle" 
                    checked={currentLanguage === 'ru'} 
                    onChange={(e) => switchLanguage(e.target.checked ? 'ru' : 'en')}
                  />
                  <label htmlFor="langToggle" className="toggle-label">
                    <span className="toggle-text left">🇺🇸 EN</span>
                    <span className="toggle-slider"></span>
                    <span className="toggle-text right">🇷🇺 RU</span>
                  </label>
                </div>
              </div>
              <div className="language-badge">
                <span className="flag">🇷🇺</span>
                <span>{currentLanguage === 'en' ? 'Russian Expert' : 'Эксперт русского языка'}</span>
              </div>
              <div className="experience-badge">
                <span className="years">6+</span>
                <span>{currentLanguage === 'en' ? 'Years Experience' : 'Лет опыта'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="nav">
          <div className="container">
            <div className="nav-brand">
              <img src="/images/download.webp" alt="Language Liberty Logo" className="logo" />
              <div className="brand-text">
                <h3>LANGUAGE LIBERTY</h3>
                <span>Professional Russian Translation Services</span>
              </div>
            </div>
            
            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <a href="#home" className="nav-link" onClick={closeMenu}>{t.nav.home}</a>
              <a href="#about" className="nav-link" onClick={closeMenu}>{t.nav.about}</a>
              <a href="#services" className="nav-link" onClick={closeMenu}>{t.nav.services}</a>
              <a href="#contact" className="nav-link" onClick={closeMenu}>{t.nav.contact}</a>
              <div className="nav-cta-group">
                <a href="https://wa.me/918789389223" className="nav-cta whatsapp" onClick={() => { analytics.contactAttempt('whatsapp'); closeMenu(); }}>💬 WhatsApp</a>
                <a href="tel:+918789389223" className="nav-cta call" onClick={() => { analytics.contactAttempt('phone'); closeMenu(); }}>📞 {t.hero?.cta || 'Call Now'}</a>
              </div>
            </div>
            
            <button 
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-video">
            <video 
              src="/images/sabrina-intro-video.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              className="hero-video-element"
            />
            <div className="video-overlay">
              <h1>{t.hero.title}</h1>
              <p>{t.hero.subtitle}</p>
              <div className="hero-cta">
                <a href="tel:+918789389223" className="cta-button primary" onClick={() => analytics.contactAttempt('hero_phone')}>📞 {t.hero?.cta || 'Call Now'}</a>
                <a href="#about" className="cta-button secondary">{t.hero?.learn || 'Learn More'}</a>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h1>{t.about.title}</h1>
              <h4>{t.about.subtitle}</h4>
              <p>{currentLanguage === 'en' ? 'Born to a Russian mother and an Indian father, I bridge communication gaps between Russian-speaking countries and the world. With education in Russia, Uzbekistan, and India, I bring authentic cultural understanding to every translation project.' : 'Рожденная от русской матери и индийского отца, я устраняю коммуникационные барьеры между русскоговорящими странами и миром. Получив образование в России, Узбекистане и Индии, я привношу подлинное культурное понимание в каждый переводческий проект.'}</p>
              <h4>{t.about.proficiency}</h4>
              <p>{t.about.experienceText}</p>
            </div>
            
            <div className="about-image">
              <img src="/images/sabrina-profile.jpeg" alt="Sabrina Bhatt" />
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">{currentLanguage === 'en' ? 'Happy Clients' : 'Довольных клиентов'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">{currentLanguage === 'en' ? 'Projects Completed' : 'Завершенных проектов'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6+</div>
              <div className="stat-label">{currentLanguage === 'en' ? 'Years Experience' : 'Лет опыта'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">{currentLanguage === 'en' ? 'Support Available' : 'Поддержка доступна'}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <h2>{t.gallery.title}</h2>
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((image, index) => (
              <div key={index} className="gallery-item" onClick={() => openModal(index)}>
                <img src={image.src} alt={image.title} />
                <div className="gallery-overlay">
                  <h4>{image.title}</h4>
                  <p>{image.desc}</p>
                </div>
              </div>
            ))}
          </div> {/* Close .gallery-grid */}
        </div> {/* Close .container for gallery */}
      </section> {/* Close gallery section */}

      {/* Live Feedback Section */}
      <section className="live-feedback">
        <div className="container">
          <div className="feedback-header">
            <h2>{currentLanguage === 'en' ? '⚡ Live Client Feedback' : '⚡ Отзывы клиентов в реальном времени'}</h2>
            <button 
              className="feedback-btn"
              onClick={() => { analytics.buttonClick('feedback_form', 'live_feedback'); setShowFeedbackForm(true); }}
            >
              {currentLanguage === 'en' ? '⭐ Leave Feedback' : '⭐ Оставить отзыв'}
            </button>
          </div>
          
          <div className="feedback-stream">
            {liveFeedback.length > 0 ? liveFeedback.map((feedback) => (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-rating">
                  {'⭐'.repeat(feedback.rating)}
                </div>
                <p className="feedback-message">"{feedback.message}"</p>
                <div className="feedback-author">- {feedback.name}</div>
                <div className="feedback-time">
                  {feedback.timestamp?.toDate ? feedback.timestamp.toDate().toLocaleDateString() : 'Just now'}
                </div>
              </div>
            )) : (
              <div className="no-feedback">
                <p>{currentLanguage === 'en' ? 'Be the first to leave feedback!' : 'Будьте первым, кто оставит отзыв!'}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="testimonials">
        <div className="container">
          <div className="testimonials-header">
            <h2>{currentLanguage === 'en' ? 'Client Testimonials' : 'Отзывы клиентов'}</h2>
            <p>{currentLanguage === 'en' ? 'What our clients say about our Russian translation services' : 'Что говорят наши клиенты о наших услугах русского перевода'}</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.length > 0 ? testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-rating">{'⭐'.repeat(testimonial.rating)}</div>
                <p>"{testimonial.message}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.title}</span>
                </div>
              </div>
            )) : (
              // Default testimonials
              <>
                <div className="testimonial-card">
                  <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
                  <p>"{currentLanguage === 'en' ? 'Sabrina provided excellent Russian interpretation for our business meeting with Moscow partners. Her cultural understanding made all the difference.' : 'Сабрина обеспечила отличный русский перевод для нашей деловой встречи с московскими партнерами. Ее культурное понимание имело решающее значение.'}"
                  </p>
                  <div className="testimonial-author">
                    <strong>Rajesh Kumar</strong>
                    <span>{currentLanguage === 'en' ? 'CEO, Tech Solutions Mumbai' : 'Генеральный директор, Tech Solutions Mumbai'}</span>
                  </div>
                </div>
                
                <div className="testimonial-card">
                  <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
                  <p>"{currentLanguage === 'en' ? 'Professional document translation service. Fast, accurate, and certified. Highly recommended for legal documents.' : 'Профессиональная служба перевода документов. Быстро, точно и сертифицировано. Настоятельно рекомендуется для юридических документов.'}"
                  </p>
                  <div className="testimonial-author">
                    <strong>Priya Sharma</strong>
                    <span>{currentLanguage === 'en' ? 'Legal Advisor, Mumbai High Court' : 'Юридический консультант, Высокий суд Мумбаи'}</span>
                  </div>
                </div>
                
                <div className="testimonial-card">
                  <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
                  <p>"{currentLanguage === 'en' ? 'Sabrina helped our Russian artists during their Mumbai shoot. Her entertainment industry knowledge was invaluable.' : 'Сабрина помогла нашим русским артистам во время их съемок в Мумбаи. Ее знание индустрии развлечений было бесценным.'}"
                  </p>
                  <div className="testimonial-author">
                    <strong>Mikhail Petrov</strong>
                    <span>{currentLanguage === 'en' ? 'Film Producer, Moscow Films' : 'Кинопродюсер, Moscow Films'}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <div className="services-header">
            <h2>{t.services.title}</h2>
            <p>{t.services.subtitle}</p>
          </div>
          <div className="services-grid">
            <div className="service-card featured">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop" alt="Virtual Meetings" />
              </div>
              <div className="service-content">
                <div className="service-badge">{currentLanguage === 'en' ? 'Most Popular' : 'Самый популярный'}</div>
                <h3>{currentLanguage === 'en' ? 'Virtual Meeting Interpretation' : 'Устный перевод виртуальных встреч'}</h3>
                <p>{currentLanguage === 'en' ? 'Real-time Russian-English interpretation for Zoom, Teams, and Google Meet sessions with crystal-clear audio quality.' : 'Устный перевод русский-английский в реальном времени для сессий Zoom, Teams и Google Meet с кристально чистым качеством звука.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'HD Audio Quality' : 'HD качество звука'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Screen Sharing Support' : 'Поддержка демонстрации экрана'}</li>
                  <li>✓ {currentLanguage === 'en' ? '24/7 Availability' : 'Доступность 24/7'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop" alt="Business Meetings" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'In-Person Business Meetings' : 'Личные деловые встречи'}</h3>
                <p>{currentLanguage === 'en' ? 'Professional on-site interpretation for corporate meetings, negotiations, and conferences across Mumbai and India.' : 'Профессиональный устный перевод на месте для корпоративных встреч, переговоров и конференций по всему Мумбаи и Индии.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'Ministerial Level Experience' : 'Опыт министерского уровня'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Confidentiality Assured' : 'Гарантированная конфиденциальность'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Industry Expertise' : 'Отраслевая экспертиза'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop" alt="Document Translation" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'Certified Document Translation' : 'Сертифицированный перевод документов'}</h3>
                <p>{currentLanguage === 'en' ? 'Official translation of legal documents, contracts, certificates, and technical manuals with government certification.' : 'Официальный перевод юридических документов, контрактов, сертификатов и технических руководств с государственной сертификацией.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'Legal Certification' : 'Юридическая сертификация'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Fast Turnaround' : 'Быстрое выполнение'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Technical Accuracy' : 'Техническая точность'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop" alt="Russian Language Training" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'Russian Language Training' : 'Обучение английскому языку'}</h3>
                <p>{currentLanguage === 'en' ? 'Comprehensive Russian language courses from beginner to advanced levels, including business etiquette and cultural training.' : 'Комплексные курсы английского языка от начального до продвинутого уровня, включая деловой этикет и культурное обучение.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'A1 to C1 Levels' : 'Уровни A1-C1'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Cultural Etiquette' : 'Культурный этикет'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Business Russian' : 'Деловой английский'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop" alt="Travel Support" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'Executive Travel Support' : 'Поддержка деловых поездок'}</h3>
                <p>{currentLanguage === 'en' ? 'Personal interpreter services for business executives traveling to Russian-speaking countries or hosting Russian delegates.' : 'Персональные услуги переводчика для бизнес-руководителей, путешествующих в русскоговорящие страны или принимающих российские делегации.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'Airport Assistance' : 'Помощь в аэропорту'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Cultural Guidance' : 'Культурное руководство'}</li>
                  <li>✓ {currentLanguage === 'en' ? '24/7 Support' : 'Поддержка 24/7'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop" alt="Entertainment Industry" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'Entertainment Industry Support' : 'Поддержка индустрии развлечений'}</h3>
                <p>{currentLanguage === 'en' ? 'Specialized services for Russian artists, models, and performers working in India, including script reading and agency coordination.' : 'Специализированные услуги для российских артистов, моделей и исполнителей, работающих в Индии, включая чтение сценариев и координацию с агентствами.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'Script Translation' : 'Перевод сценариев'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Agency Coordination' : 'Координация с агентствами'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Cultural Adaptation' : 'Культурная адаптация'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-header">
            <h2>{t.contact.title}</h2>
            <p>{t.contact.subtitle}</p>
          </div>
          <div className="contact-main-card">
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>{t.contact?.call || (currentLanguage === 'en' ? 'Call Us' : 'Позвоните нам')}</h3>
                <p>{currentLanguage === 'en' ? 'Speak directly with our experts' : 'Говорите напрямую с нашими экспертами'}</p>
                <div className="contact-details">
                  <a href="tel:+918789389223">+91-8789389223</a>
                  <a href="tel:+917304876702">+91-7304876702</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>{t.contact?.email || (currentLanguage === 'en' ? 'Email Us' : 'Напишите нам')}</h3>
                <p>{currentLanguage === 'en' ? 'Send us your requirements' : 'Отправьте нам ваши требования'}</p>
                <div className="contact-details">
                  <a href="mailto:sabrina@languageliberty.com">sabrina@languageliberty.com</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>WhatsApp</h3>
                <p>{currentLanguage === 'en' ? 'Quick chat for instant quotes' : 'Быстрый чат для мгновенных расценок'}</p>
                <div className="contact-details">
                  <a href="https://wa.me/918789389223">Message on WhatsApp</a>
                </div>
              </div>
              
              <div className="contact-card special-offer">
                <div className="contact-icon">🎉</div>
                <h3>{t.contact?.offer || (currentLanguage === 'en' ? 'Special Offer' : 'Специальное предложение')}</h3>
                <p>{currentLanguage === 'en' ? 'First-time clients get' : 'Новые клиенты получают'}</p>
                <div className="offer-badge">20% OFF</div>
              </div>
            </div>
            
            <div className="contact-form-section">
              <div className="contact-image">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=600&fit=crop" alt="Professional Translator" />
              </div>
              <div className="contact-form">
                <h3>{t.contact?.quote || (currentLanguage === 'en' ? 'Request a Quote' : 'Запросить расценки')}</h3>
                <form className="quote-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="name"
                      placeholder={currentLanguage === 'en' ? 'Your Name' : 'Ваше имя'}
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                    <input 
                      type="email" 
                      name="email"
                      placeholder={currentLanguage === 'en' ? 'Email Address' : 'Адрес электронной почты'}
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder={currentLanguage === 'en' ? 'Phone Number' : 'Номер телефона'}
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">{currentLanguage === 'en' ? 'Select Service' : 'Выберите услугу'}</option>
                      <option value="virtual">{currentLanguage === 'en' ? 'Virtual Meeting Interpretation' : 'Устный перевод виртуальных встреч'}</option>
                      <option value="business">{currentLanguage === 'en' ? 'Business Meeting' : 'Деловая встреча'}</option>
                      <option value="document">{currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов'}</option>
                      <option value="training">{currentLanguage === 'en' ? 'Language Training' : 'Обучение языку'}</option>
                      <option value="travel">{currentLanguage === 'en' ? 'Travel Support' : 'Поддержка в поездках'}</option>
                    </select>
                  </div>
                  <textarea 
                    name="message"
                    placeholder={currentLanguage === 'en' ? 'Describe your requirements...' : 'Опишите ваши требования...'}
                    rows="4" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  {formStatus && (
                    <div className={`form-status ${formStatus.includes('Error') || formStatus.includes('Ошибка') ? 'error' : 'success'}`}>
                      {formStatus}
                    </div>
                  )}
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      currentLanguage === 'en' ? 'Sending...' : 'Отправка...'
                    ) : (
                      t.contact?.submit || (currentLanguage === 'en' ? 'Get Free Quote' : 'Получить бесплатную оценку')
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="appointments">
        <div className="container">
          <div className="appointments-header">
            <h2>{t.appointments.title}</h2>
            <p>{t.appointments.subtitle}</p>
          </div>
          <div className="appointments-grid">
            <div className="appointment-card free">
              <div className="appointment-badge">Most Popular</div>
              <div className="appointment-icon">💬</div>
              <h3>{currentLanguage === 'en' ? 'Free Consultation' : 'Бесплатная консультация'}</h3>
              <div className="appointment-price">
                <span className="price">₹0</span>
                <span className="duration">30 minutes</span>
              </div>
              <ul className="appointment-features">
                <li>✓ Requirement Analysis</li>
                <li>✓ Service Recommendations</li>
                <li>✓ Pricing Discussion</li>
                <li>✓ Timeline Planning</li>
              </ul>
              <button className="book-btn primary" onClick={() => window.open('tel:+918789389223')}>{currentLanguage === 'en' ? 'Book Free Call' : 'Записаться на звонок'}</button>
            </div>
            
            <div className="appointment-card premium">
              <div className="appointment-icon">🎯</div>
              <h3>{currentLanguage === 'en' ? 'Business Strategy Session' : 'Бизнес-стратегическая сессия'}</h3>
              <div className="appointment-price">
                <span className="price">₹2,500</span>
                <span className="duration">60 minutes</span>
              </div>
              <ul className="appointment-features">
                <li>✓ Detailed Business Analysis</li>
                <li>✓ Custom Translation Strategy</li>
                <li>✓ Cultural Adaptation Plan</li>
                <li>✓ Long-term Partnership</li>
              </ul>
              <button className="book-btn secondary" onClick={() => window.open('https://wa.me/918789389223')}>{currentLanguage === 'en' ? 'Book Strategy Call' : 'Записаться на стратегический звонок'}</button>
            </div>
            
            <div className="appointment-card urgent">
              <div className="appointment-icon">⚡</div>
              <h3>{currentLanguage === 'en' ? 'Urgent Support' : 'Срочная поддержка'}</h3>
              <div className="appointment-price">
                <span className="price">₹5,000</span>
                <span className="duration">Available 24/7</span>
              </div>
              <ul className="appointment-features">
                <li>✓ Immediate Response</li>
                <li>✓ Emergency Translation</li>
                <li>✓ Crisis Communication</li>
                <li>✓ Same-day Delivery</li>
              </ul>
              <button className="book-btn urgent-btn" onClick={() => window.open('tel:+918789389223')}>{currentLanguage === 'en' ? 'Call Now' : 'Позвонить сейчас'}</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>Language Liberty</h3>
              <p>Breaking language barriers with professional Russian translation services in Mumbai. 6+ years of expertise in business interpretation and cultural communication.</p>
              <div className="footer-social">
                <a href="tel:+918789389223" className="social-link">📞</a>
                <a href="mailto:sabrina@languageliberty.com" className="social-link">✉️</a>
                <a href="https://wa.me/918789389223" className="social-link">💬</a>
              </div>
            </div>
            
            <div className="footer-services">
              <h4>Our Services</h4>
              <ul>
                <li>Virtual Meeting Interpretation</li>
                <li>Business Meeting Support</li>
                <li>Document Translation</li>
                <li>Russian Language Training</li>
                <li>Travel Support</li>
                <li>Entertainment Industry</li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Info</h4>
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <a href="tel:+918789389223">+91-8789389223</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Alt Phone:</span>
                <a href="tel:+917304876702">+91-7304876702</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <a href="mailto:sabrina@languageliberty.com">sabrina@languageliberty.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location:</span>
                <span>Mumbai, India</span>
              </div>
            </div>
            
            <div className="footer-cta">
              <h4>Get Started</h4>
              <p>Ready to break language barriers?</p>
              <div className="footer-buttons">
                <a href="tel:+918789389223" className="footer-btn primary">Call Now</a>
                <a href="https://wa.me/918789389223" className="footer-btn secondary">WhatsApp</a>
              </div>
              <div className="footer-offer">
                <span className="offer-text">🎉 20% OFF First Booking</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 Language Liberty. All rights reserved. | Professional Russian Translation Services</p>
          </div>
        </div>
      </footer>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Chatbot language={currentLanguage} />
      </Suspense>
      

      
      {/* Mobile-only floating language toggle */}
      <div className="mobile-lang-toggle">
        <div className="toggle-switch">
          <input 
            type="checkbox" 
            id="mobileLangToggle" 
            checked={currentLanguage === 'ru'} 
            onChange={(e) => switchLanguage(e.target.checked ? 'ru' : 'en')}
          />
          <label htmlFor="mobileLangToggle" className="toggle-label">
            <span className="toggle-text left">🇺🇸 EN</span>
            <span className="toggle-slider"></span>
            <span className="toggle-text right">🇷🇺 RU</span>
          </label>
        </div>
      </div>
      
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <button className="modal-nav modal-prev" onClick={prevImage}>‹</button>
            <button className="modal-nav modal-next" onClick={nextImage}>›</button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.desc}</p>
              <div className="modal-counter">{currentImageIndex + 1} / {GALLERY_IMAGES.length}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="modal-overlay" onClick={() => setShowFeedbackForm(false)}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowFeedbackForm(false)}>×</button>
            <h3>{currentLanguage === 'en' ? 'Share Your Experience' : 'Поделитесь впечатлениями'}</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="rating-input">
                <label>{currentLanguage === 'en' ? 'Rating:' : 'Оценка:'}</label>
                <div className="star-rating">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={star <= feedbackData.rating ? 'active' : ''}
                      onClick={() => setFeedbackData(prev => ({...prev, rating: star}))}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                name="name"
                placeholder={currentLanguage === 'en' ? 'Your Name' : 'Ваше имя'}
                value={feedbackData.name}
                onChange={handleFeedbackChange}
                required
              />
              <textarea
                name="message"
                placeholder={currentLanguage === 'en' ? 'Share your experience...' : 'Поделитесь впечатлениями...'}
                value={feedbackData.message}
                onChange={handleFeedbackChange}
                required
                rows="4"
              />
              <button type="submit" className="submit-feedback">
                {currentLanguage === 'en' ? 'Submit Feedback' : 'Отправить отзыв'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

function App() {
  return <AppContent />;
}

export default App;