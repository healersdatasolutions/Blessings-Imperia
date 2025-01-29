import { motion } from 'framer-motion';
import { Wifi, Coffee, Car, ShieldCheck, CreditCard, Phone, Utensils, Briefcase, MapPin, ConciergeBell, Building2 } from 'lucide-react';

const amenities = [
  { icon: Wifi, name: 'Free Wi-Fi in all rooms & lobby' },
  { icon: Coffee, name: '24/7 Room Service & Dining' },
  { icon: Car, name: 'Valet Parking, Cab on Call' },
  { icon: ShieldCheck, name: '24/7 Security, CCTV Surveillance' },
  { icon: CreditCard, name: 'All Major Credit Cards & Digital Payments Accepted' },
  { icon: Phone, name: 'Doctor, Florist, and Salon on Call' },
  { icon: Utensils, name: 'Upcoming Multi-Cuisine Restaurant' },
  { icon: Briefcase, name: 'Conference & Banquet Halls' },
  { icon: MapPin, name: '5 min from Bus Stand, 15 min from Railway Station' },
  { icon: ConciergeBell, name: 'Tour & Ticketing Assistance' },
  { icon: Building2, name: 'Luxury Suites & Executive Rooms' }
];

export default function AmenitiesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id='amenities'>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Premium Amenities & Services</h2>
          <p className="text-xl text-gray-600">Indulge in luxury and experience world-class hospitality.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                <amenity.icon size={28} className="text-black" />
              </div>
              <h3 className="text-lg font-semibold text-center">{amenity.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
