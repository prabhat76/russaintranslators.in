import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Testimonials = ({ currentLanguage, isMobile, isTablet }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', email: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'testimonials'));
        const fetchedTestimonials = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTestimonials(fetchedTestimonials);
      } catch (error) {
        console.log('Error fetching testimonials:', error);
        // Enhanced fallback testimonials
        setTestimonials([
          {
            id: 1,
            name: currentLanguage === 'en' ? "Sarah Johnson" : "Сара Джонсон",
            role: currentLanguage === 'en' ? "Business Executive" : "Руководитель компании",
            company: currentLanguage === 'en' ? "Global Tech Corp" : "Глобал Тех Корп",
            comment: currentLanguage === 'en' 
              ? "Exceptional Russian translation service! Their team delivered perfect business documents with cultural nuances intact. Professional, accurate, and delivered ahead of schedule."
              : "Исключительный сервис русского перевода! Их команда предоставила идеальные деловые документы с сохранением культурных нюансов. Профессионально, точно и с опережением графика.",
            rating: 5,
            date: "2024-01-15",
            location: currentLanguage === 'en' ? "New York, USA" : "Нью-Йорк, США"
          },
          {
            id: 2,
            name: currentLanguage === 'en' ? "Dr. Michael Chen" : "Д-р Михаил Чен",
            role: currentLanguage === 'en' ? "Legal Consultant" : "Юридический консультант",
            company: currentLanguage === 'en' ? "Chen & Associates" : "Чен и партнеры",
            comment: currentLanguage === 'en'
              ? "Outstanding quality and attention to detail. The legal document translations were not only accurate but also maintained the precise legal terminology required for international contracts."
              : "Выдающееся качество и внимание к деталям. Переводы юридических документов были не только точными, но и сохраняли точную юридическую терминологию, необходимую для международных контрактов.",
            rating: 5,
            date: "2024-01-10",
            location: currentLanguage === 'en' ? "London, UK" : "Лондон, Великобритания"
          },
          {
            id: 3,
            name: currentLanguage === 'en' ? "Elena Rodriguez" : "Елена Родригес",
            role: currentLanguage === 'en' ? "Marketing Director" : "Директор по маркетингу",
            company: currentLanguage === 'en' ? "Creative Solutions" : "Креативные решения",
            comment: currentLanguage === 'en'
              ? "Fast, reliable, and professional service. Their marketing translation captured our brand voice perfectly in Russian. Great communication throughout the project. Highly recommended!"
              : "Быстрый, надежный и профессиональный сервис. Их маркетинговый перевод идеально передал голос нашего бренда на русском языке. Отличная коммуникация на протяжении всего проекта. Настоятельно рекомендую!",
            rating: 5,
            date: "2024-01-08",
            location: currentLanguage === 'en' ? "Madrid, Spain" : "Мадрид, Испания"
          },
          {
            id: 4,
            name: currentLanguage === 'en' ? "Alexander Volkov" : "Александр Волков",
            role: currentLanguage === 'en' ? "Tech Entrepreneur" : "Технологический предприниматель",
            company: currentLanguage === 'en' ? "Innovation Labs" : "Лаборатория инноваций",
            comment: currentLanguage === 'en'
              ? "Brilliant technical translation work! They understood complex software documentation and delivered translations that our Russian development team could implement immediately."
              : "Блестящая работа по техническому переводу! Они поняли сложную документацию программного обеспечения и предоставили переводы, которые наша российская команда разработчиков смогла сразу же реализовать.",
            rating: 5,
            date: "2024-01-05",
            location: currentLanguage === 'en' ? "Berlin, Germany" : "Берлин, Германия"
          },
          {
            id: 5,
            name: currentLanguage === 'en' ? "Maria Petrov" : "Мария Петров",
            role: currentLanguage === 'en' ? "Academic Coordinator" : "Академический координатор",
            company: currentLanguage === 'en' ? "International University" : "Международный университет",
            comment: currentLanguage === 'en'
              ? "Exceptional academic translation services. They handled sensitive research documents with utmost care and precision. The quality exceeded our expectations completely."
              : "Исключительные услуги академического перевода. Они обработали деликатные исследовательские документы с максимальной осторожностью и точностью. Качество полностью превзошло наши ожидания.",
            rating: 5,
            date: "2024-01-03",
            location: currentLanguage === 'en' ? "Toronto, Canada" : "Торонто, Канада"
          },
          {
            id: 6,
            name: currentLanguage === 'en' ? "James Williams" : "Джеймс Уильямс",
            role: currentLanguage === 'en' ? "Import/Export Manager" : "Менеджер по импорту/экспорту",
            company: currentLanguage === 'en' ? "Global Trade Solutions" : "Глобальные торговые решения",
            comment: currentLanguage === 'en'
              ? "Perfect for international business! Their expertise in commercial translations helped us expand into Russian markets seamlessly. Professional service from start to finish."
              : "Идеально подходит для международного бизнеса! Их опыт в коммерческих переводах помог нам беспрепятственно выйти на российские рынки. Профессиональный сервис от начала до конца.",
            rating: 5,
            date: "2024-01-01",
            location: currentLanguage === 'en' ? "Sydney, Australia" : "Сидней, Австралия"
          }
        ]);
      }
    };

    fetchTestimonials();
  }, [currentLanguage]);

  // Auto-play carousel functionality
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(testimonials.length / (isMobile ? 1 : isTablet ? 2 : 3)));
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length, isMobile, isTablet]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(prev => (prev + 1) % Math.ceil(testimonials.length / (isMobile ? 1 : isTablet ? 2 : 3)));
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(prev => prev === 0 ? Math.ceil(testimonials.length / (isMobile ? 1 : isTablet ? 2 : 3)) - 1 : prev - 1);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'testimonials'), {
        ...newReview,
        date: new Date().toISOString().split('T')[0],
        approved: false
      });
      
      setSubmitSuccess(true);
      setNewReview({ name: '', email: '', rating: 5, comment: '' });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 4rem',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
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
          radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(168,85,247,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(34,197,94,0.05) 0%, transparent 50%)
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
              {currentLanguage === 'en' ? '⭐ Client Testimonials' : '⭐ Отзывы клиентов'}
            </span>
          </div>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '900',
            marginBottom: '1rem',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            {currentLanguage === 'en' ? 'What Clients Say' : 'Что говорят клиенты'}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#cbd5e1',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {currentLanguage === 'en' 
              ? 'Real feedback from satisfied clients who trust our translation services'
              : 'Реальные отзывы довольных клиентов, которые доверяют нашим переводческим услугам'
            }
          </p>
        </div>

        {/* Enhanced Testimonials Carousel */}
        <div style={{ position: 'relative', marginBottom: '4rem' }}>
          {/* Carousel Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <button
              onClick={prevSlide}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59,130,246,0.3)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ⬅️
            </button>

            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              {Array.from({ length: Math.ceil(testimonials.length / (isMobile ? 1 : isTablet ? 2 : 3)) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: currentSlide === index ? '24px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: currentSlide === index 
                      ? 'linear-gradient(135deg, #60a5fa, #a78bfa)'
                      : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59,130,246,0.3)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ➡️
            </button>
          </div>

          {/* Testimonials Container */}
          <div style={{
            overflow: 'hidden',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.5s ease'
            }}>
              {Array.from({ length: Math.ceil(testimonials.length / (isMobile ? 1 : isTablet ? 2 : 3)) }).map((_, slideIndex) => (
                <div key={slideIndex} style={{
                  minWidth: '100%',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                  gap: '2rem',
                  padding: '0 1rem'
                }}>
                  {testimonials
                    .slice(
                      slideIndex * (isMobile ? 1 : isTablet ? 2 : 3),
                      (slideIndex + 1) * (isMobile ? 1 : isTablet ? 2 : 3)
                    )
                    .map((testimonial, index) => (
                      <div key={testimonial.id || index} style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        position: 'relative',
                        transition: 'all 0.4s ease',
                        cursor: 'pointer',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      }}>
                        
                        {/* Decorative corner */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '60px',
                          height: '60px',
                          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                          borderRadius: '0 24px 0 24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}>
                          💬
                        </div>

                        {/* Rating Stars */}
                        <div style={{ marginBottom: '1.5rem' }}>
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <span key={i} style={{ 
                              color: '#fbbf24', 
                              fontSize: '1.4rem', 
                              marginRight: '3px',
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                            }}>⭐</span>
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote style={{
                          fontSize: '1.1rem',
                          lineHeight: '1.7',
                          color: '#e2e8f0',
                          marginBottom: '2rem',
                          fontStyle: 'italic',
                          position: 'relative',
                          paddingLeft: '1rem'
                        }}>
                          <span style={{
                            position: 'absolute',
                            top: '-15px',
                            left: '-10px',
                            fontSize: '4rem',
                            color: 'rgba(59,130,246,0.2)',
                            fontFamily: 'serif',
                            lineHeight: '1'
                          }}>"</span>
                          {testimonial.comment}
                          <span style={{
                            position: 'absolute',
                            bottom: '-25px',
                            right: '10px',
                            fontSize: '4rem',
                            color: 'rgba(59,130,246,0.2)',
                            fontFamily: 'serif',
                            lineHeight: '1'
                          }}>"</span>
                        </blockquote>

                        {/* Client Info */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                          paddingTop: '1.5rem'
                        }}>
                          <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, #3b82f6, #8b5cf6)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            color: 'white',
                            marginRight: '1.5rem',
                            border: '3px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }}>
                            {testimonial.name?.charAt(0) || 'C'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <h4 style={{
                              fontSize: '1.2rem',
                              fontWeight: '700',
                              color: '#f1f5f9',
                              marginBottom: '0.25rem'
                            }}>
                              {testimonial.name}
                            </h4>
                            <p style={{
                              fontSize: '1rem',
                              color: '#60a5fa',
                              margin: '0 0 0.25rem',
                              fontWeight: '500'
                            }}>
                              {testimonial.role}
                            </p>
                            {testimonial.company && (
                              <p style={{
                                fontSize: '0.9rem',
                                color: '#94a3b8',
                                margin: '0 0 0.5rem'
                              }}>
                                {testimonial.company}
                              </p>
                            )}
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              {testimonial.date && (
                                <p style={{
                                  fontSize: '0.8rem',
                                  color: '#64748b',
                                  margin: 0
                                }}>
                                  {new Date(testimonial.date).toLocaleDateString()}
                                </p>
                              )}
                              {testimonial.location && (
                                <p style={{
                                  fontSize: '0.8rem',
                                  color: '#64748b',
                                  margin: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem'
                                }}>
                                  📍 {testimonial.location}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Auto-play toggle */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              style={{
                background: isAutoPlaying 
                  ? 'linear-gradient(135deg, #34d399, #10b981)'
                  : 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '25px',
                padding: '0.5rem 1.5rem',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              {isAutoPlaying ? '⏸️' : '▶️'}
              {isAutoPlaying 
                ? (currentLanguage === 'en' ? 'Auto-playing' : 'Автовоспроизведение')
                : (currentLanguage === 'en' ? 'Play slideshow' : 'Запустить слайдшоу')
              }
            </button>
          </div>
        </div>

        {/* Review Submission Section */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          padding: isMobile ? '2rem 1.5rem' : '3rem',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #60a5fa, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {currentLanguage === 'en' ? 'Share Your Experience' : 'Поделитесь своим опытом'}
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            marginBottom: '2rem'
          }}>
            {currentLanguage === 'en' 
              ? 'Help others by sharing your experience with our translation services'
              : 'Помогите другим, поделившись своим опытом работы с нашими переводческими услугами'
            }
          </p>

          {submitSuccess ? (
            <div style={{
              background: 'rgba(34,197,94,0.2)',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: '12px',
              padding: '2rem',
              color: '#86efac'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                {currentLanguage === 'en' ? 'Thank you for your review!' : 'Спасибо за ваш отзыв!'}
              </h4>
              <p>
                {currentLanguage === 'en' 
                  ? 'Your feedback has been submitted and will be reviewed shortly.'
                  : 'Ваш отзыв отправлен и скоро будет рассмотрен.'
                }
              </p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} style={{ textAlign: 'left' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <input
                  type="text"
                  placeholder={currentLanguage === 'en' ? 'Your Name' : 'Ваше имя'}
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  required
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="email"
                  placeholder={currentLanguage === 'en' ? 'Your Email' : 'Ваш email'}
                  value={newReview.email}
                  onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                  required
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                  {currentLanguage === 'en' ? 'Rating' : 'Оценка'}
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    width: '200px'
                  }}
                >
                  {[5,4,3,2,1].map(rating => (
                    <option key={rating} value={rating} style={{ background: '#1e293b' }}>
                      {rating} ⭐{rating > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder={currentLanguage === 'en' ? 'Share your experience...' : 'Поделитесь своим опытом...'}
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                required
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  marginBottom: '1.5rem',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting 
                    ? 'rgba(100,116,139,0.5)' 
                    : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isSubmitting ? 0.7 : 1,
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(59,130,246,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {isSubmitting 
                  ? (currentLanguage === 'en' ? 'Submitting...' : 'Отправка...')
                  : (currentLanguage === 'en' ? 'Submit Review' : 'Отправить отзыв')
                }
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
