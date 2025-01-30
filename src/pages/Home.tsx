import { useState, useEffect, useRef } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Bed, Tv, CreditCard, Palette } from 'lucide-react';
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
  if (!checkIn || !checkOut) {
    alert("Please select check-in and check-out dates before searching.");
    return;
  }

  const searchParams = new URLSearchParams({
    checkIn: checkIn.toISOString(),
    checkOut: checkOut.toISOString(),
    guests: guests.toString(),
    rooms: rooms.toString()
  });

  console.log("Navigating to:", `/rooms?${searchParams.toString()}`); // Debugging log
  navigate(`/rooms?${searchParams.toString()}`);
};

 const scrollToBookingForm = () => {
  if (!bookingFormRef.current) {
    console.error("Booking form reference is missing.");
    return;
  }

  bookingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  className="relative z-50 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24"
>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-in</label>
              <DatePicker
  selected={checkIn}
  onChange={(date: Date) => setCheckIn(date)}
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
  minDate={new Date()} // Ensures past dates cannot be selected
  dateFormat="yyyy-MM-dd"
  placeholderText="Select Check-in Date"
/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Check-out</label>
              <DatePicker
  selected={checkOut}
  onChange={(date: Date) => setCheckOut(date)}
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
  minDate={checkIn || new Date()} // Ensures check-out is after check-in
  dateFormat="yyyy-MM-dd"
  placeholderText="Select Check-out Date"
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
              <h2 className="text-4xl font-bold mb-6">Redefine Luxury with World Class Accommodations</h2>
              <p className="mb-8">Spread Across Two Elegant Complexes, Each Thoughtfully Designed To Cater To Your Every Need</p>
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
                image: "/images/Superdeluxe3.jpeg",
                title: "Executive",
                description: "Spacious family-friendly suite with two bedrooms and a living area, perfect for a family vacation.",
                price: "Rs.13999"
              },
              {
                image: "https://images.unsplash.com/photo-1736963204265-53fb7776eaa0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                title: "Super Deluxe Room",
                description: "Elegant room with a king-sized bed and city views, ideal for business travelers or couples on a romantic getaway.",
                price: "Rs.14999"
              },
              {
                image: "https://images.unsplash.com/photo-1736963204243-2d2e94657064?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                title: "Deluxe Room",
                description: "Premium suite designed for business professionals, offering a blend of luxury and functionality ",
                price: "Rs.12999"
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
                   <button
  onClick={scrollToBookingForm}
  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
>
  Book Your Stay
</button>

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
        {/* MD Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">Meet Our MD</h2>
          <p className="text-lg text-gray-700">Mr. Abhishek Jain, CA, graduate from Allahabad University, believes that hospitality is the art of making guests feel at home. With a passion for the industry, he aims to build a hospitality chain that embraces professionalism and warmth.</p>
          <p className="mt-4 text-lg text-gray-700">His vision is to bring young professionals into the industry and create opportunities for youth employment while redefining the standards of the hospitality sector.</p>
        </div>
      </section>
      {/* Newsletter Section */}
      <div ref={newsletterRef}>
        <Newsletter />
      </div>
    </div>
  );
}

