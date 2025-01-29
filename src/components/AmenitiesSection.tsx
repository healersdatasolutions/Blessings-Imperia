import { motion } from 'framer-motion';
import { Wifi, Coffee, Car, ShieldCheck, CreditCard, Phone, Utensils, Briefcase, MapPin, ConciergeBell, Building2, Dumbbell, Bath, Flower, Restaurant, ShoppingBag, ParkingCircle, Train, Bus, FirstAidKit, Users, Hotel } from 'lucide-react';

const inHouseFacilities = [
  { icon: Wifi, name: 'Free Wi-Fi in all rooms & lobby' },
  { icon: Coffee, name: '24/7 Room Service & Dining' },
  { icon: ShieldCheck, name: '24/7 Security, CCTV Surveillance' },
  { icon: CreditCard, name: 'All Major Credit Cards & Digital Payments Accepted' },
  { icon: Phone, name: 'Doctor, Florist, and Salon on Call' },
  { icon: Utensils, name: 'Multi-Cuisine Restaurant' },
  { icon: Briefcase, name: 'Conference & Banquet Halls' },
  { icon: Dumbbell, name: 'Fully Equipped Gym' },
  { icon: Bath, name: 'Outdoor Swimming Pool' },
  { icon: Flower, name: 'Spa & Wellness Center' },
  { icon: Hotel, name: 'Luxury Suites & Executive Rooms' }
];

const outHouseFacilities = [
  { icon: Car, name: 'Valet Parking & Cab on Call' },
  { icon: ConciergeBell, name: 'Tour & Ticketing Assistance' },
  { icon: Bus, name: '5 mins from Bus Stand' },
  { icon: Train, name: '15 mins from Railway Station' },
  { icon: ShoppingBag, name: 'Nearby Shopping & Attractions' },
  { icon: FirstAidKit, name: 'Emergency Medical Assistance' },
  { icon: Users, name: 'Nearby Business & Event Centers' },
  { icon: ParkingCircle, name: 'Spacious Parking Area' }
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
          <h2 className="text-3xl font-bold mb-4">Our Facilities</h2>
          <p className="text-xl text-gray-600">Experience world-class hospitality with our premium services.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center">In-House Facilities</h3>
            <div className="grid grid-cols-2 gap-8">
              {inHouseFacilities.map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                    <facility.icon size={28} className="text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-center">{facility.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center">Out-House Facilities</h3>
            <div className="grid grid-cols-2 gap-8">
              {outHouseFacilities.map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                    <facility.icon size={28} className="text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-center">{facility.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
