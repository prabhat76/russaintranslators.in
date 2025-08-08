import React, { useState, useEffect } from 'react';

const AccessibilityPanel = ({ currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    contrast: 'normal',
    animation: true,
    screenReader: false
  });

  const translations = {
    en: {
      title: 'Accessibility Options',
      fontSize: 'Font Size',
      contrast: 'Contrast',
      animation: 'Animations',
      screenReader: 'Screen Reader Mode',
      small: 'Small',
      normal: 'Normal',
      large: 'Large',
      high: 'High Contrast',
      on: 'On',
      off: 'Off',
      reset: 'Reset to Default'
    },
    ru: {
      title: 'Настройки доступности',
      fontSize: 'Размер шрифта',
      contrast: 'Контраст',
      animation: 'Анимации',
      screenReader: 'Режим чтения с экрана',
      small: 'Маленький',
      normal: 'Обычный',
      large: 'Большой',
      high: 'Высокий контраст',
      on: 'Вкл',
      off: 'Выкл',
      reset: 'Сбросить к умолчанию'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  const applySettings = (newSettings) => {
    const root = document.documentElement;
    
    // Font size
    switch (newSettings.fontSize) {
      case 'small':
        root.style.setProperty('--base-font-size', '14px');
        break;
      case 'large':
        root.style.setProperty('--base-font-size', '18px');
        break;
      default:
        root.style.setProperty('--base-font-size', '16px');
    }

    // Contrast
    if (newSettings.contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Animations
    if (!newSettings.animation) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Screen reader mode
    if (newSettings.screenReader) {
      root.classList.add('screen-reader-mode');
    } else {
      root.classList.remove('screen-reader-mode');
    }
  };

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 'normal',
      contrast: 'normal',
      animation: true,
      screenReader: false
    };
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.removeItem('accessibility-settings');
  };

  return (
    <>
      <button 
        className="accessibility-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t.title}
        aria-expanded={isOpen}
      >
        ♿
      </button>

      {isOpen && (
        <div className="accessibility-panel" role="dialog" aria-labelledby="accessibility-title">
          <div className="accessibility-content">
            <h3 id="accessibility-title">{t.title}</h3>
            
            <div className="accessibility-group">
              <label htmlFor="font-size">{t.fontSize}:</label>
              <select 
                id="font-size"
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', e.target.value)}
              >
                <option value="small">{t.small}</option>
                <option value="normal">{t.normal}</option>
                <option value="large">{t.large}</option>
              </select>
            </div>

            <div className="accessibility-group">
              <label htmlFor="contrast">{t.contrast}:</label>
              <select 
                id="contrast"
                value={settings.contrast}
                onChange={(e) => updateSetting('contrast', e.target.value)}
              >
                <option value="normal">{t.normal}</option>
                <option value="high">{t.high}</option>
              </select>
            </div>

            <div className="accessibility-group">
              <label htmlFor="animation">{t.animation}:</label>
              <select 
                id="animation"
                value={settings.animation ? 'on' : 'off'}
                onChange={(e) => updateSetting('animation', e.target.value === 'on')}
              >
                <option value="on">{t.on}</option>
                <option value="off">{t.off}</option>
              </select>
            </div>

            <div className="accessibility-group">
              <label htmlFor="screen-reader">{t.screenReader}:</label>
              <select 
                id="screen-reader"
                value={settings.screenReader ? 'on' : 'off'}
                onChange={(e) => updateSetting('screenReader', e.target.value === 'on')}
              >
                <option value="off">{t.off}</option>
                <option value="on">{t.on}</option>
              </select>
            </div>

            <div className="accessibility-actions">
              <button onClick={resetSettings} className="btn btn-sm">
                {t.reset}
              </button>
              <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-primary">
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Focus management utility
export const manageFocus = {
  trap: (element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => element.removeEventListener('keydown', handleTabKey);
  },

  restoreFocus: (() => {
    let previousFocus = null;
    return {
      save: () => { previousFocus = document.activeElement; },
      restore: () => { previousFocus?.focus(); }
    };
  })()
};

// Announce messages to screen readers
export const announce = (message, priority = 'polite') => {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
  
  setTimeout(() => {
    announcer.textContent = message;
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, 100);
};

export default AccessibilityPanel;
