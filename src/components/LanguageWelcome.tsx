import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export function LanguageWelcome() {
  const { language, setLanguage } = useLanguage();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('language-liberty-visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('language-liberty-visited', 'true');
    }
  }, []);

  const handleLanguageSelect = (lang: "en" | "ru") => {
    setLanguage(lang);
    setShowWelcome(false);
  };

  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Language Liberty</h2>
        <p className="text-gray-600 mb-6">Choose your preferred language</p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleLanguageSelect("en")}
            className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageSelect("ru")}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Русский
          </button>
        </div>
      </div>
    </div>
  );
}