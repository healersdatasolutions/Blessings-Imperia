export interface Room {
  id: number;
  name: string;
  type: 'luxury' | 'basic' | 'duplex';
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
}

export interface Booking {
  id: number;
  userId: string;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}