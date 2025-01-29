import { useSearchParams, useNavigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';

const roomPricing = {
  1: 13999, // Deluxe Room
  2: 14999, // Super Deluxe Room
};

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roomId = Number(searchParams.get('roomId'));
  const checkIn = new Date(searchParams.get('checkIn') || '');
  const checkOut = new Date(searchParams.get('checkOut') || '');
  const guests = Number(searchParams.get('guests'));

  if (!roomPricing[roomId]) {
    toast.error('Invalid room selection');
    navigate('/rooms');
    return null;
  }

  const nights = differenceInDays(checkOut, checkIn);
  const totalPrice = roomPricing[roomId] * nights;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Room</span>
            <span className="font-medium">{roomId === 1 ? 'Deluxe Room' : 'Super Deluxe Room'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check-in</span>
            <span className="font-medium">{checkIn.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check-out</span>
            <span className="font-medium">{checkOut.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nights</span>
            <span className="font-medium">{nights}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Guests</span>
            <span className="font-medium">{guests}</span>
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
        Pay Now
      </button>
    </div>
  );
}
