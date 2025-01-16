import { motion } from 'framer-motion';
import { Wifi, Coffee, Dumbbell, Utensils, Car, ShipWheelIcon as Wheelchair, ShoppingBag, Users, Cake, CreditCard } from 'lucide-react';

const amenities = [
  { icon: Wifi, name: 'Free Wi-Fi' },
  { icon: Coffee, name: 'Room Service' },
  { icon: Dumbbell, name: 'Fitness Center' },
  { icon: Utensils, name: 'Restaurant' },
  { icon: Car, name: 'Valet Parking' },
  { icon: Wheelchair, name: 'Accessibility' },
  { icon: ShoppingBag, name: 'Takeaway' },
  { icon: Users, name: 'Dine-in' },
  { icon: Cake, name: 'Birthday' },
  { icon: CreditCard, name: 'Google Pay' },
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
          <h2 className="text-3xl font-bold mb-4">Our Amenities & Services</h2>
          <p className="text-xl text-gray-600">Enjoy our wide range of amenities and services designed for your comfort and convenience.</p>
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
                <amenity.icon size={24} className="text-black" />
              </div>
              <h3 className="text-lg font-semibold text-center">{amenity.name}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-white p-8 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6">Additional Services & Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Accessibility</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Wheelchair-accessible car park</li>
                <li>Wheelchair-accessible entrance</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Service Options</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Takeaway</li>
                <li>Dine-in</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Dining Options</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Outside food allowed</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Amenities</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Gender-neutral toilets</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Payments</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Google Pay accepted</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Children</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Good for kids' birthdays</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

