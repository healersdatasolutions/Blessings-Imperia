import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  "/images/hero3.jpg"
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative h-screen">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImages[currentIndex]})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center text-center text-white">
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Imperia Blessings
        </motion.h1>
        <motion.p 
          className="text-xl mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Experience unparalleled comfort and luxury in the heart of Prayagraj.
        </motion.p>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Book Your Stay
        </motion.button>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
