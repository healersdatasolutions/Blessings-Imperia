import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Bed, Tv, CreditCard, Palette } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";
import HeroCarousel from '../components/HeroCarousel';
import AmenitiesSection from '../components/AmenitiesSection';
import GallerySection from '../components/GallerySection';
import Newsletter from '../components/Newsletter';

export default function Home() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    if (!checkIn || !checkOut) return;
    
    const searchParams = new URLSearchParams({
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests: guests.toString(),
      rooms: rooms.toString()
    });
    
    navigate(`/rooms?${searchParams.toString()}`);
  };

  const scrollToBookingForm = () => {
    if (bookingFormRef.current) {
      const windowHeight = window.innerHeight;
      const formHeight = bookingFormRef.current.offsetHeight;
      const offset = (windowHeight - formHeight) / 2;
      const formPosition = bookingFormRef.current.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: formPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
          html {
            scroll-padding-top: 50vh;
          }
        `}
      </style>

      <HeroCarousel onBookNowClick={scrollToBookingForm} />

      {/* Booking Form */}
      <motion.div 
        ref={bookingFormRef}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24"
      >
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-in</label>
              <DatePicker
                selected={checkIn}
                onChange={setCheckIn}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                minDate={new Date()}
                placeholderText="Select date"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Check-out</label>
              <DatePicker
                selected={checkOut}
                onChange={setCheckOut}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                minDate={checkIn || new Date()}
                placeholderText="Select date"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rooms</label>
              <select
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSearch}
              className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Search Rooms
            </button>
          </div>
        </div>
      </motion.div>

      {/* Luxury Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1736963204274-49ab4dda3836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Luxury Lounge" 
                className="w-full rounded-lg shadow-xl hover:scale-105 transition-all duration-300"
              />
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-black text-white p-12 rounded-lg"
            >
              <h2 className="text-4xl font-bold mb-6">Redefines luxury with world-class accommodations</h2>
              <p className="mb-8">Spread across two elegant complexes, each thoughtfully designed to cater to your every need</p>
              <div className="grid grid-cols-2 gap-4">
                {["Exquisite Experiences", "Sustainable Luxury", "Unmatched Service", "Culinary Excellence", "Timeless Elegance", "Exclusive Privacy"].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-4 h-4 border border-white rounded-sm" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section id="rooms" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Unique stay to comfort your needs
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1736963204700-19acad57c0b6?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                title: "Family Suite",
                description: "Spacious family-friendly suite with two bedrooms and a living area, perfect for a family vacation.",
                price: "$300"
              },
              {
                image: "https://images.unsplash.com/photo-1736963204265-53fb7776eaa0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                title: "Deluxe King Room",
                description: "Elegant room with a king-sized bed and city views, ideal for business travelers or couples on a romantic getaway.",
                price: "$220"
              },
              {
                image: "https://images.unsplash.com/photo-1736963204243-2d2e94657064?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                title: "Executive Suite",
                description: "Premium suite designed for business professionals, offering a blend of luxury and functionality ",
                price: "$400"
              }
            ].map((room, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={room.image || "/placeholder.svg"} alt={room.title} className="w-full h-64 object-cover" />
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">{room.title}</h3>
                  <p className="text-gray-600">{room.description}</p>
                  <div className="flex gap-6 my-4">
                    <Bed size={24} />
                    <Tv size={24} />
                    <CreditCard size={24} />
                    <Palette size={24} />
                  </div>
                  <div className="flex justify-between items-center">
                    {/* <span className="text-3xl font-serif">{room.price}</span> */}
                    <motion.button 
                      onClick={scrollToBookingForm}
                      className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      BOOK NOW
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <AmenitiesSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Testimonials Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Read our real testimonial services</h2>
              <p className="text-gray-300">
                Our guests enjoy more than just a stay—they indulge in a true escape. Here's what our distinguished guests have to say
              </p>
            </motion.div>
            <motion.div 
              className="space-y-8"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-6">
                <img src="https://lh3.googleusercontent.com/a-/ALV-UjX6GytxHv1TgiogVoP43E2Ox6WKWDYlNytxv2rLYofJBQsJDPKe=w75-h75-p-rp-mo-ba4-br100" alt="Bruce Mitchell" className="w-24 h-24 rounded-full object-cover" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">"A truly luxurious experience."</h3>
                  <p className="text-gray-300 mb-4">
                    "I stayed many hotels of Prayagraj among them Hotel blessings is the best. Very big rooms, very clean, spacious n just awesome.  Located ground floor is function hall area for wedding n other events. When I visited massive Jagran was organized. They quoted rate of Rs 2800/- per night including tax which I found value for money.  Four n two wheeler parking space availabl. Surroundings are quite but when wedding organised in premise then it's very noisy. Overall experience is just awesome outstanding n beyond words."
                  </p>
                  <p className="font-bold">Anwar Khan</p>
                  <div className="flex text-yellow-500">★★★★★</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Frequently asked questions
          </motion.h2>
          <div className="space-y-4">
            {[
              {
                question: "Are there activities for children at the resort?",
                answer: "Yes, we offer a variety of activities for children including a kids' club, supervised pool activities, and family-friendly excursions."
              },
              {
                question: "What dining options are available at the resort?",
                answer: "Our resort features multiple dining options, from casual beachfront cafes to fine dining restaurants, offering a range of international and local cuisines."
              },
              {
                question: "Can I host a wedding or event at the resort?",
                answer: "We have dedicated event spaces and experienced planners to help you organize weddings, conferences, and other special events."
              },
              {
                question: "Are there activities and excursions available at the resort?",
                answer: "We offer a wide range of activities and excursions, including water sports, guided tours, cooking classes, and wellness activities."
              },
              {
                question: "Can I request early check-in or late check-out?",
                answer: "Early check-in and late check-out can be requested and are subject to availability. Please contact our front desk for arrangements."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className="border-b border-gray-200 pb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full flex justify-between items-center py-4 text-left text-lg font-medium"
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown 
                    className={`transform transition-transform ${activeQuestion === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {activeQuestion === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-gray-600"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <div ref={newsletterRef}>
        <Newsletter />
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Blessings Imperia</h3>
              <p className="text-gray-400">Down-to-earth property in the city centre, offering simply furnished rooms & event space.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400"> 20, Lal Bahadur Shastri Marg, Civil Lines, Prayagraj, Uttar Pradesh 211001</p>
              {/* <p className="text-gray-400">Phone: (123) 456-7890</p>
              <p className="text-gray-400">Email: info@blessingsimperia.com</p> */}

              
            </div>
            {/* <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              </div>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

