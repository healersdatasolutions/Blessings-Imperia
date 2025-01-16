/*
  # Initial Schema Setup for Blessings Imperia Hotel

  1. New Tables
    - rooms
      - Basic room information and pricing
    - bookings
      - Booking records and status
    - room_types
      - Categories of rooms (luxury, basic, duplex)
    
  2. Security
    - Enable RLS on all tables
    - Public read access for rooms and room_types
    - Authenticated user access for bookings
*/

-- Create enum for room types
CREATE TYPE room_category AS ENUM ('luxury', 'basic', 'duplex');

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type room_category NOT NULL,
  description text NOT NULL,
  price decimal NOT NULL,
  capacity int NOT NULL,
  amenities text[] NOT NULL DEFAULT '{}',
  images text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  room_id uuid REFERENCES rooms NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests int NOT NULL,
  total_price decimal NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to rooms"
  ON rooms
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample room data
INSERT INTO rooms (name, type, description, price, capacity, amenities, images) VALUES
('Luxury Ocean Suite', 'luxury', 'Stunning ocean views with premium amenities', 500, 4, 
  ARRAY['King bed', 'Ocean view', 'Mini bar', 'Room service', 'WiFi'],
  ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945']),
('Classic Room', 'basic', 'Comfortable and cozy accommodation', 200, 2,
  ARRAY['Queen bed', 'WiFi', 'TV'],
  ARRAY['https://images.unsplash.com/photo-1566665797739-1674de7a421a']),
('Family Duplex', 'duplex', 'Perfect for families with multiple rooms', 800, 6,
  ARRAY['Multiple rooms', 'Kitchen', 'Living area', 'WiFi', 'Balcony'],
  ARRAY['https://images.unsplash.com/photo-1566662780356-d975a14cf566']);