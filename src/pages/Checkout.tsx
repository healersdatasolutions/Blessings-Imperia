import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Room } from '../types';
import { differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';
import { Check } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';


declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const roomId = searchParams.get('roomId');
  const checkIn = new Date(searchParams.get('checkIn') || '');
  const checkOut = new Date(searchParams.get('checkOut') || '');
  const guests = Number(searchParams.get('guests'));
  const user = searchParams.get('user');
  const userEmail = searchParams.get('email');

  const nights = differenceInDays(checkOut, checkIn);
  const totalPrice = room ? room.price * nights : 0;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    async function fetchRoom() {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', roomId)
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
  }, [roomId, user, navigate]);

  const handlePayment = async () => {
    if (!room || processing) return;
    
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    console.log('Payment processing...');
    

    setProcessing(true);
    try {
      // Create booking in Supabase
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user,
          room_id: room.id,
          check_in: checkIn.toISOString(),
          check_out: checkOut.toISOString(),
          guests,
          total_price: totalPrice,
          status: 'pending'
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Initialize Razorpay payment
      const options = {
        key: 'rzp_test_uGoq5ABJztRAhk', // Replace with your Razorpay key
        amount: totalPrice * 100, // Amount in paise
        currency: 'INR',
        name: 'Blessings Imperia',
        description: `Booking for ${room.name}`,
        order_id: booking.id,
        handler: async function (response: any) {
          // Update booking status
          const { error: updateError } = await supabase
            .from('bookings')
            .update({ 
              status: 'confirmed',
              payment_id: response.razorpay_payment_id 
            })
            .eq('id', booking.id);

          if (updateError) throw updateError;
          console.log('Booking confirmed:', booking.id);

          toast.success('Booking confirmed successfully!');
          navigate('/');
        },
        prefill: {
          name: user,
          email: userEmail,
        },
        theme: {
          color: '#f97316'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-10">Checkout</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Room</span>
                <span className="font-medium">{room.name}</span>
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

          <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors disabled:bg-gray-400"
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Room Details</h2>
          <ImageCarousel
            images={room.images}
            className="w-full h-64 rounded-lg mb-4"
          />
          <h3 className="text-lg font-medium mb-2">{room.name}</h3>
          <p className="text-gray-600 mb-4">{room.description}</p>
          <div className="space-y-2">
            {room.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-orange-500 mr-2" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


