import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Room } from '../types';
import { Wifi, Tv, Coffee, Users } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

export default function RoomList() {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .gte('capacity', Number(guests) || 1);

        if (error) throw error;
        setRooms(data || []);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, [guests]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-10">Available Rooms</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Link
            key={room.id}
            to={`/rooms/${room.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
            className="block hover:shadow-lg transition-shadow duration-200"
          >
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 h-64">
                <ImageCarousel images={room.images} className="h-64" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{room.description}</p>
                
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center text-gray-500">
                    <Users className="h-5 w-5" />
                    <span className="ml-1 text-sm">Up to {room.capacity} guests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {room.amenities.includes('WiFi') && <Wifi className="h-5 w-5 text-gray-400" />}
                    {room.amenities.includes('TV') && <Tv className="h-5 w-5 text-gray-400" />}
                    {room.amenities.includes('Mini bar') && <Coffee className="h-5 w-5 text-gray-400" />}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-2xl font-bold text-orange-500">₹{room.price}</p>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}