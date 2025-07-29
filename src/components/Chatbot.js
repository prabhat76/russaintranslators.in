import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Sabrina's assistant. How can I help you with Russian translation services?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Get Quote",
    "📞 Call Now",
    "✉️ Email Us",
    "Services",
    "Pricing"
  ];

  const botResponses = {
    "get quote": "I'd be happy to help you get a quote! Please share:\n• Document type\n• Number of pages/words\n• Deadline\n• Language pair\n\nOr call +91-8789389223 for instant quote!",
    "services": "Our services include:\n• Document Translation\n• Online/Offline Meetings\n• Russian Language Course\n• Travel Support\n• Artist Assistance\n\nWhich service interests you?",
    "pricing": "We offer competitive rates:\n• Document: ₹2-5 per word\n• Interpretation: ₹2000-5000/hour\n• 20% OFF first booking!\n\nCall +91-8789389223 for exact quote.",
    "contact": "📞 Primary: +91-8789389223\n📞 Secondary: +91-7304876702\n📧 Email: sabrina@languageliberty.com\n📍 Mumbai, India\n⏰ 24/7 Support Available\n\nClick 'Call Now' or 'Email Us' for instant contact!",
    "hello": "Hello! Welcome to Language Liberty. I'm here to help with your Russian translation needs. What can I assist you with today?",
    "hi": "Hi there! How can I help you with Russian translation services today?",
    "help": "I can help you with:\n• Getting quotes\n• Service information\n• Pricing details\n• Contact information\n• Booking appointments\n\nWhat would you like to know?"
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    const response = getBotResponse(inputValue.toLowerCase());
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 1000);

    setInputValue('');
  };

  const getBotResponse = (input) => {
    for (const [key, response] of Object.entries(botResponses)) {
      if (input.includes(key)) {
        return response;
      }
    }
    return "I understand you're interested in Russian translation services. For specific queries, please call +91-8789389223 or choose from the options above. How else can I help?";
  };

  const handleQuickReply = (reply) => {
    if (reply === '📞 Call Now') {
      window.open('tel:+918789389223', '_self');
      return;
    }
    
    if (reply === '✉️ Email Us') {
      window.open('mailto:sabrina@languageliberty.com?subject=Russian Translation Inquiry&body=Hi Sabrina,%0D%0A%0D%0AI am interested in your Russian translation services. Please contact me.%0D%0A%0D%0AThank you!', '_self');
      return;
    }

    const userMessage = { text: reply, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    const response = getBotResponse(reply.toLowerCase());
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <div 
        className={`chat-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">🇷🇺</div>
            <div className="chat-info">
              <h4>Russian Translation Assistant</h4>
              <span className="online-status">● Online</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-bubble">
                  {message.text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-replies">
            {quickReplies.map((reply, index) => (
              <button 
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .chat-button {
          position: fixed;
          bottom: 20px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
        }

        .chat-button.open {
          background: #ff6b6b;
        }

        .chat-window {
          position: fixed;
          bottom: 90px;
          right: 30px;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
        }

        .chat-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .chat-info h4 {
          margin: 0;
          font-size: 14px;
        }

        .online-status {
          font-size: 12px;
          color: #4ade80;
        }

        .chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          background: #f8f9fa;
        }

        .message {
          margin-bottom: 15px;
          display: flex;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-bubble {
          max-width: 80%;
          padding: 10px 15px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
        }

        .message.bot .message-bubble {
          background: white;
          color: #2d3748;
          border-bottom-left-radius: 5px;
        }

        .message.user .message-bubble {
          background: #667eea;
          color: white;
          border-bottom-right-radius: 5px;
        }

        .quick-replies {
          padding: 10px 15px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          background: white;
          border-top: 1px solid #e2e8f0;
        }

        .quick-reply-btn {
          padding: 6px 12px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-reply-btn:hover {
          background: #667eea;
          color: white;
        }

        .chat-input {
          padding: 15px;
          display: flex;
          gap: 10px;
          background: white;
          border-top: 1px solid #e2e8f0;
        }

        .chat-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          outline: none;
          font-size: 14px;
        }

        .chat-input input:focus {
          border-color: #667eea;
        }

        .chat-input button {
          padding: 10px 20px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s ease;
        }

        .chat-input button:hover {
          background: #5a67d8;
        }

        @media (max-width: 768px) {
          .chat-button {
            width: 55px;
            height: 55px;
            bottom: 20px;
            right: 15px;
            font-size: 22px;
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
            z-index: 1001;
          }
          
          .chat-window {
            width: 100vw;
            height: 100vh;
            right: 0;
            bottom: 0;
            border-radius: 0;
            position: fixed;
            top: 0;
            left: 0;
          }
          
          .chat-header {
            padding: 12px;
          }
          
          .chat-avatar {
            width: 35px;
            height: 35px;
            font-size: 18px;
          }
          
          .chat-info h4 {
            font-size: 13px;
          }
          
          .online-status {
            font-size: 11px;
          }
          
          .chat-messages {
            padding: 12px;
          }
          
          .message-bubble {
            font-size: 13px;
            padding: 8px 12px;
          }
          
          .quick-replies {
            padding: 8px 12px;
            gap: 6px;
          }
          
          .quick-reply-btn {
            padding: 5px 10px;
            font-size: 11px;
          }
          
          .chat-input {
            padding: 12px;
            gap: 8px;
          }
          
          .chat-input input {
            padding: 8px;
            font-size: 13px;
          }
          
          .chat-input button {
            padding: 8px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;