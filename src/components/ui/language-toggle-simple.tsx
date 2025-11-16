import { useLanguage } from "../../context/LanguageContext";

export function LanguageToggleSimple() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-lg border-2 border-blue-600">
      <button
        onClick={() => setLanguage("en")}
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          language === "en"
            ? "bg-red-600 text-white shadow-lg transform scale-105"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        Eng
      </button>
      <button
        onClick={() => setLanguage("ru")}
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          language === "ru"
            ? "bg-red-600 text-white shadow-lg transform scale-105"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        Русск
      </button>
    </div>
  );
}