import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useState, useCallback } from "react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLanguage = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setLanguage(language === "en" ? "ru" : "en");
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [language, setLanguage, isAnimating]);

  return (
    <div className="relative">
      <button
        onClick={toggleLanguage}
        disabled={isAnimating}
        className="relative flex items-center w-20 h-10 bg-gradient-to-r from-red-50 to-red-100 rounded-full border-2 border-red-200 hover:border-red-300 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-200/50 disabled:cursor-not-allowed disabled:opacity-75"
        aria-label={`Switch to ${language === "en" ? "Russian" : "English"}`}
        role="switch"
        aria-checked={language === "ru"}
      >
        {/* Background gradient that shifts */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-700"
          initial={false}
          animate={{
            x: language === "en" ? 0 : "50%",
            opacity: 0.1
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        
        {/* Sliding indicator */}
        <motion.div
          className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-lg border border-red-200 flex items-center justify-center"
          initial={false}
          animate={{
            x: language === "en" ? 2 : 38
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.span
            className="text-lg"
            initial={false}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: language === "en" ? 0 : 360
            }}
            transition={{ 
              scale: { duration: 0.2 },
              rotate: { duration: 0.5 }
            }}
          >
            {language === "en" ? "🇮🇳" : "🇷🇺"}
          </motion.span>
        </motion.div>

        {/* Language labels */}
        <div className="flex items-center justify-between w-full px-2 text-xs font-semibold">
          <motion.span
            className={`ml-1 transition-colors duration-300 ${
              language === "en" ? "text-red-700" : "text-gray-400"
            }`}
            animate={{ 
              opacity: language === "en" ? 1 : 0.6,
              scale: language === "en" ? 1 : 0.9
            }}
          >
            EN
          </motion.span>
          <motion.span
            className={`mr-1 transition-colors duration-300 ${
              language === "ru" ? "text-red-700" : "text-gray-400"
            }`}
            animate={{ 
              opacity: language === "ru" ? 1 : 0.6,
              scale: language === "ru" ? 1 : 0.9
            }}
          >
            RU
          </motion.span>
        </div>
      </button>
      
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {language === "en" ? "Switch to Russian" : "Switch to English"}
        </div>
      </div>
    </div>
  );
}