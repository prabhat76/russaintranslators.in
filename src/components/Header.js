import React from 'react';

const Header = ({ currentLanguage, switchLanguage }) => {
  const handleToggle = () => {
    const newLang = currentLanguage === 'en' ? 'ru' : 'en';
    switchLanguage(newLang);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>{currentLanguage === 'en' ? 'Russian Translator' : 'Русский переводчик'}</h1>
        <nav className="header-nav">
          <a href="#services">{currentLanguage === 'en' ? 'Services' : 'Услуги'}</a>
          <a href="#contact">{currentLanguage === 'en' ? 'Contact' : 'Контакт'}</a>
          <button 
            className="language-toggle in-header" 
            onClick={handleToggle}
            aria-label={`Switch to ${currentLanguage === 'en' ? 'Russian' : 'English'}`}
          >
            {currentLanguage === 'en' ? '🇷🇺 Русский' : '🇺🇸 English'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
