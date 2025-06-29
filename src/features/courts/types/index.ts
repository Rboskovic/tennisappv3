export interface Club {
  id: string;
  name: string;
  address: string;
  courts: Court[];
  amenities: string[];
  pricePerHour: number;
  image?: string;
}

export interface Court {
  id: string;
  number: number;
  surface: 'hard' | 'clay' | 'grass';
  isIndoor: boolean;
  isAvailable: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  price: number;
}

export interface BookingStep {
  id: 'club' | 'datetime' | 'confirmation';
  title: string;
  isComplete: boolean;
}

export interface BookingData {
  club?: Club;
  date?: string;
  timeSlot?: TimeSlot;
  court?: Court;
  duration: number;
  totalPrice: number;
}

export interface Booking {
  id: string;
  club: Club;
  court: Court;
  date: string;
  timeSlot: TimeSlot;
  duration: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}
