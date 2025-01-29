import { motion } from 'framer-motion';
import { Wifi, Coffee, Car, ShieldCheck, CreditCard, Phone, Utensils, Briefcase, MapPin, ConciergeBell, Building2, BatteryCharging, Tv, ShowerHead, AlarmClock } from 'lucide-react';

const inRoomFacilities = [
  { icon: Wifi, name: 'Wi-Fi in Rooms' },
  { icon: Building2, name: 'Tastefully Furnished AC Rooms' },
  { icon: Briefcase, name: 'King Size/Twin Bed Accommodation' },
  { icon: Phone, name: 'DID Facility' },
  { icon: BatteryCharging, name: '24 Hrs Power Backup' },
  { icon: Coffee, name: '24 Hrs Room Service' },
  { icon: ShowerHead, name: 'Hot & Cold Water Available 24/7' },
  { icon: ConciergeBell, name: 'Modern Bathroom Amenities' },
  { icon: Tv, name: 'LCD TV with Digital Channels' },
  { icon: AlarmClock, name: 'Wake-up Call' }
];

const inHouseFacilities = [
  { icon: BatteryCharging, name: '24 Hrs Automatic Backup' },
  { icon: Building2, name: 'Attached Washroom with Lobby & Banquet' },
  { icon: Utensils, name: 'Separate Dining Hall for Buffet & Table Service' },
  { icon: CreditCard, name: 'All Major Credit Cards Accepted' }
];

const outHouseFacilities = [
  { icon: Car, name: 'Valet Parking' },
  { icon: Briefcase, name: 'Laundry Services' },
  { icon: ConciergeBell, name: 'Cab on Call' },
  { icon: Phone, name: 'Florist on Call' },
  { icon: Phone, name: 'Doctor on Call' },
  { icon: MapPin, name: 'Yoga on Call' },
  { icon: Phone, name: 'Salon Service on Call' },
  { icon: ConciergeBell, name: 'Tour & Ticketing Assistance' }
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

        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center">In-Room Facilities</h3>
            <div className="grid grid-cols-2 gap-8">
              {inRoomFacilities.map((facility, index) => (
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
