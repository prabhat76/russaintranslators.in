import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const chatbotResponses = {
  en: {
    greeting: "Hello! I'm Language Liberty's virtual assistant. How can I help you today?",
    quickReplies: [
      "Tell me about your services",
      "What languages do you translate?",
      "How much does translation cost?",
      "How do I get started?"
    ],
    responses: {
      services: "We offer comprehensive Russian translation services including:\n\n• Business Translation\n• Legal Documentation\n• Technical Translation\n• Interpretation Services\n• Website Localization\n• Literary Translation\n\nAll services are provided with deep cultural understanding of both Indian and Russian contexts.",
      languages: "We specialize in Russian-English and English-Russian translations. Our founder, Sabrina Bhatt, has native fluency in Russian through her Russian mother and deep understanding of Indian culture.",
      cost: "Translation costs vary based on document type, length, and urgency. Please contact us for a personalized quote. We offer competitive rates and premium quality service.",
      started: "Getting started is easy!\n\n1. Contact us through the form on this website\n2. Share your document and requirements\n3. Receive a quote within 24 hours\n4. Approve and we begin translation\n5. Receive your professionally translated document\n\nWould you like to contact us now?",
      default: "Thank you for your question! For detailed information, please contact us directly through the Contact section. Our team will be happy to assist you personally."
    }
  },
  ru: {
    greeting: "Здравствуйте! Я виртуальный помощник Language Liberty. Как я могу вам помочь сегодня?",
    quickReplies: [
      "Расскажите об услугах",
      "Какие языки вы переводите?",
      "Сколько стоит перевод?",
      "Как начать работу?"
    ],
    responses: {
      services: "Мы предлагаем комплексные услуги русского перевода, включая:\n\n• Деловой перевод\n• Юридическая документация\n• Технический перевод\n• Услуги устного перевода\n• Локализация веб-сайтов\n• Литературный перевод\n\nВсе услуги предоставляются с глубоким культурным пониманием как индийского, так и российского контекстов.",
      languages: "Мы специализируемся на переводах с русского на английский и с английского на русский. Наш основатель, Сабрина Бхатт, владеет русским языком на родном уровне благодаря своей русской матери и имеет глубокое понимание индийской культуры.",
      cost: "Стоимость перевода зависит от типа документа, объема и срочности. Пожалуйста, свяжитесь с нами для получения персонального предложения. Мы предлагаем конкурентные цены и премиум качество.",
      started: "Начать работу легко!\n\n1. Свяжитесь с нами через форму на сайте\n2. Поделитесь документом и требованиями\n3. Получите предложение в течение 24 часов\n4. Одобрите и мы начнем перевод\n5. Получите профессионально переведенный документ\n\nХотите связаться с нами сейчас?",
      default: "Спасибо за ваш вопрос! Для получения подробной информации, пожалуйста, свяжитесь с нами напрямую через раздел Контакты. Наша команда будет рада помочь вам лично."
    }
  }
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { language } = useLanguage();

  const content = chatbotResponses[language];

  // Initialize with greeting when first opened
  const handleOpen = () => {
    if (!isOpen && messages.length === 0) {
      setMessages([{
        id: Date.now(),
        text: content.greeting,
        sender: "bot",
        timestamp: new Date()
      }]);
    }
    setIsOpen(true);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (language === "en") {
      if (lowerMessage.includes("service") || lowerMessage.includes("what do you")) {
        return content.responses.services;
      } else if (lowerMessage.includes("language") || lowerMessage.includes("russian")) {
        return content.responses.languages;
      } else if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("much")) {
        return content.responses.cost;
      } else if (lowerMessage.includes("start") || lowerMessage.includes("begin") || lowerMessage.includes("how")) {
        return content.responses.started;
      }
    } else {
      if (lowerMessage.includes("услуг") || lowerMessage.includes("предлагаете")) {
        return content.responses.services;
      } else if (lowerMessage.includes("язык") || lowerMessage.includes("переводите")) {
        return content.responses.languages;
      } else if (lowerMessage.includes("стоит") || lowerMessage.includes("цен") || lowerMessage.includes("сколько")) {
        return content.responses.cost;
      } else if (lowerMessage.includes("начать") || lowerMessage.includes("работу")) {
        return content.responses.started;
      }
    }
    
    return content.responses.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 bg-red-700 hover:bg-red-800 text-white rounded-full p-4 shadow-2xl hover:shadow-red-700/50 transition-all hover:scale-110"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 to-red-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-red-700" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                    Language Liberty
                  </h3>
                  <p className="text-xs text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {language === "en" ? "Online now" : "Онлайн"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-red-700 text-white rounded-br-sm"
                          : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-white border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {content.quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={language === "en" ? "Type your message..." : "Введите сообщение..."}
                  className="flex-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-red-700 hover:bg-red-800"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
