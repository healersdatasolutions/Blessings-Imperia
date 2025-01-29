import { motion } from 'framer-motion';
import { Wifi, Coffee, Car, ShieldCheck, CreditCard, Phone, Utensils, Briefcase, MapPin, ConciergeBell, Building2, BedDouble, Tv, BatteryCharging, BellRing, Thermometer, ShowerHead, AlarmClock, ReceiptText, Chair } from 'lucide-react';

const inRoomFacilities = [
  { icon: Wifi, name: 'Wi-Fi in rooms' },
  { icon: BedDouble, name: 'Tastefully Furnished King size/Twin Bed accommodation' },
  { icon: ShieldCheck, name: 'A.C Rooms' },
  { icon: Phone, name: 'DID facility' },
  { icon: BatteryCharging, name: '24 Hrs. Power Back-up' },
  { icon: BellRing, name: '24 Hrs. Room Service' },
  { icon: Thermometer, name: 'Hot and Cold water round the clock' },
  { icon: ShowerHead, name: 'Modern Bathroom Amenities & Facilities' },
  { icon: Tv, name: 'LCD Color T.V with Digital Channels' },
  { icon: AlarmClock, name: 'Wake-up call' }
];

const inHouseFacilities = [
  { icon: BatteryCharging, name: '24HRS Backup Automatically' },
  { icon: Chair, name: 'Attached Washroom with Lobby and Banquet' },
  { icon: Utensils, name: 'Separate Dining Hall for buffet and Table Service' },
  { icon: CreditCard, name: 'All Major Credit Cards Accepted' }
];

const outHouseFacilities = [
  { icon: Car, name: 'Valet Parking' },
  { icon: ReceiptText, name: 'Laundry' },
  { icon: ConciergeBell, name: 'Cab on Call' },
  { icon: Phone, name: 'Florist on Call' },
  { icon: Phone, name: 'Doctor on Call' },
  { icon: MapPin, name: 'Yoga on Call' },
  { icon: Phone, name: 'Saloon Service on Call' },
  { icon: ConciergeBell, name: 'Tour and Ticketing on Demand' }
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
