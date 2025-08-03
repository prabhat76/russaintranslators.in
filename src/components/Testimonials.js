import React from 'react';

const Testimonials = ({ language }) => {
  const testimonials = language === 'en' ? [
    {
      text: "Sabrina's interpretation during our Coal India negotiations was flawless. Her cultural insights helped us close a $50M deal with Russian partners.",
      author: "Rajesh Kumar",
      position: "CEO, Mining Corp India",
      rating: 5
    },
    {
      text: "Professional, punctual, and precise. Sabrina translated our pharmaceutical patents with 100% accuracy. Highly recommended!",
      author: "Dr. Priya Sharma", 
      position: "Director, PharmaTech Ltd",
      rating: 5
    },
    {
      text: "Excellent Russian language training! Sabrina's teaching helped our team successfully expand into Moscow markets.",
      author: "Amit Patel",
      position: "International Business Head",
      rating: 5
    }
  ] : [
    {
      text: "Интерпретация Сабрины во время наших переговоров с Coal India была безупречной. Её культурные инсайты помогли нам заключить сделку на $50 млн.",
      author: "Раджеш Кумар",
      position: "Генеральный директор, Mining Corp India",
      rating: 5
    },
    {
      text: "Профессионально, пунктуально и точно. Сабрина перевела наши фармацевтические патенты со 100% точностью. Настоятельно рекомендую!",
      author: "Доктор Прия Шарма",
      position: "Директор, PharmaTech Ltd",
      rating: 5
    },
    {
      text: "Отличное обучение русскому языку! Преподавание Сабрины помогло нашей команде успешно выйти на московские рынки.",
      author: "Амит Патель",
      position: "Руководитель международного бизнеса",
      rating: 5
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2>{language === 'en' ? 'What Our Clients Say' : 'Что говорят наши клиенты'}</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;