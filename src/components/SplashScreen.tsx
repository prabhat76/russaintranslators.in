import { useEffect, useState } from "react";
import { motion } from "motion/react";
import flagsImage from "figma:asset/ef9e02fa22c0907cb0e03f86b7c3180828061600.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash for 2.5 seconds, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onComplete after fade out animation completes
      setTimeout(onComplete, 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-white via-red-50 to-orange-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Flags Image with Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <img
            src={flagsImage}
            alt="India-Russia Partnership"
            className="w-64 h-48 object-cover rounded-2xl shadow-2xl"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-600/20 blur-xl -z-10"></div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h1 
            className="text-4xl text-red-700 mb-2"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
          >
            Language Liberty
          </h1>
          <p 
            className="text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Bridging India & Russia Through Language
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex gap-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 bg-orange-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-red-600 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-blue-600 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
