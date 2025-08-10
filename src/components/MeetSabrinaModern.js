import React from 'react';
import './MeetSabrinaModern.css';

const MeetSabrinaModern = () => (
  <section className="meet-sabrina-modern">
    <div className="msm-content">
      <div className="msm-text">
        <h3>ABOUT YOUR TRANSLATOR</h3>
        <h1>MEET SABRINA</h1>
        <h4>Professional Russian-English Translation Services</h4>
        <p>
          Born to a Russian mother and an Indian father, I bridge communication gaps between Russian-speaking countries and the world. With education in Russia, Uzbekistan, and India, I bring authentic cultural understanding to every translation project.<br /><br />
          With 6+ years of professional experience, I specialize in business interpretation, document translation, and cultural consultation for companies expanding into Russian markets.
        </p>
        <div className="msm-badges">
          <div className="msm-badge">CERTIFIED<br />TRANSLATOR</div>
          <div className="msm-badge">MULTICULTURAL<br />BACKGROUND</div>
          <div className="msm-badge">BUSINESS<br />SPECIALIST</div>
        </div>
        <div className="msm-buttons">
          <button className="msm-quote">GET QUOTE</button>
          <button className="msm-call">CALL NOW</button>
        </div>
      </div>
      <div className="msm-image-container">
        <img src="/images/sabrina-profile.jpeg" alt="Sabrina profile" className="msm-image" />
      </div>
    </div>
  </section>
);

export default MeetSabrinaModern;
