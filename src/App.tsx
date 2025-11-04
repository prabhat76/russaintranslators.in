import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { SplashScreen } from "./components/SplashScreen";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { IndoRussianRelations } from "./components/IndoRussianRelations";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Services />
        <IndoRussianRelations />
        <Contact />
        <Footer />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}
