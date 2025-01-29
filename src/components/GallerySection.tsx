import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg"


];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prevIndex) => (prevIndex === null ? null : (prevIndex + 1) % images.length));
  };

  const prevImage = () => {
    setSelectedImage((prevIndex) => (prevIndex === null ? null : (prevIndex - 1 + images.length) % images.length));
  };

  return (
    <section id="gallery" className="relative z-10 py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Gallery
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          >
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white">
              <X size={24} />
            </button>
            <button onClick={prevImage} className="absolute left-4 text-white">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="absolute right-4 text-white">
              <ChevronRight size={24} />
            </button>
            <img src={images[selectedImage]} alt={`Gallery image ${selectedImage + 1}`} className="max-w-full max-h-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
