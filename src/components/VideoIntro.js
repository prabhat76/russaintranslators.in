import React, { useState } from 'react';
import { useContentContext } from '../contexts/ContentContext';

const VideoIntro = () => {
  const { content, isRussian } = useContentContext();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!content) return null;

  return (
    <section className="video-intro-section">
      <div className="container">
        <div className="video-intro-content">
          <div className="video-wrapper">
            <video
              controls
              poster="/images/sabrina-profile.jpeg"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="intro-video"
              preload="metadata"
            >
              <source src="/images/sabrina-intro-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <div className="video-overlay" onClick={() => {
                const video = document.querySelector('.intro-video');
                if (video) video.play();
              }}>
                <button className="play-button" aria-label="Play video">
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.9)" />
                    <polygon points="24,18 24,42 42,30" fill="#333" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="video-description">
            <h2>{content.about.title}</h2>
            <p>{content.about.description}</p>
            <div className="video-stats">
              <div className="stat">
                <span className="stat-number">6+</span>
                <span className="stat-label">
                  {isRussian ? 'Лет опыта' : 'Years Experience'}
                </span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">
                  {isRussian ? 'Проектов' : 'Projects'}
                </span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">
                  {isRussian ? 'Поддержка' : 'Support'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .video-intro-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        
        .video-intro-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .video-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .intro-video {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
          cursor: pointer;
        }
        
        .play-button {
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .play-button:hover {
          transform: scale(1.1);
        }
        
        .video-description h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #333;
        }
        
        .video-description p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 40px;
        }
        
        .video-stats {
          display: flex;
          gap: 40px;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: bold;
          color: #dc3545;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        @media (max-width: 768px) {
          .video-intro-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .video-description h2 {
            font-size: 2rem;
          }
          
          .video-stats {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default VideoIntro;