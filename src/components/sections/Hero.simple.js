import React from 'react';
import '../../styles/sections/hero.css';

const Hero = ({ content }) => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-image">
          <img 
            src="/images/handshake-flags.svg" 
            alt="Russian-English Translation Services" 
          />
        </div>
        <h1>{content?.hero?.title || 'Professional Russian Translation Services'}</h1>
        <p>{content?.hero?.subtitle || 'Expert translation services for business, legal, and technical documents'}</p>
        <div className="hero-cta">
          <button className="hero-button" onClick={handleContactClick}>
            {content?.hero?.cta || 'Get a Free Quote'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
