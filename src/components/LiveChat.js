import React, { useState, useEffect, useRef } from 'react';

const LiveChat = ({ currentLanguage, isOpen, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const translations = {
    en: {
      title: 'Live Chat Support',
      placeholder: 'Type your message...',
      send: 'Send',
      connecting: 'Connecting...',
      connected: 'Connected',
      offline: 'Offline',
      startMessage: 'Hello! How can I help you with your translation needs today?',
      typingIndicator: 'Sabrina is typing...',
      closeChat: 'Close Chat'
    },
    ru: {
      title: 'Онлайн-чат поддержки',
      placeholder: 'Введите ваше сообщение...',
      send: 'Отправить',
      connecting: 'Подключение...',
      connected: 'Подключено',
      offline: 'Не в сети',
      startMessage: 'Привет! Как я могу помочь вам с переводом сегодня?',
      typingIndicator: 'Сабрина печатает...',
      closeChat: 'Закрыть чат'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Simulate connection
      setTimeout(() => {
        setIsConnected(true);
        setMessages([{
          id: 1,
          text: t.startMessage,
          sender: 'agent',
          timestamp: new Date()
        }]);
      }, 1500);
    }
  }, [isOpen, messages.length, t.startMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      const responses = currentLanguage === 'en' ? [
        "Thank you for your message! I'll get back to you shortly with a detailed response.",
        "That's a great question about translation services. Let me provide you with more information.",
        "I understand your requirements. We can definitely help you with that translation project.",
        "Perfect! I'll prepare a custom quote for your translation needs within the next hour.",
        "Thanks for contacting us! Could you please provide more details about your project?"
      ] : [
        "Спасибо за ваше сообщение! Я скоро отвечу вам подробно.",
        "Это отличный вопрос об услугах перевода. Позвольте мне предоставить вам больше информации.",
        "Я понимаю ваши требования. Мы определенно можем помочь вам с этим проектом перевода.",
        "Отлично! Я подготовлю индивидуальное предложение для ваших потребностей в переводе в течение следующего часа.",
        "Спасибо за обращение к нам! Не могли бы вы предоставить больше деталей о вашем проекте?"
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'agent',
        timestamp: new Date()
      }]);
    }, 2000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="live-chat-overlay">
      <div className="live-chat-container">
        <div className="live-chat-header">
          <div className="chat-header-info">
            <div className="agent-avatar">
              <img src="/images/sabrina-profile.jpeg" alt="Sabrina" />
              <div className={`status-indicator ${isConnected ? 'online' : 'offline'}`}></div>
            </div>
            <div className="agent-details">
              <h4>Sabrina Bhatt</h4>
              <span className="agent-status">
                {isConnected ? t.connected : t.connecting}
              </span>
            </div>
          </div>
          <button onClick={onToggle} className="close-chat-btn" title={t.closeChat}>
            ×
          </button>
        </div>

        <div className="live-chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message agent typing">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">{t.typingIndicator}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="live-chat-input">
          <div className="input-container">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.placeholder}
              rows="1"
              disabled={!isConnected}
            />
            <button 
              onClick={handleSend} 
              disabled={!inputValue.trim() || !isConnected}
              className="send-btn"
            >
              {t.send}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
