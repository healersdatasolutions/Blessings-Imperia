import { useParams, useNavigate } from 'react-router-dom';
import { Wifi, Tv, Coffee, Users, Check } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import toast from 'react-hot-toast';

const roomData = {
  1: { name: 'Deluxe Room', description: 'Spacious room with king-size bed and premium amenities.', capacity: 2, amenities: ['WiFi', 'TV', 'Mini bar'], price: 13999, images: ["/images/Deluxe1.jpeg", "/images/Deluxe2.jpeg", "/images/Deluxe3.jpeg"] },
  2: { name: 'Super Deluxe Room', description: 'Luxury room with twin beds and high-end furnishings.', capacity: 3, amenities: ['WiFi', 'TV', 'Mini bar', 'Room Service'], price: 14999, images: ["/images/Superdeluxe1.jpeg", "/images/Superdeluxe2.jpeg", "/images/Superdeluxe3.jpeg", "/images/Superdeluxe4.jpeg"] },
};

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = roomData[id];

  if (!room) {
    toast.error('Room not found');
    navigate('/rooms');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
        <div>
          <ImageCarousel images={room.images} className="w-full h-96 rounded-lg overflow-hidden" />
          <h1 className="text-3xl font-bold text-gray-900 mt-6">{room.name}</h1>
          <p className="text-gray-600 mt-4">{room.description}</p>
          <div className="border-t border-b border-gray-200 py-6 mt-4">
            <h2 className="text-xl font-semibold mb-4">Room Features</h2>
            <div className="grid grid-cols-2 gap-4">
              {room.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <Check className="h-5 w-5 text-orange-500 mr-2" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-6">
          <h3 className="text-2xl font-bold text-orange-500">₹{room.price}</h3>
          <p className="text-gray-500">per night</p>
          <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors mt-4">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
