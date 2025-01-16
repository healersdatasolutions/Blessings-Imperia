import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Room } from '../types';
import { useAuth } from '../hooks/useAuth';
import { Wifi, Tv, Coffee, Users, Check } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import toast from 'react-hot-toast';

export default function RoomDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  useEffect(() => {
    async function fetchRoom() {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room:', error);
        toast.error('Failed to load room details');
      } finally {
        setLoading(false);
      }
    }

    fetchRoom();
  }, [id]);

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (!user) {
      sessionStorage.setItem('bookingRedirect', 
        `/checkout?roomId=${id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );
      toast.error('Please sign in to book a room');
      navigate('/auth');
      return;
    }
    console.log('Book room:', id, checkIn, checkOut, guests);

    navigate(`/checkout?roomId=${id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&user=${user?.id}&email=${user?.email}`);
  };

  if (loading || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
        <div>
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <ImageCarousel 
              images={room.images} 
              className="w-full h-96 rounded-lg overflow-hidden"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{room.name}</h1>
          <p className="text-gray-600 mb-6">{room.description}</p>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
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
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-gray-500">
              <Users className="h-5 w-5" />
              <span className="ml-1">Up to {room.capacity} guests</span>
            </div>
            <div className="flex items-center space-x-2">
              {room.amenities.includes('WiFi') && <Wifi className="h-5 w-5 text-gray-400" />}
              {room.amenities.includes('TV') && <Tv className="h-5 w-5 text-gray-400" />}
              {room.amenities.includes('Mini bar') && <Coffee className="h-5 w-5 text-gray-400" />}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-orange-500">₹{room.price}</h3>
            <p className="text-gray-500">per night</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-in</label>
              <p className="mt-1 text-gray-900">{new Date(checkIn || '').toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-out</label>
              <p className="mt-1 text-gray-900">{new Date(checkOut || '').toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Guests</label>
              <p className="mt-1 text-gray-900">{guests} guest(s)</p>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}