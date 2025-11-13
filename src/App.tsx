import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { SplashScreen } from "./components/SplashScreen";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Blog } from "./components/Blog";
import { IndoRussianRelations } from "./components/IndoRussianRelations";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { AdminPanel } from "./components/AdminPanel";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if URL contains /admin
  if (window.location.pathname === "/admin") {
    return (
      <LanguageProvider>
        <AdminPanel />
      </LanguageProvider>
    );
  }

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
        <Portfolio />
        <Blog />
        <IndoRussianRelations />
        <Contact />
        <Footer />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}
